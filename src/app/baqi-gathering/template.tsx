"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import HeaderBaqi from "./_components/header-baqi"
import FooterBaqi from "./_components/footer-baqi"

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.5 } },
	exit: { opacity: 0, transition: { duration: 0.5 } },
}

export default function Template({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 800)

		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimatePresence mode="wait">
			{loading ? (
				<motion.div
					key="loader"
					className="fixed inset-0 flex justify-center items-center bg-white z-50"
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={variants}
				>
					<div className="flex flex-col items-center gap-4 px-4 sm:px-6">
						<div>
							<Image
								src="/images/logo-horizontal.svg"
								width={100}
								height={100}
								className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-52 cursor-pointer"
								alt="logo"
								priority
							/>
						</div>
					</div>
				</motion.div>
			) : (
				<motion.div
					key="page"
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={variants}
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
