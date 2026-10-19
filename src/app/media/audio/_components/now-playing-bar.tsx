"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RotateCcw, RotateCw, X } from "lucide-react"
import { formatTime } from "../_lib/format"
import { RATES, type AudioPlayer } from "../_lib/use-audio-player"
import PlayButton from "./play-button"
import PlayerNote from "./player-note"
import SeekBar from "./seek-bar"

const roundButton =
	"grid size-10 shrink-0 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"

function SkipButton({ seconds, onClick }: { seconds: number; onClick: () => void }) {
	const Icon = seconds < 0 ? RotateCcw : RotateCw
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={seconds < 0 ? `رجوع ${-seconds} ثانية` : `تقديم ${seconds} ثانية`}
			title={seconds < 0 ? `رجوع ${-seconds} ثانية` : `تقديم ${seconds} ثانية`}
			className={`${roundButton} relative max-sm:hidden`}
		>
			<Icon className="size-6" strokeWidth={1.6} />
			<span aria-hidden className="absolute text-[9px] font-bold">
				{Math.abs(seconds)}
			</span>
		</button>
	)
}

// The player's small form: it rises from the foot of the screen once a recording is loaded and
// the stage at the top of the page has scrolled away, so the list can be searched, filtered and
// paged without losing the controls. It carries the header's green, rounded the other way, and
// pressing the title goes back up to the stage.
export default function NowPlayingBar({ player, show, onLocate }: { player: AudioPlayer; show: boolean; onLocate: () => void }) {
	const { state } = player
	const item = show ? state.item : null
	const visible = item !== null

	// Room under the page so the bar never covers the end of it.
	useEffect(() => {
		if (!visible) return
		const before = document.body.style.paddingBottom
		document.body.style.paddingBottom = "7.5rem"
		return () => {
			document.body.style.paddingBottom = before
		}
	}, [visible])

	const nextRate = RATES[(RATES.indexOf(state.rate) + 1) % RATES.length] ?? 1
	const duration = state.duration || item?.durationSeconds || 0

	return (
		<AnimatePresence>
			{item && (
				<motion.section
					aria-label="المشغل"
					initial={{ y: "110%" }}
					animate={{ y: 0 }}
					exit={{ y: "110%" }}
					transition={{ type: "spring", stiffness: 260, damping: 30 }}
					className="fixed inset-x-0 bottom-0 z-40 rounded-t-[2rem] bg-primary text-white shadow-[0_-12px_40px_rgba(0,0,0,0.2)] dark:bg-Muharram_primary"
				>
					<div className="container pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
						<SeekBar
							variant="dark"
							peaks={null}
							time={state.time}
							duration={duration}
							buffered={state.buffered}
							onSeek={player.seek}
						/>

						<div className="mt-2 flex items-center gap-2 sm:gap-4">
							<div dir="ltr" className="flex shrink-0 items-center gap-1 sm:gap-2">
								<SkipButton seconds={-15} onClick={() => player.skip(-15)} />
								<PlayButton
									variant="white"
									status={state.status}
									title={item.title}
									onClick={() => (state.status === "error" ? player.retry() : player.toggle(item))}
									className="size-12"
								/>
								<SkipButton seconds={15} onClick={() => player.skip(15)} />
							</div>

							<div className="min-w-0 flex-1 px-1">
								<button
									type="button"
									onClick={onLocate}
									title="العودة إلى المشغل"
									className="block max-w-full truncate text-start font-bold underline-offset-4 hover:underline"
								>
									{item.title}
								</button>
								{state.status === "loading" || state.status === "error" ? (
									<PlayerNote light status={state.status} slow={state.slow} onRetry={player.retry} className="block text-start" />
								) : (
									<span className="block truncate text-sm text-white/70">{item.speaker}</span>
								)}
							</div>

							<span dir="ltr" className="hidden shrink-0 text-sm tabular-nums text-white/80 md:block">
								{formatTime(state.time)} / {formatTime(duration)}
							</span>

							<button
								type="button"
								onClick={() => player.setRate(nextRate)}
								aria-label={`سرعة التشغيل ${state.rate}، اضغط للتغيير إلى ${nextRate}`}
								title="سرعة التشغيل"
								className="h-10 shrink-0 rounded-full border border-white/30 px-3 text-sm font-bold tabular-nums transition-colors hover:border-white hover:bg-white/10"
							>
								<span dir="ltr">{state.rate}×</span>
							</button>

							<button type="button" onClick={player.stop} aria-label="إغلاق المشغل" title="إغلاق" className={roundButton}>
								<X className="size-5" />
							</button>
						</div>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}
