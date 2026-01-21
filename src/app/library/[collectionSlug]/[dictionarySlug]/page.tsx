import { getDictionary } from "@/lib/imamzain-legacy-loader";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ collectionSlug: string; dictionarySlug: string }>;
}) {
  const { collectionSlug, dictionarySlug } = await params;
  const activeDictionary = getDictionary(collectionSlug, dictionarySlug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {activeDictionary?.subjects.map((subject) => (
        <Link
          key={subject.id}
          href={`/library/${collectionSlug}/${activeDictionary.slug}/${subject.slug}`}
          id={subject?.slug}
          className="group relative w-full h-full overflow-hidden bg-white bg-opacity-60 border cursor-pointer rounded-xl flex justify-between items-center p-3 border-primary/20 hover:border-primary/80 dark:hover:border-Muharram_secondary/60 shadow-md hover:shadow-xl duration-300"
        >
   

          <div className="w-5/6 flex flex-col gap-1 z-10">
            <h2 className=" text-note  leading-10 font-semibold pr-2 text-gray-800 group-hover:text-primary dark:group-hover:text-Muharram_primary duration-300">
              {subject.title}
            </h2>
          </div>

          <div className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-primary dark:text-Muharram_primary dark:border-Muharram_secondary/30 border border-primary/30 shadow-sm z-10">
            <span className="text-sm md:text-base font-bold">{subject.id}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
