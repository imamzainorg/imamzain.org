"use client"
import Image from "next/image"
import Link from "next/link"
import {
	ArrowLeft,
	SearchIcon,
	ChevronLeft,
	ChevronRight,
	DownloadIcon,
} from "lucide-react"
import { useState, useRef, useMemo } from "react"
import Breadcrumbs from "@/components/breadcrumb"
import BooklibraryCard from "../_components/book-library-card"
import { Book } from "@/types/book"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/button"
import booksData from "@/data/books.json"

const dataCard = [
	{
		title: "ما الحقه الحر العاملي",
		description: " ",
		URL: "/library/al-sahifa/read/ma-alhaqahu-al-hur-al-amili",
	},
	{
		title: "ما ألحقه الميرزا عبد الله الافندي",
		description: " ",
		URL: "/library/al-sahifa/read/ma-alhaqahu-al-mirza-abdullah-al-afandi",
	},
	{
		title: "ما ألحقه الميرزا حسين النوري",
		description: " ",
		URL: "/library/al-sahifa/read/ma-alhaqahu-al-mirza-husayn-al-nuri",
	},
	{
		title: "ما ألحقه السيد محسن الأمين العاملي",
		description: " ",
		URL: "/library/al-sahifa/read/ma-alhaqahu-al-sayyid-muhsin-al-amin-al-amili",
	},
]

export default function RisalatAlHuquqPage() {
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const scrollRef = useRef<HTMLDivElement>(null)
	const itemsPerPage = 8

	const publications = useMemo(() => {
		const filteredByCategory = (booksData as Book[]).filter(
			(book) =>
				Array.isArray(book.category) &&
				book.category.includes("al-sahifa"),
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

		return publications.filter((pub) => {
			const inTitle = pub.title?.toLowerCase().includes(lowerSearch)
			const inAuthor = pub.author?.toLowerCase().includes(lowerSearch)
			const inOtherNames =
				Array.isArray(pub.otherNames) &&
				pub.otherNames.some((name) =>
					name?.toLowerCase().includes(lowerSearch),
				)
			const inPrintHouse = pub.printHouse
				?.toLowerCase()
				.includes(lowerSearch)
			const inLanguage = Array.isArray(pub.language)
				? pub.language.some((lang) =>
						lang?.toLowerCase().includes(lowerSearch),
				  )
				: pub.language?.toLowerCase().includes(lowerSearch)

			return (
				inTitle ||
				inAuthor ||
				inOtherNames ||
				inPrintHouse ||
				inLanguage
			)
		})
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

	return (
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: "الصحيفة السجادية", url: "/library/al-sahifa" },
				]}
			/>

			<div className="relative mt-4 md:mt-16 mb-8 mx-auto flex justify-start gap-20 p-8 md:p-10 backdrop-blur-[1px] shadow-lg shadow-primary/10 dark:shadow-Muharram_primary/10 dark:border-Muharram_primary rounded-[60px] border border-primary">
				<div className="w-full md:w-3/4 flex flex-col justify-around gap-5 md:pr-10">
					<h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
						الصحيفة السجادية الكاملة
					</h1>
					<p className="w-3/4 text-sm md:text-xl lg:text-3xl leading-10 pb-5">
						مجموعة من الأدعية والمناجيات للإمام زين العابدين، تجسد
						أسمى معاني الإيمان والخشوع.
					</p>
					<div className="flex flex-row p-2">
						<Link
							href="/library/al-sahifa/read/al-sahifa-al-sajjadiya-index"
							className="w-full xs:w-fit text-sm md:text-xl py-2 px-4 m-2 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group"
						>
							تصفح الصحيفة الكاملة
							<ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
						</Link>
						<Link
							href="/books/الصحيفة رقعي.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full xs:w-fit text-sm md:text-xl py-2 px-4 m-2 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group hover:bg-primary hover:text-white transition-all duration-300"
						>
							تحميل الصحيفة كاملة
							<DownloadIcon
								className="transition-all duration-300 group-hover:stroke-white"
								stroke="#006654"
							/>
						</Link>
					</div>
				</div>

				<div className="w-64 max-md:hidden left-28 -top-16 absolute">
					<Image
						src="/shapes/book-bg.svg"
						className="w-full dark:hidden"
						width={50}
						height={50}
						alt="al-sahifa cover"
					/>
					<Image
						src="/shapes/book-bg_Muharram.svg"
						className="w-full hidden dark:block"
						width={50}
						height={50}
						alt="al-sahifa cover"
					/>
				</div>
			</div>

			<div className="my-16">
				<h2 className="text-xl lg:text-3xl font-semibold my-10">
					ما الحق بالصحيفة السجادية
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:mx-32">
					{dataCard.map((card) => (
						<Link
							key={card.title}
							href={card.URL}
							className="flex flex-col gap-2 text-center group shadow-md hover:shadow-xl shadow-secondary/20 dark:shadow-Muharram_secondary/20 bg-white/60 border cursor-pointer rounded-xl justify-between items-center p-4 border-slate-200 hover:border-secondary/70 dark:hover:border-Muharram_secondary/70 duration-150"
						>
							<h2 className="font-medium text-sm lg:text-lg">
								{card.title}
							</h2>
							<div className="text-xs lg:text-lg">
								{card.description}
							</div>
						</Link>
					))}
				</div>
			</div>

			<h2 className="text-xl lg:text-3xl font-semibold mt-10 mb-5">
				ما كتب عن الصحيفة السجادية
			</h2>

			<div className="w-11/12 mx-auto my-8">
				<div className="bg-white rounded-xl shadow-md p-4 md:p-6">
					<div className="flex flex-col md:flex-row gap-4 justify-between items-center">
						<div className="w-full md:w-1/2 relative">
							<input
								placeholder="ابحث في الكتب..."
								className="pr-12 w-full md:w-11/12 text-lg bg-white rounded-xl border border-primary dark:border-Muharram_primary focus:ring-1"
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
								className="w-full text-md md:text-lg bg-white md:p-5"
								onClick={() => setSearchTerm("")}
							>
								إعادة الضبط
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div ref={scrollRef} className="w-11/12 mx-auto mb-8">
				{currentPublications.length === 0 ? (
					<div className="bg-secondary dark:bg-Muharram_secondary/20 bg-opacity-10 rounded-xl flex flex-col items-center justify-center py-16">
						<div className="text-gray-500 mb-4">
							<SearchIcon size={48} strokeWidth={1} />
						</div>
						<h3 className="text-2xl font-semibold text-gray-700 mb-2">
							لا توجد نتائج
						</h3>
						<p className="text-gray-500 text-center max-w-md">
							لم نعثر على أي كتب تطابق بحثك. حاول تغيير كلمات
							البحث أو إعادة ضبط الفلاتر.
						</p>
					</div>
				) : (
					<div className="bg-secondary/20 dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
						<AnimatePresence mode="wait">
							{currentPublications.map((publication) => (
								<BooklibraryCard
									route="/library/risalat-al-huqoq"
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
							className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
						>
							<ChevronRight size={20} />
						</Button>

						{Array.from(
							{ length: Math.min(5, totalPages) },
							(_, i) => {
								let pageNum
								if (currentPage <= 3) pageNum = i + 1
								else if (currentPage > totalPages - 3)
									pageNum = totalPages - 4 + i
								else pageNum = currentPage - 2 + i

								if (pageNum < 1 || pageNum > totalPages)
									return null

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
