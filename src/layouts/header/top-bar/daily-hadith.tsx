"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Quote } from "lucide-react"
import hadiths from "@/data/hadiths.json"

const noSubscription = () => () => {}

// The saying of the day, one line in the top bar. Tapping it opens the whole text. It rotates by
// day of the month like the home page's, and it is chosen in the browser: the site is built once
// and served for days, so a build-time pick would stay on one hadith.
export default function DailyHadith() {
	const index = useSyncExternalStore(
		noSubscription,
		() => (new Date().getDate() - 1) % hadiths.length,
		() => -1,
	)
	const [open, setOpen] = useState(false)
	const root = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		const close = () => setOpen(false)
		const onDown = (e: MouseEvent) => {
			if (!root.current?.contains(e.target as Node)) close()
		}
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
		document.addEventListener("mousedown", onDown)
		document.addEventListener("keydown", onKey)
		window.addEventListener("scroll", close, { passive: true })
		return () => {
			document.removeEventListener("mousedown", onDown)
			document.removeEventListener("keydown", onKey)
			window.removeEventListener("scroll", close)
		}
	}, [open])

	if (index < 0) return null
	const { content } = hadiths[index]

	return (
		<div ref={root} className="relative flex min-w-0 flex-1 justify-center max-xl:hidden">
			<button
				type="button"
				aria-expanded={open}
				aria-haspopup="dialog"
				onClick={() => setOpen((v) => !v)}
				className="group flex min-w-0 max-w-2xl items-center gap-2 rounded-full px-3 py-1 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
			>
				<Quote aria-hidden className="size-3.5 shrink-0 -scale-x-100 text-secondary dark:text-white/60" />
				<span className="truncate">{content}</span>
			</button>

			{open && (
				<div
					role="dialog"
					aria-label="حديث اليوم"
					className="dropdown-panel absolute top-full z-50 mt-2 w-[34rem] max-w-[calc(100vw-2rem)] rounded-3xl border border-primary/10 bg-white p-6 text-gray-900 shadow-2xl shadow-primary/15 dark:border-white/10 dark:bg-[#1d1a1b] dark:text-white"
				>
					<p className="flex items-center gap-2 text-sm font-bold text-secondary_dark dark:text-Muharram_secondary">
						<Quote aria-hidden className="size-4 -scale-x-100" />
						حديث اليوم
					</p>
					<p className="mt-3 text-xl font-bold leading-[2.2] text-primary dark:text-white">{content}</p>
				</div>
			)}
		</div>
	)
}
