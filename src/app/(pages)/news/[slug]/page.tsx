import Image from "next/image"
import NewsCard from "../_components/news-card"
import Breadcrumbs from "@/components/breadcrumb"
import { newsPosts } from "@/lib/data"

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	// mimic the data recieved from fetch(https://api.imamzain.org/news/{slug})
	const post = await newsPosts.filter((item) => item.slug === slug)[0]
	const hours = parseInt(post.date.toISOString().split("T")[1].split(":")[0])
	const timestamp =
		(hours % 12).toString() +
		(hours < 12
			? "  صباحا حسب توقيت النجف الاشرف"
			: "  مساءا حسب توقيت النجف الاشرف")
	// mimic the data recieved from fetch(https://api.imamzain.org/news/{slug}/related)
	const relatedData = await newsPosts.slice(0, 3)

	return (
		<div className="w-8/12 space-y-20 mx-auto py-28 sm:yt-32 lg:py-40 xl:py-48">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "/news" },
					{ name: "خبر", url: "#" },
				]}
			/>

			{/* container */}
			<div className="m-2">
				{/* post title */}
				<h1 className="p-2 sm:p-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">
					{post.title}
				</h1>

				<div className="grid grid-cols-1 grid-flow-row lg:grid-cols-2 gap-4 place-items-stretch">
					{/* post metadata */}
					<div className="space-y-2 h-fit">
						<Image
							src={post.image}
							width={400}
							height={800}
							className="w-full rounded-xl object-cover aspect-square"
							alt={slug}
						/>
						<div className="flex justify-between items-start md:items-center lg:items-start text-slate-400 text-[8px] md:text-lg lg:text-base">
							<div className="w-2 h-2 md:w-4 md:h-4 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat rotate-180" />
							<span>
								تم النشر:{" "}
								{post.date.toISOString().split("T")[0]}
							</span>
							<span>
								آخر تحديث:{" "}
								{post.date.toISOString().split("T")[0]}
							</span>
							<span>{timestamp}</span>
						</div>
					</div>

					{/* post content */}
					<div className="text-sm flex-1 w-6/6 mx-auto my-6 tracking-tight space-y-8 lg:col-span-2 lg:order-last">
						<h1 className="text-lg sm:text-3xl font-semibold">
							{post.body.lede}
						</h1>
						<p className="text-lg">{post.body.content}</p>
						<p className="text-lg">{post.body.tail}</p>
					</div>

					{/* related data */}
					<div className="p-1">
						<h2 className="text-primary font-semibold text-lg lg:text-xl text-center lg:text-left px-4 mb-3">
							مواضيع ذات صلة
						</h2>

						<div className="flex flex-col md:gap-2">
							{relatedData.map((post) => (
								<div key={post.id} className="">
									<NewsCard
										link={`/${post.slug}`}
										img={post.image}
										title={post.title}
										summary={post.summary}
										date={post.date}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
