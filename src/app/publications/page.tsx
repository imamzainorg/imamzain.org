import Breadcrumbs from "@/components/breadcrumb"
import { Book } from "@/types/book"
import booksData from "@/data/books.json"
import PublicationsClient from "./components/publications-client"

export const revalidate = 300

// Dedupe to one entry per series (or one per non-series book).
// Computed once per revalidation window since booksData is static at build time.
function dedupeSeries(books: Book[]): Book[] {
	const filteredByCategory = books.filter((book) =>
		book.category?.includes("الإصدارات"),
	)

	const uniqueSeriesMap = new Map<string, Book>()

	filteredByCategory.forEach((book) => {
		if (book.series && book.totalParts > 1) {
			if (!uniqueSeriesMap.has(book.series) && book.partNumber === 1) {
				uniqueSeriesMap.set(book.series, book)
			}
		} else {
			uniqueSeriesMap.set(`${book.series ?? book.id}`, book)
		}
	})

	return Array.from(uniqueSeriesMap.values()).sort(
		(a, b) => b.id - a.id,
	)
}

export default function PublicationsPage() {
	const publications = dedupeSeries(booksData as Book[])

	return (
		<div className="min-h-screen">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الإصدارات", url: "/publications" },
				]}
			/>
			<PublicationsClient publications={publications} />
		</div>
	)
}
