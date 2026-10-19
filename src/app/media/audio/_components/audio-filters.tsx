"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDownUp, Check, Clock, Mic2, Search, SlidersHorizontal, X } from "lucide-react"
import { TitleIcon } from "@/components/brand"
import SearchField from "@/components/search-field"
import { cn } from "@/lib/utils"
import { fold } from "../_lib/search"
import RangeSlider from "./range-slider"

export type Sort = "" | "newest" | "shortest" | "longest"
export type Filters = { query: string; speaker: string; range: [number, number]; sort: Sort }

const SORTS: { value: Sort; label: string }[] = [
	{ value: "", label: "ترتيب المكتبة" },
	{ value: "newest", label: "الأحدث إضافة" },
	{ value: "shortest", label: "الأقصر أولاً" },
	{ value: "longest", label: "الأطول أولاً" },
]

const minutes = (value: number) => (value < 60 ? `${value} د` : `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")} س`)

const chip = (on: boolean) =>
	cn(
		"rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors duration-200",
		on
			? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
			: "border-primary/15 text-gray-700 hover:border-primary/50 dark:border-Muharram_primary/15 dark:hover:border-Muharram_primary/50",
	)

function Field({ icon, label, aside, children }: { icon: React.ReactNode; label: string; aside?: React.ReactNode; children: React.ReactNode }) {
	return (
		<fieldset className="space-y-3">
			<legend className="flex w-full items-center justify-between gap-2">
				<span className="flex items-center gap-2 font-bold text-primary dark:text-Muharram_primary [&>svg]:size-4 [&>svg]:text-secondary_dark dark:[&>svg]:text-Muharram_secondary">
					{icon}
					{label}
				</span>
				{aside}
			</legend>
			{children}
		</fieldset>
	)
}

// Every filter of the library: the title search, the speakers (each with how many recordings
// they have, searchable, since there are more than sixty), a from-to length with quick picks,
// and the order. Shared by the sidebar on large screens and the sheet on phones.
function FilterFields({
	value,
	onChange,
	speakers,
	maxMinutes,
	withSearch,
}: {
	value: Filters
	onChange: (patch: Partial<Filters>) => void
	speakers: [string, number][]
	maxMinutes: number
	withSearch: boolean
}) {
	const [find, setFind] = useState("")
	const shownSpeakers = useMemo(() => {
		const words = fold(find)
		return words ? speakers.filter(([name]) => fold(name).includes(words)) : speakers
	}, [find, speakers])

	const presets: { label: string; range: [number, number] }[] = [
		{ label: "أقل من 15 د", range: [0, 15] },
		{ label: "15 إلى 45 د", range: [15, 45] },
		{ label: "أكثر من 45 د", range: [45, maxMinutes] },
	]
	const [low, high] = value.range

	return (
		<div className="space-y-7">
			{withSearch && (
				<SearchField
					value={value.query}
					onChange={(query) => onChange({ query })}
					placeholder="ابحث بالعنوان أو المحاضر"
					label="البحث في المكتبة الصوتية"
				/>
			)}

			<Field
				icon={<Mic2 />}
				label="المحاضر"
				aside={
					value.speaker && (
						<button type="button" onClick={() => onChange({ speaker: "" })} className="text-sm font-semibold text-secondary_dark hover:underline dark:text-Muharram_secondary">
							إلغاء الاختيار
						</button>
					)
				}
			>
				<div className="relative">
					<Search aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
					<input
						type="search"
						value={find}
						onChange={(event) => setFind(event.target.value)}
						placeholder={`ابحث بين ${speakers.length} محاضراً`}
						aria-label="ابحث عن محاضر"
						className="w-full rounded-xl border-2 border-primary/15 bg-white py-2.5 pl-3 pr-9 text-sm focus:border-primary focus:outline-none dark:border-Muharram_primary/15 dark:focus:border-Muharram_primary [&::-webkit-search-cancel-button]:hidden"
					/>
				</div>
				<ul className="-mx-1 max-h-60 overflow-y-auto overscroll-contain px-1" data-lenis-prevent>
					{shownSpeakers.length === 0 && <li className="py-3 text-center text-sm text-gray-500">لا يوجد محاضر بهذا الاسم</li>}
					{shownSpeakers.map(([name, count]) => {
						const on = value.speaker === name
						return (
							<li key={name}>
								<button
									type="button"
									aria-pressed={on}
									onClick={() => onChange({ speaker: on ? "" : name })}
									className={cn(
										"flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start text-sm transition-colors",
										on ? "bg-primary/10 font-bold text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary" : "text-gray-700 hover:bg-primary/5",
									)}
								>
									<span className="grid size-4 shrink-0 place-items-center">{on && <Check className="size-4" />}</span>
									<span className="min-w-0 flex-1 truncate">{name}</span>
									<span className="rounded-full bg-secondary/15 px-2 text-xs font-bold text-secondary_dark dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary">
										{count}
									</span>
								</button>
							</li>
						)
					})}
				</ul>
			</Field>

			<Field
				icon={<Clock />}
				label="المدة"
				aside={
					<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary">
						{minutes(low)} إلى {minutes(high)}
					</span>
				}
			>
				<RangeSlider
					min={0}
					max={maxMinutes}
					value={value.range}
					onChange={(range) => onChange({ range })}
					format={(v) => `${v} دقيقة`}
					label="مدة التسجيل بالدقائق"
					className="mx-1"
				/>
				<div className="flex justify-between text-xs text-gray-500">
					<span>0 د</span>
					<span>{minutes(maxMinutes)}</span>
				</div>
				<div className="flex flex-wrap gap-2">
					{presets.map((preset) => {
						const on = low === preset.range[0] && high === preset.range[1]
						return (
							<button
								key={preset.label}
								type="button"
								aria-pressed={on}
								onClick={() => onChange({ range: on ? [0, maxMinutes] : preset.range })}
								className={chip(on)}
							>
								{preset.label}
							</button>
						)
					})}
				</div>
			</Field>

			<Field icon={<ArrowDownUp />} label="الترتيب">
				<div className="grid grid-cols-2 gap-2">
					{SORTS.map((sort) => (
						<button
							key={sort.value}
							type="button"
							aria-pressed={value.sort === sort.value}
							onClick={() => onChange({ sort: sort.value })}
							className={chip(value.sort === sort.value)}
						>
							{sort.label}
						</button>
					))}
				</div>
			</Field>
		</div>
	)
}

// On large screens: a sticky panel beside the list, in the off-white of the site's information
// panels with their gold offset outline. On phones: a "الفلاتر" button above the list that
// slides the same fields up in a sheet.
export default function AudioFilters({
	value,
	onChange,
	onReset,
	speakers,
	maxMinutes,
	activeCount,
	resultCount,
}: {
	value: Filters
	onChange: (patch: Partial<Filters>) => void
	onReset: () => void
	speakers: [string, number][]
	maxMinutes: number
	activeCount: number
	resultCount: string
}) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (!open) return
		const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
		window.addEventListener("keydown", close)
		const overflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			window.removeEventListener("keydown", close)
			document.body.style.overflow = overflow
		}
	}, [open])

	return (
		<>
			<aside
				aria-label="تصفية التسجيلات"
				className="sticky top-36 hidden max-h-[calc(100vh-10.5rem)] self-start overflow-y-auto overscroll-contain rounded-[32px] border border-primary/10 bg-white/80 p-6 shadow-lg shadow-primary/5 outline outline-2 outline-offset-[6px] outline-secondary/50 dark:border-Muharram_primary/10 dark:outline-Muharram_secondary/50 lg:block"
				data-lenis-prevent
			>
				<div className="mb-6 flex items-center justify-between gap-2">
					<h2 className="flex items-center gap-2 text-xl font-extrabold text-primary dark:text-Muharram_primary">
						<TitleIcon className="w-3" />
						تصفية التسجيلات
					</h2>
					{activeCount > 0 && (
						<button type="button" onClick={onReset} className="text-sm font-semibold text-secondary_dark hover:underline dark:text-Muharram_secondary">
							إعادة الضبط
						</button>
					)}
				</div>
				<FilterFields value={value} onChange={onChange} speakers={speakers} maxMinutes={maxMinutes} withSearch />
			</aside>

			<div className="flex gap-3 lg:hidden">
				<SearchField
					className="min-w-0 flex-1"
					value={value.query}
					onChange={(query) => onChange({ query })}
					placeholder="ابحث"
					label="البحث في المكتبة الصوتية"
				/>
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="relative flex shrink-0 items-center gap-2 rounded-xl border-2 border-primary bg-primary px-4 font-semibold text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
				>
					<SlidersHorizontal className="size-5" />
					الفلاتر
					{activeCount > 0 && (
						<span className="absolute -left-2 -top-2 grid size-6 place-items-center rounded-full bg-secondary text-xs font-bold text-white ring-2 ring-white dark:bg-Muharram_secondary">
							{activeCount}
						</span>
					)}
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<div className="fixed inset-0 z-[60] lg:hidden">
						<motion.div
							aria-hidden
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setOpen(false)}
							className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
						/>
						<motion.div
							role="dialog"
							aria-modal="true"
							aria-label="تصفية التسجيلات"
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 32 }}
							className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[32px] bg-[#fbfaf7] shadow-2xl"
						>
							<div className="flex items-center justify-between border-b border-primary/10 px-6 pb-4 pt-5">
								<span aria-hidden className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-gray-300" />
								<h2 className="flex items-center gap-2 text-lg font-extrabold text-primary dark:text-Muharram_primary">
									<TitleIcon className="w-3" />
									تصفية التسجيلات
								</h2>
								<button type="button" aria-label="إغلاق" onClick={() => setOpen(false)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
									<X className="size-5" />
								</button>
							</div>
							<div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6" data-lenis-prevent>
								<FilterFields value={value} onChange={onChange} speakers={speakers} maxMinutes={maxMinutes} withSearch={false} />
							</div>
							<div className="flex gap-3 border-t border-primary/10 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
								<button
									type="button"
									onClick={() => setOpen(false)}
									className="flex-1 rounded-xl border-2 border-primary bg-primary py-3 font-bold text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
								>
									عرض {resultCount}
								</button>
								{activeCount > 0 && (
									<button
										type="button"
										onClick={onReset}
										className="rounded-xl border-2 border-primary px-4 py-3 font-bold text-primary dark:border-Muharram_primary dark:text-Muharram_primary"
									>
										إعادة الضبط
									</button>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	)
}
