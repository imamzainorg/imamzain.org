import { getDictionaries, getDictionary } from "@/lib/imamzain-legacy-loader";
import { collections } from "@/app/library/_config/collections";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(collections).flatMap((collectionSlug) =>
    getDictionaries(collectionSlug).map((dictionary) => ({
      collectionSlug,
      dictionarySlug: dictionary.slug,
    })),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ collectionSlug: string; dictionarySlug: string }>;
}) {
  const { collectionSlug, dictionarySlug } = await params;
  const activeDictionary = getDictionary(collectionSlug, dictionarySlug);

  return (
    <ol className="grid gap-x-12 md:grid-cols-2">
      {activeDictionary?.subjects.map((subject) => (
        <li key={subject.id}>
          <Link
            href={`/library/${collectionSlug}/${activeDictionary.slug}/${subject.slug}`}
            id={subject.slug}
            className="group flex items-start gap-4 border-b border-dashed border-secondary/40 py-5"
          >
            <span className="w-10 shrink-0 pt-0.5 text-xl font-bold text-secondary dark:text-Muharram_secondary">
              {subject.id}
            </span>
            <span className="flex flex-1 items-start gap-2 text-lg leading-8 text-gray-800 transition-colors group-hover:text-primary dark:group-hover:text-Muharram_primary md:text-xl md:leading-9">
              {subject.title}
              <ArrowLeft className="mt-2 h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 dark:text-Muharram_primary" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
