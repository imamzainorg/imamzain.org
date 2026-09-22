import { getDictionaries, getDictionary } from "@/lib/imamzain-legacy-loader";
import { collections } from "@/app/library/_config/collections";
import Link from "next/link";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
      {activeDictionary?.subjects.map((subject) => (
    <Link
  key={subject.id}
  href={`/library/${collectionSlug}/${activeDictionary.slug}/${subject.slug}`}
  id={subject.slug}
  className="group relative w-full h-full rounded-2xl border border-primary/10 dark:border-white/[0.06] bg-white dark:bg-Muharram_secondary/[0.07] px-4 py-4 sm:px-5 flex items-center justify-between gap-3 transition-colors duration-500 hover:border-primary/50 dark:hover:border-Muharram_primary/20"
>
  {/* خط جانبي رفيع — يزداد وضوحًا عند التمرير */}
  <span className="absolute right-0 top-3 bottom-3 w-[3px] rounded-full bg-primary/20 dark:bg-Muharram_primary/20 group-hover:bg-primary/60 dark:group-hover:bg-Muharram_primary/60 transition-colors duration-500" />

  <div className="flex flex-col gap-1.5 min-w-0 pr-3">
    <h2 className="text-subtitle text-gray-800 dark:text-Muharram_primary/90 leading-7 line-clamp-2 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors duration-500">
      {subject.title}
    </h2>
    <span className="h-px w-4 bg-primary/25 dark:bg-Muharram_primary/25 group-hover:w-6 transition-all duration-500" />
  </div>

  {/* دائرة رقم الموضوع */}
  <span
    className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-primary/15 dark:border-Muharram_primary/15
               text-base font-mono tabular-nums text-gray-500 dark:text-Muharram_secondary/80
               group-hover:border-primary/50 dark:group-hover:border-Muharram_primary/50
               group-hover:text-primary dark:group-hover:text-Muharram_primary
               transition-colors duration-500 font-semibold"
  >
    {subject.id}
  </span>
</Link>
      ))}
    </div>
  );
}
