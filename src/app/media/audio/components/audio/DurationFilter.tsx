// app/components/DurationFilter.tsx (نفس الشيء ولكن مع تحسين صغير)
"use client";

import { Clock3 } from "lucide-react";
import { RangeSlider } from "../ui/RangeSlider";

interface DurationFilterProps {
  minDuration: number;
  maxDuration: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function DurationFilter({
  minDuration,
  maxDuration,
  value,
  onChange,
}: DurationFilterProps) {
  // التأكد من أن القيم صالحة
  const safeValue: [number, number] = [
    Math.max(minDuration, Math.min(maxDuration, value[0])),
    Math.max(minDuration, Math.min(maxDuration, value[1]))
  ];

  return (
    <div className=" p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/70 dark:border-white/10 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Clock3 className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-white">
          مدة الصوت
        </span>
      </div>

      <RangeSlider
        min={minDuration}
        max={maxDuration}
        value={safeValue}
        onChange={onChange}
        formatLabel={(v) => {
          if (v < 60) return `${v} د`;
          const hours = Math.floor(v / 60);
          const mins = v % 60;
          if (mins === 0) return `${hours} س`;
          return `${hours}:${mins.toString().padStart(2, "0")}`;
        }}
      />
    </div>
  );
}