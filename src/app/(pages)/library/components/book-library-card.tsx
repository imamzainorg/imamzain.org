import { DownloadIcon } from "@/assets/icons/reusable"
import { Book } from "@/types/book"
import Image from "next/image"
import Link from "next/link"

export default function BooklibraryCard({
	publication,
	downloadable = false,
	route = "",
}: {
	publication: Book
	downloadable?: boolean
	route?: string
}) {
	return (
		<Link
			href={`${route}/${publication.slug}`}
			key={publication.id}
			className="flex items-center gap-4 py-4 lg:py-8 group"
		>
			<div className="relative w-1/3 h-full duration-300 group-hover:drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 flex justify-center items-center bg-[url('/shapes/book-bg.svg')] bg-no-repeat bg-center">
				<Image
					src={publication.image}
					width={200}
					height={200}
					className="object-center w-auto h-4/6 lg:h-3/6 xl:h-4/6"
					alt={publication.image}
				/>
				{downloadable && (
					<div className="absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 bg-white rounded-full p-2 sm:p-3 lg:p-2">
						<DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
					</div>
				)}
			</div>
			<div className=" w-2/3 flex flex-col h-5/6 justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
				<h2 className="text-primary text-[0.6rem] xs:text-lg sm:text-xl lg:text-base xl:text-xl font-bold  absolute top-2 xs:top-1 sm:top-3 lg:top-1 2xl:top-3 ">
					{publication.title}
				</h2>

				<span className="text-[0.5rem] xs:text-sm sm:text-lg md:text-xl lg:text-sm xl:text-lg font-medium absolute top-10 xs:top-14 sm:top-16 lg:top-14 xl:top-16 2xl:top-20">
					{publication.author}
				</span>
				<span className="text-[8px] xs:text-[0.7rem] sm:text-md md:text-lg lg:text-[10px] xl:text-[14px] 2xl:text-base font-light absolute top-14 xs:top-20 sm:top-24 lg:top-[90px] xl:top-[120px]">
					الناشر: {publication.printHouse}{" "}
				</span>
				<div className="flex justify-between w-11/12 mt-2 text-[0.5rem] xs:text-[10px] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-[73px] xs:top-28 sm:top-36 md:top-48 xmd:top-56 lg:top-[115px] xl:top-36 2xl:top-44">
					<span>{publication.pages} صفحة</span>
					<span>{publication.views} مشاهدة</span>
				</div>
			</div>
		</Link>
	)
}
