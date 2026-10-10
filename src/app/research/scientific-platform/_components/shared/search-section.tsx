"use client";

import { ArrowUpDown, LayoutGrid, Table2 } from "lucide-react";
import Dropdown from "@/components/dropdown";
import SearchField from "@/components/search-field";

const SORT_OPTIONS = [
  { value: "year-desc", label: "الأحدث" },
  { value: "year-asc", label: "الأقدم" },
  { value: "title-asc", label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
];

const VIEWS = [
  { mode: "cards", title: "بطاقات", Icon: LayoutGrid },
  { mode: "table", title: "جدول", Icon: Table2 },
] as const;

export type ViewMode = (typeof VIEWS)[number]["mode"];

// The bar above a research list: search, sort, an optional cards/table switch, and the count.
export function SearchSection({
  searchValue,
  onSearchChange,
  searchPlaceholder = "ابحث...",
  resultCount,
  resultUnit = "نتيجة",
  sortValue,
  onSortChange,
  viewMode,
  onViewModeChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  resultCount: number;
  resultUnit?: string;
  sortValue: string;
  onSortChange: (value: string) => void;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}) {
  return (
    <div className="mb-8 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchField
          className="flex-1"
          label={searchPlaceholder}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
        <div className="flex shrink-0 items-center gap-3">
          <Dropdown
            label="الترتيب"
            value={sortValue}
            onChange={onSortChange}
            icon={<ArrowUpDown />}
            className="min-w-44"
            options={SORT_OPTIONS}
          />

          {viewMode && onViewModeChange && (
            <div className="flex overflow-hidden rounded-xl border-2 border-primary/25 dark:border-Muharram_primary/25">
              {VIEWS.map(({ mode, title, Icon }) => (
                <button
                  key={mode}
                  type="button"
                  title={title}
                  aria-label={title}
                  aria-pressed={viewMode === mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`p-3 transition-colors ${
                    viewMode === mode
                      ? "bg-primary text-white dark:bg-Muharram_primary"
                      : "bg-white text-primary hover:bg-primary/10 dark:text-Muharram_primary"
                  }`}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="font-semibold text-gray-600">
        <span className="text-xl font-extrabold text-primary dark:text-Muharram_primary">
          {resultCount.toLocaleString("ar-EG")}
        </span>{" "}
        {resultUnit}
      </p>
    </div>
  );
}
