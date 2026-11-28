"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { SectionTitle } from "@/components/brand"
import { formatDate } from "@/lib/format"
import type { Short } from "@/lib/video-feed"

const arrow =
	"hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-colors hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary md:flex"

export default function ShortsRailClient({ shorts }: { shorts: Short[] }) {
	const [playing, setPlaying] = useState<Short | null>(null)
	const track = useRef<HTMLUListElement>(null)

	useEffect(() => {
		if (!playing) return
		const onKey = (event: KeyboardEvent) => event.key === "Escape" && setPlaying(null)
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [playing])

	// The page is RTL, so the rail starts at the right edge and "next" scrolls toward the left.
	const scroll = (direction: "next" | "previous") => {
		const el = track.current
		if (!el) return
		const step = el.clientWidth * 0.8 * (direction === "next" ? -1 : 1)
		el.scrollBy({ left: step, behavior: "smooth" })
	}

	return (
		<section className="mt-16" aria-labelledby="shorts-title">
			<SectionTitle
				id="shorts-title"
				light
				title="مقاطع قصيرة"
				className="mb-6"
				action={
					<div className="flex gap-2">
						<button type="button" onClick={() => scroll("previous")} aria-label="السابق" className={arrow}>
							<ChevronRight className="h-5 w-5" />
						</button>
						<button type="button" onClick={() => scroll("next")} aria-label="التالي" className={arrow}>
							<ChevronLeft className="h-5 w-5" />
						</button>
					</div>
				}
			/>

			<ul
				ref={track}
				className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:px-0"
			>
				{shorts.map((short) => (
					<li key={short.videoId} className="w-40 shrink-0 snap-start sm:w-44 lg:w-48">
						<button
							type="button"
							onClick={() => setPlaying(short)}
							aria-label={`تشغيل: ${short.title}`}
							className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-white/5 text-right"
						>
							<Image
								src={short.thumbnail}
								alt=""
								fill
								sizes="(max-width: 640px) 160px, 192px"
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div
								aria-hidden
								className="absolute inset-0 bg-gradient-to-t from-[#101c1a]/95 via-[#101c1a]/25 to-transparent dark:from-[#171314]/95 dark:via-[#171314]/25"
							/>
							<span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110 dark:text-Muharram_primary">
								<Play className="h-4 w-4 -scale-x-100 fill-current" />
							</span>
							<span className="absolute inset-x-0 bottom-0 p-3">
								<span className="line-clamp-3 block text-sm font-bold leading-snug text-white">{short.title}</span>
								<span className="mt-1 block text-xs text-white/70">{formatDate(short.date.slice(0, 10))}</span>
							</span>
						</button>
					</li>
				))}
			</ul>

			{playing && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label={playing.title}
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
					onClick={() => setPlaying(null)}
				>
					<button
						type="button"
						aria-label="إغلاق"
						onClick={() => setPlaying(null)}
						className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
					>
						<X className="h-6 w-6" />
					</button>
					<div
						className="relative aspect-[9/16] h-full max-h-[85vh] max-w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
						onClick={(event) => event.stopPropagation()}
					>
						<iframe
							className="h-full w-full"
							src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1&playsinline=1&rel=0`}
							title={playing.title}
							allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
				</div>
			)}
		</section>
	)
}
