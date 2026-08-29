import Link from "next/link"
import Image from "next/image"
import { PlayButtonIcon } from "@/assets/icons/reusable"
import { thumbnailUrl } from "@/lib/youtube"
import type { YouTubeVideo } from "@/types/youtube-data"

export default function VideoCard({
	video,
	href,
	episodeCount,
}: {
	video: YouTubeVideo
	href: string
	episodeCount?: number
}) {
	return (
		<Link href={href} className="group block">
			<div className="relative rounded-2xl overflow-hidden aspect-video">
				<Image
					src={thumbnailUrl(video.thumbnail)}
					alt={video.title}
					fill
					sizes="(max-width: 768px) 50vw, 20vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
					<PlayButtonIcon
						fill="rgba(255,255,255,0.9)"
						className="bg-black/60 rounded-full p-3 w-14 h-14"
					/>
				</div>
				{episodeCount && episodeCount > 1 && (
					<span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
						{episodeCount} حلقات
					</span>
				)}
			</div>
			<p className="mt-2 text-white font-semibold text-sm line-clamp-2">
				{video.title}
			</p>
			<p className="mt-1 text-slate-400 text-xs">{video.date}</p>
		</Link>
	)
}
