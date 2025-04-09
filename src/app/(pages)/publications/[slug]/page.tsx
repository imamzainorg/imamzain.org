import Breadcrumbs from "@/components/breadcrumb"
import { redirect } from "next/navigation"
import { Book } from "@/types/book"
import Image from "next/image"
import { ShoppingCartIcon } from "lucide-react"
import Link from "next/link"
import { dataFetcher } from "@/lib/dataFetcher"
import { DownloadIcon } from "@/assets/icons/reusable"
import NewsShare from "../../(activities)/news/_components/news-share"
import BooklibraryCard from "../../library/_components/book-library-card"

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	const publications = await dataFetcher<Book[]>("publications.json")

	const publication: Book | undefined = publications.find(
		(book) => book.slug === slug,
	)

	if (!publication) {
		return redirect("/404")
	}

	// If the publication belongs to a series, filter and sort its parts.
	let seriesParts: Book[] = []

	if (publication.series) {
		seriesParts = publications.filter(
			(book) => book.series === publication.series,
		)
	}

	return (
		<div className="space-y-10 my-8">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "الأصدارات", url: "/publications" },
					{ name: publication.title, url: "#" },
				]}
			/>
			{/* الكتاب المقصود */}
			<div className="relative pt-20 sm:pt-40">
				<div className="relative border bg-gray-100 flex border-primary/30 shadow-xl shadow-primary/20 rounded-3xl flex-col">
					<div className="relative flex flex-col sm:flex-row -top-24 sm:top-0 justify-center items-center w-3/4 mx-auto z-10">
						<Image
							src={publication.image}
							width={350}
							height={200}
							alt={publication.slug}
							className="w-32 sm:w-36 md:w-40 md:left-8 lg:w-44 xl:w-56 xl:left-32 xl:-top-10 md:relative lg:left-24 h-auto rounded-xl sm:-translate-y-28"
						/>
						<div className="flex flex-col sm:p-4 lg:p-0">
							<div className="space-y-2 mt-16 sm:-mt-3 xl:mb-24 lg:pb-10 text-center sm:text-right -translate-y-10 sm:-translate-y-28">
								<p className="text-lg sm:text-xl xl:text-3xl font-semibold">
									{publication.title}
								</p>
								<p className="text-sm sm:text-lg xl:text-xl mr-4 text-gray-500">
									{publication.author}
								</p>
							</div>
							<div className="flex flex-row justify-between items-center w-full sm:relative sm:-top-20 xl:-top-36 p-1">
								<Link
									download
									href={publication.pdf}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 bg-primary text-[10px] whitespace-pre p-4 sm:text-[14px] md:text-lg xl:text-xl rounded-[30px] text-white"
								>
									تنزيل <DownloadIcon fill="#ffffff" />
								</Link>
								<NewsShare
									slug={publication.slug}
									strokeWidth={2.5}
									stroke="#006654"
									className="relative right-12 sm:right-14 w-1/2 md:right-20 xl:right-32 cursor-pointer"
								/>
								<Link href={`/services/stores`}>
									<ShoppingCartIcon
										stroke="#006654"
										fill="none"
										strokeWidth={2}
										className="relative w-6 h-6 md:right-9"
									/>
								</Link>
							</div>

							<hr className="sm:relative sm:-top-16 xl:-top-32" />
						</div>
					</div>
					{/* start  */}
					<ul className="absolute top-[-1.9rem] left-5   ">
						<div className="flex gap-2 text-sm  ">
							{seriesParts.map((part) => (
								<li
									key={part.id}
									className={`bg-gray-100 border border-primary/30 px-7 py-1 pb-7 rounded-lg rounded-b-none -z-10
						  ${part.slug === publication.slug ? "border-b-0 z-0" : ""} 
						`}
								></li>
							))}
						</div>
					</ul>

					<ul className="absolute top-[-1.7rem] left-7  z-10">
						<div className="flex gap-[1.70rem] text-sm  z-10">
							{seriesParts.map((part, index) => (
								<li
									key={part.id}
									className={` 
						  ${part.slug === publication.slug ? "border-b-0" : ""}
						`}
								>
									<Link
										href={`/publications/${part.slug}`}
										className={` z-30 ${
											part.slug === publication.slug
												? "font-bold"
												: ""
										}`}
									>
										الجزء {index + 1}
									</Link>
								</li>
							))}
						</div>
					</ul>

					<div className="absolute top-0 left-0 w-full h-96 bg-gray-100 rounded-3xl"></div>
					{/* end */}
					<div className="flex flex-col sm:flex-row">
						<div className="w-full relative -top-10 sm:text-sm md:text-lg mx-auto text-center xl:text-xl sm:text-start sm:pr-24">
							<p>شخصيات اخرى</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.otherNames[0]
									? publication.otherNames.map((name) => (
											<div key={name}>{name}</div>
										))
									: "لا يوجد"}
							</span>
							<p className="mt-4">المطبعة</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.printHouse}
							</span>
							<p className="mt-4">تاريخ الطبع</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.printDate}
							</span>
							<p className="mt-4">اللغة</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.language}
							</span>
							<p className="mt-4">عدد الصفحات</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.pages}
							</span>
							<p className="mt-4">عدد الاجزاء</p>
							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.parts}
							</span>
						</div>
						<div className="sm:w-3/4 p-4 sm:m-2 border-t-1 sm:relative sm:-top-8 sm:border-none mx-auto w-full text-sm lg:text-lg xl:text-xl pt-2 sm:pt-0">
							الوصف
							<br />
							<span className="relative right-4 text-slate-500">
								الوصف الاجزاء
							</span>
						</div>
					</div>
				</div>
			</div>
			<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
				كتب ذات صلة
			</h2>
			<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
				{publications.slice(0, 2).map((libraryBook) => (
					<BooklibraryCard
						route="/publications"
						key={libraryBook.id}
						publication={libraryBook}
						downloadable
					/>
				))}
			</div>
		</div>
	)
}
