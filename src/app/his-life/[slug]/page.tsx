import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { cn } from "@/lib/utils"
import { SectionTitle, TitleIcon } from "../_components/brand"
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
		description: chapter.description,
		alternates: { canonical: `/his-life/${slug}` },
		openGraph: { title, description: chapter.description, url: `/his-life/${slug}` },
	}
}

const divider = "my-10 h-px bg-gradient-to-l from-transparent via-secondary/50 to-transparent"
const pagerLink =
	"group flex flex-1 flex-col gap-1 rounded-xl border-2 border-primary/25 p-5 transition-colors hover:border-primary dark:border-Muharram_primary/25 dark:hover:border-Muharram_primary"

// Every chapter, with the current one's sections listed under it.
function ChapterNav({ chapters, current, sections }: { chapters: Chapter[]; current: string; sections: Section[] }) {
	return (
		<ol className="border-r-2 border-secondary/25 dark:border-Muharram_secondary/25">
			{chapters.map((chapter, i) => {
				const isCurrent = chapter.slug === current
				return (
					<li key={chapter.slug}>
						<Link
							href={`/his-life/${chapter.slug}`}
							aria-current={isCurrent ? "page" : undefined}
							className={cn(
								"-mr-0.5 flex gap-3 border-r-2 py-2 pr-4 leading-7 transition-colors",
								isCurrent
									? "border-primary font-bold text-primary dark:border-Muharram_primary dark:text-Muharram_primary"
									: "border-transparent text-gray-600 hover:border-secondary hover:text-primary dark:hover:border-Muharram_secondary dark:hover:text-Muharram_primary",
							)}
						>
							<span className="w-5 shrink-0 text-secondary_dark dark:text-Muharram_secondary">
								{arabicNumber(i + 1)}
							</span>
							{chapter.title}
						</Link>
						{isCurrent && sections.length > 0 && (
							<ol className="mb-3 mr-12 space-y-0.5">
								{sections.map((section) => (
									<li key={section.id}>
										<a
											href={`#${section.id}`}
											className="flex items-start gap-2 py-1 text-sm leading-6 text-gray-600 hover:text-primary dark:hover:text-Muharram_primary"
										>
											<span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-secondary dark:bg-Muharram_secondary" />
											{section.title}
										</a>
									</li>
								))}
							</ol>
						)}
					</li>
				)
			})}
		</ol>
	)
}

function ChapterPager({ prev, next }: { prev?: Chapter; next?: Chapter }) {
	return (
		<nav aria-label="التنقل بين الفصول" className="mt-20 flex flex-col gap-4 sm:flex-row">
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
	const sections = chapter.sections.filter((s) => s.title)

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

			<div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-14 xl:grid-cols-[19rem_1fr] xl:gap-20">
				<aside className="hidden lg:block">
					<nav aria-label="فصول السيرة" className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pb-6">
						<p className="mb-4 flex items-center gap-2 font-bold text-primary dark:text-Muharram_primary">
							<TitleIcon className="w-3" />
							فصول السيرة
						</p>
						<ChapterNav chapters={chapters} current={chapter.slug} sections={sections} />
					</nav>
				</aside>

				<article className="min-w-0">
					<header>
						<p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
							<span>
								الفصل {arabicNumber(index + 1)} من {arabicNumber(chapters.length)}
							</span>
							<span className="inline-flex items-center gap-1 text-gray-500">
								<BookOpen className="h-4 w-4" />
								{readingTimeLabel(chapter.readingMinutes)}
							</span>
						</p>
						<SectionTitle
							as="h1"
							title={chapter.title}
							text="النصوص أدناه كما وردت في مصادرها، ويظهر اسم المصدر ورقم الجزء والصفحة في نهاية كل نص."
						/>
					</header>

					<details className="mb-10 rounded-xl border-2 border-primary/25 p-4 dark:border-Muharram_primary/25 lg:hidden">
						<summary className="cursor-pointer font-bold text-primary dark:text-Muharram_primary">فصول السيرة</summary>
						<div className="mt-4">
							<ChapterNav chapters={chapters} current={chapter.slug} sections={sections} />
						</div>
					</details>

					{chapter.sections.map((section, i) => (
						<section key={section.id ?? i}>
							{section.title && (
								<h2
									id={section.id}
									className="mb-8 mt-16 flex scroll-mt-32 items-center gap-3 text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl"
								>
									<TitleIcon className="w-3 shrink-0 md:w-4" />
									{section.title}
								</h2>
							)}
							{section.entries.map((entry, j) => (
								<Reveal key={entry.id ?? j} y={24}>
									{j > 0 && <div className={divider} />}
									<div id={entry.id} className="narration relative scroll-mt-32 md:pr-16">
										{entry.number !== undefined && (
											<span
												aria-hidden
												className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-secondary text-lg font-bold text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary md:absolute md:right-0 md:top-1 md:mb-0"
											>
												{arabicNumber(entry.number)}
											</span>
										)}
										{entry.paragraphs.map((html, k) => (
											// safe: chapter content comes from trusted static JSON
											<p key={k} dangerouslySetInnerHTML={{ __html: html }} />
										))}
									</div>
								</Reveal>
							))}
						</section>
					))}

					<ChapterPager prev={chapters[index - 1]} next={chapters[index + 1]} />
				</article>
			</div>
		</div>
	)
}
