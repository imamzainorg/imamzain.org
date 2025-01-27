import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import { newsPosts } from "@/lib/data"
import PostCard from "../_components/news-card"

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
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "/news" },
					{ name: slug, url: "#" },
				]}
			/>

			{/* post title */}
			<h1 className="p-2 sm:p-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold mb-6">
				{post.title}
			</h1>
			<div className="flex gap-x-10 justify-between flex-wrap">
				{/* post metadata */}
				<div className="space-y-2 lg:w-7/12 relative">
					<Image
						src={post.image}
						width={400}
						height={800}
						className="w-full rounded-xl object-cover h-full"
						alt={slug}
					/>
					<div className="w-full absolute -bottom-8 ">
						<div className="flex justify-between items-start md:items-center lg:items-start text-slate-400 text-[8px] md:text-lg lg:text-sm">
							<div className="w-2 h-2 md:w-4 md:h-4 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat rotate-180" />
							<span>
								تم النشر:
								{post.date.toISOString().split("T")[0]}
							</span>
							<span>
								آخر تحديث:
								{post.date.toISOString().split("T")[0]}
							</span>
							<span>{timestamp}</span>
						</div>
					</div>
				</div>

				{/* post content */}
				<div className="text-lg my-10 tracking-tight space-y-6 lg:space-y-3 lg:col-span-2 lg:order-last w-full">
					<h1 className="">{post.body.lede}</h1>
					<p className="">{post.body.content}</p>
					<p className="">{post.body.tail}</p>
				</div>

				{/* related data */}

				<div className="lg:w-4/12">
					<h2 className="text-primary font-bold text-center lg:text-left p-4 mb-2 sm:text-xl xl:text-2xl">
						مواضيع ذات صلة
					</h2>

					<div className="grid grid-cols-1 gap-4">
						{relatedData.map((post) => (
							<PostCard key={post.id} {...post} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
