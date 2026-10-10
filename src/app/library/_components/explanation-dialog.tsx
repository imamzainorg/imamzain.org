"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import {
  useBodyScrollLock,
  useModalFocus,
  usePageScale,
} from "../_hooks/use-dialog-behavior";
import { useIsMounted } from "../_hooks/use-is-mounted";
import { useOpenExplanation } from "../_hooks/use-explanation-store";
import { usePrefersReducedMotion } from "../_hooks/use-prefers-reduced-motion";
import { toArabicDigits } from "../_lib/arabic-text";
import {
  closeExplanation,
  getLastSourceIndex,
  getOpenExplanation,
  setLastSourceIndex,
  type OpenExplanation,
} from "../_lib/explanation-store";
import { getPortalRoot, sourceLabels } from "../_lib/explanation-utils";
import { highlightPlain } from "./text-highlight";

const OPEN_TRANSITION_MS = 360;
const REDUCED_TRANSITION_MS = 120;
const WORDS_PER_MINUTE = 170;
const MIN_WORDS_FOR_READING_TIME = 80;

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const tabBaseClass = `shrink-0 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${focusRingClass}`;
const tabActiveClass =
  "bg-primary text-white dark:bg-Muharram_primary dark:text-zinc-900";
const tabIdleClass =
  "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700";

export default function ExplanationDialog() {
  const isMounted = useIsMounted();
  const openState = useOpenExplanation();

  // عند مغادرة الصفحة نغلق أي نافذة مفتوحة
  useEffect(
    () => () => {
      if (getOpenExplanation()) closeExplanation();
    },
    [],
  );

  if (!isMounted || !openState || openState.explanations.length === 0) {
    return null;
  }

  // الـ key يعيد تهيئة حالة اللوحة (المصدر المختار وحركة الدخول) مع كل شرح جديد
  return createPortal(
    <ExplanationPanel key={openState.segmentKey} state={openState} />,
    getPortalRoot(),
  );
}

function ExplanationPanel({ state }: { state: OpenExplanation }) {
  const { segmentKey, text, explanations, highlightTerm } = state;
  const reducedMotion = usePrefersReducedMotion();
  const transitionMs = reducedMotion
    ? REDUCED_TRANSITION_MS
    : OPEN_TRANSITION_MS;

  const [selectedIndex, setSelectedIndex] = useState(() =>
    getLastSourceIndex(segmentKey),
  );
  // mount أولًا بحالة الإغلاق البصرية، ثم فريم واحد لتشغيل الانتقال
  const [entered, setEntered] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const titleId = useId();

  const hasMultipleSources = explanations.length > 1;
  const labels = sourceLabels(explanations);
  const safeIndex = Math.min(selectedIndex, explanations.length - 1);
  const selected = explanations[safeIndex];
  const isGeneral = segmentKey.startsWith("general-");

  const { restoreFocus } = useModalFocus(panelRef, backButtonRef, handleClose);
  useBodyScrollLock(true);
  usePageScale(entered && !reducedMotion, OPEN_TRANSITION_MS);

  const wordCount = selected.content.trim().split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));

  // الإغلاق بحركة خروج، ثم يعود التركيز إلى العنصر الذي فتح النافذة
  function handleClose() {
    if (closeTimerRef.current !== null) return;
    setEntered(false);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      closeExplanation();
      restoreFocus();
    }, transitionMs);
  }

  const updateProgress = useCallback(() => {
    const content = contentRef.current;
    const bar = progressRef.current;
    if (!content || !bar) return;
    const max = content.scrollHeight - content.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, content.scrollTop / max) : 0})`;
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    setLastSourceIndex(segmentKey, safeIndex);
  }, [segmentKey, safeIndex]);

  // عند تغيير المصدر: scroll لأعلى وتصفير شريط التقدم
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
    updateProgress();
  }, [safeIndex, updateProgress]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center">
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px] dark:bg-black/60"
        style={{
          opacity: entered ? 1 : 0,
          transition: `opacity ${transitionMs}ms ease`,
        }}
      />

      <PanelContainer
        panelRef={panelRef}
        entered={entered}
        reducedMotion={reducedMotion}
        titleId={titleId}
      >
        <div
          aria-hidden="true"
          className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-gray-300 sm:hidden dark:bg-zinc-700"
        />

        <div className="shrink-0 px-5 pb-4 pt-3 sm:px-8 sm:pt-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              ref={backButtonRef}
              type="button"
              onClick={handleClose}
              className={`-me-1 flex items-center gap-1.5 rounded px-1 py-1.5 text-sm text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-Muharram_primary ${focusRingClass}`}
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
              <span>العودة إلى النص</span>
            </button>

            {wordCount >= MIN_WORDS_FOR_READING_TIME && (
              <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">
                {toArabicDigits(readMinutes)} د للقراءة
              </span>
            )}
          </div>

          <p
            aria-hidden="true"
            className="mb-2 text-xs font-medium text-gray-400 dark:text-gray-500"
          >
            {isGeneral ? "شروح على العبارة" : "النص المشروح"}
          </p>
          <h2
            id={titleId}
            className="break-words border-s-[3px] border-primary ps-3 text-lg font-semibold leading-[1.9] text-gray-800 sm:text-xl dark:border-Muharram_primary dark:text-gray-100"
          >
            <span className="sr-only">
              {isGeneral ? "شروح على العبارة: " : "شرح: "}
            </span>
            {isGeneral ? text : `«${text}»`}
          </h2>
        </div>

        {/* شريط تقدّم القراءة: يمتلئ من اليمين مع التمرير */}
        <div
          aria-hidden="true"
          className="h-0.5 shrink-0 bg-gray-100 dark:bg-zinc-800"
        >
          <div
            ref={progressRef}
            className="h-full origin-right bg-primary dark:bg-Muharram_primary"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {hasMultipleSources && (
          <SourceTabs
            idPrefix={titleId}
            labels={labels}
            selectedIndex={safeIndex}
            onSelect={setSelectedIndex}
          />
        )}

        <div
          ref={contentRef}
          onScroll={updateProgress}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-8"
        >
          <div
            key={safeIndex}
            id={`${titleId}-panel`}
            role={hasMultipleSources ? "tabpanel" : undefined}
            aria-labelledby={
              hasMultipleSources ? `${titleId}-tab-${safeIndex}` : undefined
            }
            className="iz-content-fade"
          >
            {/* مع وجود تبويبات يظهر اسم الشارح في التبويب نفسه */}
            {!hasMultipleSources && selected.author?.trim() && (
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-Muharram_primary">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rotate-45 bg-current opacity-60"
                />
                {selected.author}
              </p>
            )}
            <div className="whitespace-pre-wrap break-words text-[17px] leading-[2.1] text-gray-700 sm:text-[19px] dark:text-gray-200">
              {highlightPlain(
                selected.content,
                highlightTerm,
                `${segmentKey}-exp-${safeIndex}`,
              )}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent dark:from-zinc-900"
        />
      </PanelContainer>
    </div>
  );
}

type PanelContainerProps = {
  panelRef: React.RefObject<HTMLDivElement | null>;
  entered: boolean;
  reducedMotion: boolean;
  titleId: string;
  children: React.ReactNode;
};

function PanelContainer({
  panelRef,
  entered,
  reducedMotion,
  titleId,
  children,
}: PanelContainerProps) {
  const transform = reducedMotion
    ? undefined
    : entered
      ? "translateY(0) scale(1)"
      : "translateY(22px) scale(0.985)";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      dir="rtl"
      style={{
        transform,
        opacity: entered ? 1 : 0,
        transition: reducedMotion
          ? `opacity ${REDUCED_TRANSITION_MS}ms ease`
          : `transform ${OPEN_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${OPEN_TRANSITION_MS}ms ease`,
      }}
      // الارتفاع يتبع طول الشرح (حد أدنى وأقصى)، و dvh حتى لا يقصّها شريط المتصفح على الجوال
      className="relative flex max-h-[92dvh] min-h-[55dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:mx-4 sm:max-h-[85dvh] sm:max-w-2xl sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10"
    >
      {children}
    </div>
  );
}

type SourceTabsProps = {
  idPrefix: string;
  labels: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

function SourceTabs({
  idPrefix,
  labels,
  selectedIndex,
  onSelect,
}: SourceTabsProps) {
  const total = labels.length;

  function select(index: number) {
    onSelect(index);
    requestAnimationFrame(() => {
      document.getElementById(`${idPrefix}-tab-${index}`)?.focus();
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    // الاتجاه RTL: التبويب الأول على اليمين
    const nextIndex: Record<string, number> = {
      ArrowLeft: (selectedIndex + 1) % total,
      ArrowRight: (selectedIndex - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (!(e.key in nextIndex)) return;
    e.preventDefault();
    select(nextIndex[e.key]);
  }

  return (
    <div className="shrink-0 border-b border-gray-100 dark:border-zinc-800">
      <div
        role="tablist"
        aria-label="مصادر الشرح"
        className="flex gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {labels.map((label, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${index}`}
            aria-selected={index === selectedIndex}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => onSelect(index)}
            onKeyDown={handleKeyDown}
            className={`${tabBaseClass} ${
              index === selectedIndex ? tabActiveClass : tabIdleClass
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
