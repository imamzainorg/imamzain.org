"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { CheckCircle2, Clock, Download, History, Share2 } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { cn } from "@/lib/utils"
import { formatLength, formatTime } from "../_lib/format"
import type { PlayerState } from "../_lib/use-audio-player"
import { usePeaks } from "../_lib/use-peaks"
import PlayButton from "./play-button"
import PlayerNote from "./player-note"
import SeekBar from "./seek-bar"

const iconButton =
	"grid size-10 place-items-center rounded-xl text-gray-500 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary"

async function share(item: AudioItemLight) {
	const url = `${window.location.origin}/media/audio?id=${item.id}`
	// The phone's own share sheet where there is one; elsewhere the link goes to the clipboard.
	if (navigator.share && matchMedia("(pointer: coarse)").matches) {
		try {
			await navigator.share({ title: item.title, text: `${item.title}، ${item.speaker}`, url })
			return
		} catch (error) {
			if ((error as DOMException).name === "AbortError") return
		}
	}
	try {
		await navigator.clipboard.writeText(url)
		toast("تم نسخ رابط التسجيل", { description: item.title })
	} catch {
		toast("تعذر نسخ الرابط", { description: url })
	}
}

// Download (the CDN sends it as an attachment, so the browser saves it with its own progress
// bar instead of the page holding the whole file in memory) and share.
function RowActions({ item, className }: { item: AudioItemLight; className?: string }) {
	const size = item.sizeMB ? ` (${item.sizeMB.toFixed(1)} ميغابايت)` : ""
	return (
		<div className={cn("flex shrink-0 gap-1", className)}>
			<a href={item.audio} download className={iconButton} aria-label={`تحميل التسجيل${size}`} title={`تحميل${size}`}>
				<Download className="size-5" />
			</a>
			<button type="button" onClick={() => share(item)} className={iconButton} aria-label="مشاركة التسجيل" title="مشاركة">
				<Share2 className="size-5" />
			</button>
		</div>
	)
}

// One recording. Closed, it is a line to scan: title, speaker (a link that narrows the list to
// them), length, and whether this visitor finished it or stopped part way. Once played it opens
// to the waveform, the times and what the player is doing.
const AudioRow = memo(function AudioRow({
	item,
	player,
	resumeAt,
	finished,
	highlighted,
	onToggle,
	onSeek,
	onRetry,
	onSpeaker,
}: {
	item: AudioItemLight
	// The player, only when this is the recording loaded in it.
	player: PlayerState | null
	resumeAt: number
	finished: boolean
	highlighted: boolean
	onToggle: (item: AudioItemLight) => void
	onSeek: (seconds: number) => void
	onRetry: () => void
	onSpeaker: (speaker: string) => void
}) {
	const active = player !== null
	const peaks = usePeaks(active ? item.id : null)
	const duration = player?.duration || item.durationSeconds || 0

	return (
		<article
			id={`audio-${item.id}`}
			aria-label={item.title}
			className={cn(
				"scroll-mt-40 rounded-3xl border-2 bg-white p-4 transition-[border-color,box-shadow] duration-300 sm:p-5",
				active
					? "border-primary shadow-xl shadow-primary/10 dark:border-Muharram_primary dark:shadow-none"
					: "border-primary/10 hover:border-primary/40 dark:border-Muharram_primary/10 dark:hover:border-Muharram_primary/40",
				highlighted && !active && "border-secondary ring-4 ring-secondary/25 dark:border-Muharram_secondary",
			)}
		>
			<div className="flex items-start gap-4">
				<PlayButton
					status={player?.status ?? "idle"}
					onClick={() => (player?.status === "error" ? onRetry() : onToggle(item))}
					title={item.title}
				/>

				<div className="min-w-0 flex-1 pt-0.5">
					<h3
						className={cn(
							"line-clamp-2 text-lg font-bold leading-8 transition-colors",
							active ? "text-primary dark:text-Muharram_primary" : "text-gray-900",
						)}
					>
						{item.title}
					</h3>
					<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-gray-600">
						{item.speaker && (
							<button
								type="button"
								onClick={() => onSpeaker(item.speaker)}
								title="كل تسجيلات هذا المحاضر"
								className="font-semibold text-secondary_dark underline-offset-4 hover:underline dark:text-Muharram_secondary"
							>
								{item.speaker}
							</button>
						)}
						<span className="inline-flex items-center gap-1.5 text-sm">
							<Clock aria-hidden className="size-4" />
							{formatLength(item.durationSeconds ?? 0)}
						</span>
						{finished && !active && (
							<span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-Muharram_primary">
								<CheckCircle2 aria-hidden className="size-4" />
								استمعت إليه
							</span>
						)}
						{!active && resumeAt > 0 && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-0.5 text-sm font-semibold text-secondary_dark dark:bg-Muharram_secondary/20 dark:text-Muharram_secondary">
								<History aria-hidden className="size-4" />
								توقفت عند {formatTime(resumeAt)}
							</span>
						)}
						<RowActions item={item} className="-my-1 ms-auto sm:hidden" />
					</div>
				</div>

				<RowActions item={item} className="max-sm:hidden" />
			</div>

			{player && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					transition={{ duration: 0.25 }}
					className="overflow-hidden"
				>
					<div className="pt-4">
						<SeekBar peaks={peaks} time={player.time} duration={duration} buffered={player.buffered} onSeek={onSeek} />
						<div className="mt-2 flex items-center justify-between gap-3 text-sm text-gray-500">
							<span dir="ltr" className="tabular-nums">
								{formatTime(duration)}
							</span>
							<PlayerNote status={player.status} slow={player.slow} onRetry={onRetry} />
							<span dir="ltr" className="font-semibold tabular-nums text-primary dark:text-Muharram_primary">
								{formatTime(player.time)}
							</span>
						</div>
					</div>
				</motion.div>
			)}
		</article>
	)
})

export default AudioRow
