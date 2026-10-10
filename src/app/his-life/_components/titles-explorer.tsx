"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Title } from "../_data/biography"
import { MoreLink } from "./brand"

// Plain CSS transitions on purpose: a framer-motion `layoutId` underline here kept the
// whole page stuck in app/template.tsx's fade-out when navigating back to /his-life.
export default function TitlesExplorer({ titles }: { titles: Title[] }) {
	const [active, setActive] = useState(0)
	const title = titles[active]

	return (
		<div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
			<div
				role="tablist"
				aria-label="ألقاب الإمام"
				className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-y-1"
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
							"relative w-fit py-1 text-right text-2xl font-bold transition-colors duration-200 md:text-3xl",
							"after:absolute after:-bottom-0.5 after:right-0 after:h-0.5 after:w-full after:origin-right after:bg-secondary after:transition-transform after:duration-300 dark:after:bg-Muharram_secondary",
							i === active
								? "text-secondary after:scale-x-100 dark:text-white"
								: "text-white/50 after:scale-x-0 hover:text-white/80",
						)}
					>
						{t.name}
					</button>
				))}
			</div>

			<div id="title-panel" role="tabpanel" aria-labelledby={`title-tab-${active}`} aria-live="polite">
				<div key={title.name} className="space-y-8 animate-fade-in-up motion-reduce:animate-none">
					{title.quotes.map((quote) => (
						<figure key={quote.text} className="border-r-4 border-secondary pr-5 dark:border-Muharram_secondary">
							<blockquote className="text-xl leading-loose text-white md:text-2xl md:leading-loose">
								{quote.text}
							</blockquote>
							<figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
								<span className="text-sm text-white/60">{quote.source}</span>
								<MoreLink href={quote.href} light>
									النص الكامل
								</MoreLink>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</div>
	)
}
