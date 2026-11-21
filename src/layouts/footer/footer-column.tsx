"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { TitleIcon } from "@/components/brand"

type Props = {
	label: string
	links: { label: string; href: string }[]
}

/**
 * One footer link group.
 * Below `sm` it is an accordion (closed by default) so the footer stays short on phones.
 * From `sm` up the heading is plain text and the links are always visible.
 */
export function FooterColumn({ label, links }: Props) {
	const [open, setOpen] = useState(false)
	const listId = useId()

	return (
		<div className="min-w-0 border-b border-white/15 sm:border-0">
			{/* Phones: the heading is a button that opens the list. */}
			<h3 className="sm:hidden">
				<button
					type="button"
					aria-expanded={open}
					aria-controls={listId}
					onClick={() => setOpen((v) => !v)}
					className="flex min-h-12 w-full items-center justify-between gap-3 text-start text-base font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<span className="flex min-w-0 items-center gap-2">
						<TitleIcon className="w-2.5 shrink-0" />
						<span className="min-w-0 break-words">{label}</span>
					</span>
					<ChevronDown
						aria-hidden
						className={`size-5 shrink-0 text-white/70 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
					/>
				</button>
			</h3>

			{/* Tablet and desktop: a normal heading. */}
			<h3 className="hidden items-center gap-2 text-lg font-bold sm:flex">
				<TitleIcon className="w-2.5 shrink-0" />
				<span className="min-w-0 break-words">{label}</span>
			</h3>

			<ul id={listId} className={`${open ? "block" : "hidden"} pb-3 sm:mt-4 sm:block sm:space-y-0.5 sm:pb-0`}>
				{links.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className="group/link inline-flex items-center gap-2 rounded-sm py-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:text-base"
						>
							<span
								aria-hidden
								className="h-px w-0 shrink-0 bg-secondary transition-all duration-300 group-hover/link:w-3 group-focus-visible/link:w-3 motion-reduce:transition-none dark:bg-Muharram_secondary"
							/>
							<span className="min-w-0 break-words">{link.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}