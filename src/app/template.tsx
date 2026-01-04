"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import Layouts from "@/layouts"

export default function Template({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false)
		}, 150)

		return () => clearTimeout(timer)
	}, [])

	return (
		<AnimatePresence mode="wait">
			{loading ? (
			<>
			
			</>
			) : (
			      <motion.div
        key="page"
        initial={{ opacity: 1, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -2 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1.5],
        }}
      >
        <Layouts>{children}</Layouts>
      </motion.div>
			)}
		</AnimatePresence>
	)
}
