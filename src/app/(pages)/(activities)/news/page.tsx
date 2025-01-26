import Link from "next/link"
import Image from "next/image"
import SubscriptionForm from "./_components/subscripition-form"
import SectionTitle from "@/components/section"
import Breadcrumbs from "@/components/breadcrumb"
import { newsPosts } from "@/lib/data"

export default async function page() {
	// mimick incoming data from: GET https://api.imamzain.org/news/latest?length=4
	const latestData = await newsPosts.slice(0, 4)

	// mimick incoming data from: GET https://api.imamzain.org/news/most-read?length=3
	const mostReadData = await newsPosts.slice(0, 4)

	// mimick incoming data from: GET https://api.imamzain.org/news?category=meetings&length=1
	const meetingsData = await newsPosts.slice(0, 4)

	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "#" },
				]}
			/>
			{/* latest posts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{latestData.map((post) =>
					latestData.indexOf(post) === 0 ? (
						<Link
							href={`/news/${post.slug}`}
							key={post.id}
							className="space-y-4 lg:col"
						>
							<div className="relative">
								<div className="absolute w-5 h-5 -bottom-2 right-5 bg-[url('/shapes/indicator.svg')] rotate-90 bg-no-repeat"></div>
								<Image
									src={post.image}
									width={200}
									height={200}
									alt={post.slug}
									className="w-full h-full rounded-xl"
								/>
							</div>
							<div className="space-y-2">
								<h2 className="font-bold text-base">
									{post.title}
								</h2>
								<p className="font-light text-sm inline">
									{post.summary}
								</p>
								<p className="font-extralight text-xs">
									{post.date.toISOString().split("T")[0]}
								</p>
							</div>
						</Link>
					) : (
						<Link
							href={`/news/${post.slug}`}
							key={post.id}
							className="flex justify-center gap-6"
						>
							{/* metadata */}
							<div className="w-4/6 text-xs space-y-2">
								<h2 className="font-bold">{post.title}</h2>
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
					),
				)}
			</div>

			{/* most read section */}
			<div className="space-y-5">
				<SectionTitle title="الاكثر قراءة" />
				<div className="w-full flex items-center gap-2">
					<div className="grid grid-cols-1 gap-4">
						{mostReadData.map((post) => (
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
				<div className="w-full flex flex-col items-center gap-x-8 lg:flex-row">
					<div className="w-[300px] h-[300px] bg-[url('/shapes/ziara-bg.svg')] bg-container rotate-180 bg-center bg-no-repeat flex justify-center items-center text-white">
						{/* stupid but works, rotated because the shape should be upside down, rotate child to make direction right */}
						<div className="rotate-180 text-center w-full">
							<span className="md:text-2xl font-semibold tracking-wide">
								اشترك في
							</span>
							<p className="text-xl mt-8 md:text-3xl tracking-wide font-semibold">
								النشرة البريدية الخاصة
								<br /> بالأعلانات والنشاطات
							</p>
							<SubscriptionForm />
						</div>
					</div>
				</div>
			</div>

			{/* meetings section */}
			<div className="">
				<SectionTitle title="لقاءات" />
				<Link
					href={`/news/${meetingsData[meetingsData.length - 1].slug}`}
					className="space-y-4"
				>
					<div className="relative">
						<div className="absolute w-5 h-5 -bottom-2 right-5 bg-[url('/shapes/indicator.svg')] rotate-90 bg-no-repeat"></div>

						<Image
							src={meetingsData[meetingsData.length - 1].image}
							width={200}
							height={200}
							alt={meetingsData[meetingsData.length - 1].slug}
							className="w-full h-full rounded-xl"
						/>
					</div>
					<div className="space-y-2">
						<h2 className="font-bold text-base">
							{meetingsData[meetingsData.length - 1].title}
						</h2>
						<p className="font-light text-sm">
							{meetingsData[meetingsData.length - 1].summary}
						</p>
						<p className="font-extralight text-xs">
							{
								meetingsData[meetingsData.length - 1].date
									.toISOString()
									.split("T")[0]
							}
						</p>
					</div>
				</Link>
			</div>
		</div>
	)
}
