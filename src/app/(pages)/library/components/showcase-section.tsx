import { DownloadIcon } from "@/assets/icons/reusable"
import { Book } from "@/types/book"
import Image from "next/image"
import Link from "next/link"
import RelatedBooks from "./related-books"
import { dataFetcher } from "@/lib/dataFetcher"
export default async function ShowcaseSection({
	showcaseBooks,
	downloadable = false,
	route = "",
}: {
	showcaseBooks: Book[]
	downloadable?: boolean
	route: string
}) {
	const libraryBooks = await dataFetcher<Book[]>("library.json")

	return (
		<div className="flex flex-row ">
			<div className="w-full  lg:w-4/6 ">
				<Link
					href={`${route}/${showcaseBooks[0].slug}`}
					key={showcaseBooks[0].id}
					className="flex items-center gap-4   w-full py-4 lg:py-8 group"
				>
					<div className="relative w-[100px] h-[100px] xs:w-[150px] xs:h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[300px] lg:w-[180px] lg:h-[230px] xl:w-[230px] xl:h-[280px] md:ml-8 lg:ml-2 duration-300 group-hover:drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 flex justify-center items-center bg-[url('/shapes/book-bg.svg')] bg-no-repeat bg-center">
						<Image
							src={showcaseBooks[0].image}
							width={100}
							height={100}
							className="object-center bg-black w-3/5"
							alt={showcaseBooks[0].image}
						/>
						{downloadable && (
							<div className=" absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
								<DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
							</div>
						)}
					</div>
					<div className=" w-2/3 flex flex-col h-5/6 justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
						<h2 className="text-primary text-[0.6rem] xs:text-lg sm:text-2xl xmd:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl font-bold  absolute -top-10 xs:-top-16 sm:-top-20 md:-top-28 xmd:-top-32 lg:-top-20 xl:-top-24 2xl:-top-28 ">
							{showcaseBooks[0].title}
						</h2>

						<span className="text-[0.5rem] xs:text-sm sm:text-xl md:text-xl xmd:text-2xl lg:text-sm xl:text-lg 2xl:text-2xl font-medium absolute top-0 xs:top-0 sm:-top-3 md:-top-8 xmd:-top-12 lg:-top-5 xl:-top-7 2xl:-top-8">
							{showcaseBooks[0].author}
						</span>
						<span className="text-[8px] xs:text-[0.7rem] sm:text-lg md:text-lg lg:text-[14px] xl:text-[14px] 2xl:text-xl font-light absolute top-4 xs:top-6 sm:top-5 md:-top-0 xmd:-top-2 lg:-top-0 xl:-top-0 2xl:top-2">
							الناشر: {showcaseBooks[0].printHouse}
						</span>
						<div className="flex justify-between w-11/12 mt-2 text-[0.5rem] xs:text-[10px] sm:text-xs xmd:text-sm lg:text-[10px] 2xl:text-[14px]  font-light tracking-wide text-gray-600 absolute top-7 xs:top-10 sm:top-14 md:top-14 xmd:top-16 lg:top-10 xl:top-16 2xl:top-20">
							<span className="">
								{showcaseBooks[0].pages} صفحة
							</span>
							<span>{showcaseBooks[0].views} مشاهدة</span>
						</div>
					</div>
				</Link>
			</div>

			<div className="hidden lg:block w-1/2">
				<RelatedBooks
					route={route}
					relatedBooks={libraryBooks.slice(1, 3)}
				/>
			</div>
		</div>
	)
}
