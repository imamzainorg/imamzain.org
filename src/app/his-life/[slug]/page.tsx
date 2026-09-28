import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, TitleIcon, shieldPanel } from "../_components/brand"
import { ReadingProgress, Reveal } from "../_components/motion"
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

const sheet = "rounded-[30px] bg-white px-5 py-6 shadow-xl shadow-primary/5 md:p-10"
const divider = "my-8 h-px bg-gradient-to-l from-transparent via-secondary/60 to-transparent"
const pagerLink =
	"group flex flex-1 flex-col gap-1 rounded-xl border-2 border-primary/25 p-5 transition-colors hover:border-primary dark:border-Muharram_primary/25 dark:hover:border-Muharram_primary"

function TableOfContents({ sections }: { sections: Section[] }) {
	return (
		<ol className="space-y-1">
			{sections.map((section) => (
				<li key={section.id}>
					<a
						href={`#${section.id}`}
						className="flex items-start gap-2 rounded-lg px-3 py-1.5 leading-7 text-gray-700 transition-colors hover:bg-primary/5 hover:text-primary dark:hover:bg-Muharram_primary/5 dark:hover:text-Muharram_primary"
					>
						<span className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary dark:bg-Muharram_secondary" />
						{section.title}
					</a>
				</li>
			))}
		</ol>
	)
}

function ChapterPager({ prev, next }: { prev?: Chapter; next?: Chapter }) {
	return (
		<nav aria-label="التنقل بين الفصول" className="mt-16 flex flex-col gap-4 sm:flex-row">
			{prev && (
				<Link href={`/his-life/${prev.slug}`} className={pagerLink}>
					<span className="inline-flex items-center gap-1 text-sm text-gray-500">
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						الفصل السابق
					</span>
					<span className="text-lg font-bold text-primary dark:text-Muharram_primary">{prev.title}</span>
				</Link>
			)}
			<Link href="/his-life" className={`${pagerLink} items-center justify-center text-center`}>
				<span className="text-sm text-gray-500">العودة إلى</span>
				<span className="text-lg font-bold text-primary dark:text-Muharram_primary">سيرة الإمام</span>
			</Link>
			{next && (
				<Link href={`/his-life/${next.slug}`} className={`${pagerLink} items-end text-left`}>
					<span className="inline-flex items-center gap-1 text-sm text-gray-500">
						الفصل التالي
						<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
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
		<div className="container pb-12">
			<ReadingProgress />
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "سيرة الإمام", url: "/his-life" },
					{ name: chapter.title, url: "#" },
				]}
			/>

			<header className="max-w-3xl">
				<p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
					<span>
						الفصل {arabicNumber(index + 1)} من {arabicNumber(chapters.length)}
					</span>
					<span className="inline-flex items-center gap-1 text-gray-500">
						<BookOpen className="h-4 w-4" />
						{readingTimeLabel(chapter.readingMinutes)}
					</span>
				</p>
				<SectionTitle as="h1" title={chapter.title} />
				{chapter.summary && (
					<Reveal className="-mt-4 rounded-[30px] bg-gradient-to-tr from-white via-secondary/10 to-secondary/30 p-6 dark:via-Muharram_secondary/10 dark:to-Muharram_secondary/20 md:p-8">
						<p className="text-sm font-bold text-secondary_dark dark:text-Muharram_secondary">باختصار</p>
						<p className="mt-2 text-lg leading-loose text-gray-800">{chapter.summary}</p>
					</Reveal>
				)}
				<p className="mt-4 text-sm leading-7 text-gray-500">
					النصوص أدناه كما وردت في مصادرها، ويظهر اسم المصدر ورقم الجزء والصفحة في نهاية كل نص.
				</p>
			</header>

			{chapter.facts && (
				<Reveal className="mt-12 max-w-3xl">
					<section className={`${shieldPanel} p-8 md:p-10`} aria-labelledby="facts-heading">
						<h2 id="facts-heading" className="flex items-center gap-3 text-xl font-bold">
							<TitleIcon className="w-3" />
							{chapter.facts.heading}
						</h2>
						<dl className="mt-4">
							{chapter.facts.rows.map((row) => (
								<div
									key={row.source}
									className="grid gap-1 border-b border-white/10 py-3 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-4"
								>
									<dt className="font-semibold text-secondary dark:text-white/60">{row.source}</dt>
									<dd className="text-white">{row.says}</dd>
								</div>
							))}
						</dl>
					</section>
				</Reveal>
			)}

			<div className={showToc ? "mt-12 lg:grid lg:grid-cols-[1fr_17rem] lg:gap-12" : "mt-12"}>
				<article className="min-w-0 max-w-4xl space-y-12">
					{showToc && (
						<details className="rounded-xl border-2 border-primary/25 p-4 dark:border-Muharram_primary/25 lg:hidden">
							<summary className="cursor-pointer font-bold text-primary dark:text-Muharram_primary">
								محتويات الفصل ({arabicNumber(toc.length)})
							</summary>
							<div className="mt-3">
								<TableOfContents sections={toc} />
							</div>
						</details>
					)}

					{chapter.sections.map((section, i) => (
						<section key={section.id ?? i}>
							{section.title && (
								<h2
									id={section.id}
									className="mb-6 flex scroll-mt-32 items-center gap-3 text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl"
								>
									<TitleIcon className="w-3 shrink-0 md:w-4" />
									{section.title}
								</h2>
							)}
							<Reveal y={30} className={sheet}>
								{section.entries.map((entry, j) => (
									<div key={entry.id ?? j}>
										{j > 0 && <div className={divider} />}
										<div id={entry.id} className="narration scroll-mt-32">
											{entry.number !== undefined && (
												<span
													aria-hidden
													className="float-right ml-3 flex h-10 w-9 items-center justify-center bg-[url('/shapes/title-icon.svg')] bg-contain bg-center bg-no-repeat text-sm font-bold text-secondary_dark dark:bg-[url('/shapes/title-icon_Muharram.svg')] dark:text-Muharram_secondary"
												>
													{arabicNumber(entry.number)}
												</span>
											)}
											{entry.paragraphs.map((html, k) => (
												// safe: chapter content comes from trusted static JSON
												<p key={k} dangerouslySetInnerHTML={{ __html: html }} />
											))}
										</div>
									</div>
								))}
							</Reveal>
						</section>
					))}
				</article>

				{showToc && (
					<aside className="hidden lg:block">
						<nav aria-label="محتويات الفصل" className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto">
							<p className="mb-3 flex items-center gap-2 px-3 font-bold text-primary dark:text-Muharram_primary">
								<TitleIcon className="w-3" />
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
