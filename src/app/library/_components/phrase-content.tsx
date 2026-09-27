"use client";

import { useEffect, useMemo } from "react";
import type { Explanation, Phrase } from "@/types/imamzain-legacy";
import { buildExplanationSegments } from "../_config/explanation-segments";
import { highlightPlain } from "./text-highlight";
import ExplanationTrigger from "./explanation-trigger";

type PhraseContentProps = {
  phrase: Phrase;
  highlightTerm?: string;
};

function hasNonEmptyContent(explanation: Explanation): boolean {
  return (
    typeof explanation.content === "string" &&
    explanation.content.trim().length > 0
  );
}

export default function PhraseContent({
  phrase,
  highlightTerm,
}: PhraseContentProps) {
  const { segments, inlineExplanationIds, warnings } = useMemo(
    () =>
      buildExplanationSegments(phrase.id, phrase.content, phrase.explanations),
    [phrase.id, phrase.content, phrase.explanations],
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || warnings.length === 0) return;

    for (const warning of warnings) {
      const reasonText =
        warning.reason === "not-found"
          ? "لم يتم العثور على النص داخل العبارة"
          : warning.reason === "occurrence-out-of-range"
            ? "رقم occurrence خارج النطاق"
            : "تم تجاوزه بسبب تطابق أطول متداخل معه";

      console.warn(
        `[explanations] phrase ${warning.phraseId} · explanation ${warning.explanationId} ("${warning.text}"): ${reasonText}`,
      );
    }
  }, [warnings]);

  const belowExplanations = (phrase.explanations ?? []).filter(
    (explanation) =>
      hasNonEmptyContent(explanation) &&
      !inlineExplanationIds.has(explanation.id),
  );

  return (
    <div>
      <div className="flex-1 text-note max-w-none leading-relaxed text-gray-800 dark:text-Muharram_primary">
        {segments.map((segment) =>
          segment.type === "text" ? (
            <span key={segment.key}>
              {highlightPlain(segment.content, highlightTerm, segment.key)}
            </span>
          ) : (
            <ExplanationTrigger
              key={segment.key}
              segmentKey={segment.key}
              text={segment.content}
              explanations={segment.explanations}
              highlightTerm={highlightTerm}
            />
          ),
        )}
      </div>

      {belowExplanations.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 space-y-4">
          {belowExplanations.map((explanation, index) => (
            <div key={explanation.id ?? index} className="pr-14">
              {explanation.author && (
                <div className="text-sm font-medium text-primary dark:text-Muharram_primary mb-2">
                  {explanation.author}
                </div>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {highlightPlain(
                  explanation.content,
                  highlightTerm,
                  `below-${phrase.id}-${index}`,
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
