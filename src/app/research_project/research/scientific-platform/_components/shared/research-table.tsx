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
  /** رقم العنصر الأول في الصفحة الحالية (للترقيم) */
  startIndex: number;
  highlightId?: string | null;
  onRowClick?: (id: string) => void;
  onRowDoubleClick?: (pdfUrl?: string) => void;
  /** أعمدة إضافية اختيارية: "category" لبحوث الطلاب */
  showCategory?: boolean;
  rowRef?: (id: string, el: HTMLTableRowElement | null) => void;
}

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function ResearchTable({
  rows,
  startIndex,
  highlightId,
  onRowClick,
  onRowDoubleClick,
  showCategory = false,
  rowRef,
}: ResearchTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm font-semibold text-gray-700 dark:text-gray-200 border-b">
            <th className="px-4 py-3 text-center w-12">ت</th>
            <th className="px-4 py-3 text-right w-80">اسم البحث</th>
            <th className="px-4 py-3 text-right w-56">المؤلف</th>
            <th className="px-4 py-3 text-right">الناشر</th>
            <th className="px-4 py-3 text-right">اللغة</th>
            {showCategory && (
              <th className="px-4 py-3 text-right">المستوى العلمي</th>
            )}
            <th className="px-4 py-3 text-right">تاريخ الإصدار</th>
            <th className="px-4 py-3 text-right">عدد الصفحات</th>
            <th className="px-4 py-3 text-center">التحميل</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {rows.map((row, idx) => {
              const isHighlighted = highlightId === row.id;
              return (
                <motion.tr
                  key={row.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`cursor-pointer ${
                    isHighlighted
                      ? "bg-primary/10 ring-2 ring-primary/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/40"
                  }`}
                  onClick={() => onRowClick?.(row.id)}
                  onDoubleClick={() => onRowDoubleClick?.(row.pdfUrl)}
                  ref={(el) => rowRef?.(row.id, el)}
                >
                  {/* الرقم */}
                  <td className="px-4 py-4 text-center align-top">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-100 dark:bg-gray-700">
                      {startIndex + idx + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{row.title}</td>
                  <td className="px-4 py-3 text-right">
                    {row.authors.join(", ")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {row.publicationVenue}
                  </td>
                  <td className="px-4 py-3 text-right">{row.language}</td>
                  {showCategory && (
                    <td className="px-4 py-3 text-right">{row.category}</td>
                  )}
                  <td className="px-4 py-3 text-right">{row.publishedYear}</td>
                  <td className="px-4 py-3 text-right">{row.pagenam}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (row.pdfUrl) window.open(row.pdfUrl, "_blank");
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r text-secondary font-medium hover:shadow-lg transition-all"
                      aria-label={`تحميل ${row.title}`}
                    >
                      <FaFilePdf aria-hidden />
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
  );
}
