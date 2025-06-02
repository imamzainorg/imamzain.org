
import { Book } from "@/types/book"
import Image from "next/image"
import Link from "next/link"

export default function BooklibraryCard({
	publication,

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
			
			</div>
			<div className=" w-2/3 flex flex-col h-5/6 pb-5 pt-3 gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0 justify-between">
				<h2 className="text-primary text-[0.6rem] xs:text-lg sm:text-xl lg:text-base xl:text-xl font-bold  ">
					{publication.title}
				</h2>

				<span className="text-[0.5rem] xs:text-sm sm:text-lg md:text-xl lg:text-sm xl:text-lg font-medium">
					{publication.author}
				</span>
				<span className="text-[8px] xs:text-[0.7rem] sm:text-md md:text-lg lg:text-[10px] xl:text-[14px] 2xl:text-base font-light ">
					الناشر: {publication.printHouse}{" "}
				</span>
				<div className="flex justify-between w-11/12 mt-2 text-[0.5rem] xs:text-[10px] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600">
					<span>{publication.pages} صفحة</span>
					<span>{publication.views} مشاهدة</span>
				</div>
			</div>
		</Link>
	)
}
