import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Breadcrumbs from "@/components/breadcrumb"
import {
	BookOpen,
	Calendar,
	Download,
	Globe,
	LucideIcon,
	Palette,
	Star,
	AlertCircle,
	CheckCircle2,
	Trophy,
	Clock,
	Users,
	FileText,
} from "lucide-react"
import ParticipationForm from "./qatuf-sajjadiyya-cultural-competition/components/participation-form"

export const metadata: Metadata = {
	title: "مسابقة قطوف سجادية الثقافية | موقع الإمام زين العابدين",
	description:
		"اختبر معلوماتك عن الإمام زين العابدين عليه السلام في مسابقة قطوف سجادية الثقافية. 50 سؤالاً تغطي حياته وأدعيته وعلومه.",
}

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

function ModernBadge({
	icon: Icon,
	text,
	important,
}: {
	icon: LucideIcon
	text: string
	important?: boolean
}) {
	return (
		<div
			className={`inline-flex text-subtitle items-center gap-3 border px-6 py-3 rounded-2xl  font-semibold shadow-sm ${important ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-800" : "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 text-slate-800"}`}
		>
			<Icon className="w-5 h-5" strokeWidth={2} />
			{text}
		</div>
	)
}

function RuleItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-start gap-4">
			<CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
			<p className="text-slate-700 text-base lg:text-lg leading-relaxed">
				{children}
			</p>
		</div>
	)
}

function ImportantNote({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
			<AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
			<p className="text-amber-900 text-base lg:text-lg leading-relaxed font-medium">
				{children}
			</p>
		</div>
	)
}

export default function Page() {
	return (
		<main className="min-h-screen">
			{/* Breadcrumbs */}
			<div className="px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "مسابقة قبسات من حياة الإمام السجاد (عليه السلام)",
							url: "#",
						},
					]}
				/>
			</div>
			{/* Hero Section */}
			<section className="px-4 sm:px-6 lg:px-8 py-16">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-6 my-2">
						<div className="flex gap-4 ">
							<ModernBadge
								icon={Globe}
								text="مسابقة محلية للجامعات"
							/>
							<ModernBadge
								icon={Calendar}
								text="المسابقة مفتوحة لغاية 2026/3/5"
								important
							/>
						</div>

						<div className="space-y-6">
							<h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
								قبسات من حياة الإمام السجاد (عليه السلام)
								<span className="block text-primary">
									الحلقة الاولى
								</span>
								<span className="block text-2xl lg:text-4xl text-slate-600 mt-2">
									الإمام زين العابدين علي بن الحسين عليه
									السلام منار الحق
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
									description="أطلقنا هذه المسابقة لتثقيف الناس واطلاعهم على الإمام زين العابدين (ع) من خلال قراءة مقتطفات متنوعة تصف شخص الامام (ع) في الكتاب المعني."
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

							{/* Download Section */}
							<GradientCard className="p-6 text-center">
								<div className="space-y-4 text-subtitle">
									<p className="text-slate-600  font-medium">
										يمكنكم تنزيل ملف المسابقة الكامل من خلال
										الضغط على الرابط أدناه
									</p>
									<Link
										download
										href="/contests/qatuf-sajjadiyya-cultural-competition/contest-book.pdf"
										className=" group inline-flex items-center gap-3 text-primary hover:text-secondary font-semibold transition-colors duration-300"
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
										src="/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg"
										alt="لوكو مسابقة قطوف سجادية"
										width={800}
										height={800}
										className="w-full rounded-2xl shadow-2xl sm:aspect-[1/2] lg:aspect-auto object-cover"
										priority
									/>
								</GradientCard>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Rules and Instructions Section */}
			<section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-slate-50 to-white">
				<div className="max-w-5xl mx-auto">
					<div className="text-center space-y-4 mb-12">
						<div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl">
							<FileText className="w-5 h-5 text-primary" />
							<span className="text-primary font-bold text-lg">
								شروط وضوابط المسابقة
							</span>
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
							اقرأ الشروط بعناية قبل المشاركة
						</h2>
					</div>

					<div className="space-y-8">
						{/* Contest Scope */}
						<GradientCard className="p-6 lg:p-8">
							<div className="flex items-start gap-4 mb-6">
								<BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<h3 className="text-xl lg:text-2xl font-bold text-slate-800">
									مصدر الأسئلة
								</h3>
							</div>
							<div className="space-y-4">
								<RuleItem>
									تعد المسابقة حصرية بكتاب &quot;قبسات من حياة
									الإمام زين العابدين (عليه السلام) - الحلقة
									الأولى&quot;
								</RuleItem>
								<RuleItem>
									تستخرج جميع الأسئلة وأجوبتها من محتوى الكتاب
									حصراً
								</RuleItem>
								<ImportantNote>
									يشترط على المشارك قراءة الكتاب قراءة دقيقة،
									وأن تكون الإجابة من الكتاب حصراً
								</ImportantNote>
							</div>
						</GradientCard>

						{/* Time and Duration */}
						<GradientCard className="p-6 lg:p-8">
							<div className="flex items-start gap-4 mb-6">
								<Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<h3 className="text-xl lg:text-2xl font-bold text-slate-800">
									المدة الزمنية
								</h3>
							</div>
							<div className="space-y-4">
								<RuleItem>
									تنشر أسئلة المسابقة عبر الروابط الرسمية
									لمؤسسة الإمام زين العابدين (عليه السلام)
									للبحوث والدراسات
								</RuleItem>
								<RuleItem>
									مدة المسابقة: خمسة عشر (15) يوماً فقط من
									تاريخ الإعلان
								</RuleItem>
								<ImportantNote>
									تقدم الإجابات ضمن المدة الزمنية المحددة، ولا
									تقبل المشاركات بعد انتهاء فترة الخمسة عشر
									يوماً
								</ImportantNote>
							</div>
						</GradientCard>

						{/* Participation Requirements */}
						<GradientCard className="p-6 lg:p-8">
							<div className="flex items-start gap-4 mb-6">
								<Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<h3 className="text-xl lg:text-2xl font-bold text-slate-800">
									متطلبات المشاركة
								</h3>
							</div>
							<div className="space-y-4">
								<RuleItem>
									يجب الإجابة عن جميع أسئلة المسابقة كاملة
								</RuleItem>
								<RuleItem>
									تستبعد المشاركات الناقصة أو غير المطابقة
								</RuleItem>
								<ImportantNote>
									لا يجوز شرعاً الاستعانة بالذكاء الاصطناعي أو
									بأي وسيلة أخرى
								</ImportantNote>
							</div>
						</GradientCard>

						{/* Evaluation Criteria */}
						<GradientCard className="p-6 lg:p-8">
							<div className="flex items-start gap-4 mb-6">
								<Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<h3 className="text-xl lg:text-2xl font-bold text-slate-800">
									معايير التقييم
								</h3>
							</div>
							<div className="space-y-4">
								<RuleItem>
									تقيّم المشاركات وفق الدقة والوضوح ومطابقة
									الجواب لمضمون الكتاب
								</RuleItem>
								<RuleItem>
									في حال تساوي الدرجات بين أكثر من مشارك،
									يعتمد معيار إضافي أو تجرى قرعة لتحديد
									الفائزين
								</RuleItem>
								<RuleItem>
									قرار لجنة التحكيم نهائي ولا يقبل الاعتراض
								</RuleItem>
							</div>
						</GradientCard>

						{/* Prizes */}
						<GradientCard className="p-6 lg:p-8">
							<div className="flex items-start gap-4 mb-6">
								<Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
								<h3 className="text-xl lg:text-2xl font-bold text-slate-800">
									الجوائز
								</h3>
							</div>
							<div className="space-y-4">
								<RuleItem>
									تمنح مكافآت تشجيعية قيمة للعشرة الأوائل من
									المشاركين
								</RuleItem>
								<RuleItem>
									يتم تحديد الفائزين وفق تقييم لجنة التحكيم
								</RuleItem>
								<RuleItem>
									يعلن عن أسماء الفائزين عبر المنصات الرسمية
									للمؤسسة
								</RuleItem>
							</div>
						</GradientCard>

						{/* Final Note */}
						<div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-6 lg:p-8 text-center">
							<p className="text-lg lg:text-xl font-bold text-slate-800">
								المشاركة في المسابقة تعني الاطلاع على الشروط
								والموافقة عليها كاملة
							</p>
						</div>
					</div>
				</div>
			</section>

			<ParticipationForm />
		</main>
	)
}
