"use client"

import { AnimatePresence } from "framer-motion"

export default function PageTransition({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="relative">
			<AnimatePresence mode="wait">
				{/* Main Page Content */}
				{children}
			</AnimatePresence>
		</div>
	)
}
