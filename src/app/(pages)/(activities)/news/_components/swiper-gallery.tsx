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
import { Attachment } from "@/types/attachments"

interface SwiperGalleryProps {
	images: Attachment[]
}

export default function SwiperGallery({ images }: SwiperGalleryProps) {
	return (
		<div>
			<Swiper
				spaceBetween={30}
				pagination={{
					clickable: true,
					el: ".custom-pagination",
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
							images={images}
							src={image.path}
							alt={`Slide ${image.id}`}
							className="w-full sm:w-[15rem] xl:w-[17rem] 2xl:w-[20rem] h-60 sm:h-40 xl:h-52 mx-auto rounded-2xl"
							// view: this property doesn't exit ImageView, Edit ImageView component to fix
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
