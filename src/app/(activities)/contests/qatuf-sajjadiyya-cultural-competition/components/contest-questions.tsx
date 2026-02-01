"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	ChevronLeft,
	ChevronRight,
	Send,
	User,
	Phone,
	Mail,
	CheckCircle,
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from "canvas-confetti"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

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

type AnswerState = {
	[questionIndex: number]: string
}

type UserInfo = {
	fullName: string
	contact: string
	contactType: "phone" | "email"
}

export default function ContestQuestions() {
	const [step, setStep] = useState<"info" | "questions" | "submitted">("info")
	const [userInfo, setUserInfo] = useState<UserInfo>({
		fullName: "",
		contact: "",
		contactType: "phone",
	})
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState<AnswerState>({})

	const totalQuestions = questions.length
	const progress = ((currentQuestion + 1) / totalQuestions) * 100
	const answeredCount = Object.keys(answers).length

	const handleStartQuiz = useCallback(() => {
		if (userInfo.fullName.trim() && userInfo.contact.trim()) {
			setStep("questions")
		}
	}, [userInfo])

	const handleAnswerSelect = useCallback(
		(optionKey: string) => {
			setAnswers((prev) => ({ ...prev, [currentQuestion]: optionKey }))
		},
		[currentQuestion],
	)

	const handleNext = useCallback(() => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1)
		}
	}, [currentQuestion, totalQuestions])

	const handlePrevious = useCallback(() => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1)
		}
	}, [currentQuestion])

	const handleQuestionJump = useCallback((index: number) => {
		setCurrentQuestion(index)
	}, [])

	const handleSubmit = useCallback(() => {
		if (answeredCount === totalQuestions) {
			// Here you would send the data to your backend
			console.log({
				userInfo,
				answers,
			})
			setStep("submitted")
			confetti({
				particleCount: 150,
				spread: 70,
				origin: { y: 0.6 },
				colors: ["#059669", "#10b981", "#34d399"],
			})
		}
	}, [answeredCount, totalQuestions, userInfo, answers])

	// User Info Form
	if (step === "info") {
		return (
			<div className="min-h-screen to-white px-4 py-8">
				<div className="max-w-md mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6"
					>
						<div className="text-center space-y-2">
							<h2 className="text-2xl font-bold text-slate-800">
								معلومات المشارك
							</h2>
							<p className="text-slate-600 text-sm">
								يرجى إدخال معلوماتك للمشاركة في المسابقة
							</p>
						</div>

						<div className="space-y-4">
							{/* Full Name */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700 flex items-center gap-2">
									<User className="w-4 h-4" />
									الاسم الكامل
								</label>
								<input
									type="text"
									value={userInfo.fullName}
									onChange={(e) =>
										setUserInfo((prev) => ({
											...prev,
											fullName: e.target.value,
										}))
									}
									className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
									placeholder="أدخل اسمك الكامل"
									required
								/>
							</div>

							{/* Contact Type Selector */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">
									طريقة التواصل
								</label>
								<div className="grid grid-cols-2 gap-2">
									<button
										type="button"
										onClick={() =>
											setUserInfo((prev) => ({
												...prev,
												contactType: "phone",
												contact: "",
											}))
										}
										className={cn(
											"px-4 py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
											userInfo.contactType === "phone"
												? "border-primary bg-primary/5 text-primary"
												: "border-slate-200 text-slate-600 hover:border-slate-300",
										)}
									>
										<Phone className="w-4 h-4" />
										رقم الهاتف
									</button>
									<button
										type="button"
										onClick={() =>
											setUserInfo((prev) => ({
												...prev,
												contactType: "email",
												contact: "",
											}))
										}
										className={cn(
											"px-4 py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
											userInfo.contactType === "email"
												? "border-primary bg-primary/5 text-primary"
												: "border-slate-200 text-slate-600 hover:border-slate-300",
										)}
									>
										<Mail className="w-4 h-4" />
										البريد الإلكتروني
									</button>
								</div>
							</div>

							{/* Contact Input */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700 flex items-center gap-2">
									{userInfo.contactType === "phone" ? (
										<Phone className="w-4 h-4" />
									) : (
										<Mail className="w-4 h-4" />
									)}
									{userInfo.contactType === "phone"
										? "رقم الهاتف"
										: "البريد الإلكتروني"}
								</label>
								<input
									type={
										userInfo.contactType === "phone"
											? "tel"
											: "email"
									}
									value={userInfo.contact}
									onChange={(e) =>
										setUserInfo((prev) => ({
											...prev,
											contact: e.target.value,
										}))
									}
									className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
									placeholder={
										userInfo.contactType === "phone"
											? "07XXXXXXXXX"
											: "example@email.com"
									}
									required
								/>
							</div>
						</div>

						<button
							onClick={handleStartQuiz}
							disabled={
								!userInfo.fullName.trim() ||
								!userInfo.contact.trim()
							}
							className={cn(
								"w-full py-4 rounded-xl font-bold text-lg transition-all",
								userInfo.fullName.trim() &&
									userInfo.contact.trim()
									? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
									: "bg-slate-200 text-slate-400 cursor-not-allowed",
							)}
						>
							ابدأ المسابقة
						</button>
					</motion.div>
				</div>
			</div>
		)
	}

	// Success Submission
	if (step === "submitted") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white px-4 py-8 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center space-y-6"
				>
					<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
						<CheckCircle className="w-12 h-12 text-emerald-600" />
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-slate-800">
							تم إرسال إجاباتك بنجاح!
						</h2>
						<p className="text-slate-600">
							شكراً لمشاركتك في المسابقة. سيتم الإعلان عن النتائج
							قريباً عبر المنصات الرسمية للمؤسسة.
						</p>
					</div>
					<div className="bg-slate-50 rounded-xl p-4 space-y-1">
						<p className="text-sm text-slate-600">
							عدد الأسئلة المجاب عليها
						</p>
						<p className="text-3xl font-bold text-primary">
							{answeredCount} / {totalQuestions}
						</p>
					</div>
				</motion.div>
			</div>
		)
	}

	// Questions Section
	const currentQ = questions[currentQuestion]
	const selectedAnswer = answers[currentQuestion]
	const allAnswered = answeredCount === totalQuestions

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			{/* Mobile-First Header */}
			<div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
				<div className="px-4 py-4">
					<div className="space-y-3">
						{/* Progress Bar */}
						<div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
							<motion.div
								className="absolute inset-y-0 right-0 bg-gradient-to-l from-primary to-secondary rounded-full"
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{
									duration: 0.3,
									ease: "easeOut",
								}}
							/>
						</div>
						{/* Question Counter */}
						<div className="flex items-center justify-between text-sm">
							<span className="text-slate-600">
								السؤال {currentQuestion + 1} من {totalQuestions}
							</span>
							<span className="text-primary font-medium">
								{answeredCount} إجابة
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Question Content */}
			<div className="px-4 py-6 pb-24">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className="space-y-6"
					>
						{/* Question */}
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
							<div className="flex items-start gap-3">
								<span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold">
									{currentQ.number}
								</span>
								<h2 className="text-lg font-semibold text-slate-800 pt-1 flex-1">
									{currentQ.question}
								</h2>
							</div>
						</div>

						{/* Options */}
						<div className="space-y-3">
							{Object.entries(currentQ.options).map(
								([key, value]) => {
									const isSelected = selectedAnswer === key

									return (
										<button
											key={key}
											onClick={() =>
												handleAnswerSelect(key)
											}
											className={cn(
												"w-full text-right p-4 rounded-xl border-2 transition-all flex items-start gap-3 bg-white",
												isSelected
													? "border-primary bg-primary/5 shadow-md"
													: "border-slate-200 active:scale-[0.98]",
											)}
										>
											<span
												className={cn(
													"flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors",
													isSelected
														? "bg-primary text-white"
														: "bg-slate-100 text-slate-600",
												)}
											>
												{key}
											</span>
											<span className="text-slate-700 pt-0.5 flex-1">
												{value}
											</span>
										</button>
									)
								},
							)}
						</div>

						{/* Question Navigator Grid */}
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
							<p className="text-xs text-slate-500 mb-3 text-center font-medium">
								الانتقال السريع للأسئلة
							</p>
							<div className="grid grid-cols-10 gap-2">
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
												"aspect-square rounded-lg text-xs font-semibold transition-all",
												isCurrent &&
													"bg-primary text-white ring-2 ring-primary/30 scale-110",
												!isCurrent &&
													isAnswered &&
													"bg-primary/10 text-primary",
												!isCurrent &&
													!isAnswered &&
													"bg-slate-100 text-slate-400",
											)}
										>
											{q.number}
										</button>
									)
								})}
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Fixed Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
				<div className="px-4 py-3">
					{allAnswered ? (
						<button
							onClick={handleSubmit}
							className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
						>
							<Send className="w-5 h-5" />
							إرسال الإجابات
						</button>
					) : (
						<div className="flex items-center gap-2">
							<button
								onClick={handlePrevious}
								disabled={currentQuestion === 0}
								className={cn(
									"px-4 py-4 rounded-xl font-medium transition-all flex-shrink-0",
									currentQuestion === 0
										? "bg-slate-100 text-slate-400"
										: "bg-slate-100 text-slate-700 active:scale-95",
								)}
							>
								<ChevronRight className="w-5 h-5" />
							</button>
							<button
								onClick={handleNext}
								disabled={
									currentQuestion === totalQuestions - 1
								}
								className={cn(
									"flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
									currentQuestion === totalQuestions - 1
										? "bg-slate-100 text-slate-400"
										: "bg-gradient-to-r from-primary to-secondary text-white active:scale-[0.98]",
								)}
							>
								السؤال التالي
								<ChevronLeft className="w-5 h-5" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
