"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { Explanation } from "@/types/imamzain-legacy";
import { highlightPlain } from "./text-highlight";
import {
  openExplanation,
  getOpenExplanation,
  subscribeExplanation,
} from "./explanation-open-store";
import {
  getExplanationMode,
  subscribeExplanationMode,
  type ExplanationMode,
} from "./explanation-mode-store";
import { getPortalRoot } from "./explanation-utils";
import { toArabicDigits } from "./arabic-digits";

type ExplanationTriggerProps = {
  segmentKey: string;
  text: string;
  explanations?: Explanation[];
  highlightTerm?: string;
};

const PREVIEW_WIDTH = 320;
const VIEWPORT_MARGIN = 12;
const ARROW_SIZE = 10;
const ANIM_MS = 180;

/* ───────── Style tokens ───────── */

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4  motion-reduce:outline-none";

const triggerBaseClass = [
  "iz-word-in box-decoration-clone",
  focusRingClass,
].join(" ");

export default function ExplanationTrigger({
  segmentKey,
  text,
  explanations = [],
  highlightTerm,
}: ExplanationTriggerProps) {
  const [isHovering, setIsHovering] = useState(false);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [canHover] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  const mode = useSyncExternalStore(
    subscribeExplanationMode,
    getExplanationMode,
    () => "reading" as ExplanationMode,
  );

  const openState = useSyncExternalStore(
    subscribeExplanation,
    getOpenExplanation,
    () => null,
  );

  const hasExplanations = explanations.length > 0;
  const hasMultipleSources = explanations.length > 1;
  const interactive = mode === "explanations" && hasExplanations;
  const isOpen = openState?.segmentKey === segmentKey;
  const showHoverPreview = interactive && canHover && isHovering && !isOpen;

  const [pos, setPos] = useState({
    top: 0,
    left: 0,
    arrowLeft: PREVIEW_WIDTH / 2,
    placement: "bottom" as "bottom" | "top",
  });

  const triggerRef = useRef<HTMLSpanElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewId = useId();

  const handleOpen = useCallback(() => {
    if (!hasExplanations) return;
    setIsHovering(false);
    openExplanation({ segmentKey, text, explanations, highlightTerm });
  }, [segmentKey, text, explanations, highlightTerm, hasExplanations]);

  /* ── تموضع المعاينة ── */
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
        ARROW_SIZE + 6,
        Math.min(triggerCenter - left, width - ARROW_SIZE - 6),
      );

      setPos((prev) =>
        prev.top === top &&
        prev.left === left &&
        prev.arrowLeft === arrowLeft &&
        prev.placement === placement
          ? prev
          : { top, left, arrowLeft, placement },
      );
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showHoverPreview]);

  /* ── وضع القراءة: نص نظيف ── */
  if (!interactive) {
    return <span>{highlightPlain(text, highlightTerm, segmentKey)}</span>;
  }

  const previewText = explanations[0]?.content?.trim() ?? "";
  const previewSource = hasMultipleSources
    ? `${toArabicDigits(explanations.length)} مصادر`
    : explanations[0]?.author?.trim() || "شرح";

  const sourceInitial = hasMultipleSources
    ? toArabicDigits(explanations.length)
    : (previewSource.trim()[0] ?? "•");

  /* ── بطاقة المعاينة الزجاجية ── */
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
              maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`,
              animationDuration: `${ANIM_MS}ms`,
            }}
            className={[
              "z-[9999] overflow-visible rounded-2xl p-[1px] pointer-events-none",
              "bg-gradient-to-br from-primary/25 via-primary/10 to-transparent",
              "dark:from-Muharram_primary/30 dark:via-Muharram_primary/10 dark:to-transparent",
              "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]",
              "dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]",
              "explanation-preview-enter",
              "motion-reduce:animate-none",
            ].join(" ")}
          >
            {/* السهم */}
            <span
              aria-hidden="true"
              style={{ left: pos.arrowLeft }}
              className={[
                "absolute h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px]",
                "bg-gradient-to-br from-primary/25 to-primary/5",
                "dark:from-Muharram_primary/30 dark:to-Muharram_primary/5",
                pos.placement === "bottom" ? "-top-1.5" : "-bottom-1.5",
              ].join(" ")}
            />

            {/* جسم البطاقة */}
            <div
              className={[
                "relative rounded-[15px] p-4",
                "bg-white/95 backdrop-blur-xl",
                "dark:bg-zinc-900/95",
              ].join(" ")}
            >
              {/* رأس البطاقة */}
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5",
                    "text-[0.65rem] font-bold leading-none",
                    "bg-gradient-to-br from-primary to-primary/70 text-white",
                    "dark:from-Muharram_primary dark:to-Muharram_primary/70",
                    "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.35)]",
                  ].join(" ")}
                >
                  {sourceInitial}
                </span>
                <span className="truncate text-[0.72rem] font-semibold tracking-wide text-primary dark:text-Muharram_primary">
                  {previewSource}
                </span>
                <span
                  aria-hidden="true"
                  className="ms-auto h-px flex-1 bg-gradient-to-l from-transparent via-primary/20 to-transparent dark:via-Muharram_primary/20"
                />
              </div>

              {/* المقتطف — الآن 4 أسطر بدل 3 لأن الشروحات قد تكون طويلة */}
              {previewText && (
                <p
                  className="break-words text-[0.82rem] leading-[1.9] text-gray-700 dark:text-gray-200"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {previewText}
                </p>
              )}

              {/* تلميح الإجراء */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[0.68rem] text-gray-400 dark:text-gray-500">
                  اضغط لقراءة الشرح كاملًا
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    "bg-primary/[0.08] text-primary",
                    "dark:bg-Muharram_primary/[0.14] dark:text-Muharram_primary",
                  ].join(" ")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>,
          getPortalRoot(),
        )
      : null;

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.repeat) return;
          if (e.key === "Enter") {
            e.preventDefault();
            handleOpen();
          } else if (e.key === " ") {
            e.preventDefault();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        onMouseEnter={() => canHover && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onBlur={() => setIsHovering(false)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={showHoverPreview ? previewId : undefined}
        aria-label={`${text} — شرح متاح${hasMultipleSources ? ` (${explanations.length} مصادر)` : ""}`}
        data-open={isOpen}
        className={triggerBaseClass}
      >
        {highlightPlain(text, highlightTerm, segmentKey)}
      </span>

      {hoverPreview}
    </span>
  );
}