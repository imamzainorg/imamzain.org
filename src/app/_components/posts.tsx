"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import HeaderSections from "@/components/header-sections"
import { Post } from "@/types/post"

const getPostsConfig = () => {
	if (typeof window === "undefined")
		return { visiblePosts: 4, isSmallScreen: false }
	const width = window.innerWidth
	if (width < 640) return { visiblePosts: 2, isSmallScreen: true }
	if (width < 1024) return { visiblePosts: 3, isSmallScreen: false }
	return { visiblePosts: 4, isSmallScreen: false }
}

export default function Posts({ newsPosts }: { newsPosts: Post[] }) {
	const initialConfig = getPostsConfig()
	const [visiblePosts, setVisiblePosts] = useState(initialConfig.visiblePosts)
	const [isSmallScreen, setIsSmallScreen] = useState(
		initialConfig.isSmallScreen,
	)

	useEffect(() => {
		const handleResize = () => {
			const config = getPostsConfig()
			setVisiblePosts(config.visiblePosts)
			setIsSmallScreen(config.isSmallScreen)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<div className="container pt-20 flex flex-col items-center gap-6">
			<HeaderSections
				title="الأخبار"
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
				{newsPosts.slice(0, visiblePosts).map((item) => (
					<motion.div
						key={item.slug}
						initial={{ flex: 1 }}
						animate={{ flex: 1 }}
						whileHover={isSmallScreen ? {} : { flex: 2 }}
						className="relative w-full h-[30rem] rounded-lg"
					>
						<Link
							href={`/news/${item.slug}`}
							className="block h-full"
						>
							<div
								className="absolute rounded-3xl inset-0 bg-cover bg-center w-full h-[30rem]"
								style={{
									backgroundImage: `url(${item.image})`,
								}}
							>
								<div className="rounded-3xl bg-gradient-to-t from-primary dark:from-Muharram_primary to-transparent flex justify-center items-end p-6 h-full">
									<div className="flex flex-col text-white/90">
										<div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
											<Image
												src="/shapes/title-icon.svg"
												width={10}
												height={10}
												alt="title icon"
												className="w-3 md:w-4 dark:hidden"
											/>
											<Image
												src="/shapes/title-icon_Muharram.svg"
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
							</div>
						</Link>
					</motion.div>
				))}
			</div>
		</div>
	)
}
