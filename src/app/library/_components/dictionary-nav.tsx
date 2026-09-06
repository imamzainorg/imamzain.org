"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  Loader2,
  BookOpen,
  FileText,
  Download,
} from "lucide-react";
import { NavDictionary, NavSubject } from "@/types/imamzain-legacy";

type DictionaryNavProps = {
  dictionaries: NavDictionary[];
  collectionSlug: string;
  activeDictionarySlug: string;
};

export default function DictionaryNav({
  dictionaries,
  collectionSlug,
  activeDictionarySlug,
}: DictionaryNavProps) {
  const pathname = usePathname();
  const [expandedDicts, setExpandedDicts] = useState(
    new Set([activeDictionarySlug]),
  );

  // The page only ships the active dictionary's subjects in full; the rest
  // arrive here with an empty `subjects` array. Expanding one of those
  // fetches its subjects from the static /api/library-nav route on demand,
  // so opening this sidebar never has to download every dictionary at once.
  const [fetchedSubjects, setFetchedSubjects] = useState<
    Record<string, NavSubject[]>
  >({});
  // A set, not a single slug: expanding a second non-active dictionary
  // before the first one's fetch resolves must not hide the first one's
  // loading spinner (a single scalar here would let the second overwrite
  // the first and leave it looking broken until it resolves in the
  // background).
  const [loadingSlugs, setLoadingSlugs] = useState<Set<string>>(new Set());

  const loadSubjects = useCallback(
    (dictionarySlug: string) => {
      setLoadingSlugs((prev) => new Set(prev).add(dictionarySlug));
      fetch(`/api/library-nav/${collectionSlug}/${dictionarySlug}`)
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json();
        })
        .then((subjects: NavSubject[]) => {
          setFetchedSubjects((prev) => ({ ...prev, [dictionarySlug]: subjects }));
        })
        .catch(() => {
          // Leave it unfetched; the collapse/expand toggle below retries on
          // the next click since fetchedSubjects[slug] stays undefined.
        })
        .finally(() => {
          setLoadingSlugs((prev) => {
            if (!prev.has(dictionarySlug)) return prev;
            const next = new Set(prev);
            next.delete(dictionarySlug);
            return next;
          });
        });
    },
    [collectionSlug],
  );

  const getDownloadInfo = (slug: string) => {
    switch (slug) {
      case "al-sahifa":
        return {
          path: "/books/الصحيفة رقعي.pdf",
          title: "الصحيفة السجادية",
        };
      case "risalat-al-huqoq":
        return {
          title: "رسالة الحقوق",
        };
      default:
        return null;
    }
  };

  const toggleDict = (dict: NavDictionary) => {
    const slug = dict.slug;
    const willExpand = !expandedDicts.has(slug);

    const newExpanded = new Set(expandedDicts);
    if (willExpand) {
      newExpanded.add(slug);
    } else {
      newExpanded.delete(slug);
    }
    setExpandedDicts(newExpanded);

    if (
      willExpand &&
      dict.subjects.length === 0 &&
      dict.subjectCount > 0 &&
      !fetchedSubjects[slug]
    ) {
      loadSubjects(slug);
    }
  };

  const downloadInfo = getDownloadInfo(collectionSlug);

  return (
    <div className="bg-white dark:bg-Muharram_secondary/10 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-2xl overflow-hidden flex flex-col max-h-full">
      <div className="px-6 py-4 border-b border-gray-100 dark:borde bg-gradient-to-br from-primary/5 to-transparent dark:from-Muharram_primary/5">
        <h2 className="text-base font-bold text-gray-900 dark:text-Muharram-primary flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary dark:text-Muharram_primary" />
          الأقسام والموضوعات
        </h2>
      </div>

      <nav
        className="flex-1 overflow-y-auto p-3 space-y-1.5 overscroll-contain"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {dictionaries.map((dict) => {
          const isExpanded = expandedDicts.has(dict.slug);
          const isActive = dict.slug === activeDictionarySlug;
          const subjects =
            dict.subjects.length > 0
              ? dict.subjects
              : fetchedSubjects[dict.slug];
          const isLoadingSubjects =
            isExpanded && !subjects && loadingSlugs.has(dict.slug);

          return (
            <div key={dict.slug}>
              <div className="flex items-stretch gap-1">
                <button
                  onClick={() => toggleDict(dict)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-Muharram_secondary/30 rounded-lg transition-colors flex-shrink-0"
                  aria-label={isExpanded ? "طي القسم" : "توسيع القسم"}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                <Link
                  href={`/library/${collectionSlug}/${dict.slug}`}
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
                    {dict.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-primary/20 dark:bg-Muharram_secondary/30 text-primary dark:text-Muharram_primary"
                        : "bg-gray-100 dark:bg-Muharram_secondary/30 text-gray-500 dark:text-Muharram_primary"
                    }`}
                  >
                    {dict.subjectCount.toLocaleString("ar-EG")}
                  </span>
                </Link>
              </div>

              {/* Subjects List */}
              {isLoadingSubjects && (
                <div className="mr-9 mt-1 flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  جاري التحميل...
                </div>
              )}

              {isExpanded && subjects && (
                <div className="mr-9 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                  {subjects.map((subject: NavSubject) => {
                    const subjectPath = `/library/${collectionSlug}/${dict.slug}/${subject.slug}`;
                    const isActiveSubject =
                      pathname === subjectPath ||
                      pathname.startsWith(subjectPath);

                    return (
                      <Link
                        key={subject.slug}
                        href={subjectPath}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm group ${
                          isActiveSubject
                            ? "bg-primary/10 dark:bg-Muharram_secondary/15  text-primary dark:text-Muharram_primary font-medium shadow-sm"
                            : "hover:bg-gray-50 dark:hover:bg-Muharram_secondary/15 text-gray-600 dark:text-Muharram_primary  hover:text-gray-900 dark:hover:text-Muharram_primary/80"
                        }`}
                      >
                        <FileText
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isActiveSubject
                              ? "text-primary dark:text-Muharram_primary"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="flex-1 text-xs md:text-base leading-tight">
                          {subject.title}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            isActiveSubject
                              ? "text-primary/70 dark:text-Muharram_primary/70"
                              : "text-gray-400 dark:text-Muharram_primary"
                          }`}
                        >
                          {subject.id}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* زر التنزيل - يظهر فقط عندما يكون هناك مسار PDF متاح */}
      {downloadInfo?.path && (
        <div className="p-4 border-t border-gray-100 dark:border-Muharram_primary bg-gray-50/50 dark:bg-Muharram_secondary/5">
          <a
            href={downloadInfo.path}
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
                  {downloadInfo.title} - نسخة PDF
                </p>
              </div>
            </div>
            <span className="text-sm bg-white dark:bg-Muharram_primary/10 px-3 py-1 rounded-lg shadow-sm">
              تنزيل
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
