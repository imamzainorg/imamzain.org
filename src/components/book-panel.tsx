import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Quote } from "lucide-react"
import { outlinePanel } from "@/components/brand"
import { Reveal } from "@/components/motion"

type PanelQuote = { text: string; title: string; source: string; href: string }

// The library's outlined panel for a single work (Risalat al-Huqooq on the home page and
// /his-life). `children` are its actions. Beside the text it either stands the book shape over the
// corner or, when given a `quote`, a card with a line from the work.
export default function BookPanel({
	title,
	text,
	spine,
	quote,
	children,
}: {
	title?: string
	text: string
	// The two short lines printed on the book's cover.
	spine: [string, string]
	quote?: PanelQuote
	children?: React.ReactNode
}) {
	return (
		<Reveal>
			<div
				className={`${outlinePanel} relative p-8 md:p-12 ${quote ? "grid items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14" : "lg:pl-80"}`}
			>
				<div>
					{title && <h4 className="text-3xl font-bold text-primary dark:text-Muharram_primary">{title}</h4>}
					<p className={`${title ? "mt-4" : ""} max-w-2xl text-lg leading-loose text-gray-700`}>{text}</p>
					{children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
				</div>

				{quote ? (
					<figure className="rounded-[2rem] border-2 border-primary/15 bg-primary/[0.05] p-7 dark:border-Muharram_primary/20 dark:bg-Muharram_primary/[0.05]">
						<Quote className="size-9 -scale-x-100 text-secondary_dark dark:text-Muharram_secondary" strokeWidth={1.5} />
						<blockquote className="mt-3 text-xl font-bold leading-[2.3] text-primary dark:text-Muharram_primary">
							{quote.text}
						</blockquote>
						<figcaption className="mt-4 text-secondary_dark dark:text-Muharram_secondary">
							{quote.title}
							<span className="mt-1 block text-sm text-gray-500">{quote.source}</span>
						</figcaption>
						<Link
							href={quote.href}
							className="group mt-4 inline-flex items-center gap-2 font-semibold text-primary dark:text-Muharram_primary"
						>
							قراءة الحق كاملاً
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						</Link>
					</figure>
				) : (
					<div className="absolute -top-10 left-16 hidden w-52 lg:block" aria-hidden>
						<Image src="/shapes/book-bg.svg" width={208} height={240} alt="" className="w-full dark:hidden" />
						<Image
							src="/shapes/book-bg_Muharram.svg"
							width={208}
							height={240}
							alt=""
							className="hidden w-full dark:block"
						/>
						<span className="absolute inset-x-0 top-[14%] text-center text-2xl font-bold text-white">
							{spine[0]}
							<br />
							{spine[1]}
						</span>
					</div>
				)}
			</div>
		</Reveal>
	)
}
