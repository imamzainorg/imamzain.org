import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pagerLink } from "@/components/brand";

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
      className="mt-20 flex flex-col gap-4 sm:flex-row"
    >
      {prevSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${prevSubject.slug}`}
          className={pagerLink}
        >
          <span className="inline-flex items-center gap-1 text-sm text-gray-500">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            الموضوع السابق · رقم {prevSubject.id}
          </span>
          <span className="line-clamp-2 text-lg font-bold leading-8 text-primary dark:text-Muharram_primary">
            {prevSubject.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${nextSubject.slug}`}
          className={`${pagerLink} items-end text-left`}
        >
          <span className="inline-flex items-center gap-1 text-sm text-gray-500">
            الموضوع التالي · رقم {nextSubject.id}
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </span>
          <span className="line-clamp-2 text-lg font-bold leading-8 text-primary dark:text-Muharram_primary">
            {nextSubject.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
