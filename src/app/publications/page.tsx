import type { Metadata } from "next"
import Breadcrumbs from "@/components/breadcrumb"
import { Book } from "@/types/book"
import booksData from "@/data/books.json"
import PublicationsClient from "./components/publications-client"

export const revalidate = 300

export const metadata: Metadata = {
	title: "إصدارات المؤسسة وشروح الصحيفة السجادية",
	description:
		"تصفّح إصدارات مؤسسة الإمام زين العابدين عليه السلام: شروح الصحيفة السجادية، ودراسات رسالة الحقوق، وكتب في سيرة الإمام السجاد وتراثه الفكري والتربوي.",
	keywords: [
		"إصدارات الإمام زين العابدين",
		"كتب الإمام السجاد عليه السلام",
		"شروح الصحيفة السجادية",
		"الفرائد الطريفة في شرح الصحيفة",
		"فوائد رياض السالكين",
		"دراسات رسالة الحقوق",
		"سيرة الإمام السجاد عليه السلام",
		"تراث الإمام السجاد الفكري والتربوي",
	],
	alternates: { canonical: "/publications" },
	openGraph: {
		title: "إصدارات مؤسسة الإمام زين العابدين عليه السلام وشروح الصحيفة السجادية",
		description:
			"قائمة بإصدارات المؤسسة من شروح الصحيفة السجادية ودراسات رسالة الحقوق وكتب سيرة الإمام السجاد عليه السلام، مع البحث والتصفّح بين العناوين.",
		url: "/publications",
		type: "website",
		images: ["/images/al-sahifa.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "إصدارات مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"قائمة بإصدارات المؤسسة من شروح الصحيفة السجادية ودراسات رسالة الحقوق وكتب سيرة الإمام السجاد عليه السلام، مع البحث والتصفّح بين العناوين.",
		images: ["/images/al-sahifa.jpg"],
	},
}

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
