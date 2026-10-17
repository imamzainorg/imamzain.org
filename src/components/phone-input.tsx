"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { Check, ChevronDown, Search } from "lucide-react"
import countries from "i18n-iso-countries"
import ar from "i18n-iso-countries/langs/ar.json"
import { cn } from "@/lib/utils"
import { DEFAULT_COUNTRY, dialCode, phoneCountries, type CountryCode } from "@/lib/phone"

countries.registerLocale(ar)

const options = phoneCountries
	.map((code) => ({ code, name: countries.getName(code, "ar", { select: "official" }) ?? code, dial: dialCode(code) }))
	.filter((o) => o.name !== o.code)
	.sort((a, b) =>
		a.code === DEFAULT_COUNTRY ? -1 : b.code === DEFAULT_COUNTRY ? 1 : a.name.localeCompare(b.name, "ar"),
	)

const PANEL_WIDTH = 320

function Flag({ code }: { code: CountryCode }) {
	return (
		<Image
			src={`/flags/${code.toLowerCase()}.svg`}
			alt=""
			width={24}
			height={16}
			unoptimized
			className="h-4 w-6 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
		/>
	)
}

// One phone field: the country's flag and calling code sit inside it on the left, and tapping
// them opens a searchable list. The number is typed after them, without its code.
export default function PhoneInput({
	country,
	onCountryChange,
	value,
	onValueChange,
	onBlur,
	placeholder,
	invalid,
}: {
	country: CountryCode
	onCountryChange: (country: CountryCode) => void
	value: string
	onValueChange: (value: string) => void
	onBlur?: () => void
	placeholder?: string
	invalid?: boolean
}) {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [active, setActive] = useState(0)
	const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
	const root = useRef<HTMLDivElement>(null)
	const button = useRef<HTMLButtonElement>(null)
	const list = useRef<HTMLUListElement>(null)
	const panel = useRef<HTMLDivElement>(null)

	const shown = useMemo(() => {
		const q = query.trim().replace(/^\+/, "").toLowerCase()
		if (!q) return options
		return options.filter((o) => o.name.includes(q) || o.dial.startsWith(q) || o.code.toLowerCase() === q)
	}, [query])

	const toggle = () => {
		if (open) return setOpen(false)
		const rect = button.current?.getBoundingClientRect()
		if (!rect) return
		setPos({ top: rect.bottom + 8, left: Math.max(8, Math.min(rect.left, window.innerWidth - PANEL_WIDTH - 8)) })
		setQuery("")
		setActive(Math.max(0, options.findIndex((o) => o.code === country)))
		setOpen(true)
	}

	const choose = (code: CountryCode) => {
		onCountryChange(code)
		setOpen(false)
		button.current?.focus()
	}

	useEffect(() => {
		if (!open) return
		const close = () => setOpen(false)
		const onDown = (e: MouseEvent) => {
			if (!root.current?.contains(e.target as Node) && !list.current?.parentElement?.contains(e.target as Node)) close()
		}
		document.addEventListener("mousedown", onDown)
		window.addEventListener("resize", close)
		return () => {
			document.removeEventListener("mousedown", onDown)
			window.removeEventListener("resize", close)
		}
	}, [open])

	useEffect(() => {
		if (open) list.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" })
	}, [open, active])

	const onSearchKey = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault()
			setOpen(false)
			button.current?.focus()
		} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault()
			setActive((a) => (shown.length ? (a + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length : 0))
		} else if (e.key === "Enter") {
			e.preventDefault()
			if (shown[active]) choose(shown[active].code)
		}
	}

	return (
		<div ref={root} dir="ltr">
			<div
				className={cn(
					"flex h-14 items-center overflow-hidden rounded-xl bg-white transition-shadow focus-within:ring-2 focus-within:ring-secondary/70",
					invalid && "ring-2 ring-red-300",
				)}
			>
				<button
					ref={button}
					type="button"
					aria-label="اختيار الدولة"
					aria-haspopup="listbox"
					aria-expanded={open}
					onClick={toggle}
					className="flex h-full shrink-0 items-center gap-2 border-r border-gray-200 pl-4 pr-3 text-lg font-semibold text-gray-700 outline-none transition-colors hover:bg-gray-50 focus-visible:bg-gray-50"
				>
					<Flag code={country} />
					<span>+{dialCode(country)}</span>
					<ChevronDown aria-hidden className={cn("h-4 w-4 text-gray-400 transition-transform", open && "rotate-180")} />
				</button>
				<input
					name="visitorPhone"
					type="tel"
					inputMode="tel"
					autoComplete="tel-national"
					aria-label="رقم الهاتف"
					placeholder={placeholder}
					value={value}
					onChange={(e) => onValueChange(e.target.value)}
					onBlur={onBlur}
					className="h-full min-w-0 flex-1 bg-transparent px-4 text-lg text-gray-900 outline-none placeholder:text-gray-400"
				/>
			</div>

			{/* In a portal: the form sits inside animated and filtered wrappers, which would make
			    "fixed" mean "relative to the wrapper" and push the list far from the field. */}
			{open && pos && createPortal(
				<div
					ref={panel}
					style={{ position: "fixed", top: pos.top, left: pos.left, width: PANEL_WIDTH }}
					dir="rtl"
					className="dropdown-panel z-[70] max-w-[calc(100vw-1rem)] rounded-2xl border border-primary/10 bg-white p-2 text-gray-900 shadow-2xl shadow-primary/15"
				>
					<div className="relative mb-1">
						<Search aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input
							autoFocus
							value={query}
							onChange={(e) => {
								setQuery(e.target.value)
								setActive(0)
							}}
							onKeyDown={onSearchKey}
							placeholder="ابحث عن دولة أو رمز"
							aria-label="ابحث عن دولة"
							className="h-10 w-full rounded-xl bg-gray-100 pr-9 pl-3 text-base outline-none placeholder:text-gray-400"
						/>
					</div>
					<ul ref={list} role="listbox" aria-label="الدول" className="max-h-64 overflow-y-auto">
						{shown.map((o, i) => (
							<li
								key={o.code}
								role="option"
								aria-selected={o.code === country}
								data-active={i === active}
								onMouseEnter={() => setActive(i)}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => choose(o.code)}
								className={cn(
									"flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-base",
									i === active && "bg-primary/[0.08]",
									o.code === country ? "font-bold text-primary" : "font-medium",
								)}
							>
								<Flag code={o.code} />
								<span className="min-w-0 flex-1 truncate">{o.name}</span>
								<span dir="ltr" className="text-sm font-normal text-gray-500">
									+{o.dial}
								</span>
								{o.code === country && <Check className="h-4 w-4 shrink-0 text-secondary_dark" strokeWidth={3} />}
							</li>
						))}
						{!shown.length && <li className="px-3 py-4 text-center text-sm text-gray-500">لا توجد نتائج</li>}
					</ul>
				</div>,
				document.body,
			)}
		</div>
	)
}
