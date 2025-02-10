"use client"

import BooklibraryCard from "../components/book-library-card"
import Breadcrumbs from "@/components/breadcrumb"
import RelatedBooks from "../components/related-books"
import { libraryBooks } from "@/lib/data"
import ShowcaseSection from "../components/showcase-section"
import SectionCta from "@/components/section-cta"

export default function Page() {
	return (
		<div className="">
			<div className="m-10">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: " المكتبة التخصصية", url: "/library" },
						{ name: "الصحيفة السجادية", url: "#" },
					]}
				/>

				<SectionCta
					links={[
						{ label: "الصحيفة كاملة", href: "#" },
						{ label: "معجم الألفاظ", href: "#" },
						{ label: "ما ألحق بها", href: "#" },
					]}
				/>
				<ShowcaseSection
					route="/library/al-sahifa-al-sajjadiyya"
					showcaseBooks={libraryBooks.slice(0, 3)}
				/>
				<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
					{libraryBooks.map((book) => (
						<BooklibraryCard key={book.id} publication={book} />
					))}
				</div>
				<div className="lg:hidden ">
					<RelatedBooks
						route="/library/al-sahifa-al-sajjadiyya"
						relatedBooks={libraryBooks.slice(1, 3)}
					/>
				</div>
				<div className="my-4">
					<SectionCta
						links={[
							{ label: "الصحيفة كاملة", href: "#" },
							{ label: "معجم الفاظ الصحيفة", href: "#" },
							{ label: "ما ألحق بها", href: "#" },
						]}
					/>
				</div>
			</div>
		</div>
	)
}
