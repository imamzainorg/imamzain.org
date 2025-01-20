import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import { newsPosts } from "@/lib/data"
import Link from "next/link"

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
					{ name: "خبر", url: "#" },
				]}
			/>

			{/* container */}
			<div className="">
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
					<div className="text-base flex-1 w-6/6 mx-auto my-6 tracking-tight space-y-6 lg:col-span-2 lg:order-last">
						<h1 className="">{post.body.lede}</h1>
						<p className="">{post.body.content}</p>
						<p className="">{post.body.tail}</p>
					</div>

					{/* related data */}

					<h2 className="text-center font-semibold border-t border-b p-4 my-5 sm:text-2xl xl:text-4xl">
						نشاطات ذات صلة
					</h2>

					<div className="grid grid-cols-1 gap-4">
						{relatedData.map((post) => (
							<Link
								href={`/news/${post.slug}`}
								key={post.id}
								className="flex justify-center gap-6"
							>
								{/* metadata */}
								<div className="w-4/6 text-xs space-y-2">
									<h2 className="font-bold line-clamp-1">
										{post.title}
									</h2>
									<p className="font-light line-clamp-2">
										{post.summary}
									</p>
									<p className="font-extralight">
										{post.date.toISOString().split("T")[0]}
									</p>
								</div>

								{/* thumbnail */}
								<div className="w-2/6 h-full relative">
									<div className="absolute w-3 h-3 bottom-2 -right-1.5 bg-[url('/shapes/indicator.svg')] bg-no-repeat"></div>
									<Image
										src={post.image}
										width={200}
										height={200}
										alt={post.slug}
										className="w-full h-full rounded-xl aspect-video"
									/>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
