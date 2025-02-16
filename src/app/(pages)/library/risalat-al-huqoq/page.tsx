import BooklibraryCard from "../components/book-library-card"
import Breadcrumbs from "@/components/breadcrumb"
import RelatedBooks from "../components/related-books"
import ShowcaseSection from "../components/showcase-section"
import SectionCta from "@/components/section-cta"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"

export default async function Page() {
	const libraryBooks = await dataFetcher<Book[]>("library.json")
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: " المكتبة التخصصية", url: "/library" },
					{ name: "رسالة الحقوق", url: "#" },
				]}
			/>

			<div className="m-10">
				<SectionCta
					links={[
						{ label: "الصحيفة كاملة", href: "#" },
						{ label: "معجم الألفاظ", href: "#" },
						{ label: "ما ألحق بها", href: "#" },
					]}
				/>
				<ShowcaseSection
					route="/library/risalat-al-huqoq"
					showcaseBooks={libraryBooks.slice(0, 3)}
				/>
				<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
					{libraryBooks.map((book) => (
						<BooklibraryCard
							route="/library/risalat-al-huqoq"
							key={book.id}
							publication={book}
						/>
					))}
				</div>
				<div className="lg:hidden ">
					<RelatedBooks
						route="/library/risalat-al-huqoq"
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
