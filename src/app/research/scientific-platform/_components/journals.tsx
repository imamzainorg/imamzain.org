"use client";

import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { User, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  BookOpen as BookOpenIcon,
  Grid as GridIcon,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { Journals } from "@/types/journals";
import { Button } from "@/components/button";
import JournalsData from "@/data/journals.json";

type JounalsResearch = Journals;

export default function JounalsResearchPage() {
  const [activeTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("default");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  // جلب البيانات حسب التبويب
  const getDataByTab = useMemo(() => {
    if (activeTab === "all") return JournalsData as JounalsResearch[];
    return (JournalsData as Journals[]).filter((item) =>
      item.translations.some((t) => t.category),
    );
  }, [activeTab]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return getDataByTab;

    const term = searchTerm.toLowerCase();
    return getDataByTab.filter((item) =>
      item.translations.some((t) => {
        const title = t.title?.toLowerCase() || "";
        const authors = t.authors?.join(", ").toLowerCase() || "";
        const venue = t.publicationVenue?.toLowerCase() || "";
        return (
          title.includes(term) || authors.includes(term) || venue.includes(term)
        );
      }),
    );
  }, [searchTerm, getDataByTab]);

  // ترتيب البيانات
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    switch (sortBy) {
      case "year":
        return data.sort(
          (a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear),
        );
      case "title":
        return data.sort((a, b) => {
          const titleA = a.translations[0]?.title || "";
          const titleB = b.translations[0]?.title || "";
          return titleA.localeCompare(titleB);
        });
      case "popularity":
        return data; // يمكن إضافة منطق الشعبية لاحقًا
      default:
        return data;
    }
  }, [filteredData, sortBy]);

  // تقسيم الصفحات
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [currentPage, sortedData]);

  const paginate = (page: number) => {
    setCurrentPage(page);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPdf = (item: JounalsResearch) => {
    if (item.pdfUrl) window.open(item.pdfUrl, "_blank");
  };

  const handleRowClick = (id: string) => setHighlightId(id);
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className="container">
      <div className="min-h-screen py-10">
        <div className="mx-auto px-4">
          {/* Breadcrumbs */}

          {/* البحث والتصفية */}
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
              <div className="flex-1">
                <label className="block text-subtitle	 font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    placeholder="ابحث بعنوان المقال، المؤلف، الناشر، السنة، الصفحة..."
                    className="w-full md:w-[400px] pr-10 py-3 rounded-xl border-2 border-primary/40 bg-white/60 dark:bg-gray-900/40 placeholder:text-gray-400 text-gray-800 dark:text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/70 hover:shadow-md backdrop-blur-sm"
                  />
                  <SearchIcon
                    size={18}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-start">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "cards" : "table")
                  }
                  className="px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:bg-primary/90 hover:text-white shadow-sm hover:shadow-md transition-all duration-300"
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
                  <label className="block  font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ترتيب
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-2 py-1 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-800 dark:text-gray-100 transition-all duration-300 hover:border-primary/70"
                  >
                    <option value="default">الافتراضي</option>
                    <option value="popularity">الأكثر قراءة</option>
                    <option value="year">الأحدث</option>
                    <option value="title">حسب العنوان</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* النتائج */}
          <div className=" ">
            <div className="px-6 text-subtitle py-4 bg-gradient-to-r border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <BookOpenIcon size={18} />
                  <span className="font-mediu m">
                    النتائج: {sortedData.length} مقالة {/* العدد الكلي */}
                  </span>
                </div>
            
              </div>
            </div>

            <div className="p-6">
              {viewMode === "table" ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">
                        <th className="px-4 py-3 text-center w-12">ت</th>
                        <th className="px-4 py-3 text-right w-80">اسم البحث</th>
                        <th className="px-4 py-3 text-right w-56">المؤلف</th>
                        <th className="px-4 py-3 text-right">الناشر</th>
                        <th className="px-4 py-3 text-right">اللغة</th>
                        <th className="px-4 py-3 text-right">تاريخ الاصدار</th>
                        <th className="px-4 py-3 text-right">عدد الصفحات</th>
                        <th className="px-4 py-3 text-center">التحميل</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {paginatedData.map((item, idx) =>
                          item.translations.map((t, i) => {
                            const isHighlighted = highlightId === item.id;
                            return (
                              <motion.tr
                                key={`${item.id}-${i}`}
                                initial={{
                                  opacity: 0,
                                  y: 6,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                exit={{
                                  opacity: 0,
                                  y: -6,
                                }}
                                className={`cursor-pointer  ${
                                  isHighlighted
                                    ? "bg-primary/10 ring-2 ring-primary/20"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-700/40"
                                }`}
                                onClick={() => handleRowClick(item.id)}
                                onDoubleClick={() => openPdf(item)}
                                ref={(el) => {
                                  if (el) {
                                    rowRefs.current[item.id] = el;
                                  }
                                }}
                              >
                                <td className="px-4 py-4 text-center align-top">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 dark:bg-gray-700">
                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {t.title}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {t.authors?.join(", ")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {t.publicationVenue}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {t.language}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {item.publishedYear}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {t.pagenam}
                                </td>
                                <td className="px-4 py-3  justify-center">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openPdf(item);
                                    }}
                                    className="flex items-center   gap-2 px-4 py-2 rounded-lg bg-gradient-to-r text-secondary font-medium hover:shadow-lg transform"
                                  >
                                    <FaFilePdf /> PDF
                                  </button>
                                </td>
                              </motion.tr>
                            );
                          }),
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {paginatedData.map((item) =>
                      item.translations.map((t) => (
                        <motion.div
                          key={`${item.id}-${t.languageid}`}
                          layout
                          whileHover={{ y: -6 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-800 
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]
        hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.18)] dark:hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.25)]
        hover:-translate-y-1.5 transition-all duration-300 ease-out hover: "
                        >
                          <div className="h-1 w-full bg-gradient-to-l from-primary/30 via-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative p-6 flex flex-col  justify-between h-full">
                            <h3
                              className="text-subtitle font-bold leading-snug text-gray-900 dark:text-gray-50
          mb-4 line-clamp-3 group-hover:text-primary transition-colors duration-200"
                            >
                              {t.title}
                            </h3>

                            <div className="flex-1 space-y-2 ">
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                                  <User size={13} />
                                </span>
                                <span className="truncate font-medium">
                                  {" "}
                                  {t.authors.join(", ")}
                                </span>
                              </div>
                              {t.publicationVenue && (
                                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                                    <FileText size={13} />
                                  </span>
                                  <span className="truncate">
                                    {t.publicationVenue}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="my-5 border-t border-secondary/20" />
                            <motion.button
                              whileTap={{
                                scale: 0.97,
                              }}
                              whileHover={{
                                backgroundPosition: "100% 0",
                                transition: {
                                  duration: 0.4,
                                },
                              }}
                              onClick={() => openPdf(item)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:border-secondary border-3 bg-[length:200%_100%] text-white font-medium shadow hover:shadow-lg transition-all duration-300"
                            >
                              <FaFilePdf className="text-lg" />
                              <span>عرض PDF</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )),
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
}
