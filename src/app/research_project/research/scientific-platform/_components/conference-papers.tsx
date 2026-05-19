"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SearchIcon, X, Calendar, User, Building, Filter, Sparkles } from "lucide-react";

import { ResearchCard, type CardData } from "./shared/research-card";
import { SummaryModal } from "./shared/summary-modal";
import { SwiperPagination } from "./shared/swiper-pagination";

import researchData from "@/data/research.json";
import { Research } from "@/types/research";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;
const SORT_OPTIONS = [
  { value: "year-desc",  label: "الأحدث أولاً" },
  { value: "year-asc",   label: "الأقدم أولاً" },
  { value: "title-asc",  label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
  { value: "author-desc",label: "المؤلف (ي-أ)" },
] as const;

type SortField = "year" | "title" | "author";
type SortOrder = "asc" | "desc";
interface Filters { conference: string; author: string; publishedYear: string }

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildSearchText(item: Research) {
  return [item.id, item.slug, item.title, item.part, item.abstract,
          item.section, item.topic, item.author, item.publishedYear, item.conference]
    .join(" ").toLowerCase();
}

function sortResearch(list: Research[], sortBy: SortField, order: SortOrder) {
  return [...list].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "year")   cmp = (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0);
    if (sortBy === "title")  cmp = (a.title  || "").localeCompare(b.title  || "", "ar");
    if (sortBy === "author") cmp = (a.author || "").localeCompare(b.author || "", "ar");
    return order === "asc" ? cmp : -cmp;
  });
}

function toCardData(item: Research): CardData {
  return { id: item.id, title: item.title, author: item.author,
           publishedYear: item.publishedYear, conference: item.conference,
           section: item.section, abstract: item.abstract, pdfUrl: item.pdfUrl };
}

// ─── الصفحة ───────────────────────────────────────────────────────────────────

export default function ConferencePapersPage() {
  const searchParams = useSearchParams();
  const [research]   = useState<Research[]>(() => [...researchData].reverse());
  const [selected, setSelected]       = useState<CardData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy]           = useState<SortField>("year");
  const [sortOrder, setSortOrder]     = useState<SortOrder>("desc");
  const [searchTerm, setSearchTerm]   = useState(searchParams.get("search") ?? "");
  const [filters, setFilters]         = useState<Filters>({ conference: "", author: "", publishedYear: "" });

  const uniqueValues = useMemo(() => ({
    conferences: [...new Set(research.map((i) => i.conference))].filter(Boolean),
    authors:     [...new Set(research.map((i) => i.author).filter(Boolean))].sort(),
    years:       [...new Set(research.map((i) => i.publishedYear))].filter(Boolean).sort((a, b) => Number(b) - Number(a)),
  }), [research]);

  const filteredResearch = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return sortResearch(
      research.filter((item) =>
        (!term || buildSearchText(item).includes(term)) &&
        (!filters.conference    || item.conference?.toLowerCase().includes(filters.conference.toLowerCase())) &&
        (!filters.author        || item.author?.toLowerCase().includes(filters.author.toLowerCase())) &&
        (!filters.publishedYear || item.publishedYear?.toString().includes(filters.publishedYear))
      ),
      sortBy, sortOrder
    );
  }, [searchTerm, filters, research, sortBy, sortOrder]);

  const { currentResearch, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredResearch.length / ITEMS_PER_PAGE);
    const start = (Math.min(currentPage, Math.max(total, 1)) - 1) * ITEMS_PER_PAGE;
    return { currentResearch: filteredResearch.slice(start, start + ITEMS_PER_PAGE), totalPages: total };
  }, [filteredResearch, currentPage]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  const clearFilters = () => { setFilters({ conference: "", author: "", publishedYear: "" }); setSearchTerm(""); setCurrentPage(1); };
  const handleFilterChange = (key: keyof Filters, value: string) => { setFilters((p) => ({ ...p, [key]: value })); setCurrentPage(1); };
  const handleSortChange   = (val: string) => { const [f, o] = val.split("-") as [SortField, SortOrder]; setSortBy(f); setSortOrder(o); setCurrentPage(1); };

  return (
    <div className="min-h-screen container dark:bg-gray-950" dir="rtl">
      <div className="mx-auto px-4 py-10 lg:py-16">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center mb-14 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/6 to-transparent rounded-3xl -z-10" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            البحوث المرفوعة
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            استعرض أحدث البحوث العلمية في مختلف المجالات الإسلامية والعربية
          </p>
          <div className="flex items-center justify-center gap-6 mt-7">
            {[
              { label: "بحث منشور", value: research.length },
              { label: "مؤتمر",     value: uniqueValues.conferences.length },
              { label: "مؤلف",      value: uniqueValues.authors.length },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-primary">{s.value.toLocaleString("ar-EG")}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* شريط البحث */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 p-4 md:p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <SearchIcon size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300 transition-colors">
                  <X size={12} />
                </button>
              )}
              <input type="text" value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="ابحث في العنوان، المؤلف، المؤتمر..."
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/25 focus:border-primary/40 outline-none transition-all" />
            </div>

            <div className="flex items-center gap-2">
              <select value={`${sortBy}-${sortOrder}`} onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-xl px-3 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary/25 outline-none cursor-pointer">
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  showFilters ? "bg-primary text-white border-primary shadow-sm" : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:text-primary"}`}>
                <Filter size={16} /> فلاتر
                {activeFiltersCount > 0 && (
                  <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ${showFilters ? "bg-white text-primary" : "bg-primary text-white"}`}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { key: "conference"    as keyof Filters, label: "المؤتمر",   Icon: Building, options: uniqueValues.conferences, placeholder: "كل المؤتمرات" },
                      { key: "author"        as keyof Filters, label: "المؤلف",    Icon: User,     options: uniqueValues.authors,      placeholder: "كل المؤلفين" },
                      { key: "publishedYear" as keyof Filters, label: "سنة النشر", Icon: Calendar, options: uniqueValues.years,        placeholder: "كل السنوات"  },
                    ].map(({ key, label, Icon, options, placeholder }) => (
                      <div key={key}>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                          <Icon size={13} /> {label}
                        </label>
                        <select value={filters[key]} onChange={(e) => handleFilterChange(key, e.target.value)}
                          className="w-full rounded-xl px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary/25 outline-none transition-all">
                          <option value="">{placeholder}</option>
                          {options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  {activeFiltersCount > 0 && (
                    <div className="flex justify-end mt-3">
                      <button onClick={clearFilters} className="text-xs font-semibold text-red-400 hover:text-red-500 flex items-center gap-1">
                        <X size={13} /> مسح الكل
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* عدد النتائج */}
        {filteredResearch.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-primary opacity-60" />
            <span className="text-sm text-gray-400">
              <strong className="text-primary font-bold">{filteredResearch.length.toLocaleString("ar-EG")}</strong> نتيجة
            </span>
          </motion.div>
        )}

        {/* الكروت */}
        {filteredResearch.length > 0 ? (
          <motion.div layout className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {currentResearch.map((item) => (
                <ResearchCard key={item.id ?? `${item.title}-${item.author}`}
                  item={toCardData(item)} onSummary={setSelected} variant="conference" />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <SearchIcon size={28} className="text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-400 font-medium">لا توجد نتائج للبحث الحالي</p>
            <button onClick={clearFilters} className="mt-3 text-sm text-primary hover:underline">مسح الفلاتر</button>
          </motion.div>
        )}

        {totalPages > 1 && (
          <SwiperPagination currentPage={currentPage} totalPages={totalPages}
            onPageChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        )}

        <SummaryModal item={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
