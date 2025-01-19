"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Book } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"

export function HighlightCarousel({ publications }: { publications: Book[] }) {
	const [publication, setPublication] = useState(publications[0])

	return (
		<section className="space-y-10">
			<div
				className={cn(
					"text-white rounded-xl sm:rounded-2xl lg:rounded-[50px] xl:rounded[150px] bg-[url('/shapes/dark-bg.svg')] p-4 lg:p-10 xl:p-20 duration-200",
					publications.indexOf(publication) % 2 === 0
						? "bg-dark-background"
						: "bg-secondary/60",
				)}
			>
				<AnimatePresence mode="wait">
					{publication ? (
						<motion.div
							key={publication ? publication.id : "empty"}
							initial={{ x: 10, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -10, opacity: 0 }}
							transition={{ duration: 0.2, type: "spring" }}
							className="flex justify-center gap-2 sm:gap-6"
						>
							<div className="w-7/12 flex flex-col justify-center gap-4 sm:gap-8 lg:gap-12">
								<h1 className="text-sm sm:text-3xl lg:text-5xl xl:text-5xl font-extrabold !leading-[5rem] tracking-wide">
									{publication.title}
								</h1>
								<h3 className="text-xs sm:text-2xl">
									{publication.author}
								</h3>
								<Link
									href={`/publications/${publication.slug}`}
									className="w-fit bg-primary text-xs sm:text-2xl tracking-wide font-semibold px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-lg lg:rounded-xl"
								>
									اشتري الكتاب
								</Link>
							</div>
							<div className="w-5/12">
								<div className="w-full h-full flex justify-center items-center bg-[url('/shapes/book-bg.svg')] bg-no-repeat bg-center">
									<Image
										src={publication.image}
										width={200}
										height={200}
										className="object-center w-auto h-4/6"
										priority
										alt={publication.title}
									/>
								</div>
							</div>
						</motion.div>
					) : (
						"لا توجد اصدارات"
					)}
				</AnimatePresence>
			</div>
			<div className="flex gap-4 w-full justify-center">
				{publications.map((_, index) => (
					<div
						key={index}
						onClick={() => setPublication(publications[index])}
						className={cn(
							"rounded-full w-4 h-4 bg-primary/20 cursor-pointer hover:bg-primary/50 duration-150",
							publications.indexOf(publication) === index &&
								"bg-primary",
						)}
					/>
				))}
			</div>
		</section>
	)
}
