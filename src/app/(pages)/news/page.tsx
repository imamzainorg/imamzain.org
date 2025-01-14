import Link from "next/link"
import NewsCard from "./_components/news-card"
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
		<div className="w-11/12 space-y-20 mx-auto py-28 sm:yt-32 lg:py-40 xl:py-48">
			{/* page heading */}
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "#" },
				]}
			/>
			{/* latest posts */}
			<div className="grid grid-rows-4 lg:grid-rows-3 grid-flow-col my-8 gap-x-12">
				{/* highlight post */}
				<div className="row-span-1 lg:row-span-3">
					<Link href={`/news/${latestData[0].slug}`}>
						<div className="flex gap-x-4 lg:flex-col-reverse p-1 mx-auto">
							<div className="flex flex-col justify-between w-4/6 lg:w-full my-0 md:my-4">
								<div>
									<h2 className="text-xs lg:text-xl tracking-wide font-bold">
										{latestData[0].title}
									</h2>
									<p className="text-xs lg:text-sm text-gray-700 line-clamp-3 lg:line-clamp-none">
										{latestData[0].summary}
									</p>
								</div>
								<p className="mt-2 lg:mt-4 text-xs text-gray-500">
									{
										latestData[0].date
											.toISOString()
											.split("T")[0]
									}
								</p>
							</div>
							<div className="relative h-full w-3/6 lg:w-full">
								<Image
									src={latestData[0].image}
									width={400}
									height={400}
									className="w-full h-full rounded-xl"
									alt="img"
								/>
								<div className="absolute bottom-3 -right-2 lg:rotate-90 lg:-bottom-3 lg:right-6 w-4 h-4 lg:w-6 lg:h-6 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat z-10" />
							</div>
						</div>
					</Link>
				</div>
				{/* following posts */}
				{latestData.slice(1).map((post) => (
					<div
						key={post.id}
						className="row-span-1 lg:row-span-1 h-fit col-span-1"
					>
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

			{/* most viewed section */}
			<div className="">
				<div className="w-full flex items-center gap-2">
					<SectionTitle title="الاكثر قراءة" />
				</div>
				<div className="w-full flex flex-col items-center gap-x-8 lg:flex-row">
					<div className="grid grid-rows-3 items-center grid-flow-col lg:w-7/12">
						{mostReadData.map((post) => (
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
					<div className="lg:w-5/12 bg-[url('/shapes/ziara-bg.svg')] bg-contain rotate-180 bg-center bg-no-repeat h-[400px] flex justify-center items-center text-white">
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
				<Link href={`/news/${meetingsData[0].slug}`}>
					<div className="flex sm:gap-8 mx-1 p-2">
						<div className="flex flex-col justify-between w-1/2  md:my-4">
							<div>
								<p className="text-xs sm:text-lg font-bold text-primary">
									{meetingsData[0].category}
								</p>
								<h2 className="text-xs sm:text-xl lg:text-3xl font-bold tracking-wide">
									{meetingsData[0].title}
								</h2>
								<p className="text-xs sm:text-sm sm:line-clamp-none lg:text-lg mt-2 text-gray-700 line-clamp-3 text-justify tracking-wide">
									{meetingsData[0].summary}
								</p>
							</div>
							<p className="mt-2 text-xs sm:text-sm lg:text-lg text-gray-500">
								{
									meetingsData[0].date
										.toISOString()
										.split("T")[0]
								}
							</p>
						</div>
						<div className="relative h-full w-1/2">
							<Image
								src={meetingsData[0].image}
								width={200}
								height={200}
								className="w-full h-full rounded-xl"
								alt="img"
							/>
							<div className="absolute bottom-3 -right-2 @lg:rotate-90 @lg:-bottom-2 @lg:right-5 w-4 h-4 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat z-10" />
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
}
