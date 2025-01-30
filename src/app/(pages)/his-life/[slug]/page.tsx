import Breadcrumbs from "@/components/breadcrumb"
import { ImamLifeSection } from "@/lib/data"

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	const section = ImamLifeSection.filter((item) => item.slug === slug)[0]

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
					<h3 className="w-60 h-auto absolute top-0  p-4 bg-[url('/shapes/button-bg.svg')] bg-center bg-no-repeat text-center text-white font-semibold ">
						{section.title}
					</h3>
					<p className="text-justify tracking-tighter w-11/12 mx-auto text-lg leading-loose">
						{section.content}
					</p>
				</div>
			</div>
		</div>
	)
}
