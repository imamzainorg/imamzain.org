import Link from "next/link"
import {
	ArrowLeft,
	BookOpen,
	FlaskConical,
	Library as LibraryIcon,
	Mail,
	Newspaper,
	type LucideIcon,
} from "lucide-react"
import { SectionTitle, shieldPanel, solidButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { arabicNumber } from "@/lib/format"

const popularLinks: { label: string; href: string; Icon: LucideIcon }[] = [
	{ label: "الأخبار", href: "/news", Icon: Newspaper },
	{ label: "المكتبة", href: "/library", Icon: LibraryIcon },
	{ label: "بوابة البحث العلمي", href: "/research", Icon: FlaskConical },
	{ label: "الإصدارات", href: "/publications", Icon: BookOpen },
	{ label: "اتصل بنا", href: "/services", Icon: Mail },
]

export default function NotFound() {
	return (
		<div className="container pb-24 pt-32 lg:pt-52">
			<div className="grid items-center gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
				<Reveal x={60} y={0}>
					<p
						aria-hidden
						className="mb-6 text-8xl font-extrabold leading-none text-secondary dark:text-Muharram_secondary md:text-9xl"
					>
						{arabicNumber(404)}
					</p>
					<SectionTitle
						as="h1"
						title="الصفحة غير موجودة"
						text="عذرًا، لكن الصفحة التي طلبتها غير موجودة. قد يكون الرابط قديمًا أو تم نقل المحتوى. يمكنك تصفح أحد الأقسام التالية أو العودة إلى الصفحة الرئيسية."
						className="mb-0"
					/>
					<div className="mt-8">
						<Link href="/" className={solidButton}>
							الرجوع إلى الصفحة الرئيسية
						</Link>
					</div>
				</Reveal>

				<Reveal x={-60} y={0} delay={0.15}>
					<section
						aria-labelledby="popular-sections"
						className={`${shieldPanel} mx-2 p-8 md:p-10`}
					>
						<h2
							id="popular-sections"
							className="text-2xl font-extrabold md:text-3xl"
						>
							الأقسام الشائعة
						</h2>
						<ul className="mt-4">
							{popularLinks.map(({ label, href, Icon }) => (
								<li key={href} className="border-b border-dashed border-white/25 last:border-b-0">
									<Link
										href={href}
										className="group flex items-center gap-4 py-4 text-lg font-semibold transition-colors hover:text-secondary md:text-xl"
									>
										<Icon
											className="h-6 w-6 shrink-0 text-secondary dark:text-white"
											strokeWidth={1.6}
											aria-hidden
										/>
										<span className="flex-1">{label}</span>
										<ArrowLeft className="h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
									</Link>
								</li>
							))}
						</ul>
					</section>
				</Reveal>
			</div>
		</div>
	)
}
