"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, BookOpen, Download, FileSearch } from "lucide-react";
import { FileText } from "lucide-react";
import { downloadViaProxy } from "@/lib/download";
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
  pdfUrl: string;
}

// ─── ResearchCard ─────────────────────────────────────────────────────────────

interface ResearchCardProps {
  item: CardData;
  onSummary?: (item: CardData) => void;
}

export function ResearchCard({ item, onSummary }: ResearchCardProps) {
  const displayAuthor =
    item.author ?? item.authors?.filter(Boolean).join("، ") ?? null;

  const outline =
    "flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary px-3 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_secondary dark:text-Muharram_secondary dark:hover:bg-Muharram_secondary dark:hover:text-white";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-3xl border-2 border-primary/15 bg-white transition-colors duration-300 hover:border-primary/40 dark:border-white/10 dark:bg-Muharram_primary"
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* ── Badges + سنة ── */}
        <div className="flex flex-wrap items-center gap-2">
          {item.badge && (
            <span className="max-w-[12rem] truncate rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary dark:bg-white/10 dark:text-Muharram_secondary">
              {item.badge}
            </span>
          )}

          {item.publishedYear && (
            <span className="mr-auto flex shrink-0 items-center gap-1.5 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
              <Calendar size={14} />
              {item.publishedYear}
            </span>
          )}
        </div>

        {/* ── العنوان ── */}
        <h3 className="line-clamp-3 flex-1 text-lg font-bold leading-8 text-gray-900 transition-colors group-hover:text-primary dark:text-gray-50 dark:group-hover:text-Muharram_secondary">
          {item.title}
        </h3>

        {/* ── المؤلف ── */}
        {displayAuthor && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <User size={16} className="shrink-0 text-secondary_dark dark:text-Muharram_secondary" />
            <span className="truncate">{displayAuthor}</span>
          </div>
        )}
        {item.badgeSecondary && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <FileText size={16} className="shrink-0 text-secondary_dark dark:text-Muharram_secondary" />
            <span className="truncate">{item.badgeSecondary}</span>
          </div>
        )}

        {/* ── الأزرار ── */}
        <div className="mt-auto flex gap-2 border-t border-secondary/30 pt-4">
          {item.pdfUrl ? (
            <>
              {/* تحميل */}
              <button
                type="button"
                onClick={() =>
                  downloadViaProxy(item.pdfUrl, `${item.title}.pdf`)
                }
                className="flex items-center justify-center rounded-xl border-2 border-primary bg-primary p-3 text-white transition-colors hover:bg-primary/90 dark:border-Muharram_secondary dark:bg-Muharram_secondary"
                title="تحميل"
                aria-label="تحميل"
              >
                <Download size={18} />
              </button>

              {/* ملخص — فقط للمؤتمرات */}
              {item.abstract && onSummary && (
                <button type="button" onClick={() => onSummary(item)} className={outline}>
                  <BookOpen size={16} />
                  الملخص
                </button>
              )}

              {/* عرض PDF */}
              <a
                href={`/api/download?url=${encodeURIComponent(item.pdfUrl)}&mode=inline`}
                target="_blank"
                rel="noopener noreferrer"
                className={outline}
              >
                <BookOpen size={16} />
                قراءة
              </a>
            </>
          ) : (
            <span className="py-2 text-sm text-gray-500">لا يوجد ملف</span>
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary dark:border-Muharram_secondary">
        <FileSearch size={28} className="text-secondary_dark dark:text-Muharram_secondary" />
      </div>
      <p className="text-2xl font-bold text-gray-800">لا توجد نتائج مطابقة</p>
      <p className="mt-2 text-lg text-gray-600">جرّب تعديل كلمات البحث أو الفلاتر</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 font-semibold text-primary hover:underline dark:text-Muharram_secondary"
        >
          مسح الفلاتر
        </button>
      )}
    </motion.div>
  );
}
