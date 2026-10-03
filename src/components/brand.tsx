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

// The page and section heading: gold drop, extrabold title, an optional intro line, a light
// variant for dark bands, and an optional `action` (a "see all" link) at the far end of the row.
export function SectionTitle({
	title,
	text,
	light,
	as: Heading = "h2",
	action,
	className,
	id,
}: {
	title: string
	text?: string
	light?: boolean
	as?: "h1" | "h2"
	action?: React.ReactNode
	className?: string
	id?: string
}) {
	return (
		<div className={cn("mb-12 space-y-4", className)}>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-2 md:gap-4">
					<TitleIcon className="w-3 sm:w-4 xl:w-5" />
					{/* Not cn(): tailwind-merge would drop the custom `text-title` size next to a text color. */}
					<Heading
						id={id}
						className={`text-title font-extrabold ${light ? "text-white" : "text-primary dark:text-Muharram_primary"}`}
					>
						{title}
					</Heading>
				</div>
				{action}
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

// Intro and long-form paragraphs: large, loose and never justified.
export const leadText = "text-lg leading-loose text-gray-700 md:text-xl"

// Green panel with the offset gold outline used by the site's visitation form.
export const shieldPanel =
	"rounded-[40px] bg-primary text-white outline outline-2 outline-offset-[6px] outline-secondary/60 dark:bg-Muharram_primary dark:outline-Muharram_secondary/60"

// The same shape in off-white, for cards that hold information rather than a call to action.
export const infoPanel =
	"rounded-[40px] border border-primary/10 bg-white/70 text-gray-900 shadow-lg shadow-primary/5 outline outline-2 outline-offset-[6px] outline-secondary/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:shadow-none dark:outline-Muharram_secondary/60"

// A photo in the shield's gold offset outline. Put the <Image> inside; the frame clips it.
export const photoFrame =
	"overflow-hidden rounded-[40px] outline outline-2 outline-offset-[6px] outline-secondary/60 dark:outline-Muharram_secondary/60"

// Outlined panel used by the library collection pages.
export const outlinePanel =
	"rounded-[40px] border border-primary shadow-lg shadow-primary/10 md:rounded-[60px] dark:border-Muharram_primary dark:shadow-Muharram_primary/10"

// Buttons: one shape (rounded, 2px border) in three weights. Use on <a>, <Link> and <button> alike.
const buttonBase =
	"group inline-flex items-center justify-center gap-3 rounded-xl border-2 px-6 py-3 font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50"

export const solidButton = `${buttonBase} border-primary bg-primary text-white hover:bg-primary/90 dark:border-Muharram_primary dark:bg-Muharram_primary`

export const outlineButton = `${buttonBase} border-primary text-primary hover:bg-primary hover:text-white dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white`

// For dark bands and photos: an outlined button and a solid one.
export const lightButton = `${buttonBase} border-white/70 text-white hover:border-white hover:bg-white hover:text-primary dark:hover:text-Muharram_primary`

export const whiteButton = `${buttonBase} border-white bg-white text-primary hover:bg-white/90 dark:text-Muharram_primary`

// A previous/next link at the foot of a reading page: an outlined box with a small label over a title.
export const pagerLink =
	"group flex flex-1 flex-col gap-1 rounded-xl border-2 border-primary/25 p-5 transition-colors hover:border-primary dark:border-Muharram_primary/25 dark:hover:border-Muharram_primary"
