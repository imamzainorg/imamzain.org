import Breadcrumbs from "@/components/breadcrumb"
import { dataFetcher } from "@/lib/dataFetcher"
import ModalButton from "../../../_components/modal-button"
import Section from "@/components/section"
import { Legacy } from "@/types/imamzain-legacy"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	const data = await dataFetcher<Legacy[]>("imamzain-legacy.json")
	const alsahifa = data?.find((legacy) => legacy.slug === "al-sahifa")

	if (!alsahifa) return notFound()

	const selectedDictionary = alsahifa.dictionaries.find(
		(dict) => dict.slug === slug,
	)

	if (!selectedDictionary) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md">
					<p className="text-red-500 text-lg font-medium">
						⚠️ لم يتم العثور على المعجم المطلوب
					</p>
					<Link
						href="/library/al-sahifa/read/al-sahifa-al-sajjadiya"
						className="mt-4 inline-block text-primary dark:text-Muharram_primary hover:underline"
					>
						العودة إلى الأقسام المتاحة
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="px-4 sm:px-10 py-10 bg-gradient-to-br  min-h-screen">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: "الصحيفة السجادية", url: "/library/al-sahifa" },
				]}
			/>

			{/* Navigation Tabs */}
			<div className="my-6 lg:hidden bg-white p-4 rounded-xl shadow-sm">
				<h2 className="text-lg font-semibold mb-3 text-center text-gray-700">
					اختر القسم:
				</h2>
				<div className="flex flex-wrap justify-center gap-2">
					{alsahifa.dictionaries.map((dict) => (
						<Link
							key={dict.id}
							href={`/library/al-sahifa/read/${dict.slug}`}
							className={`px-4 py-2 rounded-full transition-colors text-sm md:text-base ${
								dict.slug === selectedDictionary.slug
									? "bg-primary dark:bg-Muharram_primary text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{dict.title}
						</Link>
					))}
				</div>
			</div>

			<div className="flex  flex-row gap-8 mt-6">
				{/* Sidebar Navigation */}
				<aside className="lg:w-1/4 space-y-6 hidden lg:block sticky top-32 self-start">
					<div className="bg-white shadow-md border border-primary/20 dark:border-Muharram_primary/20 rounded-2xl p-6 space-y-4">
						<h2 className="text-md font-bold text-center text-primary dark:text-Muharram_primary">
							الصحيفة السجادية
						</h2>
						<div className="h-px bg-primary/20 dark:bg-Muharram_primary/20"></div>
						<nav className="flex flex-col gap-2 text-sm">
							{alsahifa.dictionaries.map((dict) => (
								<Link
									key={dict.id}
									href={`/library/al-sahifa/read/${dict.slug}`}
									className={`p-2 px-3 rounded-lg transition-colors ${
										dict.slug === selectedDictionary.slug
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

				{/* Main Content */}
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
						id={selectedDictionary.slug}
						title={selectedDictionary.title}
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-11/12">
						{selectedDictionary.subjects.map((subject) => (
							<ModalButton key={subject.id} subject={subject} />
						))}
					</div>
				</main>
			</div>
		</div>
	)
}
