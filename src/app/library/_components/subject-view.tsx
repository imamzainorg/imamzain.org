"use client";

import SubjectAudioPlayer from "../_components/Subjectaudioplayer";
import { Margins, Subject } from "@/types/imamzain-legacy";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import PhraseContent from "./phrase-content";
import { highlightPlain } from "./text-highlight";

type SubjectViewProps = {
  subject: Subject;
  margin?: Margins;
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

    // scroll to highlighted text
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

  return (
    <div
      ref={containerRef}
      className="space-y-6 bg-white/70 dark:bg-Muharram_secondary/10 backdrop-blur-md p-6 rounded-xl shadow-sm"
    >
      {subject.audio && (
        <SubjectAudioPlayer src={subject.audio} title={subject.title} />
      )}

      {subject.phrases?.map((phrase) => (
        <PhraseContent key={phrase.id} phrase={phrase} highlightTerm={highlightTerm} />
      ))}

      {subjectMargin?.content && (
        <div className="mt-10 border-t-2 border-double border-primary/30 dark:border-Muharram_primary/30 pt-6 text-right">
          <div className="text-xs leading-loose text-gray-500 dark:text-gray-400">
            {highlightPlain(subjectMargin.content, highlightTerm, `margin-${subjectMargin.id}`)}
          </div>
        </div>
      )}
    </div>
  );
}
