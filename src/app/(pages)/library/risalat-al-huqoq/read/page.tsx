import Breadcrumbs from "@/components/breadcrumb"
import { dataFetcher } from "@/lib/dataFetcher"
import ModalButton from "../../_components/modal-button"
import { Legacy } from "@/types/imamzainLegacy"
import Section from "@/components/section"

export default async function Page() {
	const data = await dataFetcher<Legacy[]>("imamzain-legacy.json")
	const risalatAlHuqoq: Legacy = data.filter(
		(legacy) => legacy.slug === "risalat-al-huqoq",
	)[0]
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصحفة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{
						name: "رسالة الحقوق",
						url: "/library/risalat-al-huqoq",
					},
					{
						name: "قراءة",
						url: "#'",
					},
				]}
			/>

			<div className="my-16 space-y-8">
				<h1 className="text-center text-3xl xl:text-4xl font-semibold">
					رسالة الحقوق
				</h1>
				<p className="text-justify w-3/4 mx-auto tracking-tighter xs:tracking-tight leading-8 sm:!leading-loose sm:text-lg xl:text-2xl">
					هذه الرسالة تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ
					البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً
					بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان
					الثلاثة، مع ربِّه ونفسِه ومجتمعه.وترسم حدود العلائق
					والواجبات بين الإنسان وجميع ما يحيط به. ويقول الأديب باقر
					شريف القرشي، حول هذه الرسالة: «من المؤّلفات المهمّة في دنيا
					الإسلام» رسالة الحقوق «للإمام زين العابدين، فقد وضعت المناهج
					الحيّة لسلوك الإنسان، وتطوير حياته، وبناء حضارته، على أسس
					تتوافر فيها جميع عوامل الاستقرار النّفسي.»
				</p>

				{risalatAlHuqoq.dictionaries.map((dictionary) => (
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
