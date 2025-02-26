"use client"

import { useState } from "react"
import Image from "next/image"
import { Modal, useDisclosure } from "@heroui/react"
import { ModalBody, ModalContent } from "@heroui/modal"
import { Attachment } from "@/types/attachments"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation } from "swiper/modules"

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
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [activeIndex, setActiveIndex] = useState(0)

	// When clicking the image, determine the index of the clicked image in the images array.
	const handleOpen = () => {
		if (images && images.length > 0) {
			const foundIndex = images.findIndex(image => image.path === src)
			setActiveIndex(foundIndex !== -1 ? foundIndex : 0)
		}
		onOpen()
	}

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
				className="bg-transparent "
				hideCloseButton
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
				size="5xl"
			>
				<ModalContent>
					<ModalBody className="p-0 gap-0">
						<div className="w-full h-[80vh] z-0">
							<Swiper
								initialSlide={activeIndex}
								navigation
								modules={[Navigation]}
								className="h-full w-full "

							>
								{images && images.map((image, index) => (
									<SwiperSlide key={index} >
										<Image
											src={image.path}
											alt={`Image-${image.path ?? index}`}
											fill
											className="object-contain h-full w-[130%]"
										/>
									</SwiperSlide>
								))}
							</Swiper>

						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
