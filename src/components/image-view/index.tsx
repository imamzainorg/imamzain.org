"use client"

import {useRef, useState} from "react"
import Image from "next/image"
import {Modal, useDisclosure} from "@heroui/react"
import {ModalBody, ModalContent} from "@heroui/modal"
import {Attachment} from "@/types/attachments"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import {Navigation} from "swiper/modules"
import styles from "@/style/swiper.module.css";
import {
	Swiper as SwiperComponent,
	type SwiperRef,
	SwiperSlide,
} from "swiper/react";
import {Swiper} from "swiper/types";

interface ImageViewProps {
	images?: Attachment[]
	src: string
	className?: string
	alt?: string
	view?: boolean
}

export default function ImageView({
									  images,
									  src,
									  className,
									  alt,
								  }: ImageViewProps) {

	const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
	const [activeIndex, setActiveIndex] = useState(0)

	const swiperRef = useRef<SwiperRef>(null);
	const [swiperInstance, setSwiperInstance] = useState<Swiper>();

	// When clicking the image, determine the index of the clicked image in the images array.
	const handleOpen = () => {
		if (images && images.length > 0) {
			const foundIndex = images.findIndex(image => image.path === src)
			setActiveIndex(foundIndex !== -1 ? foundIndex : 0)
		}
		onOpen()
	}

	const handleNext = () => {
		if (swiperInstance) swiperInstance.slideNext();
	};

	const handlePrev = () => {
		if (swiperInstance) swiperInstance.slidePrev();
	};
	return (
		<>
			<div className={`${className} relative`}>
				<Image
					src={src}
					alt={`Image-${alt ?? src}`}
					fill
					className={`${className}`}
					sizes="(max-width: 768px) 100vw , 700px"
				/>
				{images && (
					<div
						className="absolute top-0 left-0 w-full h-full bg-none cursor-pointer"
						onClick={handleOpen}
					>
					</div>
				)}
			</div>

			<Modal
				backdrop={'opaque'}
				className="bg-transparent  border-0 shadow-none"
				hideCloseButton
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
				size="5xl"

			>
				<ModalContent>
					<ModalBody className="p-0 gap-0">
						<div className="w-full h-[80vh] z-0">
							<div
								className="  max-lg:hidden   "
							>
								<div
									onClick={handleNext}
									className={`swiper-button-prev ${styles.secondaryColor}`}
								/>
							</div>
							<SwiperComponent
								ref={swiperRef}
								onSwiper={setSwiperInstance}
								initialSlide={activeIndex}
								modules={[Navigation]}
								className="h-full w-[90%]    "
								loop={true}
							>
								{images && images.map((image, index) => (
									<SwiperSlide key={index}>
										<Image
											src={image.path}
											alt={`Image-${image.path ?? index}`}
											fill
											className="object-contain  h-full w-[130%]"
										/>
									</SwiperSlide>
								))}
							</SwiperComponent>
							<div
								className=" w-w   z-50   max-lg:hidden   "
							>
								<div
									onClick={handlePrev}
									className={`swiper-button-next ${styles.secondaryColor}`}
								/>
							</div>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
