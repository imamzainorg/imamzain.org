"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import HeaderSections from "@/components/header-sections"
import { newsPosts } from "@/lib/data"

export default function Posts() {
	return (
		<div className="container py-20 flex flex-col items-center gap-6 ">
			<HeaderSections
				title={"الأخبار"}
				moreButton={{
					label: "ارشيف الاخبار",
					href: "/news",
				}}
			/>

			<div className="flex justify-center w-full h-full gap-4 pt-10">
				{newsPosts.slice(0, 4).map((item, idx) => {
					return (
						<motion.div
							key={idx}
							initial={{ flex: 1 }}
							animate={{ flex: 1 }}
							whileHover={{ flex: 2 }}
							className={`relative  w-full  max-md:w-[32rem] h-[30rem] rounded-lg`}
						>
							<motion.div
								className={`absolute rounded-3xl inset-0 bg-cover bg-center w-full h-full`}
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
									<div className="rounded-3xl bg-gradient-to-t from-primary to-transparent flex justify-center items-end p-6 h-full">
										<div className="flex flex-col text-white/90">
											<div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
												<Image
													src={
														"/shapes/title-icon.svg"
													}
													width={10}
													height={10}
													alt="title icon"
													className="w-3 md:w-4"
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
					)
				})}
			</div>
		</div>
	)
}
