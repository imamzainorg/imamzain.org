import Image from "next/image"
import Link from "next/link"
import {
	ArrowLeft,
	Award,
	BadgeDollarSign,
	BookOpen,
	Calendar,
	Calendar1,
	CalendarX,
	Crown,
	Download,
	Globe,
	Palette,
	Star,
	Trophy,
	type LucideIcon,
} from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, outlineButton, photoFrame, solidButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { ContestRules } from "../components/contest-rules"
import { ClosedNotice, ContestBadge, Feature, IconRing, Note } from "../components/contest-ui"

// Types
interface CalligraphyType {
	id: string
	name: string
	text: string
	requirement: string
	penSize: string
}

interface TimelineEvent {
	icon: LucideIcon
	title: string
	date: string
	type: "announcement" | "deadline"
}

interface Person {
	image: string
	name: string
	subtitle?: string
}

interface PersonnelSection {
	label: string
	persons: Person[]
}

interface PrizeValues {
	first: string
	second: string
	third: string
}

// Constants
const CALLIGRAPHY_TYPES: CalligraphyType[] = [
	{
		id: "thuluth-jali",
		name: "الثلث الجلي",
		text: "اللَّهُمَّ فَصَلِّ عَلَى مُحَمَّدٍ أَمِينِكَ عَلَى وَحْيِكَ وَنَجِيبِكَ مِنْ خَلْقِكَ وَصَفِيِّكَ مِنْ عِبَادِكَ إِمَامِ الرَّحْمَةِ وقَائِدِ الْخَيْرِ ومِفْتَاحِ الْبَرَكَةِ",
		requirement:
			"يجب ان لا يقل قياس القلم في خط الثلث الجلي عن (٥) ملم وللمتسابق حرية الابتكار في التكوين.",
		penSize: "٥ ملم",
	},
	{
		id: "thuluth-normal",
		name: "الثلث العادي",
		text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وآلِه ووَفِّقْنَا فِي يَوْمِنَا هَذَا ولَيْلَتِنَا هَذِه وفِي جَمِيعِ أَيَّامِنَا لِاسْتِعْمَالِ الْخَيْرِ وهِجْرَانِ الشَّرِّ وشُكْرِ النِّعَمِ وَاتِّبَاعِ السُّنَنِ وَمُجَانَبَةِ الْبِدَعِ والأَمْرِ بِالْمَعْرُوفِ والنَّهْيِ عَنِ الْمُنْكَرِ وحِيَاطَةِ الإسْلَامِ وانْتِقَاصِ الْبَاطِلِ وإِذْلَالِه ونُصْرَةِ الْحَقِّ وإِعْزَازِه وإِرْشادِ الضَّالِّ ومُعَاوَنَةِ الضَّعِيفِ وَإِدْرَاكِ اللّهِيفِ.",
		requirement:
			"يجب ان لا يزيد قياس القلم في خط الثلث العادي عن (٢,٥) ملم ويكتب بشكل سطور.",
		penSize: "٢,٥ ملم",
	},
	{
		id: "naskh",
		name: "النسخ",
		text: "يا مَنْ تُحَلُّ بِهِ عُقَدُ الْمَكَارِهِ وَيا مَنْ يُفْثَأُ بِهِ حَدُّ الشَّدَائِدِ وَيا مَنْ يُلْتَمَسُ مِنْهُ الَمخْرَجُ إلى رَوْحِ الْفَرَجِ ذَلَّتْ لِقُدْرَتِكَ الصِّعابُ وَتَسَبَّبَتْ بِلُطْفِكَ الْأَسْبابُ وَجَرى بِقُدْرَتِكَ الْقَضاءُ وَمَضَتْ عَلى إِرادَتِكَ الْأشْياءُ فَهِيَ بِمَشِيَّتِكَ دُونَ قَوْلِكَ مُؤْتَمِرَةٌ وَبِإِرادَتِكَ دُونَ نَهْيِكَ مُنْزَجِرَةٌ أَنْتَ الْمَدْعُوُّ لِلْمُهِمّاتِ وأَنْتَ الْمَفْزَعُ في المُلِمّاتِ لَا يَنْدَفِعُ مِنْها إلّا ما دَفَعْتَ وَلَا يَنْكَشٍفُ منْها إلّا ما كَشَفْتَ وَقَدْ نَزَلَ بي يا رَبِّ ما قَدْ تَكأدَني ثِقْلُهُ وألَمّ بي ما قَدْ بَهَظَني حَمْلُهُ وَبِقُدْرَتِكَ أوردته عَلَيَّ وَبِسُلْطانِكَ وَجَّهْتَهُ إليّ فَلا مُصْدِرَ لِما أوردت وَلا صارف لما وَجُهْتَ وَلَا فَاتح لما أغلقت وَلَا مُغْلِقَ لِما فَتَحْتَ وَلا مُيَسِّرَ لِما عَسَّرْتَ وَلا ناصِرَ لِمَنْ خَذَلْتَ فَصَلِّ عَلى مُحَمَّد وَآلِهِ وَاْفْتَحْ لي يا رَبِّ بابَ الْفَرَجِ بِطَولِكَ وَاكْسِرْ عَنّي سُلْطانَ الْهَمِّ بِحَوْلِكَ وأنلني حُسْنَ النَّظَرِ فيما شَكُوْتُ وأذقني حَلاوَةَ الصُّنْعِ فيما سألت وَهَبْ لي مِنْ لَدُنْكَ رَحْمةً وفرجًا هنيئًا",
		requirement:
			"يجب ان لا يزيد قياس القلم في خط النسخ عن (١) ملم للمتسابق حرية الابتكار في التكوين",
		penSize: "١ ملم",
	},
	{
		id: "nastaliq",
		name: "النستعليق",
		text: `هَذا الَّذي تَعرِفُ البَطحاءُ وَطأَتَهُ
وَالبَيتُ يَعرِفُهُ وَالحِلُّ وَالحَرَمُ
هَذا ابنُ خَيرِ عِبادِ اللَهِ كُلِّهِمُ
هَذا التَقِيُّ النَقِيُّ الطاهِرُ العَلَمُ
هَذا ابنُ فاطِمَةٍ إِن كُنتَ جاهِلَهُ
بِجَدَّهِ أَنبِياءُ اللَهِ قَد خُتِموا
وَلَيسَ قَولُكَ مَن هَذا بِضائِرِهِ
العُربٌ تَعرِفُ مَن أَنكَرتَ وَالعَجَمُ
كِلتا يَدَيهِ غِياثٌ عَمَّ نَفعُهُما
يُستَوكَفانِ وَلا يَعروهُما عَدَمُ
سَهلُ الخَليقَةِ لا تُخشى بَوادِرُهُ
يَزينُهُ اثنانِ حُسنُ الخَلقِ وَالشِيَمُ
حَمّالُ أَثقالِ أَقوامٍ إِذا افتُدِحوا
حُلوُ الشَمائلِ تَحلو عِندَهُ نَعَمُ
ما قالَ لا قَطُّ إِلّا في تَشَهُّدِهِ
لَولا التَشَهُّدُ كانَت لاءَهُ نَعَمُ`,
		requirement:
			"يجب ان لا يقل قياس القلم في خط النستعليق عن (۲) ملم للمتسابق حرية الابتكار في التكوين",
		penSize: "۲ ملم",
	},
	{
		id: "diwani",
		name: "الديواني",
		text: "فَحَقُّ أُمِّكَ، فَأَنْ تَعْلَمَ أَنَّهَا حَمَلَتكَ حَيْثُ لا يَحْمِلُ أَحَدٌ أَحَدًا وَأَطْعَمَتكَ مِنْ ثَمَرَةِ قَلْبها مَا لا يُطْعِمُ أَحَدٌ أَحَدًا، وَأَنَّهَا وَقَتكَ بسَمْعِهَا وبَصَرِهَا ويَدِهَا وَرِجْلها وَشَعْرِهَا وبَشَرِهَا وَجَمِيعِ جَوَارِحِهَا مُسْتَبشِرَةً بذَلِكَ، فَرِحَةً مُوَابلَةً، مُحْتَمِلَةً لِما فِيهِ مَكْرُوهُها وَأَلَمُها وثِقْلُها وَغَمُّهَا حَتَّى دَفَعَتهَا عَنْكَ يَدُ القُدْرَةِ وَأَخرَجَتكَ إلَى الأَرضِ فَرَضِيَتْ أَنْ تَشْبَعَ وتجُوعُ هِيَ، وَتَكْسُوكَ وَتَعْرَى، وَتُرْوِيكَ وَتَظْمَأ، وَتُظِلُّكَ وَتَضْحَى، وَتُنَعِّمَكَ ببُؤْسِهَا، وَتُلَذِّذُكَ بالنَّوْمِ بأَرَقِهَا، وَكَانَ بَطْنُهَا لَكَ وِعَاءً، وَحِجْرُهَا لَكَ حِوَاءً ، وثَدْيُهَا لَكَ سِقَاءً، وَنَفْسُهَا لَكَ وِقَاءً، تُبَاشِرُ حَرَّ الدُّنَيا وبَرْدِهَا لَكَ وَدُونَكَ، فَتَشْكُرَهَا عَلَى قَدْرِ ذَلِكَ وَلا تَقْدِرُ عَلَيْهِ إلّا بعَونِ اللَّهِ وَتَوفِيقِهِ.",
		requirement:
			"يجب ان الا يقل قياس القلم في خط الديواني عن (١,٥) ملم وللمتسابق حرية الابتكار في التكوين",
		penSize: "١,٥ ملم",
	},
]

const TIMELINE_EVENTS: TimelineEvent[] = [
	{
		icon: Calendar1,
		title: "اول يوم في المسابقة",
		date: "١١ / ٤ / ٢٠٢٥م",
		type: "announcement",
	},
	{
		icon: CalendarX,
		title: "آخر يوم في المسابقة",
		date: "٥ / ٣ / ٢٠٢٦م",
		type: "deadline",
	},
]

const prizeCategories = [
	"الثلث الجلي",
	"الثلث العادي",
	"النسخ",
	"الديواني",
	"النستعليق",
]

const prizeValues: PrizeValues = {
	first: "3,000,000 د.ع",
	second: "2,000,000 د.ع",
	third: "1,000,000 د.ع",
}

const PERSONNEL: PersonnelSection[] = [
	{
		label: "لجنة التأسيس والإشراف العام للمسابقة",
		persons: [
			{
				image: "/contests/khat/logo-icon.png",
				name: "السيد غسان الخرسان (دام عزه)",
				subtitle: "رئيس مؤسسة الامام زين العابدين (عليه السلام)",
			},
			{
				image: "/contests/khat/محمد المشرفاوي.jpg",
				name: "الخطاط السيد محمد ياسين المشرفاوي",
				subtitle: "خطاط العتبة الحسينية المقدسة",
			},
		],
	},
	{
		label: "هيئة التحكيم",
		persons: [
			{
				image: "/contests/khat/نبيل الشريفي.jpg",
				name: "الاستاذ الخطاط نبيل الشريفي",
				subtitle: "العراق",
			},
			{
				image: "/contests/khat/صادق الحسيني.jpg",
				name: "الاستاذ الخطاط صادق الحسيني",
				subtitle: "العراق",
			},
			{
				image: "/contests/khat/فرهاد قورلو.jpg",
				name: "الاستاذ الخطاط فرهاد قورلو",
				subtitle: "تركيا",
			},
			{
				image: "/contests/khat/محسن عبادى.jpg",
				name: "الاستاذ الخطاط محسن عبادى",
				subtitle: "ايران",
			},
			{
				image: "/contests/khat/عباس بو مجداد.jpg",
				name: "الاستاذ الخطاط عباس بو مجداد",
				subtitle: "السعودية",
			},
		],
	},
	{
		label: "لجنة تنظيم المسابقة والسكرتارية",
		persons: [
			{
				image: "/contests/khat/عدنان الدلفي.jpg",
				name: "الخطاط عدنان حمد الدلفي",
			},
			{
				image: "/contests/khat/موفق البياتي.jpg",
				name: "الخطاط موفق خورشيد البياتي",
			},
			{
				image: "/contests/khat/حسين الحلو.jpg",
				name: "الخطاط حسين الحلو",
			},
			{
				image: "/contests/khat/اوس البندر.jpg",
				name: "الخطاط أوس البندر",
			},
			{
				image: "/contests/khat/حيدر السياب.jpg",
				name: "الخطاط حيدر السياب",
			},
		],
	},
]


function PrizeTable() {
	const head = ["نوع الخط", "المركز الأول", "المركز الثاني", "المركز الثالث"]
	const cell = "px-4 py-5 text-lg md:text-xl"
	return (
		<div className="overflow-hidden rounded-[28px] border-2 border-primary/20 bg-white/60 dark:border-Muharram_primary/30">
			<div className="overflow-x-auto">
				<table className="w-full min-w-[640px] text-center">
					<thead>
						<tr className="bg-primary text-lg text-white dark:bg-Muharram_primary">
							{head.map((label) => (
								<th key={label} className="px-4 py-5 font-bold">
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{prizeCategories.map((prize) => (
							<tr key={prize} className="border-b border-secondary/30 last:border-0">
								<td className={`${cell} font-bold text-primary dark:text-Muharram_primary`}>{prize}</td>
								<td className={cell}>
									<span className="inline-flex items-center justify-center gap-2 font-bold text-gray-900">
										<Crown className="h-5 w-5 text-secondary" />
										{prizeValues.first}
									</span>
								</td>
								<td className={cell}>
									<span className="inline-flex items-center justify-center gap-2 font-bold text-gray-900">
										<Award className="h-5 w-5 text-secondary" />
										{prizeValues.second}
									</span>
								</td>
								<td className={cell}>
									<span className="inline-flex items-center justify-center gap-2 font-bold text-gray-900">
										<Trophy className="h-5 w-5 text-secondary" />
										{prizeValues.third}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default function Page() {
	return (
		<div className="pb-12">
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "مسابقة الإمام زين العابدين (عليه السلام) الدولية الاولى في الخط العربي",
							url: "#",
						},
					]}
				/>

				<ClosedNotice />

				{/* Hero */}
				<section className="grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
					<Reveal x={60} y={0}>
						<div className="flex flex-wrap gap-3">
							<ContestBadge icon={Globe} text="مسابقة دولية محكمة" />
							<ContestBadge
								icon={Calendar}
								text="إبتدأت في 2025/4/11 وإنتهت  في 2026/3/5"
								strong
							/>
						</div>

						<h1 className="mt-6 text-primary dark:text-Muharram_primary">
							<span className="block text-3xl font-extrabold leading-snug md:text-5xl md:leading-snug">
								مسابقة الإمام زين العابدين (عليه السلام)
							</span>
							<span className="mt-2 block text-2xl font-bold text-secondary_dark dark:text-Muharram_secondary md:text-4xl">
								الدولية الأولى
							</span>
							<span className="mt-3 block text-xl font-semibold text-gray-700 md:text-3xl">
								في الخط العربي
							</span>
						</h1>

						<div className="mt-10 space-y-8">
							<Feature icon={Star} title="إبراز التراث الإسلامي" description="أطلقنا هذه المسابقة لإبراز تراث الإمام زين العابدين (ع) من خلال جماليات الخط العربي، باعتباره وعاءً للمعرفة وجزءاً من الهوية الإسلامية." />
							<Feature icon={BookOpen} title="إحياء النصوص التربوية" description="تهدف المسابقة إلى إحياء نصوص الإمام الأخلاقية والتربوية بخط جميل، وتحفيز الخطاطين لفهم معانيها العميقة." />
							<Feature icon={Palette} title="استلهام الروح النورانية" description="ندعو المبدعين لاستلهام روح هذا التراث النوراني، والتعبير عنه بريشة الخط العربي، ليكون هذا الجهد امتداداً لرسالة الإمام في نشر القيم والمعرفة." />
						</div>

						<div className="mt-10 flex flex-wrap gap-3">
							<Link href="/contests/khat/president-goals/#president-message" className={solidButton}>
								كلمة رئيس المؤسسة
								<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
							</Link>
							<Link href="/contests/khat/president-goals/#goals" className={outlineButton}>
								أهداف المسابقة
								<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
							</Link>
						</div>

						<div className="mt-10 border-t border-secondary/30 pt-6">
							<p className="text-lg leading-loose text-gray-600">يمكنكم تنزيل ملف المسابقة الكامل من خلال الضغط على الرابط أدناه</p>
							<Link
								download
								href="/contests/khat/contest.pdf"
								className="group mt-2 inline-flex items-center gap-3 text-lg font-bold text-primary hover:underline dark:text-Muharram_primary"
							>
								<Download className="h-5 w-5" />
								تنزيل ملف المسابقة الكامل
							</Link>
						</div>
					</Reveal>

					<Reveal x={-60} y={0} delay={0.2}>
						<div className={`${photoFrame} mx-2 shadow-xl`}>
							<Image
								src="/contests/khat/landing.jpg"
								alt="لوكو مسابقة الخط"
								width={600}
								height={600}
								priority
								sizes="(max-width: 1024px) 100vw, 40vw"
								className="h-auto w-full"
							/>
						</div>
					</Reveal>
				</section>

				{/* Timeline */}
				<section className="pt-28">
					<SectionTitle title="فترة المشاركة" className="mb-12" />
					<div className="grid gap-10 sm:grid-cols-2">
						{TIMELINE_EVENTS.map((event) => (
							<Reveal key={event.title} y={24}>
								<div className="flex items-center gap-5">
									<IconRing icon={event.icon} />
									<div>
										<p className="text-lg font-semibold text-gray-600">{event.title}</p>
										<p className="mt-1 text-3xl font-bold text-secondary dark:text-Muharram_secondary md:text-4xl">
											{event.date}
										</p>
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Calligraphy types */}
				<section id="calligraphy-types" className="scroll-mt-32 pt-28">
					<SectionTitle
						title="أنواع الخطوط"
						text="نرجو من كل المتسابقين اختيار الخط والنص وحسب التوجيهات المذكورة أسفل كل خط"
						className="mb-14"
					/>

					<div className="space-y-20">
						{CALLIGRAPHY_TYPES.map((type) => (
							<Reveal key={type.id} y={24}>
								<div className="flex flex-wrap items-baseline justify-between gap-3">
									<h3 className="text-3xl font-bold text-primary dark:text-Muharram_primary md:text-4xl">
										{type.name}
									</h3>
									<p className="font-semibold text-secondary_dark dark:text-Muharram_secondary">
										قياس القلم: <span className="text-primary dark:text-Muharram_primary">{type.penSize}</span>
									</p>
								</div>
								<div className="mt-6 rounded-[40px] border border-primary/30 px-6 py-10 text-center shadow-lg shadow-primary/10 dark:border-Muharram_primary/30 md:px-14">
									<p className="whitespace-pre-line text-xl leading-[2.4] text-gray-800 md:text-2xl md:leading-[2.4]">
										{type.text}
									</p>
								</div>
								<div className="mt-6">
									<Note>{type.requirement}</Note>
								</div>
							</Reveal>
						))}
					</div>
				</section>

				{/* Conditions */}
				<section className="pt-28">
					<SectionTitle title="شروط المسابقة" className="mb-12" />
					<ContestRules />
				</section>

				{/* Prizes */}
				<section className="pt-28">
					<SectionTitle title="الجوائز والمحفزات" className="mb-12" />
					<PrizeTable />

					<div className="mt-14 grid gap-12 md:grid-cols-2">
						<div className="flex items-start gap-5">
							<IconRing icon={BadgeDollarSign} />
							<div>
								<h3 className="text-xl font-bold text-primary dark:text-Muharram_primary">
									جوائز تقديرية إضافية
								</h3>
								<p className="mt-2 text-lg leading-loose text-gray-700">وسيتم منح خمس جوائز تقديرية كل منها بقدر ٢٥٠,٠٠٠ د.ع لكل نوع من الأنواع الخمسة لأفضل المتسابقين الذين يلون الفائزين الثلاثة الأوائل.</p>
							</div>
						</div>
						<div>
							<p className="mb-3 text-lg font-bold text-secondary_dark dark:text-Muharram_secondary">
								ملاحظة مهمة
							</p>
							<Note>تصرف الجوائز بالدينار العراقي وتحول قيمة الجائزة بالنسبة للفائزين الأجانب إلى العملات المتداولة وحسب سعر الصرف في وقته.</Note>
						</div>
					</div>
				</section>

				{/* Personnel */}
				<section className="pt-28">
					{PERSONNEL.map((section, sectionIndex) => (
						<div key={section.label} className={sectionIndex > 0 ? "mt-24" : ""}>
							<SectionTitle title={section.label} className="mb-12" />
							<ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
								{section.persons.map((person, i) => (
									<li key={person.name}>
										<Reveal y={24} delay={(i % 5) * 0.08} className="text-center">
											<Image
												src={person.image}
												alt={person.name}
												width={112}
												height={112}
												className="mx-auto h-28 w-28 rounded-full border-2 border-secondary object-cover p-1 dark:border-Muharram_secondary"
											/>
											<h4 className="mt-4 text-lg font-bold text-primary dark:text-Muharram_primary">
												{person.name}
											</h4>
											{person.subtitle && (
												<p className="mt-1 text-gray-600">{person.subtitle}</p>
											)}
										</Reveal>
									</li>
								))}
							</ul>
						</div>
					))}
				</section>
			</div>
		</div>
	)
}
