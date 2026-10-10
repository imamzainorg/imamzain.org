"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { TitleIcon } from "@/components/brand"
import { cn } from "@/lib/utils"
import {
	activeSubHref,
	isLinkActive,
	navLinks,
	type NavLink,
} from "@/layouts/header/nav-data"

// Moving the pointer from one trigger to the next should feel instant, but a pointer that only
// grazes the bar on its way elsewhere should not open anything.
const OPEN_DELAY = 90
const CLOSE_DELAY = 160

// The desktop navigation. Items with sub links open one shared mega panel under the bar: a lead
// panel on the start side and a grid of icon cards beside it. One panel for all items means the
// content swaps in place while the pointer travels along the bar, with no gap to fall through.
export function DesktopNav() {
	const path = usePathname()
	// Remember the path the menu was opened on, so it closes by itself when the route changes.
	const [state, setState] = useState<{ index: number | null; path: string }>({
		index: null,
		path,
	})
	const open = state.path === path ? state.index : null
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const triggers = useRef<(HTMLButtonElement | null)[]>([])

	const clear = () => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = null
	}
	const set = (index: number | null) => setState({ index, path })
	const schedule = (index: number | null, delay: number) => {
		clear()
		timer.current = setTimeout(() => set(index), delay)
	}
	useEffect(() => clear, [])

	const group: NavLink | undefined = open === null ? undefined : navLinks[open]

	return (
		<nav
			aria-label="التنقل الرئيسي"
			className="flex items-center max-lg:hidden"
			onMouseEnter={clear}
			onMouseLeave={() => schedule(null, CLOSE_DELAY)}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) set(null)
			}}
			onKeyDown={(e) => {
				if (e.key === "Escape" && open !== null) {
					triggers.current[open]?.focus()
					set(null)
				}
			}}
		>
			{navLinks.map((link, index) => {
				const hasPanel = Boolean(link.subLinks?.length)
				const active = isLinkActive(link, path) || open === index
				const label = (
					<>
						<Image
							src="/shapes/nav-menu-icon.svg"
							width={8}
							height={8}
							alt=""
							aria-hidden
							className="h-auto w-1.5 transition-transform duration-300 group-hover:rotate-90"
						/>
						<span className="text-subtitle">{link.label}</span>
						{hasPanel && (
							<ChevronDown
								aria-hidden
								className={cn(
									"size-4 transition-transform duration-300",
									open === index && "rotate-180",
								)}
							/>
						)}
					</>
				)
				const triggerClass =
					"flex items-center gap-2 text-sm text-white transition hover:text-white/80 xl:text-base"

				return (
					<div
						key={link.label}
						className="group relative px-3 py-2"
						onMouseEnter={() =>
							hasPanel
								? open === null
									? schedule(index, OPEN_DELAY)
									: set(index)
								: open !== null && schedule(null, OPEN_DELAY)
						}
					>
						<span
							aria-hidden
							className={cn(
								"absolute -bottom-1 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-white transition-transform duration-300 ease-in-out",
								active ? "scale-100" : "scale-0 group-hover:scale-100",
							)}
						/>
						{hasPanel ? (
							<button
								type="button"
								ref={(el) => {
									triggers.current[index] = el
								}}
								aria-expanded={open === index}
								aria-haspopup="true"
								aria-controls="mega-panel"
								onClick={() => {
									clear()
									set(open === index ? null : index)
								}}
								className={triggerClass}
							>
								{label}
							</button>
						) : (
							<Link
								href={link.href ?? "#"}
								aria-current={isLinkActive(link, path) ? "page" : undefined}
								className={triggerClass}
							>
								{label}
							</Link>
						)}
					</div>
				)
			})}

			{group && <MegaPanel group={group} path={path} />}
		</nav>
	)
}

function MegaPanel({ group, path }: { group: NavLink; path: string }) {
	const current = activeSubHref(group, path)
	const GroupIcon = group.Icon

	return (
		// Positioned against the navbar row (it is `relative`). The outer layer lets clicks through
		// beside the card; the inner one carries the small top gap so the pointer never leaves the menu.
		<div id="mega-panel" className="pointer-events-none absolute inset-x-0 top-full z-50 text-gray-900">
			<div className="pointer-events-auto mx-auto w-full px-4 pt-3 lg:container">
				<div className="mega-panel grid gap-3 rounded-[2rem] border border-secondary/40 bg-[var(--page-bg)] p-3 shadow-2xl dark:border-Muharram_secondary/40 lg:grid-cols-[17rem_1fr]">
					{/* Lead panel */}
					<div className="relative isolate group/lead flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-primary p-6 text-white dark:bg-[#171314]">
						{GroupIcon && (
							<GroupIcon
								aria-hidden
								strokeWidth={1}
								className="absolute -bottom-6 -left-6 -z-10 size-40 -rotate-12 text-white/10 transition-transform duration-700 ease-out group-hover/lead:rotate-0"
							/>
						)}
						<div>
							<div className="flex items-center gap-2.5">
								<TitleIcon className="w-3" />
								<p className="text-xl font-extrabold">{group.label}</p>
							</div>
							{group.blurb && (
								<p className="mt-3 text-base leading-8 text-white/80">{group.blurb}</p>
							)}
						</div>
						{group.cta && (
							<Link
								href={group.cta.href}
								className="group/cta inline-flex w-fit items-center gap-2 rounded-xl border-2 border-white/70 px-4 py-2 text-base font-semibold text-white transition hover:border-white hover:bg-white hover:text-primary dark:hover:text-Muharram_primary"
							>
								{group.cta.label}
								<ArrowLeft
									aria-hidden
									className="size-4 transition-transform duration-300 group-hover/cta:-translate-x-1"
								/>
							</Link>
						)}
					</div>

					{/* Cards */}
					<ul key={group.label} className="grid content-center gap-1 sm:grid-cols-2">
						{group.subLinks?.map((sub, i) => {
							const isCurrent = sub.href === current
							return (
								<li
									key={sub.href}
									className="mega-item"
									style={{ animationDelay: `${60 + i * 55}ms` }}
								>
									<Link
										href={sub.href}
										aria-current={isCurrent ? "page" : undefined}
										className={cn(
											"group/card relative flex items-center gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/[0.07] hover:shadow-sm dark:hover:bg-Muharram_primary/[0.07]",
											isCurrent && "bg-primary/[0.05] dark:bg-Muharram_primary/[0.05]",
										)}
									>
										<span
											className={cn(
												"grid size-14 shrink-0 place-items-center rounded-2xl border-2 transition duration-300 group-hover/card:-rotate-6 group-hover/card:scale-110 group-hover/card:border-primary group-hover/card:bg-primary group-hover/card:text-white dark:group-hover/card:border-Muharram_primary dark:group-hover/card:bg-Muharram_primary",
												isCurrent
													? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
													: "border-secondary/40 text-secondary_dark dark:border-Muharram_secondary/40 dark:text-Muharram_secondary",
											)}
										>
											<sub.Icon aria-hidden className="size-6" strokeWidth={1.75} />
										</span>
										<span className="min-w-0 flex-1">
											<span className="block text-lg font-bold leading-7 text-gray-900 transition-colors group-hover/card:text-primary dark:group-hover/card:text-Muharram_primary">
												{sub.label}
											</span>
											<span className="mt-0.5 block text-sm leading-6 text-gray-600">
												{sub.description}
											</span>
										</span>
										<ArrowLeft
											aria-hidden
											className="size-5 shrink-0 translate-x-2 text-secondary opacity-0 transition duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100 dark:text-Muharram_secondary"
										/>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}
