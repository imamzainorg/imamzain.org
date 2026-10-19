"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Download, RotateCcw, RotateCw, Share2 } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { TitleIcon } from "@/components/brand"
import { cn } from "@/lib/utils"
import { formatTime } from "../_lib/format"
import { shareRecording } from "../_lib/share"
import { RATES, type AudioPlayer } from "../_lib/use-audio-player"
import { usePeaks } from "../_lib/use-peaks"
import PlayButton from "./play-button"
import PlayerNote from "./player-note"
import SeekBar from "./seek-bar"

const ghostButton =
	"grid size-11 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"

// The page's player, in the green shield the visitation form uses. It always holds a recording:
// the one playing, else the one a shared link or "continue listening" points at, else the first
// in the library, ready to start. Switching recordings fades one out and the next in.
export default function PlayerStage({
	item,
	player,
	resumeAt,
	onSpeaker,
}: {
	item: AudioItemLight
	player: AudioPlayer
	resumeAt: number
	onSpeaker: (speaker: string) => void
}) {
	const { state } = player
	const loaded = state.item?.id === item.id
	const status = loaded ? state.status : "idle"
	const time = loaded ? state.time : resumeAt
	const duration = (loaded && state.duration) || item.durationSeconds || 0
	const peaks = usePeaks(item.id)
	const nextRate = RATES[(RATES.indexOf(state.rate) + 1) % RATES.length] ?? 1

	const label =
		status === "playing" ? "يُعرض الآن" : status === "paused" ? "متوقف مؤقتاً" : resumeAt > 0 ? "تابع من حيث توقفت" : "جاهز للاستماع"

	const start = () => {
		if (status === "error") player.retry()
		else if (loaded) player.toggle(item)
		else player.play(item)
	}

	return (
		<div className="relative mx-auto w-full max-w-xl rounded-[40px] bg-[url('/shapes/ziara-bg.svg')] bg-[length:100%_100%] bg-center bg-no-repeat px-7 pb-16 pt-24 text-white drop-shadow-[0_0_45px_rgba(187,150,97,0.35)] dark:bg-[url('/shapes/ziara-bg_Muharram.svg')] dark:drop-shadow-[0_0_45px_rgba(164,50,50,0.3)] sm:px-14 sm:pb-20 sm:pt-28">
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={item.id}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -12 }}
					transition={{ duration: 0.25 }}
					className="text-center"
				>
					<p className="flex items-center justify-center gap-2 text-sm font-bold text-secondary dark:text-white/80">
						<TitleIcon className="w-3" />
						{label}
					</p>
					<h2 className="mt-3 line-clamp-2 text-xl font-extrabold leading-relaxed sm:text-2xl sm:leading-relaxed">{item.title}</h2>
					{item.speaker && (
						<button
							type="button"
							onClick={() => onSpeaker(item.speaker)}
							title="كل تسجيلات هذا المحاضر"
							className="mt-1 font-semibold text-secondary underline-offset-4 hover:underline dark:text-white/80"
						>
							{item.speaker}
						</button>
					)}
				</motion.div>
			</AnimatePresence>

			<SeekBar
				variant="dark"
				peaks={peaks}
				time={time}
				duration={duration}
				buffered={loaded ? state.buffered : 0}
				onSeek={(seconds) => (loaded ? player.seek(seconds) : player.play(item, seconds))}
				className="mt-6 h-16"
			/>
			<div className="mt-2 flex items-center justify-between gap-3 text-sm text-white/70">
				<span dir="ltr" className="tabular-nums">
					{formatTime(duration)}
				</span>
				<PlayerNote light status={status} slow={loaded && state.slow} onRetry={player.retry} />
				<span dir="ltr" className="font-semibold tabular-nums text-white">
					{formatTime(time)}
				</span>
			</div>

			<div dir="ltr" className="mt-5 flex items-center justify-center gap-4 sm:gap-6">
				<button
					type="button"
					onClick={() => (loaded ? player.skip(-15) : undefined)}
					disabled={!loaded}
					aria-label="رجوع 15 ثانية"
					title="رجوع 15 ثانية"
					className={cn(ghostButton, "relative size-12 disabled:opacity-40")}
				>
					<RotateCcw className="size-7" strokeWidth={1.5} />
					<span aria-hidden className="absolute text-[10px] font-bold">
						15
					</span>
				</button>
				<PlayButton variant="gold" status={status} title={item.title} onClick={start} className="size-20 [&>svg]:size-8" />
				<button
					type="button"
					onClick={() => (loaded ? player.skip(15) : undefined)}
					disabled={!loaded}
					aria-label="تقديم 15 ثانية"
					title="تقديم 15 ثانية"
					className={cn(ghostButton, "relative size-12 disabled:opacity-40")}
				>
					<RotateCw className="size-7" strokeWidth={1.5} />
					<span aria-hidden className="absolute text-[10px] font-bold">
						15
					</span>
				</button>
			</div>

			<div className="mt-5 flex items-center justify-center gap-2">
				<button
					type="button"
					onClick={() => player.setRate(nextRate)}
					aria-label={`سرعة التشغيل ${state.rate}، اضغط للتغيير إلى ${nextRate}`}
					title="سرعة التشغيل"
					className="h-11 rounded-full border border-white/25 px-4 text-sm font-bold tabular-nums transition-colors hover:border-white hover:bg-white/10"
				>
					<span dir="ltr">{state.rate}×</span>
				</button>
				<a
					href={item.audio}
					download
					className={ghostButton}
					aria-label={`تحميل التسجيل${item.sizeMB ? ` (${item.sizeMB.toFixed(1)} ميغابايت)` : ""}`}
					title="تحميل"
				>
					<Download className="size-5" />
				</a>
				<button type="button" onClick={() => shareRecording(item)} className={ghostButton} aria-label="مشاركة التسجيل" title="مشاركة">
					<Share2 className="size-5" />
				</button>
			</div>
		</div>
	)
}
