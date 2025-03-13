"use client"

import { PlayButtonIcon, TimeIcon } from "@/assets/icons/reusable"
import ImageView from "@/components/image-view"
import { Eye } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@heroui/react"
// import useWindowEvents from "@/hooks/window-events"

export default function VideoComponent() {
	const [isPlaying, setIsPlaying] = useState(false)
	const containerRef = useRef(null)
	//   const {isSmallScreen} = useWindowEvents()
	const handleOpenLink = () => {
		window.open(
			"https://www.youtube.com/embed/c2In_ZUNTsI?autoplay=1",
			"_blank",
		)
	}
	useEffect(() => {
		const timerId = setTimeout(() => {
			setIsPlaying(true) // Start the timer
		}, 3000) // 3000ms = 3 seconds
		return () => clearTimeout(timerId)
	}, [])

	return (
		<div
			ref={containerRef}
			className="relative  h-[70vh]   lg:h-screen overflow-hidden bg-black flex flex-col justify-center items-center"
		>
			{/* Video iframe auto-playing muted */}
			{isPlaying && (
				<iframe
					className={`w-[100rem] h-[90vh]  lg:w-[140rem] lg:h-[130vh]  transition-opacity duration-300 absolute   ${
						isPlaying ? "opacity-100" : "opacity-0"
					}`}
					src="https://www.youtube.com/embed/c2In_ZUNTsI?autoplay=1&mute=1&controls=0&amp;start=11"
					title="YouTube Video"
					allow="autoplay; fullscreen"
				></iframe>
			)}

			<div
				className={`w-full h-full transition-opacity duration-300 absolute  ${
					isPlaying ? "opacity-0" : "opacity-100"
				}`}
			>
				<ImageView
					src="/news/img.png"
					alt="Video thumbnail"
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Overlays (gradients, text, etc.) */}
			<div
				className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
				style={{
					background:
						"linear-gradient(93deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 54%, rgba(37,52,63,0.47) 79%, rgba(37,52,63,1) 100%)",
				}}
			></div>
			<div
				className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
				style={{
					background:
						"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 59%, rgba(37,52,63,1) 100%)",
				}}
			></div>
			<div
				className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
				style={{
					background:
						"linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 54%, rgba(37,52,63,0.47) 79%, rgba(37,52,63,1) 100%)",
				}}
			></div>

			{/* Content overlay with video info and the play button */}
			<div className="absolute group top-0 right-0 w-full font-semibold text-sm h-full z-10">
				<div className="container w-full h-full flex flex-col justify-end items-start cursor-pointer">
					<div className="bg-neutral-4 w-[70%] lg:w-[35rem] pb-10 md:pb-28 lg:pb-32  flex flex-col justify-end items-start lg:gap-4">
						<div className="  pb-4 text-xl lg:text-4xl font-bold text-[#bb9661]">
							الملتقى التشاوري
						</div>
						<div className="font-semibold text-lg lg:text-3xl text-white">
							كلمة السيد غسان الخرسان في الملتقى التشاوري الأول
							لخطباء المنبر الحسيني
						</div>
						<div className="flex gap-4 items-center">
							<div className="w-fit text-slate-400 flex items-center gap-1 py-4">
								<TimeIcon
									className="w-5 h-5 text-secondary"
									stroke="#bb9661"
								/>
								<span>09 /02 /2025</span>
							</div>
							<div className="w-fit text-slate-400 flex items-center gap-1 py-4">
								<Eye className="w-5 h-5" stroke="#bb9661" />
								<span>10 الف</span>
							</div>
						</div>

						<div className="flex justify-center items-center gap-4">
							<Button
								isIconOnly
								radius="full"
								size={"lg"}
								onClick={handleOpenLink}
							>
								<PlayButtonIcon
									fill="#006654"
									className="bg-white rounded-full p-2 shadow-lg w-40 h-40 transition-colors"
								/>
							</Button>
							<div className="font-semibold  *: text-2xl text-white">
								مشاهدة
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
