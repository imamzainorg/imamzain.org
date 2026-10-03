"use client"

import { useState, type ReactNode } from "react"
import Select, { type SingleValue } from "react-select"
import { SlidersHorizontal, X } from "lucide-react"
import { outlineButton } from "@/components/brand"
import { cn } from "@/lib/utils"

// The filters beside a list. On large screens it is a sticky outlined panel; on phones it
// collapses into a "فلترة" button that opens the same fields in a bottom sheet.
export function FilterPanel({
	children,
	onReset,
	columns = "sm:grid-cols-2 lg:grid-cols-1",
}: {
	children: ReactNode
	onReset: () => void
	// Grid columns of the fields (Tailwind classes), for panels laid out in a row.
	columns?: string
}) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-lg dark:bg-Muharram_primary lg:hidden"
			>
				<SlidersHorizontal className="h-5 w-5" />
				فلترة
			</button>

			<div
				aria-hidden
				onClick={() => setOpen(false)}
				className={cn(
					"fixed inset-0 z-[55] bg-black/40 transition-opacity lg:hidden",
					open ? "visible opacity-100" : "invisible opacity-0",
				)}
			/>

			<aside
				aria-label="تصفية النتائج"
				className={cn(
					"fixed inset-x-0 bottom-0 z-[56] max-h-[85vh] overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl transition-transform duration-300",
					"lg:sticky lg:top-32 lg:z-auto lg:max-h-none lg:translate-y-0 lg:self-start lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none",
					open ? "translate-y-0" : "translate-y-full",
				)}
			>
				<div className="space-y-6 lg:rounded-[28px] lg:border lg:border-primary/30 lg:p-6 dark:lg:border-Muharram_primary/30">
					<div className="flex items-center justify-between lg:hidden">
						<span className="text-lg font-bold text-primary dark:text-Muharram_primary">تصفية النتائج</span>
						<button
							type="button"
							aria-label="إغلاق"
							onClick={() => setOpen(false)}
							className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<div className={cn("grid grid-cols-1 gap-4", columns)}>{children}</div>

					<button
						type="button"
						onClick={() => {
							onReset()
							setOpen(false)
						}}
						className={`${outlineButton} w-full`}
					>
						إعادة تعيين الفلاتر
					</button>
				</div>
			</aside>
		</>
	)
}

// One filter: a labelled, searchable dropdown that can be cleared.
export function FilterSelect({
	instanceId,
	icon,
	label,
	placeholder,
	options = [],
	value,
	onChange,
}: {
	instanceId: string
	icon?: ReactNode
	label: string
	placeholder: string
	options?: string[]
	value: string
	onChange: (value: string) => void
}) {
	return (
		<div className="space-y-2">
			<label
				htmlFor={instanceId}
				className="flex items-center gap-2 text-sm font-bold text-primary dark:text-Muharram_primary"
			>
				{icon}
				{label}
			</label>
			<Select
				inputId={instanceId}
				instanceId={instanceId}
				placeholder={placeholder}
				noOptionsMessage={() => "لا توجد خيارات"}
				isClearable
				menuPortalTarget={typeof window !== "undefined" ? document.body : null}
				menuPosition="fixed"
				styles={{
					menuPortal: (base) => ({ ...base, zIndex: 9999 }),
					menu: (base) => ({
						...base,
						maxHeight: 300,
						overflowY: "auto",
						wordWrap: "break-word",
					}),
					option: (base) => ({ ...base, whiteSpace: "normal" }),
				}}
				options={options.map((option) => ({ value: option, label: option }))}
				value={value ? { value, label: value } : null}
				onChange={(option: SingleValue<{ value: string; label: string }>) => {
					onChange(option ? option.value : "")
				}}
				classNamePrefix="react-select"
			/>
		</div>
	)
}
