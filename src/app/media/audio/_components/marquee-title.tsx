"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const SPEED = 80 // pixels per second

// A title kept to one line. When it is longer than its room, pointing at it (or tapping it, on a
// touch screen) slides it sideways to show the rest, and it slides back when the pointer leaves.
// The whole text stays in the page, so screen readers and the browser's own tooltip have it.
export default function MarqueeTitle({ text, className }: { text: string; className?: string }) {
	const box = useRef<HTMLDivElement>(null)
	const line = useRef<HTMLSpanElement>(null)
	const [shift, setShift] = useState(0)
	// At rest the line ends in an ellipsis; while it slides (and until it is back) it does not.
	const [sliding, setSliding] = useState(false)
	const [seconds, setSeconds] = useState(0.3)

	const slide = () => {
		const outer = box.current
		const inner = line.current
		if (!outer || !inner || inner.scrollWidth - outer.clientWidth <= 1) return
		// Drop the ellipsis first, so the line has its full width to measure and to slide.
		setSliding(true)
		requestAnimationFrame(() => {
			const overflow = inner.offsetWidth - outer.clientWidth
			if (overflow <= 1) return
			// The line starts at the reading edge: the right in Arabic, so the rest lies to the left.
			const direction = getComputedStyle(outer).direction === "rtl" ? 1 : -1
			setSeconds(Math.max(0.6, overflow / SPEED))
			setShift(direction * (overflow + 4))
		})
	}
	const rest = () => {
		setSeconds(0.3)
		setShift(0)
	}

	return (
		<div
			ref={box}
			title={text}
			onPointerEnter={(event) => event.pointerType === "mouse" && slide()}
			onPointerLeave={(event) => event.pointerType === "mouse" && rest()}
			onClick={() => (shift ? rest() : slide())}
			className={cn("overflow-hidden whitespace-nowrap", className)}
		>
			<span
				ref={line}
				className={sliding ? "inline-block" : "block truncate"}
				style={{ transform: `translateX(${shift}px)`, transition: `transform ${seconds}s linear` }}
				onTransitionEnd={() => !shift && setSliding(false)}
			>
				{text}
			</span>
		</div>
	)
}
