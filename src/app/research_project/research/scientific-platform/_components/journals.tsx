"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  BookOpen as BookOpenIcon,
  Grid as GridIcon,
  List as ListIcon,
} from "lucide-react";

import { ResearchCard, type CardData } from "./shared/research-card";
import { ResearchTable, type TableRow } from "./shared/research-table";
import { SwiperPagination } from "./shared/swiper-pagination";

import { Journals } from "@/types/journals";
import JournalsData from "@/data/journals.json";

const ITEMS_PER_PAGE = 21;

const SORT_OPTIONS = [
  { value: "default", label: "الافتراضي" },
  { value: "popularity", label: "الأكثر قراءة" },
  { value: "year", label: "الأحدث" },
  { value: "title", label: "حسب العنوان" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function toCardData(item: Journals, t: Journals["translations"][0]): CardData {
  return {
    id: item.id,
    title: t.title,
    author: t.authors?.join(", "),
    publishedYear: item.publishedYear,
    publicationVenue: t.publicationVenue,
    pdfUrl: item.pdfUrl,
  };
}

function toTableRow(item: Journals, t: Journals["translations"][0]): TableRow {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors ?? [],
    publicationVenue: t.publicationVenue ?? "",
    language: t.language,
    publishedYear: item.publishedYear,

    pdfUrl: item.pdfUrl,
  };
}

// ─── الصفحة ───────────────────────────────────────────────────────────────────

export default function JournalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("default");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allData = JournalsData as Journals[];

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return allData;
    const term = searchTerm.toLowerCase();
    return allData.filter((item) =>
      item.translations.some(
        (t) =>
          (t.title?.toLowerCase() ?? "").includes(term) ||
          (t.authors?.join(", ").toLowerCase() ?? "").includes(term) ||
          (t.publicationVenue?.toLowerCase() ?? "").includes(term),
      ),
    );
  }, [searchTerm, allData]);

  const sortedData = useMemo(() => {
    const data = [...filteredData];
    if (sortBy === "year")
      return data.sort(
        (a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear),
      );
    if (sortBy === "title")
      return data.sort((a, b) =>
        (a.translations[0]?.title ?? "").localeCompare(
          b.translations[0]?.title ?? "",
        ),
      );
    return data;
  }, [filteredData, sortBy]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedData]);

  const paginate = (page: number) => {
    setCurrentPage(page);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // flatten للـ table
  const tableRows = paginatedData.flatMap((item) =>
    item.translations.map((t) => toTableRow(item, t)),
  );

  return (
    <div className="container">
      <div className="min-h-screen py-10">
        <div className="mx-auto px-4">
          {/* البحث والتصفية */}
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
              <div className="flex-1">
                <label className="block text-subtitle font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ابحث في الموسوعة
                </label>
                <div className="relative">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="ابحث بعنوان المقال، المؤلف، الناشر..."
                    className="w-full md:w-[400px] pr-10 py-3 rounded-xl border-2 border-primary/40 bg-white/60 dark:bg-gray-900/40 placeholder:text-gray-400 text-gray-800 dark:text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 backdrop-blur-sm"
                  />
                  <SearchIcon
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "cards" : "table")
                  }
                  className="px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:bg-primary/90 hover:text-white shadow-sm transition-all duration-300"
                >
                  {viewMode === "table" ? (
                    <GridIcon size={16} />
                  ) : (
                    <ListIcon size={16} />
                  )}
                  <span className="text-subtitle">
                    {viewMode === "table" ? "عرض بطاقات" : "عرض جدول"}
                  </span>
                </button>

                <div className="flex-1 text-subtitle">
                  <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ترتيب
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-2 py-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-gray-100 transition-all"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* النتائج */}
          <div>
            <div className="px-6 text-subtitle py-4 bg-gradient-to-r border-b">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <BookOpenIcon size={18} />
                <span>النتائج: {sortedData.length} مقالة</span>
              </div>
            </div>

            <div className="p-6">
              {viewMode === "table" ? (
                <ResearchTable
                  rows={tableRows}
                  startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
                  highlightId={highlightId}
                  onRowClick={setHighlightId}
                  onRowDoubleClick={(url) => url && window.open(url, "_blank")}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {paginatedData.map((item) =>
                      item.translations.map((t) => (
                        <ResearchCard
                          key={`${item.id}-${t.languageid}`}
                          item={toCardData(item, t)}
                          variant="journal"
                        />
                      )),
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <SwiperPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
