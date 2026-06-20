"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Accordion, AccordionItem } from "@heroui/react"
import {
	Award,
	BellRing,
	BookHeart,
	ChevronRight,
	Footprints,
	Gift,
	Headphones,
	IdCard,
	ListChecks,
	MapPin,
	Milestone,
	Navigation,
	Quote,
	Route,
	ScrollText,
	Sparkles,
	WifiOff,
} from "lucide-react"
import Link from "next/link"
import PhoneMockup from "@/components/phone-mockup"
import NotifyForm from "./notify-form"
import { ICON_BADGE, PANEL, Reveal } from "./shared"

const ASSET = "/applications/maarif-al-sajjad"

const comingSoonPill = (
	<span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-subtitle font-semibold text-secondary_dark dark:text-Muharram_secondary">
		<Footprints className="w-4 h-4" />
		قريباً
	</span>
)

/** Unaltered official store badges (non-clickable, since the app is not yet released)
 * with an adjacent "قريباً" label — never overlay ribbons on the badges. */
function ComingSoonBadges({
	centered = true,
	theme = "light",
}: {
	centered?: boolean
	theme?: "light" | "emerald"
}) {
	return (
		<div
			className={`flex flex-col gap-3 ${
				centered ? "items-center" : "items-center lg:items-start"
			}`}
		>
			<span
				className={`text-subtitle font-semibold ${
					theme === "emerald"
						? "text-white/90"
						: "text-secondary_dark dark:text-Muharram_secondary"
				}`}
			>
				قريباً على المتجرين
			</span>
			<div className="flex flex-wrap items-center justify-center gap-3 opacity-90 sm:gap-4">
				<Image
					src="/applications/app-store.svg"
					alt="App Store — قريباً"
					width={500}
					height={500}
					className="h-10 w-auto max-w-[45%] sm:h-12 lg:h-14"
				/>
				<Image
					src="/applications/google-play.svg"
					alt="Google Play — قريباً"
					width={500}
					height={500}
					className="h-10 w-auto max-w-[45%] sm:h-12 lg:h-14"
				/>
			</div>
		</div>
	)
}

/* ------------------------------------------------------------------ */
/* Sticky mobile CTA bar — appears after the hero, scrolls to the form */
/* ------------------------------------------------------------------ */

function StickyCta() {
	const reduce = useReducedMotion()
	const [show, setShow] = useState(false)

	useEffect(() => {
		const notify = document.getElementById("notify")
		let ctaInView = false
		const update = () =>
			setShow(window.scrollY > window.innerHeight * 0.9 && !ctaInView)
		// Hide the bar once the final CTA is in view so it never covers the footer.
		const io = notify
			? new IntersectionObserver(
					([entry]) => {
						ctaInView = entry.isIntersecting
						update()
					},
					{ threshold: 0 },
				)
			: null
		if (notify && io) io.observe(notify)
		update()
		window.addEventListener("scroll", update, { passive: true })
		return () => {
			window.removeEventListener("scroll", update)
			io?.disconnect()
		}
	}, [])

	const goToNotify = () => {
		document.getElementById("notify")?.scrollIntoView({
			behavior: reduce ? "auto" : "smooth",
			block: "center",
		})
	}

	return (
		<motion.div
			initial={false}
			animate={{ y: show ? 0 : 100, opacity: show ? 1 : 0 }}
			transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
			inert={!show}
			className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-secondary/30 bg-white/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden dark:bg-Muharram_primary/90"
		>
			<span className="flex items-center gap-2 text-subtitle font-bold text-primary dark:text-secondary">
				<Footprints className="w-4 h-4 text-secondary_dark" />
				معارف سجادية
			</span>
			<button
				onClick={goToNotify}
				className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition active:scale-95 dark:bg-Muharram_secondary"
			>
				<BellRing className="w-4 h-4" />
				سجّل اهتمامك
			</button>
		</motion.div>
	)
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
	const reduce = useReducedMotion()

	const textVariants: Variants = {
		hidden: { opacity: 0, x: reduce ? 0 : 40 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				duration: reduce ? 0 : 0.7,
				ease: "easeOut",
				delay: reduce ? 0 : i * 0.12,
			},
		}),
	}

	return (
		<section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-28">
			{/* desert-road glows */}
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -top-10 right-0 -z-10 h-72 w-72 translate-x-1/3 rounded-full bg-primary/20 blur-3xl"
			/>

			<div className="container flex flex-col items-center justify-between gap-12 lg:flex-row-reverse">
				{/* text */}
				<div className="flex w-full flex-col items-center gap-6 text-center lg:w-1/2 lg:items-start lg:text-start">
					<motion.span
						custom={0}
						variants={textVariants}
						initial="hidden"
						animate="visible"
					>
						{comingSoonPill}
					</motion.span>
					<motion.h1
						custom={1}
						variants={textVariants}
						initial="hidden"
						animate="visible"
						className="text-hero font-bold leading-tight text-primary dark:text-white"
					>
						معارف سجادية
					</motion.h1>
					<motion.p
						custom={2}
						variants={textVariants}
						initial="hidden"
						animate="visible"
						className="text-title font-semibold text-secondary_dark dark:text-Muharram_secondary"
					>
						امشِ… وتعلَّم
					</motion.p>
					<motion.p
						custom={3}
						variants={textVariants}
						initial="hidden"
						animate="visible"
						className="max-w-md text-body leading-relaxed text-gray-700 dark:text-gray-200"
					>
						رفيقُك في طريقِ يا حسين؛ تحفظُ رسالةَ الحقوق محطةً بعد
						محطة، وتنالُ جائزتَك عند الوصول.
					</motion.p>

					<motion.div
						custom={4}
						variants={textVariants}
						initial="hidden"
						animate="visible"
						className="flex w-full flex-col items-center gap-3 lg:items-start"
					>
						<NotifyForm id="notify-hero" />
						<p className="text-subtitle text-gray-500 dark:text-gray-400">
							مجّانًا وبلا إعلانات — كُن أوّلَ المُشاركين.
						</p>
					</motion.div>

					<motion.div
						custom={5}
						variants={textVariants}
						initial="hidden"
						animate="visible"
						className="pt-2"
					>
						<ComingSoonBadges centered={false} />
					</motion.div>
				</div>

				{/* phone */}
				<motion.div
					initial={reduce ? false : { opacity: 0, y: 60, rotate: -4 }}
					animate={{ opacity: 1, y: 0, rotate: -3 }}
					transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
					className="relative flex w-full justify-center lg:w-1/2"
				>
					<PhoneMockup
						src={`${ASSET}/homepage.webp`}
						alt="الواجهة الرئيسية لتطبيق معارف سجادية"
						framed
						priority
						glow="bg-secondary/30"
						sizes="(max-width: 1024px) 50vw, 220px"
						className="h-[23rem] w-[10.6rem] sm:h-[26rem] sm:w-[12rem]"
					/>
				</motion.div>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Stats band (project scale — credibility)                           */
/* ------------------------------------------------------------------ */

const stats = [
	{ Icon: Footprints, value: "٨٠ كم", label: "مسيرةُ النجف إلى كربلاء" },
	{ Icon: Milestone, value: "١٥٥٢", label: "عمودًا على الطريق" },
	{ Icon: MapPin, value: "٨", label: "محطّاتٍ تعليمية" },
	{ Icon: ScrollText, value: "٣٥", label: "حقًّا من رسالة الحقوق" },
]

function Stats() {
	return (
		<section className="container">
			<Reveal
				y={30}
				className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-secondary/15 bg-secondary/15 lg:grid-cols-4"
			>
				{stats.map((s) => (
					<div
						key={s.label}
						className="flex flex-col items-center gap-3 bg-white px-4 py-8 text-center dark:bg-Muharram_primary"
					>
						<span className={`${ICON_BADGE} h-11 w-11`}>
							<s.Icon className="h-5 w-5" />
						</span>
						<span className="text-title font-bold leading-none text-primary dark:text-white">
							{s.value}
						</span>
						<span className="text-subtitle leading-relaxed text-gray-600 dark:text-gray-300">
							{s.label}
						</span>
					</div>
				))}
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Invitation (poetic problem / benefit)                              */
/* ------------------------------------------------------------------ */

function Invitation() {
	return (
		<section className="relative py-16 lg:py-24">
			<div className="container mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
				<Reveal className="text-title font-bold leading-relaxed text-primary dark:text-white">
					في كلِّ خطوةٍ نحو الحسين… معرفةٌ تبقى
				</Reveal>
				<Reveal className="flex items-center gap-3 text-secondary/60">
					<span className="h-px w-12 bg-secondary/40" />
					<span className="h-1.5 w-1.5 rounded-full bg-secondary" />
					<span className="h-px w-12 bg-secondary/40" />
				</Reveal>
				<Reveal
					delay={0.1}
					className="text-body leading-relaxed text-gray-600 dark:text-gray-300"
				>
					معارف سجادية يحوّلُ مسيرتَك المباركة إلى مدرسةٍ متنقّلة،
					تحفظُ فيها رسالةَ الحقوق على هَدْيِ الإمامِ السَّجّاد (عليه
					السلام).
				</Reveal>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* The journey / roadmap                                              */
/* ------------------------------------------------------------------ */

function Journey() {
	const points = [
		{
			Icon: Milestone,
			title: "محطّاتٌ على الأعمدة",
			copy: "ثماني محطاتٍ على طريقِ يا حسين، لكلٍّ منها حقوقٌ تحفظها.",
		},
		{
			Icon: Route,
			title: "تتبّعٌ لمسيرك",
			copy: "موقعُك على الخريطة، وما قطعتَه وما تبقّى حتى الوصول.",
		},
		{
			Icon: MapPin,
			title: "هدفٌ عند الوصول",
			copy: "تستلمُ جائزتَك عند مدينةِ الإمام الحسن (ع).",
		},
	]
	return (
		<section className="relative overflow-hidden py-16 lg:py-24">
			<div className="container flex flex-col items-center justify-between gap-14 lg:flex-row">
				<Reveal
					y={40}
					className="flex w-full flex-col items-center gap-4 lg:w-1/2"
				>
					<PhoneMockup
						src={`${ASSET}/roadmap.webp`}
						alt="خارطة المحطّات على طريق يا حسين في تطبيق معارف سجادية"
						framed
						glow="bg-secondary/20"
						sizes="(max-width: 1024px) 50vw, 220px"
						className="h-[23rem] w-[10.6rem] sm:h-[26rem] sm:w-[12rem]"
					/>
					<span className="text-subtitle font-semibold tracking-wide text-secondary_dark dark:text-Muharram_secondary">
						طريقُك مرسومٌ خطوةً خطوة
					</span>
				</Reveal>

				<div className="flex w-full flex-col items-center gap-8 text-center lg:w-1/2 lg:items-start lg:text-start">
					<Reveal className="flex flex-col items-center gap-3 lg:items-start">
						<h2 className="text-title font-bold text-primary dark:text-white">
							محطّاتٌ على طريقِ يا حسين
						</h2>
					</Reveal>

					<Reveal y={20} className="w-full">
						<ul className={`${PANEL} divide-y divide-secondary/10 dark:divide-Muharram_secondary/10`}>
							{points.map((p) => (
								<li
									key={p.title}
									className="flex items-start gap-4 p-5"
								>
									<span className={`${ICON_BADGE} h-11 w-11`}>
										<p.Icon className="h-5 w-5" />
									</span>
									<div className="flex flex-col gap-1 text-start">
										<h3 className="text-note font-bold text-primary dark:text-white">
											{p.title}
										</h3>
										<p className="text-subtitle leading-relaxed text-gray-600 dark:text-gray-300">
											{p.copy}
										</p>
									</div>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* The competition (how it works)                                     */
/* ------------------------------------------------------------------ */

const steps = [
	{
		n: "١",
		title: "سجّل بياناتك",
		copy: "الاسمُ ورقمُ الهاتفِ والمحافظة — عبر التطبيق أو رابطِ المسابقة.",
	},
	{
		n: "٢",
		title: "احفظ حقوقَ المحطة",
		copy: "افتح الكتيّب واحفظ حقوقَ كلِّ محطةٍ (نحوَ خمسةِ حقوقٍ لكلِّ محطة).",
	},
	{
		n: "٣",
		title: "أكمل المحطّات",
		copy: "بعد كلِّ محطةٍ اضغط «تمّ»، حتى تُتمَّ الحقوقَ الخمسةَ والثلاثين.",
	},
	{
		n: "٤",
		title: "استلم جائزتك",
		copy: "عند مدينةِ الإمام الحسن (ع) على طريقِ يا حسين، مقابلَ العمودِ رقم ١١٠.",
	},
]

function Competition() {
	return (
		<section className="relative overflow-hidden py-16 lg:py-24">
			<div className="container flex flex-col items-center gap-3 pb-14 text-center">
				<Reveal className="text-title font-bold text-primary dark:text-white">
					احفظ رسالةَ الحقوق… ونلْ جائزتَك
				</Reveal>
				<Reveal
					delay={0.1}
					className="max-w-xl text-body leading-relaxed text-gray-600 dark:text-gray-300"
				>
					احفظ خمسةً وثلاثين حقًّا من رسالةِ الحقوق، محطةً بعد محطة.
				</Reveal>
			</div>

			<div className="container flex flex-col items-center justify-between gap-14 lg:flex-row-reverse">
				<Reveal
					y={40}
					className="flex w-full flex-col items-center gap-4 lg:w-1/2"
				>
					<PhoneMockup
						src={`${ASSET}/competition-guide.webp`}
						alt="دليل المسابقة في تطبيق معارف سجادية"
						framed
						position="top"
						glow="bg-secondary/20"
						sizes="(max-width: 1024px) 50vw, 220px"
						className="h-[23rem] w-[10.6rem] sm:h-[26rem] sm:w-[12rem]"
					/>
					<span className="text-subtitle font-semibold tracking-wide text-secondary_dark dark:text-Muharram_secondary">
						كنزٌ لا يضيع
					</span>
				</Reveal>

				<Reveal y={20} className="w-full lg:w-1/2">
					<ol className={`${PANEL} divide-y divide-secondary/10 dark:divide-Muharram_secondary/10`}>
						{steps.map((s) => (
							<li
								key={s.n}
								className="flex items-start gap-4 p-5"
							>
								<span className={`${ICON_BADGE} h-11 w-11 text-base font-bold`}>
									{s.n}
								</span>
								<div className="flex flex-col gap-1 text-start">
									<h3 className="text-note font-bold text-primary dark:text-white">
										{s.title}
									</h3>
									<p className="text-subtitle leading-relaxed text-gray-600 dark:text-gray-300">
										{s.copy}
									</p>
								</div>
							</li>
						))}
					</ol>
				</Reveal>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Prizes spotlight (emerald band — white text for contrast)          */
/* ------------------------------------------------------------------ */

const prizes = [
	{
		n: "١",
		level: "المبتدئ",
		range: "٣–٥ حقوق",
		reward: "مسبحةٌ من كربلاء وشهادةُ مشاركة",
	},
	{
		n: "٢",
		level: "المتوسّط",
		range: "٦–١٠ حقوق",
		reward: "سجادةُ صلاةٍ ونسخةٌ فاخرةٌ من رسالة الحقوق",
	},
	{
		n: "٣",
		level: "المتقدّم",
		range: "١١–٢٠ حقًّا",
		reward: "حقيبةُ المشروع وقارئٌ إلكترونيٌّ ودعوةٌ لدورةٍ علمية",
	},
	{
		n: "٤",
		level: "المتميّز",
		range: "٢١–٣٥ حقًّا",
		reward: "سكنُ ليلةٍ في ضيافةِ العتبة الحسينية، ولابتوب وموبايل وآيباد",
		highlight: true,
	},
]

function Prizes() {
	return (
		<section className="relative overflow-hidden bg-primary py-16 lg:py-24 dark:bg-Muharram_primary">
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
			/>
			<div className="container relative z-10 flex flex-col items-center gap-4 pb-12 text-center">
				<Reveal className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-subtitle font-semibold text-white">
					<Gift className="w-4 h-4" />
					الجوائز
				</Reveal>
				<Reveal
					delay={0.05}
					className="text-hero font-bold leading-tight text-white"
				>
					هدايا تليقُ بمسيرك
				</Reveal>
				<Reveal
					delay={0.1}
					className="max-w-xl text-body leading-relaxed text-white/90"
				>
					جائزةٌ لكلِّ مستوى — من أوّلِ حقٍّ تحفظه.
				</Reveal>
			</div>

			<div className="container relative z-10">
				<Reveal
					y={30}
					className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/10 backdrop-blur-sm"
				>
					<ul className="divide-y divide-white/10">
						{prizes.map((p) => (
							<li
								key={p.n}
								className={`flex items-start gap-4 px-5 py-5 transition-colors sm:px-7 ${
									p.highlight
										? "bg-secondary/[0.08]"
										: "hover:bg-white/[0.04]"
								}`}
							>
								<span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-base font-bold text-secondary ring-1 ring-secondary/30">
									{p.n}
								</span>
								<div className="flex-1 text-start">
									<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
										<h3 className="text-note font-bold text-white">
											{p.level}
										</h3>
										<span className="text-subtitle font-medium text-secondary">
											{p.range}
										</span>
										{p.highlight && (
											<span className="rounded-full bg-secondary px-2 py-0.5 text-[0.7rem] font-bold text-primary">
												الجائزة الكبرى
											</span>
										)}
									</div>
									<p className="mt-1 text-subtitle leading-relaxed text-white/65">
										{p.reward}
									</p>
								</div>
							</li>
						))}
					</ul>
				</Reveal>
			</div>

			<Reveal delay={0.1} className="container relative z-10 pt-8">
				<p className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-center text-subtitle font-medium text-white/85">
					<Award className="h-4 w-4 shrink-0 text-secondary" />
					تجمعُ نقاطًا تستبدلُها بهدايا، ومكافأةٌ إضافيةٌ للمشاركةِ
					العائلية
				</p>
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

const features = [
	{
		Icon: IdCard,
		title: "بطاقةُ الزائر",
		note: "تتابعُ تقدّمَك: المسافةُ المقطوعةُ والمتبقّية وعددُ الحقوقِ المحفوظة.",
	},
	{
		Icon: Navigation,
		title: "دليلُ الزائر",
		note: "خدماتُ الطريق — مفارزُ طبيّةٌ وصحيّاتٌ وغيرُها — مع رقمِ العمودِ والاتجاهات.",
	},
	{
		Icon: ListChecks,
		title: "اختباراتٌ ذاتيّة",
		note: "اختبر حفظَك بأسئلةٍ مختارة، واطّلعْ على نتيجتِك فورًا.",
	},
	{
		Icon: Headphones,
		title: "قصائدُ وزيارات",
		note: "مكتبةٌ صوتيّةٌ من القصائدِ والزياراتِ تُؤنِسُ مسيرك.",
	},
	{
		Icon: ScrollText,
		title: "كتيّبُ الحقوق",
		note: "نصُّ الحقوقِ المختارةِ من رسالةِ الحقوق، مُنسّقٌ للحفظِ والمراجعة.",
	},
	{
		Icon: WifiOff,
		title: "رفيقٌ في الطريق",
		note: "النصوصُ والصوتيّاتُ متاحةٌ للقراءةِ والاستماعِ دونَ اتصالٍ بعد التحميل.",
	},
]

function Features() {
	return (
		<section className="container py-16 lg:py-24">
			<div className="flex flex-col items-center gap-4 pb-12 text-center">
				<Reveal className="text-title font-bold text-primary dark:text-white">
					كلُّ ما تحتاجُه في الطريق
				</Reveal>
			</div>

			<Reveal y={30}>
				<div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-secondary/15 bg-secondary/15 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f) => (
						<div
							key={f.title}
							className="flex flex-col items-center gap-4 bg-white p-8 text-center dark:bg-Muharram_primary"
						>
							<span className={`${ICON_BADGE} h-11 w-11`}>
								<f.Icon className="h-5 w-5" />
							</span>
							<h3 className="text-note font-bold text-primary dark:text-white">
								{f.title}
							</h3>
							<p className="text-subtitle leading-relaxed text-gray-600 dark:text-gray-300">
								{f.note}
							</p>
						</div>
					))}
				</div>
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Mockup gallery (touch scroll-snap)                                 */
/* ------------------------------------------------------------------ */

const gallery = [
	{ img: "homepage.webp", caption: "الرئيسية" },
	{ img: "roadmap.webp", caption: "خارطة المحطّات" },
	{ img: "visitor-card.webp", caption: "بطاقةُ الزائر" },
	{ img: "visitor-guide.webp", caption: "دليلُ الزائر" },
	{ img: "quizzes.webp", caption: "الاختبارات" },
	{ img: "audio.webp", caption: "قصائدُ وزيارات" },
]

function MockupGallery() {
	return (
		<section className="relative overflow-hidden py-16 lg:py-24">
			<div className="container flex flex-col items-center gap-3 pb-12 text-center">
				<Reveal className="text-title font-bold text-primary dark:text-white">
					تصفّحْ بين يديك
				</Reveal>
			</div>

			<Reveal y={40}>
				<div className="scrollbar-hide mx-auto flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8">
					{gallery.map((g) => (
						<figure
							key={g.img}
							className="flex shrink-0 snap-center flex-col items-center gap-4"
						>
							<PhoneMockup
								src={`${ASSET}/${g.img}`}
								alt={`${g.caption} — معارف سجادية`}
								framed
								glow="bg-secondary/15"
								sizes="(max-width: 640px) 55vw, 12rem"
								className="h-[24rem] w-[11rem] sm:h-[26rem] sm:w-[12rem]"
							/>
							<figcaption className="text-note font-semibold text-secondary_dark dark:text-Muharram_secondary">
								{g.caption}
							</figcaption>
						</figure>
					))}
				</div>
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Trust quote (no fake reviews for an unreleased app)                */
/* ------------------------------------------------------------------ */

function TrustQuote() {
	return (
		<section className="relative py-16 lg:py-24">
			<div className="container mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
				<Reveal>
					<Quote className="h-12 w-12 text-secondary/50" />
				</Reveal>
				<Reveal
					delay={0.05}
					className="text-title font-bold leading-relaxed text-primary dark:text-white"
				>
					«فإنَّ للهِ عليكَ حقوقًا مُحيطةً بك في كلِّ حركةٍ تحرّكتَها»
				</Reveal>
				<Reveal
					delay={0.1}
					className="text-note font-semibold text-secondary_dark dark:text-Muharram_secondary"
				>
					— من رسالةِ الحقوق، الإمام زين العابدين (عليه السلام)
				</Reveal>
				<Reveal className="flex items-center gap-3 text-secondary/60">
					<span className="h-px w-16 bg-secondary/40" />
					<span className="h-1.5 w-1.5 rounded-full bg-secondary" />
					<span className="h-px w-16 bg-secondary/40" />
				</Reveal>
				<Reveal
					delay={0.05}
					className="max-w-xl text-body leading-relaxed text-gray-700 dark:text-gray-200"
				>
					ينسجمُ المشروعُ مع دعوةِ المرجعيةِ الدينيةِ إلى استثمارِ
					الزيارةِ في العلمِ والمعرفة — بإعدادِ وإشرافِ مؤسسةِ الإمامِ
					زينِ العابدين (ع) من مصادرَ معتبرة.
				</Reveal>
				<Reveal
					delay={0.1}
					className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-subtitle text-gray-500 dark:text-gray-400"
				>
					<span>إشرافٌ علميّ</span>
					<span className="text-secondary">•</span>
					<span>مصادرُ معتبرة</span>
					<span className="text-secondary">•</span>
					<span>خدمةً للزائرين</span>
				</Reveal>
			</div>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
	{
		q: "ما هو تطبيق معارف سجادية؟",
		a: "رفيقٌ لمسيرتِك في طريقِ يا حسين، يُحوّلُ المسيرَ إلى محطاتِ معرفةٍ ومسابقةٍ لحفظِ رسالةِ الحقوق، مع جوائزَ عند الوصول.",
	},
	{
		q: "كيف أُشاركُ في المسابقة؟",
		a: "سجّل بياناتك، ثم احفظ حقوقَ كلِّ محطةٍ واضغط «تمّ»، حتى تُكملَ المحطاتِ الثمانية (خمسةً وثلاثين حقًّا).",
	},
	{
		q: "هل يجبُ أن أحفظَ الحقوقَ كلَّها؟",
		a: "لا؛ لكلِّ مستوًى جائزته — تبدأُ من حفظِ ثلاثةِ حقوق. وكلَّما حفظتَ أكثرَ ارتقتْ جائزتُك حتى الجائزةِ الكبرى.",
	},
	{
		q: "أين أستلمُ الجائزة؟",
		a: "عند مدينةِ الإمام الحسن (ع) على طريقِ يا حسين، في محطةٍ مخصّصةٍ مقابلَ العمودِ رقم ١١١٠.",
	},
	{
		q: "هل يعملُ دونَ إنترنت؟",
		a: "نعم؛ النصوصُ والكتيّبُ والصوتيّاتُ متاحةٌ دونَ اتصالٍ بعد التحميل.",
	},
	{
		q: "متى يصدرُ التطبيق؟",
		a: "نعملُ عليه بعنايةٍ، وسيصدرُ قريبًا بإذن الله — سجّل اهتمامَك لتكونَ أوّلَ المُشاركين.",
	},
	{
		q: "هل هو مجاني؟",
		a: "نعم، معارف سجادية هديّةٌ خدمةً لزائري الحسين (ع)، دونَ مقابل.",
	},
]

function Faq() {
	return (
		<section className="container max-w-3xl py-16 lg:py-24">
			<Reveal className="pb-10 text-center text-title font-bold text-primary dark:text-white">
				أسئلةٌ يطرحُها الزائر
			</Reveal>
			<Reveal y={20}>
				<Accordion variant="splitted">
					{faqs.map((item, i) => (
						<AccordionItem
							key={i}
							aria-label={item.q}
							title={item.q}
							classNames={{
								base: "!shadow-md border border-secondary/15 rounded-2xl mb-3",
								title: "text-note font-bold text-primary dark:text-white",
								trigger: "min-h-[44px] py-4",
								content:
									"text-body leading-relaxed text-gray-700 dark:text-gray-200 pb-4",
								indicator: "text-primary",
							}}
							indicator={({ isOpen }) => (
								<ChevronRight
									strokeWidth={1}
									className={`transition-transform duration-200 ${
										isOpen ? "-rotate-180" : "rotate-0"
									}`}
								/>
							)}
						>
							{item.a}
						</AccordionItem>
					))}
				</Accordion>
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCta() {
	return (
		<section id="notify" className="container py-16 lg:py-24">
			<Reveal>
				<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#004a3d] p-10 text-center shadow-2xl dark:from-Muharram_primary dark:to-black lg:p-16">
					<div
						aria-hidden
						className="pointer-events-none absolute left-1/2 -top-10 -z-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
					/>
					<div className="relative z-10 flex flex-col items-center gap-7">
						<BookHeart className="h-10 w-10 text-secondary" />
						<h2 className="text-title font-bold leading-snug text-white">
							اجعلْ مسيرتَك إلى الحسين (ع) رحلةَ معرفة
						</h2>
						<p className="text-hero font-bold text-white">
							معارف سجادية
						</p>
						<p className="max-w-lg text-note leading-relaxed text-white/85">
							سجّل بريدَك ليصلَك إشعارُ الإطلاق فورَ توفّرِه على
							المتاجر، بإذن الله.
						</p>
						<div className="flex w-full flex-col items-center gap-6">
							<NotifyForm theme="emerald" id="notify-final" />
							<ComingSoonBadges theme="emerald" />
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	)
}

/* ------------------------------------------------------------------ */

function FooterNote() {
	return (
		<section className="container flex flex-col items-center gap-4 py-12 text-center">
			<span className="h-px w-16 bg-secondary/30" />
			<p className="flex items-center gap-2 text-subtitle font-semibold text-secondary_dark dark:text-Muharram_secondary">
				<Sparkles className="h-4 w-4" />
				كنزٌ لا يضيع
			</p>
			<p className="max-w-md text-subtitle leading-relaxed text-gray-500 dark:text-gray-400">
				معارف سجادية — خدمةٌ من مؤسسةِ الإمامِ زينِ العابدين (عليه
				السلام) لزائري الحسين (ع). نسألُكم الدعاء.
			</p>
			<Link
				href={`${ASSET}/privacy-policy`}
				className="text-subtitle font-medium text-secondary_dark underline-offset-4 transition hover:underline dark:text-Muharram_secondary"
			>
				سياسة الخصوصية وحماية البيانات
			</Link>
		</section>
	)
}

/* ------------------------------------------------------------------ */

export default function MaarifLanding() {
	return (
		<>
			<StickyCta />
			<Hero />
			<Stats />
			<Invitation />
			<Journey />
			<Competition />
			<Prizes />
			<Features />
			<MockupGallery />
			<TrustQuote />
			<Faq />
			<FinalCta />
			<FooterNote />
		</>
	)
}
