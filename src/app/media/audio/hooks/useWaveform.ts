// hooks/useWaveform.ts
"use client";

import { useRef, useCallback, useEffect } from "react";
import type { AudioItem } from "@/types/audio";

const BREAKPOINTS = [
  { key: "xs", peaks: 100,  show: "block sm:hidden" },
  { key: "sm", peaks: 150,  show: "hidden sm:block md:hidden" },
  { key: "md", peaks: 250, show: "hidden md:block lg:hidden" },
  { key: "lg", peaks: 350, show: "hidden lg:block xl:hidden" },
  { key: "xl", peaks: 600, show: "hidden xl:block" },
] as const;

type BreakpointKey = (typeof BREAKPOINTS)[number]["key"];

export { BREAKPOINTS };
export type { BreakpointKey };

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

  const dpr = window.devicePixelRatio || 1;
  const w = width ?? canvas.offsetWidth;
  if (w === 0) return;

  const height = 56;
  const barWidth = Math.max(1, w / peaks.length);

  canvas.width = w * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, height);

  const mid = height / 2;
  const maxPeak = Math.max(...peaks, 0.1);
  const progressX = progress * w;

  for (let i = 0; i < peaks.length; i++) {
    const x = i * barWidth;
    const barHeight = Math.max(2.5, (peaks[i] / maxPeak) * (height - 8));
    const y = mid - barHeight / 2;
    const bw = barWidth - 1;
    const bh = barHeight;
    const r = Math.min(2, bw / 2, bh / 2);

    const played = x / w <= progress;

if (played) {
  // الجزء المشغول — تدرج من الأخضر للذهبي (يعكس الهوية)
  const grad = ctx.createLinearGradient(x, y, x, y + bh);
      grad.addColorStop(0, "#00a884");
      grad.addColorStop(1, "#006654");
  ctx.fillStyle = grad;
} else {
  // الجزء اللي ما اشتغل بعد
  ctx.fillStyle = isActive ? "#bb966140" : "#00000015"; // شفاف خفيف
}

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + bw - r, y);
    ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
    ctx.lineTo(x + bw, y + bh - r);
    ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
    ctx.lineTo(x + r, y + bh);
    ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();
  }

  // Playhead line
  if (progress > 0 && progress < 1) {
    ctx.beginPath();
    ctx.moveTo(progressX, 4);
    ctx.lineTo(progressX, height - 4);
    ctx.strokeStyle = "#006654";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export function useWaveform(items: AudioItem[]) {
  const canvasRefs = useRef<Record<number, Record<BreakpointKey, HTMLCanvasElement | null>>>({});

  // Initialize refs
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
      BREAKPOINTS.forEach((bp) => {
        const canvas = canvasRefs.current[item.id]?.[bp.key];
        if (!canvas) return;
        const sliced = slicePeaks(item.peaks!, bp.peaks);
        const containerWidth = canvas.parentElement?.offsetWidth ?? 0;
        if (containerWidth > 0) {
          drawWaveform(canvas, sliced, progress, containerWidth, isActive);
        }
      });
    },
    []
  );

  // Initial draw
  useEffect(() => {
    const timer = setTimeout(() => {
      items.forEach((item) => drawItem(item, 0, false));
    }, 60);
    return () => clearTimeout(timer);
  }, [items, drawItem]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      items.forEach((item) => drawItem(item, 0, false));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [items, drawItem]);

  const setCanvasRef = useCallback(
    (itemId: number, bpKey: BreakpointKey, el: HTMLCanvasElement | null) => {
      if (!canvasRefs.current[itemId]) {
        canvasRefs.current[itemId] = { xs: null, sm: null, md: null, lg: null, xl: null };
      }
      canvasRefs.current[itemId][bpKey] = el;
    },
    []
  );

  return { drawItem, setCanvasRef, BREAKPOINTS };
}
