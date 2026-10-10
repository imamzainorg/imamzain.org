"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  Download,
  Loader2,
} from "lucide-react";
import type { NavDictionary, NavSubject } from "@/types/imamzain-legacy";
import { libraryPath } from "../_config/paths";
import { toArabicDigits } from "../_lib/arabic-text";

type DictionaryNavProps = {
  dictionaries: NavDictionary[];
  collectionSlug: string;
  activeDictionarySlug: string;
  /** يُمرَّران من الـ layout بدل الـ config كاملًا حتى لا يُسلسَل النص التعريفي في كل صفحة */
  collectionTitle: string;
  pdfDownload?: string;
};

// أقسام تظهر دائمًا تحت قسم أب محدد بدل أن تكون صفوفًا مستقلة
const PINNED_PARENT_SLUG = "appendix-by-al-hurr-al-amili";
const PINNED_CHILD_SLUGS = new Set([
  "supplications-of-newborns",
  "imam-monologues",
  "daily-supplications",
]);

const isActivePath = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`);

/**
 * The page ships only the active dictionary's subjects; the others arrive with
 * an empty `subjects` array. Expanding one fetches its subjects from the static
 * /api/library-nav route, so opening the sidebar never downloads every dictionary.
 * Loading is tracked per slug: expanding a second dictionary must not hide the
 * first one's spinner.
 */
function useLazySubjects(collectionSlug: string) {
  const [fetchedSubjects, setFetchedSubjects] = useState<Record<string, NavSubject[]>>({});
  const [loadingSlugs, setLoadingSlugs] = useState<Set<string>>(new Set());

  function loadSubjects(dictionarySlug: string) {
    setLoadingSlugs((prev) => new Set(prev).add(dictionarySlug));

    fetch(`/api/library-nav/${collectionSlug}/${dictionarySlug}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((subjects: NavSubject[]) =>
        setFetchedSubjects((prev) => ({ ...prev, [dictionarySlug]: subjects })),
      )
      .catch(() => {
        // يبقى غير محمَّل، فتعيد المحاولة نقرة الطي/الفتح التالية
      })
      .finally(() =>
        setLoadingSlugs((prev) => {
          const next = new Set(prev);
          next.delete(dictionarySlug);
          return next;
        }),
      );
  }

  return { fetchedSubjects, loadingSlugs, loadSubjects };
}

export default function DictionaryNav({
  dictionaries,
  collectionSlug,
  activeDictionarySlug,
  collectionTitle,
  pdfDownload,
}: DictionaryNavProps) {
  const pathname = usePathname();
  const [expandedSlugs, setExpandedSlugs] = useState(
    () => new Set([activeDictionarySlug]),
  );
  const { fetchedSubjects, loadingSlugs, loadSubjects } =
    useLazySubjects(collectionSlug);

  const topLevelDictionaries = dictionaries.filter(
    (dictionary) => !PINNED_CHILD_SLUGS.has(dictionary.slug),
  );
  const pinnedChildren = dictionaries.filter((dictionary) =>
    PINNED_CHILD_SLUGS.has(dictionary.slug),
  );

  function toggleDictionary(dictionary: NavDictionary) {
    const willExpand = !expandedSlugs.has(dictionary.slug);

    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (willExpand) next.add(dictionary.slug);
      else next.delete(dictionary.slug);
      return next;
    });

    const needsFetch =
      dictionary.subjects.length === 0 &&
      dictionary.subjectCount > 0 &&
      !fetchedSubjects[dictionary.slug];
    if (willExpand && needsFetch) loadSubjects(dictionary.slug);
  }

  return (
    <div className="bg-white dark:bg-Muharram_secondary/10 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-2xl overflow-hidden flex flex-col max-h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-br from-primary/5 to-transparent dark:from-Muharram_primary/5">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary dark:text-Muharram_primary" />
          الأقسام والموضوعات
        </h2>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-3 space-y-1.5 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {topLevelDictionaries.map((dictionary) => {
          const isExpanded = expandedSlugs.has(dictionary.slug);
          const isActive = dictionary.slug === activeDictionarySlug;
          const subjects =
            dictionary.subjects.length > 0
              ? dictionary.subjects
              : fetchedSubjects[dictionary.slug];
          const isLoading =
            isExpanded && !subjects && loadingSlugs.has(dictionary.slug);

          return (
            <div key={dictionary.slug}>
              <div className="flex items-stretch gap-1">
                <button
                  onClick={() => toggleDictionary(dictionary)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-Muharram_secondary/30 rounded-lg transition-colors flex-shrink-0"
                  aria-label={isExpanded ? "طي القسم" : "توسيع القسم"}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                <DictionaryLink
                  dictionary={dictionary}
                  href={libraryPath(collectionSlug, dictionary.slug)}
                  isActive={isActive}
                />
              </div>

              {dictionary.slug === PINNED_PARENT_SLUG && (
                <PinnedChildren
                  dictionaries={pinnedChildren}
                  collectionSlug={collectionSlug}
                  pathname={pathname}
                />
              )}

              {isLoading && (
                <div className="mr-9 mt-1 flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  جاري التحميل...
                </div>
              )}

              {isExpanded && subjects && (
                <div className="mr-9 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                  {subjects.map((subject, index) => (
                    <SubjectLink
                      key={subject.slug}
                      subject={subject}
                      position={index + 1}
                      href={libraryPath(collectionSlug, dictionary.slug, subject.slug)}
                      pathname={pathname}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {pdfDownload && (
        <DownloadCard href={pdfDownload} collectionTitle={collectionTitle} />
      )}
    </div>
  );
}

function DictionaryLink({
  dictionary,
  href,
  isActive,
}: {
  dictionary: NavDictionary;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        isActive
          ? "bg-gradient-to-r from-primary/15 to-primary/5 dark:from-Muharram_secondary/30 dark:to-Muharram_secondary/5 text-primary dark:text-Muharram_primary font-semibold shadow-sm"
          : "hover:bg-gray-50 dark:hover:bg-Muharram_secondary/30 text-gray-700 dark:text-gray-300"
      }`}
    >
      <div
        className={`flex-shrink-0 w-2 h-2 rounded-full ${
          isActive
            ? "bg-primary dark:bg-Muharram_secondary/30"
            : "bg-gray-300 dark:bg-Muharram_secondary/30"
        }`}
      />
      <span className="flex-1 text-subtitle leading-tight dark:text-Muharram_primary">
        {dictionary.title}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          isActive
            ? "bg-primary/20 dark:bg-Muharram_secondary/30 text-primary dark:text-Muharram_primary"
            : "bg-gray-100 dark:bg-Muharram_secondary/30 text-gray-500 dark:text-Muharram_primary"
        }`}
      >
        {toArabicDigits(dictionary.subjectCount)}
      </span>
    </Link>
  );
}

function PinnedChildren({
  dictionaries,
  collectionSlug,
  pathname,
}: {
  dictionaries: NavDictionary[];
  collectionSlug: string;
  pathname: string;
}) {
  return (
    <div className="mr-9 mt-1 space-y-0.5 border-r border-gray-200 pr-2 dark:border-zinc-700">
      {dictionaries.map((child) => {
        const path = libraryPath(collectionSlug, child.slug);

        return (
          <Link
            key={child.slug}
            href={path}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm ${
              isActivePath(pathname, path)
                ? "bg-primary/10 dark:bg-Muharram_secondary/15 text-primary dark:text-Muharram_primary font-medium"
                : "hover:bg-gray-50 dark:hover:bg-Muharram_secondary/15 text-gray-600 dark:text-Muharram_primary"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <span className="flex-1 text-xs md:text-sm leading-tight">
              {child.title}
            </span>
            <span className="text-xs text-gray-400">
              {toArabicDigits(child.subjectCount)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function SubjectLink({
  subject,
  position,
  href,
  pathname,
}: {
  subject: NavSubject;
  position: number;
  href: string;
  pathname: string;
}) {
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm group ${
        isActive
          ? "bg-primary/10 dark:bg-Muharram_secondary/15  text-primary dark:text-Muharram_primary font-medium shadow-sm"
          : "hover:bg-gray-50 dark:hover:bg-Muharram_secondary/15 text-gray-600 dark:text-Muharram_primary  hover:text-gray-900 dark:hover:text-Muharram_primary/80"
      }`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-3.5 h-3.5 flex-shrink-0 ${
          isActive ? "text-primary dark:text-Muharram_primary" : "text-gray-400"
        }`}
      >
        <use href="#icon-file-text" />
      </svg>
      <span className="flex-1 text-xs md:text-base leading-tight">
        {subject.title}
      </span>
      <span
        className={`text-xs font-medium ${
          isActive
            ? "text-primary/70 dark:text-Muharram_primary/70"
            : "text-gray-400 dark:text-Muharram_primary"
        }`}
      >
        {toArabicDigits(position)}
      </span>
    </Link>
  );
}

function DownloadCard({
  href,
  collectionTitle,
}: {
  href: string;
  collectionTitle: string;
}) {
  return (
    <div className="p-4 border-t border-gray-100 dark:border-Muharram_primary bg-gray-50/50 dark:bg-Muharram_secondary/5">
      <a
        href={href}
        download
        className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-l from-primary/10 to-primary/5 dark:from-Muharram_secondary/10 dark:to-Muharram_primary/5 hover:from-primary/15 hover:to-primary/10 dark:hover:from-Muharram_secondary/15 dark:hover:to-Muharram_secondary/10 text-primary dark:text-Muharram_primary rounded-xl transition-all border border-primary/20 dark:border-Muharram_primary/20 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 dark:bg-Muharram_primary/10 rounded-lg group-hover:scale-110 transition-transform">
            <Download className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">تحميل الكتاب كامل</p>
            <p className="text-xs text-gray-600 dark:text-Muharram_primary mt-0.5">
              {collectionTitle} - نسخة PDF
            </p>
          </div>
        </div>
        <span className="text-sm bg-white dark:bg-Muharram_primary/10 px-3 py-1 rounded-lg shadow-sm">
          تنزيل
        </span>
      </a>
    </div>
  );
}
