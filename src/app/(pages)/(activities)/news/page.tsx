import Link from "next/link"
import Image from "next/image"
import SubscriptionForm from "./_components/subscripition-form"
import SectionTitle from "@/components/section"
import Breadcrumbs from "@/components/breadcrumb"
import PostCard from "./_components/news-card"
import { dataFetcher } from "@/lib/dataFetcher"
import { Post } from "@/types/post"
import Arrow from "@/components/Arrow"

export default async function Page() {
	const data = await dataFetcher<Post[]>("posts.json")
	const latestData = data.slice(0, 5)
	const mostReadData = data.slice(0, 3)
	const meetingsData = data.slice(0, 4)
	const imamHussainPosts = data.filter(
		(post) => post.category === "العتبة الحسينية",
	)

	return (
		<div>
			<div className="flex justify-between items-end mt-2 xl:mt-0 xl:mb-4">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "الأخبار", url: "#" },
					]}
				/>

				<Link
					href="/news/archives"
					className="flex text-white p-1 md:text-sm md:mb-1 xl:pr-2 xl:relative xl:left-14   text-[10px] group items-center gap-5 bg-primary border-2 border-transparent hover:bg-secondary rounded-xl transition duration-1000"
				>
					ارشيف الاخبار{" "}
					<Arrow className="translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
				</Link>
			</div>

			{/* Latest Posts */}
			<div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 mt-2">
				<Link
					href={`/news/${latestData[0].slug}`}
					key={latestData[0].id}
					className="lg:w-7/12 space-y-6"
				>
					<div className="relative">
						<div className="absolute w-7 h-7 -bottom-2.5 right-6 bg-[url('/shapes/newsIndicator.svg')] rotate-180 bg-no-repeat"></div>
						<Image
							src={latestData[0].image}
							width={500}
							height={500}
							alt={latestData[0].slug}
							className="w-full h-full rounded-xl"
						/>
					</div>
					<div className=" text-xs space-y-2">
						<h2 className="font-bold line-clamp-1 lg:line-clamp-none lg:text-lg">
							{latestData[0].title}
						</h2>
						<p className="font-light line-clamp-2 lg:text-base">
							{latestData[0].summary}
						</p>
						<p className="font-extralight lg:text-sm">
							{latestData[0].date}
						</p>
					</div>
				</Link>
				<div className="lg:w-4/12">
					<h2 className="text-primary font-bold text-center lg:text-left p-4 mb-2 sm:text-xl xl:text-2xl">
						آخر الاخبار
					</h2>
					<div className="grid lg:grid-rows-4 gap-4">
						{latestData.slice(1).map((post) => (
							<PostCard key={post.id} {...post} />
						))}
					</div>
				</div>
			</div>

			{/* Most Read Section */}
			<div className="space-y-5">
				<SectionTitle title="الاكثر قراءة" />
				<div className="w-full flex flex-col lg:flex-row items-center gap-20">
					<div className="w-full lg:w-7/12 grid grid-cols-1 gap-4">
						{mostReadData.map((post) => (
							<PostCard key={post.id} {...post} />
						))}
					</div>
					<div className="w-5/12 flex flex-col items-center gap-x-8 lg:flex-row">
						<div className="w-[300px] h-[300px] lg:w-[360px] xl:w-[500px] lg:h-[360px] xl:h-[500px] bg-[url('/shapes/ziara-bg.svg')] bg-container rotate-180 bg-center bg-no-repeat flex justify-center items-center text-white relative isolate">
							<div className="absolute w-full h-full bg-[url('/shapes/bg.svg')]" />
							<div className="rotate-180 text-center w-full">
								<span className="md:text-lg lg:text-2xl xl:text-3xl font-semibold tracking-wide">
									اشترك في
								</span>
								<p className="text-lg mt-8 md:text-2xl lg:text-3xl tracking-wide font-normal">
									النشرة البريدية الخاصة
									<br /> بالأعلانات والنشاطات
								</p>
								<SubscriptionForm />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Meetings Section */}
			<div>
				<SectionTitle title="اللقاءات" />
				<Link
					href={`/news/${meetingsData[meetingsData.length - 1].slug}`}
					className="space-y-4 flex flex-col lg:flex-row-reverse"
				>
					<div className="relative lg:w-1/2">
						<div className="absolute rotate-180 lg:rotate-90 w-7 h-7 -bottom-2 right-5 lg:bottom-5 lg:-right-3 bg-[url('/shapes/newsIndicator.svg')] bg-no-repeat"></div>
						<Image
							src={meetingsData[meetingsData.length - 1].image}
							width={1500}
							height={1500}
							alt={meetingsData[meetingsData.length - 1].slug}
							className="w-full h-full rounded-xl"
						/>
					</div>
					<div className="space-y-2 lg:w-1/2">
						<h2 className="font-bold line-clamp-1 lg:line-clamp-none lg:text-lg">
							{meetingsData[meetingsData.length - 1].title}
						</h2>
						<p className="font-light line-clamp-2 lg:text-base">
							{meetingsData[meetingsData.length - 1].summary}
						</p>
						<p className="font-extralight lg:text-sm">
							{meetingsData[meetingsData.length - 1].date}
						</p>
					</div>
				</Link>
			</div>
	
			<SectionTitle title="اخبار العتبة الحسينية المقدسة" />
			<div className="">
				<div className="md:grid md:grid-cols-4 gap-5 p-2 mt-2">
				    {[...imamHussainPosts]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5)
      .map((post, index) => (
						<Link
							href={`/news/${post.slug}`}
							key={post.id}
							className={`"xl:mt-4" ${index === 0 ? "col-span-2 row-span-2" : ""} `}
						>
							<div className="">
								<div className="rounded-xl ">
									<div className="relative w-full h-full overflow-hidden rounded-xl hover:cursor-pointer border-4 border-transparent transition-all  hover:border-secondary duration-300 ease-in-out">
										<Image
											src={post.image}
											alt={post.summary}
											width={1500}
											height={1500}
											className="w-full h-full object-cover transform-origin:center duration-300 hover:scale-110"
										/>
									</div>

									{index === 0 && (
										<h2 className="hidden md:block xl:text-2xl text-lg pt-2 pr-3 font-bold text-gray-900">
											{post.title}
										</h2>
									)}

									<p className="text-lg pr-3 font-medium text-gray-700  mt-2 lg:text-lg mx-auto">
										{post.summary}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
