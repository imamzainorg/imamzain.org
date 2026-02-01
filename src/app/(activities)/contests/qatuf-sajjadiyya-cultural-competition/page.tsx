import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ContestQuestions from "./components/contest-questions"
import Breadcrumbs from "@/components/breadcrumb"
import {
	ArrowLeft,
	BookOpen,
	Calendar,
	Download,
	Globe,
	LucideIcon,
	Palette,
	Star,
} from "lucide-react"

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
			{/* Hero Section - Completely Redesigned */}
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
			<ContestQuestions />
		</main>
	)
}
