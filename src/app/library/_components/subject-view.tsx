"use client";

import SubjectAudioPlayer from "../_components/Subjectaudioplayer";
import { Explanation, Margins, Phrase, Subject } from "@/types/imamzain-legacy";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type SubjectViewProps = {
  subject: Subject;
  margin?: Margins;
};

const removeDiacritics = (text: string) => {
  return text.replace(/[\u064B-\u065F\u0670]/g, "");
};

export default function SubjectView({ subject, margin }: SubjectViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const subjectMargin = margin ?? subject.margins;

  // Read ?highlight= reactively rather than from the server: reading
  // searchParams on the server would force the route dynamic, and
  // useSearchParams keeps the route statically prerendered (behind the
  // Suspense boundary in the page) while still updating on query-only
  // navigations. That last part matters: clicking a search result that
  // points at the subject already open changes only the query string, and a
  // one-shot window.location read at mount would never see it. It is empty
  // during prerender, so highlighting still only appears after hydration.
  const highlightTerm = useSearchParams().get("highlight") ?? undefined;

  useEffect(() => {
    if (!highlightTerm || !containerRef.current) return;

    // sroll to highlighted text
    const timer = setTimeout(() => {
      const firstHighlight = containerRef.current?.querySelector("mark");
      if (firstHighlight) {
        firstHighlight.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstHighlight.classList.add("animate-pulse");
        setTimeout(
          () => firstHighlight.classList.remove("animate-pulse"),
          2000,
        );
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [highlightTerm]);

  const highlightContent = (html: string) => {
    if (!highlightTerm || typeof document === "undefined") return html;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const normalizedTerm = removeDiacritics(highlightTerm.toLowerCase());

    const highlightTextNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const textNormalized = removeDiacritics(text.toLowerCase());

        if (textNormalized.includes(normalizedTerm)) {
          const span = document.createElement("span");

          // map to original indices for correct highlighting
          let normalizedIndex = 0;
          const indexMap: number[] = [];
          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const isDiacritic = /[\u064B-\u065F\u0670]/.test(char);

            if (!isDiacritic) {
              indexMap[normalizedIndex] = i;
              normalizedIndex++;
            }
          }
          indexMap[normalizedIndex] = text.length;

          let result = "";
          let lastIndex = 0;
          let searchIndex = 0;

          while (true) {
            const matchIndex = textNormalized.indexOf(
              normalizedTerm,
              searchIndex,
            );
            if (matchIndex === -1) break;

            const originalStart = indexMap[matchIndex];
            const originalEnd = indexMap[matchIndex + normalizedTerm.length];

            result += text.substring(lastIndex, originalStart);
            result += `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded-sm shadow-sm">${text.substring(originalStart, originalEnd)}</mark>`;

            lastIndex = originalEnd;
            searchIndex = matchIndex + normalizedTerm.length;
          }

          result += text.substring(lastIndex);

          span.innerHTML = result;
          node.parentNode?.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as Element).tagName !== "MARK") {
          Array.from(node.childNodes).forEach(highlightTextNode);
        }
      }
    };

    Array.from(temp.childNodes).forEach(highlightTextNode);
    return temp.innerHTML;
  };

  return (
    <div
      ref={containerRef}
      className="space-y-10"
    >
      {subject.audio && (
        <SubjectAudioPlayer src={subject.audio} title={subject.title} />
      )}

      {subject.phrases?.map((phrase: Phrase) => (
        <div key={phrase.id}>
          <div
            className="max-w-none text-xl leading-[2.2] text-gray-900 md:text-2xl md:leading-[2.3]"
            // safe: phrase.content comes from trusted static JSON; highlight wraps matches in <mark> only
            dangerouslySetInnerHTML={{
              __html: highlightContent(phrase.content),
            }}
          />

          {/* Explanations */}
          {phrase.explanations?.length > 0 &&
            phrase.explanations.some((e: Explanation) => e.content) && (
              <div className="mt-8 space-y-6 border-r-4 border-secondary/60 pr-6 dark:border-Muharram_secondary/60">
                {phrase.explanations.map(
                  (explanation: Explanation, idx: number) =>
                    explanation.content ? (
                      <div key={idx}>
                        {explanation.author && (
                          <div className="mb-2 font-bold text-secondary_dark dark:text-Muharram_secondary">
                            {explanation.author}
                          </div>
                        )}
                        <div
                          className="text-lg leading-loose text-gray-700"
                          // safe: explanation.content comes from trusted static JSON; highlight wraps matches in <mark> only
                          dangerouslySetInnerHTML={{
                            __html: highlightContent(explanation.content),
                          }}
                        />
                      </div>
                    ) : null,
                )}
              </div>
            )}
        </div>
      ))}

      {subjectMargin?.content && (
        <div className="mt-12 border-t border-secondary/40 pt-6 text-right dark:border-Muharram_secondary/40">
          <div
            className="text-base leading-loose text-gray-600"
            dangerouslySetInnerHTML={{
              __html: highlightContent(subjectMargin.content),
            }}
          />
        </div>
      )}
    </div>
  );
}
