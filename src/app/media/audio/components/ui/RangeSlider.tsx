"use client";

import { useRef, useCallback, useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatLabel?: (value: number) => string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatLabel = (v) => `${v} دقيقة`,
}: RangeSliderProps) {
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const getValueFromClientX = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      // عكس الاتجاه: من اليمين لليسار
      let percent = ((rect.right - clientX) / rect.width) * 100;
      percent = Math.min(100, Math.max(0, percent));
      const rawValue = min + (percent / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step],
  );

  // الضغط على أي مكان في الشريط
  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const newValue = getValueFromClientX(e.clientX);
      const distToMin = Math.abs(newValue - value[0]);
      const distToMax = Math.abs(newValue - value[1]);
      const which = distToMin <= distToMax ? "min" : "max";
      setDragging(which);

      if (which === "min" && newValue <= value[1]) {
        onChange([newValue, value[1]]);
      } else if (which === "max" && newValue >= value[0]) {
        onChange([value[0], newValue]);
      }
    },
    [getValueFromClientX, value, onChange],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const newValue = getValueFromClientX(e.clientX);
      if (dragging === "min" && newValue <= value[1]) {
        onChange([newValue, value[1]]);
      } else if (dragging === "max" && newValue >= value[0]) {
        onChange([value[0], newValue]);
      }
    },
    [dragging, value, onChange, getValueFromClientX],
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  // الضغط على المقبض مباشرة
  const handleThumbPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, thumb: "min" | "max") => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(thumb);
    },
    [],
  );

  const minPercent = getPercent(value[0]);
  const maxPercent = getPercent(value[1]);

  return (
    <div className="w-full space-y-3 px-1">
      <div className="flex justify-between text-xs text-slate-500">
        {" "}
        <span>{formatLabel(value[0])}</span>
        <span className="text-slate-400">إلى</span>
        <span>{formatLabel(value[1])}</span>
      </div>

      {/* Track — يستقبل pointer events على كامل المنطقة */}
      <div
        ref={sliderRef}
        className="relative h-5 cursor-pointer flex items-center"
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Background */}
        <div className="absolute w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />

        {/* Selected range — معكوس للـ RTL */}
        <div
          className="absolute h-2 bg-primary rounded-full"
          style={{
            right: `${minPercent}%`,
            left: `${100 - maxPercent}%`,
          }}
        />

        {/* Min handle — يظهر على اليمين */}
        <div
          className={`absolute w-5 h-5 bg-white dark:bg-slate-900 border-2 border-primary rounded-full shadow-md transition-transform ${
            dragging === "min" ? "scale-125" : "hover:scale-110"
          }`}
          style={{
            right: `${minPercent}%`,
            transform: "translate(50%, -50%)",
            top: "50%",
            cursor: dragging === "min" ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onPointerDown={(e) => handleThumbPointerDown(e, "min")}
        />

        {/* Max handle — يظهر على اليسار */}
        <div
          className={`absolute w-5 h-5 bg-white dark:bg-slate-900 border-2 border-primary rounded-full shadow-md transition-transform ${
            dragging === "max" ? "scale-125" : "hover:scale-110"
          }`}
          style={{
            right: `${maxPercent}%`,
            transform: "translate(50%, -50%)",
            top: "50%",
            cursor: dragging === "max" ? "grabbing" : "grab",
            touchAction: "none",
          }}
          onPointerDown={(e) => handleThumbPointerDown(e, "max")}
        />
      </div>
    </div>
  );
}
