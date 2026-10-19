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
import MarqueeTitle from "./marquee-title"
import PlayerNote from "./player-note"
import SeekBar from "./seek-bar"

const iconButton =
	"grid size-8 place-items-center rounded-full text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary dark:hover:bg-Muharram_primary/10 dark:hover:text-Muharram_primary"

// Download (the CDN sends the file as an attachment, so the browser saves it with its own
// progress) and share.
function Actions({ item, className }: { item: AudioItemLight; className?: string }) {
	const size = item.sizeMB ? ` (${item.sizeMB.toFixed(1)} ميغابايت)` : ""
	return (
		<div className={cn("flex shrink-0", className)}>
			<a href={item.audio} download className={iconButton} aria-label={`تحميل التسجيل${size}`} title={`تحميل${size}`}>
				<Download className="size-4" />
			</a>
			<button type="button" onClick={() => shareRecording(item)} className={iconButton} aria-label="مشاركة التسجيل" title="مشاركة">
				<Share2 className="size-4" />
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
				"scroll-mt-40 rounded-2xl border bg-white/85 p-3.5 outline outline-1 outline-offset-2 outline-transparent transition-[border-color,box-shadow,outline-color] duration-300",
				active
					? "border-secondary shadow-lg shadow-secondary/15 outline-secondary/40 dark:border-Muharram_secondary dark:shadow-none dark:outline-Muharram_secondary/40"
					: "border-primary/15 hover:border-primary/40 dark:border-Muharram_primary/15 dark:hover:border-Muharram_primary/40",
				highlighted && !active && "border-secondary outline-secondary/40 dark:border-Muharram_secondary",
			)}
		>
			<div className="flex items-center gap-3">
				<PlayButton
					status={player?.status ?? "idle"}
					onClick={() => (player?.status === "error" ? onRetry() : onToggle(item))}
					title={item.title}
					className="size-9 shadow-none [&>svg]:size-4"
				/>

				<div className="min-w-0 flex-1">
					<MarqueeTitle
						text={item.title}
						className={cn("text-sm font-bold leading-6", active ? "text-primary dark:text-Muharram_primary" : "text-gray-900")}
					/>
					<div className="flex items-center gap-x-2.5 text-xs text-gray-600">
						{item.speaker && (
							<button
								type="button"
								onClick={() => onSpeaker(item.speaker)}
								title="كل تسجيلات هذا المحاضر"
								className="min-w-0 truncate font-semibold text-secondary_dark underline-offset-4 hover:underline dark:text-Muharram_secondary"
							>
								{item.speaker}
							</button>
						)}
						<span className="inline-flex shrink-0 items-center gap-1">
							<Clock aria-hidden className="size-3" />
							{formatLength(item.durationSeconds ?? 0)}
						</span>
						{finished && !active && (
							<CheckCircle2 aria-label="استمعت إليه" className="size-3.5 shrink-0 text-primary dark:text-Muharram_primary" />
						)}
					</div>
				</div>

				<Actions item={item} />
			</div>

			<div className="mt-2">
				<SeekBar
					peaks={peaks}
					time={time}
					duration={duration}
					buffered={active ? player.buffered : 0}
					onSeek={(seconds) => onSeek(item, seconds)}
					className="h-8"
				/>
				<div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-gray-500">
					<span dir="ltr" className={cn("tabular-nums", active && "font-semibold text-primary dark:text-Muharram_primary")}>
						{formatTime(time)}
					</span>
					{active ? (
						<PlayerNote status={player.status} slow={player.slow} onRetry={onRetry} className="text-[11px]" />
					) : (
						resumeAt > 0 && (
							<span className="inline-flex items-center gap-1 font-semibold text-secondary_dark dark:text-Muharram_secondary">
								<History aria-hidden className="size-3" />
								تابع من هنا
							</span>
						)
					)}
					<span dir="ltr" className="tabular-nums">
						{formatTime(duration)}
					</span>
				</div>
			</div>
		</article>
	)
})

export default AudioCard
