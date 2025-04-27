"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const HadithDisplay = ({
	hadith,
}: {
	hadith: { id: number; content: string }
}) => (
	<motion.div
		key={hadith.content}
		initial={{ opacity: 0, y: 50 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
		transition={{
			duration: 1.5,
			ease: "easeOut",
		}}
		className="text-3xl md:w-1/2 text-white text-center py-10 pt-32 px-12 md:px-0"
		aria-live="polite"
	>
		<h1 className="font-bold text-xl lg:text-2xl text-white pb-5">
			عَنِ الإِمَامِ زَيْنِ العَابِدِينَ (عَلَيْهِ السَّلَام)
		</h1>
		<p className="text-xl lg:text-2xl 2xl:text-3xl text-white text-center">
			{hadith.content}
		</p>
	</motion.div>
)

export default function TopImage({
	desktopImages,
	mobileImages,
	currentHadith,
}: {
	desktopImages: string[]
	mobileImages: string[]
	currentHadith: {
		id: number
		content: string
	}
}) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [prevImageIndex, setPrevImageIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [images, setImages] = useState(desktopImages)

	// Set Proper Image Array
	useEffect(() => {
		const checkMobile = () => {
			const mobileBreakpoint = 640
			setImages(
				window.innerWidth < mobileBreakpoint
					? mobileImages
					: desktopImages,
			)
		}

		checkMobile()

		window.addEventListener("resize", checkMobile)

		return () => window.removeEventListener("resize", checkMobile)
	}, [desktopImages, mobileImages])

	// Hadith should show only on first Image
	const showHadith = currentImageIndex === 0

	const nextImage = useCallback(() => {
		setPrevImageIndex(currentImageIndex)
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
	}, [currentImageIndex, images.length])

	useEffect(() => {
		if (isPaused) return

		const imageInterval = setInterval(nextImage, 5000) // 5 Seconds For Each Slide
		return () => clearInterval(imageInterval)
	}, [currentImageIndex, isPaused, nextImage])

	const maskStyles = {
		WebkitMaskImage: `url('/images/landing-mask.svg')`,
		maskImage: `url('/images/landing-mask.svg')`,
		WebkitMaskRepeat: "no-repeat",
		maskRepeat: "no-repeat",
		WebkitMaskSize: "100%",
		maskSize: "100%",
		WebkitMaskPosition: "bottom",
		maskPosition: "bottom",
	}

	return (
		<div
			className="relative w-full h-[96vh] max-lg:h-[91vh] bg-[#006654] overflow-hidden"
			style={maskStyles}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			role="region"
			aria-label="Featured image and hadith of the day"
		>
			<div
				className="relative w-full h-[95vh] max-lg:h-[90vh] bg-[#006654] overflow-hidden"
				style={maskStyles}
			>
				{/* Gradient overlay - only shown when albaqi.jpg is displayed */}
				<AnimatePresence>
					{showHadith && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1 }}
							className="absolute top-0 right-0 w-full h-full z-20"
							style={{
								background: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.1) 100%)`,
							}}
						/>
					)}
				</AnimatePresence>

				{/* Hadith display - only shown when albaqi.jpg is displayed */}
				<div className="absolute flex flex-col justify-center gap-4 items-center bottom-0 right-0 w-full h-1/2 z-30">
					<AnimatePresence mode="wait">
						{showHadith && <HadithDisplay hadith={currentHadith} />}
					</AnimatePresence>
				</div>

				{/* Image navigation dots */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
					{images.map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full ${
								index === currentImageIndex
									? "bg-primary"
									: "bg-white/50"
							}`}
							onClick={() => {
								setPrevImageIndex(currentImageIndex)
								setCurrentImageIndex(index)
							}}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				{/* Image Transition with Overlapping Fade */}
				<div className="absolute inset-0 w-full h-full">
					{/* Previous Image */}
					<Image
						src={images[prevImageIndex]}
						alt="Background image"
						fill
						sizes="(max-width: 768px) 100vw, 100vw"
						className="object-cover absolute inset-0"
						style={{ objectPosition: "center" }}
						priority={prevImageIndex === 0}
					/>

					{/* New Image */}
					<motion.div
						key={images[currentImageIndex]}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1.5 }}
						className="absolute inset-0 w-full h-full"
					>
						<Image
							src={images[currentImageIndex]}
							alt="Background image"
							fill
							sizes="(max-width: 768px) 100vw, 100vw"
							className="object-cover"
							style={{ objectPosition: "center" }}
							priority={currentImageIndex === 0}
						/>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
