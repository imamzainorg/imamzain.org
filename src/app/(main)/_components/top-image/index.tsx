"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Define different image sets for different screen sizes
const desktopImages = [
	"/images/albaqi.jpg",
	"/images/albaqi_2.jpg",
	"/images/hero-3.jpg",
]

// Mobile optimized images - replace these with your actual mobile image paths
const mobileImages = [
	"/images/albaqi.jpg",
	"/images/albaqi_2.jpg",
	"/images/hero-3-vertical.jpg",
]

import hadiths from "@/data/hadiths.json"

const HadithDisplay = ({
	hadith,
}: {
	hadith: { id: number; author: string; content: string }
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
			{hadith.author}
		</h1>
		<p className="text-xl lg:text-2xl 2xl:text-3xl text-white text-center">
			{hadith.content}
		</p>
	</motion.div>
)

export default function TopImage() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [prevImageIndex, setPrevImageIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [images, setImages] = useState(desktopImages)

	// Get the current day of the month (1-31)
	const today = new Date()
	const dayOfMonth = today.getDate() // e.g., 1 for the 1st, 15 for the 15th, etc.
	// Calculate the hadith index based on the day.
	const currentHadithIndex = (dayOfMonth - 1) % hadiths.length

	// Use useEffect to handle window resize and set proper image array
	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return

		// Initial check for mobile
		const checkMobile = () => {
			const mobileBreakpoint = 768 // Adjust this value as needed
			const mobile = window.innerWidth < mobileBreakpoint
			setIsMobile(mobile)
			setImages(mobile ? mobileImages : desktopImages)
		}

		// Run check on mount
		checkMobile()

		// Add resize listener
		window.addEventListener("resize", checkMobile)

		// Clean up
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	// Check if the albaqi.jpg image is currently displayed
	// Update this to check for both mobile and desktop versions
	const showHadith =
		(!isMobile && images[currentImageIndex] === "/images/albaqi.jpg") ||
		(isMobile && images[currentImageIndex] === "/images/albaqi_mobile.jpg")

	// Move to next image
	const nextImage = useCallback(() => {
		setPrevImageIndex(currentImageIndex)
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
	}, [currentImageIndex, images.length])

	// Change image every 5 seconds
	useEffect(() => {
		if (isPaused) return

		const imageInterval = setInterval(nextImage, 5000)
		return () => clearInterval(imageInterval)
	}, [currentImageIndex, isPaused, nextImage])

	// Mask styles as a CSS class variable to avoid repetition
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
				{/* Gradient overlay */}
				<div
					className="absolute top-0 right-0 w-full h-full z-20"
					style={{
						background: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.1) 100%)`,
					}}
				/>

				{/* Hadith display - only shown when albaqi.jpg is displayed */}
				<div className="absolute flex flex-col justify-center gap-4 items-center bottom-0 right-0 w-full h-1/2 z-30">
					<AnimatePresence mode="wait">
						{showHadith && (
							<HadithDisplay
								hadith={hadiths[currentHadithIndex]}
							/>
						)}
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

					{/* Fading in New Image */}
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
