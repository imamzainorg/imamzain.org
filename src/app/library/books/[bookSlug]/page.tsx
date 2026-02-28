import Breadcrumbs from "@/components/breadcrumb"
import { redirect } from "next/navigation"
import { Book } from "@/types/book"
import { dataFetcher } from "@/lib/dataFetcher"

import BooklibraryCard from "@/app/library/_components/book-library-card"
import BookCard from "@/components/book-card"

// ---------------------------------------------
// دالة shuffle نقية
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}
// ---------------------------------------------

export default async function Page({ params }: { params: Promise<{ bookSlug: string }> }) {
	const { bookSlug } = await params
	const libraryBooks = await dataFetcher<Book[]>("books.json")
	const book: Book | undefined = libraryBooks.find((item) => item.slug === bookSlug)
	if (!book) redirect("/404")

	// كتب ذات صلة
	const relatedBooks = libraryBooks
		.filter((item) => item.id !== book.id)
		.map((item) => {
			let score = 0
			if (item.printHouse?.trim().toLowerCase() === book.printHouse?.trim().toLowerCase()) score += 5
			if (item.author?.trim().toLowerCase() === book.author?.trim().toLowerCase()) score += 4
			if (item.otherNames?.some((name) => book.otherNames?.includes(name))) score += 3
			if (item.language === book.language) score += 1
			return { ...item, score }
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 2)

	// كتب عشوائية
	const excludedIds = [book.id, ...relatedBooks.map((b) => b.id)]
	const remainingBooks = libraryBooks.filter((item) => !excludedIds.includes(item.id))
	const randomBooks = shuffleArray(remainingBooks).slice(0, 2)

	const showcaseBooks = [...relatedBooks, ...randomBooks]

	return (
		<div className="space-y-10 my-8">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: book.title, url: "#" },
				]}
			/>

			<BookCard key={book.id} publication={book} publications={libraryBooks} />

			<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
				كتب ذات صلة 
			</h2>

			<div className="bg-secondary md:container dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
				{showcaseBooks.map((item) => (
					<BooklibraryCard key={item.id} route="/library/books/" publication={item} downloadable />
				))}
			</div>
		</div>
	)
}
