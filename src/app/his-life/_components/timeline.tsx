"use client"

import { useId, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Era } from "../_data/biography"
import { MoreLink } from "@/components/brand"
import { Reveal, useShown } from "@/components/motion"

// How far each node leans toward its row's image side, as a share of the timeline's
// width. Neighbouring rows lean opposite ways, so the path swings twice this.
const SWING = 5

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

// The year once an image has taken its place: one line above the title.
function SmallYear({ era }: { era: Era }) {
	return (
		<p className="mb-3 flex items-baseline gap-3 text-secondary dark:text-Muharram_secondary">
			<span className="text-3xl font-bold md:text-4xl">{era.period}</span>
			{era.age && <span className="text-lg text-gray-500">عمره {era.age}</span>}
		</p>
	)
}

const kindLabel = { photo: "صورة", illustration: "رسم", map: "خريطة" }

// One frame for photos, drawings and maps alike; the tint keeps them in one family.
function EraImage({ image, className }: { image: NonNullable<Era["image"]>; className?: string }) {
	return (
		<figure className={className}>
			<div className="relative aspect-[4/3] max-h-64 w-full overflow-hidden rounded-3xl border border-secondary/40 bg-secondary/10 dark:border-Muharram_secondary/30 md:max-h-none">
				<Image
					src={image.src}
					alt={image.alt}
					width={800}
					height={600}
					loading="lazy"
					sizes="(min-width: 768px) 40vw, 100vw"
					className={cn(
						"h-full w-full saturate-[.85] dark:grayscale",
						image.kind === "map" ? "object-contain" : "object-cover",
					)}
				/>
				<div
					aria-hidden
					className="absolute inset-0 bg-gradient-to-t from-primary/15 to-secondary/5 mix-blend-multiply dark:from-Muharram_primary/20 dark:to-transparent"
				/>
			</div>
			<figcaption className="mt-3 flex items-baseline gap-2 text-sm leading-6 text-gray-600">
				<span className="shrink-0 rounded-full border border-secondary/50 px-2 text-xs font-semibold text-secondary_dark dark:border-Muharram_secondary/40 dark:text-Muharram_secondary">
					{kindLabel[image.kind]}
				</span>
				{image.caption}
			</figcaption>
		</figure>
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

// A circle sitting on the path, drawn in the path's own color. On wide screens it
// leans toward the image side; the path is then drawn through wherever it lands.
function Node({ lean }: { lean: number }) {
	const [ref, shown] = useShown<HTMLSpanElement>()
	return (
		<span
			ref={ref}
			aria-hidden
			data-journey-node
			style={{
				["--node-x" as string]: `${50 + lean * SWING}%`,
				transform: `${shown ? "scale(1)" : "scale(0)"}`,
				transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
			}}
			className="absolute right-[3px] top-4 z-10 h-5 w-5 rounded-full border-[3px] border-primary bg-[var(--page-bg)] motion-reduce:!transform-none dark:border-Muharram_primary md:left-[calc(var(--node-x)-10px)] md:right-auto"
		/>
	)
}

type Point = { x: number; y: number }
type Geometry = { width: number; height: number; points: Point[] }

// One smooth curve through every node: vertical at each node, so the path meets the
// circles head on, and an even S between them. Returns the whole path for the scroll
// fill, plus the pieces split into solid and dashed (travel) runs.
function journeyPaths({ height, points }: Geometry, dashed: boolean[]) {
	const first = points[0]
	const last = points[points.length - 1]
	const segment = (a: Point, b: Point) => {
		const pull = (b.y - a.y) / 2
		return `C ${a.x} ${a.y + pull} ${b.x} ${b.y - pull} ${b.x} ${b.y}`
	}
	let full = `M ${first.x} 0 L ${first.x} ${first.y}`
	let solid = full
	let travel = ""
	points.slice(1).forEach((point, i) => {
		const curve = segment(points[i], point)
		full += ` ${curve}`
		const piece = ` M ${points[i].x} ${points[i].y} ${curve}`
		if (dashed[i]) travel += piece
		else solid += piece
	})
	full += ` L ${last.x} ${height}`
	solid += ` M ${last.x} ${last.y} L ${last.x} ${height}`
	return { full, solid, travel }
}

export default function Timeline({ eras }: { eras: Era[] }) {
	const ref = useRef<HTMLDivElement>(null)
	const maskId = `journey-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
	const reduceMotion = useReducedMotion()
	const [geometry, setGeometry] = useState<Geometry | null>(null)

	// The path fills in as the reader scrolls through his life.
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
	const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

	// Measure where the nodes actually sit, and redraw whenever any row changes height,
	// so text reflow or a late font never leaves a node off the path.
	useLayoutEffect(() => {
		const root = ref.current
		if (!root) return
		const measure = () => {
			const box = root.getBoundingClientRect()
			const points = Array.from(root.querySelectorAll("[data-journey-node]"), (node) => {
				const r = node.getBoundingClientRect()
				return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
			})
			setGeometry({ width: box.width, height: box.height, points })
		}
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(root)
		root.querySelectorAll("li[data-era]").forEach((row) => observer.observe(row))
		return () => observer.disconnect()
	}, [eras])

	const paths = geometry?.points.length
		? journeyPaths(
				geometry,
				eras.map((era) => Boolean(era.route)),
			)
		: null

	return (
		<div ref={ref} className="relative">
			{geometry && paths && (
				<svg
					aria-hidden
					width={geometry.width}
					height={geometry.height}
					viewBox={`0 0 ${geometry.width} ${geometry.height}`}
					className="pointer-events-none absolute inset-0 overflow-visible"
					fill="none"
					strokeLinecap="round"
				>
					{!reduceMotion && (
						<mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={geometry.width} height={geometry.height}>
							<motion.path d={paths.full} stroke="white" strokeWidth={8} strokeLinecap="butt" style={{ pathLength }} />
						</mask>
					)}
					<g strokeWidth={2} className="stroke-secondary/30 dark:stroke-Muharram_secondary/25">
						<path d={paths.solid} />
						{paths.travel && <path d={paths.travel} strokeDasharray="7 9" />}
					</g>
					<g
						strokeWidth={2.5}
						mask={reduceMotion ? undefined : `url(#${maskId})`}
						className="stroke-primary dark:stroke-Muharram_primary"
					>
						<path d={paths.solid} />
						{paths.travel && <path d={paths.travel} strokeDasharray="7 9" />}
					</g>
				</svg>
			)}

			<ol className="space-y-20 md:space-y-28">
				{eras.map((era, i) => {
					const onRight = i % 2 === 0
					return (
						<li
							key={era.title}
							data-era
							className="relative grid pr-12 md:grid-cols-[1fr_18%_1fr] md:pr-0"
						>
							{/* In RTL the first column is the right one, so the image side is the left. */}
							<Node lean={onRight ? -1 : 1} />

							<Reveal
								x={onRight ? 60 : -60}
								y={0}
								className={cn("md:row-start-1", onRight ? "md:col-start-1" : "md:col-start-3")}
							>
								{era.image ? <SmallYear era={era} /> : <Year era={era} className="mb-4 md:hidden" />}
								{era.image && <EraImage image={era.image} className="mb-6 md:hidden" />}
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
								{era.image ? (
									<EraImage image={era.image} className="hidden md:block" />
								) : (
									<Year era={era} className="hidden md:block" />
								)}

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
