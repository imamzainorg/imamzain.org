"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { formatTime } from "../_lib/format"

const BARS = 90

// Loudest sample of each slice, so short peaks survive the thinning.
function thin(peaks: number[], count: number): number[] {
	if (peaks.length <= count) return peaks
	const size = peaks.length / count
	return Array.from({ length: count }, (_, i) => {
		let max = 0
		for (let j = Math.floor(i * size); j < Math.floor((i + 1) * size); j++) max = Math.max(max, peaks[j])
		return max
	})
}

// The playhead control: the recording's waveform when it has loaded (a plain track until then),
// with what has played, what is already downloaded and what is still to come in three shades.
// A range input lies over it, so mouse, touch and the arrow keys all seek, and a drag only seeks
// once it is let go instead of on every pixel. Media timelines run left to right in Arabic too.
export default function SeekBar({
	peaks,
	time,
	duration,
	buffered,
	onSeek,
	variant = "light",
	className,
}: {
	peaks: number[] | null
	time: number
	duration: number
	buffered: number
	onSeek: (seconds: number) => void
	variant?: "light" | "dark"
	className?: string
}) {
	const [dragging, setDragging] = useState<number | null>(null)
	const shown = dragging ?? time
	const progress = duration ? Math.min(1, shown / duration) : 0
	const bars = useMemo(() => (peaks ? thin(peaks, BARS) : null), [peaks])
	const loudest = bars ? Math.max(...bars, 0.05) : 1

	const commit = () => {
		if (dragging === null) return
		onSeek(dragging)
		setDragging(null)
	}

	const shades =
		variant === "dark"
			? { played: "bg-secondary dark:bg-Muharram_secondary", loaded: "bg-white/45", rest: "bg-white/20" }
			: {
					played: "bg-primary dark:bg-Muharram_primary",
					loaded: "bg-primary/30 dark:bg-Muharram_primary/30",
					rest: "bg-gray-200",
				}
	const shade = (at: number) => (at <= progress ? shades.played : at <= Math.max(buffered, progress) ? shades.loaded : shades.rest)

	return (
		<div dir="ltr" className={cn("relative h-12", className)}>
			{bars ? (
				<div aria-hidden className="flex h-full items-center gap-[2px]">
					{bars.map((peak, i) => (
						<span
							key={i}
							className={cn("min-w-0 flex-1 rounded-full transition-colors duration-150", shade((i + 0.5) / BARS))}
							style={{ height: `${Math.max(10, (peak / loudest) * 100)}%` }}
						/>
					))}
				</div>
			) : (
				<div aria-hidden className={cn("absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full", shades.rest)}>
					<span className={cn("absolute inset-y-0 left-0", shades.loaded)} style={{ width: `${Math.max(buffered, progress) * 100}%` }} />
					<span className={cn("absolute inset-y-0 left-0", shades.played)} style={{ width: `${progress * 100}%` }} />
				</div>
			)}

			<input
				type="range"
				min={0}
				max={Math.max(1, Math.floor(duration))}
				step={1}
				value={Math.floor(shown)}
				disabled={!duration}
				onChange={(event) => setDragging(Number(event.target.value))}
				onPointerUp={commit}
				onKeyUp={commit}
				onBlur={commit}
				aria-label="موضع التشغيل"
				aria-valuetext={`${formatTime(shown)} من ${formatTime(duration)}`}
				className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-default"
			/>
		</div>
	)
}
