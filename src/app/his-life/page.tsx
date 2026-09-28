import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, IdCard, MapPin, Quote, ScrollText } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import HeaderSections from "@/components/header-sections"
import Stories from "./_components/stories"
import TitlesExplorer from "./_components/titles-explorer"
import {
	captivityStops,
	eras,
	facts,
	featuredQuote,
	intro,
	kunyas,
	letters,
	otherTitles,
	people,
	stories,
	titles,
} from "./_data/biography"
import { arabicNumber, readingTimeLabel } from "./_lib/anchors"
import { getChapters } from "./_lib/chapters"

export const metadata: Metadata = {
	title: "سيرة الإمام زين العابدين عليه السلام وتراثه",
	description:
		"سيرة الإمام علي بن الحسين زين العابدين السجاد عليه السلام: ولادته وألقابه وكناه، الأدلة على إمامته، كراماته، دوره في كربلاء، رسائله وخطبه ومواقفه ووفاته.",
	keywords: [
		"سيرة الإمام زين العابدين",
		"سيرة علي بن الحسين السجاد",
		"ولادة الإمام زين العابدين",
		"ألقاب وكنى الإمام السجاد",
		"الأدلة على إمامة علي بن الحسين",
		"الإمام السجاد وكربلاء",
		"كرامات الإمام زين العابدين",
		"خطب ومواقف الإمام السجاد",
		"وفاة الإمام زين العابدين",
		"تراث الإمام السجاد عليه السلام",
	],
	alternates: { canonical: "/his-life" },
	openGraph: {
		title: "سيرة الإمام زين العابدين عليه السلام وتراثه",
		description:
			"صفحة جامعة لسيرة الإمام علي بن الحسين زين العابدين السجاد عليه السلام: ولادته وألقابه، الأدلة على إمامته، كراماته، دوره في كربلاء، رسائله وخطبه ومواقفه ووفاته.",
		url: "/his-life",
		type: "website",
		images: ["/images/al-abid.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "سيرة الإمام زين العابدين عليه السلام وتراثه",
		description:
			"صفحة جامعة لسيرة الإمام علي بن الحسين زين العابدين السجاد عليه السلام: ولادته، إمامته، كراماته، دوره في كربلاء، ورسائله وخطبه ووفاته.",
		images: ["/images/al-abid.jpg"],
	},
}

const sectionNav = [
	{ href: "#journey", label: "رحلة حياته" },
	{ href: "#titles", label: "ألقابه" },
	{ href: "#stories", label: "مشاهد من حياته" },
	{ href: "#words", label: "من كلامه" },
	{ href: "#circle", label: "من حوله" },
	{ href: "#sources", label: "النصوص الكاملة" },
]

const card = "rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
const moreLink =
	"inline-flex items-center gap-1 font-semibold text-primary hover:underline dark:text-Muharram_primary"

function SectionHeader({ title, text }: { title: string; text: string }) {
	return (
		<div className="mb-10 space-y-4">
			<HeaderSections title={title} />
			<p className="max-w-3xl text-lg leading-loose text-gray-600 md:text-xl">{text}</p>
		</div>
	)
}

function Route({ stops }: { stops: string[] }) {
	return (
		<ol className="mt-5 flex flex-wrap items-center gap-2" aria-label="مسار الرحلة">
			{stops.map((stop, i) => (
				<li key={`${stop}-${i}`} className="flex items-center gap-2">
					<span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary">
						<MapPin className="h-3.5 w-3.5" />
						{stop}
					</span>
					{i < stops.length - 1 && (
						<ArrowLeft className="h-4 w-4 text-secondary dark:text-Muharram_secondary" />
					)}
				</li>
			))}
		</ol>
	)
}

export default async function Page() {
	const chapters = await getChapters()

	return (
		<div className="pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "سيرة الإمام زين العابدين (عليه السلام)", url: "#" },
				]}
			/>

			{/* Hero: who he was, in one screen */}
			<section className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
				<div>
					<p className="inline-block rounded-full bg-secondary/15 px-4 py-1 text-sm font-semibold text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary">
						سيرة الإمام الرابع من أئمة أهل البيت (عليهم السلام)
					</p>
					<h1 className="mt-5 text-primary dark:text-Muharram_primary">
						<span className="block text-hero font-bold">زين العابدين</span>
						<span className="mt-3 block text-2xl font-semibold text-gray-700 md:text-3xl">
							الإمام علي بن الحسين (عليه السلام)
						</span>
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-loose text-gray-700 md:text-xl md:leading-loose">
						{intro}
					</p>
					<nav aria-label="أقسام الصفحة" className="mt-8 flex flex-wrap gap-2">
						{sectionNav.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_primary/30 dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white md:text-base"
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>

				<aside className={`${card} overflow-hidden`} aria-labelledby="facts-title">
					<h2
						id="facts-title"
						className="flex items-center gap-3 bg-primary px-6 py-4 text-lg font-bold text-white dark:bg-Muharram_primary"
					>
						<IdCard className="h-5 w-5 text-secondary dark:text-Muharram_secondary" />
						بطاقة تعريفية
					</h2>
					<dl className="divide-y divide-gray-100">
						{facts.map((fact) => (
							<div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-3 px-6 py-3">
								<dt className="text-sm font-semibold leading-7 text-secondary_dark dark:text-Muharram_secondary">
									{fact.label}
								</dt>
								<dd className="leading-7 text-gray-800">{fact.value}</dd>
							</div>
						))}
					</dl>
				</aside>
			</section>

			<div className="mt-24 space-y-28">
				{/* Journey: his life as six stages */}
				<section id="journey" className="scroll-mt-32">
					<SectionHeader
						title="رحلة حياته"
						text="سبع وخمسون سنة، بدأت في المدينة وانتهت فيها، مرّت بكربلاء والكوفة والشام. هذه محطاتها الكبرى باختصار، ومع كل محطة رابط إلى نصوصها الكاملة."
					/>
					<ol className="relative max-w-4xl space-y-8 before:absolute before:bottom-4 before:right-[1.05rem] before:top-4 md:before:right-[1.35rem] before:w-0.5 before:bg-secondary/40 dark:before:bg-Muharram_secondary/30">
						{eras.map((era, i) => (
							<li key={era.title} className="relative pr-11 md:pr-16">
								<span className="absolute right-0 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold md:h-11 md:w-11 md:text-lg text-white ring-4 ring-yellow-50 dark:bg-Muharram_primary">
									{arabicNumber(i + 1)}
								</span>
								<article className={`${card} p-5 md:p-8`}>
									<div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
										<span className="rounded-full bg-secondary/15 px-3 py-1 text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary">
											{era.period}
										</span>
										{era.age && (
											<span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
												عمره {era.age}
											</span>
										)}
									</div>
									<h3 className="mt-3 text-2xl font-bold text-primary dark:text-Muharram_primary">
										{era.title}
									</h3>
									<p className="mt-3 text-lg leading-loose text-gray-700">{era.text}</p>
									{era.route && <Route stops={era.route} />}
									{era.quote && (
										<figure className="mt-5 rounded-2xl bg-secondary/5 p-5 dark:bg-Muharram_secondary/5">
											<blockquote className="text-lg font-semibold leading-loose text-gray-800">
												«{era.quote.text}»
											</blockquote>
											<figcaption className="mt-2 text-sm text-secondary_dark dark:text-Muharram_secondary">
												{era.quote.by}
											</figcaption>
										</figure>
									)}
									{era.events && (
										<ul className="mt-5 space-y-2">
											{era.events.map((event) => (
												<li key={event.href}>
													<Link
														href={event.href}
														className="group flex items-start gap-2 leading-8 text-gray-700 hover:text-primary dark:hover:text-Muharram_primary"
													>
														<span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-secondary dark:bg-Muharram_secondary" />
														<span className="group-hover:underline">{event.text}</span>
													</Link>
												</li>
											))}
										</ul>
									)}
									<Link href={era.link.href} className={`${moreLink} mt-6`}>
										{era.link.label}
										<ArrowLeft className="h-4 w-4" />
									</Link>
								</article>
							</li>
						))}
					</ol>
				</section>

				{/* Titles: what people called him, and why */}
				<section id="titles" className="scroll-mt-32">
					<SectionHeader
						title="ألقابه: لماذا سُمّي بها؟"
						text="لكل لقب من ألقابه قصة تكشف جانباً من شخصيته. اختر لقباً لتعرف سببه ومصدره."
					/>
					<TitlesExplorer titles={titles} />
					<div className="mt-8 grid gap-6 md:grid-cols-2">
						<div className={`${card} p-6`}>
							<h3 className="text-lg font-bold text-primary dark:text-Muharram_primary">
								ألقاب أخرى ذكرتها المصادر
							</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{otherTitles.map((name) => (
									<li key={name} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
										{name}
									</li>
								))}
							</ul>
						</div>
						<div className={`${card} p-6`}>
							<h3 className="text-lg font-bold text-primary dark:text-Muharram_primary">كناه</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{kunyas.names.map((name) => (
									<li
										key={name}
										className="rounded-full bg-secondary/10 px-3 py-1 font-semibold text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary"
									>
										{name}
									</li>
								))}
							</ul>
							<p className="mt-4 text-gray-600">{kunyas.note}</p>
						</div>
					</div>
				</section>

				{/* Stories: short retellings, filterable by theme */}
				<section id="stories" className="scroll-mt-32">
					<SectionHeader
						title="مشاهد من حياته"
						text="قصص قصيرة من سيرته كما رواها معاصروه والمؤرخون، مروية بلغة ميسّرة. لكل مشهد رابط إلى روايته الكاملة بسندها ومصدرها."
					/>
					<Stories stories={stories} />
				</section>

				{/* Words: sermons along the captivity route, then letters */}
				<section id="words" className="scroll-mt-32">
					<SectionHeader
						title="من كلامه"
						text="بعد كربلاء لم يبقَ مع الإمام سلاح غير الكلمة، فجعل من طريق السبي منبراً. وفي المدينة واصل برسائله ومواعظه."
					/>

					<figure className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white dark:bg-Muharram_primary md:p-12">
						<Quote
							aria-hidden
							className="absolute left-6 top-6 h-24 w-24 rotate-180 text-white/10 md:h-32 md:w-32"
						/>
						<blockquote className="relative max-w-4xl text-2xl font-bold leading-relaxed md:text-4xl md:leading-relaxed">
							«{featuredQuote.text}»
						</blockquote>
						<figcaption className="relative mt-6 flex flex-wrap items-center justify-between gap-4">
							<span className="text-secondary dark:text-white/70">{featuredQuote.context}</span>
							<Link
								href={featuredQuote.href}
								className="inline-flex items-center gap-1 font-semibold text-white hover:underline"
							>
								المشهد كاملاً
								<ArrowLeft className="h-4 w-4" />
							</Link>
						</figcaption>
					</figure>

					<h3 className="mt-14 text-2xl font-bold text-primary dark:text-Muharram_primary">
						خطبه في رحلة السبي
					</h3>
					<ol className="mt-6 grid gap-6 lg:grid-cols-3">
						{captivityStops.map((stop, i) => (
							<li key={stop.place} className={`${card} p-6`}>
								<div className="flex items-center gap-3">
									<span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 font-bold text-secondary_dark dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary">
										{arabicNumber(i + 1)}
									</span>
									<h4 className="flex items-center gap-1 text-xl font-bold text-primary dark:text-Muharram_primary">
										<MapPin className="h-5 w-5" />
										{stop.place}
									</h4>
								</div>
								<ul className="mt-5 space-y-5">
									{stop.items.map((item) => (
										<li key={item.title} className="border-r-2 border-secondary/40 pr-4 dark:border-Muharram_secondary/30">
											<Link
												href={item.href}
												className="font-bold text-gray-900 hover:text-primary hover:underline dark:hover:text-Muharram_primary"
											>
												{item.title}
											</Link>
											<p className="mt-1 leading-loose text-gray-600">{item.text}</p>
										</li>
									))}
								</ul>
							</li>
						))}
					</ol>

					<h3 className="mt-14 text-2xl font-bold text-primary dark:text-Muharram_primary">
						رسائله ومواعظه
					</h3>
					<ul className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
						{letters.map((letter) => (
							<li
								key={letter.title}
								className={
									letter.external
										? "flex flex-col rounded-3xl bg-secondary/10 p-6 ring-1 ring-secondary/30 dark:bg-Muharram_secondary/5 dark:ring-Muharram_secondary/20"
										: `${card} flex flex-col p-6`
								}
							>
								<h4 className="flex items-center gap-2 text-lg font-bold text-primary dark:text-Muharram_primary">
									<ScrollText className="h-5 w-5 text-secondary dark:text-Muharram_secondary" />
									{letter.title}
								</h4>
								<p className="mt-3 flex-1 leading-loose text-gray-700">{letter.text}</p>
								<Link href={letter.href} className={`${moreLink} mt-4`}>
									{letter.external ? "اقرأها في المكتبة" : "النص الكامل"}
									<ArrowLeft className="h-4 w-4" />
								</Link>
							</li>
						))}
					</ul>
				</section>

				{/* Circle: family and companions */}
				<section id="circle" className="scroll-mt-32">
					<SectionHeader
						title="من حوله"
						text="من أهل بيته وأصحابه الذين حملوا عنه العلم وشهدوا له."
					/>
					<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{people.map((person) => (
							<li key={person.name} className={`${card} flex flex-col p-6`}>
								<div className="flex items-center gap-4">
									<span
										aria-hidden
										className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white dark:bg-Muharram_primary"
									>
										{person.initial}
									</span>
									<div>
										<h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
										<p className="text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
											{person.relation}
										</p>
									</div>
								</div>
								<p className="mt-4 flex-1 leading-loose text-gray-700">{person.text}</p>
								<Link href={person.href} className={`${moreLink} mt-4`}>
									المزيد عنه
									<ArrowLeft className="h-4 w-4" />
								</Link>
							</li>
						))}
					</ul>
				</section>

				{/* Sources: the full narrations, chapter by chapter */}
				<section id="sources" className="scroll-mt-32">
					<SectionHeader
						title="النصوص الكاملة من المصادر"
						text="كل ما سبق مأخوذ من هذه الفصول، وفيها الروايات كما وردت في كتب الحديث والتاريخ بأسانيدها ومصادرها، للقارئ الذي يريد الرجوع إلى النص الأصلي."
					/>
					<ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
						{chapters.map((chapter, i) => (
							<li key={chapter.slug}>
								<Link
									href={`/his-life/${chapter.slug}`}
									className={`${card} group flex h-full flex-col p-6 transition-shadow hover:shadow-lg`}
								>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<span className="font-semibold text-secondary_dark dark:text-Muharram_secondary">
											الفصل {arabicNumber(i + 1)}
										</span>
										<span className="inline-flex items-center gap-1">
											<BookOpen className="h-4 w-4" />
											{readingTimeLabel(chapter.readingMinutes)}
										</span>
									</div>
									<h3 className="mt-3 text-xl font-bold text-primary group-hover:underline dark:text-Muharram_primary">
										{chapter.title}
									</h3>
									<p className="mt-3 line-clamp-3 leading-loose text-gray-600">{chapter.summary}</p>
								</Link>
							</li>
						))}
					</ol>
				</section>
			</div>
		</div>
	)
}
