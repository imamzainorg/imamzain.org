"use client";

import Dropdown from "@/components/dropdown";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, ArrowUpDown, LayoutGrid, Table2, ChevronDown } from "lucide-react";
import FilterChips from "@/components/filter-chips";
import SearchField from "@/components/search-field";

// ─── أنواع ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  key: string;
  label: string;
  options: string[];
  placeholder: string;
}

export interface SortOption {
  value: string;
  label: string;
}

interface SearchSectionProps {
  /** قيمة حقل البحث */
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  /** عدد النتائج */
  resultCount: number;
  resultUnit?: string;

  /** الترتيب */
  sortOptions?: SortOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;

  /** الفلاتر */
  filters?: FilterOption[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;

  /** تبديل العرض */
  viewMode?: "cards" | "table";
  onViewModeChange?: (mode: "cards" | "table") => void;

  /** tabs فوق البحث (مثل بحوث الطلاب) */
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

// ─── SearchSection ────────────────────────────────────────────────────────────

export function SearchSection({
  searchValue,
  onSearchChange,
  searchPlaceholder = "ابحث...",
  resultCount,
  resultUnit = "نتيجة",
  sortOptions,
  sortValue,
  onSortChange,
  filters,
  filterValues = {},
  onFilterChange,
  viewMode,
  onViewModeChange,
  tabs,
  activeTab,
  onTabChange,
}: SearchSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = Object.values(filterValues).filter(Boolean).length;
  const clearAll = () => {
    onSearchChange("");
    filters?.forEach((f) => onFilterChange?.(f.key, ""));
  };
  const totalActive = activeFiltersCount + (searchValue ? 1 : 0);

  return (
    <div className="mb-8 space-y-5">
      {/* ── Tabs (اختياري) ── */}
      {tabs && tabs.length > 0 && (
        <FilterChips
          label="فلترة حسب الدرجة العلمية"
          options={tabs.map((tab) => ({ key: tab.id, label: tab.label }))}
          value={activeTab ?? ""}
          onChange={(id) => onTabChange?.(id)}
        />
      )}

      {/* ── شريط البحث الرئيسي ── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchField
          className="flex-1"
          label={searchPlaceholder}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
        />
        <div className="flex shrink-0 items-center gap-3">
          {/* ترتيب */}
          {sortOptions && sortOptions.length > 0 && (
            <Dropdown
              label="الترتيب"
              value={sortValue ?? ""}
              onChange={(v) => onSortChange?.(v)}
              icon={<ArrowUpDown />}
              className="min-w-44"
              options={sortOptions}
            />
          )}

          {/* فلاتر */}
          {filters && filters.length > 0 && (
            <button
              type="button"
              aria-expanded={showFilters}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-colors ${
                showFilters
                  ? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
                  : "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary"
              }`}
            >
              <Filter size={16} />
              فلاتر
              {totalActive > 0 && (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                    showFilters ? "bg-white text-primary" : "bg-primary text-white"
                  }`}
                >
                  {totalActive}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* تبديل العرض */}
          {viewMode && onViewModeChange && (
            <div className="flex overflow-hidden rounded-xl border-2 border-primary/25 dark:border-Muharram_primary/25">
              {(
                [
                  { mode: "cards", title: "بطاقات", Icon: LayoutGrid },
                  { mode: "table", title: "جدول", Icon: Table2 },
                ] as const
              ).map(({ mode, title, Icon }) => (
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

      {/* ── لوحة الفلاتر ── */}
      <AnimatePresence>
        {showFilters && filters && filters.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="rounded-[28px] border border-primary/30 p-5 dark:border-Muharram_primary/30">
              <div
                className={`grid gap-4 ${filters.length === 1 ? "grid-cols-1" : filters.length === 2 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}
              >
                {filters.map((f) => (
                  <div key={f.key}>
                    <label className="mb-2 block text-sm font-bold text-primary dark:text-Muharram_primary">
                      {f.label}
                    </label>
                    <Dropdown
                      label={f.label}
                      placeholder={f.placeholder}
                      value={filterValues[f.key] ?? ""}
                      onChange={(v) => onFilterChange?.(f.key, v)}
                      options={[{ value: "", label: f.placeholder }, ...f.options.map((o) => ({ value: o, label: o }))]}
                    />
                  </div>
                ))}
              </div>
              {totalActive > 0 && (
                <div className="mt-4 flex justify-end border-t border-secondary/30 pt-4">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="flex items-center gap-1.5 font-semibold text-primary hover:underline dark:text-Muharram_primary"
                  >
                    <X size={14} /> مسح الكل
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── شريط النتائج ── */}
      <p className="font-semibold text-gray-600">
        <span className="text-xl font-extrabold text-primary dark:text-Muharram_primary">
          {resultCount.toLocaleString("ar-EG")}
        </span>{" "}
        {resultUnit}
      </p>
    </div>
  );
}
