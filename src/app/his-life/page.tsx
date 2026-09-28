import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import AnimatedQuote from "./_components/animated-quote"
import { MoreLink, SectionTitle, TitleIcon, outlinePanel, shieldPanel } from "./_components/brand"
import CaptivityRoute from "./_components/captivity-route"
import { Reveal } from "./_components/motion"
import Stories from "./_components/stories"
import Timeline from "./_components/timeline"
import TitlesExplorer from "./_components/titles-explorer"
import {
	captivityStops,
	eras,
	allTitles,
	facts,
	featuredQuote,
	huqooq,
	intro,
	kunyas,
	letters,
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

const solidButton =
	"group inline-flex items-center gap-3 rounded-xl border-2 border-primary bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 dark:border-Muharram_primary dark:bg-Muharram_primary"
const outlineButton =
	"group inline-flex items-center gap-3 rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_primary dark:text-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white"

export default async function Page() {
	const chapters = await getChapters()

	return (
		<div className="pb-12">
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "سيرة الإمام زين العابدين (عليه السلام)", url: "#" },
					]}
				/>

				{/* Hero: who he was, in one screen */}
				<section className="grid items-center gap-14 lg:grid-cols-[3fr_2fr]">
					<Reveal x={60} y={0}>
						<p className="flex items-center gap-2 font-semibold text-secondary_dark dark:text-Muharram_secondary">
							<TitleIcon className="w-3" />
							{intro.heading}
						</p>
						<h1 className="mt-4 text-primary dark:text-Muharram_primary">
							<span className="block text-hero font-bold">زين العابدين</span>
							<span className="mt-3 block text-2xl font-semibold text-gray-700 md:text-3xl">
								الإمام علي بن الحسين (عليه السلام)
							</span>
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-loose text-gray-700 md:text-xl md:leading-loose">
							{intro.text}
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<a href="#journey" className={solidButton}>
								<span className="h-2 w-2 rounded-full bg-secondary dark:bg-Muharram_secondary" />
								ابدأ رحلة حياته
							</a>
							<a href="#stories" className={outlineButton}>
								مشاهد من حياته
								<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
							</a>
						</div>
					</Reveal>

					<Reveal x={-60} y={0} delay={0.2}>
						<aside className={`${shieldPanel} p-8 md:p-10`} aria-labelledby="facts-title">
							<h2 id="facts-title" className="flex items-center gap-3 text-xl font-bold">
								<TitleIcon className="w-3" />
								بطاقة تعريفية
							</h2>
							<dl className="mt-4">
								{facts.map((fact) => (
									<div
										key={fact.label}
										className="grid grid-cols-[6rem_1fr] gap-3 border-b border-white/10 py-3 last:border-0"
									>
										<dt className="text-sm font-semibold leading-7 text-secondary dark:text-white/60">
											{fact.label}
										</dt>
										<dd className="leading-7 text-white">{fact.value}</dd>
									</div>
								))}
							</dl>
						</aside>
					</Reveal>
				</section>
			</div>

			{/* Journey: the stages of his life, drawn as you scroll */}
			<section id="journey" className="container scroll-mt-32 pt-28">
				<SectionTitle
					title="رحلة حياته"
					text="محطات من حياته كما وردت في المصادر، ومع كل محطة رابط إلى نصوصها الكاملة."
				/>
				<Timeline eras={eras} />
			</section>

			{/* Titles: a dark band like the home page's services section */}
			<section id="titles" className="relative mt-28 scroll-mt-24 overflow-hidden bg-[#101c1a] py-20 md:py-28">
				<div aria-hidden className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04]" />
				<div className="container relative">
					<SectionTitle
						light
						title="ألقابه وكناه"
						text="اختر لقباً لتقرأ ما ورد فيه في المصادر."
					/>
					<TitlesExplorer titles={titles} />
					<div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
						<figure>
							<h3 className="font-bold text-secondary dark:text-white">ألقابه</h3>
							<blockquote className="mt-3 text-lg leading-loose text-white/80">{allTitles.text}</blockquote>
							<figcaption className="mt-2 text-sm text-white/50">{allTitles.source}</figcaption>
						</figure>
						<div>
							<h3 className="font-bold text-secondary dark:text-white">كناه</h3>
							{kunyas.map((kunya) => (
								<figure key={kunya.text} className="mt-3">
									<blockquote className="text-lg leading-loose text-white/80">{kunya.text}</blockquote>
									<figcaption className="mt-1 text-sm text-white/50">{kunya.source}</figcaption>
								</figure>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Stories: a carousel of passages from the narrations */}
			<section id="stories" className="container scroll-mt-32 pt-28">
				<SectionTitle
					title="مشاهد من حياته"
					text="مقتطفات من الروايات كما وردت في المصادر. اسحب لتتصفحها، ولكل مشهد رابط إلى روايته الكاملة بسندها."
				/>
				<Stories stories={stories} />
			</section>

			{/* Featured words over the salutation calligraphy */}
			<section
				id="words"
				className="relative mt-24 scroll-mt-24 bg-[url('/images/imam-legacy-bg-symbol.jpg')] bg-cover bg-center"
			>
				<div className="bg-[#101c1a]/80 py-24 backdrop-blur-[2px] md:py-32">
					<div className="container flex flex-col items-center text-center">
						<TitleIcon className="w-5" />
						<AnimatedQuote
							text={featuredQuote.text}
							className="mt-8 max-w-4xl text-3xl font-bold leading-relaxed text-white md:text-5xl md:leading-relaxed"
						/>
						<p className="mt-6 text-lg text-secondary dark:text-white/70">
							{featuredQuote.title} · {featuredQuote.source}
						</p>
						<MoreLink href={featuredQuote.href} light className="mt-4">
							المشهد كاملاً
						</MoreLink>
					</div>
				</div>
			</section>

			{/* Sermons along the captivity route, then letters */}
			<section className="container pt-24">
				<SectionTitle
					title="من كلامه"
					text="من خطبه ورسائله كما وردت في المصادر."
				/>
				<h3 className="mb-12 text-2xl font-bold text-gray-800">خطبه في رحلة السبي</h3>
				<CaptivityRoute stops={captivityStops} />

				<h3 className="mb-8 mt-24 text-2xl font-bold text-gray-800">رسائله ومواعظه</h3>
				<Reveal>
					<div className={`${outlinePanel} relative p-8 md:p-12 lg:pl-80`}>
						<h4 className="text-3xl font-bold text-primary dark:text-Muharram_primary">{huqooq.title}</h4>
						<p className="mt-4 max-w-2xl text-lg leading-loose text-gray-700">{huqooq.text}</p>
						<Link href={huqooq.href} className={`${outlineButton} mt-6`}>
							اقرأها في المكتبة
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						</Link>
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
								رسالة
								<br />
								الحقوق
							</span>
						</div>
					</div>
				</Reveal>
				<ul className="mt-10 grid gap-x-16 md:grid-cols-2">
					{letters.map((letter, i) => (
						<li key={letter.title}>
							<Reveal y={20} delay={(i % 2) * 0.1}>
								<Link href={letter.href} className="group block border-b border-secondary/30 py-6">
									<span className="flex items-center gap-3 text-xl font-bold text-primary dark:text-Muharram_primary">
										<TitleIcon className="w-2.5" />
										{letter.title}
										<ArrowLeft className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
									</span>
									<span className="mt-2 block text-lg leading-loose text-gray-700">{letter.text}</span>
									<span className="mt-1 block text-sm text-secondary_dark dark:text-Muharram_secondary">
										{letter.source}
									</span>
								</Link>
							</Reveal>
						</li>
					))}
				</ul>
			</section>

			{/* Circle: family and companions */}
			<section id="circle" className="container scroll-mt-32 pt-28">
				<SectionTitle title="من حوله" text="من أبرز أصحابه ومعاصريه." />
				<ul className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
					{people.map((person, i) => (
						<li key={person.name}>
							<Reveal y={30} delay={(i % 3) * 0.12} className="flex gap-5">
								<span
									aria-hidden
									className="flex h-20 w-20 shrink-0 items-center justify-center bg-[url('/shapes/ziara-bg.svg')] bg-contain bg-center bg-no-repeat text-3xl font-bold text-white dark:bg-[url('/shapes/ziara-bg_Muharram.svg')]"
								>
									{person.initial}
								</span>
								<div>
									<h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
									<p className="mt-1 font-semibold text-secondary_dark dark:text-Muharram_secondary">
										{person.relation}
									</p>
									<p className="mt-3 text-lg leading-loose text-gray-700">{person.text}</p>
									{person.source && (
										<p className="mt-1 text-sm text-secondary_dark dark:text-Muharram_secondary">{person.source}</p>
									)}
									<MoreLink href={person.href} className="mt-3">
										المزيد عنه
									</MoreLink>
								</div>
							</Reveal>
						</li>
					))}
				</ul>
			</section>

			{/* Sources: the full narrations, as a table of contents */}
			<section id="sources" className="container scroll-mt-32 pt-28">
				<SectionTitle
					title="النصوص الكاملة من المصادر"
					text="الروايات كاملة كما وردت في كتب الحديث والتاريخ بأسانيدها ومصادرها."
				/>
				<Reveal>
					<div className={`${outlinePanel} px-6 py-4 md:px-12 md:py-8`}>
						<ol className="grid gap-x-14 md:grid-cols-2">
							{chapters.map((chapter, i) => (
								<li key={chapter.slug}>
									<Link
										href={`/his-life/${chapter.slug}`}
										className="group flex items-start gap-4 border-b border-dashed border-secondary/40 py-5"
									>
										<span className="w-9 shrink-0 text-2xl font-bold text-secondary dark:text-Muharram_secondary">
											{arabicNumber(i + 1)}
										</span>
										<span className="flex-1">
											<span className="flex items-center gap-2 text-xl font-bold text-primary dark:text-Muharram_primary">
												{chapter.title}
												<ArrowLeft className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
											</span>
											<span className="mt-1 line-clamp-2 leading-7 text-gray-600">{chapter.description}</span>
										</span>
										<span className="shrink-0 pt-1.5 text-sm text-gray-500">
											{readingTimeLabel(chapter.readingMinutes)}
										</span>
									</Link>
								</li>
							))}
						</ol>
					</div>
				</Reveal>
			</section>
		</div>
	)
}
