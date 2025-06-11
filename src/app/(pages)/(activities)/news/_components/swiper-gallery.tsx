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
		<div className="w-full">
			<Swiper
				spaceBetween={20}
				pagination={{
					clickable: true,
					el: ".custom-pagination",
				}}
				navigation={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
				className="mySwiper w-full"
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					640: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1280: {
						slidesPerView: 4,
						spaceBetween: 25,
					},
					1536: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				}}
			>
				{images.map((image) => (
					<SwiperSlide key={image.id} className="h-auto">
						<div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
							<ImageView
								images={images}
								src={image.path}
								alt={`Gallery image ${image.id}`}
								className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="custom-pagination mt-6" />

			<style jsx global>{`
				.mySwiper {
					padding: 0 10px 40px 10px;
				}

				.mySwiper .swiper-slide {
					height: auto;
				}

				.custom-pagination {
					text-align: center;
					position: relative;
				}

				.custom-pagination .swiper-pagination-bullet {
					width: 12px;
					height: 12px;
					background: #cbd5e1;
					opacity: 1;
					margin: 0 6px;
					transition: all 0.3s ease;
				}

				.custom-pagination .swiper-pagination-bullet-active {
					background: var(--primary-color, #3b82f6);
					transform: scale(1.2);
				}

				@media (max-width: 768px) {
					.mySwiper .swiper-button-next,
					.mySwiper .swiper-button-prev {
						width: 36px;
						height: 36px;
					}

					.mySwiper .swiper-button-next:after,
					.mySwiper .swiper-button-prev:after {
						font-size: 14px;
					}
				}
			`}</style>
		</div>
	)
}
