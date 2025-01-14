import { DownloadIcon } from "@/assets/icons/reusable"
import { Book } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"

export default function BookCard({
	publication,
	downloadable = false,
}: {
	publication: Book
	downloadable?: boolean
}) {
	return (
		<Link
			href={`/publications/${publication.slug}`}
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
			<div className="w-2/3 flex flex-col h-5/6 justify-center gap-0 sm:gap-5 lg:gap-2">
				<h2 className="text-xs sm:text-2xl lg:text-lg font-bold text-green-700">
					{publication.title}
				</h2>
				<span className="text-xs sm:text-lg lg:text-base font-medium">
					{publication.author}
				</span>
				<span className="text-xs sm:text-lg lg:text-sm font-light">
					الناشر: {publication.publisher}
				</span>
				<div className="flex justify-between w-11/12 mt-2 text-[10px] sm:text-base lg:text-xs font-light tracking-wide text-gray-600">
					<span>{publication.pages} صفحة</span>
					<span>{publication.views} مشاهدة</span>
				</div>
			</div>
		</Link>
	)
}
