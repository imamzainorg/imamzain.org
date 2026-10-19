"use client"

import { memo } from "react"
import { CheckCircle2, Clock, Download, History, Loader2, Play, RotateCcw, Share2 } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { arabicNumber } from "@/lib/format"
import { cn } from "@/lib/utils"
import { formatLength, formatTime } from "../_lib/format"
import { shareRecording } from "../_lib/share"
import type { PlayerStatus } from "../_lib/use-audio-player"

const iconButton =
	"grid size-10 place-items-center rounded-full text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary"

// Three bars rising and falling while a recording plays; still while it is paused.
function Equalizer({ moving }: { moving: boolean }) {
	return (
		<span aria-hidden className="flex h-5 items-end gap-[3px]">
			{[0, 0.25, 0.5].map((delay) => (
				<span
					key={delay}
					className={cn("w-[3px] origin-bottom rounded-full bg-current", moving ? "h-full animate-equalizer" : "h-2/5")}
					style={{ animationDelay: `${delay}s` }}
				/>
			))}
		</span>
	)
}

// The round mark at the start of a card: the recording's number in the gold ring of the
// site's numbered steps, turning into a play button under the pointer, and into the player's
// state (equalizer, spinner, retry) for the recording that is loaded.
function Mark({ index, status }: { index: number; status: PlayerStatus | null }) {
	if (status === null) {
		return (
			<span className="relative grid size-12 shrink-0 place-items-center rounded-full border-2 border-secondary text-base font-extrabold sm:text-lg text-secondary_dark transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white dark:border-Muharram_secondary dark:text-Muharram_secondary dark:group-hover:border-Muharram_primary dark:group-hover:bg-Muharram_primary sm:size-16">
				<span className="transition-opacity duration-200 group-hover:opacity-0">{arabicNumber(index)}</span>
				<Play aria-hidden className="absolute size-6 translate-x-[1px] fill-current opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
			</span>
		)
	}
	return (
		<span
			className={cn(
				"grid size-12 shrink-0 place-items-center rounded-full text-white shadow-lg sm:size-16",
				status === "error" ? "bg-red-600" : "bg-primary shadow-primary/30 dark:bg-Muharram_primary dark:shadow-none",
			)}
		>
			{status === "loading" ? (
				<Loader2 aria-hidden className="size-6 animate-spin" />
			) : status === "error" ? (
				<RotateCcw aria-hidden className="size-6" />
			) : (
				<Equalizer moving={status === "playing"} />
			)}
		</span>
	)
}

// Download (the CDN sends the file as an attachment, so the browser saves it with its own
// progress) and share. Beside the title on wide screens, at the end of the details line on phones.
function Actions({ item, className }: { item: AudioItemLight; className?: string }) {
	const size = item.sizeMB ? ` (${item.sizeMB.toFixed(1)} ميغابايت)` : ""
	return (
		<span className={cn("pointer-events-auto relative z-10 flex shrink-0", className)}>
			<a href={item.audio} download className={iconButton} aria-label={`تحميل التسجيل${size}`} title={`تحميل${size}`}>
				<Download className="size-[18px]" />
			</a>
			<button type="button" onClick={() => shareRecording(item)} className={iconButton} aria-label="مشاركة التسجيل" title="مشاركة">
				<Share2 className="size-[18px]" />
			</button>
		</span>
	)
}

// One recording in the list. The whole card plays it; the speaker's name narrows the list to
// them. The loaded one takes the gold offset outline of the site's panels and a progress line,
// and a recording this visitor stopped part way shows where.
const AudioCard = memo(function AudioCard({
	item,
	index,
	status,
	progress,
	resumeAt,
	finished,
	highlighted,
	onPlay,
	onSpeaker,
}: {
	item: AudioItemLight
	index: number
	// The player's state when this is the recording loaded in it, else null.
	status: PlayerStatus | null
	progress: number
	resumeAt: number
	finished: boolean
	highlighted: boolean
	onPlay: (item: AudioItemLight) => void
	onSpeaker: (speaker: string) => void
}) {
	const active = status !== null
	const duration = item.durationSeconds ?? 0
	const shown = active ? progress : duration && resumeAt ? resumeAt / duration : 0
	const action = status === "playing" ? "إيقاف مؤقت" : status === "error" ? "إعادة المحاولة" : "تشغيل"

	return (
		<article
			id={`audio-${item.id}`}
			className={cn(
				"group relative scroll-mt-40 overflow-hidden rounded-[28px] border-2 bg-white/85 transition-[border-color,box-shadow,outline-color] duration-300",
				"outline outline-2 outline-offset-4 outline-transparent",
				active
					? "border-secondary shadow-xl shadow-secondary/15 outline-secondary/40 dark:border-Muharram_secondary dark:shadow-none dark:outline-Muharram_secondary/40"
					: "border-primary/10 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 dark:border-Muharram_primary/10 dark:hover:border-Muharram_primary/35",
				highlighted && !active && "border-secondary outline-secondary/40 dark:border-Muharram_secondary",
			)}
		>
			{/* The whole card is the play button; the links inside sit above it. */}
			<button
				type="button"
				onClick={() => onPlay(item)}
				aria-label={`${action}: ${item.title}`}
				className="absolute inset-0 z-0 rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			/>

			<div className="pointer-events-none relative flex items-center gap-3.5 p-3.5 sm:gap-5 sm:p-5">
				<Mark index={index} status={status} />

				<div className="min-w-0 flex-1">
					<h3
						className={cn(
							"line-clamp-2 text-base font-bold leading-7 transition-colors sm:text-lg sm:leading-8",
							active ? "text-primary dark:text-Muharram_primary" : "text-gray-900 group-hover:text-primary dark:group-hover:text-Muharram_primary",
						)}
					>
						{item.title}
					</h3>
					<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
						{item.speaker && (
							<button
								type="button"
								onClick={() => onSpeaker(item.speaker)}
								title="كل تسجيلات هذا المحاضر"
								className="pointer-events-auto relative z-10 font-semibold text-secondary_dark underline-offset-4 hover:underline dark:text-Muharram_secondary"
							>
								{item.speaker}
							</button>
						)}
						<span className="inline-flex items-center gap-1">
							<Clock aria-hidden className="size-3.5" />
							{formatLength(duration)}
						</span>
						{finished && !active && (
							<span className="inline-flex items-center gap-1 font-semibold text-primary dark:text-Muharram_primary">
								<CheckCircle2 aria-hidden className="size-3.5" />
								استمعت إليه
							</span>
						)}
						{!active && resumeAt > 0 && (
							<span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 font-semibold text-secondary_dark dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary">
								<History aria-hidden className="size-3.5" />
								توقفت عند {formatTime(resumeAt)}
							</span>
						)}
						<Actions item={item} className="-my-2 ms-auto sm:hidden" />
					</div>
				</div>

				<Actions item={item} className="max-sm:hidden" />
			</div>

			{shown > 0 && (
				<span aria-hidden dir="ltr" className="absolute inset-x-0 bottom-0 h-1 bg-secondary/15 dark:bg-Muharram_secondary/15">
					<span
						className="block h-full bg-secondary transition-[width] duration-300 ease-linear dark:bg-Muharram_secondary"
						style={{ width: `${Math.min(1, shown) * 100}%` }}
					/>
				</span>
			)}
		</article>
	)
})

export default AudioCard
