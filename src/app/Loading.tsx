"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
	exit: { opacity: 0 },
}
export default function Loading() {
	return (
		<motion.div
			key="loader"
			className="fixed inset-0 flex justify-center items-center bg-white z-50"
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={variants}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="animate-bounce">
					<Image
						src="/images/logo.png"
						alt="Loading Logo"
						width={100}
						height={100}
						className="object-contain"
					/>
				</div>
				<div className="text-lg font-semibold text-gray-600 animate-pulse ">
					Loading...
				</div>
			</div>
		</motion.div>
	)
}
