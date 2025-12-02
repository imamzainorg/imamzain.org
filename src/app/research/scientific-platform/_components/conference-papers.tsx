"use client";
import { FaFilePdf } from "react-icons/fa";
import { Journals } from "@/types/journals";
import { Button } from "@/components/button";
import { useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen as BookOpenIcon,
  Grid as GridIcon,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon, X, Calendar, User, Building } from "lucide-react";
import { LuBookOpenText } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Research } from "@/types/research";
import researchData from "@/data/research.json";

export default function UploadedResearchPage() {
  //  الحالة
  const [research, setResearch] = useState<conferensResearch[]>([]);
  const [filteredResearch, setFilteredResearch] = useState<Research[]>([]);

  const [selectedSummary, setSelectedSummary] = useState<Research | null>(null);
  const [activeTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Research[]>([]);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("default");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //  تحميل البيانات
  useEffect(() => {
    setResearch(researchData);
    setFilteredResearch(researchData);
  }, []);

  //  البحث
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResearch(research);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = research.filter((item) =>
      [item.title, item.author, item.conference, item.section, item.topic]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );

    setFilteredResearch(results);
  }, [searchTerm, research]);

  //  كشف اللغة العربية
  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentResearch = filteredResearch.slice(start, end);

  type conferensResearch = Research;
  const paginate = (page: number) => {
    setCurrentPage(page);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPdf = (item: conferensResearch) => {
    if (item.pdfUrl) window.open(item.pdfUrl, "_blank");
  };

  const handleRowClick = (id: string) => setHighlightId(id);
  const swiperRef = useRef<SwiperCore | null>(null);

  const totalPages = Math.ceil(filteredResearch.length / itemsPerPage);

  return (
    <div className="container">
      {/*  المسار */}

      {/*  العنوان الرئيسي */}
      <div className="text-center mb-12 mt-6">
        <h1 className="text-4xl font-bold text-primary dark:text-Muharram_primary mb-4">
          البحوث المرفوعة
        </h1>
      </div>

      <div className="bg-white/70 border-2 rounded-3xl">
        {/*  شريط البحث */}

        <div className="  overflow-hidden ">
          <div className="px-6 py-4 ">
            <div className="flex flex-col lg:flex-row  justify-between items-center gap-6">
              <div className="relative w-full lg:w-96">
                <SearchIcon
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-Muharram_primary"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X size={18} />
                  </button>
                )}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث في البحوث بالمؤلف، العنوان، أو المجال..."
                  className="w-full rounded-xl text-lg p-4 pl-10 bg-gray-50 dark:bg-Muharram_primary/10 border border-gray-200 dark:border-gray-600 focus:border-primary dark:focus:border-Muharram_primary/20 focus:ring-2 focus:ring-primary/50 dark:focus:ring-Muharram_primary/90 outline-none transition-all duration-200"
                />
              </div>
              <div className="text-right mb-4">
                <span className="text-gray-700 dark:text-Muharram_primary border-b-2 font-medium">
                  عدد البحوث : {filteredResearch.length}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                انقر على الصف لتحديده - انقر مرتين لفتح الملف
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        {/*  عرض البحوث */}
        {filteredResearch.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3  rounded-2xl mt-6">
            {currentResearch.map((item, index) => (
              <div
                key={index}
                className="group bg-white  rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-Muharram_primary/20"
              >
                <div className="p-6 flex flex-col h-full">
                  {/*  رأس البطاقة */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-primary/10 dark:bg-Muharram_primary/20 text-primary dark:text-Muharram_primary rounded-full text-xs font-medium">
                        {item.conference}
                      </span>
                    </div>

                    {/*  عنوان البحث */}
                    <h3
                      className={`text-lg font-bold text-gray-900  mb-3 line-clamp-2 leading-relaxed ${
                        isArabic(item.title) ? "text-right" : "text-left"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/*  تفاصيل البحث */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-Muharram_primary">
                        <User
                          size={16}
                          className="text-primary dark:text-Muharram_primary"
                        />
                        <span>الباحث: {item.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-Muharram_primary">
                        <Calendar
                          size={16}
                          className="text-primary dark:text-Muharram_primary"
                        />
                        <span>تاريخ النشر: {item.publishedYear}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-Muharram_primary">
                        <Building
                          size={16}
                          className="text-primary dark:text-Muharram_primary"
                        />
                        <span className="line-clamp-1">
                          {item.part} - {item.section} {item.topic}
                        </span>
                      </div>
                    </div>

                    {/*  وصف الباحث */}
                    {item.authorDescription && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {item.authorDescription}
                      </p>
                    )}
                  </div>

                  {/*  الأزرار */}
                  <div className="pt-4 border-t-[3.5px] border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => setSelectedSummary(item)}
                        className="flex-1 px-10 h-10 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/20 dark:hover:text-Muharram_primary font-medium"
                      >
                        <LuBookOpenText className="text-lg" />
                        قراءة الملخص
                      </button>

                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4  rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-primary dark:bg-Muharram_primary text-white hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 font-medium shadow-md hover:shadow-lg"
                      >
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className="text-[16px]"
                        />
                        عرض PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          //  لا توجد نتائج
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-6">
            <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <SearchIcon size={40} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              لا توجد بحوث مطابقة
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
              لم نتمكن من العثور على بحوث تطابق بحثك. حاول استخدام كلمات بحث
              مختلفة أو تصفح جميع البحوث المتاحة.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-8 py-3 rounded-xl bg-primary dark:bg-Muharram_primary text-white hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              عرض كل البحوث
            </button>
          </div>
        )}
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
                    <SwiperSlide key={pageNum} className="flex justify-center">
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
      {/*  نافذة الملخص */}
      <Dialog
        open={!!selectedSummary}
        onClose={() => setSelectedSummary(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* العنوان */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-primary/5 to-Muharram_primary/5 dark:from-primary/10 dark:to-Muharram_primary/10">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                  ملخص البحث
                </Dialog.Title>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  تفاصيل البحث العلمي
                </p>
              </div>
              <button
                onClick={() => setSelectedSummary(null)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* المحتوى */}
            {selectedSummary && (
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                {/* معلومات البحث */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      معلومات البحث
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="">
                        <span className="text-gray-500 dark:text-gray-400">
                          المؤتمر:
                        </span>
                        <span className="text-gray-900 mr-2 dark:text-white">
                          {selectedSummary.conference}
                        </span>
                      </div>
                      <div className="">
                        <span className="text-gray-500 dark:text-gray-400">
                          القسم:
                        </span>
                        <span className="text-gray-900 mr-2 dark:text-white">
                          {selectedSummary.section}
                        </span>
                      </div>
                      <div className="">
                        <span className="text-gray-500 dark:text-gray-400">
                          الجزء:
                        </span>
                        <span className="text-gray-900 mr-2 dark:text-white">
                          {selectedSummary.part}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      معلومات النشر
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="">
                        <span className="text-gray-500 dark:text-gray-400">
                          الباحث:
                        </span>
                        <span className="text-gray-900 mr-2 dark:text-white">
                          {selectedSummary.author}
                        </span>
                      </div>
                      <div className="">
                        <span className="text-gray-500 dark:text-gray-400">
                          سنة النشر :
                        </span>
                        <span className="text-gray-900 mr-2 dark:text-white">
                          {selectedSummary.publishedYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* العنوان */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-relaxed">
                  {selectedSummary.title}
                </h3>

                {/* الملخص */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                    الملخص
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div
                      className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-justify"
                      dangerouslySetInnerHTML={{
                        __html: selectedSummary.abstract,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* الفوتر */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  اضغط على زر PDF لتنزيل البحث الكامل
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSummary(null)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    إغلاق
                  </button>

                  {selectedSummary?.pdfUrl && (
                    <a
                      href={selectedSummary.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary dark:bg-Muharram_primary text-white rounded-xl hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 transition-colors font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <FontAwesomeIcon icon={faFilePdf} className="text-lg" />
                      فتح البحث الكامل (PDF)
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
