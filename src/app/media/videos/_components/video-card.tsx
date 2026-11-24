import Link from "next/link"
import Image from "next/image"
import { PlayButtonIcon } from "@/assets/icons/reusable"
import { thumbnailUrl } from "@/lib/youtube"

// A tile for a video or a series: its thumbnail, title and one line under it (a date, a count).
export default function VideoCard({
	title,
	thumbnail,
	href,
	meta,
	badge,
}: {
	title: string
	thumbnail: string
	href: string
	meta?: string
	/** Shown over the corner of the thumbnail, e.g. "12 حلقة". */
	badge?: string
}) {
	return (
		<Link href={href} className="group block">
			<div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900">
				<Image
					src={thumbnailUrl(thumbnail)}
					alt={title}
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
				{badge && (
					<span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
						{badge}
					</span>
				)}
			</div>
			<p className="mt-2 text-white font-semibold text-sm line-clamp-2">{title}</p>
			{meta && <p className="mt-1 text-slate-400 text-xs">{meta}</p>}
		</Link>
	)
}
