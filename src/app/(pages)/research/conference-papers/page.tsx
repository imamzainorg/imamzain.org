"use client";

import Breadcrumbs from "@/components/breadcrumb";
import { Research } from "@/types/research";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchIcon, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import researchData from "@/data/research.json";
import { LuBookOpenText } from "react-icons/lu";


export default function UploadedResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResearch, setFilteredResearch] = useState<Research[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<Research | null>(null);

  useEffect(() => {
    setResearch(researchData);
    setFilteredResearch(researchData);
  }, []);

  // البحث
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

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="py-14 px-4">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "البحوث", url: "/research" },
        ]}
      />

      {/* العنوان وشريط البحث */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-5">
        <h1 className="text-primary dark:text-Muharram_primary text-3xl font-bold">
          البحوث المرفوعة
        </h1>
        <div className="col-span-1 w-full md:col-span-3 md:w-72 relative lg:mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl md:text-sm lg:text-lg p-2 bg-transparent border border-primary focus:border-primary dark:border-Muharram_primary dark:focus:border-Muharram_primary outline-none"
            placeholder="البحث عن البحوث"
          />
          <div className="absolute text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
            <div className="h-2/3 w-[1px] bg-slate-400" />
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* البحوث */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResearch.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl w-full h-full min-h-[270px] p-5 flex flex-col shadow-md"
          >
            <h1 className={`text-xl font-bold ${isArabic(item.title) ? "text-right" : "text-left"}`}>
              {item.title}
            </h1>
            <p className="text-sm text-gray-700 mt-2 mb-2">{item.conference}</p>
            <p className="text-sm line-clamp-3 text-gray-600 mb-2">
              {item.part} - {item.section} {item.topic}
            </p>
            <div className="text-sm text-neutral-500 flex flex-col lg:flex-row justify-between items-start lg:items-center mt-2 mb-2">
              <p>اسم الباحث: {item.author}</p>
              <p>تاريخ النشر: {item.publishedYear}</p>
            </div>
            <p className="text-sm text-gray-700">{item.authorDescription}</p>
            <div className="flex-grow" />
            <hr className="border border-neutral-400 w-full my-4" />
            <div className="mt-auto w-full flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(item)}
                className="flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
                 bg-primary/10 text-primary hover:bg-primary/20
                 dark:bg-Muharram_primary/15 dark:text-Muharram_primary dark:hover:bg-Muharram_primary/25"
              >
                <LuBookOpenText />
                قراءة الملخص
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
      <Dialog open={!!selectedSummary} onClose={() => setSelectedSummary(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-gray-900">ملخص البحث</Dialog.Title>
              <button onClick={() => setSelectedSummary(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            {selectedSummary && (
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedSummary.title}</h3>
                <p className="text-sm text-gray-700">الباحث: {selectedSummary.author}</p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{selectedSummary.abstract}</p>
              </div>
            )}
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

{/*
export default function Page() {
  // فلترة البحوث حسب الفئة
  const conferenceResearch = researchData.filter(
    (item) => item.category === "conference-papers"
  );

  const [research] = useState<Research[]>(conferenceResearch);
  const [filteredResearch, setFilteredResearch] = useState<Research[]>(conferenceResearch);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSummary, setSelectedSummary] = useState<{
    researchItem: Research;
    translationIndex: number;
  } | null>(null);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (!term.trim()) {
        setFilteredResearch(research);
        return;
      }
      const lowerCaseTerm = term.toLowerCase();
      const results = research.filter((item) =>
        item.translations.some((t) => {
          const title = t.title?.toLowerCase() || "";
          const author = t.authors?.join(", ").toLowerCase() || "";
          const abstract = t.abstract?.toLowerCase() || "";
          const publicationVenue = t.publicationVenue?.toLowerCase() || "";
          return (
            title.includes(lowerCaseTerm) ||
            author.includes(lowerCaseTerm) ||
            abstract.includes(lowerCaseTerm) ||
            publicationVenue.includes(lowerCaseTerm)
          );
        })
      );
      setFilteredResearch(results);
    },
    [research]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [handleSearch, searchTerm]);

  return (
    <div className="container ">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
          { name: "ارشيف البحوث", url: "/research/Conference-Papers" },
        ]}
      />
*/}
      {/* شريط البحث */}{/*
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 items-center">
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-2xl text-sm md:text-base lg:text-lg p-2 bg-transparent border border-primary focus:border-primary dark:border-Muharram_primary dark:focus:border-Muharram_primary outline-none"
            placeholder="البحث عن البحوث"
          />
          <div className="absolute text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
            <div className="h-2/3 w-[1px] bg-slate-400 " />
            {searchTerm ? (
              <X
                size={20}
                className="cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  handleSearch("");
                }}
              />
            ) : (
              <SearchIcon size={20} strokeWidth={1.5} />
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-white">
          النتائج: {filteredResearch.length}
        </div>
      </div>

      <hr className="border-1 mb-5" />
*/}
      {/* لا توجد نتائج */}{/*
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
          </div>
        </div>
      )}
*/}
      {/* قائمة البحوث */} {/*
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        <AnimatePresence>
          {filteredResearch.map((researchItem) =>
            researchItem.translations.map((t, index) => (
              <motion.div
                key={`${researchItem.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl w-full min-h-[200px]  flex flex-col shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              >*/} 
            {/* العنوان داخل الـ Gradient الأخضر */}{/*
<div className="w-full bg-gradient-to-r from-primary to-primary/40 dark:from-Muharram_primary/50 dark:to-Muharram_primary/20 rounded-t-2xl flex items-center justify-center p-2 h-24">
  <h1
    className="text-lg m-2 font-bold text-white text-center break-words"
  >
    {t.title}
  </h1>
</div>
*/}
                {/* جهة النشر */}{/* 
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 p-2 mb-3">
                  جهة النشر: {t.publicationVenue || "غير محدد"}
                </p>
*/}
                {/* الباحث وتاريخ النشر مع أيقونات */} {/*
                <div className="flex flex-col p-2 sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 text-neutral-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-primary dark:text-Muharram_primary">
                      👤
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {t.authors?.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary dark:text-Muharram_primary">
                      📅
                    </span>
                    <span className="text-sm sm:text-base font-medium">
                      {researchItem.publishedYear}
                    </span>
                  </div>
                </div>

                {/* كلمات مفتاحية */} {/*
                {t.keywords && t.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                    {t.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-[0.7rem] px-2 py-1 bg-primary/20 dark:bg-Muharram_primary/30 rounded-full text-primary dark:text-Muharram_primary"
                      >
                       الكلمات المفتاحية :  {kw}
                      </span>
                    ))}
                  </div>
                )}

                {/* أزرار التفاعل */} {/*
                <div className="mt-auto w-full flex flex-col  p-2 sm:flex-row justify-end gap-2 z-10 relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setSelectedSummary({
                        researchItem,
                        translationIndex: index,
                      })
                    }
                    className="flex-1 min-w-[120px] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
        bg-primary/10 text-primary hover:bg-primary/20
        dark:bg-Muharram_primary/15 dark:text-Muharram_primary dark:hover:bg-Muharram_primary/25"
                  >
                    <LuBookOpenText /> قراءة الملخص
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={researchItem.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[100px] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2
        bg-primary text-white hover:bg-primary/90
        dark:bg-Muharram_primary dark:hover:bg-Muharram_primary/60"
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="text-[16px]" />
                    PDF
                  </motion.a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* نافذة الملخص */} {/*
      <Dialog
        open={!!selectedSummary}
        onClose={() => setSelectedSummary(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                ملخص البحث
              </Dialog.Title>
              <button
                onClick={() => setSelectedSummary(null)}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="إغلاق"
              >
                <X className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
            </div>

            {selectedSummary && (
              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {
                    selectedSummary.researchItem.translations[
                      selectedSummary.translationIndex
                    ].title
                  }
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300">
                  الباحث:{" "}
                  {selectedSummary.researchItem.translations[
                    selectedSummary.translationIndex
                  ].authors?.join(", ")}
                </p>

                {/* كلمات مفتاحية */} {/*
                {selectedSummary.researchItem.translations[
                  selectedSummary.translationIndex
                ].keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedSummary.researchItem.translations[
                      selectedSummary.translationIndex
                    ].keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/20 dark:bg-Muharram_primary/30 rounded-full text-primary dark:text-Muharram_primary"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                {selectedSummary.researchItem.translations[
                  selectedSummary.translationIndex
                ].abstract && (
                  <div
                    className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedSummary.researchItem.translations[
                          selectedSummary.translationIndex
                        ].abstract,
                    }}
                  />
                )}
              </div>
            )}

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                إغلاق
              </button>
              {selectedSummary?.researchItem.pdfUrl && (
                <a
                  href={selectedSummary.researchItem.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600"
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
                */}