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
    <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="
            bg-gray-50/80 dark:bg-gray-800/60
            text-gray-500 dark:text-gray-400
            text-xs font-semibold uppercase tracking-wide
            border-b border-gray-100 dark:border-gray-800
          ">
            <th className="px-4 py-3 text-center w-10">#</th>
            <th className="px-4 py-3 text-right">اسم البحث</th>
            <th className="px-4 py-3 text-right">المؤلف</th>
            <th className="px-4 py-3 text-right">الناشر</th>
            <th className="px-4 py-3 text-right">اللغة</th>
            {showCategory && (
              <th className="px-4 py-3 text-right">المستوى</th>
            )}
            <th className="px-4 py-3 text-right">السنة</th>
            <th className="px-4 py-3 text-right">الصفحات</th>
            <th className="px-4 py-3 text-center">PDF</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
          <AnimatePresence>
            {rows.map((row, idx) => {
              const isHighlighted = highlightId === row.id;
              return (
                <motion.tr
                  key={`${row.id}-${idx}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: idx * 0.02 }}
                  onClick={() => onRowClick?.(row.id)}
                  onDoubleClick={() => onRowDoubleClick?.(row.pdfUrl)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    isHighlighted
                      ? "bg-primary/6 dark:bg-primary/12"
                      : "hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                  }`}
                >
                  {/* # */}
                  <td className="px-4 py-3 text-center">
                    <span className="
                      inline-flex items-center justify-center
                      w-6 h-6 rounded-full
                      bg-gray-100 dark:bg-gray-700
                      text-[11px] font-medium text-gray-500 dark:text-gray-400
                    ">
                      {startIndex + idx + 1}
                    </span>
                  </td>

                  {/* العنوان */}
                  <td className="px-4 py-3 max-w-xs">
                    <span className={`
                      text-sm font-medium line-clamp-2 leading-snug
                      ${isHighlighted ? "text-primary" : "text-gray-800 dark:text-gray-100"}
                    `}>
                      {row.title}
                    </span>
                  </td>

                  {/* المؤلف */}
                  <td className="px-4 py-3 max-w-[150px]">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
                      {row.authors.join("، ")}
                    </span>
                  </td>

                  {/* الناشر */}
                  <td className="px-4 py-3 max-w-[140px]">
                    <span className="text-xs text-gray-400 dark:text-gray-500 truncate block">
                      {row.publicationVenue}
                    </span>
                  </td>

                  {/* اللغة */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{row.language}</span>
                  </td>

                  {/* المستوى */}
                  {showCategory && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      {row.category && (
                        <span className="
                          inline-flex px-2 py-0.5 rounded-full
                          text-[11px] font-medium
                          bg-amber-50 dark:bg-amber-900/20
                          text-amber-700 dark:text-amber-400
                          border border-amber-200/60 dark:border-amber-700/30
                        ">
                          {row.category}
                        </span>
                      )}
                    </td>
                  )}

                  {/* السنة */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{row.publishedYear}</span>
                  </td>

                  {/* الصفحات */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{row.pagenam}</span>
                  </td>

                  {/* PDF */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (row.pdfUrl) window.open(row.pdfUrl, "_blank");
                      }}
                      disabled={!row.pdfUrl}
                      aria-label={`فتح ${row.title}`}
                      className="
                        inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium
                        bg-primary/8 text-primary hover:bg-primary hover:text-white
                        disabled:opacity-30 disabled:cursor-not-allowed
                        active:scale-95 transition-all duration-150
                      "
                    >
                      <FaFilePdf size={11} /> PDF
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
