"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeaderSections from "@/components/header-sections"
import { Post } from "@/types/post"

export default function Posts({ newsPosts }: { newsPosts: Post[] }) {
	// State to control the number of posts displayed
	const [visiblePosts, setVisiblePosts] = useState(4)
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	// Function to determine number of posts and layout based on screen width
	const updatePosts = () => {
		const width = window.innerWidth
		if (width < 640) {
			setVisiblePosts(2) // Show 2 posts on small screens
			setIsSmallScreen(true) // Enable vertical layout
		} else if (width < 1024) {
			setVisiblePosts(3) // Show 3 posts on medium screens
			setIsSmallScreen(false)
		} else {
			setVisiblePosts(4) // Show 4 posts on large screens
			setIsSmallScreen(false)
		}
	}

	// Update posts on mount and when resizing
	useEffect(() => {
		updatePosts()
		window.addEventListener("resize", updatePosts)
		return () => window.removeEventListener("resize", updatePosts)
	}, [])

	return (
		<div className="container pt-20 flex flex-col items-center gap-6">
			<HeaderSections
				title={"الأخبار"}
				moreButton={{
					label: "ارشيف الاخبار",
					href: "/news/archives",
				}}
			/>

			<div
				className={`flex w-full h-[65rem] sm:h-full gap-4 pt-10 ${
					isSmallScreen
						? "flex-col items-center"
						: "flex-row justify-center"
				}`}
			>
				{newsPosts.slice(0, visiblePosts).map((item, idx) => (
					<motion.div
						key={idx}
						initial={{ flex: 1 }}
						animate={{ flex: 1 }}
						whileHover={isSmallScreen ? {} : { flex: 2 }} // Disable hover animation on small screens
						className="relative w-full  h-[30rem] rounded-lg"
					>
						<motion.div
							className="absolute rounded-3xl inset-0 bg-cover bg-center w-full h-[30rem]"
							style={{
								backgroundImage: `url(${item.image})`,
								WebkitMaskRepeat: "no-repeat",
								maskRepeat: "no-repeat",
								WebkitMaskSize: "100%",
								maskSize: "100%",
								WebkitMaskPosition: "center",
								maskPosition: "bottom",
							}}
						>
							<Link href={`/news/${item.slug}`}>
								<div className="rounded-3xl bg-gradient-to-t from-primary dark:from-Muharram_primary to-transparent flex justify-center items-end p-6 h-[30rem]">
									<div className="flex flex-col text-white/90">
										<div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
											<Image
												src={"/shapes/title-icon.svg"}
												width={10}
												height={10}
												alt="title icon"
												className="w-3 md:w-4 dark:hidden "
											/>
											<Image
												src={
													"/shapes/title-icon_Muharram.svg"
												}
												width={10}
												height={10}
												alt="title icon"
												className="w-3 md:w-4 hidden dark:block"
											/>
											خبــــر
										</div>
										<p className="text-xs sm:text-sm line-clamp-2 p-1 pr-5 pb-8 md:pb-5 xl:pb-5">
											{item.summary}
										</p>
									</div>
								</div>
							</Link>
						</motion.div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
