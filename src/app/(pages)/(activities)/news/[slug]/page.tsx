import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import PostCard from "../_components/news-card"

import { FacebookIcon, TwitterIcon } from "@/assets/icons/reusable"
import Link from "next/link"
import NewsShare from "../../../../../components/news-share"
import { dataFetcher } from "@/lib/dataFetcher"
import { Post } from "@/types/post"
import SwiperGallery from "../_components/swiper-gallery"
import HeaderSections from "@/components/header-sections"

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const data: Post[] = await dataFetcher<Post[]>("posts.json")

	const post = data.filter((item: Post) => item.slug === slug)[0]

	// mimic the data received from fetch(https://api.imamzain.org/news/{slug}/related)
	const relatedData = data.slice(0, 3)

	return (
		<div className="">
			{/* Breadcrumbs */}
			<div className="border-b border-gray-200">
				<div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
					<Breadcrumbs
						links={[
							{ name: "الصفحة الرئيسية", url: "/" },
							{ name: "الأخبار", url: "/news" },
							{ name: post.title, url: "#" },
						]}
					/>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Article Content - Main Column */}
					<article className="lg:col-span-8">
						{/* Article Header */}
						<header className="mb-8">
							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 !leading-tight mb-6">
								{post.title}
							</h1>

							{/* Meta Information */}
							<div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200">
								<div className="flex items-center gap-3 text-gray-600">
									<div className="w-3 h-3 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat rotate-180" />
									<time className="text-sm font-medium">
										{post.date}
									</time>
								</div>

								{/* Social Share */}
								<div className="flex items-center gap-3">
									<span className="text-sm text-gray-500 hidden sm:inline">
										مشاركة:
									</span>
									<div className="flex items-center gap-2">
										<Link
											href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.imamzain.org/news/${slug}`)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
											aria-label="Share on Facebook"
										>
											<FacebookIcon
												width={16}
												height={16}
												fill="white"
											/>
										</Link>
										<Link
											href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.imamzain.org/news/${slug}`)}&text=${encodeURIComponent(`اضغط لقراءة المزيد عن "${post.title}"`)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 rounded-full border border-transparent hover:border-slate-500 transition-colors"
											aria-label="Share on Twitter"
										>
											<TwitterIcon
												width={16}
												height={16}
												fill="white"
											/>
										</Link>
										<div className="w-[1px] h-5 bg-gray-600 cursor-pointer" />
										<NewsShare
											iconSize={20}
											className="text-gray-600 hover:text-primary cursor-pointer transition-all"
											url={`https://imamzain.org/news/${slug}`}
										/>
									</div>
								</div>
							</div>
						</header>

						{/* Featured Image */}
						<div className="relative mb-8 overflow-hidden rounded-xl shadow-lg">
							<Image
								src={post.image}
								width={1200}
								height={600}
								className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 hover:scale-105"
								priority
								alt={post.title}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
						</div>

						{/* Article Body */}
						<div className="prose prose-lg prose-gray max-w-none">
							{post.body.lede && (
								<div className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed mb-8 p-6 bg-gray-100 rounded-lg border-l-4 border-primary">
									{post.body.lede}
								</div>
							)}

							<div
								className="post-content text-gray-800 leading-8 space-y-6"
								dangerouslySetInnerHTML={{
									__html: post.body.content,
								}}
							/>

							{post.body.tail && (
								<div className="text-lg text-gray-700 leading-relaxed mt-8 p-4 bg-blue-50 rounded-lg">
									{post.body.tail}
								</div>
							)}
						</div>

						{/* Gallery Section */}
						{post.attachments && (
							<div className="mt-12">
								<HeaderSections title="معرض الصور" />
								<div className="py-10">
									<SwiperGallery images={post.attachments} />
								</div>
							</div>
						)}
					</article>

					{/* Sidebar */}
					<aside className="lg:col-span-4">
						<div className="sticky top-28 space-y-8">
							{/* Related Articles */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
									مواضيع ذات صلة
								</h2>
								<div className="space-y-8">
									{relatedData.map((relatedPost) => (
										<PostCard
											key={relatedPost.id}
											{...relatedPost}
										/>
									))}
								</div>
							</div>

							{/* Newsletter Signup */}
							<div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white">
								<h3 className="text-lg font-bold mb-3">
									اشترك في النشرة الإخبارية
								</h3>
								<p className="text-sm opacity-90 mb-4">
									احصل على آخر الأخبار والتحديثات مباشرة في
									بريدك الإلكتروني
								</p>
								<div className="flex gap-2">
									<input
										type="email"
										placeholder="بريدك الإلكتروني"
										className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm"
									/>
									<button className="px-4 py-2 bg-white text-primary rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
										اشتراك
									</button>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	)
}
