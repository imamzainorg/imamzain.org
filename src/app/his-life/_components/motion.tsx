"use client"

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion"

// Honors the visitor's "reduce motion" setting for every animation below.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

// Fades and slides its content in the first time its top edge scrolls into view.
// (A visibility ratio would never be reached by elements taller than the screen.)
export function Reveal({
	children,
	className,
	x = 0,
	y = 40,
	delay = 0,
}: {
	children: React.ReactNode
	className?: string
	x?: number
	y?: number
	delay?: number
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, x, y }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -12% 0px" }}
			transition={{ duration: 0.7, ease: "easeOut", delay }}
		>
			{children}
		</motion.div>
	)
}

export function ReadingProgress() {
	const { scrollYProgress } = useScroll()
	const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
	return (
		<motion.div
			aria-hidden
			style={{ scaleX }}
			className="fixed inset-x-0 top-0 z-[60] h-1 origin-right bg-secondary dark:bg-Muharram_secondary"
		/>
	)
}
