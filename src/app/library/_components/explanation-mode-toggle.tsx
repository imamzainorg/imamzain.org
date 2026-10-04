"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { BookOpen, Layers } from "lucide-react";
import {
  getExplanationMode,
  setExplanationMode,
  subscribeExplanationMode,
  type ExplanationMode,
} from "./explanation-mode-store";
import { toArabicDigits } from "./arabic-digits";

type ExplanationModeToggleProps = {
  /** عدد الشروحات في الصفحة؛ إن كان 0 لا يظهر عنصر التحكم */
  count: number;
};

const INTRO_KEY = "iz-explanations-intro-seen";
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

// نلحق الجذر بـ <html> لأن أي أب فيه backdrop-filter/transform يكسر موضع fixed
function getToggleRoot(): HTMLElement {
  let root = document.getElementById("explanation-mode-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "explanation-mode-root";
    document.documentElement.appendChild(root);
  }
  return root;
}

// حركات التمهيد + حركات ظهور الكلمات المشروحة عند الدخول إلى وضع الشروحات
const introStyles = `
@keyframes iz-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes iz-out { from { opacity: 1 } to { opacity: 0 } }
@keyframes iz-rise { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
@keyframes iz-draw { from { transform: scaleY(0) } to { transform: scaleY(1) } }
@keyframes iz-dot { 0% { transform: translateY(0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { transform: translateY(2rem); opacity: 0 } }
@keyframes iz-ring { 0% { transform: scale(1); opacity: .9 } 100% { transform: scale(1.14, 1.4); opacity: 0 } }
@keyframes iz-marker-in { from { opacity: 0; transform: scale(.4) } to { opacity: .8; transform: none } }
@keyframes iz-word-in { from { text-decoration-color: transparent; background-color: transparent } }
@keyframes iz-fade { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }
.iz-overlay { animation: iz-in 700ms ease both }
.iz-card { animation: iz-rise 600ms cubic-bezier(.22,1,.36,1) 350ms both }
.iz-title { animation: iz-rise 500ms cubic-bezier(.22,1,.36,1) 550ms both }
.iz-body { animation: iz-rise 500ms cubic-bezier(.22,1,.36,1) 1150ms both }
.iz-line { transform-origin: top; animation: iz-draw 500ms ease 700ms both }
.iz-dot { animation: iz-dot 1.8s ease-in-out 1.2s infinite }
.iz-ring { animation: iz-ring 2.2s ease-out 1s infinite }
.iz-marker-in { animation: iz-marker-in 500ms cubic-bezier(.22,1,.36,1) 150ms backwards }
.iz-word-in { animation: iz-word-in 600ms ease backwards }
.iz-fade { animation: iz-fade 350ms ease backwards }
[data-iz-phase="out"] .iz-overlay,
[data-iz-phase="out"] .iz-card,
[data-iz-phase="out"] .iz-line,
[data-iz-phase="out"] .iz-dot,
[data-iz-phase="out"] .iz-ring { animation: iz-out 450ms ease forwards }
@media (prefers-reduced-motion: reduce) {
  .iz-overlay, .iz-card, .iz-title, .iz-body, .iz-line { animation-duration: 1ms !important; animation-delay: 0s !important }
  .iz-dot, .iz-ring, .iz-marker-in, .iz-word-in, .iz-fade { animation: none !important }
  .iz-dot, .iz-ring { opacity: 0 }
}
`;

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

export default function ExplanationModeToggle({
  count,
}: ExplanationModeToggleProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const mode = useSyncExternalStore(
    subscribeExplanationMode,
    getExplanationMode,
    () => "reading" as ExplanationMode,
  );
  const [intro, setIntro] = useState<"off" | "in" | "out">("off");

  const active = mode === "explanations";
  const showIntro = intro !== "off";

  const finishIntro = useCallback(
    () => setIntro((phase) => (phase === "in" ? "out" : phase)),
    [],
  );

  // عند مغادرة الصفحة نعيد الوضع إلى القراءة
  useEffect(() => {
    return () => setExplanationMode("reading");
  }, []);

  // ── التمهيد: مرة واحدة فقط ──
  useEffect(() => {
    if (count <= 0) return;
    let seen = true;
    try {
      seen = window.localStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = true; // التخزين غير متاح: لا نزعج المستخدم
    }
    if (seen) return;

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(INTRO_KEY, "1");
      } catch {
        // لا مشكلة
      }
      setIntro("in");
    }, INTRO_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [count]);

  // إخفاء تلقائي + Escape
  useEffect(() => {
    if (intro !== "in") return;
    const timer = window.setTimeout(finishIntro, INTRO_AUTO_HIDE_MS);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") finishIntro();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [intro, finishIntro]);

  // إزالة التمهيد من الـ DOM بعد انتهاء حركة الخروج
  useEffect(() => {
    if (intro !== "out") return;
    const timer = window.setTimeout(() => setIntro("off"), INTRO_OUT_MS);
    return () => window.clearTimeout(timer);
  }, [intro]);

  const handleMode = useCallback(
    (next: ExplanationMode) => {
      finishIntro();
      setExplanationMode(next);
    },
    [finishIntro],
  );

  if (!mounted || count <= 0) return null;

  return createPortal(
    <div data-iz-phase={intro}>
      <style>{introStyles}</style>

      <p className="sr-only" role="status" aria-live="polite">
        {active ? "وضع الشروحات" : "وضع القراءة"}
      </p>

      {/* تعتيم الصفحة مع بقعة ضوء حول عنصر التحكم */}
      {showIntro && (
        <div
          aria-hidden="true"
          onClick={finishIntro}
          className="iz-overlay fixed inset-0 z-[60]"
          style={{ background: SPOTLIGHT }}
        />
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[61] flex flex-col items-center px-4">
        {showIntro && (
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
        )}

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
                active
                  ? "-translate-x-full bg-primary dark:bg-Muharram_primary"
                  : "translate-x-0 bg-gray-900 dark:bg-gray-100"
              }`}
            />

            {OPTIONS.map(({ id, label, Icon }) => {
              const isActive = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={
                    id === "explanations"
                      ? `${label} (${toArabicDigits(count)})`
                      : label
                  }
                  onClick={() => handleMode(id)}
                  className={`relative flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm transition-colors duration-300 motion-reduce:transition-none ${focusRingClass} ${
                    isActive
                      ? "font-semibold text-white dark:text-zinc-900"
                      : "font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-60"
                    }`}
                  />
                  <span>{label}</span>
                  {id === "explanations" && (
                    <span
                      aria-hidden="true"
                      className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.7rem] font-semibold leading-none transition-colors duration-300 ${
                        isActive
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
    getToggleRoot(),
  );
}