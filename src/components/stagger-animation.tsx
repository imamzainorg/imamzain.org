"use client"

import { motion } from "framer-motion"


const item = {
	hidden: { 
		opacity: 0, 
		y: 20,
		scale: 0.95 
	},
	show: { 
		opacity: 1, 
		y: 0,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
}

const slideInItem = {
	hidden: { 
		opacity: 0, 
		x: -20 
	},
	show: { 
		opacity: 1, 
		x: 0,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
}

const scaleInItem = {
	hidden: { 
		opacity: 0, 
		scale: 0.8 
	},
	show: { 
		opacity: 1, 
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
}

interface StaggerContainerProps {
	children: React.ReactNode
	className?: string
	stagger?: number
	delay?: number
}

export function StaggerContainer({
	children,
	className = "",
	stagger = 0.1,
	delay = 0.1,
}: StaggerContainerProps) {
	const customContainer = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: stagger,
				delayChildren: delay,
			},
		},
	}

	return (
		<motion.div
			variants={customContainer}
			initial="hidden"
			animate="show"
			className={className}
		>
			{children}
		</motion.div>
	)
}

interface StaggerItemProps {
	children: React.ReactNode
	className?: string
	variant?: "default" | "slide" | "scale"
}

export function StaggerItem({
	children,
	className = "",
	variant = "default",
}: StaggerItemProps) {
	const variants = {
		default: item,
		slide: slideInItem,
		scale: scaleInItem,
	}

	return (
		<motion.div variants={variants[variant]} className={className}>
			{children}
		</motion.div>
	)
}