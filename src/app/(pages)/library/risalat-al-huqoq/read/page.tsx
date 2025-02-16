import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import { dataFetcher } from "@/lib/dataFetcher"
import { Haq } from "@/types/haq"

export default async function Page() {
	const data = await dataFetcher<Haq[]>("risalat-al-huqoq.json")

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

			<div className="text-center max-w-screen-2xl mx-auto space-y-5">
				<h1 className="text-4xl font-semibold">رسالة الحقوق</h1>
				<p className="text-2xl text-justify">
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
			</div>

			<Section title="رسائل الحقوق" />
			<div className="grid grid-cols-2 sm:grid-cols-3">
				{data.map((haq) => (
					<div
						key={haq.id}
						className="group shadow-sm bg-[#fdf7ef] border-2 cursor-pointer rounded-xl flex justify-between items-center p-4 m-5 border-transparent hover:border-primary/70 duration-150"
					>
						<h2 className="font-medium text-xl">{haq.title}</h2>
						<h3 className="border-transparent p-2 px-4 rounded-xl border-2 font-medium group-hover:border-primary/70 duration-150">
							{haq.id}
						</h3>
						{/* <div
							className="post-content leading-10"
							dangerouslySetInnerHTML={{ __html: haq.content }}
						/> */}
					</div>
				))}
			</div>
		</div>
	)
}
