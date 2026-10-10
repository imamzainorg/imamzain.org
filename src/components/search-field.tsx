"use client"

import { useId } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

// The search box above a list. `onClear` replaces the default "empty the box" when clearing
// should do more (reset the filters too).
export default function SearchField({
	value,
	onChange,
	onClear,
	placeholder,
	label,
	className,
}: {
	value: string
	onChange: (value: string) => void
	onClear?: () => void
	placeholder: string
	// What the box searches in, for screen readers.
	label: string
	className?: string
}) {
	const id = useId()

	return (
		<div className={cn("relative", className)}>
			<label htmlFor={id} className="sr-only">
				{label}
			</label>
			<Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary dark:text-Muharram_primary" />
			<input
				id={id}
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="w-full rounded-xl border-2 border-primary/25 bg-white py-3.5 pl-12 pr-12 text-lg text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none dark:border-Muharram_primary/25 dark:focus:border-Muharram_primary [&::-webkit-search-cancel-button]:hidden"
			/>
			{value && (
				<button
					type="button"
					aria-label="مسح البحث"
					onClick={() => (onClear ? onClear() : onChange(""))}
					className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:text-gray-700"
				>
					<X className="h-5 w-5" />
				</button>
			)}
		</div>
	)
}
