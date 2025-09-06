import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { ApplyStepper } from "../components/applicationSteps"
import {
	Calendar1,
	CalendarX,
	Award,
	Trophy,
	Crown,
	Star,
	BadgeDollarSign,
	Palette,
	BookOpen,
	LucideIcon,
	Download,
	ArrowLeft,
} from "lucide-react"

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
		text: "فَحَقِّ أَمَّك،َ فَأَنْ تَعْلَمَ أَنْهَا حَمَلَتِكَ حَيْثُ لَا يَحْمِلُ أَحَدٌ أَحَدًا وَأَطْعَمَتَكَ مِنْ ثَمَرَةِ قَلْبِهَا مَا لَا يُطْعِمُ أَحَدٌ أَحَدًا. وَأَنَّهَا وَفَتَكَ بِسَمُعِهَا وَبَصَرِهَا وَيَدِهَا وَرِجُلَهَا وَشَعْرِهَا مُحْتَمِلَةً لِمَا فِيهِ مَكْرُوهُهَا وَأَلَمُها ويُقْلُهَا وَغَمُهَا حَتَّى وبَشَرِهَا وَجَمِيعِ جَوَارِحِهَا مُسْتَبِشِرَةٌ بِذَلِك،َ فَرِحَةٌ مُوَابِلَّة.ٌ وَتُظِلْكَ وَتَضْحى وَتُنَعْمَكَ بِيُؤْسِهَا، وَتُلَذْذُكَ بِالنَّوْمِ تَشْبَع وتجُوعُ هِي،َّ وَتَكْسُوكَ وَتَعْرَى وَتُرُوبِكَ وَتَطْمَا،ً دَفْعَتِهَا عَنْكَ يَدُ القَدْرَةِ وَأَخْرَجَتِكَ إِلَى الأَرْضِ فَرَضِيَتْ أَنْ بِأَرْقِهَا، وَكَانَ بَطْنُهَا لَكَ وَعَاء،ً وَحِجْرُهَا لَكَ حِوَاءً ، وَ دْيُهَا لَكَ سِقَاء،ُ وَنَفْسُهَا لَكَ وَقَاء، تُبَاشِرُ حَ الدُّنْيَا وَبَرْدِهَا لَكَ وَدُونَك،َ فَتَشْكُرَهَا عَلَى قَدْرٍ ذَلِكَ وَلَا تَقْدِرٌ عَلَيْهِ إِلَّا بعُونِ اللَّهِ وَتُوفِيقِه.ِ",
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
		date: "٥ / ١ / ٢٠٢٦م",
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

// Modern Components
function GradientCard({
	children,
	className = "",
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 ${className}`}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-60"></div>
			<div className="relative">{children}</div>
		</div>
	)
}

function IconWrapper({
	icon: Icon,
	size = "md",
}: {
	icon: LucideIcon
	size?: "sm" | "md" | "lg"
}) {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	}

	return (
		<div className="relative">
			<div className="absolute inset-0 bg-primary/20 rounded-full blur-sm"></div>
			<div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-full p-3 shadow-lg">
				<Icon
					className={`${sizeClasses[size]} text-white`}
					strokeWidth={1.5}
				/>
			</div>
		</div>
	)
}

function ModernBadge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
	return (
		<div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-2xl text-sm font-semibold shadow-sm">
			<Icon className="w-5 h-5" strokeWidth={2} />
			{text}
		</div>
	)
}

function FeatureHighlight({
	icon: Icon,
	title,
	description,
}: {
	icon: LucideIcon
	title: string
	description: string
}) {
	return (
		<div className="group flex items-start gap-6 p-2 fsp-6">
			<div className="flex-shrink-0">
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
					<div className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
						<Icon
							className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-white"
							strokeWidth={1.5}
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 space-y-2">
				<h3 className="font-bold text-slate-800 text-sm sm:text-medium lg:text-lg">
					{title}
				</h3>
				<p className="text-slate-600 leading-relaxed text-xs sm:text-sm lg:text-base">
					{description}
				</p>
			</div>
		</div>
	)
}

function CalligraphyCard({
	type,
	index,
}: {
	type: CalligraphyType
	index: number
}) {
	const isEven = index % 2 === 0

	return (
		<div className="group relative">
			<GradientCard
				className={`p-8 hover:-translate-y-2 transition-all duration-500 ${isEven ? "lg:mr-8" : "lg:ml-8"}`}
			>
				<div className="space-y-8">
					{/* Header */}
					<div className="flex items-center gap-4">
						<IconWrapper icon={Palette} />
						<div>
							<h3 className="text-2xl font-bold text-slate-800 mb-1">
								{type.name}
							</h3>
							<div className="flex items-center gap-2 text-sm text-slate-500">
								<span>قياس القلم:</span>
								<span className="font-semibold text-primary">
									{type.penSize}
								</span>
							</div>
						</div>
					</div>

					{/* Text Content */}
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-inner"></div>
						<div className="relative p-8 rounded-2xl border border-slate-200/50">
							<p
								className={`text-lg leading-loose text-slate-700 whitespace-pre-line text-center`}
								style={{ fontFamily: "inherit" }}
							>
								{type.text}
							</p>
						</div>
					</div>

					{/* Requirements */}
					<div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-primary">
						<div className="flex items-start gap-4">
							<div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
								<Star
									className="w-4 h-4 text-primary"
									strokeWidth={2}
								/>
							</div>
							<p className="text-slate-700 leading-relaxed">
								{type.requirement}
							</p>
						</div>
					</div>
				</div>
			</GradientCard>
		</div>
	)
}

function TimelineCard({ event }: { event: TimelineEvent }) {
	const isDeadline = event.type === "deadline"

	return (
		<GradientCard className="p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
			<div className="text-center space-y-6">
				<div
					className={`mx-auto w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br ${
						isDeadline
							? "from-orange-500 to-red-500"
							: "from-emerald-500 to-teal-500"
					} shadow-lg flex items-center justify-center`}
				>
					<event.icon
						className="w-8 sm:w-10 h-8 sm:h-10 text-white"
						strokeWidth={1.5}
					/>
				</div>

				<div className="space-y-3">
					<h3 className="text-base sm:text-xl font-bold text-slate-800">
						{event.title}
					</h3>
					<div className="inline-block bg-gradient-to-r from-slate-100 to-slate-50 rounded-full px-4 sm:px-6 py-2 border border-slate-200">
						<p className="sm:text-2xl font-bold text-slate-700">
							{event.date}
						</p>
					</div>
				</div>
			</div>
		</GradientCard>
	)
}

function PersonCard({ person }: { person: Person }) {
	return (
		<div className="group text-center space-y-4">
			<div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
				<div className="relative">
					<Image
						src={person.image}
						alt={person.name}
						width={112}
						height={112}
						className="w-full h-full object-cover border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300"
					/>
				</div>
			</div>
			<div className="space-y-1">
				<h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300">
					{person.name}
				</h4>
				{person.subtitle && (
					<p className="text-sm text-slate-500">{person.subtitle}</p>
				)}
			</div>
		</div>
	)
}

function ModernTable() {
	return (
		<GradientCard className="overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-center">
					<thead>
						<tr className="bg-gradient-to-r from-primary to-secondary text-white">
							<th className="py-4 sm:py-6 px-3 sm:px-8 font-bold text-xs sm:text-sm lg:text-lg">
								نوع الخط
							</th>
							<th className="py-4 sm:py-6 px-3 sm:px-8 font-bold text-xs sm:text-sm lg:text-lg">
								المركز الأول
							</th>
							<th className="py-4 sm:py-6 px-3 sm:px-8 font-bold text-xs sm:text-sm lg:text-lg">
								المركز الثاني
							</th>
							<th className="py-4 sm:py-6 px-3 sm:px-8 font-bold text-xs sm:text-sm lg:text-lg">
								المركز الثالث
							</th>
						</tr>
					</thead>
					<tbody>
						{prizeCategories.map((prize, index) => (
							<tr
								key={prize}
								className={`border-b border-slate-200 ${
									index % 2 === 0
										? "bg-white/50"
										: "bg-slate-50/50"
								} hover:bg-primary/5 transition-colors duration-300`}
							>
								<td className="py-4 sm:py-6 px-3 sm:px-8 font-semibold text-slate-700 text-xs sm:text-sm lg:text-lg">
									{prize}
								</td>
								<td className="py-4 sm:py-6 px-3 sm:px-8 text-xs sm:text-sm lg:text-lg">
									<div className="flex items-center justify-center gap-3">
										<Crown className="w-5 h-5 text-yellow-500" />
										<span className="font-bold text-slate-800">
											{prizeValues.first}
										</span>
									</div>
								</td>
								<td className="py-4 sm:py-6 px-3 sm:px-8 text-xs sm:text-sm lg:text-lg">
									<div className="flex items-center justify-center gap-3">
										<Award className="w-5 h-5 text-slate-400" />
										<span className="font-bold text-slate-800">
											{prizeValues.second}
										</span>
									</div>
								</td>
								<td className="py-4 sm:py-6 px-3 sm:px-8 text-xs sm:text-sm lg:text-lg">
									<div className="flex items-center justify-center gap-3">
										<Trophy className="w-5 h-5 text-orange-500" />
										<span className="font-bold text-slate-800">
											{prizeValues.third}
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</GradientCard>
	)
}

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			{/* Breadcrumbs */}
			<div className="px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "مسابقة زين العابدين عليه السلام الدولية الاولى في الخط العربي",
							url: "#",
						},
					]}
				/>
			</div>

			{/* Hero Section - Completely Redesigned */}
			<section className="px-4 sm:px-6 lg:px-8 py-16">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-6 my-2">
						<ModernBadge icon={Palette} text="مسابقة دولية محكمة" />

						<div className="space-y-6">
							<h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
								مسابقة الإمام زين العابدين
								<span className="block text-primary">
									الدولية الأولى
								</span>
								<span className="block text-2xl lg:text-4xl text-slate-600 mt-2">
									في الخط العربي
								</span>
							</h1>
						</div>
					</div>
					<div className="grid sm:grid-cols-2 gap-16 items-center">
						{/* Content */}
						<div className="space-y-2 sm:space-y-10">
							{/* Features */}
							<div className="lg:space-y-6">
								<FeatureHighlight
									icon={Star}
									title="إبراز التراث الإسلامي"
									description="أطلقنا هذه المسابقة لإبراز تراث الإمام زين العابدين (ع) من خلال جماليات الخط العربي، باعتباره وعاءً للمعرفة وجزءاً من الهوية الإسلامية."
								/>
								<FeatureHighlight
									icon={BookOpen}
									title="إحياء النصوص التربوية"
									description="تهدف المسابقة إلى إحياء نصوص الإمام الأخلاقية والتربوية بخط جميل، وتحفيز الخطاطين لفهم معانيها العميقة."
								/>
								<FeatureHighlight
									icon={Palette}
									title="استلهام الروح النورانية"
									description="ندعو المبدعين لاستلهام روح هذا التراث النوراني، والتعبير عنه بريشة الخط العربي، ليكون هذا الجهد امتداداً لرسالة الإمام في نشر القيم والمعرفة."
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href="/contests/khat/president-goals/#president-message"
									className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-2 sm:py-6 px-3 sm:px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
								>
									كلمة رئيس المؤسسة
									<ArrowLeft className="w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
								</Link>
								<Link
									href="/contests/khat/president-goals/#goals"
									className="group inline-flex items-center justify-center gap-3 border-2 border-primary text-primary hover:bg-primary hover:text-white px-2 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-2xl font-semibold transition-all duration-300"
								>
									أهداف المسابقة
									<ArrowLeft className="w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform duration-300" />
								</Link>
							</div>

							{/* Download Section */}
							<GradientCard className="p-6 text-center">
								<div className="space-y-4">
									<p className="text-slate-600 text-sm sm:text-base font-medium">
										يمكنكم تنزيل ملف المسابقة الكامل من خلال
										الضغط على الرابط أدناه
									</p>
									<Link
										href="/contests/khat/president-goals/#goals"
										className="text-sm lg:text-base group inline-flex items-center gap-3 text-primary hover:text-secondary font-semibold transition-colors duration-300"
									>
										<Download className="w-4 lg:w-5 h-4 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
										تنزيل ملف المسابقة الكامل
									</Link>
								</div>
							</GradientCard>
						</div>

						{/* Image */}
						<div className="relative order-first sm:order-last">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
							<div className="relative">
								<GradientCard className="p-6">
									<Image
										src="/contests/khat/landing.jpg"
										alt="لوكو مسابقة الخط"
										width={600}
										height={600}
										className="w-full rounded-2xl shadow-2xl sm:aspect-[1/2] lg:aspect-auto object-cover"
										priority
									/>
								</GradientCard>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Timeline Section - Modern Design */}
			<section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-100 to-white">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-10 sm:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
							فترة المشاركة
						</h2>
						<div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
					</div>

					<div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
						{TIMELINE_EVENTS.map((event, index) => (
							<TimelineCard key={index} event={event} />
						))}
					</div>
				</div>
			</section>

			{/* Calligraphy Types - Redesigned */}
			<section
				className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
				id="calligraphy-types"
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-10 sm:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
							أنواع الخطوط
						</h2>
						<div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 sm:mb-8"></div>

						<GradientCard className="p-6 sm:p-8 max-w-4xl mx-auto">
							<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
								<IconWrapper icon={BookOpen} />
								<p className="text-lg sm:text-xl text-slate-700 leading-relaxed text-center sm:text-right">
									نرجو من كل المتسابقين اختيار الخط والنص وحسب
									التوجيهات المذكورة أسفل كل خط
								</p>
							</div>
						</GradientCard>
					</div>

					<div className="space-y-8 sm:space-y-12">
						{CALLIGRAPHY_TYPES.map((type, index) => (
							<CalligraphyCard
								key={type.id}
								type={type}
								index={index}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Application Steps */}
			<section
				className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-100 to-white"
				id="apply"
			>
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-10 sm:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
							خطوات الاشتراك في المسابقة
						</h2>
						<div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
					</div>
					<ApplyStepper />
				</div>
			</section>

			{/* Prizes Section - Modern Table */}
			<section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-10 sm:mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
							الجوائز والمحفزات
						</h2>
						<div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
					</div>

					<div className="space-y-6 sm:space-y-8">
						<ModernTable />

						{/* Additional Prize Info */}
						<div className="grid md:grid-cols-2 gap-6 sm:gap-8">
							<GradientCard className="p-6 sm:p-8">
								<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
									<IconWrapper icon={BadgeDollarSign} />
									<div className="text-center sm:text-right">
										<h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">
											جوائز تقديرية إضافية
										</h3>
										<p className="text-slate-600 text-sm sm:text-base leading-relaxed">
											وسيتم منح خمس جوائز تقديرية كل منها
											بقدر ٢٥٠,٠٠٠ د.ع لكل نوع من الأنواع
											الخمسة لأفضل المتسابقين الذين يلون
											الفائزين الثلاثة الأوائل.
										</p>
									</div>
								</div>
							</GradientCard>

							<GradientCard className="p-6 sm:p-8">
								<div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border-l-4 border-amber-400">
									<h4 className="font-bold text-amber-800 mb-2 sm:mb-3 text-sm sm:text-base">
										ملاحظة مهمة:
									</h4>
									<p className="text-amber-700 text-sm sm:text-base leading-relaxed">
										تصرف الجوائز بالدينار العراقي وتحول قيمة
										الجائزة بالنسبة للفائزين الأجانب إلى
										العملات المتداولة وحسب سعر الصرف في
										وقته.
									</p>
								</div>
							</GradientCard>
						</div>
					</div>
				</div>
			</section>

			{/* Personnel Section - Modern Grid */}
			<section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-slate-100 to-white">
				<div className="max-w-7xl mx-auto">
					{PERSONNEL.map((section, sectionIndex) => (
						<div
							key={section.label}
							className={`${sectionIndex > 0 ? "mt-20" : ""}`}
						>
							<div className="text-center mb-12">
								<h2 className="text-3xl font-bold text-slate-800 mb-6">
									{section.label}
								</h2>
								<div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
							</div>

							<GradientCard className="p-12">
								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
									{section.persons.map((person) => (
										<PersonCard
											key={person.name}
											person={person}
										/>
									))}
								</div>
							</GradientCard>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
