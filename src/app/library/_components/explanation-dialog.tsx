"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { highlightPlain } from "./text-highlight";
import {
  closeExplanation,
  getOpenExplanation,
  subscribeExplanation,
  getLastSourceIndex,
  setLastSourceIndex,
} from "./explanation-open-store";
import { getPortalRoot, sourceLabels } from "./explanation-utils";
import { toArabicDigits } from "./arabic-digits";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const OPEN_TRANSITION_MS = 360;
const REDUCED_TRANSITION_MS = 120;
// تأثير التصغير اختياري: يُطبَّق فقط على عنصر يحمل هذه السمة (يغلّف محتوى الصفحة)،
// ويجب أن يبقى الهيدر الثابت/الـ sticky خارجه، لأن أي transform يجعل العنصر مرجعًا لأبنائه الثابتين.
const SCALE_ROOT_SELECTOR = "[data-page-scale-root]";

// التبويبات غير النشطة (tabindex=-1) لا تدخل في حلقة التركيز
const FOCUSABLE_SELECTOR =
  'button:not([disabled]):not([tabindex="-1"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const tabBaseClass = [
  "shrink-0 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
  focusRingClass,
].join(" ");

const tabActiveClass =
  "bg-primary text-white dark:bg-Muharram_primary dark:text-zinc-900";

const tabIdleClass =
  "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700";

export default function ExplanationDialog() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const reducedMotion = usePrefersReducedMotion();
  const openState = useSyncExternalStore(
    subscribeExplanation,
    getOpenExplanation,
    () => null,
  );
  const isOpen = openState !== null;
  const currentKey = openState?.segmentKey ?? null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  // مرحلتان للفتح: mounted (بالـ DOM) ثم entered (بعد فريم واحد لتشغيل الانتقال)
  const [entered, setEntered] = useState(false);
  const [syncedKey, setSyncedKey] = useState<string | null>(null);

  // عند فتح شرح جديد: نبدأ من آخر مصدر اختاره المستخدم له
  if (syncedKey !== currentKey) {
    setSyncedKey(currentKey);
    setSelectedIndex(currentKey ? getLastSourceIndex(currentKey) : 0);
    setEntered(false);
  }

  const panelRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const scaleRestoreRef = useRef<(() => void) | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const explanations = openState?.explanations ?? [];
  const hasMultipleSources = explanations.length > 1;
  const labels = sourceLabels(explanations);
  const safeIndex = Math.min(
    selectedIndex,
    Math.max(explanations.length - 1, 0),
  );
  const selected = explanations[safeIndex];
  const isGeneral = currentKey?.startsWith("general-") ?? false;

  const wordCount = selected
    ? selected.content.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readMinutes = Math.max(1, Math.round(wordCount / 170));

  // الإغلاق بحركة خروج، ثم يعود التركيز إلى العنصر الذي فتح النافذة
  const handleClose = useCallback(() => {
    if (closeTimerRef.current !== null) return;
    setEntered(false);
    closeTimerRef.current = window.setTimeout(
      () => {
        closeTimerRef.current = null;
        closeExplanation();
        openerRef.current?.focus({ preventScroll: true });
        openerRef.current = null;
      },
      reducedMotion ? REDUCED_TRANSITION_MS : OPEN_TRANSITION_MS,
    );
  }, [reducedMotion]);

  const handleScroll = useCallback(() => {
    const content = contentRef.current;
    const bar = progressRef.current;
    if (!content || !bar) return;
    const max = content.scrollHeight - content.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, content.scrollTop / max) : 0})`;
  }, []);

  const selectTab = useCallback(
    (idx: number, moveFocus = false) => {
      setSelectedIndex(idx);
      if (moveFocus) {
        requestAnimationFrame(() => {
          document.getElementById(`${titleId}-tab-${idx}`)?.focus();
        });
      }
    },
    [titleId],
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const total = explanations.length;
      // الاتجاه RTL: التبويب الأول على اليمين
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        selectTab((safeIndex + 1) % total, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        selectTab((safeIndex - 1 + total) % total, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        selectTab(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        selectTab(total - 1, true);
      }
    },
    [explanations.length, safeIndex, selectTab],
  );

  // إن أُغلقت النافذة من الخارج نلغي مؤقّت الإغلاق
  useEffect(() => {
    if (!isOpen && closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, [isOpen]);

  // عند إلغاء تركيب المكوّن (مغادرة الصفحة) نغلق أي نافذة مفتوحة
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (getOpenExplanation()) closeExplanation();
    };
  }, []);

  // ── حفظ آخر مصدر مُختار ──
  useEffect(() => {
    if (currentKey) setLastSourceIndex(currentKey, safeIndex);
  }, [currentKey, safeIndex]);

  // ── عند تغيير المصدر: scroll لأعلى وتصفير شريط التقدم ──
  useEffect(() => {
    if (!isOpen) return;
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
    handleScroll();
  }, [safeIndex, isOpen, handleScroll]);

  // ── مرحلة الدخول: mount أولًا بحالة الإغلاق البصرية، ثم فريم واحد لتشغيل الانتقال ──
  useLayoutEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen, currentKey]);

  // ── قفل التمرير طوال فترة الفتح، مع تعويض عرض شريط التمرير حتى لا يهتز المحتوى ──
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const html = document.documentElement;
    const originalOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const side =
      getComputedStyle(html).direction === "rtl" ? "paddingLeft" : "paddingRight";
    const originalPadding = body.style[side];

    if (scrollbarWidth > 0) {
      const current = parseFloat(getComputedStyle(body)[side]) || 0;
      body.style[side] = `${current + scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
      body.style[side] = originalPadding;
    };
  }, [isOpen]);

  // ── تأثير "الوضع الغامر": تصغير + تعتيم خفيف لغلاف المحتوى، يدخل ويخرج مع النافذة ──
  useEffect(() => {
    if (!isOpen || !entered || reducedMotion) return;
    const target = document.querySelector<HTMLElement>(SCALE_ROOT_SELECTOR);
    if (!target) return;

    // إن كانت هناك حركة عكسية سابقة لم تنتهِ نُنهيها أولًا لنلتقط القيم الأصلية الصحيحة
    scaleRestoreRef.current?.();

    const original = {
      transform: target.style.transform,
      filter: target.style.filter,
      transition: target.style.transition,
      transformOrigin: target.style.transformOrigin,
    };

    // نقطة الارتكاز عند منتصف الجزء المرئي من الشاشة، فلا "تقفز" الصفحة وهي ممرَّرة
    const originY = window.innerHeight / 2 - target.getBoundingClientRect().top;
    target.style.transformOrigin = `50% ${originY}px`;
    target.style.transition = `transform ${OPEN_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${OPEN_TRANSITION_MS}ms ease`;
    target.style.transform = "scale(0.97)";
    target.style.filter = "brightness(0.92)";

    return () => {
      target.style.transform = original.transform;
      target.style.filter = original.filter;

      let timer = 0;
      const restore = () => {
        window.clearTimeout(timer);
        target.style.transition = original.transition;
        target.style.transformOrigin = original.transformOrigin;
        scaleRestoreRef.current = null;
      };
      // نعطي وقتًا للحركة العكسية قبل إزالة transition تمامًا
      timer = window.setTimeout(restore, OPEN_TRANSITION_MS);
      scaleRestoreRef.current = restore;
    };
  }, [isOpen, entered, reducedMotion]);

  // ── Focus أولي + Escape + Focus trap ──
  useEffect(() => {
    if (!isOpen) return;

    const active = document.activeElement;
    openerRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    backButtonRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, currentKey, handleClose]);

  if (!mounted || !openState || !selected) return null;

  const panelTransform = reducedMotion
    ? undefined
    : entered
      ? "translateY(0) scale(1)"
      : "translateY(22px) scale(0.985)";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center">
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px] dark:bg-black/60"
        style={{
          opacity: entered ? 1 : 0,
          transition: `opacity ${reducedMotion ? REDUCED_TRANSITION_MS : OPEN_TRANSITION_MS}ms ease`,
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir="rtl"
        style={{
          transform: panelTransform,
          opacity: entered ? 1 : 0,
          transition: reducedMotion
            ? `opacity ${REDUCED_TRANSITION_MS}ms ease`
            : `transform ${OPEN_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${OPEN_TRANSITION_MS}ms ease`,
        }}
        // ارتفاع النافذة يتبع طول الشرح (حد أدنى وحد أقصى)، و dvh حتى لا يقصّها شريط المتصفح على الجوال
        className="relative flex max-h-[92dvh] min-h-[55dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl ring-1 ring-black/5 sm:mx-4 sm:max-h-[85dvh] sm:max-w-2xl sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10"
      >
        {/* مقبض الورقة السفلية على الجوال */}
        <div
          aria-hidden="true"
          className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-gray-300 sm:hidden dark:bg-zinc-700"
        />

        {/* الرأس */}
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

            {wordCount >= 80 && (
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
            {isGeneral ? openState.text : `«${openState.text}»`}
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

        {/* مصادر الشرح: شريط أفقي قابل للتمرير */}
        {hasMultipleSources && (
          <div className="shrink-0 border-b border-gray-100 dark:border-zinc-800">
            <div
              role="tablist"
              aria-label="مصادر الشرح"
              className="flex gap-2 overflow-x-auto px-5 py-3 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {explanations.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  id={`${titleId}-tab-${idx}`}
                  aria-selected={idx === safeIndex}
                  aria-controls={`${titleId}-panel`}
                  tabIndex={idx === safeIndex ? 0 : -1}
                  onClick={() => selectTab(idx)}
                  onKeyDown={handleTabKeyDown}
                  className={`${tabBaseClass} ${
                    idx === safeIndex ? tabActiveClass : tabIdleClass
                  }`}
                >
                  {labels[idx]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* محتوى الشرح — قابل للتمرير */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-8"
        >
          <div
            id={`${titleId}-panel`}
            role={hasMultipleSources ? "tabpanel" : undefined}
            aria-labelledby={
              hasMultipleSources ? `${titleId}-tab-${safeIndex}` : undefined
            }
            key={safeIndex}
            style={{
              animation: reducedMotion
                ? undefined
                : "iz-content-fade 220ms ease",
            }}
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
                openState.highlightTerm,
                `${openState.segmentKey}-exp-${safeIndex}`,
              )}
            </div>
          </div>
        </div>

        {/* تلاشٍ ناعم أسفل منطقة القراءة */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent dark:from-zinc-900"
        />
      </div>

      <style>{`
        @keyframes iz-content-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    getPortalRoot(),
  );
}