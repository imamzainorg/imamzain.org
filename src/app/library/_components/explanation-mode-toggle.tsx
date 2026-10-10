"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Layers } from "lucide-react";
import { useExplanationMode } from "../_hooks/use-explanation-store";
import { useIsMounted } from "../_hooks/use-is-mounted";
import { toArabicDigits } from "../_lib/arabic-text";
import { setExplanationMode, type ExplanationMode } from "../_lib/explanation-store";
import { getPortalRoot } from "../_lib/explanation-utils";

type ExplanationModeToggleProps = {
  /** عدد الشروحات في الصفحة؛ إن كان 0 لا يظهر عنصر التحكم */
  count: number;
};

type IntroPhase = "off" | "in" | "out";

const INTRO_SEEN_KEY = "iz-explanations-intro-seen";
const INTRO_DELAY_MS = 900;
const INTRO_AUTO_HIDE_MS = 9000;
const INTRO_OUT_MS = 450;

const OPTIONS = [
  { id: "reading", label: "القراءة", Icon: BookOpen },
  { id: "explanations", label: "الشروحات", Icon: Layers },
] as const;

// بقعة الضوء: بيضاوية شفافة حول عنصر التحكم (أسفل المنتصف) وتعتيم ناعم خارجها
const SPOTLIGHT =
  "radial-gradient(ellipse 330px 130px at 50% calc(100% - max(1rem, env(safe-area-inset-bottom, 0px)) - 26px), transparent 52%, rgba(8, 10, 14, 0.62) 100%)";

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

/** One-time introduction shown the first time a reader meets a page with explanations. */
function useFirstVisitIntro(count: number) {
  const [phase, setPhase] = useState<IntroPhase>("off");

  const finish = useCallback(
    () => setPhase((current) => (current === "in" ? "out" : current)),
    [],
  );

  useEffect(() => {
    if (count <= 0) return;

    let hasSeen = true;
    try {
      hasSeen = window.localStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      // التخزين غير متاح: لا نزعج المستخدم
    }
    if (hasSeen) return;

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        // لا مشكلة
      }
      setPhase("in");
    }, INTRO_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [count]);

  // إخفاء تلقائي + Escape
  useEffect(() => {
    if (phase !== "in") return;

    const timer = window.setTimeout(finish, INTRO_AUTO_HIDE_MS);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [phase, finish]);

  // إزالة التمهيد من الـ DOM بعد انتهاء حركة الخروج
  useEffect(() => {
    if (phase !== "out") return;
    const timer = window.setTimeout(() => setPhase("off"), INTRO_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return { phase, finish };
}

export default function ExplanationModeToggle({
  count,
}: ExplanationModeToggleProps) {
  const isMounted = useIsMounted();
  const mode = useExplanationMode();
  const { phase, finish } = useFirstVisitIntro(count);

  const isActive = mode === "explanations";
  const showIntro = phase !== "off";

  // عند مغادرة الصفحة نعيد الوضع إلى القراءة
  useEffect(() => () => setExplanationMode("reading"), []);

  function handleModeChange(next: ExplanationMode) {
    finish();
    setExplanationMode(next);
  }

  if (!isMounted || count <= 0) return null;

  return createPortal(
    <div data-iz-phase={phase}>
      <p className="sr-only" role="status" aria-live="polite">
        {isActive ? "وضع الشروحات" : "وضع القراءة"}
      </p>

      {showIntro && (
        <div
          aria-hidden="true"
          onClick={finish}
          className="iz-overlay fixed inset-0 z-[60]"
          style={{ background: SPOTLIGHT }}
        />
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[61] flex flex-col items-center px-4">
        {showIntro && <IntroHint />}

        <div className="pointer-events-auto relative">
          {showIntro && (
            <span
              aria-hidden="true"
              className="iz-ring pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/60 dark:ring-Muharram_primary/70"
            />
          )}

          {/* عمودان متساويان؛ المؤشر ينزلق بينهما بدون أي قياس بالـ JS */}
          <div
            role="group"
            aria-label="طريقة العرض"
            dir="rtl"
            className="relative isolate grid w-max grid-cols-[1fr_1fr] rounded-full bg-white/80 p-1 shadow-lg shadow-black/10 ring-1 ring-black/10 backdrop-blur-xl dark:bg-zinc-900/75 dark:ring-white/10"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 start-1 -z-10 w-[calc(50%-0.25rem)] rounded-full transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isActive
                  ? "-translate-x-full bg-primary dark:bg-Muharram_primary"
                  : "translate-x-0 bg-gray-900 dark:bg-gray-100"
              }`}
            />

            {OPTIONS.map(({ id, label, Icon }) => {
              const isSelected = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={
                    id === "explanations"
                      ? `${label} (${toArabicDigits(count)})`
                      : label
                  }
                  onClick={() => handleModeChange(id)}
                  className={`relative flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm transition-colors duration-300 motion-reduce:transition-none ${focusRingClass} ${
                    isSelected
                      ? "font-semibold text-white dark:text-zinc-900"
                      : "font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : "opacity-60"
                    }`}
                  />
                  <span>{label}</span>
                  {id === "explanations" && (
                    <span
                      aria-hidden="true"
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.7rem] font-semibold leading-none transition-colors duration-300 ${
                        isSelected
                          ? "bg-white/25 dark:bg-black/15"
                          : "bg-black/[0.06] text-gray-600 dark:bg-white/10 dark:text-gray-300"
                      }`}
                    >
                      {toArabicDigits(count)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    getPortalRoot("explanation-mode-root"),
  );
}

function IntroHint() {
  return (
    <>
      <div
        role="note"
        dir="rtl"
        className="iz-card w-max max-w-[min(20rem,calc(100vw-2rem))] rounded-2xl bg-white/90 px-5 py-4 text-center shadow-xl ring-1 ring-black/5 backdrop-blur-xl dark:bg-zinc-900/90 dark:ring-white/10"
      >
        <p className="iz-title text-base font-semibold text-gray-900 dark:text-gray-50">
          لديك طريقتان للقراءة
        </p>
        <p className="iz-body mt-1.5 text-[0.85rem] leading-[1.9] text-gray-600 dark:text-gray-300">
          اقرأ النص بهدوء، أو انتقل إلى الشروحات عندما تريد التعمّق.
        </p>
      </div>

      {/* خط يمتد من الرسالة إلى عنصر التحكم، تنزل عليه نقطة صغيرة */}
      <div aria-hidden="true" className="relative my-1 h-9 w-px">
        <span className="iz-line absolute inset-0 bg-gradient-to-b from-transparent to-primary dark:to-Muharram_primary" />
        <span
          className="iz-dot absolute top-0 h-1.5 w-1.5 rounded-full bg-primary dark:bg-Muharram_primary"
          style={{ left: "calc(50% - 3px)" }}
        />
      </div>
    </>
  );
}
