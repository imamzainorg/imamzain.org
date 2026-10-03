import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, TitleIcon, photoFrame, solidButton } from "@/components/brand"
import DarkBand from "@/components/dark-band"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"
import { arabicNumber } from "@/lib/format"

export const metadata: Metadata = {
	title: "ملتقى البقيع الثاني: البقيع الهوية والتاريخ",
	description:
		"ملتقى البقيع الثاني تحت شعار «البقيع: الهوية والتاريخ» في 12 شوال 1446هـ، يناقش هدم قبور أئمة البقيع وأبعاده الفكرية والتاريخية، مع محاضرات وجدول أعمال.",
	keywords: [
		"ملتقى البقيع الثاني",
		"البقيع الهوية والتاريخ",
		"هدم قبور البقيع",
		"أئمة البقيع من أهل البيت",
		"ذكرى هدم البقيع",
		"مؤسسة الإمام زين العابدين",
		"محاضرات ملتقى البقيع",
		"البقيع الرمزية الدينية والتاريخية",
	],
	alternates: { canonical: "/baqi-gathering" },
	openGraph: {
		title: 'ملتقى البقيع الثاني تحت شعار "البقيع: الهوية والتاريخ"',
		description:
			"ملتقى علمي تنظمه مؤسسة الإمام زين العابدين للبحوث والدراسات في 12 شوال 1446هـ حول هدم قبور أئمة البقيع وأبعاده الفكرية والتاريخية، مع محاضرات وجدول أعمال ومعرض مصاحب.",
		url: "/baqi-gathering",
		type: "article",
		images: ["/baqi-gathering/albagi.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: 'ملتقى البقيع الثاني تحت شعار "البقيع: الهوية والتاريخ"',
		description:
			"ملتقى علمي تنظمه مؤسسة الإمام زين العابدين في 12 شوال 1446هـ حول هدم قبور أئمة البقيع وأبعاده الفكرية والتاريخية، مع محاضرات وجدول أعمال.",
		images: ["/baqi-gathering/albagi.jpg"],
	},
}

const title = "ملتقى البقيع الثاني"
const slogan = 'تحت شعار "البقيع: الهوية والتاريخ"'
const date = "12 شوال 1446هـ"

const about =
	"نظرًا لأهمية التراث الإسلامي عموماً، وما يحمله البقيع من رمزية دينية وتاريخية، وفي إطار الجهود الرامية إلى التعريف بالبعد الفكري العقائدي والثقافي التاريخي لهذا المعلم الإسلامي المقدس، والذي يمثل مصداقا واضحاً للتعدي على المكانة السامية لأئمة أهل البيت، ويقدم أنموذجا للتعصب العقائدي والتطرف الفكري الذي ما زال المسلمون -قبل غيرهم- يتجرعون منه مرارة العيش وغياب الأمن والأمان، ومحاولةً لتمرير المباني الفقهية الخاصة وطرحها في الواقع العملي على أنها مسلمات دينية وتاريخية؛ للتأثير على وجدان الأمة عموماً. من هنا تسعى مؤسسة الإمام زين العابدين للبحوث والدراسات إلى تركيز الضوء على أهم المفاصل العلمية والثقافية في هذا الحدث المهم في الملتقى الثاني الذي تروم عقده بمناسبة هدم تلك القبور الطواهر في الثامن من شهر شوال."

const objectives = [
	"تحليل تداعيات هدم البقيع من منظور فكري عقائدي، وحضاري اجتماعي، وإبراز أثر ذلك على وعي المجتمع الإسلامي.",
	"إبراز الأهمية الدينية والتاريخية للبقيع بوصفه مدفنًا لأربعة من أئمة أهل البيت وجملة من الصحابة الكرام.",
	"مناقشة الرؤى الفقهية والفكرية المتعلقة بإحياء التراث الإسلامي، وطرح دراسات تحليلية حول مشروعية الحفاظ على المقدسات.",
	"إحياء الهوية الإسلامية عبر دراسة البقيع كنموذج يعكس جدلية العلاقة بين الدين والحضارة ودور المعالم الإسلامية في تشكيل الوعي الجمعي.",
]

const practicalAimsTitle = "الغاية العملية من النشاط:"

const practicalAims = [
	"تعزيز الوعي بأهمية المواقع الإسلامية التاريخية، وفتح آفاق لحوار العلمي حول دورها في حفظ الهوية الإسلامية.",
	"تقديم قراءات تحليلية جديدة تربط بين الماضي والحاضر، وتحث على تبني استراتيجيات تحفظ التراث الإسلامي من الاندثار أو التغييب.",
	"مناقشة القضايا المرتبطة بالبقيع ضمن إطار علمي رصين، يسهم في إثراء الفكر الإسلامي وتعزيز الاهتمام بالمقدسات الدينية كجزء من الهوية الحضارية للأمة.",
]

const speakers = [
	{
		img: "/baqi-gathering/شيخ محمد أل حيدر.jpg",
		alt: "شيخ محمد أل حيدر",
		name: "سماحة الشيخ محمد أل حيدر",
		title: "هدم قبور البقيع... المناشىء الفكرية والتداعيات الإجتماعية",
	},

	{
		img: "/baqi-gathering/الأستاذ الدكتور حسن الحكيم.jpg",
		alt: "الدكتور حسن الحكيم",
		name: "الأستاذ الدكتور حسن الحكيم",
		title: "قبور آل البيت عليهم السلام في التراث الإسلامي بين الحفاظ والتجريف",
	},
	{
		img: "/baqi-gathering/سماحة الشيخ ستار المرشدي.jpg",
		alt: "سماحة الشيخ ستار الجيزاني",
		name: "سماحة الشيخ ستار الجيزاني",
		title: "هدم قبور البقيع: الحدث والحديث",
	},
]

const scheduleItems = [
	{
		time: "9:30 - 9:35",
		title: "قراءة آية من كتاب الله العزيز",
		duration: "5 دقائق",
	},
	{
		time: "9:35 - 9:45",
		title: "كلمة ترحيبية من قبل المؤسسة",
		duration: "10 دقائق",
	},
	{
		time: "9:45 - 9:55",
		title: "كلمة العتبة الحسينية المقدسة",
		duration: "10 دقائق",
	},
	{
		time: "9:55 - 10:55",
		title: "الجلسة البحثية الأولى",
		lectures: [
			{
				title: "المحاضرة الأولى: سماحة العلامة الشيخ محمد آل حيدر دام عزه",
			},
			{
				title: "المحاضرة الثانية: الأستاذ الدكتور حسن الحكيم المحترم",
			},
			{
				title: "المحاضرة الثالثة: سماحة العلامة العلامة الشيخ ستار الجيزاني دام عزه",
			},
		],
		chair: "رئيس الجلسة: د.علي شدهان ياسر",
		duration: "1 ساعة",
	},
	{
		time: "10:55 - 11:25",
		title: "جولة في المعرض",
		duration: "30 دقيقة",
	},
	{
		time: "11:25 - 12:30",
		title: "التهيؤ للصلاة وأدائها",
	},
	{
		time: "12:30 - 1:30",
		title: "التبرك بوجبة غداء",
	},
]

const sidelineItems = [
	{
		title: "معرض الخط التخصصي بالإمام السجاد عليه السلام",
		href: "/contests/khat",
	},
]

const scheduleDay = "يوم الجمعة - 12 شوال"
const scheduleStart =
	"انطلاق فعاليات الجلسة الأولى الساعة 9:30 صباحاً"
const sidelineTitle = "على هامش الملتقى"
const closing =
	"ختام الملتقى بعد التبرك بوجبة الغداء ، انطلاق السيارات التي تقل ضيوف المحافظات البعيدة إلى مكان استراحتهم في كربلاء المقدسة"

// "المحاضرة الأولى: name" becomes a gold label and a plain name.
function splitLabel(text: string) {
	const i = text.indexOf(":")
	if (i === -1) return { label: "", name: text }
	return { label: text.slice(0, i + 1), name: text.slice(i + 1).trim() }
}

const bandText = "text-lg leading-loose text-white/90 md:text-xl md:leading-loose"

// One slot of the day. The research session (the one with lectures) is lifted out of the list.
function ScheduleRow({ item }: { item: (typeof scheduleItems)[number] }) {
	const chair = item.chair ? splitLabel(item.chair) : null
	return (
		<li>
			<Reveal y={20}>
				<div
					className={
						item.lectures
							? "my-5 grid gap-x-8 gap-y-3 rounded-3xl border border-secondary/40 bg-white/[0.05] px-6 py-7 md:grid-cols-[12rem_1fr] md:px-8"
							: "grid gap-x-8 gap-y-3 border-b border-dashed border-white/20 py-6 md:grid-cols-[12rem_1fr]"
					}
				>
					<div className="flex items-baseline justify-between gap-4 md:block">
						<p className="text-xl font-extrabold text-secondary md:text-2xl">{item.time}</p>
						{item.duration && <p className="text-base text-white/60 md:mt-1 md:text-lg">{item.duration}</p>}
					</div>
					<div>
						<h3 className="text-xl font-bold leading-9 text-white md:text-2xl">{item.title}</h3>
						{item.lectures && (
							<ul className="mt-5 space-y-3">
								{item.lectures.map((lecture) => {
									const { label, name } = splitLabel(lecture.title)
									return (
										<li key={lecture.title} className={`flex items-start gap-3 ${bandText}`}>
											<span aria-hidden className="mt-4 h-2 w-2 shrink-0 rounded-full bg-secondary" />
											<span>
												<span className="font-bold text-secondary">{label}</span> {name}
											</span>
										</li>
									)
								})}
							</ul>
						)}
						{chair && (
							<p className="mt-5 text-lg leading-loose text-white/80 md:text-xl md:leading-loose">
								<span className="font-bold text-secondary">{chair.label}</span> {chair.name}
							</p>
						)}
					</div>
				</div>
			</Reveal>
		</li>
	)
}

export default function Page() {
	return (
		<div className="-mb-24">
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: title, url: "/baqi-gathering" },
					]}
				/>

				<PageHeader
					title={title}
					text={slogan}
					className="mb-16"
					actions={
						<>
							<span className="inline-flex items-center gap-3 px-2 py-3 text-xl font-bold text-secondary_dark dark:text-Muharram_secondary">
								<CalendarDays className="h-6 w-6" aria-hidden />
								{date}
							</span>
							<a href="#schedule" className={solidButton}>
								<span className="h-2 w-2 rounded-full bg-secondary dark:bg-Muharram_secondary" />
								جدول الفعاليات
							</a>
						</>
					}
				/>

				<Reveal y={30}>
					<div className={`${photoFrame} mx-2 aspect-[2/1] shadow-xl md:aspect-[3/1] lg:aspect-[1920/455]`}>
						<Image
							src="/baqi-gathering/albagi.jpg"
							alt={`${title}: ${slogan}`}
							width={1920}
							height={455}
							priority
							sizes="(max-width: 1280px) 100vw, 1240px"
							className="h-full w-full object-cover object-[60%_50%] md:object-[40%_50%]"
						/>
					</div>
				</Reveal>
			</div>

			<section id="about" className="container scroll-mt-32 pt-28">
				<div className="grid gap-x-16 lg:grid-cols-[17rem_1fr]">
					<SectionTitle title="عن الملتقى" className="mb-6 lg:mb-0" />
					<Reveal y={24}>
						<p className="max-w-4xl text-xl leading-[2.1] text-gray-800 md:text-[1.35rem] md:leading-[2.2]">{about}</p>
					</Reveal>
				</div>
			</section>

			<DarkBand id="objectives" className="mt-28">
				<SectionTitle light title="أهداف الملتقى" />
				<div className="grid gap-x-20 gap-y-16 lg:grid-cols-[3fr_2fr]">
					<Reveal y={30}>
						<ol>
							{objectives.map((text, i) => (
								<li
									key={text}
									className="flex items-start gap-5 border-b border-dashed border-white/20 py-5 first:pt-0"
								>
									<span className="w-10 shrink-0 text-3xl font-extrabold text-secondary">{arabicNumber(i + 1)}</span>
									<span className={bandText}>{text}</span>
								</li>
							))}
						</ol>
					</Reveal>
					<Reveal y={30} delay={0.12}>
						<h3 className="mb-3 flex items-center gap-3 text-xl font-bold text-secondary md:text-2xl">
							<TitleIcon className="w-3" />
							{practicalAimsTitle}
						</h3>
						<ul>
							{practicalAims.map((text) => (
								<li key={text} className="flex items-start gap-4 border-b border-dashed border-white/20 py-5">
									<span aria-hidden className="mt-4 h-2 w-2 shrink-0 rounded-full bg-secondary" />
									<span className={bandText}>{text}</span>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</DarkBand>

			<section id="speakers" className="container scroll-mt-32 pt-28">
				<SectionTitle title="المحاضرون" />
				<ul className="grid gap-y-16 md:grid-cols-3">
					{speakers.map((speaker, i) => (
						<li key={speaker.name} className={i > 0 ? "md:border-r md:border-dashed md:border-secondary/40" : undefined}>
							<Reveal y={30} delay={i * 0.1} className="flex h-full flex-col items-center px-6 text-center">
								<div className="h-40 w-40 overflow-hidden rounded-full bg-gray-100 outline outline-2 outline-offset-[6px] outline-secondary/60 dark:outline-Muharram_secondary/60 md:h-44 md:w-44">
									<Image
										src={speaker.img}
										alt={speaker.alt}
										width={400}
										height={400}
										sizes="176px"
										className="h-full w-full object-cover"
									/>
								</div>
								<h3 className="mt-10 text-xl font-extrabold leading-9 text-primary dark:text-Muharram_primary md:text-2xl">
									{speaker.name}
								</h3>
								<p className="mt-4 font-semibold text-secondary_dark dark:text-Muharram_secondary">عنوان البحث :</p>
								<p className="mt-1 text-lg leading-loose text-gray-700 md:text-xl md:leading-loose">{speaker.title}</p>
							</Reveal>
						</li>
					))}
				</ul>
			</section>

			<DarkBand id="schedule" className="mt-28">
				<SectionTitle light title="جدول الأعمال" text={scheduleStart} className="mb-8" />
				<p className="mb-6 inline-flex rounded-xl border-2 border-secondary/60 px-5 py-2 text-lg font-bold text-secondary md:text-xl">
					{scheduleDay}
				</p>
				<ol className="max-w-5xl">
					{scheduleItems.map((item) => (
						<ScheduleRow key={item.time} item={item} />
					))}
				</ol>

				<div className="mt-16 border-t border-white/10 pt-12">
					<h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-secondary md:text-2xl">
						<TitleIcon className="w-3" />
						{sidelineTitle}
					</h3>
					<ul className="max-w-5xl">
						{sidelineItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-white/25 px-6 py-5 text-xl font-bold text-white transition-colors hover:border-secondary hover:text-secondary md:text-2xl"
								>
									{item.title}
									<ArrowLeft className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-x-1" />
								</Link>
							</li>
						))}
					</ul>
					<p className="mt-12 max-w-3xl text-lg leading-loose text-white/70 md:text-xl md:leading-loose">{closing}</p>
				</div>
			</DarkBand>
		</div>
	)
}
