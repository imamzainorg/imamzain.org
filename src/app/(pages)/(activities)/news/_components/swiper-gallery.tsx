"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import {
	EffectCoverflow,
	Navigation,
	Autoplay,
	Pagination,
} from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"
import ImageView from "@/components/image-view"

interface Attachment {
	id: number
	pash: string
}

interface SwiperGalleryProps {
	images: Attachment[]
}

export default function SwiperGallery({ images }: SwiperGalleryProps) {
	return (
		<div>
			<Swiper
				spaceBetween={30}
				// Configure pagination to use a custom element (outside of the Swiper container)
				pagination={{
					clickable: true,
					el: ".custom-pagination", // this must match a CSS selector for your custom pagination element
				}}
				modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
				className="mySwiper"
				breakpoints={{
					1536: { slidesPerView: 4 },
					1280: { slidesPerView: 4 },
					1022: { slidesPerView: 3 },
					768: { slidesPerView: 3 },
					360: { slidesPerView: 1 },
				}}
			>
				{images.map((image) => (
					<SwiperSlide key={image.id}>
						<ImageView
							src={image.pash}
							alt={`Slide ${image.id}`}
							className="w-[18rem] xl:w-[17rem] 2xl:w-[20rem] h-60 mx-auto rounded-2xl"
                            view
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="custom-pagination mt-4" />
			<style jsx>{`
				.custom-pagination {
					text-align: center;
				}
			`}</style>
		</div>
	)
}
