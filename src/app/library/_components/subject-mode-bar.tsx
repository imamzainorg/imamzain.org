"use client";

import { useId, useState } from "react";
import { BookOpen, Headphones, Lightbulb } from "lucide-react";
import { useExplanationMode } from "../_hooks/use-explanation-store";
import { toArabicDigits } from "../_lib/arabic-text";
import { setExplanationMode } from "../_lib/explanation-store";
import SubjectAudioPlayer from "./subject-audio-player";

type SubjectModeBarProps = {
  audioSrc?: string;
  explanationsCount: number;
};

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const tabBaseClass = `relative z-10 flex items-center justify-center rounded-xl text-xs font-medium transition-[height,color] duration-300 motion-reduce:transition-none ${focusRingClass}`;

// عند فتح الصوتيات تتقلص الأزرار: تختفي التسميات وينخفض الارتفاع
const labelClass = (compact: boolean) =>
  `overflow-hidden whitespace-nowrap transition-[max-width,opacity,margin] duration-300 motion-reduce:transition-none ${
    compact ? "ms-0 max-w-0 opacity-0" : "ms-1.5 max-w-[4.5rem] opacity-100"
  }`;
const tabActiveClass = "text-primary dark:text-Muharram_primary";
const tabIdleClass =
  "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100";

/**
 * شريط واحد يجمع القراءة والشروحات والصوتيات.
 * القراءة والشروحات وضعا عرض متبادلان (تُخزَّن حالتهما في explanation-store)،
 * أما الصوتيات فلوحة مستقلة تُفتح وتُغلق دون المساس بوضع العرض أو بتشغيل الصوت.
 */
export default function SubjectModeBar({
  audioSrc,
  explanationsCount,
}: SubjectModeBarProps) {
  const panelId = useId();
  const mode = useExplanationMode();
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const hasAudio = Boolean(audioSrc);
  const hasExplanations = explanationsCount > 0;
  if (!hasAudio && !hasExplanations) return null;

  const isExplainMode = hasExplanations && mode === "explanations";
  const slots = 1 + (hasExplanations ? 1 : 0) + (hasAudio ? 1 : 0);
  const pillIndex = isExplainMode ? 1 : 0;

  return (
    <>
      {/* يحجز مكانًا في آخر الصفحة كي لا يغطي الشريط آخر النص */}
      <div
        aria-hidden="true"
        className={`transition-[height] duration-300 motion-reduce:transition-none ${
          isAudioOpen ? "h-28" : "h-[4.5rem]"
        }`}
      />

      {/* z-30: تحت نافذة الشروحات المنبثقة */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto mx-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white/90 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] ring-1 ring-gray-200/80 backdrop-blur-md dark:bg-Muharram_secondary/90 dark:ring-white/10">
          {hasAudio && audioSrc && (
            <div
              id={panelId}
              role="region"
              aria-label="مشغّل الصوت"
              aria-hidden={!isAudioOpen}
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none ${
                isAudioOpen
                  ? "visible grid-rows-[1fr] opacity-100"
                  : "invisible grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                {/* يبقى المشغّل مركّبًا دائمًا، فلا ينقطع الصوت عند إخفاء اللوحة */}
                <div className="px-3 py-2">
                  <SubjectAudioPlayer
                    src={audioSrc}
                    onPlayingChange={setIsAudioPlaying}
                  />
                </div>
                <div className="border-t border-gray-100 dark:border-white/10" />
              </div>
            </div>
          )}

          <nav aria-label="أوضاع الصفحة" className="p-0.5">
            <div
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` }}
            >
              {/* مؤشّر وضع العرض الحالي ينزلق بين القراءة والشروحات */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 rounded-xl bg-primary/10 transition-[inset-inline-start] duration-300 ease-out motion-reduce:transition-none dark:bg-Muharram_primary/15"
                style={{
                  width: `${100 / slots}%`,
                  insetInlineStart: `${(pillIndex * 100) / slots}%`,
                }}
              />

              <button
                type="button"
                aria-pressed={!isExplainMode}
                onClick={() => setExplanationMode("reading")}
                aria-label="القراءة"
                className={`${tabBaseClass} ${isAudioOpen ? "h-9" : "h-10"} ${isExplainMode ? tabIdleClass : tabActiveClass}`}
              >
                <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className={labelClass(isAudioOpen)}>القراءة</span>
              </button>

              {hasExplanations && (
                <button
                  type="button"
                  aria-pressed={isExplainMode}
                  onClick={() => setExplanationMode("explanations")}
                  aria-label={`الشروحات، ${explanationsCount}`}
                  className={`${tabBaseClass} ${isAudioOpen ? "h-9" : "h-10"} ${isExplainMode ? tabActiveClass : tabIdleClass}`}
                >
                  <Lightbulb className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className={labelClass(isAudioOpen)}>الشروحات</span>
                  <span
                    aria-hidden="true"
                    className={`${labelClass(isAudioOpen)} rounded-full bg-primary/10 px-1.5 text-[0.65rem] leading-4 text-primary dark:bg-Muharram_primary/15 dark:text-Muharram_primary`}
                  >
                    {toArabicDigits(explanationsCount)}
                  </span>
                </button>
              )}

              {hasAudio && (
                <button
                  type="button"
                  aria-pressed={isAudioOpen}
                  aria-expanded={isAudioOpen}
                  aria-controls={panelId}
                  onClick={() => setIsAudioOpen((open) => !open)}
                  aria-label={isAudioPlaying ? "الصوتيات، الصوت قيد التشغيل" : "الصوتيات"}
                  className={`${tabBaseClass} ${isAudioOpen ? "h-9" : "h-10"} ${
                    isAudioOpen
                      ? `${tabActiveClass} bg-primary/10 dark:bg-Muharram_primary/15`
                      : tabIdleClass
                  }`}
                >
                  <span className="relative">
                    <Headphones className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {isAudioPlaying && !isAudioOpen && (
                      <span className="absolute -end-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-primary motion-reduce:animate-none dark:bg-Muharram_primary" />
                    )}
                  </span>
                  <span className={labelClass(isAudioOpen)}>استمع</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}