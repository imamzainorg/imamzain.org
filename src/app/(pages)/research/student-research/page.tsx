"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GraduationCap,
  Search as SearchIcon,
  X,
  LayoutGrid,
  Table2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import studentData from "@/data/student.json";
import Breadcrumbs from "@/components/breadcrumb";
import { Button } from "@/components/button";

export default function StudentResearchPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<StudentResearch[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy] = useState<"year" | "title" | "popularity">("year");

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;

  const tabs = [
    { id: "all", label: "الكل" },
    { id: "bachelor", label: "بكالوريوس" },
    { id: "master", label: "ماجستير" },
    { id: "phd", label: "دكتوراه" },
  ];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && tabs.some((t) => t.id === hash)) setActiveTab(hash);
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setSearchTerm("");
    setCurrentPage(1);
    window.history.replaceState(null, "", `#${id}`);
  };

  // جلب البيانات حسب التبويب
  const getDataByTab = useCallback(() => {
    const mapCategory: Record<string, string> = {
      bachelor: "بكالوريوس",
      master: "رسالة ماجستير",
      phd: "دكتوراه",
    };

    if (activeTab === "all") {
      return studentData as StudentResearch[];
    }

    const currentCategory = mapCategory[activeTab];
    return (studentData as StudentResearch[]).filter((item) =>
      item.translations.some((t) => t.category === currentCategory)
    );
  }, [activeTab]);

  // البحث
  useEffect(() => {
    const allData = studentData as StudentResearch[];
    const dataToSearch = activeTab === "all" ? allData : getDataByTab();

    if (!searchTerm.trim()) {
      setFilteredData(dataToSearch);
      setCurrentPage(1);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = dataToSearch.filter((item) =>
      item.translations.some((t) => {
        const title = t.title.toLowerCase();
        const authors = t.authors.join(", ").toLowerCase();
        const venue = t.publicationVenue.toLowerCase();
        return (
          title.includes(term) || authors.includes(term) || venue.includes(term)
        );
      })
    );

    setFilteredData(results);
    setCurrentPage(1);
  }, [searchTerm, activeTab, getDataByTab]);

  // ترتيب البيانات
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
        return data; // منطق الشعبية لاحقًا
      default:
        return data;
    }
  }, [filteredData, sortBy]);

  // تقسيم الصفحات
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const paginate = (page: number) => {
    setCurrentPage(page);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPdf = (item: StudentResearch) => {
    if (item.pdfUrl) window.open(item.pdfUrl, "_blank");
  };

  const handleRowClick = (id: string) => setHighlightId(id);

  return (
    <div className="container">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
           { name: "بحوث التخرج ", url: "/research/student-research" },
        ]}
      />

      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <GraduationCap size={48} className="text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          بحوث الطلاب
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          بحوث طلاب البكالوريوس والماجستير والدكتوراه ضمن مشاريع علمية متنوعة.
        </p>
      </motion.div>

      {/* التبويبات */}
      <div className="flex justify-center items-center gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={() =>
            setViewMode((prev) => (prev === "cards" ? "table" : "cards"))
          }
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          title="تغيير طريقة العرض"
        >
          {viewMode === "cards" ? (
            <Table2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <LayoutGrid className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* البحث */}
      <div className="max-w-sm mx-auto mb-6 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            activeTab === "all"
              ? "ابحث في جميع البحوث..."
              : `ابحث في ${tabs.find((t) => t.id === activeTab)?.label}...`
          }
          className="w-full p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {searchTerm ? (
            <X
              className="w-5 h-5 cursor-pointer text-gray-500"
              onClick={() => setSearchTerm("")}
            />
          ) : (
            <SearchIcon className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      {/* عرض النتائج */}
      <div className="rounded-2xl shadow-lg border overflow-hidden bg-opacity-50 bg-gray-50 dark:bg-gray-800">
        <div className="px-6 py-4 bg-gradient-to-r border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FileText size={18} />
              <span className="font-medium">
                النتائج: {filteredData.length} بحث
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              انقر على الصف لتحديده - انقر مرتين لفتح الملف
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
                    <th className="px-4 py-3 text-right">المستوى العلمي</th>
                    <th className="px-4 py-3 text-right">تاريخ الاصدار</th>
                    <th className="px-4 py-3 text-right">عدد الصفحات</th>
                    <th className="px-4 py-3 text-center"></th>
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
                              rowRefs.current[item.id] = el;
                            }}
                          >
                            <td className="px-4 py-4 text-center align-top">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 dark:bg-gray-700`}
                              >
                                {idx + 1 + (currentPage - 1) * itemsPerPage}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">{t.title}</td>
                            <td className="px-4 py-3 text-right">
                              {t.authors.join(", ")}
                            </td>
                            <td className="px-4 py-3 text-right">{t.publicationVenue}</td>
                            <td className="px-4 py-3 text-right">{t.language}</td>
                            <td className="px-4 py-3 text-right">{t.category}</td>
                            <td className="px-4 py-3 text-right">{item.publishedYear}</td>
                            <td className="px-4 py-3 text-right">{t.pagenam}</td>
                            <td className="px-4 py-3 flex justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPdf(item);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r text-secondary font-medium hover:shadow-lg transform"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {paginatedData.map((item) =>
                  item.translations.map((t) => (
                    <motion.div
                      key={`${item.id}-${t.languageid}`}
                      layout
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ y: -6 }}
                      className="relative bg-white/90 dark:bg-gray-900/90 border border-secondary/30 dark:border-secondary/20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70 pointer-events-none" />
                      <div className="relative p-6 flex flex-col justify-between h-full">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 leading-snug line-clamp-2">
                          {t.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>
                            <span className="font-semibold text-secondary">المؤلف:</span>{" "}
                            {t.authors.join(", ")}
                          </p>
                          <p>
                            <span className="font-semibold text-secondary">الناشر:</span>{" "}
                            {t.publicationVenue}
                          </p>
                          {t.category && (
                            <p>
                              <span className="font-semibold text-secondary">الدرجة العلمية:</span>{" "}
                              {t.category}
                            </p>
                          )}
                        </div>
                        <div className="my-5 border-t border-secondary/20" />
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          whileHover={{ backgroundPosition: "100% 0", transition: { duration: 0.4 } }}
                          onClick={(e) => {
                            e.stopPropagation();
                            openPdf(item);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:border-secondary border-3 bg-[length:200%_100%] text-white font-medium shadow hover:shadow-lg transition-all duration-300"
                        >
                          <FaFilePdf className="text-lg" />
                          <span>عرض PDF</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-11/12 mx-auto flex justify-center my-8">
            <nav className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                aria-label="الصفحة السابقة"
                className="bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
              >
                <ChevronRight size={20} />
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage > totalPages - 3) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => paginate(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                      currentPage === pageNum
                        ? "bg-primary dark:bg-Muharram_primary text-white"
                        : "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                    }`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
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
  );
}
