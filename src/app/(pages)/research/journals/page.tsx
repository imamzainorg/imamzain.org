"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Breadcrumbs from "@/components/breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  BookOpen as BookOpenIcon,
  Grid as GridIcon,
  List as ListIcon,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { Jounals } from "@/types/jounals";


import JournalsData from "@/data/journals.json"; 

type JounalsResearch = Jounals;




export default function JounalsResearchPage() {
  const [activeTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<JounalsResearch[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("default");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const getDataByTab = useMemo(() => {
    if (activeTab === "all") return JournalsData as JounalsResearch[]; // ✅ تصحيح اسم المتغير
    
    return (JournalsData as Jounals[]).filter(
      (
        item // ✅ تصحيح اسم المتغير
      ) => item.translations.some((t) => t.category )
    );
  }, [activeTab]);

  // البحث
  useEffect(() => {
    const dataToSearch = getDataByTab;
    if (!searchTerm.trim()) {
      setFilteredData(dataToSearch);
      return;
    }
    const term = searchTerm.toLowerCase();
    const results = dataToSearch.filter((item) =>
      item.translations.some((t) => {
        const title = t.title?.toLowerCase() || "";
        const authors = t.authors?.join(", ").toLowerCase() || "";
        const venue = t.publicationVenue?.toLowerCase() || "";
        return (
          title.includes(term) || authors.includes(term) || venue.includes(term)
        );
      })
    );
    setFilteredData(results);
  }, [searchTerm, getDataByTab]);

  // ✅ تطبيق الترتيب
  const sortedData = useMemo(() => {
    const data = [...filteredData];

    switch (sortBy) {
      case "year":
        return data.sort(
          (a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear)
        );
      case "title":
        return data.sort((a, b) => {
          const titleA = a.translations[0]?.title || "";
          const titleB = b.translations[0]?.title || "";
          return titleA.localeCompare(titleB);
        });
      case "popularity":
        // يمكن إضافة منطق الشعبية هنا
        return data;
      default:
        return data;
    }
  }, [filteredData, sortBy]);

  const openPdf = (item: JounalsResearch) => {
    if (item.pdfUrl) window.open(item.pdfUrl, "_blank");
  };

  const handleRowClick = (id: string) => setHighlightId(id);

  return (
    <div className="container">
      <div className="min-h-screen py-10">
        <div className="mx-auto px-4">
          <div className="mb-8">
            <Breadcrumbs
              links={[
                { name: "الصفحة الرئيسية", url: "/" },
                { name: "البحث العلمي", url: "/research" },
                {
                  name: "موسوعة الإمام السجاد",
                  url: "/research/imam-sajjad-encyclopedia",
                },
              ]}
            />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mt-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                      موسوعة الإمام السجاد
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
                      الفهرس الشامل للمقالات والدراسات في الدوريات العربية
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* البحث والتصفية */}
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 w-full">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ابحث في الموسوعة
                </label>
                <div className="relative">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  <span className="text-sm">
                    {viewMode === "table" ? "عرض بطاقات" : "عرض جدول"}
                  </span>
                </button>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

          {/* النتائج: جدول أو بطاقات */}
          <div className="rounded-2xl shadow-lg border overflow-hidden bg-opacity-50 bg-gray-50">
            <div className="px-6 py-4 bg-gradient-to-r border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <BookOpenIcon size={18} />
                  <span className="font-medium">
                    النتائج: {sortedData.length} مقالة
                  </span>{" "}
                  {/* ✅ استخدام sortedData */}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  انقر على المقال للتمييز - انقر مزدوج لفتح الملف
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
                        <th className="px-4 py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {sortedData.map(
                          (
                            item,
                            idx // ✅ استخدام sortedData
                          ) =>
                            item.translations.map((t, i) => {
                              const isHighlighted = highlightId === item.id;
                              return (
                                <motion.tr
                                  key={`${item.id}-${i}`}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  className={`cursor-pointer ${
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
                                      {idx + 1}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    {t.title}
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    {t.authors?.join(", ")}
                                  </td>
                                  {/* ✅ إضافة ? للتحقق */}
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
                                  {/* ✅ التعامل مع كلا الاسمين */}
                                  <td className="px-4 py-3 flex justify-center">
                                       <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPdf(item);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r  disabled:opacity-50 text-secondary font-medium  hover:shadow-lg  transform"
                                >
                                <FaFilePdf /> PDF
                              </button>
                                  </td>
                                </motion.tr>
                              );
                            })
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              ) : (
                // بطاقات
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {sortedData.map(
                      (
                        item // ✅ استخدام sortedData
                      ) =>
                        item.translations.map((t) => (
                          <motion.div
                            key={item.id + t.title}
                            layout
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-secondary/30 dark:border-secondary/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />

                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                {t.title}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400 mb-1">
                                <span className="text-secondary"> المؤلف </span>
                                : {t.authors?.join(", ")}
                              </p>
                              <div className="flex justify-between">
                                <p className="text-gray-500 dark:text-gray-400 mb-1">
                                  <span className="text-secondary">
                                    {" "}
                                    الناشر{" "}
                                  </span>{" "}
                                  : {t.publicationVenue}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                  <span className="text-secondary">
                                    {" "}
                                    التاريخ
                                  </span>{" "}
                                  : {item.publishedYear}
                                </p>
                              </div>
                            </div>

                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              whileHover={{
                                backgroundPosition: "100% 0",
                                transition: { duration: 0.4 },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openPdf(item);
                              }}
                              className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary via-secondary/90 to-primary bg-[length:200%_100%] text-white font-medium shadow-md hover:shadow-lg w-full transition-all duration-300"
                            >
                              <FaFilePdf className="text-lg" />{" "}
                              <span>عرض PDF</span>
                            </motion.button>
                          </motion.div>
                        ))
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

        <motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  className="mt-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 dark:bg-gray-900/50 border border-primary/30 dark:border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm"
>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
    {/* أيقونة PDF */}
    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-primary via-secondary to-primary-700 dark:from-primary-900 dark:via-secondary/50 dark:to-primary-800 rounded-xl shadow-md">
      <FaFilePdf className="text-3xl text-white" />
    </div>

    {/* النصوص */}
    <div className="flex-1">
      <h3 className="text-xl font-bold text-primary dark:text-white mb-2">
        معلومات التحميل
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
        جميع المجلدات متاحة للتحميل بصيغة PDF. انقر على أيقونة PDF لفتح المجلد مباشرةً في نافذة جديدة.
      </p>
    </div>
  </div>
</motion.div>


          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} موسوعة الإمام السجاد - جميع الحقوق
            محفوظة
          </div>
        </div>
      </div>
    </div>
  );
}
