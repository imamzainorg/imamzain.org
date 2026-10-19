"use client"

import { useState } from "react"
import { Clock, History, Sparkles } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { SectionTitle, infoPanel } from "@/components/brand"
import { arabicNumber } from "@/lib/format"
import { cn } from "@/lib/utils"
import { formatLength, formatTime } from "../_lib/format"
import type { PlayerState } from "../_lib/use-audio-player"
import PlayButton from "./play-button"

type Tab = "latest" | "continue"

function Row({
	item,
	state,
	note,
	onToggle,
}: {
	item: AudioItemLight
	state: PlayerState | null
	note: React.ReactNode
	onToggle: (item: AudioItemLight) => void
}) {
	return (
		<li className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
			<PlayButton status={state?.status ?? "idle"} onClick={() => onToggle(item)} title={item.title} className="size-11" />
			<div className="min-w-0 flex-1">
				<p className="truncate font-bold text-gray-900">{item.title}</p>
				<p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
					<span className="font-semibold text-secondary_dark dark:text-Muharram_secondary">{item.speaker}</span>
					{note}
				</p>
			</div>
		</li>
	)
}

// The page's opening: what the library holds, and a short panel of recordings worth starting with.
// "أُضيف حديثاً" is the newest few; a visitor who has listened before also gets "تابع الاستماع",
// the ones they stopped part way.
export default function AudioHero({
	counts,
	latest,
	resumable,
	positions,
	activeId,
	player,
	onToggle,
}: {
	counts: { recordings: number; speakers: number; hours: number }
	latest: AudioItemLight[]
	resumable: AudioItemLight[]
	positions: Record<number, number>
	activeId: number | null
	player: PlayerState
	onToggle: (item: AudioItemLight) => void
}) {
	const [chosen, setChosen] = useState<Tab>("latest")
	const tab: Tab = chosen === "continue" && resumable.length ? "continue" : "latest"
	const rows = tab === "latest" ? latest : resumable

	const stats = [
		{ value: counts.recordings, label: "تسجيلاً" },
		{ value: counts.speakers, label: "محاضراً" },
		{ value: counts.hours, label: "ساعة استماع" },
	]
	const tabs = [
		{ key: "latest" as const, label: "أُضيف حديثاً", Icon: Sparkles },
		...(resumable.length ? [{ key: "continue" as const, label: "تابع الاستماع", Icon: History }] : []),
	]

	return (
		<div className="grid items-center gap-12 pb-16 pt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">
			<div className="min-w-0">
				<SectionTitle
					as="h1"
					title="المكتبة الصوتية"
					text="محاضرات ودروس في سيرة الإمام زين العابدين عليه السلام وأدعيته ورسالة الحقوق، تستمع إليها هنا أو تحمّلها مجاناً."
					className="mb-10"
				/>
				<dl className="grid max-w-xl grid-cols-3 gap-3">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="flex flex-col-reverse items-center rounded-3xl border border-primary/10 bg-white/70 px-2 py-5 text-center dark:border-Muharram_primary/10"
						>
							<dt className="mt-1 text-sm text-gray-600">{stat.label}</dt>
							<dd className="text-3xl font-extrabold text-secondary_dark dark:text-Muharram_secondary md:text-4xl">{arabicNumber(stat.value)}</dd>
						</div>
					))}
				</dl>
			</div>

			<section className={cn(infoPanel, "min-w-0 p-6 md:p-8")} aria-label={tabs.find((t) => t.key === tab)?.label}>
				<div role="tablist" className="mb-5 flex gap-2">
					{tabs.map(({ key, label, Icon }) => (
						<button
							key={key}
							type="button"
							role="tab"
							aria-selected={tab === key}
							onClick={() => setChosen(key)}
							className={cn(
								"inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition-colors",
								tab === key
									? "bg-primary text-white dark:bg-Muharram_primary"
									: "text-gray-600 hover:bg-primary/10 hover:text-primary dark:hover:text-Muharram_primary",
							)}
						>
							<Icon aria-hidden className="size-4" />
							{label}
						</button>
					))}
				</div>
				<ul className="divide-y divide-primary/10 dark:divide-Muharram_primary/10">
					{rows.map((item) => (
						<Row
							key={item.id}
							item={item}
							state={item.id === activeId ? player : null}
							onToggle={onToggle}
							note={
								tab === "latest" ? (
									<span className="inline-flex items-center gap-1">
										<Clock aria-hidden className="size-3.5" />
										{formatLength(item.durationSeconds ?? 0)}
									</span>
								) : (
									<span className="inline-flex items-center gap-1">
										<History aria-hidden className="size-3.5" />
										توقفت عند <span dir="ltr">{formatTime(positions[item.id] ?? 0)}</span>
									</span>
								)
							}
						/>
					))}
				</ul>
			</section>
		</div>
	)
}
