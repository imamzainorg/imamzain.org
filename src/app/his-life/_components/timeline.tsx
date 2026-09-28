"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Era } from "../_data/biography"
import { MoreLink, TitleIcon } from "./brand"
import { Reveal } from "./motion"

function Year({ era, className }: { era: Era; className?: string }) {
	return (
		<div className={className}>
			<p className="text-5xl font-bold leading-tight text-secondary dark:text-Muharram_secondary md:text-6xl">
				{era.period}
			</p>
			{era.age && <p className="mt-2 text-lg text-gray-500">عمره {era.age}</p>}
		</div>
	)
}

export default function Timeline({ eras }: { eras: Era[] }) {
	const ref = useRef<HTMLDivElement>(null)
	// The green line fills in as the reader scrolls through his life.
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
	const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

	return (
		<div ref={ref} className="relative">
			<div className="absolute bottom-0 right-3 top-0 w-0.5 bg-secondary/25 md:right-1/2 md:translate-x-1/2" />
			<motion.div
				style={{ scaleY }}
				className="absolute bottom-0 right-3 top-0 w-0.5 origin-top bg-primary dark:bg-Muharram_primary md:right-1/2 md:translate-x-1/2"
			/>

			<ol className="space-y-16 md:space-y-24">
				{eras.map((era, i) => {
					const onRight = i % 2 === 0
					return (
						<li key={era.title} className="relative grid pr-12 md:grid-cols-[1fr_5rem_1fr] md:pr-0">
							<motion.span
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true, amount: 1 }}
								transition={{ type: "spring", stiffness: 260, damping: 18 }}
								className="absolute right-0 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-50 md:right-1/2 md:translate-x-1/2"
							>
								<TitleIcon className="w-4" />
							</motion.span>

							<Reveal
								x={onRight ? 60 : -60}
								y={0}
								className={cn("md:row-start-1", onRight ? "md:col-start-1" : "md:col-start-3")}
							>
								<Year era={era} className="mb-3 md:hidden" />
								<h3 className="text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl">
									{era.title}
								</h3>
								<p className="mt-4 text-lg leading-loose text-gray-700">{era.text}</p>

								{era.route && (
									<p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-primary dark:text-Muharram_primary">
										{era.route.map((stop, s) => (
											<span key={`${stop}-${s}`} className="inline-flex items-center gap-1">
												{s > 0 && <span className="mx-1 text-secondary dark:text-Muharram_secondary">←</span>}
												<MapPin className="h-4 w-4 text-secondary dark:text-Muharram_secondary" />
												{stop}
											</span>
										))}
									</p>
								)}

								{era.quote && (
									<figure className="mt-6 border-r-4 border-secondary pr-5 dark:border-Muharram_secondary">
										<blockquote className="text-xl font-semibold leading-loose text-gray-800">
											«{era.quote.text}»
										</blockquote>
										<figcaption className="mt-1 text-sm text-gray-500">{era.quote.by}</figcaption>
									</figure>
								)}

								{era.events && (
									<ul className="mt-6 space-y-2">
										{era.events.map((event) => (
											<li key={event.href}>
												<Link
													href={event.href}
													className="group flex items-start gap-3 leading-8 text-gray-700 hover:text-primary dark:hover:text-Muharram_primary"
												>
													<span className="mt-3 h-2 w-2 shrink-0 rotate-45 bg-secondary dark:bg-Muharram_secondary" />
													<span className="underline-offset-4 group-hover:underline">{event.text}</span>
												</Link>
											</li>
										))}
									</ul>
								)}

								<MoreLink href={era.link.href} className="mt-6">
									{era.link.label}
								</MoreLink>
							</Reveal>

							<Reveal
								x={onRight ? -40 : 40}
								y={0}
								delay={0.15}
								className={cn(
									"hidden pt-1 md:row-start-1 md:block",
									onRight ? "md:col-start-3" : "md:col-start-1 md:text-left",
								)}
							>
								<Year era={era} />
							</Reveal>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
