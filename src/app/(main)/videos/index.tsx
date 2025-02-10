// "use client"
// import Image from "next/image"
// import Link from "next/link"

// import {
// 	PlayButtonIcon,
// 	TimeIcon,
// 	VideoRecordingIcon,
// } from "@/assets/icons/reusable"
// import SectionCta from "@/components/section-cta"
// import HeaderSections from "@/components/header-sections"
// import { motion } from "framer-motion"
// export default function Videos() {
// 	// Parent Variants: Handle scaling on hover
// 	const parentVariants = {
// 		rest: { scale: 1 },
// 		hover: { scale: 1.05 },
// 	}
// 	return (
// 		<>
// 			<div className="container flex flex-col gap-12 py-32">
// 				<HeaderSections
// 					title={"المرئيات"}
// 					moreButton={{
// 						label: "المزيد",
// 						href: "/videos",
// 					}}
// 				/>

// 				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 auto-rows-[15rem] sm:auto-rows-[15rem] md:auto-rows-[17rem] lg:auto-rows-[12rem] xl:auto-rows-[13rem] gap-4">
// 					{Array.from({ length: 7 }).map((_, index) => (
// 						<Link
// 							key={index}
// 							href={`/media`}
// 							className={`${index === 0 && "row-span-1 lg:row-span-2 col-span-1 lg:col-span-2"}`}
// 						>
// 							<motion.div
// 								className={`relative w-full h-full rounded-3xl overflow-hidden flex flex-col shadow-xl  `}
// 								variants={parentVariants}
// 								initial="rest"
// 								animate="visible" // Trigger entrance animation
// 								whileHover="hover" // Trigger hover state
// 								transition={{ duration: 0.3 }}
// 							>
// 								<Image
// 									src="/images/placeholder.jpg"
// 									width={500}
// 									height={500}
// 									alt="media pic"
// 									className="absolute inset-0 w-full h-full object-cover -z-10"
// 								/>
// 								<div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 to-transparent -z-10"></div>
// 								<div className="h-4/6">
// 									<div className="h-1/2 w-full flex justify-end items-start p-3">
// 										<VideoRecordingIcon
// 											fill="none"
// 											stroke="#fff"
// 										/>
// 									</div>
// 									<div className="h-1/2 w-full flex justify-start items-end p-3">
// 										<div className="bg-white rounded-full rotate-180 p-2">
// 											<PlayButtonIcon
// 												fill="#006654"
// 												className="w-auto h-auto"
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 								<motion.div
// 									variants={{
// 										rest: { height: "34%" },
// 										hover: {
// 											height: "40%",
// 											transition: { duration: 0.3 },
// 										},
// 									}}
// 									className="h-2/6 bg-white rounded-tl-xl flex flex-col justify-between p-3"
// 								>
// 									<div
// 										className={`w-full font-semibold text-sm  ${index === 0 ? "max-lg:truncate lg:line-clamp-2 lg:text-lg" : "truncate"}`}
// 									>
// 										سيرة الإمام زين العابدين
// 									</div>
// 									<div className="flex justify-between">
// 										<div className="text-[10px] text-slate-400">
// 											سيرة الامام زين العابدين
// 										</div>
// 										<div className="text-xs text-slate-400 flex items-center gap-1">
// 											<TimeIcon
// 												className="w-3 h-3"
// 												stroke="#aaa"
// 											/>
// 											<span>١٢ ديسمبر ٢٠٢٤</span>
// 										</div>
// 									</div>
// 								</motion.div>
// 							</motion.div>
// 						</Link>
// 					))}
// 				</div>

// 				<div className="hidden md:block">
// 					<SectionCta
// 						links={[
// 							{ label: "محاضرات", href: "/media" },
// 							{ label: "ندوات", href: "/media" },
// 							{ label: "مناسبات", href: "/media" },
// 							{ label: "مؤتمرات", href: "/media" },
// 							{ label: "برامج", href: "/media" },
// 							{ label: "زيارات", href: "/media" },
// 						]}
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

"use client"
import { useState } from "react"
import Image from "next/image"

import {
	PlayButtonIcon,
	TimeIcon,
	VideoRecordingIcon,
} from "@/assets/icons/reusable"
import SectionCta from "@/components/section-cta"
import HeaderSections from "@/components/header-sections"
import { motion } from "framer-motion"

export default function Videos() {
	const [videoId, setVideoId] = useState<string | null>(null)

	const openModal = (id: string) => setVideoId(id)
	const closeModal = () => setVideoId(null)

	// Parent Variants: Handle scaling on hover
	const parentVariants = {
		rest: { scale: 1 },
		hover: { scale: 1.05 },
	}

	return (
		<>
			<div className="container flex flex-col gap-12 py-20 ">
				<HeaderSections
					title={"المرئيات"}
					moreButton={{
						label: "المزيد",
						href: "/media",
					}}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 auto-rows-[15rem] sm:auto-rows-[15rem] md:auto-rows-[17rem] lg:auto-rows-[12rem] xl:auto-rows-[13rem] gap-4">
					{Array.from({ length: 7 }).map((_, index) => {
						const youtubeId = "rw9pN2u-rr4"

						return (
							<div
								key={index}
								onClick={() => openModal(youtubeId)}
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
										src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
										width={600}
										height={600}
										alt="media pic"
										className="absolute inset-0 w-full h-full object-cover -z-10"
									/>
									<div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/20 to-transparent -z-10"></div>
									<div className="h-4/6">
										<div className="h-1/2 w-full flex justify-end items-start p-3">
											<VideoRecordingIcon
												fill="none"
												stroke="#fff"
											/>
										</div>
										<div className="h-1/2 w-full flex justify-start items-end p-3">
											<div className="bg-white rounded-full rotate-180 p-2">
												<PlayButtonIcon
													fill="#006654"
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
												transition: { duration: 0.3 },
											},
										}}
										className="h-2/6 bg-white rounded-tl-xl flex flex-col justify-between p-3"
									>
										<div
											className={`w-full font-semibold text-sm ${index === 0 ? "max-lg:truncate lg:line-clamp-2 lg:text-lg" : "truncate"}`}
										>
											سيرة الإمام زين العابدين
										</div>
										<div className="flex justify-between">
											<div className="text-[10px] text-slate-400">
												سيرة الامام زين العابدين
											</div>
											<div className="text-xs text-slate-400 flex items-center gap-1">
												<TimeIcon
													className="w-3 h-3"
													stroke="#aaa"
												/>
												<span>١٢ ديسمبر ٢٠٢٤</span>
											</div>
										</div>
									</motion.div>
								</motion.div>
							</div>
						)
					})}
				</div>

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
			</div>

			{videoId && (
				<div
					className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
					onClick={closeModal}
				>
					<div
						className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
					>
						{/* Close Button */}
						<button
							className="absolute top-3 right-3 text-white text-2xl font-bold"
							onClick={closeModal}
						>
							✕
						</button>

						{/* YouTube Video */}
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
