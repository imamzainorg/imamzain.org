"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

type Phase = "idle" | "cover" | "reveal"

const COVER_MS = 450
const REVEAL_MS = 550
// If a navigation never lands (offline, cancelled), lift the curtain rather than trap the visitor.
const GIVE_UP_MS = 6000

const trim = (p: string) => p.replace(/\/+$/, "") || "/"

// The transition between pages: a brand-colored curtain rises over the screen when an internal
// link is clicked, and lifts again once the next route has rendered. The curtain waits for the
// route, so a slow page never flashes half-built, and a fast one is never cut short.
// It never calls preventDefault, so it cannot break a link: Next navigates as usual underneath.
export function PageCurtain() {
	const pathname = usePathname()
	const [phase, setPhase] = useState<Phase>("idle")
	const phaseRef = useRef<Phase>("idle")
	const pathRef = useRef(pathname)
	const coveredAt = useRef(0)
	const giveUp = useRef<ReturnType<typeof setTimeout> | null>(null)
	const timers = useRef<ReturnType<typeof setTimeout>[]>([])
	const liftRef = useRef<(elapsed: number) => void>(() => {})

	useEffect(() => {
		const go = (next: Phase) => {
			phaseRef.current = next
			setPhase(next)
		}
		const later = (fn: () => void, ms: number) => {
			timers.current.push(setTimeout(fn, ms))
		}
		const lift = () => {
			if (giveUp.current) clearTimeout(giveUp.current)
			go("reveal")
			later(() => go("idle"), REVEAL_MS + 50)
		}
		liftRef.current = (elapsed) => later(lift, Math.max(0, COVER_MS - elapsed + 60))

		const markNav = () => document.documentElement.setAttribute("data-nav", "")

		const onClick = (e: MouseEvent) => {
			if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
			if (phaseRef.current !== "idle") return
			const anchor = (e.target as Element | null)?.closest?.("a")
			if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return
			const url = new URL(anchor.href, location.href)
			if (url.origin !== location.origin || trim(url.pathname) === trim(location.pathname)) return

			markNav()
			coveredAt.current = Date.now()
			go("cover")
			giveUp.current = setTimeout(lift, GIVE_UP_MS)
		}

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
		if (!reduce.matches) document.addEventListener("click", onClick, true)
		// Back and forward skip the curtain but still let the new page rise in.
		window.addEventListener("popstate", markNav)

		const pending = timers.current
		return () => {
			document.removeEventListener("click", onClick, true)
			window.removeEventListener("popstate", markNav)
			pending.forEach(clearTimeout)
			if (giveUp.current) clearTimeout(giveUp.current)
		}
	}, [])

	// The route changed: if a curtain is down, lift it once it has finished covering.
	useEffect(() => {
		if (pathRef.current === pathname) return
		pathRef.current = pathname
		if (phaseRef.current === "cover") liftRef.current(Date.now() - coveredAt.current)
	}, [pathname])

	return (
		<div
			aria-hidden
			data-phase={phase}
			className="page-curtain pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-primary dark:bg-[#171314]"
		>
			<span className="absolute inset-x-0 top-0 h-1.5 bg-secondary dark:bg-Muharram_secondary" />
			<span className="absolute inset-x-0 bottom-0 h-1.5 bg-secondary dark:bg-Muharram_secondary" />
			<Image
				src="/images/logo-horizontal-white.svg"
				alt=""
				width={208}
				height={80}
				className="h-auto w-44 animate-pulse sm:w-52"
			/>
		</div>
	)
}
