"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import HeaderBaqi from "./_components/header-baqi"
import FooterBaqi from "./_components/footer-baqi"

const loaderVariants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
	},
	enter: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		opacity: 0,
		scale: 1.1,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 1, 1],
		},
	},
}

const pageVariants = {
	hidden: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: {
			duration: 0.5,
			delay: 0.1,
			ease: [0.4, 0, 0.2, 1],
		},
	},
}

export default function Template({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 600)

		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimatePresence mode="wait">
			{loading ? (
				<motion.div
					key="loader"
					className="fixed inset-0 flex justify-center items-center bg-white dark:bg-gray-950 z-50"
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={loaderVariants}
				>
					<motion.div
						className="flex flex-col items-center gap-6 px-4 sm:px-6"
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.3 }}
					>
						<div className="relative">
							<Image
								src="/images/logo-horizontal.svg"
								width={100}
								height={100}
								className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-52"
								alt="logo"
								priority
							/>
						</div>
						<motion.div
							className="w-8 h-1 bg-primary rounded-full"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: [0, 1, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					</motion.div>
				</motion.div>
			) : (
				<motion.div
					key="page"
					initial="hidden"
					animate="enter"
					variants={pageVariants}
					className="flex flex-col min-h-screen"
				>
					<HeaderBaqi />
					<main className="flex-grow w-full mx-auto">{children}</main>
					<FooterBaqi />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
