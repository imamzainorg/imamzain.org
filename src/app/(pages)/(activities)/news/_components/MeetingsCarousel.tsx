"use client"

import Link from "next/link"
import Image from "next/image"
import { Post } from "@/types/post"
import { useState, useEffect } from "react"

interface MeetingsCarouselProps {
	meetingsData: Post[]
}

export default function MeetingsCarousel({
	meetingsData,
}: MeetingsCarouselProps) {
	// آخر 3 اجتماعات
	const latestMeetings = meetingsData
		.filter((item) => item.category === "مجالس")
		.slice(-3)
		.reverse()
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		if (latestMeetings.length <= 1) return

		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % latestMeetings.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [latestMeetings.length])

	if (latestMeetings.length === 0) {
		return (
			<div className="flex items-center justify-center p-8 bg-gray-50 rounded-2xl ">
				<p className="text-gray-500 text-lg">
					لا توجد مجالس حتى الآن.
				</p>
			</div>
		)
	}

	return (
		<div className="w-11/12 overflow-hidden mx-auto rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-sm border border-gray-100 p-6">
			{/* أزرار التنقل */}
			<div className="flex items-center justify-end m-1 mb-6">
				<div className="flex space-x-2">
					{latestMeetings.map((post, index) => (
						<button
							key={post.id}
							onClick={() => setActiveIndex(index)}
							className={`h-2 w-8 rounded-full m-1 transition-all ${
								index === activeIndex
									? "bg-primary"
									: "bg-gray-300"
							}`}
							aria-label={`انتقل إلى اللقاء ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* الكاروسيل */}
			<div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
				{latestMeetings.map((post, index) => (
					<div
						key={post.id}
						className={`absolute inset-0 transition-all duration-700 ease-in-out ${
							index === activeIndex
								? "opacity-100 scale-100"
								: "opacity-0 scale-105"
						}`}
					>
						<div className="relative h-full w-full">
							<div className="absolute inset-0 z-0">
								<Image
									src={post.image || "/default-image.jpg"}
									fill
									alt={post.title}
									className="object-cover"
									quality={100}
									priority
									sizes="100vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
							</div>

							{/* المحتوى */}
							<div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
								<h3 className="text-lg md:text-3xl font-bold mb-3 leading-tight">
									{post.title}
								</h3>

								<p className="text-gray-100 text-sm md:text-lg mb-2 line-clamp-2">
									{post.summary}
								</p>
								<div className="flex items-center justify-between mt-4">
									<Link
										href={`/news/${latestMeetings[activeIndex].slug}`}
										className="inline-flex items-center text-sm px-5 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors group"
									>
									
										<svg
											className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-4 transition-transform group-hover:-translate-x-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 19l-7-7m0 0l7-7m-7 7h18"
											/>
										</svg>
									</Link>
									<div className="">
										<span className="text-sm bg-primary/90 px-3 py-1 rounded-full inline-block">
											{post.date}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
