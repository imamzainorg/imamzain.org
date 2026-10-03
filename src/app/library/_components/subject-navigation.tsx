import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const card =
  "group flex items-center gap-4 rounded-2xl border-2 border-primary/20 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg dark:border-Muharram_primary/25 dark:hover:border-Muharram_primary";
const tile =
  "grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:bg-Muharram_primary/10 dark:text-Muharram_primary dark:group-hover:bg-Muharram_primary";

type SubjectNavigationProps = {
  collectionSlug: string;
  dictionarySlug: string;
  currentSubjectSlug: string;
  allSubjects: Array<{ slug: string; title: string; id: string }>;
};

export default function SubjectNavigation({
  collectionSlug,
  dictionarySlug,
  currentSubjectSlug,
  allSubjects,
}: SubjectNavigationProps) {
  const currentIndex = allSubjects.findIndex(
    (s) => s.slug === currentSubjectSlug,
  );
  const prevSubject = currentIndex > 0 ? allSubjects[currentIndex - 1] : null;
  const nextSubject =
    currentIndex < allSubjects.length - 1
      ? allSubjects[currentIndex + 1]
      : null;

  if (!prevSubject && !nextSubject) return null;

  return (
    <nav
      aria-label="التنقل بين المواضيع"
      className="mt-16 grid grid-cols-1 gap-4 border-t-2 border-dashed border-secondary/40 pt-8 dark:border-Muharram_secondary/40 md:grid-cols-2"
    >
      {prevSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${prevSubject.slug}`}
          className={card}
        >
          <span className={tile}>
            <ChevronRight className="size-6" />
          </span>
          <div className="min-w-0 flex-1 text-right">
            <div className="mb-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
              الموضوع السابق
            </div>
            <div className="line-clamp-2 text-lg font-bold leading-8 text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-Muharram_primary">
              {prevSubject.title}
            </div>
            <div className="mt-0.5 text-sm text-gray-500">رقم {prevSubject.id}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${nextSubject.slug}`}
          className={card}
        >
          <div className="min-w-0 flex-1 text-right">
            <div className="mb-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
              الموضوع التالي
            </div>
            <div className="line-clamp-2 text-lg font-bold leading-8 text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-Muharram_primary">
              {nextSubject.title}
            </div>
            <div className="mt-0.5 text-sm text-gray-500">رقم {nextSubject.id}</div>
          </div>
          <span className={tile}>
            <ChevronLeft className="size-6" />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
