"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, EffectCoverflow, Keyboard, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper/types"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import { cn } from "@/lib/utils"
import { arabicNumber } from "../_lib/anchors"
import { storyThemes, type Story, type StoryTheme } from "../_data/biography"
import { MoreLink, TitleIcon } from "./brand"

const navButton =
	"flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white"

export default function Stories({ stories }: { stories: Story[] }) {
	const [theme, setTheme] = useState<StoryTheme | "all">("all")
	const [swiper, setSwiper] = useState<SwiperType>()

	const filtered = theme === "all" ? stories : stories.filter((s) => s.theme === theme)
	const filters = [
		{ key: "all" as const, label: "الكل", count: stories.length },
		...(Object.keys(storyThemes) as StoryTheme[]).map((key) => ({
			key,
			label: storyThemes[key],
			count: stories.filter((s) => s.theme === key).length,
		})),
	]

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex flex-wrap gap-2" role="group" aria-label="تصفية المشاهد">
					{filters.map((f) => (
						<button
							key={f.key}
							type="button"
							aria-pressed={theme === f.key}
							onClick={() => setTheme(f.key)}
							className={cn(
								"rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 md:text-base",
								theme === f.key
									? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
									: "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary",
							)}
						>
							{f.label}
							<span className="mr-2 opacity-60">{arabicNumber(f.count)}</span>
						</button>
					))}
				</div>
				<div className="hidden gap-2 md:flex">
					<button type="button" aria-label="المشهد السابق" onClick={() => swiper?.slidePrev()} className={navButton}>
						<ChevronRight className="h-5 w-5" />
					</button>
					<button type="button" aria-label="المشهد التالي" onClick={() => swiper?.slideNext()} className={navButton}>
						<ChevronLeft className="h-5 w-5" />
					</button>
				</div>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={theme}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -12 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
				>
					<Swiper
						dir="rtl"
						modules={[EffectCoverflow, Pagination, Keyboard, A11y]}
						effect="coverflow"
						coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1, slideShadows: false }}
						centeredSlides
						grabCursor
						keyboard={{ enabled: true }}
						pagination={{ clickable: true }}
						initialSlide={filtered.length > 2 ? 1 : 0}
						slidesPerView={1.1}
						spaceBetween={16}
						breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
						onSwiper={setSwiper}
						className="stories-swiper !px-1 !pb-14 !pt-8"
					>
						{filtered.map((story) => (
							<SwiperSlide key={story.title} className="!h-auto">
								<article className="relative flex h-full flex-col overflow-hidden rounded-[40px] bg-gradient-to-br from-primary to-[#00493c] p-7 text-white shadow-xl dark:from-Muharram_primary dark:to-black md:p-9">
									<div
										aria-hidden
										className="pointer-events-none absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:320px] opacity-[0.07]"
									/>
									<span className="relative flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white/70">
										<TitleIcon className="w-3" />
										{storyThemes[story.theme]}
									</span>
									<h3 className="relative mt-3 text-2xl font-bold">{story.title}</h3>
									<p className="relative mt-4 flex-1 text-lg leading-loose text-white/85">{story.text}</p>
									<div className="relative mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-white/15 pt-4">
										<span className="text-xs leading-6 text-white/55">{story.source}</span>
										<MoreLink href={story.href} light>
											الرواية كاملة
										</MoreLink>
									</div>
								</article>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
