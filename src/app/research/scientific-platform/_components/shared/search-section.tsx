"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Filter,
  LayoutGrid,
  Table2,
  ChevronDown,
} from "lucide-react";

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
    <div className="mb-6 space-y-3">
      {/* ── Tabs (اختياري) ── */}
      {tabs && tabs.length > 0 && (
        <nav
          className="flex justify-center items-center gap-4 mb-6 flex-wrap"
          aria-label="فلترة حسب الدرجة العلمية"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-gray-100  text-gray-700 dark:text-gray-200 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      )}

      {/* ── شريط البحث الرئيسي ── */}
      <div
        className="
        flex flex-col sm:flex-row gap-2
    
      "
      >
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="
              w-full rounded-xl py-2.5 pr-10 pl-9 text-sm
              bg-gray-50 dark:bg-Muharram_secondary/10
              border border-gray-100 dark:border-Muharram_primary
              text-gray-800 dark:text-black
              placeholder:text-gray-400 dark:placeholder:text-Muharram_primary
              focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 dark:focus:ring-Muharram_secondary/25 dark:focus:border-Muharram_primary/40
              transition-all duration-200
            "
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              aria-label="مسح"
              className="
                absolute left-2.5 top-1/2 -translate-y-1/2
                w-5 h-5 rounded-full flex items-center justify-center
                bg-gray-200 dark:bg-Muharram_primary/10 text-gray-500
                hover:bg-gray-300 dark:hover:bg-Muharram_secondary/30 transition-colors
              "
            >
              <X size={10} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* ترتيب */}
          {sortOptions && sortOptions.length > 0 && (
            <select
              value={sortValue}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="
                rounded-xl px-5 py-2 text-sm
                bg-gray-50 dark:bg-Muharram_secondary/10
                border border-gray-100 dark:border-Muharram_primary
                text-gray-700 dark:text-black
                focus:ring-2 focus:ring-primary/25 dark:focus:ring-Muharram_primary/25 outline-none cursor-pointer
              "
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}

          {/* فلاتر */}
          {filters && filters.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold
                border transition-all duration-200
                ${
                  showFilters
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:text-primary hover:border-primary/30"
                }
              `}
            >
              <Filter size={14} />
              فلاتر
              {totalActive > 0 && (
                <span
                  className={`
                  text-[10px] font-bold rounded-full w-4 h-4
                  flex items-center justify-center
                  ${showFilters ? "bg-white text-primary" : "bg-primary text-white"}
                `}
                >
                  {totalActive}
                </span>
              )}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          )}

          {/* تبديل العرض */}
          {viewMode && onViewModeChange && (
            <div className="flex rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <button
                onClick={() => onViewModeChange("cards")}
                title="بطاقات"
                className={`p-2.5 transition-colors ${
                  viewMode === "cards"
                    ? "bg-primary text-white dark:bg-Muharram_primary"
                    : "bg-gray-50 dark:bg-white text-gray-500 hover:text-primary dark:hover:text-Muharram_secondary"
                }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => onViewModeChange("table")}
                title="جدول"
                className={`p-2.5 transition-colors ${
                  viewMode === "table"
                   ? "bg-primary text-white dark:bg-Muharram_primary"
                    : "bg-gray-50 dark:bg-white text-gray-500 hover:text-primary dark:hover:text-Muharram_secondary"
                }`}
              >
                <Table2 size={15} />
              </button>
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
            <div
              className="
              bg-white dark:bg-gray-900
              border border-gray-100 dark:border-gray-800
              rounded-2xl p-4 shadow-sm
            "
            >
              <div
                className={`grid gap-3 ${filters.length === 1 ? "grid-cols-1" : filters.length === 2 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}
              >
                {filters.map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1.5 uppercase tracking-wide">
                      {f.label}
                    </label>
                    <select
                      value={filterValues[f.key] ?? ""}
                      onChange={(e) => onFilterChange?.(f.key, e.target.value)}
                      className="
                        w-full rounded-xl px-3 py-2 text-sm
                        bg-gray-50 dark:bg-gray-800
                        border border-gray-100 dark:border-gray-700
                        text-gray-700 dark:text-gray-300
                        focus:ring-2 focus:ring-primary/25 outline-none
                      "
                    >
                      <option value="">{f.placeholder}</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              {totalActive > 0 && (
                <div className="flex justify-end mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
                  <button
                    onClick={clearAll}
                    className="text-xs font-semibold text-red-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <X size={11} /> مسح الكل
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── شريط النتائج ── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          <span className="font-bold text-primary text-base">
            {resultCount.toLocaleString("ar-EG")}
          </span>{" "}
          {resultUnit}
        </p>
      </div>
    </div>
  );
}
