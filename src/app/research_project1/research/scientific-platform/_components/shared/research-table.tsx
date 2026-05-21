"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

export interface TableRow {
  id: string;
  title: string;
  authors: string[];
  publicationVenue: string;
  language?: string;
  category?: string;
  publishedYear?: string;
  pagenam?: string;
  pdfUrl?: string;
}

interface ResearchTableProps {
  rows: TableRow[];
  startIndex: number;
  highlightId?: string | null;
  onRowClick?: (id: string) => void;
  onRowDoubleClick?: (pdfUrl?: string) => void;
  showCategory?: boolean;
}

export function ResearchTable({
  rows,
  startIndex,
  highlightId,
  onRowClick,
  onRowDoubleClick,
  showCategory = false,
}: ResearchTableProps) {

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 dark:bg-gray-900">
      {/* حاوية تمرير أفقي للموبايل */}
      <div className="overflow-x-auto touch-pan-x">
        <table className="min-w-[1100px] w-full table-fixed text-sm">
          <thead>
            <tr
              className="
              bg-gray-50/80 dark:bg-gray-800/60
              text-black
              text-xs md:text-sm lg:text-ellipsis font-semibold uppercase tracking-wide
              border-b border-gray-100 dark:border-gray-800
            "
            >
              <th className="px-4 py-3 text-center w-14">ت</th>
              <th className="px-4 py-3 text-right w-[28%]">اسم البحث</th>
              <th className="px-4 py-3 text-right w-[15%]">المؤلف</th>
              <th className="px-4 py-3 text-right w-[15%]">الناشر</th>
              <th className="px-4 py-3 text-right w-[8%]">اللغة</th>
              {showCategory && (
                <th className="px-4 py-3 text-right w-[10%]">المستوى العلمي</th>
              )}
              <th className="px-4 py-3 text-right w-[8%]">تاريخ الإصدار</th>
              <th className="px-4 py-3 text-right w-[8%]">عدد الصفحات</th>
              <th className="px-4 py-3 text-center w-[8%]">التحميل</th>
            </tr>
          </thead>

          <tbody className=" text-xs md:text-sm lg:text-base bg-white/30 backdrop-blur-xs">
            <AnimatePresence>
              {rows.map((row, idx) => {
                const isHighlighted = highlightId === row.id;

                // دالة لإظهار قيمة افتراضية عند عدم وجود البيانات
                const displayValue = (value?: string) => value ?? "—";

                return (
                  <motion.tr
                    key={`${row.id}-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, delay: idx * 0.02 }}
                    onClick={() => onRowClick?.(row.id)}
                    onDoubleClick={() => onRowDoubleClick?.(row.pdfUrl)}
                    className={`cursor-pointer transition-colors  duration-150 ${
                      isHighlighted
                        ? "bg-primary/20 dark:bg-primary/12 "
                        : "hover:bg-primary/10 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    {/* الترقيم */}
                    <td className="px-4 py-4 text-center align-top">
                      <span
                        className="
                        inline-flex items-center justify-center
                        w-7 h-7 rounded-full
                       
                        font-medium
                        text-black dark:text-gray-400
                      "
                      >
                        {startIndex + idx + 1}
                      </span>
                    </td>

                    {/* اسم البحث - يظهر كاملاً */}
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`
                        block  font-medium leading-7
                        whitespace-normal break-words
                        ${
                          isHighlighted
                            ? "text-primary"
                            : "text-black "
                        }
                      `}
                      >
                        {row.title}
                      </span>
                    </td>

                    {/* المؤلف */}
                    <td className="px-4 py-4 align-top">
                      <span className="block leading-6 text-black whitespace-normal break-words">
                        {row.authors.length ? row.authors.join("، ") : "—"}
                      </span>
                    </td>

                    {/* الناشر */}
                    <td className="px-4 py-4 align-top">
                      <span className="block  leading-6 text-black whitespace-normal break-words">
                        {displayValue(row.publicationVenue)}
                      </span>
                    </td>

                    {/* اللغة */}
                    <td className="px-4 py-4 align-top">
                      <span className="block  leading-6 text-black whitespace-normal break-words">
                        {displayValue(row.language)}
                      </span>
                    </td>

                    {/* المستوى العلمي */}
                    {showCategory && (
                      <td className="px-4 py-4 align-top">
                        <span className="block  leading-6 text-black whitespace-normal break-words">
                          {displayValue(row.category)}
                        </span>
                      </td>
                    )}

                    {/* تاريخ الإصدار */}
                    <td className="px-4 py-4 align-top">
                      <span className="block  leading-6 text-black">
                        {displayValue(row.publishedYear)}
                      </span>
                    </td>

                    {/* عدد الصفحات */}
                    <td className="px-4 py-4 align-top">
                      <span className="block  leading-6 text-black">
                        {displayValue(row.pagenam)}
                      </span>
                    </td>

                    {/* زر التحميل */}
                    <td className="px-4 py-4 text-center align-top">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (row.pdfUrl) {
                            window.open(row.pdfUrl, "_blank");
                          }
                        }}
                        disabled={!row.pdfUrl}
                        aria-label={`فتح ${row.title}`}
                        className="
                        inline-flex items-center justify-center gap-1.5
                        px-3 py-2 rounded-lg
                        bg-gradient-to-r
                        text-secondary font-medium
                        hover:shadow-lg transition-all
                        disabled:opacity-40 disabled:cursor-not-allowed
                      "
                      >
                        <FaFilePdf size={11} />
                        PDF
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
