"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { MoreLink, SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"
import { thumbnailUrl } from "@/lib/youtube"

// Slimmed to the one video this component ever reads (playlist.videos[0])
// and the fields it renders; the server page filters and slices
// youtube.json down to this shape before passing it in.
type HomeVideo = Pick<
	import("@/types/youtube-data").YouTubeVideo,
	"title" | "desc" | "date" | "thumbnail" | "url"
>

type HomePlaylist = {
	videos: HomeVideo[] // always exactly one entry: the playlist's first video
}

// Seven tiles on desktop (one large, six small), four on tablets, two on phones.
function tileVisibility(index: number) {
	if (index < 2) return ""
	if (index < 4) return "hidden md:block"
	return "hidden lg:block"
}

export default function Videos({ playlists }: { playlists: HomePlaylist[] }) {
	const [videoId, setVideoId] = useState<string | null>(null)

	useEffect(() => {
		if (!videoId) return
		const onKey = (event: KeyboardEvent) => event.key === "Escape" && setVideoId(null)
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [videoId])

	return (
		<section className="container pb-4 pt-24">
			<SectionTitle
				title="المرئيات"
				className="mb-10"
				action={<MoreLink href="/media/videos">المزيد</MoreLink>}
			/>

			<ul className="grid auto-rows-[15rem] grid-cols-1 gap-5 sm:grid-cols-2 md:auto-rows-[17rem] lg:auto-rows-[12rem] lg:grid-cols-5 xl:auto-rows-[13rem]">
				{playlists.map((playlist, index) => {
					const video = playlist.videos[0]
					const large = index === 0
					return (
						<li
							key={video.url}
							className={cn(tileVisibility(index), large && "lg:col-span-2 lg:row-span-2")}
						>
							<Reveal y={30} delay={(index % 4) * 0.08} className="h-full">
								<button
									type="button"
									onClick={() => setVideoId(video.url)}
									aria-label={`تشغيل: ${video.title}`}
									className="group relative block h-full w-full overflow-hidden rounded-3xl bg-primary/10 text-right dark:bg-Muharram_primary/10"
								>
									<Image
										src={thumbnailUrl(video.thumbnail)}
										alt=""
										fill
										sizes={large ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 50vw, 20vw"}
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div
										aria-hidden
										className="absolute inset-0 bg-gradient-to-t from-[#101c1a]/90 via-[#101c1a]/20 to-transparent dark:from-[#171314]/90 dark:via-[#171314]/20"
									/>
									<span
										className={cn(
											"absolute flex items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110 dark:text-Muharram_primary",
											large
												? "left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110"
												: "left-3 top-3 h-10 w-10",
										)}
									>
										<Play className={cn("-scale-x-100 fill-current", large ? "h-7 w-7" : "h-4 w-4")} />
									</span>
									<span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
										<span
											className={cn(
												"line-clamp-2 block font-bold leading-snug text-white",
												large ? "text-xl lg:text-2xl" : "text-base",
											)}
										>
											{video.title}
										</span>
										<span className="mt-1 block text-sm text-white/70">{video.date}</span>
									</span>
								</button>
							</Reveal>
						</li>
					)
				})}
			</ul>

			{videoId && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label="تشغيل الفيديو"
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
					onClick={() => setVideoId(null)}
				>
					<button
						type="button"
						aria-label="إغلاق"
						onClick={() => setVideoId(null)}
						className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
					>
						<X className="h-6 w-6" />
					</button>
					<div
						className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<iframe
							className="h-full w-full"
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							title="YouTube Video"
							allow="autoplay; fullscreen"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</section>
	)
}
