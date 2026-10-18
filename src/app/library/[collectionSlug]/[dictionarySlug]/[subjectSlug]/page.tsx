import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  getDictionary,
  getFullDictionaries,
  getSubject,
} from "@/lib/imamzain-legacy-loader";
import { SectionTitle } from "@/components/brand";
import { libraryPath } from "@/app/library/_config/paths";
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

const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    collectionSlug: string;
    dictionarySlug: string;
    subjectSlug: string;
  }>;
}): Promise<Metadata> {
  const { collectionSlug, dictionarySlug, subjectSlug } = await params;
  const config = collections[collectionSlug];
  const dictionary = getDictionary(collectionSlug, dictionarySlug);
  const subject = getSubject(collectionSlug, dictionarySlug, subjectSlug);
  if (!config || !dictionary || !subject) return {};

  const opening = plainText(subject.phrases[0]?.content ?? "").slice(0, 150);
  const description = opening
    ? `${subject.title}، ${dictionary.title}: ${opening}...`
    : `${subject.title} من ${dictionary.title} في ${config.title} للإمام زين العابدين عليه السلام.`;
  const title = `${subject.title} | ${config.title}`;
  const url = libraryPath(collectionSlug, dictionarySlug, subjectSlug);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, images: ["/og/default.jpg"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og/default.jpg"] },
  };
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
      <SectionTitle as="h1" title={subject.title} text={dictionary?.title} className="mb-0" />

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
