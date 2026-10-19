"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowDownUp, Mic2, Search as SearchIcon } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { outlineButton } from "@/components/brand"
import Breadcrumbs from "@/components/breadcrumb"
import Dropdown from "@/components/dropdown"
import FilterChips from "@/components/filter-chips"
import PageHeader from "@/components/page-header"
import Pagination from "@/components/pagination"
import SearchField from "@/components/search-field"
import { useListeningMemory } from "../_lib/listening-memory"
import { fold, recordingsText } from "../_lib/search"
import { useAudioPlayer } from "../_lib/use-audio-player"
import AudioRow from "./audio-row"
import ContinueListening from "./continue-listening"
import NowPlayingBar from "./now-playing-bar"

const PER_PAGE = 12

type Length = "all" | "short" | "medium" | "long"
type Sort = "" | "newest" | "shortest" | "longest"

const LENGTHS: { key: Length; label: string; test: (minutes: number) => boolean }[] = [
	{ key: "all", label: "كل المدد", test: () => true },
	{ key: "short", label: "أقل من 15 دقيقة", test: (m) => m < 15 },
	{ key: "medium", label: "من 15 إلى 45 دقيقة", test: (m) => m >= 15 && m <= 45 },
	{ key: "long", label: "أكثر من 45 دقيقة", test: (m) => m > 45 },
]

const SORTS: { value: Sort; label: string }[] = [
	{ value: "", label: "ترتيب المكتبة" },
	{ value: "newest", label: "الأحدث إضافة" },
	{ value: "shortest", label: "الأقصر أولاً" },
	{ value: "longest", label: "الأطول أولاً" },
]

const minutesOf = (item: AudioItemLight) => (item.durationSeconds ?? 0) / 60

export default function AudioLibrary({ items }: { items: AudioItemLight[] }) {
	const player = useAudioPlayer()
	const memory = useListeningMemory()
	const listTop = useRef<HTMLDivElement>(null)

	const [query, setQuery] = useState("")
	const [speaker, setSpeaker] = useState("")
	const [length, setLength] = useState<Length>("all")
	const [sort, setSort] = useState<Sort>("")
	const [page, setPage] = useState(1)
	const [highlight, setHighlight] = useState<number | null>(null)

	const speakers = useMemo(() => {
		const counts = new Map<string, number>()
		for (const item of items) if (item.speaker) counts.set(item.speaker, (counts.get(item.speaker) ?? 0) + 1)
		return [...counts].sort(([a], [b]) => a.localeCompare(b, "ar"))
	}, [items])

	const hours = useMemo(() => Math.round(items.reduce((sum, item) => sum + (item.durationSeconds ?? 0), 0) / 3600), [items])

	const filtered = useMemo(() => {
		const words = fold(query).split(/\s+/).filter(Boolean)
		const lengthTest = LENGTHS.find((option) => option.key === length)!.test
		const result = items.filter((item) => {
			if (speaker && item.speaker !== speaker) return false
			if (!lengthTest(minutesOf(item))) return false
			if (!words.length) return true
			const haystack = fold(`${item.title} ${item.speaker}`)
			return words.every((word) => haystack.includes(word))
		})
		if (sort === "newest") return [...result].sort((a, b) => b.id - a.id)
		if (sort === "shortest") return [...result].sort((a, b) => minutesOf(a) - minutesOf(b))
		if (sort === "longest") return [...result].sort((a, b) => minutesOf(b) - minutesOf(a))
		return result
	}, [items, query, speaker, length, sort])

	const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
	const currentPage = Math.min(page, totalPages)
	const shown = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
	const filtering = Boolean(query || speaker || length !== "all" || sort)

	// Every change to what is listed starts again from its first page.
	const narrow = useCallback(<T,>(set: (value: T) => void) => (value: T) => {
		set(value)
		setPage(1)
	}, [])

	const reset = useCallback(() => {
		setQuery("")
		setSpeaker("")
		setLength("all")
		setSort("")
		setPage(1)
	}, [])

	const scrollToList = () => listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" })

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

	// Scroll once the highlighted card has rendered, and let the ring fade after a while.
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

	// A shared link (?id=) opens on its recording. It does not start playing by itself: browsers
	// block sound until the visitor presses something, and a surprise lecture is unwelcome anyway.
	const sharedId = Number(useSearchParams().get("id"))
	const [handledShare, setHandledShare] = useState<number | null>(null)
	if (sharedId && handledShare !== sharedId && items.some((item) => item.id === sharedId)) {
		setHandledShare(sharedId)
		setPage(Math.floor(items.findIndex((item) => item.id === sharedId) / PER_PAGE) + 1)
		setHighlight(sharedId)
	}

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

	return (
		<div className="container pb-16">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الوسائط", url: "#" },
					{ name: "المكتبة الصوتية", url: "#" },
				]}
			/>

			<PageHeader
				className="mb-14"
				title="المكتبة الصوتية"
				text={`${recordingsText(items.length)} لـ ${speakers.length} محاضراً، نحو ${hours} ساعة من المحاضرات والدروس في سيرة الإمام زين العابدين عليه السلام وأدعيته ورسالة الحقوق، تستمع إليها هنا أو تحمّلها مجاناً.`}
			/>

			<ContinueListening items={resumable} positions={memory.positions} onResume={player.play} />

			<div ref={listTop} className="scroll-mt-36">
				<div className="flex flex-col gap-3 lg:flex-row">
					<SearchField
						className="lg:flex-1"
						value={query}
						onChange={narrow(setQuery)}
						placeholder="ابحث بعنوان المحاضرة أو اسم المحاضر"
						label="البحث في المكتبة الصوتية"
					/>
					<div className="grid gap-3 sm:grid-cols-2 lg:flex">
						<Dropdown
							className="lg:w-72"
							label="المحاضر"
							icon={<Mic2 />}
							value={speaker}
							onChange={narrow(setSpeaker)}
							options={[
								{ value: "", label: "كل المحاضرين" },
								...speakers.map(([name, count]) => ({ value: name, label: `${name} (${count})` })),
							]}
						/>
						<Dropdown
							className="lg:w-56"
							label="الترتيب"
							icon={<ArrowDownUp />}
							value={sort}
							onChange={narrow((value: string) => setSort(value as Sort))}
							options={SORTS}
						/>
					</div>
				</div>

				<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
					<FilterChips
						label="مدة التسجيل"
						options={LENGTHS.map(({ key, label }) => ({ key, label }))}
						value={length}
						onChange={narrow(setLength)}
					/>
					<p className="flex items-center gap-3 font-semibold text-gray-600">
						{filtered.length > 0 && recordingsText(filtered.length)}
						{filtering && (
							<button
								type="button"
								onClick={reset}
								className="text-primary underline-offset-4 hover:underline dark:text-Muharram_primary"
							>
								إعادة الضبط
							</button>
						)}
					</p>
				</div>
			</div>

			<div className="mt-10">
				{shown.length === 0 ? (
					<div className="flex flex-col items-center py-20 text-center">
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
					<ul className="grid items-start gap-5 lg:grid-cols-2">
						{shown.map((item) => (
							<li key={item.id} className="min-w-0">
								<AudioRow
									item={item}
									player={item.id === activeId ? state : null}
									resumeAt={memory.positions[item.id] ?? 0}
									finished={finished.has(item.id)}
									highlighted={highlight === item.id}
									onToggle={player.toggle}
									onSeek={player.seek}
									onRetry={player.retry}
									onSpeaker={showSpeaker}
								/>
							</li>
						))}
					</ul>
				)}
			</div>

			<Pagination
				className="mt-14"
				page={currentPage}
				totalPages={totalPages}
				onPageChange={(next) => {
					setPage(next)
					scrollToList()
				}}
			/>

			<NowPlayingBar player={player} onLocate={() => activeId !== null && reveal(activeId)} />
		</div>
	)
}
