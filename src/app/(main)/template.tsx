"use client"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import Layouts from "@/layouts"

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.5 } },
	exit: { opacity: 0, transition: { duration: 0.5 } },
}

export default function Template({ children }: { children: React.ReactNode }) {
	const path = usePathname()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 800)

		return () => clearTimeout(timer)
	}, [])
	console.log("Template path", path)
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
					<div className="flex flex-col items-center gap-4">
						<div className="  ">
							<Image
								src="/images/logo-horizontal.svg"
								width={100}
								height={100}
								className="w-32 sm:w-40 xl:w-52 cursor-pointer"
								alt="logo"
							/>
						</div>
					</div>
				</motion.div>
			) : (
				<Layouts>{children}</Layouts>
			)}
		</AnimatePresence>
	)
}
