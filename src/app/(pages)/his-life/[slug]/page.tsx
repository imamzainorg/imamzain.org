import Breadcrumbs from "@/components/breadcrumb"
import { dataFetcher } from "@/lib/dataFetcher"
import { imamzainLife } from "@/types/imamzainLife"

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	
	const imamzainLife = await dataFetcher<imamzainLife[]>("imamzain.json")


	const section = imamzainLife.find((item) => item.slug === slug)

	if (!section) {
		return (
			<div >
				...
			</div>
		)
	}

	return (
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "سيرة الإمام", url: "/his-life" },
					{ name: section.title, url: `#` },
				]}
			/>
			<div className="lg:w-11/12 mx-auto p-6 relative">
				<div className="space-y-6 bg-yellow-50 rounded-3xl p-6 shadow-lg">
					<h3 className="w-60 h-auto absolute top-0 p-4 bg-[url('/shapes/button-bg.svg')] bg-center bg-no-repeat text-center text-white font-semibold">
						{section.title}
					</h3>
					
					
					<div
						className=" text-justify tracking-tight w-11/12 mx-auto text-lg leading-loose"
						dangerouslySetInnerHTML={{ __html: section.content }}
					/>
				</div>
			</div>
		</div>
	)
}
