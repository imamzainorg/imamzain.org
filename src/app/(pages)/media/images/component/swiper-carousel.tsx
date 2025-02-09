"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import {
	Swiper as SwiperComponent,
	type SwiperRef,
	SwiperSlide,
} from "swiper/react"
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

import styles from "../styles.module.css"
import { Swiper } from "swiper/types"

export default function SwiperCarousel({ images }: { images: string[] }) {
	const swiperRef = useRef<SwiperRef>(null)
	const [swiperInstance, setSwiperInstance] = useState<Swiper>()

	const handleNext = () => {
		if (swiperInstance) swiperInstance.slideNext()
	}

	const handlePrev = () => {
		if (swiperInstance) swiperInstance.slidePrev()
	}

	return (
		<div className="relative">
			<SwiperComponent
				ref={swiperRef}
				onSwiper={setSwiperInstance}
				dir="ltr"
				loop={true}
				effect="coverflow"
				grabCursor={true}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 100,
					modifier: 2.5,
				}}
				breakpoints={{
					1022: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 3,
					},
					360: {
						slidesPerView: 1,
					},
				}}
				modules={[EffectCoverflow, Pagination, Navigation]}
				className={`swiper-container h-72 pl-4 pr-4 md:pr-8 md:pl-8 w-full md:w-[90%] xmd:w-3/4 2xl:w-[90%] flex justify-center items-center ${styles.secondaryColor}`}
			>
				{images.map((src, index) => (
					<SwiperSlide key={index} className={"h-full w-full"}>
						<div className="flex justify-center items-center w-full h-full rounded-2xl bg-secondary">
							<Image
								src={src}
								alt={`Image ${index}`}
								fill
								className="rounded-2xl  hover:border-secondary-100 hover:border object-cover shadow-lg w-full h-full"
							/>
						</div>
					</SwiperSlide>
				))}
			</SwiperComponent>

			<div className="absolute max-md:hidden top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
				<div
					onClick={handlePrev}
					className={`swiper-button-prev ${styles.secondaryColor}`}
				/>

				<div
					onClick={handleNext}
					className={`swiper-button-next ${styles.secondaryColor}`}
				/>
			</div>
		</div>
	)
}
