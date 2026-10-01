"use client"

import Image from "next/image"
import Link from "next/link"
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

// Five category tiles in one row on desktop, three on tablets and a 2x2 grid on phones.
function tileVisibility(index: number) {
	if (index < 3) return ""
	if (index === 3) return "md:hidden lg:block"
	return "hidden lg:block"
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

			<ul className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
				{categoryImages.slice(0, 5).map((gallery, i) => (
					<li key={gallery.id} className={tileVisibility(i)}>
						<Reveal y={30} delay={(i % 5) * 0.08} className="h-full">
							<Link
								href={`/media/images?category=${encodeURIComponent(gallery.linkedCategory)}`}
								className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-white/5"
							>
								<Image
									src={gallery.url}
									alt=""
									fill
									sizes="(max-width: 768px) 50vw, 20vw"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div
									aria-hidden
									className="absolute inset-0 bg-gradient-to-t from-[#101c1a] via-[#101c1a]/30 to-transparent dark:from-[#171314] dark:via-[#171314]/30"
								/>
								<div className="absolute inset-x-0 bottom-0 p-5">
									<h3 className="text-xl font-bold text-white">{gallery.linkedCategory}</h3>
									<p className="mt-1 text-sm leading-6 text-white/70">
										{categoryBody[gallery.linkedCategory]}
									</p>
								</div>
							</Link>
						</Reveal>
					</li>
				))}
			</ul>
		</DarkBand>
	)
}
