"use client"

import { useState } from "react"
import Image from "next/image"
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react"
import { Attachment } from "@/types/attachments"

import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react"
import { Swiper } from "swiper/types"
import { Keyboard, Thumbs } from "swiper/modules"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const controlClass =
	"grid size-12 shrink-0 place-items-center rounded-full border-2 border-white/25 bg-white/10 text-white transition hover:border-secondary hover:bg-secondary"

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
	const [mainSwiper, setMainSwiper] = useState<Swiper | null>(null)
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
			<div
				className={`${className} relative w-inherit h-inherit  overflow-hidden`}
			>
				<Image
					src={src}
					alt={`Image-${alt ?? src}`}
					fill
					unoptimized
					quality={75}
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
				classNames={{ backdrop: "bg-[#0b1412]/95 backdrop-blur-sm", base: "m-2 bg-transparent shadow-none sm:m-4" }}
				hideCloseButton
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
				size="5xl"
			>
				<ModalContent className="border-0 shadow-none">
					<ModalBody className="p-0 gap-0">
						<div className="flex h-[88vh] w-full flex-col gap-3 text-white">
							{/* Top bar: position and close */}
							<div className="flex items-center justify-between">
								<span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tabular-nums" dir="ltr">
									{activeIndex + 1} / {images?.length ?? 0}
								</span>
								<button type="button" onClick={onClose} aria-label="إغلاق" className={controlClass}>
									<X className="size-5" />
								</button>
							</div>

							{/* The arrows sit beside the photo, never on top of it */}
							<div className="flex min-h-0 flex-1 items-center gap-3 md:gap-5">
								<button type="button" onClick={() => mainSwiper?.slidePrev()} aria-label="الصورة السابقة" className={`${controlClass} max-md:hidden`}>
									<ChevronRight className="size-6" />
								</button>
								<SwiperComponent
									initialSlide={activeIndex}
									loop={true}
									keyboard={{ enabled: true }}
									spaceBetween={24}
									className="h-full min-w-0 flex-1"
									onSwiper={setMainSwiper}
									thumbs={{
										swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
									}}
									modules={[Keyboard, Thumbs]}
									onSlideChange={(swiper) => {
										const realIndex = swiper.realIndex
										setActiveIndex(realIndex)
										if (thumbsSwiper && !thumbsSwiper.destroyed) {
											thumbsSwiper.slideToLoop(realIndex, 300)
										}
									}}
								>
									{images?.map((image, index) => (
										<SwiperSlide key={index} className="!flex items-center justify-center">
											<Image
												src={image.path}
												alt={`Image-${index}`}
												width={1600}
												height={1067}
												unoptimized
												className="h-full w-full rounded-2xl object-contain"
											/>
										</SwiperSlide>
									))}
								</SwiperComponent>
								<button type="button" onClick={() => mainSwiper?.slideNext()} aria-label="الصورة التالية" className={`${controlClass} max-md:hidden`}>
									<ChevronLeft className="size-6" />
								</button>
							</div>

							{/* Thumbnails */}
							<SwiperComponent
								onSwiper={setThumbsSwiper}
								watchSlidesProgress
								centeredSlides={true}
								loop={true}
								spaceBetween={10}
								breakpoints={{
									320: { slidesPerView: 4 },
									640: { slidesPerView: 6 },
									1024: { slidesPerView: 9 },
								}}
								modules={[Thumbs]}
								className="h-16 w-full shrink-0 md:h-20"
							>
								{images?.map((image, index) => (
									<SwiperSlide key={index}>
										<Image
											src={image.path}
											alt={`Thumb-${index}`}
											width={120}
											height={80}
											unoptimized
											className={`h-full w-full cursor-pointer rounded-xl border-2 object-cover transition-all duration-200 ${
												index === activeIndex
													? "border-secondary opacity-100"
													: "border-transparent opacity-50 hover:opacity-80"
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
