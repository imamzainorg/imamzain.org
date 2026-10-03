"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, Loader2, Download } from "lucide-react";
import { TitleIcon, outlineButton } from "@/components/brand";
import { cn } from "@/lib/utils";
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
    <div className="flex min-h-0 flex-1 flex-col rounded-[2rem] border-2 border-primary/15 bg-white p-5 shadow-xl shadow-primary/10 dark:border-Muharram_primary/20">
      <p className="mb-3 flex items-center gap-2 border-b-2 border-dashed border-secondary/40 pb-3 text-lg font-bold text-primary dark:border-Muharram_secondary/40 dark:text-Muharram_primary">
        <TitleIcon className="w-3" />
        الأقسام والموضوعات
      </p>

      <nav
        aria-label="الأقسام والموضوعات"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pb-1 pl-1"
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
              <div className="flex items-center">
                <Link
                  href={`/library/${collectionSlug}/${dict.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 leading-7 transition-colors",
                    isActive
                      ? "font-bold text-primary dark:text-Muharram_primary"
                      : "font-semibold text-gray-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary",
                  )}
                >
                  <span className="flex-1">{dict.title}</span>
                  <span className="text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
                    {dict.subjectCount.toLocaleString("ar-EG")}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleDict(dict)}
                  className="ml-1 grid size-9 shrink-0 place-items-center rounded-lg text-gray-500 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:text-Muharram_primary"
                  aria-label={isExpanded ? "طي القسم" : "توسيع القسم"}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Subjects List */}
              {isLoadingSubjects && (
                <div className="mr-8 flex items-center gap-2 py-2 text-sm text-gray-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  جاري التحميل...
                </div>
              )}

              {isExpanded && subjects && (
                <ol className="mb-2 mr-4 space-y-0.5 border-r-2 border-secondary/30 pr-2 dark:border-Muharram_secondary/30">
                  {subjects.map((subject: NavSubject) => {
                    const subjectPath = `/library/${collectionSlug}/${dict.slug}/${subject.slug}`;
                    const isActiveSubject =
                      pathname === subjectPath ||
                      pathname.startsWith(subjectPath);

                    return (
                      <li key={subject.slug}>
                        <Link
                          href={subjectPath}
                          aria-current={isActiveSubject ? "page" : undefined}
                          className={cn(
                            "flex items-start gap-3 rounded-lg px-3 py-1.5 text-base leading-7 transition-colors",
                            isActiveSubject
                              ? "bg-primary/10 font-bold text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary"
                              : "text-gray-700 hover:bg-primary/[0.06] hover:text-primary dark:hover:text-Muharram_primary",
                          )}
                        >
                          <span className="w-6 shrink-0 text-sm text-secondary_dark dark:text-Muharram_secondary">
                            {subject.id}
                          </span>
                          <span className="flex-1">{subject.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </nav>

      {/* زر التنزيل - يظهر فقط عندما يكون هناك مسار PDF متاح */}
      {downloadInfo?.path && (
        <a
          href={downloadInfo.path}
          download
          className={`${outlineButton} mt-5 w-full !justify-start !gap-4 !px-5 !py-3`}
        >
          <Download className="h-5 w-5 shrink-0" />
          <span className="text-right">
            <span className="block">تحميل الكتاب كاملاً</span>
            <span className="block text-sm font-normal opacity-80">
              {downloadInfo.title} - نسخة PDF
            </span>
          </span>
        </a>
      )}
    </div>
  );
}
