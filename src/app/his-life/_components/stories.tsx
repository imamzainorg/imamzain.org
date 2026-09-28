"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { arabicNumber } from "../_lib/anchors"
import { storyThemes, type Story, type StoryTheme } from "../_data/biography"

const INITIAL_COUNT = 6

export default function Stories({ stories }: { stories: Story[] }) {
	const [theme, setTheme] = useState<StoryTheme | "all">("all")
	const [expanded, setExpanded] = useState(false)

	const filtered = theme === "all" ? stories : stories.filter((s) => s.theme === theme)
	const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT)
	const filters = [
		{ key: "all" as const, label: "الكل", count: stories.length },
		...(Object.keys(storyThemes) as StoryTheme[]).map((key) => ({
			key,
			label: storyThemes[key],
			count: stories.filter((s) => s.theme === key).length,
		})),
	]

	return (
		<div>
			<div className="flex flex-wrap gap-2" role="group" aria-label="تصفية المشاهد">
				{filters.map((f) => (
					<button
						key={f.key}
						type="button"
						aria-pressed={theme === f.key}
						onClick={() => {
							setTheme(f.key)
							setExpanded(false)
						}}
						className={cn(
							"rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 md:text-base",
							theme === f.key
								? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
								: "border-secondary/40 bg-white text-gray-700 hover:border-primary dark:hover:border-Muharram_primary",
						)}
					>
						{f.label}
						<span className="mr-2 opacity-70">{arabicNumber(f.count)}</span>
					</button>
				))}
			</div>

			<ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
				{visible.map((story) => (
					<li
						key={story.title}
						className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
					>
						<span className="w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary">
							{storyThemes[story.theme]}
						</span>
						<h3 className="mt-3 text-xl font-bold text-primary dark:text-Muharram_primary">
							{story.title}
						</h3>
						<p className="mt-3 flex-1 text-base leading-loose text-gray-700 md:text-lg">
							{story.text}
						</p>
						<div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4 text-sm">
							<span className="text-gray-500">{story.source}</span>
							<Link
								href={story.href}
								className="inline-flex items-center gap-1 font-semibold text-primary hover:underline dark:text-Muharram_primary"
							>
								الرواية كاملة
								<ArrowLeft className="h-4 w-4" />
							</Link>
						</div>
					</li>
				))}
			</ul>

			{filtered.length > INITIAL_COUNT && (
				<div className="mt-8 text-center">
					<button
						type="button"
						onClick={() => setExpanded((v) => !v)}
						className="rounded-full border border-primary px-6 py-2 font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white"
					>
						{expanded ? "عرض أقل" : `عرض كل المشاهد (${arabicNumber(filtered.length)})`}
					</button>
				</div>
			)}
		</div>
	)
}
