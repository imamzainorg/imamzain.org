import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getDictionary,
  getFullDictionaries,
  getSubject,
} from "@/lib/imamzain-legacy-loader";
import SubjectNavigation from "@/app/library/_components/subject-navigation";
import SubjectView from "@/app/library/_components/subject-view";
import { collections } from "@/app/library/_config/collections";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(collections).flatMap((collectionSlug) =>
    getFullDictionaries(collectionSlug).flatMap((dictionary) =>
      dictionary.subjects.map((subject) => ({
        collectionSlug,
        dictionarySlug: dictionary.slug,
        subjectSlug: subject.slug,
      })),
    ),
  );
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{
    collectionSlug: string;
    dictionarySlug: string;
    subjectSlug: string;
  }>;
}) {
  const { collectionSlug, dictionarySlug, subjectSlug } = await params;

  if (!collections[collectionSlug]) notFound();

  const subject = getSubject(collectionSlug, dictionarySlug, subjectSlug);
  if (!subject) notFound();

  const dictionary = getDictionary(collectionSlug, dictionarySlug);

  return (
    <>
      <div className="w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-Muharram_primary mb-3">
          {subject.title}
        </h1>
      </div>

      <div className="w-1/2 h-0.5 mx-auto bg-gradient-to-l from-transparent via-primary/40 dark:via-Muharram_primary/40 to-transparent" />

      {/* SubjectView يقرأ ?highlight= عبر useSearchParams، والـ Suspense يُبقي الصفحة مُولَّدة ثابتة */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="mx-auto h-72 w-full max-w-3xl rounded-2xl bg-gray-100/60 dark:bg-zinc-900/40"
          />
        }
      >
        <SubjectView subject={subject} />
      </Suspense>

      <SubjectNavigation
        collectionSlug={collectionSlug}
        dictionarySlug={dictionarySlug}
        currentSubjectSlug={subjectSlug}
        allSubjects={dictionary?.subjects ?? []}
      />
    </>
  );
}
