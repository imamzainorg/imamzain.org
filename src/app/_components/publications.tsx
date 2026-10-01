import { MoreLink, SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import BooklibraryCard from "@/app/library/_components/book-library-card"
import type { Book } from "@/types/book"

// Always two full rows. The grid has 2, 3, 4 or 5 columns depending on width, so showing
// 4, 6, 8 or 10 covers keeps both rows full.
function visibility(index: number) {
	if (index < 4) return ""
	if (index < 6) return "hidden md:block"
	if (index < 8) return "hidden lg:block"
	return "hidden xl:block"
}

// `publications` arrives already filtered, sorted and deduped by the server page.
export default function Publications({ publications }: { publications: Book[] }) {
	return (
		<section className="container pt-24">
			<SectionTitle
				title="الإصدارات"
				className="mb-10"
				action={<MoreLink href="/publications">أرشيف الإصدارات</MoreLink>}
			/>

			<ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{publications.map((book, i) => (
					<li key={book.id} className={visibility(i)}>
						<Reveal y={30} delay={(i % 5) * 0.08}>
							<BooklibraryCard route="/publications" publication={book} />
						</Reveal>
					</li>
				))}
			</ul>
		</section>
	)
}
