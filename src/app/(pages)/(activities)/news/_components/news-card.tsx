import { Post } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"

export default function PostCard(post: Post) {
	return (
		<Link
			href={`/news/${post.slug}`}
			className="hover:scale-105 duration-200"
		>
			<div className="flex justify-center gap-6">
				<div className="w-4/6 text-xs xl:text-sm space-y-2">
					<h2 className="font-bold line-clamp-1 lg:line-clamp-none lg:text-sm xl:text-base">
						{post.title}
					</h2>
					<p className="line-clamp-2">{post.summary}</p>
					<p className="font-extralight">
						{post.date.toISOString().split("T")[0]}
					</p>
				</div>
				<div className="w-2/6 h-5/6 relative">
					<div className="absolute rotate-90 w-3 h-3 lg:w-5 lg:h-5 bottom-3 lg:bottom-4 -right-1.5 lg:-right-2 bg-[url('/shapes/newsIndicator.svg')] bg-no-repeat"></div>
					<Image
						src={post.image}
						width={500}
						height={500}
						alt={post.slug}
						className="w-full h-full rounded-xl aspect-[12/9] object-cover"
					/>
				</div>
			</div>
		</Link>
	)
}
