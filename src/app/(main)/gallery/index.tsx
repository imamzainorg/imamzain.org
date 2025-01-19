import { galleryImages } from "@/lib/data"

import SwiperCarousel from "@/app/(pages)/gallery/_component/swiper-carousel"
import Section from "@/components/section"

export default function GallerySection() {
	return (
		<div className="relative">
			<div className="absolute h-full w-full bg-dark-background -z-10" />
			<div className="container py-10 sm:py-20 space-y-8">
				<Section title="معرض الصور" />

				<SwiperCarousel images={galleryImages} />
			</div>
		</div>
	)
}
