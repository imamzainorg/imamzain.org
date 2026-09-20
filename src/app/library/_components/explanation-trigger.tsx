"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { Explanation } from "@/types/imamzain-legacy";
import { highlightPlain } from "./text-highlight";

type ExplanationTriggerProps = {
  segmentKey: string;
  text: string;
  explanations: Explanation[];
  highlightTerm?: string;
};

const PREVIEW_LENGTH = 90;
const VIEWPORT_MARGIN = 8;
const POPOVER_WIDTH_FALLBACK = 288;

export default function ExplanationTrigger({
  segmentKey,
  text,
  explanations,
  highlightTerm,
}: ExplanationTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [canHover] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });
  const [popoverStyle, setPopoverStyle] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  const showPreview = isOpen || isHovering;

  useLayoutEffect(() => {
    if (!showPreview) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updatePosition = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const popover = popoverRef.current;
      const width = popover?.offsetWidth ?? POPOVER_WIDTH_FALLBACK;
      const height = popover?.offsetHeight ?? 0;

      let left = triggerRect.left + triggerRect.width / 2 - width / 2;
      left = Math.max(
        VIEWPORT_MARGIN,
        Math.min(left, window.innerWidth - width - VIEWPORT_MARGIN),
      );

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const placeAbove =
        spaceBelow < height + VIEWPORT_MARGIN &&
        triggerRect.top > height + VIEWPORT_MARGIN;

      const top = placeAbove
        ? triggerRect.top - VIEWPORT_MARGIN - height
        : triggerRect.bottom + VIEWPORT_MARGIN;

      setPopoverStyle({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showPreview]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const first = explanations[0];
  const extraCount = explanations.length - 1;
  const previewText =
    first.content.length > PREVIEW_LENGTH
      ? `${first.content.slice(0, PREVIEW_LENGTH)}…`
      : first.content;

  return (
    <span className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="underline decoration-dotted decoration-primary/60 dark:decoration-Muharram_primary/60 underline-offset-4 text-inherit hover:decoration-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70 rounded-sm"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={showPreview ? popoverId : undefined}
        aria-label={`${text} — شرح متاح`}
        onMouseEnter={() => canHover && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((v) => !v);
        }}
      >
        {highlightPlain(text, highlightTerm, segmentKey)}
      </button>

      {showPreview && (
        <div
          ref={popoverRef}
          id={popoverId}
          role={isOpen ? "dialog" : "tooltip"}
          aria-label={isOpen ? `شرح: ${text}` : undefined}
          dir="rtl"
          style={{
            position: "fixed",
            top: popoverStyle.top,
            left: popoverStyle.left,
          }}
          className="z-50 w-72 max-w-[calc(100vw-1rem)] max-h-72 overflow-y-auto rounded-xl border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl p-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {isOpen ? (
            <div className="space-y-4">
              {explanations.map((explanation, idx) => (
                <div
                  key={explanation.id ?? idx}
                  className={
                    idx > 0
                      ? "pt-4 border-t border-gray-100 dark:border-zinc-700"
                      : undefined
                  }
                >
                  {explanation.author && (
                    <div className="text-xs font-medium text-primary dark:text-Muharram_primary mb-1">
                      {explanation.author}
                    </div>
                  )}
                  <div>
                    {highlightPlain(
                      explanation.content,
                      highlightTerm,
                      `${segmentKey}-exp-${idx}`,
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {previewText}
              {extraCount > 0 && (
                <span className="block mt-1 text-xs text-gray-400">
                  +{extraCount} {extraCount === 1 ? "شرح آخر" : "شروحات أخرى"}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </span>
  );
}
