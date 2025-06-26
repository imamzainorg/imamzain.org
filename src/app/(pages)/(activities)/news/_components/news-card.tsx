import { Post } from "@/types/post"
import Image from "next/image"
import Link from "next/link"

export default function PostCard(post: Post) {
	return (
		<Link
			href={`/news/${post.slug}`}
			className="block hover:scale-[1.02] transition-transform duration-200 p-4 rounded-xl hover:bg-gray-50"
		>
			<div className="flex gap-4">
				<div className="flex-1 space-y-2">
					<h2 className="font-bold text-sm lg:text-base line-clamp-2 hover:text-primary transition-colors">
						{post.title}
					</h2>
					<p className="text-gray-600 text-xs lg:text-sm line-clamp-2">
						{post.summary}
					</p>
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center gap-2 text-sm text-gray-500">
							<div className="w-2 h-2 bg-[url('/shapes/indicator.svg')] dark:bg-[url('/shapes/newsIndicator_Muharram.svg')] bg-contain bg-no-repeat rotate-180 opacity-60" />
							<time dateTime={post.date} className="font-medium">
								{post.date}
							</time>
						</div>

						{post.body?.content && (
							<span className="text-xs text-gray-400">
								قراءة:{" "}
								{Math.ceil(
									post.body.content
										.replace(/<[^>]*>/g, "")
										.split(" ").length / 200,
								)}{" "}
								دقائق
							</span>
						)}
					</div>
				</div>

				<div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative flex-shrink-0">
					<div className="absolute bottom-3 -right-2 w-3 h-3 lg:w-4 lg:h-4 bg-[url('/shapes/newsIndicator.svg')] dark:bg-[url('/shapes/newsIndicator_Muharram.svg')] bg-no-repeat rotate-90 z-10"></div>
					<Image
						src={post.image}
						width={200}
						height={200}
						alt={post.slug}
						className="w-full h-full rounded-lg object-cover"
					/>
				</div>
			</div>
		</Link>
	)
}
