"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

// True once the element's top edge has scrolled into view. Plain state + CSS rather
// than framer-motion's `whileInView`, which left sections hidden when coming back to
// /his-life with the back button.
export function useShown<T extends Element>() {
	const ref = useRef<T>(null)
	const [shown, setShown] = useState(false)
	useEffect(() => {
		const el = ref.current
		if (!el || shown) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setShown(true)
			},
			{ rootMargin: "0px 0px -10% 0px" },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [shown])
	return [ref, shown] as const
}

// Fades and slides its content in the first time it scrolls into view.
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
	const [ref, shown] = useShown<HTMLDivElement>()
	return (
		<div
			ref={ref}
			className={cn("motion-reduce:!transform-none motion-reduce:!transition-none", className)}
			style={{
				opacity: shown ? 1 : 0,
				transform: shown ? "none" : `translate3d(${x}px, ${y}px, 0)`,
				transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
			}}
		>
			{children}
		</div>
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
