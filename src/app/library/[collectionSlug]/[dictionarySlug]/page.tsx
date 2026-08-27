import { getDictionaries, getDictionary } from "@/lib/imamzain-legacy-loader"
import { collections } from "@/app/library/_config/collections"
import Link from "next/link"

export const dynamicParams = false

export function generateStaticParams() {
	return Object.keys(collections).flatMap((collectionSlug) =>
		getDictionaries(collectionSlug).map((dictionary) => ({
			collectionSlug,
			dictionarySlug: dictionary.slug,
		})),
	)
}

export default async function Page({
	params,
}: {
	params: Promise<{ collectionSlug: string; dictionarySlug: string }>
}) {
	const { collectionSlug, dictionarySlug } = await params
	const activeDictionary = getDictionary(collectionSlug, dictionarySlug)

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
			{activeDictionary?.subjects.map((subject) => (
				<Link
					key={subject.id}
					href={`/library/${collectionSlug}/${activeDictionary.slug}/${subject.slug}`}
					id={subject.slug}
					className="group relative w-full h-full rounded-2xl border border-primary/15 dark:border-white/10 bg-white/70 dark:bg-Muharram_secondary/15 backdrop-blur-md p-4 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/50 dark:hover:border-Muharram_secondary/50 overflow-hidden"
				>
					{/* Ambient hover glow */}
					<div className=" absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-Muharram_primary/5  dark:to-Muharram_primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />

					{/* Content */}
					<div className="relative z-10 flex flex-col gap-1 max-w-[85%]">
						<h2 className=" text-subtitle font-semibold text-gray-900 dark:text-Muharram_primary group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors line-clamp-2 ">
							{subject.title}
						</h2>

						<span className="text-xs text-gray-500 dark:text-Muharram_secondary">
							{subject.phrases.length.toLocaleString("ar-EG")} عبارة
						</span>
					</div>

					{/* ID Badge */}
					<div className=" relative z-10 min-w-[2.5rem] h-10 px-2 flex items-center justify-center rounded-full bg-primary/5 dark:bg-Muharram_secondary/10 border border-primary/20 dark:border-Muharram_secondary/80 text-primary dark:text-Muharram_primary font-mono text-sm font-semibold ">
						{subject.id}
					</div>
				</Link>
			))}
		</div>
	)
}
