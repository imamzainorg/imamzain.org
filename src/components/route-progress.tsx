"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

type Phase = "idle" | "loading" | "done"

// If a navigation never lands (offline, cancelled), finish the bar rather than leave it hanging.
const GIVE_UP_MS = 8000

const trim = (p: string) => p.replace(/\/+$/, "") || "/"

// The transition between pages: a thin gold bar that starts the moment an internal link is
// clicked and completes when the next route has rendered. It never covers or delays the page,
// so it stays out of the way for people who browse for a long time. It does not call
// preventDefault, so Next navigates as usual underneath.
export function RouteProgress() {
	const pathname = usePathname()
	const [phase, setPhase] = useState<Phase>("idle")
	const phaseRef = useRef<Phase>("idle")
	const pathRef = useRef(pathname)
	const timers = useRef<ReturnType<typeof setTimeout>[]>([])
	const finishRef = useRef<() => void>(() => {})

	useEffect(() => {
		const go = (next: Phase) => {
			phaseRef.current = next
			setPhase(next)
		}
		const later = (fn: () => void, ms: number) => {
			timers.current.push(setTimeout(fn, ms))
		}
		const finish = () => {
			if (phaseRef.current !== "loading") return
			go("done")
			later(() => go("idle"), 600)
		}
		finishRef.current = finish

		const markNav = () => document.documentElement.setAttribute("data-nav", "")

		const onClick = (e: MouseEvent) => {
			if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
			if (phaseRef.current === "loading") return
			const anchor = (e.target as Element | null)?.closest?.("a")
			if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return
			const url = new URL(anchor.href, location.href)
			if (url.origin !== location.origin || trim(url.pathname) === trim(location.pathname)) return

			markNav()
			go("loading")
			later(finish, GIVE_UP_MS)
		}

		document.addEventListener("click", onClick, true)
		// Back and forward have no click, but the new page should still fade in.
		window.addEventListener("popstate", markNav)

		const pending = timers.current
		return () => {
			document.removeEventListener("click", onClick, true)
			window.removeEventListener("popstate", markNav)
			pending.forEach(clearTimeout)
		}
	}, [])

	useEffect(() => {
		if (pathRef.current === pathname) return
		pathRef.current = pathname
		finishRef.current()
	}, [pathname])

	return (
		<div
			aria-hidden
			data-phase={phase}
			className="route-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-secondary shadow-[0_0_10px_#bb9661] dark:bg-Muharram_secondary dark:shadow-[0_0_10px_#a43232]"
		/>
	)
}
