"use client";

import { SearchIcon } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 mb-5 shadow-sm border border-gray-100">
      <div className="relative">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </div>

        <input
          type="text"
          placeholder="ابحث باسم المحاضرة أو المحاضر..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pr-12 pl-10 py-3 bg-transparent rounded-2xl focus:outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
