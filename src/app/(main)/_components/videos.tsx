"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

import {
	PlayButtonIcon,
	TimeIcon,
	VideoRecordingIcon,
} from "@/assets/icons/reusable"
{/*
	import SectionCta from "@/components/section-cta"
	*/}
import HeaderSections from "@/components/header-sections"
import { motion } from "framer-motion"
import { YouTubePlaylist } from "@/types/youtubeData"

export default function Videos({
	playlists,
}: {
	playlists: YouTubePlaylist[]
}) {
	const [videoId, setVideoId] = useState<string | null>(null)

	const openModal = (videoId: string) => setVideoId(videoId)
	const closeModal = () => setVideoId(null)

	// Parent Variants: Handle scaling on hover
	const parentVariants = {
		rest: { scale: 1 },
		hover: { scale: 1.05 },
	}

	const [Show, setToShow] = useState(Number || null)

	// Function to update the number of books based on screen width
	const updateBooksToShow = () => {
		const width = window.innerWidth
		if (width >= 1280) setToShow(7)
		else if (width >= 1024) setToShow(7)
		else if (width >= 768) setToShow(4)
		else if (width >= 640) setToShow(2)
		else setToShow(2)
	}

	// Set initial value and update on resize
	useEffect(() => {
		updateBooksToShow()
		window.addEventListener("resize", updateBooksToShow)
		return () => window.removeEventListener("resize", updateBooksToShow)
	}, [])

	return (
		<>
			<div className="container flex flex-col gap-12 pt-20 ">
				<HeaderSections
					title={"المرئيات"}
					moreButton={{
						label: "المزيد",
						href: "/media/videos",
					}}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 auto-rows-[15rem] sm:auto-rows-[15rem] md:auto-rows-[17rem] lg:auto-rows-[12rem] xl:auto-rows-[13rem] gap-4">
					{Show &&
						playlists.slice(0, Show).map((playlist, index) => {
							return (
								<div
									key={index}
									aria-label="play video"
									onClick={() =>
										openModal(playlist.videos[0].url)
									}
									className={`cursor-pointer ${index === 0 && "row-span-1 lg:row-span-2 col-span-1 lg:col-span-2"}`}
								>
									<motion.div
										className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col shadow-xl"
										variants={parentVariants}
										initial="rest"
										animate="visible"
										whileHover="hover"
										transition={{ duration: 0.3 }}
									>

									     	<Image
											src={
												playlist.videos[0].thumbnail ||
												""
											}
											width={600}
											height={600}
											alt="media pic"
											className="absolute inset-0 w-full h-full object-cover -z-10"
										/>
										<div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 to-transparent -z-10" />
										<div className="h-4/6">
											<div className="h-1/2 w-full  flex justify-end items-start p-3">
												<VideoRecordingIcon
													fill="none"
													stroke="#fff"
												/>
											</div>
											
											<div className="h-1/2 w-full flex justify-start items-end p-3">
												<div className="bg-white dark:hidden rounded-full rotate-180 p-2">
													<PlayButtonIcon
														fill="#006654"
														className="w-auto h-auto"
													/>
												</div>
													<div className="bg-white hidden dark:block rounded-full rotate-180 p-2">
													<PlayButtonIcon
														fill="#231F20"
														className="w-auto h-auto"
													/>	
												</div>
											</div>
										</div>
										<motion.div
											variants={{
												rest: { height: "34%" },
												hover: {
													height: "40%",
													transition: {
														duration: 0.3,
													},
												},
											}}
											className="h-2/6 bg-white rounded-tl-xl flex flex-col justify-between p-3"
										>
											<div
												className={`w-full font-semibold text-xs ${index === 0 ? "max-lg:truncate lg:line-clamp-2 lg:text-lg" : "truncate"}`}
											>
												{playlist.videos[0].title}
											</div>
											<div className="flex justify-around">
												<div className="w-3/5 text-xs text-slate-400 truncate">
													{playlist.videos[0].desc}
												</div>
												<div className="w-2/5 text-xs text-slate-400 flex items-center justify-end gap-1">
													<TimeIcon
														className="w-3 h-3"
														stroke="#aaa"
													/>
													<span>
														{
															playlist.videos[0]
																.date
														}
													</span>
												</div>
											</div>
										</motion.div>
									</motion.div>
								</div>
							)
						})}
				</div>

		{/*
				<div className="hidden md:block">
					<SectionCta
						links={[
							{ label: "محاضرات", href: "/media" },
							{ label: "ندوات", href: "/media" },
							{ label: "مناسبات", href: "/media" },
							{ label: "مؤتمرات", href: "/media" },
							{ label: "برامج", href: "/media" },
							{ label: "زيارات", href: "/media" },
						]}
					/>
				</div>
		*/}
			</div>

			{videoId && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
    aria-label="close window"
    onClick={closeModal}
  >
    <div
      className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
      aria-label=""
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube Video"
        allow="autoplay; fullscreen"
      ></iframe>
    </div>
  </div>
)}

			
		</>
	)
}
