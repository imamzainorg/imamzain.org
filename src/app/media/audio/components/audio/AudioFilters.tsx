"use client";

import Dropdown from "@/components/dropdown";
import { useCallback, useRef } from "react";
import { Search, X } from "lucide-react";

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

// ─── Components ──────────────────────────────────────────────────────────────

export function AudioSearch({ value, onChange, placeholder = "ابحث بالعنوان أو المتحدث..." }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClear = useCallback(() => { onChange(""); inputRef.current?.focus(); }, [onChange]);

  return (
    <div className="relative flex-1 min-w-0">
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <Search className="w-4 h-4 text-slate-400 dark:text-black" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir="rtl"
        className="
          w-full h-12 rounded-xl pr-11 pl-11 text-base
          bg-white border-2 border-primary/25 dark:border-Muharram_primary/25
          text-slate-800 placeholder-slate-400
          transition-colors duration-300
          focus:outline-none focus:border-primary dark:focus:border-Muharram_primary
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
    <Dropdown
      label={label ?? "اختر..."}
      value={value}
      onChange={onChange}
      icon={icon}
      className="w-full"
      options={[{ value: "", label: label ?? "اختر..." }, ...options.map((o) => ({ value: o, label: o }))]}
    />
  );
}
