import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// The site's gold drop mark (red in the Muharram theme).
export function TitleIcon({ className }: { className?: string }) {
	return (
		<>
			<Image
				src="/shapes/title-icon.svg"
				width={20}
				height={24}
				alt=""
				aria-hidden
				className={cn("dark:hidden", className)}
			/>
			<Image
				src="/shapes/title-icon_Muharram.svg"
				width={20}
				height={24}
				alt=""
				aria-hidden
				className={cn("hidden dark:block", className)}
			/>
		</>
	)
}

// Same look as components/header-sections, plus an intro line and a light variant for dark bands.
export function SectionTitle({
	title,
	text,
	light,
	as: Heading = "h2",
}: {
	title: string
	text?: string
	light?: boolean
	as?: "h1" | "h2"
}) {
	return (
		<div className="mb-12 space-y-4">
			<div className="flex items-center gap-2 md:gap-4">
				<TitleIcon className="w-3 sm:w-4 xl:w-5" />
				{/* Not cn(): tailwind-merge would drop the custom `text-title` size next to a text color. */}
				<Heading
					className={`text-title font-extrabold ${light ? "text-white" : "text-primary dark:text-Muharram_primary"}`}
				>
					{title}
				</Heading>
			</div>
			{text && (
				<p className={cn("max-w-3xl text-lg leading-loose md:text-xl", light ? "text-white/70" : "text-gray-600")}>
					{text}
				</p>
			)}
		</div>
	)
}

export function MoreLink({
	href,
	children,
	light,
	className,
}: {
	href: string
	children: React.ReactNode
	light?: boolean
	className?: string
}) {
	return (
		<Link
			href={href}
			className={cn(
				"group inline-flex items-center gap-2 font-semibold",
				light ? "text-secondary dark:text-white" : "text-primary dark:text-Muharram_primary",
				className,
			)}
		>
			{children}
			<ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
		</Link>
	)
}

// Green panel with the offset gold outline used by the site's visitation form.
export const shieldPanel =
	"rounded-[40px] bg-primary text-white outline outline-2 outline-offset-[6px] outline-secondary/60 dark:bg-Muharram_primary dark:outline-Muharram_secondary/60"

// Outlined panel used by the library collection pages.
export const outlinePanel =
	"rounded-[40px] border border-primary shadow-lg shadow-primary/10 md:rounded-[60px] dark:border-Muharram_primary dark:shadow-Muharram_primary/10"
