"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Title } from "../_data/biography"

export default function TitlesExplorer({ titles }: { titles: Title[] }) {
	const [active, setActive] = useState(0)
	const title = titles[active]

	return (
		<div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
			<div
				role="tablist"
				aria-label="ألقاب الإمام"
				className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 content-start"
			>
				{titles.map((t, i) => (
					<button
						key={t.name}
						id={`title-tab-${i}`}
						role="tab"
						type="button"
						aria-selected={i === active}
						aria-controls="title-panel"
						onClick={() => setActive(i)}
						className={cn(
							"rounded-2xl border px-4 py-4 text-lg font-bold transition-colors duration-150",
							i === active
								? "border-primary bg-primary text-white shadow-lg dark:border-Muharram_primary dark:bg-Muharram_primary"
								: "border-secondary/30 bg-white text-primary hover:border-primary dark:text-Muharram_primary dark:hover:border-Muharram_primary",
						)}
					>
						{t.name}
					</button>
				))}
			</div>

			<div
				id="title-panel"
				role="tabpanel"
				aria-labelledby={`title-tab-${active}`}
				aria-live="polite"
				className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8"
			>
				<h3 className="text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl">
					{title.name}
				</h3>
				<p className="mt-4 text-lg leading-loose text-gray-700">{title.meaning}</p>
				{title.quote && (
					<blockquote className="mt-4 rounded-l-xl border-r-4 border-secondary bg-secondary/5 px-5 py-3 text-lg leading-loose text-gray-800 dark:border-Muharram_secondary dark:bg-Muharram_secondary/5">
						«{title.quote}»
					</blockquote>
				)}
				<div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm">
					<span className="text-secondary_dark dark:text-Muharram_secondary">{title.source}</span>
					<Link
						href={title.href}
						className="inline-flex items-center gap-1 font-semibold text-primary hover:underline dark:text-Muharram_primary"
					>
						النص الكامل
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</div>
	)
}
