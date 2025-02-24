"use client";

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const images = ["/images/albaqi.jpg"]

export default function TopImage() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [prevImageIndex, setPrevImageIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setPrevImageIndex(currentImageIndex)
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
		}, 10000) // 5 minutes

		return () => clearInterval(interval)
	}, [currentImageIndex])

	return (
		<div
			className="relative w-full h-[96vh] max-lg:h-[91vh] bg-[#006654] overflow-hidden"
			style={{
				WebkitMaskImage: `url('/images/landing-mask.svg')`,
				maskImage: `url('/images/landing-mask.svg')`,
				WebkitMaskRepeat: "no-repeat",
				maskRepeat: "no-repeat",
				WebkitMaskSize: "100%",
				maskSize: "100%",
				WebkitMaskPosition: "bottom",
				maskPosition: "bottom",
			}}
		>
			<div
				className="relative w-full h-[95vh] max-lg:h-[90vh] bg-[#006654] overflow-hidden"
				style={{
					WebkitMaskImage: `url('/images/landing-mask.svg')`,
					maskImage: `url('/images/landing-mask.svg')`,
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					WebkitMaskSize: "100%",
					maskSize: "100%",
					WebkitMaskPosition: "bottom",
					maskPosition: "bottom",
				}}
			>
				<div
					className="absolute top-0 right-0 w-full h-full bg-amber-500 z-20"
					style={{
						background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%, rgba(255,255,255,0) 100%)`,
					}}
				/>
				<div className="absolute flex flex-col justify-center gap-4 items-center bottom-0 right-0 w-full h-1/2 z-30">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 1.5,
							ease: "easeOut",
						}}
						className="text-3xl text-white text-center px-12 md:px-0"
					>
						<h1 className="font-bold text-xl lg:text-2xl text-white">
							عن الإمام زين العابدين (عليه السلام):
						</h1>
						<p className="text-xl lg:text-2xl 2xl:text-3xl text-white text-center">
							اعلم أنك إن تكن ذنبا في الخير خير لك من أن تكون رأسا
							في الشر.
						</p>
					</motion.div>
				</div>

				{/* Image Transition with Overlapping Fade */}
				<div className="absolute inset-0 w-full h-full">
					{/* Previous Image */}
					<Image
						src={images[prevImageIndex]}
						alt="Previous landing image"
						fill
						sizes="(max-width: 768px) 100vw , 700px"
						className="object-cover absolute inset-0"
						style={{ objectPosition: "top" }}
					/>

					{/* Fading in New Image */}
					<motion.div
						key={images[currentImageIndex]}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 3 }} // Smooth fade over 3 seconds
						className="absolute inset-0 w-full h-full"
					>
						<Image
							src={images[currentImageIndex]}
							alt="Landing image"
							fill
							sizes="(max-width: 768px) 100vw , 700px"
							className="object-cover"
							style={{ objectPosition: "top" }}
						/>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
