import { getDictionary } from "@/lib/imamzain-legacy-loader"
import Link from "next/link"

export default async function Page({
	params,
}: {
	params: Promise<{ collectionSlug: string; dictionarySlug: string }>
}) {
	const { collectionSlug, dictionarySlug } = await params
	const activeDictionary = getDictionary(collectionSlug, dictionarySlug)

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
			{activeDictionary?.subjects.map((subject) => (
				<Link
					key={subject.id}
					href={`/library/${collectionSlug}/${activeDictionary.slug}/${subject.slug}`}
					id={subject?.slug}
					className="group relative w-full h-full overflow-hidden bg-white bg-opacity-60 border cursor-pointer rounded-xl flex justify-between items-center p-3 border-primary/20 hover:border-primary/80 dark:hover:border-Muharram_secondary/60 shadow-md hover:shadow-xl duration-300"
				>
					<div className="absolute -top-10 -right-10 z-0">
						<div className="relative w-36 h-36">
							<div className="absolute w-full h-full rounded-full dark:from-Muharram_secondary/30 dark:to-Muharram_primary/10 blur-2xl opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
							<div className="absolute w-20 h-20 right-4 top-4 rounded-full bg-primary/20 dark:bg-Muharram_secondary/20 blur-xl opacity-40 dark:opacity-40 group-hover:opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700 dark:group-hover:opacity-60 dark:group-hover:translate-x-1 dark:group-hover:-translate-y-1 dark:transition-all dark:duration-700" />
						</div>
					</div>

					<div className="w-5/6 flex flex-col gap-1 z-10">
						<h2 className="font-semibold text-base pr-2 text-gray-800 group-hover:text-primary dark:group-hover:text-Muharram_primary duration-300">
							{subject.title}
						</h2>
						<p className="text-xs text-gray-500 hidden sm:block pr-2">
							{subject.phrases.length} عبارات
						</p>
					</div>

					<div className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-primary dark:text-Muharram_primary dark:border-Muharram_secondary/30 border border-primary/30 shadow-sm z-10">
						<span className="text-sm md:text-base font-bold">
							{subject.id}
						</span>
					</div>
				</Link>
			))}
		</div>
	)
}