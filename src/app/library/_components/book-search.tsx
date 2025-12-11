"use client"
import { useState, useMemo } from "react"
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/button"
import BooklibraryCard from "./book-library-card"
import { Book } from "@/types/book"

interface BookSearchProps {
	books: Book[]
	route: string
}

export default function BookSearch({ books, route }: BookSearchProps) {
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8

	const filteredBooks = useMemo(() => {
		if (!searchTerm.trim()) return books
		const lower = searchTerm.toLowerCase()
		return books.filter(
			(b) =>
				b.title.toLowerCase().includes(lower) ||
				b.author?.toLowerCase().includes(lower) ||
				b.printHouse?.toLowerCase().includes(lower),
		)
	}, [searchTerm, books])

	const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)
	const currentBooks = filteredBooks.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	)

	return (
		<div className="space-y-8">
			<div className="w-11/12 mx-auto">
				<div className="bg-white rounded-xl shadow-md p-4 md:p-6">
					<div className="flex gap-4 items-center">
						<div className="flex-1 relative">
							<input
								placeholder="ابحث في الكتب..."
								className="pr-12 w-full text-note bg-white rounded-xl border border-primary dark:border-Muharram_primary"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<SearchIcon
								className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
								size={20}
							/>
						</div>
						<Button
							variant="outline"
							onClick={() => setSearchTerm("")}
						>
							إعادة الضبط
						</Button>
					</div>
				</div>
			</div>

			<div className="w-11/12 mx-auto">
				{currentBooks.length === 0 ? (
					<div className="bg-secondary/20 rounded-xl flex flex-col items-center justify-center py-16">
						<SearchIcon
							size={48}
							strokeWidth={1}
							className="text-gray-500 mb-4"
						/>
						<h3 className="text-2xl font-semibold text-gray-700 mb-2">
							لا توجد نتائج
						</h3>
					</div>
				) : (
					<div className="bg-secondary/20 dark:bg-Muharram_primary/20 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
						{currentBooks.map((book) => (
							<BooklibraryCard
								key={book.id}
								route={route}
								publication={book}
							/>
						))}
					</div>
				)}
			</div>

			{totalPages > 1 && (
				<div className="w-11/12 mx-auto flex justify-center">
					<nav className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								setCurrentPage((p) => Math.max(1, p - 1))
							}
							disabled={currentPage === 1}
						>
							<ChevronRight size={20} />
						</Button>
						{Array.from(
							{ length: Math.min(5, totalPages) },
							(_, i) => i + 1,
						).map((page) => (
							<Button
								key={page}
								variant={
									currentPage === page ? "default" : "outline"
								}
								onClick={() => setCurrentPage(page)}
								className={
									currentPage === page
										? "bg-primary text-white"
										: ""
								}
							>
								{page}
							</Button>
						))}
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								setCurrentPage((p) =>
									Math.min(totalPages, p + 1),
								)
							}
							disabled={currentPage === totalPages}
						>
							<ChevronLeft size={20} />
						</Button>
					</nav>
				</div>
			)}
		</div>
	)
}
