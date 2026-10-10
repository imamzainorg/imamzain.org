"use client";

import {
  Fragment,
  createElement,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { HTMLElement as ParsedElement, TextNode, parse } from "node-html-parser";
import { ChevronLeft } from "lucide-react";
import type { Explanation, Phrase } from "@/types/imamzain-legacy";
import {
  buildExplanationSegments,
  type ExplanationMatchWarning,
  type TextSegment,
} from "../_config/explanation-segments";
import { useExplanationMode } from "../_hooks/use-explanation-store";
import { toArabicDigits } from "../_lib/arabic-text";
import { openExplanation } from "../_lib/explanation-store";
import { excerpt, hasContent, sourceLabels } from "../_lib/explanation-utils";
import ExplanationTrigger from "./explanation-trigger";
import { highlightPlain } from "./text-highlight";

type PhraseContentProps = {
  phrase: Phrase;
  highlightTerm?: string;
};

type ParsedNode = ParsedElement | TextNode;

type PositionedSegment = {
  segment: TextSegment;
  start: number;
  end: number;
};

type RenderContext = {
  cursor: { value: number };
  segments: PositionedSegment[];
  highlightTerm: string | undefined;
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

const ALLOWED_TAGS = new Set([
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
const BLOCK_TAGS = new Set(["blockquote", "div", "hr", "li", "ol", "p", "ul"]);

const WARNING_MESSAGES: Record<ExplanationMatchWarning["reason"], string> = {
  "not-found": "لم يتم العثور على النص داخل العبارة",
  "occurrence-out-of-range": "رقم occurrence خارج النطاق",
  "overlapped-by-longer-match": "تم تجاوزه بسبب تطابق أطول متداخل معه",
};

const isParsedNode = (node: unknown): node is ParsedNode =>
  node instanceof ParsedElement || node instanceof TextNode;

function containsBlockElement(node: ParsedElement): boolean {
  return node.childNodes.some(
    (child) =>
      child instanceof ParsedElement &&
      (BLOCK_TAGS.has(child.tagName.toLowerCase()) || containsBlockElement(child)),
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

/** Splits one text node along the segment boundaries: plain text or explained words. */
function renderTextNode(
  node: TextNode,
  { cursor, segments, highlightTerm }: RenderContext,
  keyPrefix: string,
): ReactNode[] {
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
    const key = `${keyPrefix}-${overlapStart}`;

    nodes.push(
      segment.type === "text" ? (
        <span key={key}>{highlightPlain(content, highlightTerm, key)}</span>
      ) : (
        <ExplanationTrigger
          key={key}
          segmentKey={`${segment.key}-${overlapStart}`}
          text={content}
          explanations={segment.explanations}
          highlightTerm={highlightTerm}
        />
      ),
    );
  }
  return nodes;
}

function renderPhraseNode(
  node: ParsedNode,
  context: RenderContext,
  keyPrefix: string,
): ReactNode {
  if (node instanceof TextNode) return renderTextNode(node, context, keyPrefix);

  const tagName = node.tagName.toLowerCase();
  const children = node.childNodes.map((child, index) =>
    isParsedNode(child)
      ? renderPhraseNode(child, context, `${keyPrefix}-${index}`)
      : null,
  );

  if (!ALLOWED_TAGS.has(tagName)) {
    return <Fragment key={keyPrefix}>{children}</Fragment>;
  }
  if (tagName === "br" || tagName === "hr") {
    return createElement(tagName, { key: keyPrefix });
  }
  const renderedTag =
    tagName === "p" && containsBlockElement(node) ? "div" : tagName;
  return createElement(renderedTag, { key: keyPrefix }, children);
}

export default function PhraseContent({
  phrase,
  highlightTerm,
}: PhraseContentProps) {
  const { root, plainContent, positionedSegments, inlineExplanationIds, warnings } =
    useMemo(() => {
      const root = parse(phrase.content);
      const plainContent = root.text;
      const { segments, inlineExplanationIds, warnings } =
        buildExplanationSegments(phrase.id, plainContent, phrase.explanations);

      return {
        root,
        plainContent,
        positionedSegments: positionSegments(segments),
        inlineExplanationIds,
        warnings,
      };
    }, [phrase.id, phrase.content, phrase.explanations]);

  const isExplainMode = useExplanationMode() === "explanations";

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    for (const warning of warnings) {
      console.warn(
        `[explanations] phrase ${warning.phraseId} · explanation ${warning.explanationId} ("${warning.text}"): ${WARNING_MESSAGES[warning.reason]}`,
      );
    }
  }, [warnings]);

  // شروح لم تجد موضعها داخل النص، أو شروح عامة على العبارة كاملة
  const generalExplanations = (phrase.explanations ?? []).filter(
    (explanation) =>
      hasContent(explanation) && !inlineExplanationIds.has(explanation.id),
  );

  const renderContext: RenderContext = {
    cursor: { value: 0 },
    segments: positionedSegments,
    highlightTerm,
  };

  return (
    <div>
      <div className="flex-1 text-note max-w-none leading-relaxed text-gray-800 dark:text-Muharram_primary">
        {root.childNodes.map((node, index) =>
          isParsedNode(node)
            ? renderPhraseNode(node, renderContext, `phrase-${index}`)
            : null,
        )}
      </div>

      {generalExplanations.length > 0 && (
        <GeneralExplanationsEntry
          explanations={generalExplanations}
          isVisible={isExplainMode}
          onOpen={() =>
            openExplanation({
              segmentKey: `general-${phrase.id}`,
              text: excerpt(plainContent),
              explanations: generalExplanations,
              highlightTerm,
            })
          }
        />
      )}
    </div>
  );
}

type GeneralExplanationsEntryProps = {
  explanations: Explanation[];
  isVisible: boolean;
  onOpen: () => void;
};

/** Single entry that opens the shared reading dialog for explanations on the whole phrase. */
function GeneralExplanationsEntry({
  explanations,
  isVisible,
  onOpen,
}: GeneralExplanationsEntryProps) {
  return (
    <div
      aria-hidden={!isVisible}
      className={`${collapseClass} ${
        isVisible
          ? "visible grid-rows-[1fr] opacity-100"
          : "invisible grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="pt-4">
          <button
            type="button"
            onClick={onOpen}
            tabIndex={isVisible ? 0 : -1}
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
                {explanations.length > 1 && (
                  <span className="ms-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                    {toArabicDigits(explanations.length)}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                {sourceLabels(explanations).join(" · ")}
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
  );
}
