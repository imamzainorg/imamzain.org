import { cn } from "@/lib/utils"

// A row of pill toggles for filtering a list by one value (a category, a language, a type).
export default function FilterChips<T extends string>({
	options,
	value,
	onChange,
	label,
	className,
}: {
	options: { key: T; label: string; count?: number }[]
	value: T
	onChange: (key: T) => void
	// What the group filters, for screen readers.
	label: string
	className?: string
}) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label={label}>
			{options.map((option) => (
				<button
					key={option.key}
					type="button"
					aria-pressed={value === option.key}
					onClick={() => onChange(option.key)}
					className={cn(
						"rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 md:text-base",
						value === option.key
							? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
							: "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary",
					)}
				>
					{option.label}
					{option.count !== undefined && <span className="mr-2 opacity-60">{option.count}</span>}
				</button>
			))}
		</div>
	)
}
