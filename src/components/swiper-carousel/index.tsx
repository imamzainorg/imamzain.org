"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import {
    Swiper as SwiperComponent,
    type SwiperRef,
    SwiperSlide,
} from "swiper/react"
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import "swiper/css/autoplay"
import styles from "@/style/swiper.module.css"
import { Swiper } from "swiper/types"
import ImageView from "@/components/image-view";

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
        <div className="relative "

        >

            <SwiperComponent
                ref={swiperRef}
                onSwiper={setSwiperInstance}
                dir="rtl"
                loop={true}
                centeredSlides={true} // Centers the active slide
                slidesPerView={5} // Shows 5 slides at once (2 on each side of the center)
                loopAdditionalSlides={2} // Ensures enough duplicated slides for a seamless loop
                effect="coverflow"
                grabCursor={true}
                initialSlide={4}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
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
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className={`swiper-container  pl-4 pr-4 md:pr-8 md:pl-8  flex justify-center items-center ${styles.secondaryColor}
               h-[18rem] lg:h-[20rem]
               w-full md:w-[90%]  
                `}
            >
                {images.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className="h-full w-full"
                        style={{ boxSizing: "content-box" }}
                    >
                        <div className="flex justify-center items-center w-full h-full rounded-2xl bg-secondary shadow-2xl">
                            <ImageView
                                src={src}
                                alt={`Image ${index}`}
                                className="rounded-2xl object-cover shadow-lg w-full h-full  "
                                view
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperComponent>

            <div className="absolute bottom-0 top-0 left-0 bg-pink-400
            max-lg:hidden

            ">
                <div
                    onClick={handlePrev}
                    className={`swiper-button-prev ${styles.secondaryColor}`}
                />
            </div>
            <div className="absolute bottom-0 top-0 right-0
            max-lg:hidden
            ">
                <div
                    onClick={handleNext}
                    className={`swiper-button-next ${styles.secondaryColor}`}
                />
            </div>
        </div>
    )
}
