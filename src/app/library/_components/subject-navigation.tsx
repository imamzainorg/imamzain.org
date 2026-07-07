import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t-2 border-gray-100 dark:border-zinc-700">
      {prevSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${prevSubject.slug}`}
          className="group relative overflow-hidden flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-Muharram_secondary/30 dark:to-Muharram_secondary/60 border-2 border-gray-100 dark:border-zinc-700 hover:border-primary dark:hover:border-Muharram_primary hover:shadow-lg transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent dark:from-Muharram_primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 dark:bg-Muharram_primary/10 group-hover:bg-primary/20 dark:group-hover:bg-Muharram_primary/20 flex items-center justify-center transition-colors">
            <ChevronRight className="w-6 h-6 text-primary dark:text-Muharram_primary" />
          </div>

          <div className="relative flex-1 text-right min-w-0">
            <div className="text-xs font-medium text-gray-500 dark:text-black mb-1">
              الموضوع السابق
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors truncate">
              {prevSubject.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-black mt-1">
              رقم {prevSubject.id}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Subject */}
      {nextSubject ? (
        <Link
          href={`/library/${collectionSlug}/${dictionarySlug}/${nextSubject.slug}`}
          className="group relative overflow-hidden flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-Muharram_secondary/30 dark:to-Muharram_secondary/60 border-2 border-gray-100 dark:border-zinc-700 hover:border-primary dark:hover:border-Muharram_primary hover:shadow-lg transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent dark:from-Muharram_primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex-1 text-left min-w-0">
            <div className="text-xs font-medium text-gray-500 dark:text-black mb-1">
              الموضوع التالي
            </div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors truncate">
              {nextSubject.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-black mt-1">
              رقم {nextSubject.id}
            </div>
          </div>

          <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 dark:bg-Muharram_primary/10 group-hover:bg-primary/20 dark:group-hover:bg-Muharram_primary/20 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-6 h-6 text-primary dark:text-Muharram_primary" />
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
