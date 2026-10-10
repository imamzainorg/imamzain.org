import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavSubject } from "@/types/imamzain-legacy";
import { libraryPath } from "../_config/paths";
import { toArabicDigits } from "../_lib/arabic-text";

type SubjectNavigationProps = {
  collectionSlug: string;
  dictionarySlug: string;
  currentSubjectSlug: string;
  allSubjects: NavSubject[];
};

const ruleClass = "h-px flex-1 bg-gray-300 dark:bg-zinc-600";

const linkClass =
  "group flex min-h-16 min-w-0 flex-col justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-primary/[0.04] dark:border-zinc-700 dark:hover:border-Muharram_primary/50 dark:hover:bg-Muharram_primary/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const labelRowClass =
  "flex items-center gap-1.5 text-sm font-medium text-primary dark:text-Muharram_primary";

const arrowClass =
  "h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none";

const titleClass =
  "line-clamp-2 text-base font-semibold leading-relaxed text-gray-900 dark:text-gray-50";

export default function SubjectNavigation({
  collectionSlug,
  dictionarySlug,
  currentSubjectSlug,
  allSubjects,
}: SubjectNavigationProps) {
  const currentIndex = allSubjects.findIndex((s) => s.slug === currentSubjectSlug);
  const previous = currentIndex > 0 ? allSubjects[currentIndex - 1] : null;
  const next = currentIndex < allSubjects.length - 1 ? allSubjects[currentIndex + 1] : null;

  if (!previous && !next) return null;

  const hrefTo = (subject: NavSubject) =>
    libraryPath(collectionSlug, dictionarySlug, subject.slug);

  return (
    // pb-24: مساحة تمنع عنصر التحكم العائم من تغطية الروابط عند نهاية الصفحة
    <nav
      aria-label="التنقل بين المواضيع"
      className="mx-auto w-full max-w-3xl pb-24"
    >
      <div aria-hidden="true" className="flex items-center gap-4">
        <span className={ruleClass} />
        <span className="text-sm font-medium tabular-nums text-gray-600 dark:text-gray-300">
          {toArabicDigits(currentIndex + 1)} / {toArabicDigits(allSubjects.length)}
        </span>
        <span className={ruleClass} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={hrefTo(previous)}
            aria-label={`الموضوع السابق: ${previous.title}`}
            className={`${linkClass} items-start text-right`}
          >
            <span className={labelRowClass}>
              <ChevronRight
                aria-hidden="true"
                className={`${arrowClass} motion-safe:group-hover:translate-x-0.5`}
              />
              السابق
            </span>
            <span className={titleClass}>{previous.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={hrefTo(next)}
            aria-label={`الموضوع التالي: ${next.title}`}
            className={`${linkClass} items-end text-left sm:col-start-2`}
          >
            <span className={labelRowClass}>
              التالي
              <ChevronLeft
                aria-hidden="true"
                className={`${arrowClass} motion-safe:group-hover:-translate-x-0.5`}
              />
            </span>
            <span className={titleClass}>{next.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}