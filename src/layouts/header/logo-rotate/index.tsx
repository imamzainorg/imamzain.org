"use client"

import { AnimatePresence, motion, MotionProps } from "framer-motion"
import { useEffect, useState } from "react"

import Image from "next/image"

interface WordRotateProps {
	paths: string[]
	durations?: number[]
	motionProps?: MotionProps
	className?: string
}

export function LogoRotate({
	paths,
	durations = [5000, 3000],
	motionProps = {
		initial: { opacity: 0, y: -50 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.5, ease: "easeInOut" },
	},
	className,
}: WordRotateProps) {
	const [index, setIndex] = useState(0)
	const [currentDuration, setCurrentDuration] = useState(durations[0])

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => {
				const nextIndex = (prevIndex + 1) % paths.length
				setCurrentDuration(durations[nextIndex])
				return nextIndex
			})
		}, currentDuration)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [paths, currentDuration, durations])

	return (
		<div className="overflow-hidden py-2 ">
			<AnimatePresence mode="wait">
				<motion.div
					key={paths[index]}
					className={`${className} `}
					{...motionProps}
				>
					<Image
						src={paths[index]}
						width={50}
						height={50}
						className={`${className}`}
						alt="logo"
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
