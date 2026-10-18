import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/brand";
import { getDictionaries, getDictionary } from "@/lib/imamzain-legacy-loader";
import { collections } from "@/app/library/_config/collections";
import { libraryPath } from "@/app/library/_config/paths";
import { toArabicDigits } from "@/app/library/_lib/arabic-text";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(collections).flatMap((collectionSlug) =>
    getDictionaries(collectionSlug).map((dictionary) => ({
      collectionSlug,
      dictionarySlug: dictionary.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string; dictionarySlug: string }>;
}): Promise<Metadata> {
  const { collectionSlug, dictionarySlug } = await params;
  const config = collections[collectionSlug];
  const dictionary = getDictionary(collectionSlug, dictionarySlug);
  if (!config || !dictionary) return {};

  const title = `${dictionary.title} | ${config.title}`;
  const description = `${dictionary.title} من ${config.title} للإمام زين العابدين عليه السلام، ${dictionary.subjects.length} موضوعاً للقراءة والاستماع.`;
  const url = libraryPath(collectionSlug, dictionarySlug);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title, description, url, images: ["/og/default.jpg"] },
    twitter: { card: "summary_large_image", title, description, images: ["/og/default.jpg"] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ collectionSlug: string; dictionarySlug: string }>;
}) {
  const { collectionSlug, dictionarySlug } = await params;
  const dictionary = getDictionary(collectionSlug, dictionarySlug);

  return (
    <>
      {dictionary && (
        <SectionTitle
          as="h1"
          title={dictionary.title}
          text={`${collections[collectionSlug]?.title}: ${dictionary.subjects.length} موضوعاً`}
          className="mb-0"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {dictionary?.subjects.map((subject, index) => (
        <Link
          key={subject.id}
          href={libraryPath(collectionSlug, dictionary.slug, subject.slug)}
          id={subject.slug}
          className="group relative w-full h-full rounded-2xl border border-primary/10 dark:border-white/[0.06] bg-white dark:bg-Muharram_secondary/[0.07] px-4 py-4 sm:px-5 flex items-center justify-between gap-3 transition-colors duration-500 hover:border-primary/50 dark:hover:border-Muharram_primary/20"
        >
          <span className="absolute right-0 top-3 bottom-3 w-[3px] rounded-full bg-primary/20 dark:bg-Muharram_primary/20 group-hover:bg-primary/60 dark:group-hover:bg-Muharram_primary/60 transition-colors duration-500" />

          <div className="flex flex-col gap-1.5 min-w-0 pr-3">
            <h2 className="text-subtitle text-gray-800 dark:text-Muharram_primary/90 leading-7 line-clamp-2 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors duration-500">
              {subject.title}
            </h2>
            <span className="h-px w-4 bg-primary/25 dark:bg-Muharram_primary/25 group-hover:w-6 transition-all duration-500" />
          </div>

          <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-primary/15 dark:border-Muharram_primary/15 text-base font-mono tabular-nums text-gray-500 dark:text-Muharram_secondary/80 group-hover:border-primary/50 dark:group-hover:border-Muharram_primary/50 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors duration-500 font-semibold">
            {toArabicDigits(index + 1)}
          </span>
        </Link>
      ))}
      </div>
    </>
  );
}
