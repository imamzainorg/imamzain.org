"use client"

import Link from "next/link"
import {
	ArrowRight,
	Ban,
	BellRing,
	Lock,
	MapPin,
	ShieldCheck,
	Smartphone,
	Sparkles,
	UserRound,
} from "lucide-react"
import { ICON_BADGE, PANEL, Reveal } from "../../_components/shared"

const APP_URL = "/applications/maarif-al-sajjad"

/** Reassurance chips — the strongest privacy guarantees, surfaced up top. */
const guarantees = [
	{ Icon: Lock, label: "تشفيرٌ كامل للبيانات" },
	{ Icon: Smartphone, label: "معالجةُ الموقع على جهازك" },
	{ Icon: Ban, label: "بلا أطرافٍ ثالثة" },
]

/** The policy body — wording preserved as supplied, structured for scanning. */
const sections = [
	{
		order: "أولاً",
		Icon: UserRound,
		title: "البيانات الشخصية والغرض منها",
		points: [
			"الاسم الكامل ورقم الهاتف يتم طلبهما بشكل اختياري لغرض تمكينك من المشاركة في مسابقة حفظ رسالة الحقوق للإمام زين العابدين (ع).",
			"الغرض الوحيد من تسجيل هذه البيانات هو التواصل معك لتنسيق إرسال الجوائز لك في حال الفوز.",
			"بياناتك مشفرة بالكامل ولا يتم الاطلاع عليها من قبل أي أطراف ثالثة أو مشاركتها أو بيعها لأي جهات إعلانية أو تجارية.",
		],
	},
	{
		order: "ثانياً",
		Icon: MapPin,
		title: "الصلاحيات وتتبع الموقع الجغرافي",
		points: [
			"يطلب التطبيق صلاحية الموقع لحساب المسافة المتبقية والمقطوعة بدقة طوال طريق «يا حسين» نحو كربلاء المقدسة.",
			"يتم استخدام الموقع لتشغيل خاصية الجدار الجغرافي (Geofencing) لتنبيهك محلياً عند الاقتراب من إحدى المحطات التثقيفية.",
			"جميع عمليات تحديد وتتبع الموقع تتم وتُعالج بالكامل بشكل محلي وآمن داخل جهازك، ولا يتم إرسال إحداثياتك الجغرافية أو تخزينها على خوادمنا نهائياً.",
		],
	},
	{
		order: "ثالثاً",
		Icon: BellRing,
		title: "الإشعارات والتنبيهات العامة",
		points: [
			"تُستخدم التنبيهات لإرسال إشعارات محلية تفاعلية عند الاقتراب من المحطات أو لاطلاعك على التحديثات العامة والإعلانات المهمة للمسير.",
			"يمكنك تعطيل أو تفعيل صلاحية الإشعارات بالكامل وبشكل فوري وفي أي وقت من خلال قائمة إعدادات الصلاحيات داخل التطبيق.",
		],
	},
]

export default function PrivacyPolicy() {
	return (
		<div className="overflow-hidden">
			{/* ---------------------------------------------------------- */}
			{/* Header                                                     */}
			{/* ---------------------------------------------------------- */}
			<section className="relative pt-2 pb-12 lg:pb-16">
				<div
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl"
				/>
				<div className="container mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
					<Reveal>
						<span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-subtitle font-semibold text-secondary_dark dark:text-Muharram_secondary">
							<ShieldCheck className="h-4 w-4" />
							الخصوصيةُ وحمايةُ البيانات
						</span>
					</Reveal>
					<Reveal delay={0.05}>
						<h1 className="text-title font-bold leading-snug text-primary dark:text-white">
							سياسة حماية البيانات الشخصية والخصوصية
						</h1>
					</Reveal>
					<Reveal
						delay={0.08}
						className="flex items-center gap-3 text-secondary/60"
					>
						<span className="h-px w-12 bg-secondary/40" />
						<span className="h-1.5 w-1.5 rounded-full bg-secondary" />
						<span className="h-px w-12 bg-secondary/40" />
					</Reveal>
					<Reveal
						delay={0.1}
						className="max-w-2xl text-body leading-relaxed text-gray-700 dark:text-gray-200"
					>
						تطبيق «معارف سجادية» يلتزم بحماية بياناتك وخصوصيتك تماشياً
						مع سياسات متجري Google وApple العالمية.
					</Reveal>
					<Reveal
						delay={0.13}
						className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:gap-3"
					>
						{guarantees.map((g) => (
							<span
								key={g.label}
								className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white px-4 py-2 text-subtitle font-medium text-secondary_dark shadow-sm dark:border-Muharram_secondary/20 dark:bg-Muharram_primary dark:text-Muharram_secondary"
							>
								<g.Icon className="h-4 w-4" />
								{g.label}
							</span>
						))}
					</Reveal>
				</div>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Policy sections                                            */}
			{/* ---------------------------------------------------------- */}
			<section className="container">
				<div className="mx-auto flex max-w-3xl flex-col gap-6 lg:gap-8">
					{sections.map((s, i) => (
						<Reveal key={s.order} y={30} delay={i * 0.05}>
							<article className={`${PANEL} p-6 sm:p-8 lg:p-10`}>
								<header className="flex items-start gap-3 pb-5 sm:items-center sm:gap-4">
									<span className={`${ICON_BADGE} h-10 w-10 sm:h-12 sm:w-12`}>
										<s.Icon className="h-5 w-5 sm:h-6 sm:w-6" />
									</span>
									<div className="flex flex-col gap-1.5 text-start">
										<span className="text-subtitle font-semibold text-secondary_dark dark:text-Muharram_secondary">
											{s.order}
										</span>
										<h2 className="text-note font-bold leading-snug text-primary sm:text-body dark:text-white">
											{s.title}
										</h2>
									</div>
								</header>
								<ul className="flex flex-col gap-5 border-t border-secondary/10 pt-6 dark:border-Muharram_secondary/10">
									{s.points.map((p, j) => (
										<li
											key={j}
											className="flex items-start gap-3 text-start"
										>
											<span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary sm:mt-2.5 dark:bg-Muharram_secondary" />
											<p className="text-note leading-relaxed text-gray-700 sm:text-body sm:leading-loose dark:text-gray-200">
												{p}
											</p>
										</li>
									))}
								</ul>
							</article>
						</Reveal>
					))}
				</div>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Commitment band + actions                                  */}
			{/* ---------------------------------------------------------- */}
			<section className="container py-16 lg:py-24">
				<Reveal>
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#004a3d] p-8 text-center shadow-2xl lg:p-14 dark:from-Muharram_primary dark:to-black">
						<div
							aria-hidden
							className="pointer-events-none absolute left-1/2 -top-10 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
						/>
						<div className="relative z-10 flex flex-col items-center gap-6">
							<ShieldCheck className="h-11 w-11 text-secondary" />
							<h2 className="text-title font-bold leading-snug text-white">
								خصوصيتُك أمانةٌ عندنا
							</h2>
							<p className="max-w-xl text-note leading-relaxed text-white/85">
								نجمعُ أقلَّ ما يلزم، ونعالجُ موقعك على جهازك، ولا
								نشاركُ بياناتك مع أحد — تماشياً مع سياسات متجري
								Google وApple. ولأيِّ استفسارٍ حول خصوصيتك، يسعدنا
								تواصلُك معنا.
							</p>
							<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
								<Link
									href={APP_URL}
									className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 text-note font-semibold text-primary shadow-lg shadow-black/20 transition hover:bg-white/90 active:scale-95 sm:w-auto"
								>
									<ArrowRight className="h-5 w-5" />
									العودة إلى صفحة التطبيق
								</Link>
								<Link
									href="/services"
									className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-white/40 px-7 text-note font-semibold text-white transition hover:bg-white/10 active:scale-95 sm:w-auto"
								>
									تواصل معنا
								</Link>
							</div>
						</div>
					</div>
				</Reveal>
			</section>

			{/* ---------------------------------------------------------- */}
			{/* Foundation note                                            */}
			{/* ---------------------------------------------------------- */}
			<section className="container flex flex-col items-center gap-4 pb-16 text-center">
				<span className="h-px w-16 bg-secondary/30" />
				<p className="flex items-center gap-2 text-subtitle font-semibold text-secondary_dark dark:text-Muharram_secondary">
					<Sparkles className="h-4 w-4" />
					معارف سجادية
				</p>
				<p className="max-w-md text-subtitle leading-relaxed text-gray-500 dark:text-gray-400">
					خدمةٌ من مؤسسةِ الإمامِ زينِ العابدين (عليه السلام) لزائري
					الحسين (ع).
				</p>
			</section>
		</div>
	)
}
