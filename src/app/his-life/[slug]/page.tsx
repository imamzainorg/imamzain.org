import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, ListTree } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { arabicNumber, readingTimeLabel } from "../_lib/anchors"
import { getChapters, type Chapter, type Section } from "../_lib/chapters"

export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
	const chapters = await getChapters()
	return chapters.map((chapter) => ({ slug: chapter.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const chapter = (await getChapters()).find((c) => c.slug === slug)
	if (!chapter) return {}
	const title = `${chapter.title} - سيرة الإمام زين العابدين (عليه السلام)`
	return {
		title,
		description: chapter.summary || undefined,
		alternates: { canonical: `/his-life/${slug}` },
		openGraph: { title, description: chapter.summary || undefined, url: `/his-life/${slug}` },
	}
}

const card = "rounded-3xl bg-white shadow-sm ring-1 ring-black/5"

function TableOfContents({ sections }: { sections: Section[] }) {
	return (
		<ol className="space-y-1">
			{sections.map((section) => (
				<li key={section.id}>
					<a
						href={`#${section.id}`}
						className="block rounded-lg px-3 py-1.5 leading-7 text-gray-700 hover:bg-primary/5 hover:text-primary dark:hover:bg-Muharram_primary/5 dark:hover:text-Muharram_primary"
					>
						{section.title}
					</a>
				</li>
			))}
		</ol>
	)
}

function ChapterPager({ prev, next }: { prev?: Chapter; next?: Chapter }) {
	const link = `${card} flex flex-1 flex-col gap-1 p-5 transition-shadow hover:shadow-lg`
	return (
		<nav aria-label="التنقل بين الفصول" className="mt-16 flex flex-col gap-4 sm:flex-row">
			{prev && (
				<Link href={`/his-life/${prev.slug}`} className={link}>
					<span className="inline-flex items-center gap-1 text-sm text-gray-500">
						<ArrowRight className="h-4 w-4" />
						الفصل السابق
					</span>
					<span className="text-lg font-bold text-primary dark:text-Muharram_primary">{prev.title}</span>
				</Link>
			)}
			<Link href="/his-life" className={`${link} items-center justify-center text-center`}>
				<span className="text-sm text-gray-500">العودة إلى</span>
				<span className="text-lg font-bold text-primary dark:text-Muharram_primary">سيرة الإمام</span>
			</Link>
			{next && (
				<Link href={`/his-life/${next.slug}`} className={`${link} items-end text-left`}>
					<span className="inline-flex items-center gap-1 text-sm text-gray-500">
						الفصل التالي
						<ArrowLeft className="h-4 w-4" />
					</span>
					<span className="text-lg font-bold text-primary dark:text-Muharram_primary">{next.title}</span>
				</Link>
			)}
		</nav>
	)
}

export default async function Page({ params }: Props) {
	const { slug } = await params
	const chapters = await getChapters()
	const index = chapters.findIndex((c) => c.slug === slug)
	if (index === -1) notFound()

	const chapter = chapters[index]
	const toc = chapter.sections.filter((s) => s.title)
	const showToc = toc.length >= 3

	return (
		<div className="pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "سيرة الإمام", url: "/his-life" },
					{ name: chapter.title, url: "#" },
				]}
			/>

			<header className="max-w-3xl">
				<p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
					<span>
						الفصل {arabicNumber(index + 1)} من {arabicNumber(chapters.length)}
					</span>
					<span className="inline-flex items-center gap-1 text-gray-500">
						<BookOpen className="h-4 w-4" />
						{readingTimeLabel(chapter.readingMinutes)}
					</span>
				</p>
				<h1 className="mt-3 text-title font-bold text-primary dark:text-Muharram_primary">
					{chapter.title}
				</h1>
				{chapter.summary && (
					<div className="mt-6 rounded-2xl border-r-4 border-secondary bg-white/70 p-5 dark:border-Muharram_secondary">
						<p className="text-sm font-bold text-secondary_dark dark:text-Muharram_secondary">باختصار</p>
						<p className="mt-2 text-lg leading-loose text-gray-800">{chapter.summary}</p>
					</div>
				)}
				<p className="mt-4 text-sm leading-7 text-gray-500">
					النصوص أدناه كما وردت في مصادرها، ويظهر اسم المصدر ورقم الجزء والصفحة في نهاية كل نص.
				</p>
			</header>

			{chapter.facts && (
				<section className={`${card} mt-10 max-w-3xl overflow-hidden`} aria-labelledby="facts-heading">
					<h2
						id="facts-heading"
						className="bg-primary px-6 py-4 text-lg font-bold text-white dark:bg-Muharram_primary"
					>
						{chapter.facts.heading}
					</h2>
					<dl className="divide-y divide-gray-100">
						{chapter.facts.rows.map((row) => (
							<div key={row.source} className="grid gap-1 px-6 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
								<dt className="font-semibold text-secondary_dark dark:text-Muharram_secondary">{row.source}</dt>
								<dd className="text-gray-800">{row.says}</dd>
							</div>
						))}
					</dl>
				</section>
			)}

			<div className={showToc ? "mt-10 lg:grid lg:grid-cols-[1fr_17rem] lg:gap-10" : "mt-10"}>
				<article className="min-w-0 max-w-4xl space-y-6">
					{showToc && (
						<details className={`${card} p-5 lg:hidden`}>
							<summary className="flex cursor-pointer items-center gap-2 font-bold text-primary dark:text-Muharram_primary">
								<ListTree className="h-5 w-5" />
								محتويات الفصل ({arabicNumber(toc.length)})
							</summary>
							<div className="mt-3">
								<TableOfContents sections={toc} />
							</div>
						</details>
					)}

					{chapter.sections.map((section, i) => (
						<section key={section.id ?? i} className="space-y-6">
							{section.title && (
								<h2
									id={section.id}
									className="scroll-mt-32 pt-6 text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl"
								>
									{section.title}
								</h2>
							)}
							{section.entries.map((entry, j) => (
								<div
									key={entry.id ?? j}
									id={entry.id}
									className={`${card} narration relative scroll-mt-32 p-6 md:p-8`}
								>
									{entry.number !== undefined && (
										<span
											aria-hidden
											className="float-right ml-4 mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 font-bold text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary"
										>
											{arabicNumber(entry.number)}
										</span>
									)}
									{entry.paragraphs.map((html, k) => (
										// safe: chapter content comes from trusted static JSON
										<p key={k} dangerouslySetInnerHTML={{ __html: html }} />
									))}
								</div>
							))}
						</section>
					))}
				</article>

				{showToc && (
					<aside className="hidden lg:block">
						<nav aria-label="محتويات الفصل" className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto">
							<p className="mb-3 flex items-center gap-2 px-3 font-bold text-primary dark:text-Muharram_primary">
								<ListTree className="h-5 w-5" />
								محتويات الفصل
							</p>
							<TableOfContents sections={toc} />
						</nav>
					</aside>
				)}
			</div>

			<ChapterPager prev={chapters[index - 1]} next={chapters[index + 1]} />
		</div>
	)
}
