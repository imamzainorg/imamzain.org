import Breadcrumbs from "@/components/breadcrumb"
import { dataFetcher } from "@/lib/dataFetcher"
import ModalButton from "../../_components/modal-button"
import Section from "@/components/section"
import { Legacy } from "@/types/imamzainLegacy"

export default async function Page() {
	const data = await dataFetcher<Legacy[]>("imamzain-legacy.json")
	const alsahifa: Legacy = data.filter(
		(legacy) => legacy.slug === "al-sahifa",
	)[0]
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصحفة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{
						name: "رسالة الحقوق",
						url: "/library/al-sahifa",
					},
					{
						name: "قراءة",
						url: "#'",
					},
				]}
			/>

			<div className="my-16 space-y-8">
				<h1 className="text-center text-3xl xl:text-4xl font-semibold">
					الصحيفة السجادية
				</h1>
				<p className="text-justify w-3/4 mx-auto tracking-tighter xs:tracking-tight leading-8 sm:!leading-loose sm:text-lg xl:text-2xl">
					الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من الأدعية
					للإمام علي بن الحسين المُلَقَّبِ بالسجاد وزين العابدين. هي
					الصحيفة الاولى التي يرجع سندها إلى الامام زين العابدين (عليه
					السلام)... والتي خصها الأصحاب بالذكر في إجازاتهم واهتموا
					براويتها منذ القديم وتوارث ذلك الخلف عن السلف وطبقة عن طبقة،
					وتنتهي روايتها إلى الإمام الباقر وزيد الشهيد إبني الإمام زين
					العابدين.
				</p>

				{alsahifa.dictionaries.map((dictionary) => (
					<div key={dictionary.id}>
						<Section title={dictionary.title} />
						<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
							{dictionary.subjects.map((subject) => (
								<ModalButton
									key={subject.id}
									subject={subject}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
