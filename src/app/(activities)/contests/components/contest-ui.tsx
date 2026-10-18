import type { LucideIcon } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Shared pieces of the contest pages (khat, kitab, qatuf).

// A line under the breadcrumbs saying the contest is over.
export function ClosedNotice() {
	return (
		<div className="mb-14 flex items-center gap-4 rounded-2xl border-2 border-secondary/50 px-5 py-4 dark:border-Muharram_secondary/50">
			<CheckCircle2 className="h-7 w-7 shrink-0 text-secondary_dark dark:text-Muharram_secondary" strokeWidth={1.6} />
			<p className="text-lg leading-8">
				<strong className="font-bold text-primary dark:text-Muharram_primary">انتهت المسابقة</strong>
				<span className="mx-2 text-secondary" aria-hidden>
					·
				</span>
				<span className="text-gray-600">انتهت فترة المشاركة، وشكرًا لجميع المشاركين</span>
			</p>
		</div>
	)
}

// A short fact about the contest (international, its dates).
export function ContestBadge({
	icon: Icon,
	text,
	strong,
}: {
	icon: LucideIcon
	text: string
	strong?: boolean
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-3 rounded-xl border-2 px-5 py-2 font-semibold",
				strong
					? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
					: "border-primary/25 text-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary",
			)}
		>
			<Icon className="h-5 w-5" strokeWidth={1.8} />
			{text}
		</span>
	)
}

// A gold ring holding an icon.
export function IconRing({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
	return (
		<span
			className={cn(
				"flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-secondary text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary",
				className,
			)}
		>
			<Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
		</span>
	)
}

// An icon beside a heading and a paragraph.
export function Feature({
	icon,
	title,
	description,
}: {
	icon: LucideIcon
	title: string
	description: string
}) {
	return (
		<div className="flex items-start gap-5">
			<IconRing icon={icon} />
			<div>
				<h3 className="text-xl font-bold text-primary dark:text-Muharram_primary">{title}</h3>
				<p className="mt-2 text-lg leading-loose text-gray-700">{description}</p>
			</div>
		</div>
	)
}

// One condition of the contest, with a tick.
export function Rule({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-start gap-4">
			<CheckCircle2
				className="mt-1.5 h-5 w-5 shrink-0 text-primary dark:text-Muharram_primary"
				strokeWidth={1.8}
			/>
			<p className="text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">{children}</p>
		</div>
	)
}

// An important line: gold bar and heavier text.
export function Note({ children }: { children: React.ReactNode }) {
	return (
		<p className="border-r-4 border-secondary pr-5 text-lg font-semibold leading-loose text-gray-900 dark:border-Muharram_secondary md:text-xl md:leading-loose">
			{children}
		</p>
	)
}
