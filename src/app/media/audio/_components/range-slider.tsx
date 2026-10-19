"use client"

import { cn } from "@/lib/utils"

const thumb =
	"pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent focus:outline-none " +
	"[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110 dark:[&::-webkit-slider-thumb]:bg-Muharram_secondary " +
	"[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-secondary [&::-moz-range-thumb]:shadow-md dark:[&::-moz-range-thumb]:bg-Muharram_secondary " +
	"focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-secondary/30"

// Two thumbs on one track for a from-to range. Two native range inputs lie on top of each other,
// so dragging, touch and the arrow keys all work and screen readers announce each end. It runs
// right to left like the page: the small values on the right.
export default function RangeSlider({
	min,
	max,
	value,
	onChange,
	format,
	label,
	className,
}: {
	min: number
	max: number
	value: [number, number]
	onChange: (value: [number, number]) => void
	format: (value: number) => string
	// What the range measures, for screen readers.
	label: string
	className?: string
}) {
	const [low, high] = value
	const span = Math.max(1, max - min)
	const from = ((low - min) / span) * 100
	const to = ((high - min) / span) * 100

	return (
		<div className={cn("relative h-6", className)}>
			<span aria-hidden className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary/10 dark:bg-Muharram_primary/10" />
			<span
				aria-hidden
				className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary dark:bg-Muharram_primary"
				style={{ right: `${from}%`, left: `${100 - to}%` }}
			/>
			<input
				type="range"
				min={min}
				max={max}
				value={low}
				onChange={(event) => onChange([Math.min(Number(event.target.value), high), high])}
				aria-label={`${label}: من`}
				aria-valuetext={format(low)}
				className={cn(thumb, low > max - span / 10 && "z-10")}
			/>
			<input
				type="range"
				min={min}
				max={max}
				value={high}
				onChange={(event) => onChange([low, Math.max(Number(event.target.value), low)])}
				aria-label={`${label}: إلى`}
				aria-valuetext={format(high)}
				className={thumb}
			/>
		</div>
	)
}
