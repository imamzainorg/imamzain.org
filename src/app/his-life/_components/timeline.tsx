"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useSpring } from "framer-motion"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Era } from "../_data/biography"
import { MoreLink } from "@/components/brand"
import { Reveal, useShown } from "@/components/motion"

function Year({ era, className }: { era: Era; className?: string }) {
	return (
		<div className={className}>
			<p className="text-5xl font-bold leading-tight text-secondary dark:text-Muharram_secondary md:text-6xl">
				{era.period}
			</p>
			{era.age && <p className="mt-2 text-xl text-gray-500">عمره {era.age}</p>}
		</div>
	)
}

function Excerpts({ items }: { items: Era["excerpts"] }) {
	return (
		<div className="space-y-6">
			{items.map((excerpt) => (
				<div key={excerpt.text}>
					<p className="text-xl leading-loose text-gray-800 md:text-[1.35rem] md:leading-[2.1]">{excerpt.text}</p>
					{excerpt.source && (
						<p className="mt-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
							{excerpt.source}
						</p>
					)}
				</div>
			))}
		</div>
	)
}

// A circle sitting on the line, drawn in the line's own color.
function Node() {
	const [ref, shown] = useShown<HTMLSpanElement>()
	return (
		<span
			ref={ref}
			aria-hidden
			style={{ transform: `${shown ? "scale(1)" : "scale(0)"}`, transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
			className="absolute right-[3px] top-4 h-5 w-5 rounded-full border-[3px] border-primary bg-yellow-50 motion-reduce:!transform-none dark:border-Muharram_primary md:right-[calc(50%-10px)]"
		/>
	)
}

export default function Timeline({ eras }: { eras: Era[] }) {
	const ref = useRef<HTMLDivElement>(null)
	// The line fills in as the reader scrolls through his life.
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
	const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

	return (
		<div ref={ref} className="relative">
			<div className="absolute bottom-0 right-3 top-0 w-0.5 bg-secondary/25 md:right-1/2 md:translate-x-1/2" />
			<motion.div
				style={{ scaleY }}
				className="absolute bottom-0 right-3 top-0 w-0.5 origin-top bg-primary dark:bg-Muharram_primary md:right-1/2 md:translate-x-1/2"
			/>

			<ol className="space-y-20 md:space-y-28">
				{eras.map((era, i) => {
					const onRight = i % 2 === 0
					return (
						<li key={era.title} className="relative grid pr-12 md:grid-cols-[1fr_5rem_1fr] md:pr-0">
							<Node />

							<Reveal
								x={onRight ? 60 : -60}
								y={0}
								className={cn("md:row-start-1", onRight ? "md:col-start-1" : "md:col-start-3")}
							>
								<Year era={era} className="mb-4 md:hidden" />
								<h3 className="text-3xl font-bold text-primary dark:text-Muharram_primary md:text-4xl">
									{era.title}
								</h3>
								<div className="mt-6">
									<Excerpts items={era.excerpts} />
								</div>
								<MoreLink href={era.link.href} className="mt-6 text-lg">
									{era.link.label}
								</MoreLink>
							</Reveal>

							<Reveal
								x={onRight ? -40 : 40}
								y={0}
								delay={0.15}
								className={cn(
									"md:row-start-1 md:mt-0 md:block md:pt-1",
									era.aside || era.route || era.quote || era.events ? "mt-8" : "hidden",
									onRight ? "md:col-start-3" : "md:col-start-1",
								)}
							>
								<Year era={era} className="hidden md:block" />

								{era.route && (
									<p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-semibold text-primary dark:text-Muharram_primary md:mt-6">
										{era.route.map((stop, s) => (
											<span key={`${stop}-${s}`} className="inline-flex items-center gap-1">
												{s > 0 && <span className="mx-1 text-secondary dark:text-Muharram_secondary">←</span>}
												<MapPin className="h-4 w-4 text-secondary dark:text-Muharram_secondary" />
												{stop}
											</span>
										))}
									</p>
								)}

								{era.aside && (
									<div className="mt-6 md:mt-8">
										<Excerpts items={era.aside} />
									</div>
								)}

								{era.quote && (
									<figure className="mt-6 border-r-4 border-secondary pr-5 dark:border-Muharram_secondary">
										<blockquote className="text-xl font-semibold leading-loose text-gray-900 md:text-2xl md:leading-loose">
											«{era.quote.text}»
										</blockquote>
										{era.quote.source && (
											<figcaption className="mt-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
												{era.quote.source}
											</figcaption>
										)}
									</figure>
								)}

								{era.events && (
									<ul className="mt-6 space-y-3">
										{era.events.map((event) => (
											<li key={event.href}>
												<Link
													href={event.href}
													className="group flex items-start gap-3 text-lg leading-8 text-gray-800 hover:text-primary dark:hover:text-Muharram_primary"
												>
													<span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-secondary dark:bg-Muharram_secondary" />
													<span className="underline-offset-4 group-hover:underline">{event.text}</span>
												</Link>
											</li>
										))}
									</ul>
								)}
							</Reveal>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
