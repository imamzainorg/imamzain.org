"use client";

import {
  createElement,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { HTMLElement, parse, TextNode } from "node-html-parser";
import { ChevronLeft } from "lucide-react";
import type { Explanation, Phrase } from "@/types/imamzain-legacy";
import {
  buildExplanationSegments,
  type TextSegment,
} from "../_config/explanation-segments";
import { highlightPlain } from "./text-highlight";
import ExplanationTrigger from "./explanation-trigger";
import { openExplanation } from "./explanation-open-store";
import {
  getExplanationMode,
  subscribeExplanationMode,
  type ExplanationMode,
} from "./explanation-mode-store";
import { excerpt, sourceLabels } from "./explanation-utils";
import { toArabicDigits } from "./arabic-digits";

type PhraseContentProps = {
  phrase: Phrase;
  highlightTerm?: string;
};

// طيّ/فتح مدخل الشروحات العامة بدون قياس ارتفاع بالـ JS
const collapseClass =
  "grid [transition:grid-template-rows_400ms_cubic-bezier(0.22,1,0.36,1),opacity_300ms_ease,visibility_400ms] motion-reduce:[transition:none]";

const entryClass = [
  "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-start",
  "ring-1 ring-gray-200 dark:ring-zinc-700 transition-colors",
  "hover:ring-primary/50 hover:bg-primary/[0.04] dark:hover:ring-Muharram_primary/50 dark:hover:bg-Muharram_primary/[0.07]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70",
].join(" ");

const allowedTags = new Set([
  "blockquote",
  "br",
  "em",
  "hr",
  "i",
  "li",
  "ol",
  "p",
  "small",
  "strong",
  "sub",
  "sup",
  "u",
  "ul",
]);
const blockTags = new Set(["blockquote", "div", "hr", "li", "ol", "p", "ul"]);

type PositionedSegment = {
  segment: TextSegment;
  start: number;
  end: number;
};

function containsBlockElement(node: HTMLElement): boolean {
  return node.childNodes.some(
    (child) =>
      child instanceof HTMLElement &&
      (blockTags.has(child.tagName.toLowerCase()) ||
        containsBlockElement(child)),
  );
}

function positionSegments(segments: TextSegment[]): PositionedSegment[] {
  let position = 0;
  return segments.map((segment) => {
    const start = position;
    position += segment.content.length;
    return { segment, start, end: position };
  });
}

function renderPhraseNode(
  node: HTMLElement | TextNode,
  cursor: { value: number },
  segments: PositionedSegment[],
  highlightTerm: string | undefined,
  keyPrefix: string,
): ReactNode {
  if (node instanceof TextNode) {
    const text = node.text;
    const start = cursor.value;
    const end = start + text.length;
    cursor.value = end;

    const nodes: ReactNode[] = [];
    for (const { segment, start: segmentStart, end: segmentEnd } of segments) {
      const overlapStart = Math.max(start, segmentStart);
      const overlapEnd = Math.min(end, segmentEnd);
      if (overlapStart >= overlapEnd) continue;

      const content = text.slice(overlapStart - start, overlapEnd - start);
      if (segment.type === "text") {
        nodes.push(
          <span key={`${keyPrefix}-${overlapStart}`}>
            {highlightPlain(
              content,
              highlightTerm,
              `${keyPrefix}-${overlapStart}`,
            )}
          </span>,
        );
      } else {
        nodes.push(
          <ExplanationTrigger
            key={`${keyPrefix}-${overlapStart}`}
            segmentKey={`${segment.key}-${overlapStart}`}
            text={content}
            explanations={segment.explanations}
            highlightTerm={highlightTerm}
          />,
        );
      }
    }
    return nodes;
  }

  const tagName = node.tagName.toLowerCase();
  const children = node.childNodes.map((child, index) =>
    child instanceof HTMLElement || child instanceof TextNode
      ? renderPhraseNode(
          child,
          cursor,
          segments,
          highlightTerm,
          `${keyPrefix}-${index}`,
        )
      : null,
  );

  if (!allowedTags.has(tagName)) return <>{children}</>;
  if (tagName === "br" || tagName === "hr") {
    return createElement(tagName, { key: keyPrefix });
  }
  const renderedTag =
    tagName === "p" && containsBlockElement(node) ? "div" : tagName;
  return createElement(renderedTag, { key: keyPrefix }, children);
}

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
  const parsedContent = useMemo(() => parse(phrase.content), [phrase.content]);
  const plainContent = parsedContent.text;
  const { segments, inlineExplanationIds, warnings } = useMemo(
    () =>
      buildExplanationSegments(phrase.id, plainContent, phrase.explanations),
    [phrase.id, plainContent, phrase.explanations],
  );
  const positionedSegments = useMemo(
    () => positionSegments(segments),
    [segments],
  );

  const mode = useSyncExternalStore(
    subscribeExplanationMode,
    getExplanationMode,
    () => "reading" as ExplanationMode,
  );
  const isExplain = mode === "explanations";

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

  const belowExplanations = useMemo(
    () =>
      (phrase.explanations ?? []).filter(
        (explanation) =>
          hasNonEmptyContent(explanation) &&
          !inlineExplanationIds.has(explanation.id),
      ),
    [phrase.explanations, inlineExplanationIds],
  );

  const belowLabels = useMemo(
    () => sourceLabels(belowExplanations),
    [belowExplanations],
  );

  const handleOpenGeneral = () => {
    openExplanation({
      segmentKey: `general-${phrase.id}`,
      text: excerpt(plainContent),
      explanations: belowExplanations,
      highlightTerm,
    });
  };
  const contentCursor = { value: 0 };

  return (
    <div>
      {/* النص الأصلي: كما كان تمامًا */}
      <div className="flex-1 text-note max-w-none leading-relaxed text-gray-800 dark:text-Muharram_primary">
        {parsedContent.childNodes.map((node, index) =>
          node instanceof HTMLElement || node instanceof TextNode
            ? renderPhraseNode(
                node,
                contentCursor,
                positionedSegments,
                highlightTerm,
                `phrase-${index}`,
              )
            : null,
        )}
      </div>

      {/* الشروحات العامة على العبارة كاملة: مدخل واحد يفتح نفس نافذة القراءة */}
      {belowExplanations.length > 0 && (
        <div
          aria-hidden={!isExplain}
          className={`${collapseClass} ${
            isExplain
              ? "visible grid-rows-[1fr] opacity-100"
              : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-4">
              <button
                type="button"
                onClick={handleOpenGeneral}
                tabIndex={isExplain ? 0 : -1}
                aria-haspopup="dialog"
                className={entryClass}
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rotate-45 bg-primary dark:bg-Muharram_primary"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
                    شروح على هذه العبارة
                    {belowExplanations.length > 1 && (
                      <span className="ms-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                        {toArabicDigits(belowExplanations.length)}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                    {belowLabels.join(" · ")}
                  </span>
                </span>
                <ChevronLeft
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-primary dark:text-gray-500 dark:group-hover:text-Muharram_primary"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
