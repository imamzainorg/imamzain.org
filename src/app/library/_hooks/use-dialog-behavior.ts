"use client";

import { useEffect, useRef, type RefObject } from "react";

// التبويبات غير النشطة (tabindex=-1) لا تدخل في حلقة التركيز
const FOCUSABLE_SELECTOR =
  'button:not([disabled]):not([tabindex="-1"]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// تأثير التصغير اختياري: يُطبَّق فقط على عنصر يحمل هذه السمة (يغلّف محتوى الصفحة)،
// ويجب أن يبقى الهيدر الثابت/الـ sticky خارجه، لأن أي transform يجعل العنصر مرجعًا لأبنائه الثابتين.
const PAGE_SCALE_SELECTOR = "[data-page-scale-root]";

/** Locks page scrolling while active, compensating for the scrollbar width so content doesn't shift. */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const { body, documentElement: html } = document;
    const originalOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const side =
      getComputedStyle(html).direction === "rtl" ? "paddingLeft" : "paddingRight";
    const originalPadding = body.style[side];

    if (scrollbarWidth > 0) {
      const current = parseFloat(getComputedStyle(body)[side]) || 0;
      body.style[side] = `${current + scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
      body.style[side] = originalPadding;
    };
  }, [active]);
}

// حركة عكسية سابقة لم تنتهِ: يجب إنهاؤها قبل أن يلتقط التأثير التالي القيم الأصلية
let finishPendingScaleRestore: (() => void) | null = null;

/** Immersive effect: slightly shrinks and dims the page wrapper while a dialog is open. */
export function usePageScale(active: boolean, durationMs: number): void {
  useEffect(() => {
    if (!active) return;
    const target = document.querySelector<HTMLElement>(PAGE_SCALE_SELECTOR);
    if (!target) return;

    finishPendingScaleRestore?.();

    const original = {
      transform: target.style.transform,
      filter: target.style.filter,
      transition: target.style.transition,
      transformOrigin: target.style.transformOrigin,
    };

    // نقطة الارتكاز عند منتصف الجزء المرئي من الشاشة، فلا "تقفز" الصفحة وهي ممرَّرة
    const originY = window.innerHeight / 2 - target.getBoundingClientRect().top;
    target.style.transformOrigin = `50% ${originY}px`;
    target.style.transition = `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1), filter ${durationMs}ms ease`;
    target.style.transform = "scale(0.97)";
    target.style.filter = "brightness(0.92)";

    return () => {
      target.style.transform = original.transform;
      target.style.filter = original.filter;

      let timer = 0;
      const restore = () => {
        window.clearTimeout(timer);
        target.style.transition = original.transition;
        target.style.transformOrigin = original.transformOrigin;
        finishPendingScaleRestore = null;
      };
      // وقت للحركة العكسية قبل إزالة transition تمامًا
      timer = window.setTimeout(restore, durationMs);
      finishPendingScaleRestore = restore;
    };
  }, [active, durationMs]);
}

/**
 * Moves focus into the dialog on mount, traps Tab inside it and calls
 * `onEscape` on Escape. `restoreFocus` returns focus to the opener.
 */
export function useModalFocus(
  panelRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  onEscape: () => void,
) {
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const active = document.activeElement;
    openerRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null;
    initialFocusRef.current?.focus({ preventScroll: true });
  }, [initialFocusRef]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      if (!panelRef.current.contains(activeEl)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [panelRef, onEscape]);

  function restoreFocus() {
    openerRef.current?.focus({ preventScroll: true });
    openerRef.current = null;
  }

  return { restoreFocus };
}
