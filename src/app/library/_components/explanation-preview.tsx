"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { getPortalRoot } from "../_lib/explanation-utils";

type ExplanationPreviewProps = {
  id: string;
  triggerRef: RefObject<HTMLElement | null>;
  sourceLabel: string;
  sourceInitial: string;
  excerpt: string;
};

const PREVIEW_WIDTH = 320;
const VIEWPORT_MARGIN = 12;
const ARROW_SIZE = 10;
const ANIM_MS = 180;

type Position = {
  top: number;
  left: number;
  arrowLeft: number;
  placement: "bottom" | "top";
};

const INITIAL_POSITION: Position = {
  top: 0,
  left: 0,
  arrowLeft: PREVIEW_WIDTH / 2,
  placement: "bottom",
};

const cardClass = [
  "z-[9999] overflow-visible rounded-2xl p-[1px] pointer-events-none",
  "bg-gradient-to-br from-primary/25 via-primary/10 to-transparent",
  "dark:from-Muharram_primary/30 dark:via-Muharram_primary/10 dark:to-transparent",
  "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]",
  "dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]",
  "explanation-preview-enter",
  "motion-reduce:animate-none",
].join(" ");

const arrowClass =
  "absolute h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-gradient-to-br from-primary/25 to-primary/5 dark:from-Muharram_primary/30 dark:to-Muharram_primary/5";

const badgeClass = [
  "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5",
  "text-[0.65rem] font-bold leading-none",
  "bg-gradient-to-br from-primary to-primary/70 text-white",
  "dark:from-Muharram_primary dark:to-Muharram_primary/70",
  "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.35)]",
].join(" ");

const chevronBadgeClass = [
  "flex h-5 w-5 items-center justify-center rounded-full",
  "bg-primary/[0.08] text-primary",
  "dark:bg-Muharram_primary/[0.14] dark:text-Muharram_primary",
].join(" ");

/** Hover card shown under (or above) the explained word, positioned from the trigger's rect. */
export default function ExplanationPreview({
  id,
  triggerRef,
  sourceLabel,
  sourceInitial,
  excerpt,
}: ExplanationPreviewProps) {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const previewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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

      let placement: Position["placement"] = "bottom";
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

      setPosition((prev) =>
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
  }, [triggerRef]);

  return createPortal(
    <div
      ref={previewRef}
      id={id}
      role="tooltip"
      dir="rtl"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: PREVIEW_WIDTH,
        maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`,
        animationDuration: `${ANIM_MS}ms`,
      }}
      className={cardClass}
    >
      <span
        aria-hidden="true"
        style={{ left: position.arrowLeft }}
        className={`${arrowClass} ${
          position.placement === "bottom" ? "-top-1.5" : "-bottom-1.5"
        }`}
      />

      <div className="relative rounded-[15px] bg-white/95 p-4 backdrop-blur-xl dark:bg-zinc-900/95">
        <div className="mb-2.5 flex items-center gap-2">
          <span aria-hidden="true" className={badgeClass}>
            {sourceInitial}
          </span>
          <span className="truncate text-[0.72rem] font-semibold tracking-wide text-primary dark:text-Muharram_primary">
            {sourceLabel}
          </span>
          <span
            aria-hidden="true"
            className="ms-auto h-px flex-1 bg-gradient-to-l from-transparent via-primary/20 to-transparent dark:via-Muharram_primary/20"
          />
        </div>

        {excerpt && (
          <p className="line-clamp-4 break-words text-[0.82rem] leading-[1.9] text-gray-700 dark:text-gray-200">
            {excerpt}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[0.68rem] text-gray-400 dark:text-gray-500">
            اضغط لقراءة الشرح كاملًا
          </span>
          <span aria-hidden="true" className={chevronBadgeClass}>
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
  );
}
