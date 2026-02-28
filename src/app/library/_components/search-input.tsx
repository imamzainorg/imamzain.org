"use client";

import { X, Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
};

export default function SearchInput({
  value,
  onChange,
  onClear,
}: SearchInputProps) {
  return (
    <div className="relative p-2  mx-auto container group mb-4">
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث عن كتاب، مؤلف، دار نشر..."
        className="w-full border border-gray-200 rounded-2xl   px-12 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:shadow-md"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
