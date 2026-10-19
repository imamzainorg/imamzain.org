"use client"

import { memo } from "react"
import { CheckCircle2, Clock, Download, History, Share2 } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { cn } from "@/lib/utils"
import { formatLength, formatTime } from "../_lib/format"
import { shareRecording } from "../_lib/share"
import type { PlayerState } from "../_lib/use-audio-player"
import { usePeaks } from "../_lib/use-peaks"
import PlayButton from "./play-button"
import PlayerNote from "./player-note"
import SeekBar from "./seek-bar"

const iconButton =
	"grid size-10 place-items-center rounded-full text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary"

// Download (the CDN sends the file as an attachment, so the browser saves it with its own
// progress) and share. Beside the title on wide screens, under the waveform on phones.
function Actions({ item, className }: { item: AudioItemLight; className?: string }) {
	const size = item.sizeMB ? ` (${item.sizeMB.toFixed(1)} ميغابايت)` : ""
	return (
		<div className={cn("flex shrink-0", className)}>
			<a href={item.audio} download className={iconButton} aria-label={`تحميل التسجيل${size}`} title={`تحميل${size}`}>
				<Download className="size-[18px]" />
			</a>
			<button type="button" onClick={() => shareRecording(item)} className={iconButton} aria-label="مشاركة التسجيل" title="مشاركة">
				<Share2 className="size-[18px]" />
			</button>
		</div>
	)
}

// One recording: the play button, the title and who speaks, and the recording's own waveform
// across the foot of the card, which is also its seek bar (press anywhere on it to start from
// there). The loaded card takes the gold offset outline of the site's panels.
const AudioCard = memo(function AudioCard({
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
	// The player's state when this is the recording loaded in it, else null.
	player: PlayerState | null
	resumeAt: number
	finished: boolean
	highlighted: boolean
	onToggle: (item: AudioItemLight) => void
	onSeek: (item: AudioItemLight, seconds: number) => void
	onRetry: () => void
	onSpeaker: (speaker: string) => void
}) {
	const active = player !== null
	const peaks = usePeaks(item.id)
	const duration = (active && player.duration) || item.durationSeconds || 0
	const time = active ? player.time : resumeAt
	return (
		<article
			id={`audio-${item.id}`}
			className={cn(
				"scroll-mt-40 rounded-[28px] border-2 bg-white/85 p-5 outline outline-2 outline-offset-4 outline-transparent transition-[border-color,box-shadow,outline-color] duration-300",
				active
					? "border-secondary shadow-xl shadow-secondary/15 outline-secondary/40 dark:border-Muharram_secondary dark:shadow-none dark:outline-Muharram_secondary/40"
					: "border-primary/10 hover:border-primary/35 dark:border-Muharram_primary/10 dark:hover:border-Muharram_primary/35",
				highlighted && !active && "border-secondary outline-secondary/40 dark:border-Muharram_secondary",
			)}
		>
			<div className="flex items-start gap-4">
				<PlayButton
					status={player?.status ?? "idle"}
					onClick={() => (player?.status === "error" ? onRetry() : onToggle(item))}
					title={item.title}
					className="size-12"
				/>

				<div className="min-w-0 flex-1">
					<h3 className={cn("line-clamp-2 text-lg font-bold leading-8", active ? "text-primary dark:text-Muharram_primary" : "text-gray-900")}>
						{item.title}
					</h3>
					<div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
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
						<span className="inline-flex items-center gap-1">
							<Clock aria-hidden className="size-3.5" />
							{formatLength(item.durationSeconds ?? 0)}
						</span>
						{finished && !active && (
							<span className="inline-flex items-center gap-1 font-semibold text-primary dark:text-Muharram_primary">
								<CheckCircle2 aria-hidden className="size-3.5" />
								استمعت إليه
							</span>
						)}
					</div>
				</div>

				<Actions item={item} className="max-sm:hidden" />
			</div>

			<div className="mt-4">
				<SeekBar
					peaks={peaks}
					time={time}
					duration={duration}
					buffered={active ? player.buffered : 0}
					onSeek={(seconds) => onSeek(item, seconds)}
				/>
				<div className="mt-1.5 flex items-center justify-between gap-3 text-xs text-gray-500">
					<span dir="ltr" className={cn("tabular-nums", active && "font-semibold text-primary dark:text-Muharram_primary")}>
						{formatTime(time)}
					</span>
					{active ? (
						<PlayerNote status={player.status} slow={player.slow} onRetry={onRetry} />
					) : (
						resumeAt > 0 && (
							<span className="inline-flex items-center gap-1 font-semibold text-secondary_dark dark:text-Muharram_secondary">
								<History aria-hidden className="size-3.5" />
								تابع من هنا
							</span>
						)
					)}
					<span dir="ltr" className="tabular-nums">
						{formatTime(duration)}
					</span>
				</div>
				<Actions item={item} className="-mb-2 mt-1 justify-end sm:hidden" />
			</div>
		</article>
	)
})

export default AudioCard
