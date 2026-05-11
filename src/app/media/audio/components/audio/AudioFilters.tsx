"use client";

import { useCallback, useRef } from "react";
import {
  Search, X, ChevronDown,
  Clock3, FolderOpen, ArrowDownUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

interface FilterProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}

interface ResultsBarProps {
  total: number;
  filtered: number;
  hasFilters: boolean;
  onClear: () => void;
}

interface AdvancedFiltersProps {
  category: string; setCategory: (v: string) => void; categories: string[];
  duration: string; setDuration: (v: string) => void;
  sort: string;     setSort: (v: string) => void;
  hasFilters: boolean; onClear: () => void;
}

// ─── Components ──────────────────────────────────────────────────────────────

export function AudioSearch({ value, onChange, placeholder = "ابحث بالعنوان أو المتحدث..." }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClear = useCallback(() => { onChange(""); inputRef.current?.focus(); }, [onChange]);

  return (
    <div className="relative flex-1 min-w-0">
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <Search className="w-4 h-4 text-slate-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir="rtl"
        className="
          w-full h-12 rounded-2xl pr-11 pl-11 text-sm shadow-sm
          bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl
          border border-slate-200/70 dark:border-white/10
          text-slate-700 dark:text-white placeholder-slate-400
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40
        "
      />
      {value && (
        <button onClick={handleClear} className="absolute inset-y-0 left-4 flex items-center text-slate-400 hover:text-red-500">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function AudioFilter({ label, options, value, onChange, icon }: FilterProps) {
  if (!options?.length) return null;
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="rtl"
        className="
          w-full h-12 appearance-none rounded-2xl pr-11 pl-10 text-sm shadow-sm cursor-pointer
          bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl
          border border-slate-200/70 dark:border-white/10
          text-slate-700 dark:text-white
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/40
        "
      >
        <option value="">{label ?? "اختر..."}</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {icon && <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">{icon}</div>}
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center gap-1">
        <div className="h-4 border-l border-slate-300 dark:border-slate-600 mr-1" />
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}

export function ResultsBar({ total, filtered, hasFilters, onClear }: ResultsBarProps) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-500 py-1">
      <span>
        {hasFilters ? (
          <><span className="font-semibold text-primary">{filtered}</span> من <span className="font-semibold">{total}</span> نتيجة</>
        ) : (
          <><span className="font-semibold text-slate-700">{total}</span> ملف صوتي</>
        )}
      </span>
      {hasFilters && (
        <button onClick={onClear} className="text-xs text-primary hover:underline">مسح الفلاتر</button>
      )}
    </div>
  );
}

export function AdvancedFilters({
  category, setCategory, categories,
  duration, setDuration,
  sort, setSort,
  hasFilters, onClear,
}: AdvancedFiltersProps) {
  const filters = [
    {
      label: "التصنيف", value: category, onChange: setCategory,
      options: categories,
      icon: <FolderOpen className="w-4 h-4 text-primary" />,
    },
    {
      label: "مدة الصوت", value: duration, onChange: setDuration,
      options: ["أقل من 10 دقائق", "10 - 30 دقيقة", "30 - 60 دقيقة", "أكثر من ساعة"],
      icon: <Clock3 className="w-4 h-4 text-primary" />,
    },
    {
      label: "الترتيب", value: sort, onChange: setSort,
      options: ["الأحدث", "الأقدم", "الأطول", "الأقصر", "الأكبر حجماً", "الأصغر حجماً"],
      icon: <ArrowDownUp className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {filters.map((f) => (
        <AudioFilter key={f.label} {...f} />
      ))}
      {hasFilters && (
        <button onClick={onClear} className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-red-500 transition-colors">
          <X className="w-3.5 h-3.5" /> مسح الفلاتر
        </button>
      )}
    </div>
  );
}