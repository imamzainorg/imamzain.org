"use client"

import BooklibraryCard from "./_components/book-library-card"
import Breadcrumbs from "@/components/breadcrumb"
import SectionTitle from "@/components/section"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import { SearchIcon } from "lucide-react"
import { useState, useEffect } from "react"

export default function Page() {
	const [libraryBooks, setLibraryBooks] = useState<Book[]>([])
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
	const [searchTitle, setSearchTitle] = useState("")
	const [searchAuthor, setSearchAuthor] = useState("")
	const [searchPublisher, setSearchPublisher] = useState("")
	const [searchTopic, setSearchTopic] = useState("")
	const [sortOption, setSortOption] = useState("latest")

	// تحميل الكتب عند بداية الصفحة
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const books = await dataFetcher<Book[]>("books.json")
				setLibraryBooks(books)
				setFilteredBooks(books)
			} catch (error) {
				console.error("Failed to load books:", error)
			}
		}
		fetchBooks()
	}, [])

	// فلترة وفرز الكتب
	useEffect(() => {
		let books = [...libraryBooks]

		books = books.filter((book) => book.category?.includes("imamzain"))

		const seenSeries = new Set<string>()
		books = books.filter((book) => {
			if (book.series && book.totalParts && book.partNumber) {
				if (book.partNumber !== 1) return false
				if (seenSeries.has(book.series)) return false
				seenSeries.add(book.series)
				return true
			}
			return true
		})

		if (searchTitle) {
			books = books.filter((book) =>
				book.title.toLowerCase().includes(searchTitle.toLowerCase()),
			)
		}
		// فلترة حسب المؤلف
		if (searchAuthor) {
			books = books.filter((book) =>
				book.author?.toLowerCase().includes(searchAuthor.toLowerCase()),
			)
		}
		// فلترة حسب الناشر
		if (searchPublisher) {
			books = books.filter((book) =>
				book.printHouse
					?.toLowerCase()
					.includes(searchPublisher.toLowerCase()),
			)
		}
		// فلترة حسب أسماء أخرى
		if (searchTopic) {
			books = books.filter((book) =>
				book.otherNames?.some((name) =>
					name.toLowerCase().includes(searchTopic.toLowerCase()),
				),
			)
		}

		// ترتيب حسب الأحدث أو الأكثر مشاهدة
		if (sortOption === "latest") {
			books.sort(
				(a, b) =>
					new Date(b.printDate).getTime() -
					new Date(a.printDate).getTime(),
			)
		} else if (sortOption === "common") {
			books.sort((a, b) => b.views - a.views)
		}

		setFilteredBooks(books)
	}, [
		searchTitle,
		searchAuthor,
		searchPublisher,
		searchTopic,
		sortOption,
		libraryBooks,
	])

	return (
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة", url: "/library" },
					{ name: "ما كتب عن الامام", url: "#" },
				]}
			/>
			<div className="md:flex md:w-full md:just-between justify-items-center mb-8">
				<div className="w-full ">
					<SectionTitle title="قائمة الكتب" />
				</div>
				<div className="flex justify-center items-center text-nowrap ">
					<span className=" text-sm">الترتيب حسب </span>
					<select
						id="sorting"
						className="border-none bg-transparent  focus:border-none active:border-none"
						onChange={(e) => setSortOption(e.target.value)}
					>
						<option value="latest" defaultChecked>
							الأحدث
						</option>
						<option value="common">الأكثر شيوعا</option>
					</select>
				</div>
			</div>

			{/* حقول البحث */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<div className="col-span-1 w-full md:col-span-3 md:w-1/2 relative lg:mb-4">
					<input
						type="text"
						value={searchTitle}
						onChange={(e) => setSearchTitle(e.target.value)}
						className="w-full rounded-xl md:text-sm lg:text-lg p-1 bg-transparent border border-primary dark:border-Muharram_primary"
						placeholder="البحث عن عناوين الكتب"
					/>
					<div className="absolute text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
						<div className="h-2/3 w-[1px] bg-slate-400" />
						<SearchIcon size={20} strokeWidth={1.5} />
					</div>
				</div>

				<div className="col-span-1">
					<span className="font-semibold my-2 ">
						محققين، مدققين، الخ...
					</span>
					<input
						type="text"
						value={searchTopic}
						onChange={(e) => setSearchTopic(e.target.value)}
						className="w-full rounded-xl md:text-sm p-1 lg:text-lg bg-transparent border border-primary dark:border-Muharram_primary"
						placeholder="البحث عن أي اسم"
					/>
				</div>

				<div className="col-span-1">
					<span className="font-semibold my-2">المؤلف</span>
					<input
						type="text"
						value={searchAuthor}
						onChange={(e) => setSearchAuthor(e.target.value)}
						className="w-full md:text-sm lg:text-lg p-1 rounded-xl bg-transparent border dark:border-Muharram_primary border-primary"
						placeholder="البحث عن المؤلف"
					/>
				</div>

				<div className="col-span-1">
					<span className="font-semibold my-2">الناشر</span>
					<input
						type="text"
						value={searchPublisher}
						onChange={(e) => setSearchPublisher(e.target.value)}
						className="w-full md:text-sm lg:text-lg p-1 rounded-xl bg-transparent border dark:border-Muharram_primary border-primary"
						placeholder="البحث عن دور النشر"
					/>
				</div>
			</div>

			{/* عرض النتائج */}
			<div className="bg-secondary/20 dark:bg-Muharram_primary/20  rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10 mt-8">
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<BooklibraryCard
							route="/library"
							key={book.id}
							publication={book}
						/>
					))
				) : (
					<p className="text-center text-gray-500">لا توجد نتائج.</p>
				)}
			</div>
		</div>
	)
}
