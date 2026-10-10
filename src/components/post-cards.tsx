import Image from "next/image"
import Link from "next/link"
import { TitleIcon } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/post"

const dateClass = "text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary"
const titleHover = "transition-colors group-hover:text-primary dark:group-hover:text-Muharram_primary"

// The lead story: a photo with the headline over a dark fade.
function FeaturedPost({ post, priority }: { post: Post; priority?: boolean }) {
	return (
		<Link
			href={`/news/${post.slug}`}
			className="group relative block min-h-[24rem] overflow-hidden rounded-[40px] bg-primary dark:bg-Muharram_primary lg:h-full lg:min-h-[32rem]"
		>
			<Image
				src={post.image}
				alt=""
				fill
				priority={priority}
				sizes="(max-width: 1024px) 100vw, 60vw"
				className="object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#101c1a] via-[#101c1a]/60 to-transparent dark:from-[#171314] dark:via-[#171314]/60" />
			<div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
				<time className="flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white/70">
					<TitleIcon className="w-2.5" />
					{formatDate(post.date)}
				</time>
				<h3 className="mt-3 line-clamp-3 text-2xl font-bold leading-snug text-white md:text-3xl md:leading-snug">
					{post.title}
				</h3>
				<p className="mt-3 line-clamp-2 max-w-2xl text-lg leading-8 text-white/75">{post.summary}</p>
			</div>
		</Link>
	)
}

// A compact story: small photo beside the date and headline. Stack them in a list.
// `compact` is for narrow sidebars.
export function PostRow({ post, compact }: { post: Post; compact?: boolean }) {
	return (
		<Link
			href={`/news/${post.slug}`}
			className="group flex gap-5 border-b border-secondary/30 py-5 first:pt-0 last:border-0 last:pb-0"
		>
			<div
				className={cn(
					"relative shrink-0 overflow-hidden rounded-2xl",
					compact ? "h-20 w-24" : "h-28 w-36 sm:h-32 sm:w-44",
				)}
			>
				<Image
					src={post.image}
					alt=""
					fill
					sizes={compact ? "96px" : "176px"}
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="min-w-0 flex-1">
				<time className={dateClass}>{formatDate(post.date)}</time>
				<h3
					className={cn(
						"mt-1 line-clamp-3 font-bold text-gray-900",
						compact ? "text-base leading-7" : "text-lg leading-8",
						titleHover,
					)}
				>
					{post.title}
				</h3>
			</div>
		</Link>
	)
}

// A story for grids: photo on top, then date, headline and summary. `tone="light"` is for dark bands.
export function PostTile({ post, tone }: { post: Post; tone?: "light" }) {
	const light = tone === "light"
	return (
		<Link href={`/news/${post.slug}`} className="group block">
			<div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-primary/10 dark:bg-Muharram_primary/10">
				<Image
					src={post.image}
					alt=""
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<time className={cn("mt-4 block", light ? "text-sm font-semibold text-secondary" : dateClass)}>
				{formatDate(post.date)}
			</time>
			<h3
				className={cn(
					"mt-1 line-clamp-2 text-xl font-bold leading-8 transition-colors",
					light
						? "text-white group-hover:text-secondary"
						: "text-gray-900 group-hover:text-primary dark:group-hover:text-Muharram_primary",
				)}
			>
				{post.title}
			</h3>
			<p className={cn("mt-2 line-clamp-2 leading-7", light ? "text-white/65" : "text-gray-600")}>{post.summary}</p>
		</Link>
	)
}

// The latest story large, the next ones as a list beside it (home page and /news).
export function LatestPosts({ posts, priority }: { posts: Post[]; priority?: boolean }) {
	const [lead, ...rest] = posts
	if (!lead) return null

	return (
		<div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
			<Reveal x={60} y={0} className="lg:h-full">
				<FeaturedPost post={lead} priority={priority} />
			</Reveal>
			<Reveal x={-60} y={0} delay={0.15} className="self-center">
				{rest.map((post) => (
					<PostRow key={post.slug} post={post} />
				))}
			</Reveal>
		</div>
	)
}
