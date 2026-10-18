import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types/book"

// A book as a cover standing on the page with its title, author and size beneath. Used by the
// publications pages and the home page shelf.
export default function BookTile({
	publication,
	route = "",
	priority = false,
	as: Heading = "h3",
}: {
	publication: Book
	route?: string
	priority?: boolean
	// The heading level of the title: h2 when the list sits directly under the page title.
	as?: "h2" | "h3"
}) {
	const author = Array.isArray(publication.author)
		? publication.author.join("، ")
		: publication.author?.trim() || ""

	const parts = publication.parts > 1 ? ` · ${publication.parts} أجزاء` : ""

	return (
		<Link href={`${route.replace(/\/+$/, "")}/${publication.slug}`} className="group block text-center" prefetch={false}>
			<div className="relative mx-auto aspect-[3/4] w-full max-w-[11rem]">
				{publication.image ? (
					<Image
						src={publication.image}
						fill
						sizes="176px"
						className="object-contain object-bottom drop-shadow-[0_14px_16px_rgba(0,0,0,0.28)] transition-transform duration-300 group-hover:-translate-y-2"
						alt={`غلاف كتاب ${publication.title}`}
						priority={priority}
						loading={priority ? "eager" : "lazy"}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100">
						<span className="px-2 text-sm text-gray-500">لا يوجد غلاف</span>
					</div>
				)}
			</div>

			<Heading className="mt-5 line-clamp-2 text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-primary dark:group-hover:text-Muharram_primary">
				{publication.title}
			</Heading>
			{author && (
				<p className="mt-1 line-clamp-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
					{author}
				</p>
			)}
			<p className="mt-1 text-sm text-gray-500">
				{publication.pages} صفحة{parts}
			</p>
		</Link>
	)
}
