"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { MoreLink, outlineButton, infoPanel } from "@/components/brand"
import PageHeader from "@/components/page-header"
import Pagination from "@/components/pagination"
import SearchField from "@/components/search-field"
import { Book } from "@/types/book"
import BooklibraryCard from "../../library/_components/book-library-card"

const itemsPerPage = 12

const intro =
	"يعد تراث الامام السجاد عليه السلام من الكنوز المعرفية الإلهية التي لم تستوف البحوث والدراسات غور مكنوناته, من حيث الدراسة والتحليل والتوثيق , اذ يمثل مصدرا غنيا بالمعارف والأفكار والنظريات التربوية لهذا ارتات المؤسسة القيام بالتحقيق والتاليف وإتاحة الفرصة امام الباحثين الذين يتسمون بالأصالة والابداع والجدة لدراسة وتحليل تراث الامام والاسهام في عملية البناء التربوي"

// The newest release, in a green shield beside the page title.
function LatestBook({ book }: { book: Book }) {
	return (
		<div className={`${infoPanel} p-8 md:p-10`}>
			<p className="text-sm font-semibold text-secondary_dark dark:text-white/70">أحدث الإصدارات</p>
			<div className="mt-5 flex items-center gap-6">
				<Link href={`/publications/${book.slug}`} className="relative block h-52 w-36 shrink-0">
					<Image
						src={book.image}
						alt={`غلاف كتاب ${book.title}`}
						fill
						priority
						sizes="144px"
						className="object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.45)]"
					/>
				</Link>
				<div className="min-w-0">
					<h2 className="line-clamp-3 text-xl font-bold leading-snug">{book.title}</h2>
					{book.author && <p className="mt-2 line-clamp-2 text-gray-600 dark:text-white/70">{book.author}</p>}
					<MoreLink href={`/publications/${book.slug}`} className="mt-4">
						تفاصيل الكتاب
					</MoreLink>
				</div>
			</div>
		</div>
	)
}

export default function PublicationsClient({
	publications,
}: {
	publications: Book[]
}) {
	const [searchTerm, setSearchTerm] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const listRef = useRef<HTMLDivElement>(null)

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

	const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
	const currentPublications = filteredPublications.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	)

	const paginate = (pageNum: number) => {
		setCurrentPage(pageNum)
		listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	const search = (value: string) => {
		setSearchTerm(value)
		setCurrentPage(1)
	}

	return (
		<>
			<PageHeader
				title="الإصدارات"
				text={intro}
				aside={publications[0] && <LatestBook book={publications[0]} />}
			/>

			<section className="pt-24">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<SearchField
						className="md:w-1/2"
						label="البحث في الإصدارات"
						placeholder="ابحث في الإصدارات..."
						value={searchTerm}
						onChange={search}
					/>
					<p className="font-semibold text-gray-600">{filteredPublications.length} إصدار</p>
				</div>

				<div ref={listRef} className="mt-12 scroll-mt-40">
					{currentPublications.length === 0 ? (
						<div className="flex flex-col items-center py-20 text-center">
							<SearchIcon size={48} strokeWidth={1} className="text-secondary" />
							<h3 className="mt-4 text-2xl font-bold text-gray-800">لا توجد نتائج</h3>
							<p className="mt-2 max-w-md text-lg leading-loose text-gray-600">
								لم نعثر على أي إصدارات تطابق بحثك. حاول تغيير كلمات البحث.
							</p>
							<button type="button" onClick={() => search("")} className={`${outlineButton} mt-6`}>
								إعادة الضبط
							</button>
						</div>
					) : (
						<ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
							{currentPublications.map((publication) => (
								<li key={publication.id}>
									<BooklibraryCard route="/publications" publication={publication} />
								</li>
							))}
						</ul>
					)}
				</div>

				<Pagination className="mt-16" page={currentPage} totalPages={totalPages} onPageChange={paginate} />
			</section>
		</>
	)
}
