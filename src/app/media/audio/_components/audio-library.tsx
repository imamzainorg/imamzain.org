"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search as SearchIcon, X } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { outlineButton, SectionTitle } from "@/components/brand"
import Breadcrumbs from "@/components/breadcrumb"
import Pagination from "@/components/pagination"
import { arabicNumber } from "@/lib/format"
import { useListeningMemory } from "../_lib/listening-memory"
import { fold, recordingsText } from "../_lib/search"
import { useAudioPlayer } from "../_lib/use-audio-player"
import AudioCard from "./audio-card"
import AudioFilters, { type Filters } from "./audio-filters"
import ContinueListening from "./continue-listening"
import NowPlayingBar from "./now-playing-bar"
import PlayerStage from "./player-stage"

const PER_PAGE = 12

const minutesOf = (item: AudioItemLight) => (item.durationSeconds ?? 0) / 60

const SORT_LABELS = { newest: "الأحدث إضافة", shortest: "الأقصر أولاً", longest: "الأطول أولاً" }

export default function AudioLibrary({ items }: { items: AudioItemLight[] }) {
	const player = useAudioPlayer()
	const memory = useListeningMemory()
	const listTop = useRef<HTMLDivElement>(null)
	const stageRef = useRef<HTMLDivElement>(null)

	const maxMinutes = useMemo(() => Math.ceil(Math.max(...items.map(minutesOf), 1)), [items])
	const initial: Filters = useMemo(() => ({ query: "", speaker: "", range: [0, maxMinutes], sort: "" }), [maxMinutes])
	const [filters, setFilters] = useState<Filters>(initial)
	const [page, setPage] = useState(1)
	const [highlight, setHighlight] = useState<number | null>(null)
	const [cued, setCued] = useState<AudioItemLight | null>(null)
	const [stageInView, setStageInView] = useState(true)

	const speakers = useMemo(() => {
		const counts = new Map<string, number>()
		for (const item of items) if (item.speaker) counts.set(item.speaker, (counts.get(item.speaker) ?? 0) + 1)
		return [...counts].sort(([a], [b]) => a.localeCompare(b, "ar"))
	}, [items])
	const hours = useMemo(() => Math.round(items.reduce((sum, item) => sum + (item.durationSeconds ?? 0), 0) / 3600), [items])

	const filtered = useMemo(() => {
		const words = fold(filters.query).split(/\s+/).filter(Boolean)
		const [low, high] = filters.range
		const result = items.filter((item) => {
			if (filters.speaker && item.speaker !== filters.speaker) return false
			const length = minutesOf(item)
			if (length < low || length > high) return false
			if (!words.length) return true
			const haystack = fold(`${item.title} ${item.speaker}`)
			return words.every((word) => haystack.includes(word))
		})
		if (filters.sort === "newest") return [...result].sort((a, b) => b.id - a.id)
		if (filters.sort === "shortest") return [...result].sort((a, b) => minutesOf(a) - minutesOf(b))
		if (filters.sort === "longest") return [...result].sort((a, b) => minutesOf(b) - minutesOf(a))
		return result
	}, [items, filters])

	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
	const currentPage = Math.min(page, totalPages)
	const firstIndex = (currentPage - 1) * PER_PAGE
	const shown = filtered.slice(firstIndex, firstIndex + PER_PAGE)

	const fullRange = filters.range[0] === 0 && filters.range[1] === maxMinutes
	const activeCount = [filters.query, filters.speaker, !fullRange, filters.sort].filter(Boolean).length

	// Every change to what is listed starts again from its first page.
	const change = useCallback((patch: Partial<Filters>) => {
		setFilters((current) => ({ ...current, ...patch }))
		setPage(1)
	}, [])
	const reset = useCallback(() => {
		setFilters(initial)
		setPage(1)
	}, [initial])

	const scrollToList = () => listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })

	const showSpeaker = useCallback((speaker: string) => {
		setFilters((current) => ({ ...current, speaker, query: "" }))
		setPage(1)
		listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}, [])

	// Scroll a highlighted card into view once it has rendered, and let its outline fade later.
	useEffect(() => {
		if (highlight === null) return
		let tries = 0
		const find = setInterval(() => {
			const card = document.getElementById(`audio-${highlight}`)
			if (card && card.getBoundingClientRect().height > 0) {
				card.scrollIntoView({ behavior: "smooth", block: "center" })
				clearInterval(find)
			} else if (++tries > 40) clearInterval(find)
		}, 100)
		const fade = setTimeout(() => setHighlight(null), 8000)
		return () => {
			clearInterval(find)
			clearTimeout(fade)
		}
	}, [highlight])

	// A shared link (?id=) puts its recording on the stage and opens the list on it. It does not
	// start by itself: browsers block sound until the visitor presses something.
	const sharedId = Number(useSearchParams().get("id"))
	const [handledShare, setHandledShare] = useState<number | null>(null)
	if (sharedId && handledShare !== sharedId) {
		const index = items.findIndex((item) => item.id === sharedId)
		setHandledShare(sharedId)
		if (index >= 0) {
			setCued(items[index])
			setPage(Math.floor(index / PER_PAGE) + 1)
			setHighlight(sharedId)
		}
	}

	// The small player at the foot of the screen only stands in while the stage is out of sight.
	useEffect(() => {
		const stage = stageRef.current
		if (!stage) return
		const observer = new IntersectionObserver(([entry]) => setStageInView(entry.isIntersecting), { threshold: 0.25 })
		observer.observe(stage)
		return () => observer.disconnect()
	}, [])

	const { state } = player
	const activeId = state.item?.id ?? null
	const resumable = useMemo(
		() =>
			memory.recent
				.filter((id) => id !== activeId)
				.map((id) => items.find((item) => item.id === id))
				.filter((item): item is AudioItemLight => Boolean(item))
				.slice(0, 3),
		[memory.recent, activeId, items],
	)
	const finished = useMemo(() => new Set(memory.finished), [memory.finished])
	const stageItem = state.item ?? cued ?? resumable[0] ?? items[0]

	const progress = state.duration ? state.time / state.duration : 0

	const activeChips = [
		filters.query && { label: `«${filters.query}»`, clear: () => change({ query: "" }) },
		filters.speaker && { label: filters.speaker, clear: () => change({ speaker: "" }) },
		!fullRange && { label: `${filters.range[0]} إلى ${filters.range[1]} دقيقة`, clear: () => change({ range: [0, maxMinutes] }) },
		filters.sort && { label: SORT_LABELS[filters.sort], clear: () => change({ sort: "" }) },
	].filter(Boolean) as { label: string; clear: () => void }[]

	const stats = [
		{ value: items.length, label: "تسجيلاً" },
		{ value: speakers.length, label: "محاضراً" },
		{ value: hours, label: "ساعة استماع" },
	]

	return (
		<>
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "الوسائط", url: "#" },
						{ name: "المكتبة الصوتية", url: "#" },
					]}
				/>
			</div>

			{/* The dark band of the site's feature sections, with the player hanging below its edge. */}
			<section className="relative isolate mt-6 overflow-hidden pb-16 pt-14 md:pt-20">
				<div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[86%] bg-[#101c1a] dark:bg-[#171314]">
					<div className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04]" />
				</div>

				{/* Phones: title, player, then "continue listening". Large screens: the player beside both. */}
				<div className="container grid items-center gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
					<div className={`min-w-0 space-y-8 text-white lg:col-start-1 lg:row-start-1 ${resumable.length ? "lg:self-end" : "lg:row-span-2"}`}>
						<SectionTitle
							light
							as="h1"
							title="المكتبة الصوتية"
							text="محاضرات ودروس في سيرة الإمام زين العابدين عليه السلام وأدعيته ورسالة الحقوق، تستمع إليها هنا أو تحمّلها مجاناً."
							className="mb-0"
						/>
						<dl className="grid max-w-xl grid-cols-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
							{stats.map((stat, i) => (
								<div key={stat.label} className={`flex flex-col-reverse items-center px-2 py-4 text-center sm:px-3 sm:py-5 ${i ? "border-r border-white/10" : ""}`}>
									<dt className="mt-1 text-xs text-white/65 sm:text-sm">{stat.label}</dt>
									<dd className="text-2xl font-extrabold text-secondary dark:text-Muharram_secondary sm:text-3xl md:text-4xl">{arabicNumber(stat.value)}</dd>
								</div>
							))}
						</dl>
					</div>

					<div ref={stageRef} className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
						<PlayerStage
							item={stageItem}
							player={player}
							resumeAt={memory.positions[stageItem.id] ?? 0}
							onSpeaker={showSpeaker}
						/>
					</div>

					{resumable.length > 0 && (
						<div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
							<ContinueListening items={resumable} positions={memory.positions} onResume={player.play} />
						</div>
					)}
				</div>
			</section>

			<section aria-label="التسجيلات" className="container pb-16">
				<div className="grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-12 xl:grid-cols-[21rem_1fr]">
					<AudioFilters
						value={filters}
						onChange={change}
						onReset={reset}
						speakers={speakers}
						maxMinutes={maxMinutes}
						activeCount={activeCount}
						resultCount={recordingsText(filtered.length)}
					/>

					<div ref={listTop} className="min-w-0 scroll-mt-36">
						<div className="mb-5 flex flex-wrap items-center gap-2">
							<p className="me-2 text-lg font-bold text-gray-800">
								{filtered.length ? recordingsText(filtered.length) : "لا توجد تسجيلات"}
							</p>
							{activeChips.map((chip) => (
								<button
									key={chip.label}
									type="button"
									onClick={chip.clear}
									aria-label={`إزالة: ${chip.label}`}
									className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 py-1 pe-2 ps-3 text-sm font-semibold text-secondary_dark transition-colors hover:border-secondary dark:border-Muharram_secondary/40 dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary"
								>
									<span className="truncate">{chip.label}</span>
									<X aria-hidden className="size-3.5 shrink-0" />
								</button>
							))}
						</div>

						{shown.length === 0 ? (
							<div className="flex flex-col items-center rounded-[32px] border-2 border-dashed border-primary/15 py-16 text-center">
								<SearchIcon size={48} strokeWidth={1} className="text-secondary" />
								<h3 className="mt-4 text-2xl font-bold text-gray-800">لا توجد نتائج</h3>
								<p className="mt-2 max-w-md text-lg leading-loose text-gray-600">
									لم نجد تسجيلاً يطابق البحث والفلاتر المختارة. جرّب كلمة أخرى أو أعد ضبط الفلاتر.
								</p>
								<button type="button" onClick={reset} className={`${outlineButton} mt-6`}>
									إعادة الضبط
								</button>
							</div>
						) : (
							<ul className="space-y-4">
								{shown.map((item, i) => (
									<li key={item.id}>
										<AudioCard
											item={item}
											index={firstIndex + i + 1}
											status={item.id === activeId ? state.status : null}
											progress={item.id === activeId ? progress : 0}
											resumeAt={memory.positions[item.id] ?? 0}
											finished={finished.has(item.id)}
											highlighted={highlight === item.id}
											onPlay={player.toggle}
											onSpeaker={showSpeaker}
										/>
									</li>
								))}
							</ul>
						)}

						<Pagination
							className="mt-12"
							page={currentPage}
							totalPages={totalPages}
							onPageChange={(next) => {
								setPage(next)
								scrollToList()
							}}
						/>
					</div>
				</div>
			</section>

			<NowPlayingBar
				player={player}
				show={!stageInView}
				onLocate={() => stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
			/>
		</>
	)
}
