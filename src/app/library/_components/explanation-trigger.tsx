"use client";

import { useId, useRef, useState } from "react";
import type { Explanation } from "@/types/imamzain-legacy";
import { useExplanationMode, useOpenExplanation } from "../_hooks/use-explanation-store";
import { toArabicDigits } from "../_lib/arabic-text";
import { openExplanation } from "../_lib/explanation-store";
import ExplanationPreview from "./explanation-preview";
import { highlightPlain } from "./text-highlight";

type ExplanationTriggerProps = {
  segmentKey: string;
  text: string;
  explanations?: Explanation[];
  highlightTerm?: string;
};

const triggerClass =
  "iz-word-in box-decoration-clone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4  motion-reduce:outline-none";

const supportsHover = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function ExplanationTrigger({
  segmentKey,
  text,
  explanations = [],
  highlightTerm,
}: ExplanationTriggerProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [canHover] = useState(supportsHover);
  const mode = useExplanationMode();
  const openState = useOpenExplanation();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const previewId = useId();

  const hasExplanations = explanations.length > 0;
  const hasMultipleSources = explanations.length > 1;
  const interactive = mode === "explanations" && hasExplanations;
  const isOpen = openState?.segmentKey === segmentKey;
  const showHoverPreview = interactive && canHover && isHovering && !isOpen;

  const highlightedText = highlightPlain(text, highlightTerm, segmentKey);

  if (!interactive) return <span>{highlightedText}</span>;

  const firstExplanation = explanations[0];
  const sourceLabel = hasMultipleSources
    ? `${toArabicDigits(explanations.length)} مصادر`
    : firstExplanation?.author?.trim() || "شرح";
  const sourceInitial = hasMultipleSources
    ? toArabicDigits(explanations.length)
    : (sourceLabel.trim()[0] ?? "•");

  function handleOpen() {
    setIsHovering(false);
    openExplanation({ segmentKey, text, explanations, highlightTerm });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.repeat) return;
    if (e.key === "Enter") {
      e.preventDefault();
      handleOpen();
    } else if (e.key === " ") {
      e.preventDefault();
    }
  }

  // Space يفتح عند رفع المفتاح، كما يفعل <button>
  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  }

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseEnter={() => canHover && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onBlur={() => setIsHovering(false)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={showHoverPreview ? previewId : undefined}
        aria-label={`${text} — شرح متاح${hasMultipleSources ? ` (${explanations.length} مصادر)` : ""}`}
        data-open={isOpen}
        className={triggerClass}
      >
        {highlightedText}
      </span>

      {showHoverPreview && (
        <ExplanationPreview
          id={previewId}
          triggerRef={triggerRef}
          sourceLabel={sourceLabel}
          sourceInitial={sourceInitial}
          excerpt={firstExplanation?.content?.trim() ?? ""}
        />
      )}
    </span>
  );
}
