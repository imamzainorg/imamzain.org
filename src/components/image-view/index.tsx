"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react"
import { Attachment } from "@/types/attachments"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import {
  Swiper as SwiperComponent,
  SwiperSlide,
} from "swiper/react"
import { Swiper } from "swiper/types"
import { Navigation, Thumbs } from "swiper/modules"

interface ImageViewProps {
  images?: Attachment[]
  src: string
  className?: string
  alt?: string
}

export default function ImageView({
  images,
  src,
  className,
  alt,
}: ImageViewProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null)

  const handleOpen = () => {
    if (images && images.length > 0) {
      const foundIndex = images.findIndex((image) => image.path === src)
      setActiveIndex(foundIndex !== -1 ? foundIndex : 0)
    }
    onOpen()
  }

  return (
    <>
      <div className={`${className} relative w-inherit h-inherit  overflow-hidden`}>
        <Image
          src={src}
          alt={`Image-${alt ?? src}`}
          fill
          className="object-cover w-inherit h-inherit"
          sizes="(max-width: 768px) 100vw, 700px"
        />
        {images && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-none cursor-pointer"
            onClick={handleOpen}
          />
        )}
      </div>

      <Modal
        backdrop="opaque"
        className="bg-transparent   border-0 shadow-none"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="5xl"
      >
        <ModalContent  className="border-0 shadow-none">
          <ModalBody className="p-0 gap-0">
            <div className="w-full h-[80vh] flex flex-col justify-center items-center">
              {/* Main Swiper */}
              <SwiperComponent
                initialSlide={activeIndex}
                loop={true}
                navigation
  style={
    {
      "--swiper-navigation-color": "#bb9661",
      "--swiper-pagination-color": "#ccff61",
    } as React.CSSProperties & { [key: string]: string }
  }
  className=" w-full h-[75%] mb-6"
  
                thumbs={{
                  swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                modules={[Navigation, Thumbs]}
           onSlideChange={(swiper) => {
  const realIndex = swiper.realIndex
  setActiveIndex(realIndex)

  if (thumbsSwiper && !thumbsSwiper.destroyed) {
    thumbsSwiper.slideToLoop(realIndex, 300)
  }
}}
            
              >
                {images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.path}
                      alt={`Image-${index}`}
                      width={1600}
                      height={1067}
                      className="object-contain w-full h-full "
                    />
                  </SwiperSlide>
                ))}
              </SwiperComponent>

              {/* Thumbnails Swiper */}
              <SwiperComponent
                onSwiper={setThumbsSwiper}
                watchSlidesProgress
                centeredSlides={true}
                loop={true}
                spaceBetween={10}
                breakpoints={{
                  320: { slidesPerView: 3 },
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                }}
                modules={[Thumbs]}
                className="w-full bg-opacity-50  bg-black  max-w-5xl h-[90px] pt-4 px-2"
              >
                {images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.path}
                      alt={`Thumb-${index}`}
                      width={120}
                      height={80}
                      className={`object-cover w-full hover:cursor-pointer h-full rounded-md border-2 transition-all duration-200 ${
                        index === activeIndex
                          ? "border-primary scale-105"
                          : "border-transparent"
                      }`}
                    />
                  </SwiperSlide>
                ))}
              </SwiperComponent>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
