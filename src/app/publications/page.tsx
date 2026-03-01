"use client"

import { useState, useRef, useMemo } from "react"
import SectionTitle from "@/components/section"
import { HighlightCarousel } from "./components/highlight-carousel"
import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import { Book } from "@/types/book"
import BooklibraryCard from "../library/_components/book-library-card"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/button"
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import booksData from "@/data/books.json"

export default function PublicationsPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const scrollRef = useRef<HTMLDivElement>(null)
	const itemsPerPage = 8

	const publications = useMemo(() => {
		const filteredByCategory = (booksData as Book[]).filter((book: Book) =>
			book.category?.includes("الإصدارات"),
		)
		const uniqueSeriesMap = new Map<string, Book>()

		filteredByCategory.forEach((book) => {
			if (book.series && book.totalParts > 1) {
				if (
					!uniqueSeriesMap.has(book.series) &&
					book.partNumber === 1
				) {
					uniqueSeriesMap.set(book.series, book)
				}
			} else {
				uniqueSeriesMap.set(`${book.series ?? book.id}`, book)
			}
		})

		return Array.from(uniqueSeriesMap.values())
	}, [])

	const filteredPublications = useMemo(() => {
		if (!searchTerm.trim()) return publications
		const lowerSearch = searchTerm.toLowerCase()
		return publications.filter(
			(pub) =>
				pub.title.toLowerCase().includes(lowerSearch) ||
				pub.author?.toLowerCase().includes(lowerSearch) ||
				(Array.isArray(pub.otherNames) &&
					pub.otherNames.some((name) =>
						name.toLowerCase().includes(lowerSearch),
					)),
		)
	}, [searchTerm, publications])

	const { currentPublications, totalPages } = useMemo(() => {
		const total = Math.ceil(filteredPublications.length / itemsPerPage)
		const start = (currentPage - 1) * itemsPerPage
		return {
			currentPublications: filteredPublications.slice(
				start,
				start + itemsPerPage,
			),
			totalPages: total,
		}
	}, [filteredPublications, currentPage])

	const paginate = (pageNum: number) => {
		setCurrentPage(pageNum)
		setTimeout(
			() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
			100,
		)
	}

	const resetFilters = () => {
		setSearchTerm("")
		setCurrentPage(1)
	}

	return (
		<div className="min-h-screen">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الإصدارات", url: "/publications" },
				]}
			/>

			<div className="w-full">
				<SectionTitle title="الإصدارات" />
				<div className="w-11/12 mx-auto my-8">
					<HighlightCarousel publications={publications} />
				</div>
			</div>

			<div className="w-full my-8">
				<Section
					title="نبذة عن اصدارات المؤسسة"
					text="يعد تراث الامام السجاد عليه السلام من الكنوز المعرفية الإلهية التي لم تستوف البحوث والدراسات غور مكنوناته, من حيث الدراسة والتحليل والتوثيق , اذ يمثل مصدرا غنيا بالمعارف والأفكار والنظريات التربوية لهذا ارتات المؤسسة القيام بالتحقيق والتاليف وإتاحة الفرصة امام الباحثين الذين يتسمون بالأصالة والابداع والجدة لدراسة وتحليل تراث الامام والاسهام في عملية البناء التربوي"
				/>
			</div>

			<div className="w-11/12 mx-auto mb-8">
				<div className="bg-white rounded-xl shadow-md p-4 md:p-6">
					<div className="flex flex-col md:flex-row gap-4 justify-between items-center">
						<div className="w-full md:w-1/2 relative">
							<input
								placeholder="ابحث في الإصدارات..."
								className="pr-12 w-full md:w-11/12 text-subtitle bg-white rounded-xl border border-primary dark:border-Muharram_primary  focus:ring-1"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								style={{ direction: "rtl" }}
							/>
							<div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-Muharram_primary">
								<SearchIcon size={20} />
							</div>
						</div>

						<div className="w-full md:w-1/5">
							<Button
								variant="outline"
								className="w-full text-subtitle bg-white md:p-5"
								onClick={resetFilters}
							>
								إعادة الضبط
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div
				ref={scrollRef}
				className="w-11/12 scroll-mt-64 mx-auto space-y-2 mb-8"
			>
				{currentPublications.length === 0 ? (
					<div className="bg-secondary dark:bg-Muharram_secondary/20 bg-opacity-10 rounded-xl flex flex-col items-center justify-center py-16">
						<div className="text-gray-500 mb-4">
							<SearchIcon size={48} strokeWidth={1} />
						</div>
						<h3 className="text-note font-semibold text-gray-700 mb-2">
							لا توجد نتائج
						</h3>
						<p className="text-gray-500 text-center text-subtitle p-2 max-w-md">
							لم نعثر على أي إصدارات تطابق بحثك. حاول تغيير كلمات
							البحث أو إعادة ضبط الفلاتر.
						</p>
					</div>
				) : (
					<div className="bg-[rgba(187,150,97,0.1)] dark:bg-[rgba(0,0,0,0.1)] rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
						<AnimatePresence mode="wait">
							{currentPublications.map((publication) => (
								<BooklibraryCard
									route="/publications"
									publication={publication}
									key={publication.id}
								/>
							))}
						</AnimatePresence>
					</div>
				)}
			</div>

			{totalPages > 1 && (
				<div className="w-11/12 mx-auto flex justify-center my-8">
					<nav className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								paginate(Math.max(1, currentPage - 1))
							}
							disabled={currentPage === 1}
							aria-label="الصفحة السابقة"
							className="bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
						>
							<ChevronRight size={20} />
						</Button>

						{Array.from(
							{ length: Math.min(5, totalPages) },
							(_, i) => {
								let pageNum
								if (currentPage <= 3) {
									pageNum = i + 1
								} else if (currentPage > totalPages - 3) {
									pageNum = totalPages - 4 + i
								} else {
									pageNum = currentPage - 2 + i
								}

								return (
									<Button
										key={pageNum}
										variant={
											currentPage === pageNum
												? "default"
												: "outline"
										}
										onClick={() => paginate(pageNum)}
										className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
											currentPage === pageNum
												? "bg-primary dark:bg-Muharram_primary text-white"
												: "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
										}`}
										aria-current={
											currentPage === pageNum
												? "page"
												: undefined
										}
									>
										{pageNum}
									</Button>
								)
							},
						)}

						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								paginate(Math.min(totalPages, currentPage + 1))
							}
							disabled={currentPage === totalPages}
							aria-label="الصفحة التالية"
							className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
						>
							<ChevronLeft size={20} />
						</Button>
					</nav>
				</div>
			)}
		</div>
	)
}
