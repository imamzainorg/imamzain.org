import BooklibraryCard from "../_components/book-library-card"
import Breadcrumbs from "@/components/breadcrumb"
import RelatedBooks from "../_components/related-books"
import ShowcaseSection from "../_components/showcase-section"
import { Book } from "@/types/book"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import path from "path"
import fs from "fs/promises"

async function getBooksFromFile(): Promise<Book[]> {
	const filePath = path.join(process.cwd(), "src", "data", "books.json")
	const data = await fs.readFile(filePath, "utf-8")
	return JSON.parse(data)
}

export default async function Page() {
	const libraryBooks = (await getBooksFromFile()).filter((book) =>
		book.category?.includes("al-sahifa"),
	)

	const uniqueSeriesMap = new Map<string, Book>()

	libraryBooks.forEach((book) => {
		if (book.series && book.totalParts > 1) {
			if (!uniqueSeriesMap.has(book.series) && book.partNumber === 1) {
				uniqueSeriesMap.set(book.series, book)
			}
		} else {
			uniqueSeriesMap.set(`${book.series ?? book.id}`, book)
		}
	})

	const filteredBooks = Array.from(uniqueSeriesMap.values())

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

	return (
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: "الصحيفة السجادية", url: "#" },
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
					<Link
						href="/library/al-sahifa/read/al-sahifa-al-sajjadiya"
						className="w-full xs:w-fit text-sm md:text-xl py-2 px-4 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group"
					>
						تصفح الصحيفة الكاملة
						<ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
					</Link>
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

			<h2 className="text-xl lg:text-3xl font-semibold mt-10">
				ما كتب عن الصحيفة السجادية
			</h2>

			<ShowcaseSection
				route="/library/al-sahifa"
				showcaseBooks={filteredBooks.slice(0, 3)}
			/>

			<div className="bg-secondary/20 dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
				{filteredBooks.map((book) => (
					<BooklibraryCard
						route="/library/al-sahifa"
						key={book.id}
						publication={book}
					/>
				))}
			</div>

			<div className="lg:hidden">
				<RelatedBooks
					route="/library/al-sahifa"
					relatedBooks={filteredBooks.slice(1, 3)}
				/>
			</div>
		</div>
	)
}
