"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// يُطبَّق قبل الرسم في المتصفح (فلا يظهر قفز)، ويتجنّب التحذير على السيرفر
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ذاكرة على مستوى الـ module: تبقى حتى لو أُعيد تركيب الشريط الجانبي عند
 * الانتقال بين الأدعية (وهذا هو سبب رجوع السكرول للأعلى).
 * - scrollTop: موضع سكرول القائمة
 * - expanded: الأقسام التي فتحها المستخدم
 * - subjects: موضوعات الأقسام (الواصلة من الصفحة أو المجلوبة)، حتى يعود
 *   ارتفاع القائمة كما كان قبل استرجاع السكرول
 */
const navMemory = {
  scrollTop: new Map<string, number>(),
  expanded: new Map<string, Set<string>>(),
  subjects: new Map<string, Record<string, NavSubject[]>>(),
};

const isActivePath = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`);

// إذا كان الدعاء المفتوح تابعًا لأحد الأقسام المثبّتة، نفتح القسم الأب الذي يحتويه
const expandTargetFor = (slug: string) =>
  PINNED_CHILD_SLUGS.has(slug) ? PINNED_PARENT_SLUG : slug;

function pickSubjects(
  d: NavDictionary,
  fetched: Record<string, NavSubject[]>,
  collectionSlug: string,
): NavSubject[] | undefined {
  if (d.subjects.length > 0) return d.subjects;
  return fetched[d.slug] ?? navMemory.subjects.get(collectionSlug)?.[d.slug];
}

/**
 * The page ships only the active dictionary's subjects; the others arrive with
 * an empty `subjects` array. Expanding one fetches its subjects from the static
 * /api/library-nav route, so opening the sidebar never downloads every dictionary.
 * Loading is tracked per slug: expanding a second dictionary must not hide the
 * first one's spinner.
 */
function useLazySubjects(collectionSlug: string) {
  const [fetchedSubjects, setFetchedSubjects] = useState<
    Record<string, NavSubject[]>
  >(() => navMemory.subjects.get(collectionSlug) ?? {});
  const [loadingSlugs, setLoadingSlugs] = useState<Set<string>>(new Set());
  // سبب الفشل لكل قسم (يظهر للمستخدم مع زر إعادة المحاولة)
  const [errors, setErrors] = useState<Record<string, string>>({});

  function loadSubjects(dictionary: NavDictionary) {
    const slug = dictionary.slug;
    setLoadingSlugs((prev) => new Set(prev).add(slug));
    setErrors((prev) => {
      if (!(slug in prev)) return prev;
      const rest = { ...prev };
      delete rest[slug];
      return rest;
    });

    fetch(`/api/library-nav/${collectionSlug}/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((subjects: unknown) => {
        if (!Array.isArray(subjects)) throw new Error("الاستجابة ليست قائمة");
        const list = subjects as NavSubject[];
        // القسم يقول إن فيه موضوعات لكن الـ API رجّع قائمة فارغة: نعدّه خطأ
        if (list.length === 0 && dictionary.subjectCount > 0) {
          throw new Error("الـ API رجّع قائمة فارغة");
        }
        if (list.length > 0) {
          navMemory.subjects.set(collectionSlug, {
            ...(navMemory.subjects.get(collectionSlug) ?? {}),
            [slug]: list,
          });
        }
        setFetchedSubjects((prev) => ({ ...prev, [slug]: list }));
      })
      .catch((err: unknown) =>
        setErrors((prev) => ({
          ...prev,
          [slug]: err instanceof Error ? err.message : "خطأ غير معروف",
        })),
      )
      .finally(() =>
        setLoadingSlugs((prev) => {
          const next = new Set(prev);
          next.delete(slug);
          return next;
        }),
      );
  }

  return { fetchedSubjects, loadingSlugs, errors, loadSubjects };
}

export default function DictionaryNav({
  dictionaries,
  collectionSlug,
  activeDictionarySlug,
  collectionTitle,
  pdfDownload,
}: DictionaryNavProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const restoringRef = useRef(false);

  // نستعيد الأقسام المفتوحة سابقًا، لكن فقط التي نملك موضوعاتها الآن،
  // كي لا يظهر قسم مفتوح وفارغ بعد إعادة التركيب.
  const [expandedSlugs, setExpandedSlugs] = useState(() => {
    const saved = navMemory.expanded.get(collectionSlug);
    const cached = navMemory.subjects.get(collectionSlug);
    const initial = new Set([expandTargetFor(activeDictionarySlug)]);
    if (saved) {
      for (const d of dictionaries) {
        if (saved.has(d.slug) && (d.subjects.length > 0 || cached?.[d.slug])) {
          initial.add(d.slug);
        }
      }
    }
    return initial;
  });
  const { fetchedSubjects, loadingSlugs, errors, loadSubjects } =
    useLazySubjects(collectionSlug);

  // إذا تغيّر القسم النشط دون إعادة تركيب، نفتحه (ضبط الحالة أثناء الرسم)
  const [prevActiveSlug, setPrevActiveSlug] = useState(activeDictionarySlug);
  if (prevActiveSlug !== activeDictionarySlug) {
    setPrevActiveSlug(activeDictionarySlug);
    const target = expandTargetFor(activeDictionarySlug);
    if (!expandedSlugs.has(target)) {
      setExpandedSlugs(new Set(expandedSlugs).add(target));
    }
  }

  // نحفظ الموضوعات الواصلة من الصفحة، فتبقى متاحة بعد الانتقال لقسم آخر
  useEffect(() => {
    const next = { ...(navMemory.subjects.get(collectionSlug) ?? {}) };
    let changed = false;
    for (const d of dictionaries) {
      if (d.subjects.length > 0 && next[d.slug] !== d.subjects) {
        next[d.slug] = d.subjects;
        changed = true;
      }
    }
    if (changed) navMemory.subjects.set(collectionSlug, next);
  }, [dictionaries, collectionSlug]);

  // استرجاع موضع السكرول عند التركيب (قبل الرسم). إن لم يوجد موضع محفوظ
  // نُظهر الدعاء النشط في منتصف القائمة. نُعيد التطبيق في الإطار التالي لأن
  // الارتفاع قد يستقر بعد الرسم الأول، ونتجاهل أحداث scroll أثناء ذلك.
  useIsoLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const saved = navMemory.scrollTop.get(collectionSlug);
    if (saved !== undefined) {
      restoringRef.current = true;
      el.scrollTop = saved;
      const id = requestAnimationFrame(() => {
        el.scrollTop = saved;
        restoringRef.current = false;
      });
      return () => {
        cancelAnimationFrame(id);
        restoringRef.current = false;
      };
    }

    const item = el.querySelector('[aria-current="page"]');
    if (item) {
      const delta =
        item.getBoundingClientRect().top - el.getBoundingClientRect().top;
      el.scrollTop += delta - el.clientHeight / 2;
    }
  }, [collectionSlug]);

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
      navMemory.expanded.set(collectionSlug, next);
      return next;
    });

    const needsFetch =
      dictionary.subjects.length === 0 &&
      dictionary.subjectCount > 0 &&
      !pickSubjects(dictionary, fetchedSubjects, collectionSlug);
    if (willExpand && needsFetch) loadSubjects(dictionary);
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
        ref={navRef}
        onScroll={(e) => {
          if (restoringRef.current) return;
          navMemory.scrollTop.set(collectionSlug, e.currentTarget.scrollTop);
        }}
        className="flex-1 overflow-y-auto p-3 space-y-1.5 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {topLevelDictionaries.map((dictionary) => {
          const isExpanded = expandedSlugs.has(dictionary.slug);
          const isActive = dictionary.slug === activeDictionarySlug;
          const subjects = pickSubjects(
            dictionary,
            fetchedSubjects,
            collectionSlug,
          );
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

              {dictionary.slug === PINNED_PARENT_SLUG && isExpanded && (
                <PinnedChildren
                  dictionaries={pinnedChildren}
                  collectionSlug={collectionSlug}
                  pathname={pathname}
                />
              )}

              {isExpanded && !subjects && errors[dictionary.slug] && (
                <div className="mr-9 mt-1 px-3 py-2 text-sm text-red-500">
                  <p>تعذّر تحميل الموضوعات</p>
                  <p className="text-xs opacity-70" dir="ltr">
                    {errors[dictionary.slug]}
                  </p>
                  <button
                    onClick={() => loadSubjects(dictionary)}
                    className="mt-1 underline"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="mr-9 mt-1 flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  جاري التحميل...
                </div>
              )}

              {isExpanded && subjects && subjects.length > 0 && (
                <div className="mr-9 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                  {subjects.map((subject, index) => (
                    <SubjectLink
                      key={subject.slug}
                      subject={subject}
                      position={index + 1}
                      href={libraryPath(
                        collectionSlug,
                        dictionary.slug,
                        subject.slug,
                      )}
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
      scroll={false}
      aria-current={isActive ? "page" : undefined}
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