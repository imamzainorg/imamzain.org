// hooks/useWaveform.ts
"use client";

import { useRef, useCallback, useEffect } from "react";
import type { AudioItem } from "@/types/audio";

const BREAKPOINTS = [
  { key: "xs", peaks: 100,  show: "block sm:hidden" },
  { key: "sm", peaks: 150, show: "hidden sm:block md:hidden" },
  { key: "md", peaks: 100, show: "hidden md:block lg:hidden" },
  { key: "lg", peaks: 120, show: "hidden lg:block xl:hidden" },
  { key: "xl", peaks: 150, show: "hidden xl:block" },
] as const;

type BreakpointKey = (typeof BREAKPOINTS)[number]["key"];

export { BREAKPOINTS };
export type { BreakpointKey };

interface CanvasWithHandler extends HTMLCanvasElement {
  _waveformClickHandler?: (e: MouseEvent) => void;
  _resizeObserver?: ResizeObserver;
}

function slicePeaks(peaks: number[], count: number): number[] {
  if (peaks.length <= count) return peaks;
  const step = peaks.length / count;
  return Array.from({ length: count }, (_, i) => peaks[Math.floor(i * step)]);
}

function drawWaveform(
  canvas: HTMLCanvasElement,
  peaks: number[],
  progress: number = 0,
  width?: number,
  isActive: boolean = false
) {
  if (!peaks || peaks.length === 0) return;
  if (!canvas.isConnected) return;

  const dpr = window.devicePixelRatio || 1;
  const w = width ?? canvas.parentElement?.offsetWidth ?? canvas.offsetWidth;
  if (w === 0) {
    requestAnimationFrame(() => {
      const newWidth = canvas.parentElement?.offsetWidth ?? canvas.offsetWidth;
      if (newWidth > 0) {
        drawWaveform(canvas, peaks, progress, newWidth, isActive);
      }
    });
    return;
  }

  const height = 56;
  const barWidth = Math.max(1, w / peaks.length);

  canvas.width = w * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, height);

  const mid = height / 2;
  const maxPeak = Math.max(...peaks, 0.1);
  const progressX = progress * w;

  for (let i = 0; i < peaks.length; i++) {
    const x = i * barWidth;
    const barHeight = Math.max(2.5, (peaks[i] / maxPeak) * (height - 8));
    const y = mid - barHeight / 2;
    const bw = Math.max(0.5, barWidth - 1);
    const bh = barHeight;
    const r = Math.min(2, bw / 2, bh / 2);

const played = x / w <= progress;
const isDark = document.documentElement.classList.contains("dark");

if (played) {
const isDark = document.documentElement.classList.contains("dark");

const grad = ctx.createLinearGradient(x, y, x, y + bh);

if (isDark) {
  grad.addColorStop(0, "#a43232"); 
  grad.addColorStop(1, "#231f20"); // نهاية التدرج في الدارك
} else {
  grad.addColorStop(0, "#00a884"); // بداية التدرج في اللايت
  grad.addColorStop(1, "#006654"); // نهاية التدرج في اللايت
}

  ctx.fillStyle = grad;
} else {
  ctx.fillStyle = isActive
    ? "#bb966140"
    : isDark
      ? "#ffffff20"   // لون الدارك
      : "#00000015";  // لون اللايت
}

    ctx.beginPath();
    if (r > 0) {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + bw - r, y);
      ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r);
      ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
      ctx.lineTo(x + r, y + bh);
      ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
    } else {
      ctx.fillRect(x, y, bw, bh);
    }
    ctx.fill();
  }
const isDark = document.documentElement.classList.contains("dark");

  if (progress > 0 && progress < 1) {
    ctx.beginPath();
    ctx.moveTo(progressX, 4);
    ctx.lineTo(progressX, height - 4);
  ctx.strokeStyle = isDark
  ? "#94a3b8"   // لون الدارك
  : "#006654";  // لون اللايت
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function getProgressFromClick(
  canvas: HTMLCanvasElement,
  clientX: number,
  duration: number
): number {
  const rect = canvas.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const percent = x / rect.width;
  return percent * duration;
}

export function useWaveform(
  items: AudioItem[],
  onSeek?: (itemId: number, time: number) => void,
  onPlay?: (itemId: number) => void,
) {
  const canvasRefs = useRef<Record<number, Record<BreakpointKey, HTMLCanvasElement | null>>>({});
  const drawTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  const previewTimesRef = useRef<Record<number, number>>({});
  // RAF ref لمنع رسم متعدد في نفس الـ frame
  const pendingDrawRef = useRef<Record<number, number>>({});

  useEffect(() => {
    items.forEach((item) => {
      if (!canvasRefs.current[item.id]) {
        canvasRefs.current[item.id] = { xs: null, sm: null, md: null, lg: null, xl: null };
      }
    });
  }, [items]);

  const drawItem = useCallback(
    (item: AudioItem, progress: number = 0, isActive: boolean = false) => {
      if (!item.peaks) return;

      // إلغاء أي رسم pending لنفس الـ item
      if (pendingDrawRef.current[item.id]) {
        cancelAnimationFrame(pendingDrawRef.current[item.id]);
      }

      pendingDrawRef.current[item.id] = requestAnimationFrame(() => {
        delete pendingDrawRef.current[item.id];
        BREAKPOINTS.forEach((bp) => {
          const canvas = canvasRefs.current[item.id]?.[bp.key];
          if (!canvas || !canvas.isConnected) return;
          const sliced = slicePeaks(item.peaks!, bp.peaks);
          const containerWidth = canvas.parentElement?.offsetWidth ?? canvas.offsetWidth;
          if (containerWidth > 0) {
            drawWaveform(canvas, sliced, progress, containerWidth, isActive);
          }
        });
      });
    },
    []
  );

  // رسم فوري بدون RAF — للـ click حيث السرعة أهم
  const drawItemImmediate = useCallback(
    (item: AudioItem, progress: number = 0, isActive: boolean = false) => {
      if (!item.peaks) return;
      // إلغاء أي RAF pending
      if (pendingDrawRef.current[item.id]) {
        cancelAnimationFrame(pendingDrawRef.current[item.id]);
        delete pendingDrawRef.current[item.id];
      }
      BREAKPOINTS.forEach((bp) => {
        const canvas = canvasRefs.current[item.id]?.[bp.key];
        if (!canvas || !canvas.isConnected) return;
        const sliced = slicePeaks(item.peaks!, bp.peaks);
        const containerWidth = canvas.parentElement?.offsetWidth ?? canvas.offsetWidth;
        if (containerWidth > 0) {
          drawWaveform(canvas, sliced, progress, containerWidth, isActive);
        }
      });
    },
    []
  );

  const previewSeek = useCallback(
    (itemId: number, time: number) => {
      const item = items.find((i) => i.id === itemId);
      if (!item?.durationSeconds || !item.peaks) return;
      const clamped = Math.max(0, Math.min(item.durationSeconds, time));
      previewTimesRef.current[itemId] = clamped;
      drawItem(item, clamped / item.durationSeconds, false);
    },
    [items, drawItem]
  );

  const skip = useCallback(
    (itemId: number, deltaSec: number, currentTime: number) => {
      const item = items.find((i) => i.id === itemId);
      if (!item?.durationSeconds) return;
      const newTime = Math.max(0, Math.min(item.durationSeconds, currentTime + deltaSec));
      previewTimesRef.current[itemId] = newTime;
      // رسم فوري عند skip
      drawItemImmediate(item, newTime / item.durationSeconds, false);
      onSeek?.(itemId, newTime);
      onPlay?.(itemId);
    },
    [items, drawItemImmediate, onSeek, onPlay]
  );

  const getPreviewTime = useCallback(
    (itemId: number) => previewTimesRef.current[itemId] ?? 0,
    []
  );

  const handleWaveformClick = useCallback(
    (itemId: number, bpKey: BreakpointKey, clientX: number) => {
      const canvas = canvasRefs.current[itemId]?.[bpKey];
      if (!canvas) return;
      const item = items.find((i) => i.id === itemId);
      if (!item?.durationSeconds) return;

      const time = getProgressFromClick(canvas, clientX, item.durationSeconds);
      const progress = time / item.durationSeconds;

      // 1. حفظ الوقت
      previewTimesRef.current[itemId] = time;

      // 2. رسم فوري بدون RAF لأقل lag ممكن
      drawItemImmediate(item, progress, false);

      // 3. seek + play
      onSeek?.(itemId, time);
      onPlay?.(itemId);
    },
    [items, drawItemImmediate, onSeek, onPlay]
  );

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        items.forEach((item) => {
          if (item.peaks) {
            const savedTime = previewTimesRef.current[item.id] ?? 0;
            const progress = item.durationSeconds
              ? savedTime / item.durationSeconds
              : 0;
            drawItem(item, progress, false);
          }
        });
      }, 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, [items, drawItem]);

  useEffect(() => {
    return () => {
      Object.values(drawTimeoutRef.current).forEach(clearTimeout);
      drawTimeoutRef.current = {};
      // تنظيف RAF
      Object.values(pendingDrawRef.current).forEach(cancelAnimationFrame);
      pendingDrawRef.current = {};
    };
  }, []);

  const setCanvasRef = useCallback(
    (itemId: number, bpKey: BreakpointKey, el: HTMLCanvasElement | null) => {
      const oldCanvas = canvasRefs.current[itemId]?.[bpKey];
      if (oldCanvas && oldCanvas !== el) {
        const oldHandler = (oldCanvas as CanvasWithHandler)._waveformClickHandler;
        if (oldHandler) oldCanvas.removeEventListener("click", oldHandler);
        const oldObserver = (oldCanvas as CanvasWithHandler)._resizeObserver;
        if (oldObserver) oldObserver.disconnect();
      }

      if (!canvasRefs.current[itemId]) {
        canvasRefs.current[itemId] = { xs: null, sm: null, md: null, lg: null, xl: null };
      }
      canvasRefs.current[itemId][bpKey] = el;

      if (el) {
        const item = items.find((i) => i.id === itemId);
        if (!item?.peaks) return;

        // cursor
        el.style.cursor = "pointer";

        // click
        const handleClick = (e: MouseEvent) => {
          handleWaveformClick(itemId, bpKey, e.clientX);
        };
        el.addEventListener("click", handleClick);
        (el as CanvasWithHandler)._waveformClickHandler = handleClick;

        // رسم أولي — يحترم الوقت المحفوظ إذا كان موجوداً
        const bp = BREAKPOINTS.find((b) => b.key === bpKey)!;
        setTimeout(() => {
          if (el.isConnected && item.peaks) {
            const sliced = slicePeaks(item.peaks!, bp.peaks);
            const containerWidth = el.parentElement?.offsetWidth ?? el.offsetWidth;
            if (containerWidth > 0) {
              const savedTime = previewTimesRef.current[itemId] ?? 0;
              const progress = item.durationSeconds
                ? savedTime / item.durationSeconds
                : 0;
              drawWaveform(el, sliced, progress, containerWidth, false);
            }
          }
        }, 0);

        // ResizeObserver
        let debounceTimeout: NodeJS.Timeout;
        const observer = new ResizeObserver(() => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            if (el.isConnected && item.peaks) {
              const sliced = slicePeaks(item.peaks!, bp.peaks);
              const containerWidth = el.parentElement?.offsetWidth ?? el.offsetWidth;
              if (containerWidth > 0) {
                const savedTime = previewTimesRef.current[itemId] ?? 0;
                const progress = item.durationSeconds
                  ? savedTime / item.durationSeconds
                  : 0;
                drawWaveform(el, sliced, progress, containerWidth, false);
              }
            }
          }, 50);
        });
        observer.observe(el);
        (el as CanvasWithHandler)._resizeObserver = observer;
      }
    },
    [items, handleWaveformClick]
  );

  return {
    drawItem,
    setCanvasRef,
    previewSeek,
    skip,
    getPreviewTime,
    BREAKPOINTS,
  };
}