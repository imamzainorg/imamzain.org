"use client";

import "../_styles/explanation-motion.css";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { Subject } from "@/types/imamzain-legacy";
import { useExplanationMode } from "../_hooks/use-explanation-store";
import { toArabicDigits } from "../_lib/arabic-text";
import { setExplanationMode } from "../_lib/explanation-store";
import { hasContent } from "../_lib/explanation-utils";
import ExplanationDialog from "./explanation-dialog";
import ExplanationModeToggle from "./explanation-mode-toggle";
import PhraseContent from "./phrase-content";
import SubjectAudioPlayer from "./subject-audio-player";
import { highlightHtml } from "./text-highlight";

const HIGHLIGHT_SCROLL_DELAY_MS = 300;
const HIGHLIGHT_PULSE_MS = 2000;

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const chipIdleClass =
  "bg-gray-50 text-gray-600 ring-gray-200 hover:bg-gray-100 dark:bg-zinc-800/60 dark:text-gray-300 dark:ring-zinc-700 dark:hover:bg-zinc-800";

const chipActiveClass =
  "bg-primary/10 text-primary ring-primary/30 dark:bg-Muharram_primary/15 dark:text-Muharram_primary dark:ring-Muharram_primary/30";

const containerBaseClass =
  "relative isolate overflow-hidden rounded-2xl px-4 py-8 ring-1 backdrop-blur-md transition-colors duration-700 motion-reduce:transition-none sm:px-10 sm:py-12";
const containerReadingClass =
  "bg-white/70 ring-gray-100 dark:bg-Muharram_secondary/10 dark:ring-white/[0.06]";
const containerExplainClass =
  "bg-white/90 ring-primary/25 dark:bg-Muharram_secondary/20 dark:ring-Muharram_primary/25";

function explanationsLabel(count: number): string {
  if (count === 1) return "شرح واحد";
  if (count === 2) return "شرحان";
  if (count <= 10) return `${toArabicDigits(count)} شروحات`;
  return `${toArabicDigits(count)} شرحًا`;
}

function countExplanations(subject: Subject): number {
  return (subject.phrases ?? []).reduce(
    (total, phrase) =>
      total + (phrase.explanations ?? []).filter(hasContent).length,
    0,
  );
}

export default function SubjectView({ subject }: { subject: Subject }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useSearchParams (لا searchParams من الخادم) يُبقي المسار مُولَّدًا ثابتًا خلف
  // Suspense في الصفحة، ويتحدّث عند التنقل الذي يغيّر الـ query فقط، كالضغط على
  // نتيجة بحث تشير إلى الموضوع المفتوح أصلًا. وهو فارغ أثناء الـ prerender.
  const highlightTerm = useSearchParams().get("highlight") ?? undefined;

  const isExplainMode = useExplanationMode() === "explanations";
  const explanationsCount = countExplanations(subject);
  const subjectMargin = subject.margins;

  useEffect(() => {
    if (!highlightTerm) return;

    let pulseTimer: number | undefined;
    const scrollTimer = window.setTimeout(() => {
      const firstMark = containerRef.current?.querySelector("mark");
      if (!firstMark) return;

      firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
      firstMark.classList.add("animate-pulse");
      pulseTimer = window.setTimeout(
        () => firstMark.classList.remove("animate-pulse"),
        HIGHLIGHT_PULSE_MS,
      );
    }, HIGHLIGHT_SCROLL_DELAY_MS);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(pulseTimer);
    };
  }, [highlightTerm]);

  return (
    <>
      <div
        ref={containerRef}
        className={`${containerBaseClass} ${
          isExplainMode ? containerExplainClass : containerReadingClass
        }`}
      >
        {/* جوّ وضع الشروحات: توهّج هادئ بلون الموقع يظهر من أعلى الصفحة */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/[0.07] to-transparent transition-opacity duration-700 motion-reduce:transition-none dark:from-Muharram_primary/[0.09] ${
            isExplainMode ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="mx-auto max-w-3xl space-y-8">
          {explanationsCount > 0 && (
            <ExplanationsChip
              count={explanationsCount}
              isExplainMode={isExplainMode}
            />
          )}

          {subject.audio && <SubjectAudioPlayer src={subject.audio} />}

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
                {highlightHtml(
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

/** Tells the reader this subject has explanations, and doubles as a second mode switch. */
function ExplanationsChip({
  count,
  isExplainMode,
}: {
  count: number;
  isExplainMode: boolean;
}) {
  return (
    <div className="flex">
      {/* الـ key يعيد تشغيل حركة الظهور عند تبدّل الوضع */}
      <button
        key={String(isExplainMode)}
        type="button"
        aria-pressed={isExplainMode}
        onClick={() =>
          setExplanationMode(isExplainMode ? "reading" : "explanations")
        }
        className={`iz-fade inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full px-3.5 py-2 text-[0.8rem] leading-none ring-1 transition-colors ${focusRingClass} ${
          isExplainMode ? chipActiveClass : chipIdleClass
        }`}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-current opacity-80"
        />
        <span>
          {isExplainMode
            ? "وضع الشروحات: اضغط على الكلمة المعلَّمة لقراءة شرحها"
            : `في هذا الموضوع ${explanationsLabel(count)}`}
        </span>
        <span className="font-semibold">
          {isExplainMode ? "العودة للقراءة" : "عرضها"}
        </span>
      </button>
    </div>
  );
}
