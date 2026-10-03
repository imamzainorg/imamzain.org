"use client"

import Link from "next/link"
import { CalendarHeart, Images, Mic, Newspaper, Sparkles, Trophy, type LucideIcon } from "lucide-react"
import DarkBand from "@/components/dark-band"
import { MoreLink, SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import SwiperCarousel from "@/components/swiper-carousel"
import type { GallerySlide, GalleryCategoryImage } from "./gallery-data"

const categoryBody: Record<string, string> = {
	نشاطات: "استكشف نشاطاتنا المتنوعة",
	ندوات: "تابع أحدث الندوات",
	مناسبات: "شاهد مناسباتنا الخاصة",
	مسابقات: "انضم إلى مسابقاتنا",
	اخبار: "آخر الأخبار والتحديثات",
}

const categoryIcons: Record<string, LucideIcon> = {
	نشاطات: Sparkles,
	ندوات: Mic,
	مناسبات: CalendarHeart,
	مسابقات: Trophy,
	اخبار: Newspaper,
}

// The photo gallery on a dark band: a coverflow of featured photos, then a tile per category.
export default function GallerySection({
	sliderImages,
	categoryImages,
}: {
	sliderImages: GallerySlide[]
	categoryImages: GalleryCategoryImage[]
}) {
	return (
		<DarkBand className="mt-24">
			<SectionTitle
				light
				title="معرض الصور"
				className="mb-10"
				action={
					<MoreLink href="/media/images" light>
						المزيد
					</MoreLink>
				}
			/>

			<Reveal>
				<SwiperCarousel images={sliderImages} />
			</Reveal>

			<ul className="mt-14 flex flex-wrap justify-center gap-3 md:gap-4">
				{categoryImages.slice(0, 5).map((gallery, i) => {
					const Icon = categoryIcons[gallery.linkedCategory] ?? Images
					return (
						<li key={gallery.id}>
							<Reveal y={20} delay={i * 0.06}>
								<Link
									href={`/media/images?category=${encodeURIComponent(gallery.linkedCategory)}`}
									className="group flex items-center gap-3 rounded-2xl border-2 border-white/20 bg-white/5 py-2.5 pl-6 pr-2.5 transition duration-300 hover:-translate-y-1 hover:border-secondary hover:bg-white/10 dark:hover:border-Muharram_secondary"
								>
									<span className="grid size-12 place-items-center rounded-xl bg-secondary text-white transition duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:bg-Muharram_secondary">
										<Icon className="size-6" strokeWidth={1.8} />
									</span>
									<span>
										<span className="block text-lg font-bold text-white">{gallery.linkedCategory}</span>
										<span className="block text-sm text-white/65">{categoryBody[gallery.linkedCategory]}</span>
									</span>
								</Link>
							</Reveal>
						</li>
					)
				})}
			</ul>
		</DarkBand>
	)
}
