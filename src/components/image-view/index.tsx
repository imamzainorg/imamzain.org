"use client"

import Image from "next/image"
import { Modal, useDisclosure } from "@heroui/react"
import { ModalBody, ModalContent } from "@heroui/modal"

interface ImageViewProps {
	src: string
	className?: string
	alt?: string
	view?: boolean
}

export default function ImageView({
	src,
	className,
	alt,
	view,
}: ImageViewProps) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	return (
		<>
			<div className={`${className} relative`}>
				<Image
					src={src}
					alt={`Image-${alt ?? src}`}
					fill
					className={`${className}  `}
				/>

				<div
					className={`${view ? "absolute top-0 left-0 w-full h-full bg-none cursor-pointer" : "hidden"} `}
					onClick={onOpen}
				>
				</div>
			</div>

			<Modal
				className={"bg-black"}
				hideCloseButton
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
				size={"5xl"}
			>
				<ModalContent>
					<ModalBody className={"p-0 gap-0"}>
						<div className="w-full h-[80vh] z-0">
							<Image
								src={src}
								alt={`Image-${alt ?? src}`}
								fill
								className="object-contain"
							/>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
