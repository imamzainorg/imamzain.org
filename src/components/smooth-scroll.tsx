"use client"

import { useEffect } from "react"
import Lenis from "lenis"

// Eases mouse-wheel and keyboard scrolling so the page glides instead of stepping. Touch screens keep
// their native scrolling, reduced-motion users get none, and scrollable panels (sidebars, menus,
// dropdowns) keep scrolling on their own. It pauses while a modal has locked the page.
export default function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => 1 - Math.pow(1 - t, 4),
			wheelMultiplier: 0.9,
			allowNestedScroll: true,
			anchors: true,
		})

		let frame = requestAnimationFrame(function raf(time) {
			lenis.raf(time)
			frame = requestAnimationFrame(raf)
		})

		// Modals (HeroUI, the image viewers) lock the page by hiding the body's overflow.
		const sync = () => {
			if (getComputedStyle(document.body).overflow === "hidden") lenis.stop()
			else lenis.start()
		}
		sync()
		const observer = new MutationObserver(sync)
		observer.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] })
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] })

		return () => {
			cancelAnimationFrame(frame)
			observer.disconnect()
			lenis.destroy()
		}
	}, [])

	return null
}
