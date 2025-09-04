"use client"

import { motion, AnimatePresence } from "framer-motion"

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.98,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.98,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 1, 1],
		},
	},
}

export default function PageTransition({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="w-full"
		>
			{children}
		</motion.div>
	)
}

export function PageWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AnimatePresence mode="wait" initial={false}>
			<PageTransition>{children}</PageTransition>
		</AnimatePresence>
	)
}
