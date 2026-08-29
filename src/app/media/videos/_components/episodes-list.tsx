"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import type SwiperCore from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import type { YouTubeVideo } from "@/types/youtube-data"
import { thumbnailUrl } from "@/lib/youtube"

export default function EpisodesList({
	videos,
	currentSlug,
	onSelect,
}: {
	videos: YouTubeVideo[]
	currentSlug: string
	onSelect: (slug: string) => void
}) {
	const swiperRef = useRef<SwiperCore | null>(null)
	// نتتبع طرفي الكاروسيل فعليًا (مو بس كلاس disabled:opacity-40 بدون
	// ربط) حتى الأزرار تنعطّل فعلاً لما ما يبقى حلقات بهذا الاتجاه
	const [edge, setEdge] = useState({ start: true, end: false })

	const syncEdge = (swiper: SwiperCore) => {
		setEdge({ start: swiper.isBeginning, end: swiper.isEnd })
	}

	// إذا فيديو واحد بس بالمجموعة، ماكو داعي لهذا القسم
	if (videos.length <= 1) return null

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between gap-4 mb-4">
				<div>
					<h2 className="text-white font-bold text-lg">
						الحلقات في هذه السلسلة
					</h2>

					<p className="text-slate-500 text-xs mt-1">
						{videos.length} حلقات
					</p>
				</div>
			</div>

			<div className="relative">
				<button
					type="button"
					onClick={() => swiperRef.current?.slideNext()}
					disabled={edge.end}
					aria-label="الحلقات التالية"
					className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gray-900/90 text-white shadow-lg transition hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
				>
					<ChevronRight className="h-5 w-5" />
				</button>

				<Swiper
					dir="rtl"
					onSwiper={(swiper) => {
						swiperRef.current = swiper
						syncEdge(swiper)
					}}
					onSlideChange={syncEdge}
					onProgress={syncEdge}
					onReachBeginning={syncEdge}
					onReachEnd={syncEdge}
					onFromEdge={syncEdge}
					freeMode={{ enabled: true, sticky: false }}
					grabCursor
					spaceBetween={4}
					watchOverflow
					modules={[FreeMode]}
					className="w-full max-w-full !overflow-hidden"
					breakpoints={{
						0: { slidesPerView: 1.35 },
						640: { slidesPerView: 2.35 },
						1024: { slidesPerView: 3.35 },
						1280: { slidesPerView: 4.35 },
					}}  
				>
				{videos.map((video) => {
					const videoIndex = videos.findIndex(
						(item) => item.slug === video.slug,
					)

					const isActive = video.slug === currentSlug

					return (
					<SwiperSlide key={video.slug}>
						<button
							type="button"
							onClick={() => onSelect(video.slug)}
							aria-current={isActive}
							aria-label={`الحلقة ${videoIndex + 1}: ${video.title}`}
							className={`group relative min-w-0 overflow-hidden rounded-xl text-right transition-all duration-300 ${
								isActive
									? "ring-2 ring-secondary dark:ring-Muharram_secondary"
									: "opacity-80 hover:opacity-100 hover:-translate-y-1"
							}`}
						>
							{/* الصورة */}
							<div className="relative aspect-video overflow-hidden">
								<Image
									src={thumbnailUrl(video.thumbnail)}
									alt={video.title}
									fill
									sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>

								{/* طبقة عند hover */}
								<div
									className={`absolute inset-0 transition-opacity duration-300 ${
										isActive
											? "bg-black/20"
											: "bg-black/0 group-hover:bg-black/20"
									}`}
								/>

								{/* رقم الحلقة */}
								<span className="absolute top-2 right-2 min-w-7 h-7 px-2 flex items-center justify-center rounded-md bg-black/70 text-white text-xs font-semibold backdrop-blur-sm">
									{videoIndex + 1}
								</span>

								{/* حالة الحلقة الحالية */}
								{isActive && (
									<span className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-secondary text-white text-[10px] font-semibold">
										تشاهد الآن
									</span>
								)}
							</div>

							{/* العنوان */}
							<div className="px-1 pt-2 pb-1">
								<p className="text-xs text-white line-clamp-2 leading-5">
									{video.title}
								</p>
							</div>
						</button>
					</SwiperSlide>
					)
				})}
				</Swiper>

				<button
					type="button"
					onClick={() => swiperRef.current?.slidePrev()}
					disabled={edge.start}
					aria-label="الحلقات السابقة"
					className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gray-900/90 text-white shadow-lg transition hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
			</div>
		</div>
	)
}