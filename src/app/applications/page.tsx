import type { Metadata } from "next"
import Link from "next/link"
import { Ban, RefreshCw, Moon, Sparkles } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import AppCard, { type AppItem } from "./_components/app-card"

export const metadata: Metadata = {
	title: "تطبيقات المؤسسة",
	description:
		"تطبيقات مؤسسة الإمام زين العابدين (عليه السلام) — موسوعةٌ سجّاديةٌ متكاملةٌ ورفيقُ الدعاء اليومي، بين يديك أينما كنت.",
	keywords: [
		"تطبيقات الإمام زين العابدين",
		"تطبيق أنوار سجادية",
		"معارف سجادية",
		"تطبيقات إسلامية",
		"رسالة الحقوق",
	],
	alternates: { canonical: "/applications" },
	openGraph: {
		title: "تطبيقات مؤسسة الإمام زين العابدين (عليه السلام)",
		description:
			"موسوعة أنوار سجادية الشاملة عن الإمام زين العابدين (عليه السلام)، ومعارف سجادية رفيق المسير والمسابقة — تطبيقاتٌ تُعنى بإرث الإمام السجّاد بين يديك أينما كنت.",
		url: "/applications",
		type: "website",
		images: ["/applications/anwar-sajjadyia/02.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "تطبيقات مؤسسة الإمام زين العابدين (عليه السلام)",
		description:
			"أنوار سجادية ومعارف سجادية — تطبيقات مؤسسة الإمام زين العابدين (عليه السلام).",
		images: ["/applications/anwar-sajjadyia/02.png"],
	},
}

const apps: AppItem[] = [
	{
		name: "أنوار سجادية",
		slug: "anwar-sajjadyia",
		url: "https://anwar.imamzain.org",
		category: "موسوعة شاملة",
		status: "available",
		tagline: "الموسوعة المتكاملة عن الإمام زين العابدين (عليه السلام)",
		description:
			"الصحيفة السجادية ورسالة الحقوق ومسند الإمام وزياراته وسيرته العطرة، مع بحثٍ متقدّمٍ وحكمةِ يومٍ ووضعٍ ليليٍّ مريحٍ للعين — كنزٌ سجّاديٌّ في تطبيقٍ واحد.",
		front: "/applications/anwar-sajjadyia/02.png",
		back: "/applications/anwar-sajjadyia/01.png",
		store: {
			appStore:
				"https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB",
			googlePlay:
				"https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1",
		},
	},
	{
		name: "معارف سجادية",
		slug: "maarif-al-sajjad",
		url: "https://maarif.imamzain.org",
		category: "رفيق المسير والمسابقة",
		status: "soon",
		tagline: "امشِ وتعلَّم في طريقِ يا حسين",
		description:
			"مسابقةٌ لحفظ رسالة الحقوق عبر محطّاتٍ على طريق يا حسين، مع اختباراتٍ وقصائدَ وزياراتٍ ودليلٍ للزائر وجوائزَ عند الوصول — رفيقُك في المسيرة المباركة. نعمل على إطلاقه قريبًا بإذن الله.",
		front: "/applications/maarif-al-sajjad/homepage.webp",
		back: "/applications/maarif-al-sajjad/roadmap.webp",
		framed: true,
	},
]

const trustChips = [
	{ Icon: RefreshCw, label: "متجدّدٌ باستمرار" },
	{ Icon: Ban, label: "بلا إعلانات" },
	{ Icon: Moon, label: "وضعٌ ليليٌّ ونهاري" },
]

export default function Page() {
	return (
		<>
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "التطبيقات", url: "/applications" },
					]}
				/>
			</div>

			<h1 className="sr-only">
				تطبيقات مؤسسة الإمام زين العابدين (عليه السلام)
			</h1>

			{/* Hero / intro */}
			<section className="relative overflow-hidden py-12 lg:py-20">
				<div
					aria-hidden
					className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl dark:bg-Muharram_secondary/10"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute -bottom-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-secondary/10 blur-3xl dark:bg-Muharram_secondary/10"
				/>
				<div className="container flex flex-col items-center text-center animate-fade-in-down">
					<span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-subtitle font-semibold text-primary dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary">
						<Sparkles className="w-4 h-4" />
						منصّة تطبيقاتنا
					</span>
					<h2 className="mt-6 text-hero font-bold leading-[1.15] text-primary dark:text-white">
						نورُ السجّاد بين يديك
					</h2>
					<div className="my-6 h-0.5 w-2/5 bg-gradient-to-r from-transparent via-secondary to-transparent dark:via-Muharram_secondary" />
					<p className="max-w-2xl text-note leading-relaxed text-gray-600 dark:text-gray-300">
						جمعنا لكم معارفَ مدرسة الإمام زين العابدين (عليه السلام)
						في تطبيقاتٍ أنيقةٍ سهلةِ الاستعمال؛ موسوعةٌ جامعةٌ تُغني
						الباحث والمحبّ، ورفيقٌ يوميٌّ يصحبكم في دعائكم ومناجاتكم.
						اخترْ ما يناسبك وابدأ رحلتك مع آل البيت (عليهم السلام).
					</p>
				</div>
			</section>

			{/* Apps grid */}
			<section className="py-8 lg:py-12" aria-label="قائمة التطبيقات">
				<div className="container">
					<div
						className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
						role="list"
					>
						{apps.map((app, index) => (
							<AppCard key={app.slug} app={app} index={index} />
						))}
					</div>
				</div>
			</section>

			{/* Foundation trust band */}
			<section className="py-14">
				<div className="container">
					<div className="relative overflow-hidden rounded-3xl bg-primary bg-pattern p-8 text-center text-white shadow-xl dark:bg-Muharram_primary lg:p-12">
						<h2 className="text-title font-bold leading-[1.2]">
							تطبيقاتٌ تُعنى بإرث الإمام السجّاد (عليه السلام)
						</h2>
						<p className="mx-auto mt-5 max-w-2xl text-note leading-relaxed text-white/90">
							صُمِّمت بعنايةٍ لتكون موثوقةً وميسَّرةً وقريبةً من
							قلبك.
						</p>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
							{trustChips.map(({ Icon, label }) => (
								<span
									key={label}
									className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-note backdrop-blur-sm"
								>
									<Icon className="w-4 h-4 text-secondary" />
									{label}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Closing CTA */}
			<section className="py-16">
				<div className="container flex flex-col items-center gap-4 text-center">
					<p className="inline-flex items-center gap-2 text-note font-bold text-secondary_dark dark:text-Muharram_secondary">
						<Sparkles className="w-5 h-5" />
						المزيد قريباً بإذن الله
					</p>
					<p className="text-note leading-relaxed text-gray-700 dark:text-gray-200">
						هل لديك اقتراحٌ لتطبيقٍ تودّ أن نُطلقه؟
					</p>
					<Link
						href="/services"
						className="inline-flex min-h-[48px] items-center rounded-2xl border border-primary/30 px-10 py-4 text-note font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:border-Muharram_secondary/40 dark:text-Muharram_secondary dark:hover:bg-Muharram_secondary dark:hover:text-white"
					>
						تواصل معنا
					</Link>
				</div>
			</section>
		</>
	)
}
