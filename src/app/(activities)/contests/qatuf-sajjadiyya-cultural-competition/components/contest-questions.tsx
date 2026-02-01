"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	ChevronLeft,
	ChevronRight,
	RotateCcw,
	Trophy,
	BookOpen,
	Star,
	GraduationCap,
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from "canvas-confetti"

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Questions data
const questions = [
	{
		number: "١",
		question:
			"ما هو اللقب الذي عُرفت به والدة الإمام زين العابدين عليه السلام؟",
		options: {
			أ: "سيدة نساء العالمين",
			ب: "شاه زنان",
			ج: "أم البنين",
			د: "طاهرة",
		},
		correct: "ب",
	},
	{
		number: "٢",
		question: "في أي سنة هجرية وُلد الإمام زين العابدين عليه السلام؟",
		options: {
			أ: "40 هـ",
			ب: "38 هـ",
			ج: "61 هـ",
			د: "50 هـ",
		},
		correct: "ب",
	},
	{
		number: "٣",
		question: "كم سنة قضاها الإمام مع جده أمير المؤمنين علي عليه السلام؟",
		options: {
			أ: "سنتان",
			ب: "خمس سنوات",
			ج: "عشر سنوات",
			د: "أربع سنوات",
		},
		correct: "أ",
	},
	{
		number: "٤",
		question: "من هي زوجة الإمام السجاد التي استمر منها نسل الأئمة؟",
		options: {
			أ: "أم فروة",
			ب: "السيدة فاطمة بنت الإمام الحسن",
			ج: "السيدة رباب",
			د: "خديجة",
		},
		correct: "ب",
	},
	{
		number: "٥",
		question:
			"ما هو اللقب الذي أطلق على الإمام لكونه يجمع بين سلالة النبوة وملوك الفرس؟",
		options: {
			أ: "سيد الساجدين",
			ب: "ابن الخيرتين",
			ج: "زين الصالحين",
			د: "إمام المتقين",
		},
		correct: "ب",
	},
	{
		number: "٦",
		question: "أي من الأبناء هو الإمام المنصوص عليه بعد أبيه السجاد؟",
		options: {
			أ: "زيد الشهيد",
			ب: "محمد الباقر",
			ج: "عبد الله الباهر",
			د: "عمر الأشرف",
		},
		correct: "ب",
	},
	{
		number: "٧",
		question: "ما سبب تسمية الإمام بلقب (السجاد)؟",
		options: {
			أ: "لحبه للمسجد",
			ب: "لسجوده عند كل نعمة يذكرها لله",
			ج: "لأنه أول من سجد",
			د: "لطول صلاته فقط",
		},
		correct: "ب",
	},
	{
		number: "٨",
		question:
			"المقصود بلقب (ذو الثفنات) هو ظهور آثار السجود في جبهته وركبتيه كـ:",
		options: {
			أ: "ملمس الحرير",
			ب: "أخفاف الإبل",
			ج: "لون الذهب",
			د: "علامة النور",
		},
		correct: "ب",
	},
	{
		number: "٩",
		question:
			'من هو الخليفة الأموي الذي وصف الإمام بأنه "سراج الدنيا وجمال الإسلام"؟',
		options: {
			أ: "مروان بن الحكم",
			ب: "عمر بن عبد العزيز",
			ج: "عبد الملك بن مروان",
			د: "الوليد بن عبد الملك",
		},
		correct: "ب",
	},
	{
		number: "١٠",
		question: "كم ركعة كان الإمام السجاد يصلي في اليوم والليلة؟",
		options: {
			أ: "100 ركعة",
			ب: "500 ركعة",
			ج: "1000 ركعة",
			د: "50 ركعة",
		},
		correct: "ج",
	},
	{
		number: "١١",
		question: "ما هي الحكمة الإلهية من مرض الإمام في واقعة كربلاء؟",
		options: {
			أ: "ليرتاح من القتال",
			ب: "لحفظ نسل الإمامة من القتل",
			ج: "اختباراً لصبره",
			د: "لعدم رغبته في القتال",
		},
		correct: "ب",
	},
	{
		number: "١٢",
		question: 'تلقب "الصحيفة السجادية" بلقب:',
		options: {
			أ: "نهج البلاغة",
			ب: "زبور آل محمد",
			ج: "ضياء الصالحين",
			د: "مفاتيح الجنان",
		},
		correct: "ب",
	},
	{
		number: "١٣",
		question: 'كم عدد الحقوق التي شملتها "رسالة الحقوق" للإمام السجاد؟',
		options: {
			أ: "40 حقاً",
			ب: "50 حقاً",
			ج: "60 حقاً",
			د: "30 حقاً",
		},
		correct: "ب",
	},
	{
		number: "١٤",
		question: "ماذا كان يحمل الإمام على ظهره ليلاً لإعطائه للفقراء سراً؟",
		options: {
			أ: "جراب الخبز والطعام",
			ب: "الذهب والفضة",
			ج: "الملابس فقط",
			د: "كتب العلم",
		},
		correct: "أ",
	},
	{
		number: "١٥",
		question:
			"ما هو التصرف الذي قام به الإمام مع الجارية التي شجت رأسه بالإبريق؟",
		options: {
			أ: "عاقبها",
			ب: "طردها",
			ج: "عفا عنها وأعتقها",
			د: "طلب منها تعويضاً",
		},
		correct: "ج",
	},
	{
		number: "١٦",
		question:
			"من هو الصحابي الذي استعانت به عمة الإمام ليكلمه في الرفق بنفسه من كثرة العبادة؟",
		options: {
			أ: "أبو هريرة",
			ب: "جابر بن عبد الله الأنصاري",
			ج: "سلمان الفارسي",
			د: "عمار بن ياسر",
		},
		correct: "ب",
	},
	{
		number: "١٧",
		question:
			"ما الاسم الذي أطلقه النواصب على (مشهد زين العابدين) في دمشق لطمسه؟",
		options: {
			أ: "مسجد الأموي",
			ب: "مشهد المحيا",
			ج: "مقام الرأس",
			د: "مسجد القدم",
		},
		correct: "ب",
	},
	{
		number: "١٨",
		question: "أين استودع الإمام الحسين (ع) وصيته وكتبه قبل استشهاده؟",
		options: {
			أ: "عند ابنه محمد",
			ب: "عند السيدة أم سلمة",
			ج: "عند السيدة زينب",
			د: "عند أخيه محمد بن الحنفية",
		},
		correct: "ب",
	},
	{
		number: "١٩",
		question:
			"ما هي المعجزة التي حدثت للرجل المديون ببركة قرصي خبز من الإمام؟",
		options: {
			أ: "تحول الخبز لذهب",
			ب: "وجد لؤلؤتين في بطن سمكة",
			ج: "نزل عليه كنز",
			د: "سقط عنه الدين بمعجزة",
		},
		correct: "ب",
	},
	{
		number: "٢٠",
		question: "ما هي الكنية الخاصة للإمام السجاد؟",
		options: {
			أ: "أبو الحسن",
			ب: "أبو محمد",
			ج: "أبو عبد الله",
			د: "أبو القاسم",
		},
		correct: "ب",
	},
	{
		number: "٢١",
		question:
			"لماذا كان الإمام السجاد يبكي بكاءً شديداً عند ذكر فاجعة كربلاء؟",
		options: {
			أ: "لأنه كان وحيداً",
			ب: "لأنه رأى 17 من أهل بيته مقتولين في ساعة واحدة",
			ج: "خوفاً من الأعداء",
			د: "لشوقه للجنان",
		},
		correct: "ب",
	},
	{
		number: "٢٢",
		question: 'على من دعا الإمام بـ "اللهم أذقه حر الحديد وحر النار"؟',
		options: {
			أ: "عمر بن سعد",
			ب: "حرملة بن كاهل الأسدي",
			ج: "شمر بن ذي الجوشن",
			د: "عبيد الله بن زياد",
		},
		correct: "ب",
	},
	{
		number: "٢٣",
		question:
			"ما هي الزيارة التي علّمها الإمام السجاد لابنه الباقر عند قبر أمير المؤمنين؟",
		options: {
			أ: "زيارة عاشوراء",
			ب: "زيارة أمين الله",
			ج: "زيارة وارث",
			د: "الزيارة الجامعة",
		},
		correct: "ب",
	},
	{
		number: "٢٤",
		question:
			"ماذا كان موقف الإمام من والي المدينة (هشام بن إسماعيل) بعد عزله؟",
		options: {
			أ: "شمت به",
			ب: "أكرمه ونهى أصحابه عن إيذائه",
			ج: "طالب بمحاكمته",
			د: "تجاهله تماماً",
		},
		correct: "ب",
	},
	{
		number: "٢٥",
		question: "ماذا كان يحدث لجسد الإمام عند الوضوء؟",
		options: {
			أ: "يبتسم",
			ب: "يصفر لونه وتأخذه رعدة",
			ج: "يغشى عليه",
			د: "لا يتغير",
		},
		correct: "ب",
	},
	{
		number: "٢٦",
		question: "ما هو أوجب حقوق الرحم كما ورد في رسالة الحقوق؟",
		options: {
			أ: "حق الأب",
			ب: "حق الأم",
			ج: "حق الأخ",
			د: "حق الجد",
		},
		correct: "ب",
	},
	{
		number: "٢٧",
		question: 'من هو الملك الفارسي الذي كانت السيدة "شاه زنان" حفيدته؟',
		options: {
			أ: "قيصر",
			ب: "كسرى",
			ج: "خاقان",
			د: "النجاشي",
		},
		correct: "ب",
	},
	{
		number: "٢٨",
		question: "في أي مدينة وُلد الإمام السجاد وفقاً للروايات؟",
		options: {
			أ: "مكة",
			ب: "الكوفة وقيل المدينة",
			ج: "البصرة",
			د: "الشام",
		},
		correct: "ب",
	},
	{
		number: "٢٩",
		question: "كم عدد أولاد الإمام السجاد الذكور؟",
		options: {
			أ: "7",
			ب: "12",
			ج: "10",
			د: "15",
		},
		correct: "ب",
	},
	{
		number: "٣٠",
		question:
			"ماذا كان الإمام السجاد يمثل في المجتمع الإسلامي بعد واقعة الطف؟",
		options: {
			أ: "قائداً عسكرياً",
			ب: "المرجعية الروحية والعلمية العليا",
			ج: "معتزلاً للناس",
			د: "والياً من قبل بني أمية",
		},
		correct: "ب",
	},
	{
		number: "٣١",
		question: "ما هو (حق اللسان) في رسالة الحقوق؟",
		options: {
			أ: "الصمت المطلق",
			ب: "إكرامه عن الخنا وتعويده الخير",
			ج: "الكلام في السياسة",
			د: "الدفاع عن النفس فقط",
		},
		correct: "ب",
	},
	{
		number: "٣٢",
		question: "لماذا كان الإمام يزيل (المدرة) من الطريق بنفسه؟",
		options: {
			أ: "لعدم وجود عمال",
			ب: "تواضعاً ورحمة بالناس",
			ج: "ليمارس الرياضة",
			د: "ليبني بها بيتاً",
		},
		correct: "ب",
	},
	{
		number: "٣٣",
		question: "ماذا قال الزهري في وصف الإمام السجاد؟",
		options: {
			أ: "هو أشجع الناس",
			ب: "ما رأيت هاشمياً أفضل منه",
			ج: "هو أثرى الناس",
			د: "لا أعرفه",
		},
		correct: "ب",
	},
	{
		number: "٣٤",
		question: "كيف كان الإمام السجاد يواجه الظلم الأموي؟",
		options: {
			أ: "بالدعاء والتربية ونشر الوعي",
			ب: "بالثورة المسلحة المباشرة",
			ج: "بالسكوت التام",
			د: "بالتحالف مع الزبيريين",
		},
		correct: "أ",
	},
	{
		number: "٣٥",
		question: 'ما هو "حق البطن" في رسالة الحقوق؟',
		options: {
			أ: "ألا تحرمه شيئاً",
			ب: "ألا تجعله وعاءً للحرام ولا تزيد في الشبع",
			ج: "الصيام كل يوم",
			د: "أكل اللحوم فقط",
		},
		correct: "ب",
	},
	{
		number: "٣٦",
		question: "ماذا كان يقول الإمام في سجوده لطلب الغيث؟",
		options: {
			أ: "يا رب اسقنا",
			ب: "سيدي بحبك لي إلا سقيتهم",
			ج: "اللهم ارحمنا",
			د: "يا غياث المستغيثين",
		},
		correct: "ب",
	},
	{
		number: "٣٧",
		question: "أين كان منزل الإمام الذي اتخذه تقية من فتنة ابن الزبير؟",
		options: {
			أ: "في بغداد",
			ب: "في بادية الحجاز",
			ج: "في مصر",
			د: "في اليمن",
		},
		correct: "ب",
	},
	{
		number: "٣٨",
		question: "ما هو الكتاب الذي أملاه الإمام السجاد؟",
		options: {
			أ: "المصباح",
			ب: "الصحيفة السجادية",
			ج: "ضياء الصالحين",
			د: "كامل الزيارات",
		},
		correct: "ب",
	},
	{
		number: "٣٩",
		question: 'من هو الذي قال: "لم يكن في أهل البيت مثل علي بن الحسين"؟',
		options: {
			أ: "مالك بن أنس",
			ب: "أبو حنيفة",
			ج: "الشافعي",
			د: "أحمد بن حنبل",
		},
		correct: "أ",
	},
	{
		number: "٤٠",
		question: 'ماذا تمثل "الكلمة" عند الإمام السجاد في أدعيته؟',
		options: {
			أ: "مجرد حرف",
			ب: "كيان حي وبديع الصياغة",
			ج: "وسيلة لطلب المال",
			د: "كلمات معقدة",
		},
		correct: "ب",
	},
	{
		number: "٤١",
		question: 'من هم "أهل الذمة" الذين ذكرهم الإمام في حقوقه؟',
		options: {
			أ: "المرتدون",
			ب: "المعاهدون من غير المسلمين",
			ج: "المنافقون",
			د: "المسلمون الفساق",
		},
		correct: "ب",
	},
	{
		number: "٤٢",
		question: 'ما هو "حق الجليس" كما ورد في الرسالة؟',
		options: {
			أ: "تجاهله",
			ب: "أن تلين له جانبك وتنصفه في المحادثة",
			ج: "أن تغلظ له القول",
			د: "ألا تكلمه",
		},
		correct: "ب",
	},
	{
		number: "٤٣",
		question: "بماذا استشهد الإمام عندما سُئل عن شدة عبادته؟",
		options: {
			أ: "بعبادة الأنبياء",
			ب: "بعبادة جده رسول الله (ص)",
			ج: "بعبادة الملائكة",
			د: "بضعف جسده",
		},
		correct: "ب",
	},
	{
		number: "٤٤",
		question: "ما هي الصفة البارزة في أدعية الصباح والمساء للإمام؟",
		options: {
			أ: "طلب الرزق فقط",
			ب: "التوحيد والتمجيد والاعتراف بالقدرة الإلهية",
			ج: "الدعاء على الأعداء",
			د: "الاختصار",
		},
		correct: "ب",
	},
	{
		number: "٤٥",
		question: "ماذا فعل العثمانيون بمشهد الإمام السجاد في دمشق؟",
		options: {
			أ: "رمموه",
			ب: "أزالوه من مكانه",
			ج: "وسعوه",
			د: "حولوه لجامعة",
		},
		correct: "ب",
	},
	{
		number: "٤٦",
		question: 'ما معنى لقب "البَكاء"؟',
		options: {
			أ: "كثرة البكاء على الدنيا",
			ب: "طول بكائه على مظلومية والده الحسين",
			ج: "البكاء من الضحك",
			د: "البكاء من الألم الجسدي",
		},
		correct: "ب",
	},
	{
		number: "٤٧",
		question: 'حق "المستشير" في رسالة الحقوق يوجب:',
		options: {
			أ: "تضليله",
			ب: "إعطاء النصيحة الصادقة له",
			ج: "الاعتذار منه",
			د: "أخذ أجر منه",
		},
		correct: "ب",
	},
	{
		number: "٤٨",
		question: 'من هو القائل "ما رأيت أحداً أفقه من علي بن الحسين"؟',
		options: {
			أ: "الزهري",
			ب: "أبو حنيفة",
			ج: "الشافعي",
			د: "ابن عباس",
		},
		correct: "أ",
	},
	{
		number: "٤٩",
		question: 'ما هو حق "النفس" الأكبر على الإنسان؟',
		options: {
			أ: "إراحتها دائماً",
			ب: "أن تستعملها في طاعة الله",
			ج: "إعطاؤها كل شهواتها",
			د: "إهمالها",
		},
		correct: "ب",
	},
	{
		number: "٥٠",
		question: "وصف الإمام عبادة الأحرار بأنها عبادة الله:",
		options: {
			أ: "خوفاً",
			ب: "طمعاً",
			ج: "شكراً وحباً",
			د: "تقليداً",
		},
		correct: "ج",
	},
]

// Types
type AnswerState = {
	[questionIndex: number]: string
}

// Modern Components - matching khat page design
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

function FeatureHighlight({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType
	title: string
	description: string
}) {
	return (
		<div className="group flex items-start gap-6 p-2">
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
				<h3 className="font-bold text-slate-800 text-note">{title}</h3>
				<p className="text-slate-600 leading-relaxed text-subtitle">
					{description}
				</p>
			</div>
		</div>
	)
}

export default function ContestQuestions() {
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState<AnswerState>({})
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [showResults, setShowResults] = useState(false)

	const totalQuestions = questions.length
	const progress = ((currentQuestion + 1) / totalQuestions) * 100
	const answeredCount = Object.keys(answers).length

	const handleAnswerSelect = useCallback(
		(optionKey: string) => {
			if (isSubmitted) return
			setAnswers((prev) => ({ ...prev, [currentQuestion]: optionKey }))
		},
		[currentQuestion, isSubmitted],
	)

	const handleNext = useCallback(() => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1)
			setIsSubmitted(false)
		} else {
			setShowResults(true)
			// Trigger confetti for completion
			confetti({
				particleCount: 150,
				spread: 70,
				origin: { y: 0.6 },
				colors: ["#059669", "#10b981", "#34d399", "#fbbf24", "#f59e0b"],
			})
		}
	}, [currentQuestion, totalQuestions])

	const handlePrevious = useCallback(() => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1)
			setIsSubmitted(false)
		}
	}, [currentQuestion])

	const handleQuestionJump = useCallback((index: number) => {
		setCurrentQuestion(index)
		setIsSubmitted(false)
	}, [])

	const handleReset = useCallback(() => {
		setAnswers({})
		setCurrentQuestion(0)
		setIsSubmitted(false)
		setShowResults(false)
	}, [])

	const score = useMemo(() => {
		let correct = 0
		Object.entries(answers).forEach(([index, answer]) => {
			if (answer === questions[Number(index)].correct) {
				correct++
			}
		})
		return correct
	}, [answers])

	// Results View
	if (showResults) {
		return (
			<div className="">
				<div className="px-4 sm:px-6 lg:px-8 py-12">
					<div className="max-w-3xl mx-auto">
						<GradientCard className="p-8 md:p-12">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="text-center"
							>
								{/* Score Circle */}
								<div className="relative inline-flex items-center justify-center mb-8">
									<svg className="w-40 h-40 transform -rotate-90">
										<circle
											cx="80"
											cy="80"
											r="70"
											stroke="#e2e8f0"
											strokeWidth="12"
											fill="none"
										/>
										<motion.circle
											cx="80"
											cy="80"
											r="70"
											stroke="url(#gradient)"
											strokeWidth="12"
											fill="none"
											strokeLinecap="round"
											strokeDasharray={`${2 * Math.PI * 70}`}
											initial={{
												strokeDashoffset: `${2 * Math.PI * 70}`,
											}}
											animate={{
												strokeDashoffset: `${2 * Math.PI * 70 * (1 - score / totalQuestions)}`,
											}}
											transition={{
												duration: 1.5,
												ease: "easeOut",
											}}
										/>
										<defs>
											<linearGradient
												id="gradient"
												x1="0%"
												y1="0%"
												x2="100%"
												y2="0%"
											>
												<stop
													offset="0%"
													stopColor="#059669"
												/>
												<stop
													offset="100%"
													stopColor="#0d9488"
												/>
											</linearGradient>
										</defs>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<span className="text-4xl font-bold text-primary">
											{Math.round(
												(score / totalQuestions) * 100,
											)}
											%
										</span>
										<span className="text-sm text-slate-500 mt-1">
											{score} / {totalQuestions}
										</span>
									</div>
								</div>
								<p className="text-slate-600 mb-8">
									أكملت المسابقة بنجاح! يمكنك مراجعة إجاباتك
									أو إعادة المحاولة
								</p>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
									<button
										onClick={handleReset}
										className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:from-secondary hover:to-primary transition-all shadow-lg"
									>
										<RotateCcw className="w-5 h-5" />
										إعادة المحاولة
									</button>
								</div>

								{/* Review Questions */}
								<div className="border-t border-slate-200 pt-8">
									<h3 className="text-lg font-semibold text-slate-700 mb-4">
										مراجعة الأسئلة
									</h3>
									<div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
										{questions.map((q, index) => {
											const userAnswer = answers[index]
											const isCorrect =
												userAnswer === q.correct

											return (
												<button
													key={index}
													onClick={() => {
														setShowResults(false)
														handleQuestionJump(
															index,
														)
													}}
													className={cn(
														"w-full aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-110",
														isCorrect
															? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
															: "bg-red-100 text-red-700 border-2 border-red-300",
													)}
													title={`سؤال ${q.number}: ${isCorrect ? "صحيح" : "خطأ"}`}
												>
													{q.number}
												</button>
											)
										})}
									</div>
									<p className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-4">
										<span className="flex items-center gap-1">
											<span className="w-3 h-3 rounded-full bg-emerald-400"></span>
											صحيح
										</span>
										<span className="flex items-center gap-1">
											<span className="w-3 h-3 rounded-full bg-red-400"></span>
											خطأ
										</span>
									</p>
								</div>
							</motion.div>
						</GradientCard>
					</div>
				</div>
			</div>
		)
	}

	const currentQ = questions[currentQuestion]
	const selectedAnswer = answers[currentQuestion]

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
			{/* Hero Section */}
			<section className="px-4 sm:px-6 lg:px-8 py-12">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-8 items-center">
						<div className="space-y-6">
							<div className="space-y-4">
								<h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
									مسابقة قطوف سجادية
									<span className="block text-primary mt-2">
										الثقافية
									</span>
								</h1>
								<p className="text-slate-600 text-lg leading-relaxed">
									اختبر معلوماتك عن الإمام زين العابدين عليه
									السلام في هذه المسابقة الثقافية المكونة من
									50 سؤالاً.
								</p>
							</div>

							<div className="space-y-4">
								<FeatureHighlight
									icon={BookOpen}
									title="50 سؤالاً متنوعاً"
									description="أسئلة شاملة تغطي حياة الإمام وأدعيته وعلومه"
								/>
								<FeatureHighlight
									icon={GraduationCap}
									title="اختبر معرفتك"
									description="اختبر فهمك لتراث الإمام السجاد عليه السلام"
								/>
								<FeatureHighlight
									icon={Star}
									title="تعلم وتثقف"
									description="اكتسب معرفة جديدة عن سيرة أهل البيت عليهم السلام"
								/>
							</div>
						</div>

						{/* Progress Card */}
						<GradientCard className="p-8">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-bold text-slate-800">
										تقدمك في المسابقة
									</h3>
									<div className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full">
										<Trophy className="w-5 h-5" />
										<span className="font-semibold">
											{answeredCount} / {totalQuestions}
										</span>
									</div>
								</div>

								{/* Progress Bar */}
								<div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
									<motion.div
										className="absolute inset-y-0 right-0 bg-gradient-to-l from-primary to-secondary rounded-full"
										initial={{ width: 0 }}
										animate={{
											width: `${(answeredCount / totalQuestions) * 100}%`,
										}}
										transition={{
											duration: 0.5,
											ease: "easeInOut",
										}}
									/>
								</div>

								<div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-primary">
									<p className="text-slate-700 text-center font-medium">
										أجب على جميع الأسئلة واكتشف نتيجتك في
										النهاية!
									</p>
								</div>
							</div>
						</GradientCard>
					</div>
				</div>
			</section>

			{/* Quiz Section */}
			<section className="px-4 sm:px-6 lg:px-8 py-8">
				<div className="max-w-3xl mx-auto">
					{/* Progress Bar */}
					<div className="mb-6">
						<div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
							<motion.div
								className="absolute inset-y-0 right-0 bg-gradient-to-l from-primary to-secondary rounded-full"
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
								}}
							/>
						</div>
						<p className="text-sm text-slate-500 mt-2 text-left">
							السؤال {currentQuestion + 1} من {totalQuestions}
						</p>
					</div>

					{/* Question Card */}
					<GradientCard className="p-6 md:p-8 mb-6">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentQuestion}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								{/* Question Number & Text */}
								<div className="mb-8">
									<div className="flex items-center gap-3 mb-4">
										<span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-xl font-bold text-xl shadow-lg">
											{currentQ.number}
										</span>
										<span className="text-primary font-medium">
											سؤال {currentQ.number}
										</span>
									</div>
									<h2 className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
										{currentQ.question}
									</h2>
								</div>

								{/* Options */}
								<div className="space-y-3">
									{Object.entries(currentQ.options).map(
										([key, value]) => {
											const isSelected =
												selectedAnswer === key

											return (
												<button
													key={key}
													onClick={() =>
														handleAnswerSelect(key)
													}
													disabled={isSubmitted}
													className={cn(
														"w-full text-right p-5 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group",
														"hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary/20",
														isSelected
															? "border-primary bg-primary/5 shadow-md"
															: "border-slate-200 hover:border-primary/50 bg-white",
													)}
												>
													<span
														className={cn(
															"flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors",
															isSelected
																? "bg-primary text-white"
																: "bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary",
														)}
													>
														{key}
													</span>
													<span className="text-lg text-slate-700 pt-1">
														{value}
													</span>
												</button>
											)
										},
									)}
								</div>
							</motion.div>
						</AnimatePresence>
					</GradientCard>

					{/* Navigation */}
					<div className="flex items-center justify-between gap-4">
						<button
							onClick={handlePrevious}
							disabled={currentQuestion === 0}
							className={cn(
								"flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
								currentQuestion === 0
									? "bg-slate-200 text-slate-400 cursor-not-allowed"
									: "bg-white text-primary hover:bg-primary/5 shadow-md border border-slate-200",
							)}
						>
							<ChevronRight className="w-5 h-5" />
							السابق
						</button>
						<button
							onClick={handleNext}
							className="flex-1 max-w-xs px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary shadow-lg transition-all flex items-center justify-center gap-2"
						>
							{currentQuestion === totalQuestions - 1 ? (
								<>عرض النتائج</>
							) : (
								<>
									التالي
									<ChevronLeft className="w-5 h-5" />
								</>
							)}
						</button>
					</div>

					{/* Question Navigator */}
					<div className="mt-8">
						<GradientCard className="p-6">
							<p className="text-sm text-slate-500 mb-4 text-center font-medium">
								انتقل إلى السؤال
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								{questions.map((q, index) => {
									const isAnswered =
										answers[index] !== undefined
									const isCurrent = index === currentQuestion

									return (
										<button
											key={index}
											onClick={() =>
												handleQuestionJump(index)
											}
											className={cn(
												"w-10 h-10 rounded-lg font-semibold text-sm transition-all hover:scale-110",
												isCurrent &&
													"bg-primary text-white ring-4 ring-primary/30",
												!isCurrent &&
													isAnswered &&
													"bg-primary/10 text-primary",
												!isCurrent &&
													!isAnswered &&
													"bg-slate-100 text-slate-400 hover:bg-slate-200",
											)}
										>
											{q.number}
										</button>
									)
								})}
							</div>
						</GradientCard>
					</div>
				</div>
			</section>
		</div>
	)
}
