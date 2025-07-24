import Breadcrumbs from "@/components/breadcrumb"
import { notFound } from "next/navigation"
import { Book } from "@/types/book"
import BookCard from "@/components/book-card"
import BooklibraryCard from "../../_components/book-library-card"
import { getBooksFromFile } from "@/lib/getBooksFromFile"

// لتوليد المسارات الثابتة
export const dynamicParams = false

export async function generateStaticParams() {
	const books = await getBooksFromFile()
	return books.map((book) => ({ slug: book.slug }))
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	let LibraryBooks: Book[] = []

	try {
		LibraryBooks = await getBooksFromFile()
	} catch (error) {
		console.error("فشل في جلب الكتب:", error)
		return <div>حدث خطأ أثناء تحميل الكتب</div>
	}

	const book = LibraryBooks.find((book) => book.slug === slug)

	if (!book) notFound()

	return (
		<div className="space-y-10 my-8">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "المكتبة", url: "/library" },
					{ name: "رسالة الحقوق", url: "/library/risalat-al-huqoq" },
					{ name: book.title, url: "#" },
				]}
			/>

			<div className="space-y-10 my-8">
				<BookCard
					key={book.id}
					publication={book}
					publications={LibraryBooks}
				/>

				<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
					كتب ذات صلة
				</h2>

				<div className="bg-secondary dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
					{LibraryBooks.filter((b) => b.slug !== book.slug)
						.slice(0, 2)
						.map((libraryBook) => (
							<BooklibraryCard
								route="/library/risalat-al-huqoq"
								key={libraryBook.id}
								publication={libraryBook}
								downloadable
							/>
						))}
				</div>
			</div>
		</div>
	)
}
