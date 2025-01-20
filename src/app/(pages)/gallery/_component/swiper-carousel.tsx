"use client"

import Image from "next/image"

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

import styles from "./styles.module.css"

export default function SwiperCarousel({ images }: { images: string[] }) {
	return (
		<div className="relative">
			<section className="flex justify-center items-center">
				<div className="2xl:h-full w-full pl-4 pr-4 md:pr-8 md:pl-8 md:w-4/3 xmd:w-3/4 2xl:w-4/3 flex justify-center items-center">
					<SwiperComponent
						dir="ltr"
						effect="coverflow"
						grabCursor={true}
						coverflowEffect={{
							rotate: 0,
							stretch: 10,
							depth: 100,
							modifier: 1,
						}}
						pagination={{
							clickable: true,
							type: "custom",
						}}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						}}
						breakpoints={{
							900: {
								slidesPerView: 3,
							},
							800: {
								slidesPerView: 2,
							},
							360: {
								slidesPerView: 3,
							},
						}}
						modules={[EffectCoverflow, Pagination, Navigation]}
						className={`swiper-container ${styles.secondaryColor}`}
					>
						{images.slice(5).map((src, index) => (
							<SwiperSlide key={index}>
								<div className="flex justify-center items-center">
									<Image
										src={src}
										alt={`Image ${index}`}
										width={500}
										height={500}
										className="rounded-lg object-cover aspect-square shadow-lg 2xl:h-fit"
									/>
								</div>
							</SwiperSlide>
						))}
					</SwiperComponent>
				</div>
			</section>
			<div className="absolute top-1/2 left-0 right-0 transform xmd:ml-32 xmd:mr-32 xl:ml-48 xl:mr-48 2xl:mr-68 2xl:ml-68 -translate-y-1/2 flex justify-between px-4">
				<div
					className={`swiper-button-prev ${styles.secondaryColor}`}
				/>

				<div
					className={`swiper-button-next ${styles.secondaryColor}`}
				/>
			</div>
		</div>
	)
}
