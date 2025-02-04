"use client"

import { publications } from "@/lib/data"
import HeaderSections from "@/components/header-sections"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Publications() {
	// Parent Variants: Handle scaling on hover
	const parentVariants = {
		rest: { scale: 1 },
		hover: { scale: 1.05 },
	}

	const iconVariants = {
		rest: { rotate: 0, x: 0 },
		hover: {
			rotate: -90,
			x: 15,
			transition: { duration: 0.3 },
		},
	}

	const imageVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 1, ease: "easeOut" },
		},
	}

	return (
		<div className="container w-full flex flex-col items-center py-20">
			<div className="flex w-full items-center justify-between my-8">
				<HeaderSections
					title={"الأصدارات"}
					moreButton={{
						label: "ارشيف الأصدارات",
						href: "/publications",
					}}
				/>
			</div>

			<div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 items-start my-8">
				{publications.map((book) => (
					<Link key={book.id} href={`/publications/${book.slug}`}>
						<motion.div
							className="flex flex-col justify-between rounded-2xl h-full"
							style={{
								background:
									"linear-gradient(0deg, rgba(229,229,229,1) 0%, rgba(229,229,229,1) 0%, rgba(229,229,229,0) 50%)",
							}}
							variants={parentVariants}
							initial="rest"
							animate="visible" // Trigger entrance animation
							whileHover="hover" // Trigger hover state
							transition={{ duration: 0.3 }}
						>
							<div className="relative flex justify-center items-center w-44 h-60 mx-auto">
								{/* First Child: Book Icon with Rotation */}
								<motion.div
									variants={iconVariants}
									className="absolute right-0 bottom-0 w-32 h-32"
								>
									<motion.div
										variants={{
											hidden: { opacity: 0, x: 20 },
											visible: {
												opacity: 1,
												x: 0,
												transition: {
													duration: 1,
													ease: "easeOut",
												},
											},
										}}
										className="absolute right-0 bottom-0 w-32 h-32"
									>
										<Image
											src={"/shapes/book_icon.svg"}
											alt={`${book.title} icon`}
											fill
											className="object-contain"
										/>
									</motion.div>
								</motion.div>

								{/* Second Child: Book Image 1 */}
								<motion.div
									variants={imageVariants}
									initial="hidden"
									animate="visible"
									className="absolute left-0 top-10 w-[7.5rem] h-[11.5rem]"
								>
									<Image
										src={book.image}
										alt={`Cover of ${book.title}`}
										fill
										className="object-center"
									/>
								</motion.div>

								{/* Third Child: Book Image 2 */}
								<motion.div
									variants={imageVariants}
									initial="hidden"
									animate="visible"
									className="absolute top-2 left-11 w-[7.5rem] h-[11.5rem]"
								>
									<Image
										src={book.image}
										alt={`Back cover of ${book.title}`}
										fill
										className="object-center"
									/>
								</motion.div>
							</div>
							<div className="w-full flex flex-col gap-4 justify-between h-[5rem] rounded-2xl py-3 px-3 items-center">
								<h1 className="text-sm text-center w-full font-semibold truncate">
									{book.title}
								</h1>
								<div className="flex justify-between w-full text-[10px] sm:text-base lg:text-xs font-light tracking-wide text-gray-700">
									<span>{book.pages} صفحة</span>
									<span>{book.views} مشاهدة</span>
								</div>
							</div>
						</motion.div>
					</Link>
				))}
			</div>
		</div>
	)
}
