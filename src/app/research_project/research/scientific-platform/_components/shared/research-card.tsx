"use client";

import { motion } from "framer-motion";
import { Calendar, User, FileText, BookOpen, Download } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

// ─── الأنواع ──────────────────────────────────────────────────────────────────

/** بيانات الكرت الموحّدة — كل الحقول اللي مشتركة */
export interface CardData {
  id?: string;
  title: string;
  author?: string;
  publishedYear?: string;
  /** للمؤتمرات */
  conference?: string;
  /** للدوريات */
  publicationVenue?: string;
  section?: string;
  abstract?: string;
  pdfUrl?: string;
}

interface ResearchCardProps {
  item: CardData;
  /** استدعي عند الضغط على زر الملخص */
  onSummary?: (item: CardData) => void;
  /** نوع الكرت يحدد طريقة عرض الـ badge العلوي */
  variant?: "conference" | "journal";
}

// ─── الكرت ───────────────────────────────────────────────────────────────────

export function ResearchCard({
  item,
  onSummary,
  variant = "conference",
}: ResearchCardProps) {
  const badge = variant === "conference" ? item.conference : item.publicationVenue;
  const meta = item.section ?? item.publicationVenue;

  return (
    <motion.article
      className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden
        border border-gray-100 dark:border-gray-800
        shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]
        hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.18)] dark:hover:shadow-[0_8px_32px_rgba(var(--primary-rgb),0.25)]
        hover:-translate-y-1.5 transition-all duration-300 ease-out"
    >
      {/* شريط لوني علوي */}
      <div className="h-1 w-full bg-gradient-to-l from-primary/30 via-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-1 p-6">
        {/* Badge + سنة */}
        {(badge || item.publishedYear) && (
          <div className="flex items-center justify-between gap-3 mb-4">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/8 dark:bg-primary/15 text-primary rounded-lg border border-primary/15 truncate max-w-[68%]">
                <FileText size={11} className="shrink-0 opacity-70" />
                <span className="truncate text-sm">{badge}</span>
              </span>
            )}
            {item.publishedYear && (
              <span className="flex items-center text-gray-500 dark:text-gray-400 gap-1 text-xs font-medium shrink-0">
                <Calendar size={12} />
                {item.publishedYear}
              </span>
            )}
          </div>
        )}

        {/* العنوان */}
        <h3 className="text-subtitle font-bold leading-snug text-gray-900 dark:text-gray-50 mb-4 line-clamp-3 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>

        {/* Meta */}
        <div className="flex-1 space-y-2 mb-5">
          {item.author && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                <User size={13} />
              </span>
              <span className="truncate font-medium">{item.author}</span>
            </div>
          )}
          {meta && (
            <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                <FileText size={13} />
              </span>
              <span className="truncate">{meta}</span>
            </div>
          )}
        </div>

        {/* الأزرار */}
        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          {item.pdfUrl ? (
            <div className="flex-1 flex gap-2">
              {/* تحميل */}
              <a
                href={item.pdfUrl}
                download
                className="flex items-center justify-center p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-sm shadow-primary/20"
                title="تحميل"
              >
                <Download size={14} className="opacity-90" />
              </a>

              {/* ملخص */}
              {item.abstract && onSummary && (
                <button
                  onClick={() => onSummary(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150"
                >
                  <BookOpen size={15} />
                  الملخص
                </button>
              )}

              {/* قراءة */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-primary/8 hover:text-primary hover:border-primary/30 active:scale-95 transition-all duration-150"
              >
                <FaFilePdf size={14} />
                قراءة
              </a>
            </div>
          ) : (
            <span className="text-xs text-gray-400">لا يوجد ملف</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
