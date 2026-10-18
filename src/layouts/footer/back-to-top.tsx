"use client"

import { ArrowUp } from "lucide-react"

export function BackToTop() {
	return (
		<button
			type="button"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="العودة إلى أعلى الصفحة"
			className="group grid size-11 place-items-center rounded-xl border-2 border-secondary text-secondary transition duration-300 hover:bg-secondary hover:text-white dark:border-Muharram_secondary dark:text-Muharram_secondary dark:hover:bg-Muharram_secondary"
		>
			<ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
		</button>
	)
}
