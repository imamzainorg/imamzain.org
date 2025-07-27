import Breadcrumbs from "@/components/breadcrumb"
import { redirect } from "next/navigation"
import { Book } from "@/types/book"

import { dataFetcher } from "@/lib/dataFetcher"

import BooklibraryCard from "../_components/book-library-card"
import BookCard from "@/components/book-card"
export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	const libraryBooks = await dataFetcher<Book[]>("publications.json");

	const book: Book | undefined = libraryBooks.find(
		(book) => book.slug === slug,
	)

	if (!book) {
		return redirect("/404")
	}

	return (
		<div className="space-y-10 my-8">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: book.title, url: "#" },
				]}
			/>
			{/* الكتاب المقصود */}
		
			
			<BookCard key={book.id} publication={book} publications={libraryBooks} />
			{/* كتب ذات صلة */}
			<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
				كتب ذات صلة
			</h2>
			<div className="bg-secondary dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
				{libraryBooks.slice(0, 2).map((book) => (
					<BooklibraryCard
						route="/library"
						key={book.id}
						publication={book}
						downloadable
					/>
				))}
			</div>
		</div>
	)
}
