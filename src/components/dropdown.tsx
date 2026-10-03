"use client"

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type DropdownOption = { value: string; label: string }

type Variant = "light" | "dark" | "glass"

const triggerStyles: Record<Variant, string> = {
	// On the white canvas.
	light:
		"border-primary/25 bg-white text-gray-900 hover:border-primary data-[open=true]:border-primary dark:border-Muharram_primary/25 dark:hover:border-Muharram_primary dark:data-[open=true]:border-Muharram_primary",
	// On the dark bands.
	dark: "border-white/20 bg-white/5 text-white hover:border-white/60 data-[open=true]:border-secondary dark:data-[open=true]:border-Muharram_secondary",
	// On the green footer and header.
	glass:
		"border-white/25 bg-white/10 text-white hover:border-white hover:bg-white hover:text-primary data-[open=true]:border-white data-[open=true]:bg-white data-[open=true]:text-primary",
}

const iconStyles: Record<Variant, string> = {
	light: "text-secondary_dark dark:text-Muharram_secondary",
	dark: "text-secondary dark:text-Muharram_secondary",
	glass: "",
}

const PANEL_MAX = 288

// The site's one dropdown: a rounded trigger in the same 2px outline as the fields, and a
// floating panel with a check on the chosen option. It flips upward near the bottom of the
// screen, never leaves the viewport, and works with the keyboard (arrows, Enter, Esc).
export default function Dropdown({
	value,
	onChange,
	options,
	label,
	placeholder,
	icon,
	variant = "light",
	compact,
	className,
}: {
	value: string
	onChange: (value: string) => void
	options: DropdownOption[]
	// The accessible name (and the text shown when nothing is chosen and there is no placeholder).
	label: string
	placeholder?: string
	icon?: ReactNode
	variant?: Variant
	compact?: boolean
	className?: string
}) {
	const id = useId()
	const [open, setOpen] = useState(false)
	const [active, setActive] = useState(-1)
	const [pos, setPos] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null)
	const root = useRef<HTMLDivElement>(null)
	const button = useRef<HTMLButtonElement>(null)
	const panel = useRef<HTMLUListElement>(null)

	const selected = options.find((o) => o.value === value)

	const close = useCallback(() => setOpen(false), [])

	const place = useCallback(() => {
		const rect = button.current?.getBoundingClientRect()
		if (!rect) return
		const below = window.innerHeight - rect.bottom
		const height = Math.min(PANEL_MAX, options.length * 44 + 16)
		const up = below < height + 16 && rect.top > below
		const minWidth = Math.max(rect.width, 176)
		const left = Math.min(Math.max(8, rect.left), window.innerWidth - minWidth - 8)
		setPos(
			up
				? { bottom: window.innerHeight - rect.top + 8, left, width: minWidth }
				: { top: rect.bottom + 8, left, width: minWidth },
		)
	}, [options.length])

	useLayoutEffect(() => {
		if (open) place()
	}, [open, place])

	useEffect(() => {
		if (!open) return
		const onDown = (e: MouseEvent) => {
			if (!root.current?.contains(e.target as Node)) close()
		}
		const onScroll = (e: Event) => {
			if (!panel.current?.contains(e.target as Node)) close()
		}
		document.addEventListener("mousedown", onDown)
		window.addEventListener("scroll", onScroll, true)
		window.addEventListener("resize", close)
		return () => {
			document.removeEventListener("mousedown", onDown)
			window.removeEventListener("scroll", onScroll, true)
			window.removeEventListener("resize", close)
		}
	}, [open, close])

	useEffect(() => {
		if (open) panel.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" })
	}, [open, active])

	const openPanel = () => {
		setActive(Math.max(options.findIndex((o) => o.value === value), 0))
		setOpen(true)
	}

	const choose = (i: number) => {
		const option = options[i]
		if (option) onChange(option.value)
		close()
		button.current?.focus()
	}

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (!open) {
			if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
				e.preventDefault()
				openPanel()
			}
			return
		}
		if (e.key === "Escape") {
			e.preventDefault()
			close()
		} else if (e.key === "ArrowDown") {
			e.preventDefault()
			setActive((a) => (a + 1) % options.length)
		} else if (e.key === "ArrowUp") {
			e.preventDefault()
			setActive((a) => (a - 1 + options.length) % options.length)
		} else if (e.key === "Home" || e.key === "End") {
			e.preventDefault()
			setActive(e.key === "Home" ? 0 : options.length - 1)
		} else if (e.key === "Enter" || e.key === " ") {
			e.preventDefault()
			choose(active)
		} else if (e.key === "Tab") {
			close()
		}
	}

	return (
		<div ref={root} className={cn("relative", className)} onKeyDown={onKeyDown}>
			<button
				ref={button}
				type="button"
				role="combobox"
				aria-label={label}
				aria-expanded={open}
				aria-haspopup="listbox"
				aria-controls={`${id}-list`}
				data-open={open}
				onClick={() => (open ? close() : openPanel())}
				className={cn(
					"flex w-full items-center gap-2.5 rounded-xl border-2 font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-secondary/60",
					compact ? "h-9 px-3 text-sm" : "h-12 px-4 text-base",
					triggerStyles[variant],
				)}
			>
				{icon && <span className={cn("shrink-0 [&>svg]:size-[1.15em]", iconStyles[variant])}>{icon}</span>}
				<span className="min-w-0 flex-1 truncate text-start" suppressHydrationWarning>
					{selected?.label ?? placeholder ?? label}
				</span>
				<ChevronDown
					aria-hidden
					className={cn("size-4 shrink-0 transition-transform duration-300", open && "rotate-180")}
				/>
			</button>

			{open && pos && (
				<ul
					ref={panel}
					id={`${id}-list`}
					role="listbox"
					aria-label={label}
					style={{ position: "fixed", top: pos.top, bottom: pos.bottom, left: pos.left, minWidth: pos.width, maxHeight: PANEL_MAX }}
					className="dropdown-panel z-[70] overflow-y-auto rounded-2xl border border-primary/10 bg-white p-1.5 text-gray-900 shadow-2xl shadow-primary/15 dark:border-white/10 dark:bg-[#1d1a1b] dark:text-white"
				>
					{options.map((option, i) => {
						const isSelected = option.value === value
						return (
							<li
								key={option.value}
								role="option"
								aria-selected={isSelected}
								data-active={i === active}
								onMouseEnter={() => setActive(i)}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => choose(i)}
								className={cn(
									"flex cursor-pointer items-center justify-between gap-6 rounded-xl px-3.5 py-2.5 text-base transition-colors",
									i === active && "bg-primary/[0.08] dark:bg-white/10",
									isSelected ? "font-bold text-primary dark:text-white" : "font-medium",
								)}
							>
								<span className="truncate">{option.label}</span>
								{isSelected && (
									<Check className="size-4 shrink-0 text-secondary_dark dark:text-Muharram_secondary" strokeWidth={3} />
								)}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
