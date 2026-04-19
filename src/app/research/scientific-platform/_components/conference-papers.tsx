"use client";

import { useState, useMemo, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { useSearchParams } from "next/navigation";
import {
  SearchIcon,
  X,
  Calendar,
  User,
  Building,
  Filter,
  Download,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/button";
import researchData from "@/data/research.json";
import { Research } from "@/types/research";

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 9;
const handleDownload = async (url: string, filename?: string) => {
  const proxyUrl = `/api/download?url=${encodeURIComponent(url)}`;

  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = filename ?? "file.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
const SORT_OPTIONS = [
  { value: "year-desc", label: "الأحدث أولاً" },
  { value: "year-asc", label: "الأقدم أولاً" },
  { value: "title-asc", label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
  { value: "author-desc", label: "المؤلف (ي-أ)" },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = "year" | "title" | "author";
type SortOrder = "asc" | "desc";
interface Filters {
  conference: string;
  author: string;
  publishedYear: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSearchText(item: Research) {
  return [
    item.id,
    item.slug,
    item.title,
    item.part,
    item.abstract,
    item.section,
    item.topic,
    item.author,
    item.publishedYear,
    item.conference,
  ]
    .join(" ")
    .toLowerCase();
}

function sortResearch(list: Research[], sortBy: SortField, order: SortOrder) {
  return [...list].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "year")
      cmp = (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0);
    if (sortBy === "title")
      cmp = (a.title || "").localeCompare(b.title || "", "ar");
    if (sortBy === "author")
      cmp = (a.author || "").localeCompare(b.author || "", "ar");
    return order === "asc" ? cmp : -cmp;
  });
}

// ─── Research Card ────────────────────────────────────────────────────────────

function ResearchCard({
  item,

  onSummary,
}: {
  item: Research;
  index: number;
  onSummary: (item: Research) => void;
}) {
  return (
    <motion.article
      className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-800 
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]
        hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.18)] dark:hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.25)]
        hover:-translate-y-1.5 transition-all duration-300 ease-out "
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-l from-primary/30 via-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-1 p-6">
        {/* Conference + Year row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
            bg-primary/8 dark:bg-primary/15 text-primary rounded-lg border border-primary/15
            truncate max-w-[68%]"
          >
            <Building size={11} className="shrink-0 opacity-70" />
            <span className="truncate text-sm ">{item.conference}</span>
          </span>
          <span className="flex items-center text-gray-500 dark:text-gray-400 gap-1 text-xs font-medium shrink-0">
            <Calendar size={12} />
            {item.publishedYear}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-subtitle font-bold leading-snug text-gray-900 dark:text-gray-50
          mb-4 line-clamp-3 group-hover:text-primary transition-colors duration-200"
        >
          {item.title}
        </h3>

        {/* Meta */}
        <div className="flex-1 space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
              <User size={13} />
            </span>
            <span className="truncate font-medium">{item.author}</span>
          </div>
          {item.section && (
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                <FileText size={13} />
              </span>
              <span className="truncate">{item.section}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          {/* زر التحميل */}
          {item.pdfUrl && (
            <div className="flex-1 flex gap-2">
              <button
                onClick={() => handleDownload(item.pdfUrl, `${item.title}.pdf`)}
                className="flex items-center justify-center p-2.5 rounded-xl
    bg-primary text-white hover:bg-primary/90 active:scale-95 
    transition-all duration-150 shadow-sm shadow-primary/20"
                title="تحميل"
              >
                <Download size={14} className="opacity-90" />
              </button>
              {item.abstract && (
                <button
                  onClick={() => onSummary(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
        bg-primary dark:bg-gray-800  dark:text-gray-300 text-sm font-semibold
        border border-gray-200 dark:border-gray-700 text-white
        hover:bg-primary/8 hover:bg-primary/90
        active:scale-95 transition-all duration-150"
                >
                  <BookOpen size={15} />
                  الملخص
                </button>
              )}
              {/* زر القراءة */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
          bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold
          border border-gray-200 dark:border-gray-700
          hover:bg-primary/8 hover:text-primary hover:border-primary/30
          active:scale-95 transition-all duration-150"
              >
                <BookOpen size={15} />
                قراءة
              </a>
            </div>
          )}

          {/* زر الملخص */}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Summary Modal ────────────────────────────────────────────────────────────

function SummaryModal({
  item,
  onClose,
}: {
  item: Research;
  onClose: () => void;
}) {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-3xl"
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl
              border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl
                      bg-primary/10 text-primary shrink-0"
                    >
                      <FileText size={18} />
                    </span>
                    <div className="min-w-0">
                      <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                        {item.title}
                      </Dialog.Title>
                      {item.author && (
                        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                          <User size={13} /> {item.author}
                          {item.publishedYear && (
                            <>
                              <span className="mx-1 opacity-40">·</span>
                              <Calendar size={13} />
                              {item.publishedYear}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
                      text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="إغلاق"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div
                className="px-7 py-6 max-h-[55vh] overflow-y-auto
                scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700
                scrollbar-track-transparent"
              >
                <div
                  className="prose text-subtitle prose-base dark:prose-invert max-w-none
                    prose-p:text-gray-600 dark:prose-p:text-gray-300
                    prose-p:leading-relaxed prose-headings:font-bold"
                  dangerouslySetInnerHTML={{ __html: item.abstract }}
                />
              </div>

              {/* Footer */}
              {item.pdfUrl && (
                <div
                  className="px-7 py-5 bg-gray-50/60 dark:bg-gray-800/40
                  border-t border-gray-100 dark:border-gray-800 flex justify-end"
                >
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                      bg-primary text-white text-sm font-semibold
                      hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20"
                  >
                    <Download size={16} />
                    تحميل PDF
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UploadedResearchPage() {
  const searchParams = useSearchParams();

  const [research] = useState<Research[]>(() => [...researchData].reverse());
  const [selectedSummary, setSelectedSummary] = useState<Research | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortField>("year");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? "",
  );
  const [filters, setFilters] = useState<Filters>({
    conference: "",
    author: "",
    publishedYear: "",
  });
  const swiperRef = useRef<SwiperType | null>(null);

  const uniqueValues = useMemo(
    () => ({
      conferences: [...new Set(research.map((i) => i.conference))].filter(
        Boolean,
      ),
      authors: [
        ...new Set(research.map((i) => i.author).filter(Boolean)),
      ].sort(),
      years: [...new Set(research.map((i) => i.publishedYear))]
        .filter(Boolean)
        .sort((a, b) => Number(b) - Number(a)),
    }),
    [research],
  );

  const filteredResearch = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = research.filter((item) => {
      const matchesSearch = !term || buildSearchText(item).includes(term);
      const matchesConference =
        !filters.conference ||
        item.conference
          ?.toLowerCase()
          .includes(filters.conference.toLowerCase());
      const matchesAuthor =
        !filters.author ||
        item.author?.toLowerCase().includes(filters.author.toLowerCase());
      const matchesYear =
        !filters.publishedYear ||
        item.publishedYear?.toString().includes(filters.publishedYear);
      return matchesSearch && matchesConference && matchesAuthor && matchesYear;
    });
    return sortResearch(filtered, sortBy, sortOrder);
  }, [searchTerm, filters, research, sortBy, sortOrder]);

  const { currentResearch, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredResearch.length / ITEMS_PER_PAGE);
    const safe = Math.min(currentPage, Math.max(total, 1));
    const start = (safe - 1) * ITEMS_PER_PAGE;
    return {
      currentResearch: filteredResearch.slice(start, start + ITEMS_PER_PAGE),
      totalPages: total,
      safePage: safe,
    };
  }, [filteredResearch, currentPage]);

  const activeFiltersCount =
    Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  const paginate = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const clearFilters = () => {
    setFilters({ conference: "", author: "", publishedYear: "" });
    setSearchTerm("");
    setCurrentPage(1);
  };
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setCurrentPage(1);
  };
  const handleSortChange = (val: string) => {
    const [f, o] = val.split("-") as [SortField, SortOrder];
    setSortBy(f);
    setSortOrder(o);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen container   dark:bg-gray-950" dir="rtl">
      <div className=" mx-auto px-4 py-10 lg:py-16 ">
        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center mb-14 overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/6 to-transparent rounded-3xl -z-10" />

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white
            tracking-tight leading-tight mb-4"
          >
            البحوث المرفوعة
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            استعرض أحدث البحوث العلمية في مختلف المجالات الإسلامية والعربية
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 mt-7">
            {[
              { label: "بحث منشور", value: research.length },
              { label: "مؤتمر", value: uniqueValues.conferences.length },
              { label: "مؤلف", value: uniqueValues.authors.length },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold text-primary">
                  {s.value.toLocaleString("ar-EG")}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100
            dark:border-gray-800 mb-8 p-4 md:p-5"
        >
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <SearchIcon
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center
                    rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300
                    dark:hover:bg-gray-600 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث في العنوان، المؤلف، المؤتمر..."
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm
                  bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                  text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
                  focus:ring-2 focus:ring-primary/25 focus:border-primary/40 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-xl px-3 py-3 text-sm bg-gray-50 dark:bg-gray-800
                  border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300
                  focus:ring-2 focus:ring-primary/25 outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {/* Filter button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                  border transition-all duration-200 ${
                    showFilters
                      ? "bg-primary text-white border-primary shadow-sm shadow-primary/25"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:text-primary"
                  }`}
              >
                <Filter size={16} />
                فلاتر
                {activeFiltersCount > 0 && (
                  <span
                    className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold
                    ${showFilters ? "bg-white text-primary" : "bg-primary text-white"}`}
                  >
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        key: "conference" as keyof Filters,
                        label: "المؤتمر",
                        Icon: Building,
                        options: uniqueValues.conferences,
                        placeholder: "كل المؤتمرات",
                      },
                      {
                        key: "author" as keyof Filters,
                        label: "المؤلف",
                        Icon: User,
                        options: uniqueValues.authors,
                        placeholder: "كل المؤلفين",
                      },
                      {
                        key: "publishedYear" as keyof Filters,
                        label: "سنة النشر",
                        Icon: Calendar,
                        options: uniqueValues.years,
                        placeholder: "كل السنوات",
                      },
                    ].map(({ key, label, Icon, options, placeholder }) => (
                      <div key={key}>
                        <label
                          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400
                          dark:text-gray-500 uppercase tracking-wide mb-1.5"
                        >
                          <Icon size={13} /> {label}
                        </label>
                        <select
                          value={filters[key]}
                          onChange={(e) =>
                            handleFilterChange(key, e.target.value)
                          }
                          className="w-full rounded-xl px-3 py-2.5 text-sm
                            bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700
                            text-gray-700 dark:text-gray-300
                            focus:ring-2 focus:ring-primary/25 focus:border-primary/40 outline-none transition-all"
                        >
                          <option value="">{placeholder}</option>
                          {options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  {activeFiltersCount > 0 && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={clearFilters}
                        className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <X size={13} /> مسح الكل
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        {filteredResearch.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles size={14} className="text-primary opacity-60" />
            <span className="text-sm text-gray-400 dark:text-gray-500">
              <strong className="text-primary font-bold">
                {filteredResearch.length.toLocaleString("ar-EG")}
              </strong>{" "}
              نتيجة
            </span>
          </motion.div>
        )}

        {/* ── Cards Grid ── */}
        {filteredResearch.length > 0 ? (
          <motion.div
            layout
            className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {currentResearch.map((item, index) => (
                <ResearchCard
                  key={item.id ?? `${item.title}-${item.author}`}
                  item={item}
                  index={index}
                  onSummary={setSelectedSummary}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <SearchIcon
                size={28}
                className="text-gray-300 dark:text-gray-600"
              />
            </div>
            <p className="text-gray-400 dark:text-gray-500 font-medium">
              لا توجد نتائج للبحث الحالي
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-primary hover:underline"
            >
              مسح الفلاتر
            </button>
          </motion.div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="w-11/12 mx-auto flex justify-center my-8">
            <nav className="flex items-center gap-2">
              {/* زر السابق */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  swiperRef.current?.slidePrev();
                }}
                disabled={currentPage === 1}
                aria-label="الصفحة السابقة"
                className="bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
              >
                <ChevronRight size={20} />
              </Button>

              {/* سلايدر الأرقام */}
              <div className="w-64">
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  slidesPerView={5}
                  spaceBetween={10}
                  grabCursor={true}
                  centeredSlides={false}
                  loop={true}
                >
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;

                    return (
                      <SwiperSlide
                        key={pageNum}
                        className="flex justify-center"
                      >
                        <Button
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          onClick={() => {
                            paginate(pageNum);
                            swiperRef.current?.slideToLoop(pageNum - 1);
                          }}
                          className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                            currentPage === pageNum
                              ? "bg-primary dark:bg-Muharram_primary text-white"
                              : "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                          }`}
                        >
                          {pageNum}
                        </Button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* زر التالي */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  swiperRef.current?.slideNext();
                }}
                disabled={currentPage === totalPages}
                aria-label="الصفحة التالية"
                className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
              >
                <ChevronLeft size={20} />
              </Button>
            </nav>
          </div>
        )}

        {/* ── Modal ── */}
        <AnimatePresence mode="wait">
          {selectedSummary && (
            <SummaryModal
              item={selectedSummary}
              onClose={() => setSelectedSummary(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
