import { getDictionaries } from "@/lib/imamzain-legacy-loader"
import Breadcrumbs from "@/components/breadcrumb"
import Link from "next/link"
import Section from "@/components/section"

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { dictionarySlug: string }
}) {
	const dictionaries = await getDictionaries("al-sahifa")
	const { dictionarySlug } = await params

	return (
		<div className="px-4 sm:px-10 py-10 bg-gradient-to-br min-h-screen">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: "الصحيفة السجادية", url: "/library/al-sahifa" },
					{ name: "قراءة", url: "/library/al-sahifa/read" },
				]}
			/>

			{/* MOBILE DICT TABS */}
			<div className="my-6 lg:hidden bg-white p-4 rounded-xl shadow-sm">
				<h2 className="text-lg font-semibold mb-3 text-center text-gray-700">
					اختر القسم:
				</h2>

				<div className="flex flex-wrap justify-center gap-2">
					{dictionaries.map((dict) => (
						<Link
							key={dict.slug}
							href={`/library/al-sahifa/read/${dict.slug}`}
							className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
						>
							{dict.title}
						</Link>
					))}
				</div>
			</div>

			{/* LAYOUT WITH SIDEBAR */}
			<div className="flex flex-row gap-8 mt-6">
				<aside className="lg:w-1/4 space-y-6 hidden lg:block sticky top-32 self-start">
					<div className="bg-white shadow-md border border-primary/20 dark:border-Muharram_primary/20 rounded-2xl p-6 space-y-4">
						<h2 className="text-md font-bold text-center text-primary dark:text-Muharram_primary">
							الصحيفة السجادية
						</h2>
						<div className="h-px bg-primary/20 dark:bg-Muharram_primary/20"></div>
						<nav className="flex flex-col gap-2 text-sm">
							{dictionaries.map((dict) => (
								<Link
									key={dict.slug}
									href={`/library/al-sahifa/read/${dict.slug}`}
									className={`p-2 px-3 rounded-lg transition-colors ${
										dict.slug === dictionarySlug
											? "bg-primary/10 text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary font-medium"
											: "hover:bg-gray-50 text-gray-700"
									}`}
								>
									{dict.title}
								</Link>
							))}
						</nav>
					</div>

					<div className="bg-white shadow-md border border-primary/20  dark:border-Muharram_primary/20 rounded-2xl p-6 space-y-4">
						<h2 className="text-md font-bold text-center text-primary dark:text-Muharram_primary">
							روابط مهمة
						</h2>
						<div className="h-px bg-primary/20"></div>
						<Link
							href="#"
							className="block p-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-sm"
						>
							معجم الألفاظ
						</Link>
					</div>
				</aside>

				<main className="lg:w-3/4 space-y-8">
					<div className="text-center">
						<h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-Muharram_primary mb-4">
							الصحيفة السجادية
						</h1>
						<p className="text-justify text-gray-700 leading-relaxed text-lg">
							الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من
							الأدعية للإمام علي بن الحسين المُلَقَّبِ بالسجاد
							وزين العابدين. هي الصحيفة الاولى التي يرجع سندها إلى
							الإمام زين العابدين (عليه السلام)... والتي خصها
							الأصحاب بالذكر في إجازاتهم واهتموا براويتها منذ
							القديم وتوارث ذلك الخلف عن السلف وطبقة عن طبقة،
							وتنتهي روايتها إلى الإمام الباقر وزيد الشهيد إبني
							الإمام زين العابدين.
						</p>
					</div>

					<Section
						id={dictionarySlug}
						title={
							dictionaries.find((d) => d.slug === dictionarySlug)
								?.title || ""
						}
					/>
					{children}
				</main>
			</div>
		</div>
	)
}
