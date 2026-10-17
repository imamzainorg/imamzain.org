"use client"

import { useEffect, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type Theme = "dark" | "light"

// One store for the whole app, so the toggle in the top bar and the one in the mobile header
// always agree.
const listeners = new Set<() => void>()
let currentTheme: Theme = "light"

const subscribe = (callback: () => void) => {
	listeners.add(callback)
	return () => {
		listeners.delete(callback)
	}
}

function setTheme(theme: Theme) {
	currentTheme = theme
	localStorage.setItem("theme", theme)
	document.documentElement.classList.remove("light", "dark")
	document.documentElement.classList.add(theme)
	listeners.forEach((listener) => listener())
}

// The round light/dark switch. `className` carries the colours, which depend on what it sits on.
export default function ThemeToggle({ className }: { className?: string }) {
	const theme = useSyncExternalStore(
		subscribe,
		() => currentTheme,
		() => "light" as Theme,
	)

	// The saved choice is only known in the browser.
	useEffect(() => setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light"), [])

	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			title="تبديل الثيم"
			aria-label="تبديل الثيم"
			className={cn("grid size-7 place-items-center rounded-full transition-colors", className)}
		>
			{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
		</button>
	)
}
