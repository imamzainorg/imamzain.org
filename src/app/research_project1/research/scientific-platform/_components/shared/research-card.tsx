"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, BookOpen, Download, FileSearch } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { FileText } from "lucide-react";
// ─── CardData — النوع الموحّد لكل الصفحات ─────────────────────────────────────

export interface CardData {
  id?: string;
  title: string;
  /** مؤلف واحد */
  author?: string;
  /** مؤلفون متعددون */
  authors?: string[];
  publishedYear?: string;
  /** Badge رئيسي: اسم المؤتمر / الناشر / الدورية */
  badge?: string;
  /** Badge ثانوي: الدرجة العلمية / القسم */
  badgeSecondary?: string;
  /** ملخص HTML (للمؤتمرات) */
  abstract?: string;
  pdfUrl?: string;
}

// ─── ResearchCard ─────────────────────────────────────────────────────────────

interface ResearchCardProps {
  item: CardData;
  onSummary?: (item: CardData) => void;
}

export function ResearchCard({ item, onSummary }: ResearchCardProps) {
  const displayAuthor =
    item.author ?? item.authors?.filter(Boolean).join("، ") ?? null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="
        group relative flex flex-col h-full
        bg-white dark:bg-gray-900
        rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-800
        shadow-sm hover:shadow-xl hover:shadow-primary/10
        dark:hover:shadow-primary/15
        transition-all duration-300
      "
    >
      {/* شريط لوني علوي — يظهر عند hover */}
      <div className="
        h-[3px] w-full shrink-0
        bg-gradient-to-l from-primary/30 via-primary to-primary/30
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      " />

      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* ── Badges + سنة ── */}
        <div className="flex flex-wrap items-center gap-1.5">

          {item.badge && (
            <span className="
              inline-flex items-center gap-1 px-2 py-0.5
              text-[11px] font-semibold
              bg-primary/8 dark:bg-primary/15 text-primary
              rounded-md border border-primary/15
              max-w-[170px] truncate
            ">
              <span className="truncate">{item.badge}</span>
            </span>
          )}



          {item.publishedYear && (
            <span className="
              mr-auto flex items-center gap-1
              text-[11px] text-gray-400 dark:text-gray-500 shrink-0
            ">
              <Calendar size={10} />
              {item.publishedYear}
            </span>
          )}
        </div>

        {/* ── العنوان ── */}
        <h3 className="
          flex-1
          text-sm font-bold leading-[1.6]
          text-gray-900 dark:text-gray-50
          line-clamp-3
          group-hover:text-primary transition-colors duration-200
        ">
          {item.title}
        </h3>

        {/* ── المؤلف ── */}
        {displayAuthor && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="
              flex items-center justify-center w-5 h-5 rounded-full
              bg-gray-100 dark:bg-gray-800 shrink-0
            ">
              <User size={10} />
            </span>
            <span className="truncate">{displayAuthor}</span>
          </div>
        )}
          {item.badgeSecondary && (
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                 <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                          <FileText size={13} />
                        </span>
               <span className="truncate">{item.badgeSecondary}</span>
            </div>
          )}

        {/* ── الأزرار ── */}
        <div className="
          flex gap-2 pt-3 mt-auto
          border-t border-gray-100 dark:border-gray-800
        ">
          {item.pdfUrl ? (
            <>
              {/* تحميل */}
              <a
                href={item.pdfUrl}
                download
                onClick={(e) => e.stopPropagation()}
                title="تحميل الملف"
                className="
                  flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                  bg-gray-100 dark:bg-gray-800
                  text-gray-500 dark:text-gray-400
                  hover:bg-primary hover:text-white
                  active:scale-95 transition-all duration-150
                "
              >
                <Download size={14} />
              </a>

              {/* ملخص — فقط للمؤتمرات */}
              {item.abstract && onSummary && (
                <button
                  onClick={() => onSummary(item)}
                  className="
                    flex-1 flex items-center justify-center gap-1.5
                    px-3 py-2 rounded-xl text-xs font-semibold
                    bg-gray-100 dark:bg-gray-800
                    text-gray-600 dark:text-gray-300
                    hover:bg-primary/10 hover:text-primary
                    active:scale-95 transition-all duration-150
                  "
                >
                  <BookOpen size={12} />
                  الملخص
                </button>
              )}

              {/* عرض PDF */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex-1 flex items-center justify-center gap-1.5
                  px-3 py-2 rounded-xl text-xs font-semibold
                  bg-primary text-white
                  hover:bg-primary/90 active:scale-95
                  transition-all duration-150
                  shadow-sm shadow-primary/25
                "
              >
                <FaFilePdf size={11} />
                عرض PDF
              </a>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic py-2">لا يوجد ملف</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── ResearchGrid ─────────────────────────────────────────────────────────────

export function ResearchGrid({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </AnimatePresence>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="
        w-16 h-16 rounded-2xl mb-4
        bg-gray-100 dark:bg-gray-800
        flex items-center justify-center
      ">
        <FileSearch size={26} className="text-gray-300 dark:text-gray-600" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">لا توجد نتائج مطابقة</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">جرّب تعديل كلمات البحث أو الفلاتر</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-4 text-sm text-primary hover:underline font-medium"
        >
          مسح الفلاتر
        </button>
      )}
    </motion.div>
  );
}
