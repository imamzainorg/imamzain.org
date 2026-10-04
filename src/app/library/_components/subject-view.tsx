"use client";

import SubjectAudioPlayer from "../_components/Subjectaudioplayer";
import { Margins, Subject } from "@/types/imamzain-legacy";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import PhraseContent from "./phrase-content";
import ExplanationModeToggle from "./explanation-mode-toggle";
import ExplanationDialog from "./explanation-dialog";
import { highlightPlain } from "./text-highlight";
import {
  getExplanationMode,
  setExplanationMode,
  subscribeExplanationMode,
  type ExplanationMode,
} from "./explanation-mode-store";
import { toArabicDigits } from "./arabic-digits";

type SubjectViewProps = {
  subject: Subject;
  margin?: Margins;
};

function explanationsLabel(count: number): string {
  if (count === 1) return "شرح واحد";
  if (count === 2) return "شرحان";
  if (count <= 10) return `${toArabicDigits(count)} شروحات`;
  return `${toArabicDigits(count)} شرحًا`;
}

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const chipIdleClass =
  "bg-gray-50 text-gray-600 ring-gray-200 hover:bg-gray-100 dark:bg-zinc-800/60 dark:text-gray-300 dark:ring-zinc-700 dark:hover:bg-zinc-800";

const chipActiveClass =
  "bg-primary/10 text-primary ring-primary/30 dark:bg-Muharram_primary/15 dark:text-Muharram_primary dark:ring-Muharram_primary/30";

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

  const mode = useSyncExternalStore(
    subscribeExplanationMode,
    getExplanationMode,
    () => "reading" as ExplanationMode,
  );
  const explain = mode === "explanations";

  const explanationsCount = useMemo(
    () =>
      (subject.phrases ?? []).reduce(
        (total, phrase) =>
          total +
          (phrase.explanations ?? []).filter(
            (e) => typeof e.content === "string" && e.content.trim().length > 0,
          ).length,
        0,
      ),
    [subject.phrases],
  );

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
    <>
      <div
        ref={containerRef}
        className={`relative isolate overflow-hidden rounded-2xl px-4 py-8 ring-1 backdrop-blur-md transition-colors duration-700 motion-reduce:transition-none sm:px-10 sm:py-12 ${
          explain
            ? "bg-white/90 ring-primary/25 dark:bg-Muharram_secondary/20 dark:ring-Muharram_primary/25"
            : "bg-white/70 ring-gray-100 dark:bg-Muharram_secondary/10 dark:ring-white/[0.06]"
        }`}
      >
        {/* جوّ وضع الشروحات: توهّج هادئ بلون الموقع يظهر من أعلى الصفحة */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/[0.07] to-transparent transition-opacity duration-700 motion-reduce:transition-none dark:from-Muharram_primary/[0.09] ${
            explain ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto max-w-3xl space-y-8">
          {/* تنبيه وجود الشروحات + مدخل ثانٍ لتبديل الوضع */}
          {explanationsCount > 0 && (
            <div className="flex">
              <button
                key={mode}
                type="button"
                aria-pressed={explain}
                onClick={() =>
                  setExplanationMode(explain ? "reading" : "explanations")
                }
                className={`iz-fade inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full px-3.5 py-2 text-[0.8rem] leading-none ring-1 transition-colors ${focusRingClass} ${
                  explain ? chipActiveClass : chipIdleClass
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rotate-45 bg-current opacity-80"
                />
                <span>
                  {explain
                    ? "وضع الشروحات: اضغط على الكلمة المعلَّمة لقراءة شرحها"
                    : `في هذا الموضوع ${explanationsLabel(explanationsCount)}`}
                </span>
                <span className="font-semibold">
                  {explain ? "العودة للقراءة" : "عرضها"}
                </span>
              </button>
            </div>
          )}

          {subject.audio && (
            <SubjectAudioPlayer src={subject.audio} title={subject.title} />
          )}

          {subject.phrases?.map((phrase) => (
            <PhraseContent
              key={phrase.id}
              phrase={phrase}
              highlightTerm={highlightTerm}
            />
          ))}

          {subjectMargin?.content && (
            <div className="border-t border-gray-200 pt-6 text-right dark:border-zinc-700">
              <div className="text-xs leading-loose text-gray-500 dark:text-gray-400">
                {highlightPlain(
                  subjectMargin.content,
                  highlightTerm,
                  `margin-${subjectMargin.id}`,
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ExplanationDialog />
      <ExplanationModeToggle count={explanationsCount} />
    </>
  );
}