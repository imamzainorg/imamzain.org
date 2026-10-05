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

const linkClass =
  "group flex min-h-12 min-w-0 max-w-full items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

const arrowClass =
  "h-5 w-5 shrink-0 text-gray-400 transition-colors group-hover:text-primary dark:text-gray-500 dark:group-hover:text-Muharram_primary";

const labelClass =
  "text-[0.8rem] text-gray-500 transition-colors group-hover:text-primary dark:text-gray-400 dark:group-hover:text-Muharram_primary";

// على الأجهزة التي تدعم التمرير يظهر العنوان عند hover/focus، وعلى اللمس يظهر دائمًا
const titleClass =
  "line-clamp-1 text-sm font-medium text-gray-900 transition-opacity duration-200 dark:text-gray-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100";

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
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-gray-200/80 pt-4 dark:border-zinc-700/70">
        {previous ? (
          <Link
            href={hrefTo(previous)}
            aria-label={`الموضوع السابق: ${previous.title}`}
            className={`${linkClass} justify-self-start`}
          >
            <ChevronRight aria-hidden="true" className={arrowClass} />
            <span className="min-w-0 text-right">
              <span className={`block ${labelClass}`}>السابق</span>
              <span className={`block ${titleClass}`}>{previous.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        <span
          aria-hidden="true"
          className="text-xs tabular-nums text-gray-400 dark:text-gray-500"
        >
          {toArabicDigits(currentIndex + 1)} / {toArabicDigits(allSubjects.length)}
        </span>

        {next ? (
          <Link
            href={hrefTo(next)}
            aria-label={`الموضوع التالي: ${next.title}`}
            className={`${linkClass} justify-self-end`}
          >
            <span className="min-w-0 text-left">
              <span className={`block ${labelClass}`}>التالي</span>
              <span className={`block ${titleClass}`}>{next.title}</span>
            </span>
            <ChevronLeft aria-hidden="true" className={arrowClass} />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
