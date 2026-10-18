"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import BookTile from "@/components/book-tile"
import { SectionTitle } from "@/components/brand"
import type { Book } from "@/types/book"

const arrow =
	"flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-Muharram_primary/40 dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white"

// A row of book tiles (the ones on the home page shelf) that scrolls sideways, with arrows.
export default function BookCarousel({ title, books, route }: { title: string; books: Book[]; route: string }) {
	const list = useRef<HTMLUListElement>(null)
	// The page is right to left, so the next books lie to the left (a negative scroll offset).
	const scroll = (direction: 1 | -1) =>
		list.current?.scrollBy({ left: -direction * list.current.clientWidth * 0.8, behavior: "smooth" })

	return (
		<section>
			<SectionTitle
				title={title}
				className="mb-10"
				action={
					<div className="flex gap-2">
						<button type="button" aria-label="السابق" onClick={() => scroll(-1)} className={arrow}>
							<ArrowRight className="h-5 w-5" />
						</button>
						<button type="button" aria-label="التالي" onClick={() => scroll(1)} className={arrow}>
							<ArrowLeft className="h-5 w-5" />
						</button>
					</div>
				}
			/>
			<ul ref={list} className="-mx-2 flex snap-x gap-6 overflow-x-auto px-2 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{books.map((book) => (
					<li key={book.id} className="w-44 shrink-0 snap-start">
						<BookTile route={route} publication={book} />
					</li>
				))}
			</ul>
		</section>
	)
}
