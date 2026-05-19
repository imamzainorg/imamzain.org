"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { GraduationCap, Search as SearchIcon, X, LayoutGrid, Table2, FileText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FaFilePdf } from "react-icons/fa";

import { ResearchTable, type TableRow } from "./shared/research-table";
import { SwiperPagination } from "./shared/swiper-pagination";

import studentData from "@/data/student.json";
import { StudentResearch } from "@/types/student";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

type DegreeType = "bachelor" | "master" | "phd" | "all";

const tabs = [
  { id: "all",      label: "الكل"        },
  { id: "bachelor", label: "بكالوريوس"   },
  { id: "master",   label: "ماجستير"     },
  { id: "phd",      label: "دكتوراه"     },
] as const;

const CATEGORY_MAP: Record<string, string> = {
  bachelor: "بكالوريوس",
  master:   "رسالة ماجستير",
  phd:      "دكتوراه",
};

const ITEMS_PER_PAGE = 21;

// ─── helper ───────────────────────────────────────────────────────────────────

function toTableRow(item: StudentResearch, t: StudentResearch["translations"][0]): TableRow {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors,
    publicationVenue: t.publicationVenue,
    language: t.language,
    category: t.category,
    publishedYear: item.publishedYear,
   
    pdfUrl: item.pdfUrl,
  };
}

// ─── الصفحة ───────────────────────────────────────────────────────────────────

export default function StudentResearchPage() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab]       = useState<DegreeType>(() => (searchParams.get("degree") as DegreeType) || "all");
  const [searchTerm, setSearchTerm]     = useState("");
  const [viewMode, setViewMode]         = useState<"cards" | "table">("cards");
  const [highlightId, setHighlightId]   = useState<string | null>(null);
  const [currentPage, setCurrentPage]   = useState(1);

  const handleTabClick = useCallback((id: string) => {
    setActiveTab(id as DegreeType);
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const paginate = useCallback((page: number) => {
    setCurrentPage(page);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredData = useMemo(() => {
    const base = activeTab === "all"
      ? (studentData as StudentResearch[])
      : (studentData as StudentResearch[]).filter((item) =>
          item.translations.some((t) => t.category === CATEGORY_MAP[activeTab])
        );

    if (!searchTerm.trim()) return base;
    const term = searchTerm.toLowerCase();
    return base.filter((item) =>
      item.translations.some((t) =>
        t.title.toLowerCase().includes(term) ||
        t.authors.join(", ").toLowerCase().includes(term) ||
        t.publicationVenue.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, activeTab]);

  const sortedData = useMemo(() =>
    [...filteredData].sort((a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear))
  , [filteredData]);

  const totalPages    = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedData]);

  // flatten للـ table
  const tableRows = paginatedData.flatMap((item) =>
    item.translations.map((t) => toTableRow(item, t))
  );

  return (
    <main className="container">
      {/* Header */}
      <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <GraduationCap size={48} className="text-primary" aria-hidden />
        </div>
        <h2 className="text-body font-bold text-gray-900 dark:text-white mb-3">بحوث الطلاب</h2>
        <p className="text-gray-600 text-note leading-8 dark:text-gray-300 max-w-2xl mx-auto">
          بحوث طلاب البكالوريوس والماجستير والدكتوراه ضمن مشاريع علمية متنوعة.
        </p>
      </motion.header>

      {/* Tabs */}
      <nav className="flex justify-center items-center gap-4 mb-6 flex-wrap" aria-label="فلترة حسب الدرجة العلمية">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => handleTabClick(tab.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            aria-current={activeTab === tab.id ? "page" : undefined}>
            {tab.label}
          </button>
        ))}
        <button onClick={() => setViewMode((p) => p === "cards" ? "table" : "cards")}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          aria-label={`تغيير إلى عرض ${viewMode === "cards" ? "الجدول" : "البطاقات"}`}>
          {viewMode === "cards" ? <Table2 className="w-5 h-5 text-gray-700 dark:text-gray-200" /> : <LayoutGrid className="w-5 h-5 text-gray-700 dark:text-gray-200" />}
        </button>
      </nav>

      {/* Search */}
      <div className="max-w-sm mx-auto mb-6 relative">
        <label htmlFor="search-input" className="sr-only">البحث في البحوث</label>
        <input id="search-input" type="text" value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={activeTab === "all" ? "ابحث في جميع البحوث..." : `ابحث في ${tabs.find((t) => t.id === activeTab)?.label}...`}
          className="w-full p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {searchTerm
            ? <button onClick={() => handleSearch("")} aria-label="مسح البحث" className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
            : <SearchIcon className="w-5 h-5 text-gray-500" aria-hidden />}
        </div>
      </div>

      {/* النتائج */}
      <section className="rounded-2xl shadow-lg border overflow-hidden bg-gray-50 dark:bg-gray-800">
        <div className="px-6 py-4 bg-gradient-to-r border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FileText size={18} aria-hidden />
              <span className="font-medium text-subtitle">النتائج: {filteredData.length} بحث</span>
            </div>
            {viewMode === "table" && (
              <p className="text-subtitle text-gray-500 dark:text-gray-400">انقر على الصف لتحديده - انقر مرتين لفتح الملف</p>
            )}
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
              showCategory
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {paginatedData.map((item) =>
                  item.translations.map((t) => (
                    <motion.article key={`${item.id}-${t.languageid}`} layout
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }} whileHover={{ y: -6 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative bg-white/90 dark:bg-gray-900/90 border border-secondary/30 dark:border-secondary/20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70 pointer-events-none" />
                      <div className="relative p-6 flex flex-col justify-between h-full">
                        <h3 className="text-note font-semibold text-gray-800 dark:text-white mb-4 leading-snug line-clamp-2">
                          {t.title}
                        </h3>
                        <div className="space-y-2 text-subtitle text-gray-600 dark:text-gray-400">
                          <p><span className="font-semibold text-secondary">المؤلف:</span> {t.authors.join(", ")}</p>
                          <p><span className="font-semibold text-secondary">الناشر:</span> {t.publicationVenue}</p>
                          {t.category && <p><span className="font-semibold text-secondary">الدرجة العلمية:</span> {t.category}</p>}
                        </div>
                        <div className="my-5 border-t border-secondary/20" />
                        <motion.button whileTap={{ scale: 0.97 }}
                          onClick={() => item.pdfUrl && window.open(item.pdfUrl, "_blank")}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:border-secondary border-3 text-white font-medium shadow hover:shadow-lg transition-all duration-300"
                          aria-label={`عرض PDF لـ ${t.title}`}>
                          <FaFilePdf className="text-lg" aria-hidden />
                          <span>عرض PDF</span>
                        </motion.button>
                      </div>
                    </motion.article>
                  ))
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <SwiperPagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
      )}
    </main>
  );
}
