"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowDownUp, Clock, Mic2, Search as SearchIcon } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { outlineButton } from "@/components/brand"
import Breadcrumbs from "@/components/breadcrumb"
import { FilterPanel, FilterSelect } from "@/components/filter-panel"
import Pagination from "@/components/pagination"
import SearchField from "@/components/search-field"
import { useListeningMemory } from "../_lib/listening-memory"
import { fold, recordingsText } from "../_lib/search"
import { useAudioPlayer } from "../_lib/use-audio-player"
import AudioCard from "./audio-card"
import AudioHero from "./audio-hero"
import NowPlayingBar from "./now-playing-bar"

const PER_PAGE = 10

const minutesOf = (item: AudioItemLight) => (item.durationSeconds ?? 0) / 60

const LENGTHS: Record<string, (minutes: number) => boolean> = {
	"أقل من 15 دقيقة": (m) => m < 15,
	"من 15 إلى 45 دقيقة": (m) => m >= 15 && m <= 45,
	"أكثر من 45 دقيقة": (m) => m > 45,
}

const SORTS: Record<string, (a: AudioItemLight, b: AudioItemLight) => number> = {
	"الأحدث إضافة": (a, b) => b.id - a.id,
	"الأقصر أولاً": (a, b) => minutesOf(a) - minutesOf(b),
	"الأطول أولاً": (a, b) => minutesOf(b) - minutesOf(a),
}

export default function AudioLibrary({ items }: { items: AudioItemLight[] }) {
	const player = useAudioPlayer()
	const memory = useListeningMemory()
	const listTop = useRef<HTMLDivElement>(null)

	const [query, setQuery] = useState("")
	const [speaker, setSpeaker] = useState("")
	const [length, setLength] = useState("")
	const [sort, setSort] = useState("")
	const [page, setPage] = useState(1)
	const [highlight, setHighlight] = useState<number | null>(null)

	const speakers = useMemo(
		() => [...new Set(items.map((item) => item.speaker).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ar")),
		[items],
	)
	const hours = useMemo(() => Math.round(items.reduce((sum, item) => sum + (item.durationSeconds ?? 0), 0) / 3600), [items])

	const filtered = useMemo(() => {
		const words = fold(query).split(/\s+/).filter(Boolean)
		const result = items.filter((item) => {
			if (speaker && item.speaker !== speaker) return false
			if (length && !LENGTHS[length](minutesOf(item))) return false
			if (!words.length) return true
			const haystack = fold(`${item.title} ${item.speaker}`)
			return words.every((word) => haystack.includes(word))
		})
		return sort ? [...result].sort(SORTS[sort]) : result
	}, [items, query, speaker, length, sort])

	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
	const currentPage = Math.min(page, totalPages)
	const shown = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

	// Every change to what is listed starts again from its first page.
	const narrow = useCallback(<T,>(set: (value: T) => void) => (value: T) => {
		set(value)
		setPage(1)
	}, [])

	const reset = useCallback(() => {
		setQuery("")
		setSpeaker("")
		setLength("")
		setSort("")
		setPage(1)
	}, [])

	const showSpeaker = useCallback((name: string) => {
		setSpeaker(name)
		setQuery("")
		setPage(1)
		listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}, [])

	// Bring a recording into view: its page in the current list, or in the whole library when the
	// filters hide it. The card then scrolls to the middle of the screen.
	const reveal = useCallback(
		(id: number) => {
			let index = filtered.findIndex((item) => item.id === id)
			if (index < 0) {
				reset()
				index = items.findIndex((item) => item.id === id)
			}
			if (index < 0) return
			setPage(Math.floor(index / PER_PAGE) + 1)
			setHighlight(id)
		},
		[filtered, items, reset],
	)

	// Scroll the highlighted card into view once it has rendered, and let its outline fade later.
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

	// A shared link (?id=) opens the list on its recording. It does not start by itself: browsers
	// block sound until the visitor presses something.
	const sharedId = Number(useSearchParams().get("id"))
	const [handledShare, setHandledShare] = useState<number | null>(null)
	if (sharedId && handledShare !== sharedId) {
		setHandledShare(sharedId)
		const index = items.findIndex((item) => item.id === sharedId)
		if (index >= 0) {
			setPage(Math.floor(index / PER_PAGE) + 1)
			setHighlight(sharedId)
		}
	}

	const { state } = player
	const activeId = state.item?.id ?? null
	const latest = useMemo(() => [...items].sort((a, b) => b.id - a.id).slice(0, 4), [items])
	const resumable = useMemo(
		() =>
			memory.recent
				.map((id) => items.find((item) => item.id === id))
				.filter((item): item is AudioItemLight => Boolean(item))
				.slice(0, 4),
		[memory.recent, items],
	)
	const finished = useMemo(() => new Set(memory.finished), [memory.finished])

	// Press a card's waveform: seek if it is the loaded recording, else start it from there.
	const seekItem = useCallback(
		(item: AudioItemLight, seconds: number) => (item.id === activeId ? player.seek(seconds) : player.play(item, seconds)),
		[activeId, player],
	)

	return (
		<div className="container pb-16">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الوسائط", url: "#" },
					{ name: "المكتبة الصوتية", url: "#" },
				]}
			/>

			<AudioHero
				counts={{ recordings: items.length, speakers: speakers.length, hours }}
				latest={latest}
				resumable={resumable}
				positions={memory.positions}
				activeId={activeId}
				player={state}
				onToggle={player.toggle}
			/>

			<div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-10 xl:grid-cols-[20rem_1fr]">
				<FilterPanel onReset={reset} raised={activeId !== null}>
					<FilterSelect
						instanceId="audio-speaker"
						icon={<Mic2 className="size-4" />}
						label="المحاضر"
						placeholder="كل المحاضرين"
						options={speakers}
						value={speaker}
						onChange={narrow(setSpeaker)}
					/>
					<FilterSelect
						instanceId="audio-length"
						icon={<Clock className="size-4" />}
						label="المدة"
						placeholder="كل المدد"
						options={Object.keys(LENGTHS)}
						value={length}
						onChange={narrow(setLength)}
					/>
					<FilterSelect
						instanceId="audio-sort"
						icon={<ArrowDownUp className="size-4" />}
						label="الترتيب"
						placeholder="ترتيب المكتبة"
						options={Object.keys(SORTS)}
						value={sort}
						onChange={narrow(setSort)}
					/>
				</FilterPanel>

				<div ref={listTop} className="min-w-0 scroll-mt-36">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<SearchField
							className="sm:w-2/3"
							value={query}
							onChange={narrow(setQuery)}
							placeholder="ابحث بعنوان المحاضرة أو اسم المحاضر"
							label="البحث في المكتبة الصوتية"
						/>
						<p className="font-semibold text-gray-600">{recordingsText(filtered.length)}</p>
					</div>

					<div className="mt-8">
						{shown.length === 0 ? (
							<div className="flex flex-col items-center py-16 text-center">
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
							<ul className="space-y-5">
								{shown.map((item) => (
									<li key={item.id}>
										<AudioCard
											item={item}
											player={item.id === activeId ? state : null}
											resumeAt={memory.positions[item.id] ?? 0}
											finished={finished.has(item.id)}
											highlighted={highlight === item.id}
											onToggle={player.toggle}
											onSeek={seekItem}
											onRetry={player.retry}
											onSpeaker={showSpeaker}
										/>
									</li>
								))}
							</ul>
						)}
					</div>

					<Pagination
						className="mt-12"
						page={currentPage}
						totalPages={totalPages}
						onPageChange={(next) => {
							setPage(next)
							listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })
						}}
					/>
				</div>
			</div>

			<NowPlayingBar player={player} onLocate={() => activeId !== null && reveal(activeId)} />
		</div>
	)
}
