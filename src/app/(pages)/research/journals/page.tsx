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

// -----------------------------
// بيانات المجلدات (مصدر ثابت يمكن نقله لملف خارجي)
// -----------------------------
const encyclopediaVolumes = [
  {
    id: "1",
    title: "لمع من كلام الإمام علي بن الحسين ع",
    author: "",
    language: "عربي",
    publisher: "مجلة العدل الإسلامي - العدد 5 - السنة 1",
    publishedYear: "1947",
    pagesCount: "1",
    page: "4",
    category: "خطب ومواعظ",
    popularity: 45,
  },
  {
    id: "2",
    title: "نبذة من مواعظ الإمام الرابع الإمام علي بن الحسين ع",
    author: "الداعي بهاء الدين اللازي",
    language: "عربي",
    publisher: "مجلة أجوبة المسائل الدينية - العدد 3 - السنة 2",
    publishedYear: "1377",
    pagesCount: "1",
    page: "5",
    category: "مواعظ",
    popularity: 32,
  },
  {
    id: "3",
    title: "النبِي ص يستقبل شهر رمضان ويدعو للمسلمين",
    author: "",
    language: "عربي",
    publisher: "مجلة النجف الأشرف",
    publishedYear: "1363",
    pagesCount: "6",
    page: "",
    category: "أدعية",
    popularity: 78,
  },
  {
    id: "4",
    title: "الى متى تبقى قبور أئمة المسلمين مهدومة في البقيع",
    author: "محبتي الحسيني",
    language: "عربي",
    publisher: "نشرة صوت المبشرين - العدد السادس - كربلاء",
    publishedYear: "1382",
    pagesCount: "4",
    page: "13",
    category: "تاريخ",
    popularity: 56,
  },
  {
    id: "5",
    title: "ذكرى وفاة الإمام زين العابدين ع",
    author: "لفيف من الروّاد والحاضرين في كربلاء المقدسة",
    language: "عربي",
    publisher:
      "مجلة ذكريات المعصومين - خاصة بمواليد الأئمة و رواتهم - العدد 6 - السنة الأولى",
    publishedYear: "1389",
    pagesCount: "35",
    page: "23",
    category: "سيرة",
    popularity: 89,
  },
  {
    id: "6",
    title: "الصحيفة السجادية",
    author: "حسين علي محفوظ",
    language: "عربي",
    publisher: "مجلة الإبلاغ - العدد 2 / 7 / 8 - 100",
    publishedYear: "1396",
    pagesCount: "58",
    page: "73",
    category: "أدعية",
    popularity: 95,
  },
  {
    id: "7",
    title: "أثر القرآن في الصحيفة السجادية",
    author: "كاظم الأزريدي",
    language: "عربي",
    publisher: "رسالة الإسلام - العدد 2 / السنة 5",
    publishedYear: "",
    pagesCount: "17",
    page: "121",
    category: "دراسات قرآنية",
    popularity: 67,
  },
  {
    id: "8",
    title: "طرق الهداية خلال الصحيفة السجادية",
    author: "جودت القزويني",
    language: "عربي",
    publisher: "مجلة رسالة الإسلام - العدد 26 / السنة 6",
    publishedYear: "1397",
    pagesCount: "17",
    page: "148",
    category: "أخلاق",
    popularity: 43,
  },
  {
    id: "9",
    title: "صفحة من المصحف المنسوب للإمام زين العابدين ع",
    author: "",
    language: "عربي",
    publisher: "مجلة الموسم - أكاديمية الكوفة",
    publishedYear: "",
    pagesCount: "1",
    page: "164",
    category: "مخطوطات",
    popularity: 71,
  },
  {
    id: "10",
    title: "جهاد الإمام السجاد ع - حياة الإمام زين العابدين ع",
    author: "رعد المظفر",
    language: "عربي",
    publisher: "مجلة الفكر الإسلامي - السنة 4 - العدد 5 - مجلد 20",
    publishedYear: "1415",
    pagesCount: "23",
    page: "",
    category: "سيرة",
    popularity: 82,
  },
  {
    id: "11",
    title: "مشاركة شعرية بمناسبة مولد الإمام السجاد ع",
    author: "مهند رياض البصري",
    language: "عربي",
    publisher: "جريدة الكوثر - السنة 3",
    publishedYear: "1998",
    pagesCount: "17",
    page: "191",
    category: "شعر",
    popularity: 38,
  },
  {
    id: "12",
    title: "الإمام زين العابدين ع",
    author: "نجاح مرزا أبو سميع",
    language: "عربي",
    publisher: "مجلة ندوة أهل البيت الأطهار ع - العدد 16 - السنة 1",
    publishedYear: "1425",
    pagesCount: "17",
    page: "145",
    category: "سيرة",
    popularity: 59,
  },
  {
    id: "13",
    title: "النقية الزكية للإمام علي بن الحسين ع",
    author: "فارس حسون كريم",
    language: "عربي",
    publisher: "مجلة تراثنا - العدد 58 - سنة 14 - 1420",
    publishedYear: "1420",
    pagesCount: "17",
    page: "196",
    category: "سيرة",
    popularity: 64,
  },
];

// -----------------------------
// مكونات مساعدة
// -----------------------------

// small debounce hook
function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

// -----------------------------
// الصفحة الرئيسية (مكون)
// -----------------------------
export default function ImamSajjadEncyclopediaPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 260);
  const [selectedCategory] = useState("جميع الفئات");
  const [sortBy, setSortBy] = useState("default");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [isDark] = useState(false);

  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const filteredVolumes = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let results = encyclopediaVolumes;

    if (q) {
      results = results.filter((a) => {
        return (
          (a.title || "").toLowerCase().includes(q) ||
          (a.author || "").toLowerCase().includes(q) ||
          (a.publisher || "").toLowerCase().includes(q) ||
          (a.publishedYear || "").toLowerCase().includes(q) ||
          (a.page || "").toLowerCase().includes(q) ||
          (a.category || "").toLowerCase().includes(q)
        );
      });
    }

    if (selectedCategory !== "جميع الفئات") {
      results = results.filter((a) => a.category === selectedCategory);
    }

    if (sortBy === "popularity") {
      results = [...results].sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "year") {
      results = [...results].sort((a, b) => {
        const yearA = parseInt(a.publishedYear) || 0;
        const yearB = parseInt(b.publishedYear) || 0;
        return yearB - yearA;
      });
    } else if (sortBy === "title") {
      results = [...results].sort((a, b) =>
        a.title.localeCompare(b.title, "ar")
      );
    }

    return results;
  }, [debouncedQuery, selectedCategory, sortBy]);

  const pdfUrlFor = (item: (typeof encyclopediaVolumes)[number]) =>
    `/pdfs/journals/volume-${item.id}.pdf`;

  const openPdf = async (item: (typeof encyclopediaVolumes)[number]) => {
    setIsLoading(true);
    try {
      const url = pdfUrlFor(item);
      // small UX delay
      await new Promise((r) => setTimeout(r, 500));
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowClick = (itemId: string) => {
    setHighlightId(itemId);
    const el = rowRefs.current[itemId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className={`min-h-screen py-10 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br  text-gray-900"}`}
    >
      <div className="container mx-auto px-4">
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
                  <h1 className="text-3xl  md:text-4xl font-extrabold leading-tight">
                    موسوعة الإمام السجاد
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
                    الفهرس الشامل للمقالات والدراسات في الدوريات العربية{" "}
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
          className="  rounded-2xl  p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row  lg:items-end justify-between gap-4 w-full">
            {/* جهة اليمين: البحث */}
            <div className="flex-1 lg:max-w-32 ">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ابحث في الموسوعة
              </label>
              <div className="relative w-full">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث بعنوان المقال، المؤلف، الناشر، السنة، الصفحة..."
                  className="
          w-[400px]
          pr-10 py-3 
          rounded-xl 
          border-2 border-primary/40 
          bg-white/60 dark:bg-gray-900/40
          placeholder:text-gray-400 text-gray-800 dark:text-gray-100
          text-center
          focus:outline-none 
          focus:ring-2 focus:ring-primary/50 
          focus:border-primary 
          transition-all duration-300 
          hover:border-primary/70 hover:shadow-md
          backdrop-blur-sm
        "
                />
                <SearchIcon
                  size={18}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* جهة اليسار: ترتيب وزر تبديل العرض */}
            <div className="flex flex-col sm:flex-row sm:items-end  gap-4  justify-start">
              {/* زر تبديل طريقة العرض */}
              <button
                onClick={() =>
                  setViewMode(viewMode === "table" ? "cards" : "table")
                }
                className="
        px-4 py-2 rounded-xl 
        border-2 border-gray-300 dark:border-gray-700 
        bg-white/60 dark:bg-gray-900/40
        flex items-center gap-2
        text-gray-800 dark:text-gray-100
        hover:bg-primary/90 hover:text-white
        shadow-sm hover:shadow-md
        transition-all duration-300
      "
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
              {/* ترتيب */}
              <div className="flex-1 max-w-32  ">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ترتيب
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="
          w-full px-4 py-1 rounded-xl 
          border-2 border-gray-300 dark:border-gray-700 
          bg-white/60 dark:bg-gray-900/40 
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          text-gray-800 dark:text-gray-100
          transition-all duration-300
          hover:border-primary/70
        "
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
        <div className=" rounded-2xl shadow-lg border overflow-hidden bg-opacity-50 bg-gray-50">
          <div className="px-6 py-4 bg-gradient-to-r  border-b ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <BookOpenIcon size={18} />
                <span className="font-medium">
                  النتائج: {filteredVolumes.length} مجلد
                </span>
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
                    <tr className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200/60 dark:border-gray-700/40">
                      <th className="px-4 py-3 text-center w-12">ت</th>
                      <th className="px-4 py-3 text-right min-w-[300px]">
                        اسم المقال
                      </th>
                      <th className="px-4 py-3 text-right min-w-[150px]">
                        المؤلف
                      </th>
                      <th className="px-4 py-3 text-center w-24">اللغة</th>
                      <th className="px-4 py-3 text-right min-w-[200px]">
                        الناشر
                      </th>
                      <th className="px-4 py-3 text-center w-32">
                        تاريخ الإصدار
                      </th>
                      <th className="px-4 py-3 text-center w-24">
                        عدد الصفحات
                      </th>
                      {/*  <th className="px-4 py-3 text-center w-20">الصفحة</th>*/}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
                    <AnimatePresence>
                      {filteredVolumes.map((item, idx) => {
                        const isHighlighted = highlightId === item.id;
                        const isPopular = item.popularity > 70;
                        return (
                          <motion.tr
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className={`group transition-all duration-200 ${isHighlighted ? "bg-primary/5 ring-2 ring-primary/20" : "hover:bg-gray-50/80 dark:hover:bg-gray-700/40"} ${isPopular ? "border-r-2 border-blue-500" : ""}`}
                            onClick={() => handleRowClick(item.id)}
                            ref={(el) => {
                              rowRefs.current[item.id] = el;
                            }}
                            onDoubleClick={() => openPdf(item)}
                          >
                            <td className="px-4 py-4 text-center align-top">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 dark:bg-gray-700`}
                              >
                                {idx + 1}
                              </div>
                            </td>

                            <td className="px-4 py-4 align-top">
                              <div className="flex flex-col gap-1 text-right">
                                <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-200 leading-relaxed">
                                  {item.title}
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 align-top text-right">
                              <div className="text-gray-700 dark:text-gray-300">
                                {item.author || (
                                  <span className="text-gray-400 italic">
                                    غير محدد
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-center align-top">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                                {item.language}
                              </span>
                            </td>

                            <td className="px-4 py-4 align-top text-right">
                              <div className="text-gray-700 dark:text-gray-300 text-sm">
                                {item.publisher}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-center align-top">
                              <div className="text-gray-600 dark:text-gray-400 text-sm">
                                {item.publishedYear || (
                                  <span className="text-gray-400 italic">
                                    غير محدد
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-4 text-center align-top">
                              <div className="text-gray-700 font-medium">
                                {item.pagesCount || "—"}
                              </div>
                            </td>

                            <td className="px-4 py-4 align-top">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openPdf(item);
                                  }}
                                  disabled={isLoading}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r  disabled:opacity-50 text-secondary font-medium  hover:shadow-lg  transform"
                                >
                                  <FaFilePdf /> <span>PDF</span>
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>

                {filteredVolumes.length === 0 && (
                  <div className="text-center py-16 px-4">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <SearchIcon size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      لم نعثر على أي مجلدات تطابق معايير البحث المحددة. حاول
                      تعديل كلمات البحث أو فلاتر التصفية.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredVolumes.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-secondary/30 dark:border-secondary/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* خلفية زخرفية خفيفة */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none" />

                      {/* محتوى البطاقة */}
                      <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                          <h3 className="font-bold text-xl text-right text-primary dark:text-secondary leading-snug mb-3 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-700 dark:text-gray-400 mb-1">
                            <span className="font-semibold text-secondary">
                              الناشر:
                            </span>{" "}
                            {item.publisher}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-400">
                            <span className="font-semibold text-secondary">
                              المؤلف:
                            </span>{" "}
                            {item.author}
                          </p>
                        </div>

                        {/* الزر */}
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
                          disabled={isLoading}
                          className="mt-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl 
                       bg-gradient-to-r from-primary via-secondary/90 to-primary
                       bg-[length:200%_100%] text-white font-medium 
                       shadow-md hover:shadow-lg 
                       transition-all duration-300 disabled:opacity-50"
                        >
                          <FaFilePdf className="text-lg" />
                          <span>عرض PDF</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* معلومات التحميل */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-blue-50 dark:bg-gray-900/60 border border-blue-200/40 dark:border-gray-700/40 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <FaFilePdf className="text-2xl text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
                معلومات التحميل
              </h3>
              <p className="text-blue-800 dark:text-gray-300 mb-3">
                جميع المجلدات متاحة للتحميل بصيغة PDF. انقر على أيقونة PDF لفتح
                المجلد مباشرةً في نافذة جديدة.
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
  );
}
