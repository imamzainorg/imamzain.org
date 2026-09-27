"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { Explanation } from "@/types/imamzain-legacy";
import { highlightPlain } from "./text-highlight";
import {
  openExplanation,
  closeExplanation,
  getOpenExplanation,
  subscribeExplanation,
  getLastSourceIndex,
  setLastSourceIndex,
} from "./explanation-open-store";

type ExplanationTriggerProps = {
  segmentKey: string;
  text: string;
  explanations?: Explanation[];
  highlightTerm?: string;
};

const PREVIEW_WIDTH = 200;
const VIEWPORT_MARGIN = 10;
const ARROW_SIZE = 10;
const OPEN_TRANSITION_MS = 320;

function sourceLabels(explanations: Explanation[]): string[] {
  const seen = new Map<string, number>();
  return explanations.map((exp) => {
    const raw = exp.author?.trim();
    if (!raw) {
      const idx = (seen.get("__no_author__") ?? 0) + 1;
      seen.set("__no_author__", idx);
      return `مصدر ${idx}`;
    }
    const count = (seen.get(raw) ?? 0) + 1;
    seen.set(raw, count);
    return count > 1 ? `${raw} (${count})` : raw;
  });
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(reducedMotionQuery).matches
    : false;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
function getPortalRoot(): HTMLElement {
  let root = document.getElementById("explanation-portal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "explanation-portal-root";
    // ملاحظة: نلحقه بـ <html> وليس <body>، حتى لا يتأثر
    // بأي transform/filter يُطبَّق على body (مثل تأثير التصغير هنا)
    document.documentElement.appendChild(root);
  }
  return root;
}
export default function ExplanationTrigger({
  segmentKey,
  text,
  explanations = [],
  highlightTerm,
}: ExplanationTriggerProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // مرحلتان للفتح: mounted (بالـ DOM) ثم entered (بعد فريم واحد لتشغيل الـ transition)
  const [entered, setEntered] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [canHover] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const reducedMotion = usePrefersReducedMotion();

  const openState = useSyncExternalStore(
    subscribeExplanation,
    getOpenExplanation,
    () => null,
  );
  const isOpen = openState?.segmentKey === segmentKey;
  const showHoverPreview = canHover && isHovering && !isOpen;

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    arrowLeft: PREVIEW_WIDTH / 2,
    placement: "bottom" as "bottom" | "top",
  });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previewId = useId();

  const hasExplanations = explanations.length > 0;
  const hasMultipleSources = explanations.length > 1;
  const labels = useMemo(() => sourceLabels(explanations), [explanations]);

  const handleClose = useCallback(() => {
    setEntered(false);
    closeExplanation();
    triggerRef.current?.focus();
  }, []);

  const handleOpen = useCallback(() => {
    if (!hasExplanations) return;
    setIsHovering(false);
    setEntered(false);
    setSelectedIndex(getLastSourceIndex(segmentKey));
    openExplanation({ segmentKey, text, explanations, highlightTerm });
  }, [segmentKey, text, explanations, highlightTerm, hasExplanations]);

  // ── حفظ آخر مصدر مُختار ──
  useEffect(() => {
    if (isOpen) setLastSourceIndex(segmentKey, selectedIndex);
  }, [isOpen, segmentKey, selectedIndex]);

  // ── إعادة scroll المحتوى لأعلى عند تغيير المصدر ──
  useEffect(() => {
    if (isOpen) contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedIndex, isOpen]);

  // ── مرحلة الدخول: mount أولًا بحالة الإغلاق البصرية، ثم فريم واحد لتشغيل الانتقال ──
  useLayoutEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  // ── تأثير "الوضع الغامر" على الصفحة الأصلية: تصغير + تعتيم خفيف ──
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const originalTransform = body.style.transform;
    const originalFilter = body.style.filter;
    const originalTransition = body.style.transition;
    const originalTransformOrigin = body.style.transformOrigin;
    const originalOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    if (!reducedMotion) {
      body.style.transformOrigin = "center top";
      body.style.transition = `transform ${OPEN_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${OPEN_TRANSITION_MS}ms ease`;
      const raf = requestAnimationFrame(() => {
        body.style.transform = "scale(0.97)";
        body.style.filter = "brightness(0.92)";
      });
      return () => {
        cancelAnimationFrame(raf);
        body.style.transform = originalTransform;
        body.style.filter = originalFilter;
        // نعطي وقت للحركة العكسية قبل إزالة transition تمامًا
        requestAnimationFrame(() => {
          setTimeout(() => {
            body.style.transition = originalTransition;
            body.style.transformOrigin = originalTransformOrigin;
          }, OPEN_TRANSITION_MS);
        });
        body.style.overflow = originalOverflow;
      };
    }

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isOpen, reducedMotion]);

  // ── Focus أولي + Escape + Focus trap ──
  useEffect(() => {
    if (!isOpen) return;
    backButtonRef.current?.focus();

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
  }, [isOpen, handleClose]);

  // ── تموضع معاينة الـ Hover ──
  useLayoutEffect(() => {
    if (!showHoverPreview) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updatePosition = () => {
      const preview = previewRef.current;
      if (!preview) return;

      const triggerRect = trigger.getBoundingClientRect();
      const width = preview.offsetWidth || PREVIEW_WIDTH;
      const height = preview.offsetHeight || 0;

      let left = triggerRect.left + triggerRect.width / 2 - width / 2;
      left = Math.max(
        VIEWPORT_MARGIN,
        Math.min(left, window.innerWidth - width - VIEWPORT_MARGIN),
      );

      let placement: "bottom" | "top" = "bottom";
      let top = triggerRect.bottom + VIEWPORT_MARGIN;

      if (top + height > window.innerHeight - VIEWPORT_MARGIN && height > 0) {
        placement = "top";
        top = Math.max(
          VIEWPORT_MARGIN,
          triggerRect.top - height - VIEWPORT_MARGIN,
        );
      }

      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const arrowLeft = Math.max(
        ARROW_SIZE + 4,
        Math.min(triggerCenter - left, width - ARROW_SIZE - 4),
      );

      setPos({ top, left, arrowLeft, placement });
    };

    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showHoverPreview]);

  const selectTab = useCallback((idx: number) => {
    setSelectedIndex(idx);
  }, []);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        selectTab((selectedIndex + 1) % explanations.length);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        selectTab(
          (selectedIndex - 1 + explanations.length) % explanations.length,
        );
      } else if (e.key === "Home") {
        e.preventDefault();
        selectTab(0);
      } else if (e.key === "End") {
        e.preventDefault();
        selectTab(explanations.length - 1);
      }
    },
    [selectedIndex, explanations.length, selectTab],
  );

  if (!hasExplanations) {
    return <span>{highlightPlain(text, highlightTerm, segmentKey)}</span>;
  }

  const selected = explanations[selectedIndex] ?? explanations[0];

  const hoverPreview =
    mounted && showHoverPreview
      ? createPortal(
          <div
            ref={previewRef}
            id={previewId}
            role="tooltip"
            dir="rtl"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: PREVIEW_WIDTH,
            }}
            className="z-[9999] max-w-[calc(100vw-1.5rem)] rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl px-3 py-2.5 text-xs"
          >
            <span
              aria-hidden="true"
              style={{ left: pos.arrowLeft }}
              className={
                pos.placement === "bottom"
                  ? "absolute -top-1 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white dark:bg-zinc-800 border-t border-l border-gray-200 dark:border-zinc-700"
                  : "absolute -bottom-1 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white dark:bg-zinc-800 border-b border-r border-gray-200 dark:border-zinc-700"
              }
            />
            <div className="flex items-center gap-1.5 text-primary dark:text-Muharram_primary font-medium">
              <span aria-hidden="true">◐</span>
              <span>اقرأ الشرح</span>
            </div>
          </div>,
          getPortalRoot(),
        )
      : null;

  // حالة الحركة: مغلق تمامًا → entering (بدأ الفتح) → مفتوح بالكامل
  const panelTransform = reducedMotion
    ? undefined
    : entered
      ? "translateY(0)"
      : "translateY(24px)";
  const panelOpacity = reducedMotion ? (entered ? 1 : 0) : entered ? 1 : 0;
  const backdropOpacity = entered ? 1 : 0;

  const panel =
    mounted && isOpen
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
              style={{
                opacity: backdropOpacity,
                transition: reducedMotion
                  ? "opacity 120ms ease"
                  : `opacity ${OPEN_TRANSITION_MS}ms ease`,
              }}
              onClick={handleClose}
              aria-hidden="true"
            />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              dir="rtl"
              style={{
                transform: panelTransform,
                opacity: panelOpacity,
                transition: reducedMotion
                  ? "opacity 120ms ease"
                  : `transform ${OPEN_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${OPEN_TRANSITION_MS}ms ease`,
              }}
              className="relative w-full sm:max-w-2xl sm:mx-4 bg-white dark:bg-zinc-800 rounded-t-2xl sm:rounded-2xl shadow-2xl h-[92vh] sm:h-[85vh] flex flex-col overflow-hidden"
            >
              {/* رأس: زر العودة + عنوان الكلمة/الجملة */}
              <div className="shrink-0 px-5 sm:px-8 pt-5 pb-4 border-b border-gray-100 dark:border-zinc-700">
                <button
                  ref={backButtonRef}
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary dark:hover:text-Muharram_primary transition-colors mb-4 -mr-1 px-1 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70"
                >
                  <span aria-hidden="true">→</span>
                  <span>العودة إلى النص</span>
                </button>
                <h2
                  id={titleId}
                  className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed"
                >
                  شرح: «{text}»
                </h2>
              </div>

              {/* مصادر الشرح */}
              {hasMultipleSources && (
                <div className="shrink-0 px-5 sm:px-8 py-3 border-b border-gray-100 dark:border-zinc-700">
                  <div
                    role="tablist"
                    aria-label="مصادر الشرح"
                    className="flex flex-wrap gap-2"
                  >
                    {explanations.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        id={`${titleId}-tab-${idx}`}
                        aria-selected={idx === selectedIndex}
                        aria-controls={`${titleId}-panel`}
                        tabIndex={idx === selectedIndex ? 0 : -1}
                        onClick={() => selectTab(idx)}
                        onKeyDown={handleTabKeyDown}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                          idx === selectedIndex
                            ? "bg-primary text-white dark:bg-Muharram_primary dark:text-zinc-900"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600"
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
                className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-6"
              >
                <div
                  id={`${titleId}-panel`}
                  role={hasMultipleSources ? "tabpanel" : undefined}
                  aria-labelledby={
                    hasMultipleSources
                      ? `${titleId}-tab-${selectedIndex}`
                      : undefined
                  }
                  key={selectedIndex}
                  style={{
                    animation: reducedMotion
                      ? undefined
                      : "iz-content-fade 200ms ease",
                  }}
                >
                  {selected.author?.trim() && (
                    <div className="text-base font-semibold text-primary dark:text-Muharram_primary mb-4">
                      {selected.author}
                    </div>
                  )}
                  <div className="text-[16px] sm:text-[17px] leading-[2] whitespace-pre-wrap break-words text-gray-700 dark:text-gray-200">
                    {highlightPlain(
                      selected.content,
                      highlightTerm,
                      `${segmentKey}-exp-${selectedIndex}`,
                    )}
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              @keyframes iz-content-fade {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>,
          getPortalRoot(),
        )
      : null;

  return (
    <span className="relative inline">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        onMouseEnter={() => canHover && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => canHover && setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={showHoverPreview ? previewId : undefined}
        aria-label={`${text} — شرح متاح${hasMultipleSources ? ` (${explanations.length} مصادر)` : ""}`}
        className={`text-inherit cursor-pointer rounded-[3px] px-0.5 -mx-0.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70 ${
          isOpen
            ? "bg-primary/[0.18] dark:bg-Muharram_primary/[0.26] ring-1 ring-primary/30 dark:ring-Muharram_primary/30"
            : showHoverPreview
              ? "bg-primary/[0.10] dark:bg-Muharram_primary/[0.16]"
              : "bg-primary/[0.055] dark:bg-Muharram_primary/[0.10] hover:bg-primary/[0.10] dark:hover:bg-Muharram_primary/[0.16]"
        }`}
      >
        {highlightPlain(text, highlightTerm, segmentKey)}
      </button>

      {hoverPreview}
      {panel}
    </span>
  );
}
