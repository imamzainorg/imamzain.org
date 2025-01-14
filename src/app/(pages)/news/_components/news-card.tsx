import Image from "next/image"
import Link from "next/link"

export default function NewsCard({
	link,
	img,
	title,
	summary,
	date,
}: {
	img: string
	title: string
	summary: string
	link: string
	date: Date
}) {
	return (
		<Link href={`/news/${link}`} className="h-fit my-2">
			<div className="flex gap-4 mx-1 items-center">
				<div className="flex flex-col justify-center md:gap-4 w-8/12 lg:w-full my-0 md:my-4">
					<h2 className="text-xs md:text-2xl lg:text-base tracking-wide font-semibold">
						{title}
					</h2>
					<p className="text-[10px] md:text-base lg:text-sm text-gray-700 line-clamp-3">
						{summary}
					</p>
					<p className="mt-1 text-[10px] md:text-sm text-gray-500">
						<span>{date.toISOString().split("T")[0]}</span>
					</p>
				</div>
				<div className="relative h-full md:h-1/2 w-6/12">
					<Image
						src={img}
						width={400}
						height={400}
						className="w-full h-full rounded-xl object-cover"
						alt="img"
					/>
					<div className="absolute bottom-2 -right-[6px] @lg:rotate-90 @lg:-bottom-2 @lg:right-5 w-3 h-3 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat z-10" />
				</div>
			</div>
		</Link>
	)
}
