"use client";

import Breadcrumbs from "@/components/breadcrumb";
import { Research } from "@/types/research";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState, useEffect, useCallback } from "react";
import researchData from "@/data/research.json";
import { LuBookOpenText } from "react-icons/lu";
export default function Page() {
  const [research] = useState<Research[]>(researchData);
  const [filteredResearch, setFilteredResearch] =
    useState<Research[]>(researchData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSummary, setSelectedSummary] = useState<Research | null>(null);

  const isArabic = (text: string) => {
    return /[\u0600-\u06FF]/.test(text);
  };

  // استخدام useCallback لتحسين الأداء ومنع إعادة التصيير غير الضرورية
  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setFilteredResearch(research);
        return;
      }

      const lowerCaseTerm = term.toLowerCase();

      const results = research.filter((item) => {
        // التحقق من وجود الحقول قبل استخدام toLowerCase()
        const title = item.title?.toLowerCase() || "";
        const author = item.author?.toLowerCase() || "";
        const description = item.Description?.toLowerCase() || "";
        const abstract = item.abstract?.toLowerCase() || "";
        const authorDescription = item.authorDescription?.toLowerCase() || "";
        const sectionInfo =
          `${item.part}-${item.section} ${item.topic}`.toLowerCase();

        return (
          title.includes(lowerCaseTerm) ||
          author.includes(lowerCaseTerm) ||
          description.includes(lowerCaseTerm) ||
          abstract.includes(lowerCaseTerm) ||
          sectionInfo.includes(lowerCaseTerm) ||
          authorDescription.includes(lowerCaseTerm)
        );
      });

      setFilteredResearch(results);
    },
    [research]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [handleSearch, searchTerm]);

  return (
    <div className="container px-4 md:px-0">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
          { name: "ارشيف البحوث", url: "/research/research-achive" },
        ]}
      />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full mr-4 rounded-2xl text-sm md:text-base lg:text-lg p-2 bg-transparent border border-primary focus:border-primary dark:border-Muharram_primary dark:focus:border-Muharram_primary outline-none"
            placeholder="البحث عن البحوث"
          />
          <div className="absolute  text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
            <div className="h-2/3 w-[1px] bg-slate-400 " />
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <hr className="border-1 mb-5" />

      {filteredResearch.length === 0 && (
        <div className="text-center py-10">
          <div className="bg-gray-100 dark:bg-Muharram_primary/20 p-6 rounded-xl inline-block">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-200 rounded-full flex items-center justify-center">
              <SearchIcon size={24} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              لا توجد نتائج بحث
            </h3>
            <p className="text-gray-600 dark:text-white font-semibold">
              لم نتمكن من العثور على بحوث تطابق بحثك:{" "}
              <span className="font-medium">&quot;{searchTerm}&quot;</span>
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                handleSearch("");
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 dark:bg-Muharram_primary dark:hover:bg-Muharram_primary/80"
            >
              عرض جميع البحوث
            </button>
          </div>
        </div>
      )}

      {/* قائمة البحوث */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredResearch.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl w-full h-full min-h-[370px] xs:min-h-[300px] lg:min-h-[270px] p-5 flex flex-col shadow-md hover:shadow-lg transition-shadow"
          >
            <h1
              className={`text-xl font-bold ${
                isArabic(item.title) ? "text-right" : "text-left"
              }`}
            >
              {item.title}
            </h1>
            <p className="text-sm text-gray-700 mt-2 mb-2">{item.conference}</p>

            <p className="text-sm line-clamp-3 text-gray-600 mb-2">
              {item.part}-{item.section} {item.topic}
            </p>
            <div className="text-sm text-neutral-500  flex flex-col lg:flex-row justify-between items-start lg:items-center mt-2 mb-2">
              <p>اسم الباحث: {item.author}</p>
              <p>تاريخ النشر: {item.publishedYear}</p>
            </div>

            {item.Description && (
              <p className="text-sm text-gray-700 mb-2">{item.Description}</p>
            )}

            {/* عرض وصف الباحث فقط إذا كان موجودًا */}
            {item.authorDescription && (
              <p className="text-sm text-gray-700"> {item.authorDescription}</p>
            )}

            <div className="flex-grow" />

            <hr className="border border-neutral-400 w-full my-4" />

            <div className="mt-auto w-full flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(item)}
                className="flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
             bg-primary/10 text-primary hover:bg-primary/20
             dark:bg-Muharram_primary/15 dark:text-Muharram_primary dark:hover:bg-Muharram_primary/25"
              >
                <LuBookOpenText /> قراءة الملخص
              </button>

              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
             bg-primary text-white hover:bg-primary/90
             dark:bg-Muharram_primary dark:hover:bg-Muharram_primary/60"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-[16px]" />
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة الملخص */}
      <Dialog
        open={!!selectedSummary}
        onClose={() => setSelectedSummary(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* رأس المربع */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                ملخص البحث
              </Dialog.Title>
              <button
                onClick={() => setSelectedSummary(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="إغلاق"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* محتوى الملخص */}
            {selectedSummary && (
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSummary.title}
                </h3>
                <p className="text-sm text-gray-700">
                  الباحث: {selectedSummary.author}
                </p>
                {selectedSummary.abstract && (
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedSummary.abstract}
                  </p>
                )}
              </div>
            )}

            {/* أزرار أسفل المربع */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                إغلاق
              </button>
              {selectedSummary?.pdfUrl && (
                <a
                  href={selectedSummary.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-red-600"
                  title="تنزيل PDF"
                >
                  <FontAwesomeIcon icon={faFilePdf} className="text-lg" />
                </a>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
