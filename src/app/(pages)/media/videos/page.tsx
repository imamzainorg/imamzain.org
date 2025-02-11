"use client"

import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import { playlists } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function media() {
	return (
		<div className="">
			<div className="max-w-screen-2xl mx-auto relative">
				<Image
					src="/images/about-landing.jpg"
					className="w-full h-96 xs:h-auto rounded-b-[30px] md:rounded-b-[60px] lg:rounded-b-[70px] xl:rounded-b-[80px]"
					width={1500}
					height={1500}
					priority
					alt="logo"
				/>

				<div className="absolute inset-0 container">
					<Breadcrumbs
						className="text-white"
						dotColor="bg-secondary"
						links={[
							{ name: "الصفحة الرئيسية", url: "/" },
							{ name: "المرئيات", url: "#" },
						]}
					/>
				</div>

				<div className="absolute inset-x-0 bottom-0  text-start  mr-4 md:mb-4 container  ">
					<p className="text-white text-2xl xs:text-3xl font-bold md:text-5xl xmd:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl md:m-2  ">
						استمع . شاهد. زٌر.
					</p>

					<p className="text-white text-sm xs:text-md md:text-lg xmd:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
						الأجواء الروحانية والنفحات الايمانية من البقيع الغرقد
					</p>

					<button className=" bg-secondary rounded-[200px]  h-6 w-16 ml-2  text-xs md:text-sm md:h-8 md:w-20 xmd:mr-4 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28 ">
						مشاهدة
					</button>
					<button className="bg-secondary rounded-[200px]   h-6 w-16  m-2 mb-6 text-xs md:text-sm md:h-8 md:w-20 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28  ">
						اشتراك
					</button>
				</div>
			</div>
			<div className="container">
				{playlists.map((playlist, index) => (
					<div key={index}>
						<p className="text-white font-bold text-center text-xl m-4 xs:text-right xs:mr-10 md:text-3xl xl:text-4xl mt-10">
							{playlist.title}
						</p>
						<div className="!mb-8 flex justify-center items-center xs:mr-4 ">
							<div className="bg-gray-500 bg-opacity-25 rounded-[25px] p-2 2xl:p-4 space-y-10 w-1/2.5 xs:w-full">
								<div className="flex flex-col xs:flex-row justify-center p-0">
									{playlist.videos
										.slice(0, 4)
										.map((video, index) => (
											<Link
												href={`/media/videos/${video.slug}`}
												key={index}
												className={`relative p-4  ${
													index >= 3
														? "hidden lg:block"
														: index >= 2
															? "hidden md:block "
															: "md:block"
												}`}
											>
												<Image
													src={video.thumbnail}
													alt={video.title}
													width={300}
													height={300}
													className="w-full rounded-[15px] md:rounded-[30px] object-cover"
												/>
												<motion.div
													initial={{
														x: 0,
														y: 15,
														opacity: 0,
													}}
													whileHover={{
														y: 0,
														opacity: 1,
														transition: {
															duration: 0.3,
														},
													}}
													className="absolute  rounded-[15px] md:rounded-[30px] top-0 right-0 w-full font-semibold text-sm flex justify-center items-center h-full bg-gradient-to-t from-black via-black/50 to-transparent"
												>
													<div className="font-semibold w-3/4 text-lg p-4 text-white">
														{video.title}
													</div>
												</motion.div>
											</Link>
										))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
