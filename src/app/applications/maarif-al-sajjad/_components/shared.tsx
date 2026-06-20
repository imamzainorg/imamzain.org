"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * Design primitives shared across the "معارف سجادية" pages (landing + policy)
 * so every surface stays visually consistent — one source of truth.
 */

/** Shared gold ring badge used for every icon / number across the page. */
export const ICON_BADGE =
	"flex shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary_dark ring-1 ring-secondary/20 dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary"

/** Shared bordered container used for grouped lists / grids. */
export const PANEL =
	"overflow-hidden rounded-3xl border border-secondary/15 bg-white dark:border-Muharram_secondary/15 dark:bg-Muharram_primary"

/**
 * Scroll-reveal wrapper — translate/opacity only, gated by prefers-reduced-motion.
 */
export function Reveal({
	children,
	className,
	delay = 0,
	y = 30,
	x = 0,
}: {
	children: React.ReactNode
	className?: string
	delay?: number
	y?: number
	x?: number
}) {
	const reduce = useReducedMotion()

	if (reduce) {
		return <div className={className}>{children}</div>
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y, x }}
			whileInView={{ opacity: 1, y: 0, x: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6, ease: "easeOut", delay }}
		>
			{children}
		</motion.div>
	)
}
