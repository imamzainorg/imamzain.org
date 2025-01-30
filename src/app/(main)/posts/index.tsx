"use client"
import Image from "next/image"
import Link from "next/link"
import { newsPosts } from "@/lib/data"
import HeaderSections from "@/components/header-sections"
import { motion } from "framer-motion"

export default function Posts() {
	return (
		<>
			<div className="container py-20 flex flex-col items-center gap-6">
				<HeaderSections
					title={"الأخبار"}
					moreButton={{
						label: "ارشيف الاخبار",
						href: "/news",
					}}
				/>

				<div className="flex flex-wrap justify-between w-full gap-y-4 pt-10">
					{newsPosts.slice(0, 4).map((item, idx) => {
						const responsiveSize =
							"w-[150px] h-[280px] sm:w-[250px] sm:h-[400px] md:w-[240px] md:h-[400px] xl:w-[250px] xl:h-[450px] 2xl:w-[300px] 2xl:h-[550px]"
						return (
							<motion.div
								key={idx}
								initial={{ scale: 1 }}
								whileHover={{ scaleX: 1.5 }} // Expand this element
								className={`relative bg-secondary   ${responsiveSize} hover:-translate-y-4 duration-300 `}
								style={{
									WebkitMaskImage: `url('/shapes/news-overlay-1.svg')`,
									maskImage: `url('/shapes/news-overlay-1.svg')`,
									WebkitMaskRepeat: "no-repeat",
									maskRepeat: "no-repeat",
									WebkitMaskSize: "100%",
									maskSize: "100%",
									WebkitMaskPosition: "center",
									maskPosition: "bottom",
								}}
							>
								<motion.div
									whileHover={{ scale: 0.95 }} // Shrink others slightly
									className={`absolute -bottom-3 ${responsiveSize} bg-cover bg-center  `}
									style={{
										backgroundImage: `url(${item.image})`,
										WebkitMaskImage: `url('/shapes/news-overlay-1.svg')`,
										maskImage: `url('/shapes/news-overlay-1.svg')`,
										WebkitMaskRepeat: "no-repeat",
										maskRepeat: "no-repeat",
										WebkitMaskSize: "100%",
										maskSize: "100%",
										WebkitMaskPosition: "center",
										maskPosition: "bottom",
									}}
								>
									<Link href={`/news/${item.slug}`}>
										<div
											className={`bg-gradient-to-t from-primary to-transparent ${responsiveSize} flex justify-center items-end pr-3 sm:pr-8 md:pr-6 pb-12`}
										>
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
												<p className="text-xs sm:text-sm line-clamp-2 p-1 pr-5 pb-8 md:pb-5 xl:pb-10">
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
		</>
	)
}
