import Link from "next/link"
import Image from "next/image"
import {
	BookOpen,
	FlaskConical,
	Library as LibraryIcon,
	Mail,
	Newspaper,
	type LucideIcon,
} from "lucide-react"

const popularLinks: { label: string; href: string; Icon: LucideIcon }[] = [
	{ label: "الأخبار", href: "/news", Icon: Newspaper },
	{ label: "المكتبة", href: "/library", Icon: LibraryIcon },
	{ label: "بوابة البحث العلمي", href: "/research", Icon: FlaskConical },
	{ label: "الإصدارات", href: "/publications", Icon: BookOpen },
	{ label: "اتصل بنا", href: "/services", Icon: Mail },
]

export default function NotFound() {
	return (
		<div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center gap-12 py-20">
			<div className="flex flex-col items-center gap-6 text-center">
				<Image
					src="/images/logo.png"
					width={400}
					height={400}
					alt="Logo"
					className="w-40 sm:w-56 lg:w-64 h-auto"
					priority
				/>
				<p className="text-2xl sm:text-3xl font-bold text-primary dark:text-Muharram_primary">
					الصفحة غير موجودة
				</p>
				<p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl">
					عذرًا، لكن الصفحة التي طلبتها غير موجودة. قد يكون الرابط
					قديمًا أو تم نقل المحتوى. يمكنك تصفح أحد الأقسام التالية أو
					العودة إلى الصفحة الرئيسية.
				</p>
				<Link
					href="/"
					className="inline-flex items-center gap-2 bg-primary dark:bg-Muharram_primary hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
				>
					الرجوع إلى الصفحة الرئيسية
				</Link>
			</div>

			<section
				aria-labelledby="popular-sections"
				className="w-full max-w-4xl flex flex-col items-center gap-6"
			>
				<h2
					id="popular-sections"
					className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200"
				>
					الأقسام الشائعة
				</h2>
				<ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
					{popularLinks.map(({ label, href, Icon }) => (
						<li key={href}>
							<Link
								href={href}
								className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-Muharram_primary/10 hover:border-primary dark:hover:border-Muharram_primary hover:shadow-md transition-all duration-200 h-full"
							>
								<Icon className="w-8 h-8 text-primary dark:text-Muharram_primary" />
								<span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center">
									{label}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}
