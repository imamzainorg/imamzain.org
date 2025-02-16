"use client"
import HeaderSections from "@/components/header-sections"
import Image from "next/image"
import { motion } from "framer-motion"
import SwiperCarousel from "@/components/swiper-carousel"
import galleryImages from "@/data/gallery.json"
import { useEffect, useState } from "react"

export default function GallerySection() {
		const [Show, setToShow] = useState(Number || null)
	 
		const updateBooksToShow = () => {
			const width = window.innerWidth
			if (width >= 1280)
				setToShow(5) 
			else if (width >= 1024)
				setToShow(3)  
			else if (width >= 768)
				setToShow(3)  
			else if (width >= 640)
				setToShow(2) 
			else setToShow(2)  
		}
	
		// Set initial value and update on resize
		useEffect(() => {
			updateBooksToShow()
			window.addEventListener("resize", updateBooksToShow)
			return () => window.removeEventListener("resize", updateBooksToShow)
		}, [])

	return (
		<div className="relative">
			<div className="absolute h-full w-full bg-dark-background -z-10" />
			<div
				className="absolute w-full h-full -z-10"
				style={{
					background:
						"radial-gradient(circle, rgba(0,0,0,0.9304096638655462) 20%, rgba(0,0,0,0.7399334733893557) 38%, rgba(0,0,0,0.4962359943977591) 58%, rgba(229,229,229,0) 100%)",
				}}
			/>
			<div className="container py-10 sm:py-20 space-y-8">
				<HeaderSections
					title={"معرض الصور"}
					moreButton={{
						label: "المزيد",
						href: "/media/images",
					}}
					dark
				/>

				<SwiperCarousel images={galleryImages} />
				<div className="mt-8 p-4 rounded-3xl grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-5 gap-4 grid-rows-1 bg-gray-600/35">
					{Show && galleryImages.slice(0, Show).map((img, index) => (
						<div
							key={index}
							className="relative rounded-2xl overflow-hidden h-40"
						>
							<Image
								src={img}
								width={300}
								height={200}
								className="w-full object-cover aspect-[20/16]"
								alt={`Image ${index}`}
							/>

							<motion.div
								initial={{ x: 0, y: 15, opacity: 0 }}
								whileHover={{
									y: 0,
									opacity: 1,
									transition: { duration: 0.3 },
								}}
								className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-end h-full   "
								style={{
									background:
										"linear-gradient(0deg, rgba(0,0,0,0.8715861344537815) 0%, rgba(0,0,0,0.40940126050420167) 45%, rgba(229,229,229,0) 100%)",
								}}
							>
								<div className="font-semibold text-lg p-4 text-white"></div>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
