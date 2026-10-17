"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// 1 … 4 5 6 … 20: the first and last page, the current one with a neighbour on each side.
function pageItems(page: number, total: number): (number | "gap")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

	let start = Math.max(2, page - 1)
	let end = Math.min(total - 1, page + 1)
	if (page <= 3) end = 4
	if (page >= total - 2) start = total - 3

	const items: (number | "gap")[] = [1]
	if (start > 2) items.push("gap")
	for (let p = start; p <= end; p++) items.push(p)
	if (end < total - 1) items.push("gap")
	items.push(total)
	return items
}

const box =
	"flex h-11 min-w-11 items-center justify-center rounded-xl border-2 px-2 font-semibold transition-colors disabled:pointer-events-none disabled:opacity-40"
const idle =
	"border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary dark:hover:bg-Muharram_primary"
const current = "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"

// Page buttons for a list the page holds in state. Renders nothing for a single page.
export default function Pagination({
	page,
	totalPages,
	onPageChange,
	className,
}: {
	page: number
	totalPages: number
	onPageChange: (page: number) => void
	className?: string
}) {
	if (totalPages <= 1) return null

	return (
		<nav aria-label="التنقل بين الصفحات" className={cn("flex items-center justify-center gap-2", className)}>
			<button
				type="button"
				aria-label="الصفحة السابقة"
				disabled={page <= 1}
				onClick={() => onPageChange(page - 1)}
				className={cn(box, idle)}
			>
				<ChevronRight className="h-5 w-5" />
			</button>

			<span className="px-3 font-semibold text-gray-600 sm:hidden">
				{page} / {totalPages}
			</span>

			<ul className="hidden items-center gap-2 sm:flex">
				{pageItems(page, totalPages).map((item, i) => (
					<li key={`${item}-${i}`}>
						{item === "gap" ? (
							<span aria-hidden className="px-1 text-gray-400">
								…
							</span>
						) : (
							<button
								type="button"
								aria-label={`الصفحة ${item}`}
								aria-current={item === page ? "page" : undefined}
								onClick={() => onPageChange(item)}
								className={cn(box, item === page ? current : idle)}
							>
								{item}
							</button>
						)}
					</li>
				))}
			</ul>

			<button
				type="button"
				aria-label="الصفحة التالية"
				disabled={page >= totalPages}
				onClick={() => onPageChange(page + 1)}
				className={cn(box, idle)}
			>
				<ChevronLeft className="h-5 w-5" />
			</button>
		</nav>
	)
}
