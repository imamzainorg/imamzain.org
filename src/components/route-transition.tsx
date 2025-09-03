"use client"

import { motion } from "framer-motion"

export const routeVariants = {
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

export const fadeVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
}

export const slideVariants = {
	initial: {
		opacity: 0,
		x: 50,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		opacity: 0,
		x: -50,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 1, 1],
		},
	},
}

export const scaleVariants = {
	initial: {
		opacity: 0,
		scale: 0.9,
	},
	animate: {
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

interface RouteTransitionProps {
	children: React.ReactNode
	variant?: "route" | "fade" | "slide" | "scale"
	className?: string
}

export default function RouteTransition({
	children,
	variant = "route",
	className = "",
}: RouteTransitionProps) {
	const variants = {
		route: routeVariants,
		fade: fadeVariants,
		slide: slideVariants,
		scale: scaleVariants,
	}

	return (
		<motion.div
			variants={variants[variant]}
			initial="initial"
			animate="animate"
			exit="exit"
			className={className}
		>
			{children}
		</motion.div>
	)
}

export function AnimatedPage({
	children,
	variant = "route",
	className = "",
}: RouteTransitionProps) {
	return (
		<RouteTransition variant={variant} className={className}>
			{children}
		</RouteTransition>
	)
}