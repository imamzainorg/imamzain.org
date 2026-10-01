import Image from "next/image"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, TitleIcon } from "@/components/brand"
import { PostRow } from "@/components/post-cards"
import { dataFetcher } from "@/lib/dataFetcher"
import { formatDate } from "@/lib/format"
import { Post } from "@/types/post"
import Newsletter from "../_components/newsletter"
import ShareButtons from "../_components/share-buttons"
import SwiperGallery from "../_components/swiper-gallery"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export const dynamicParams = false

export async function generateStaticParams() {
	const posts = await dataFetcher<Post[]>("posts.json")
	return posts.map((post) => ({ slug: post.slug }))
}

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	const data: Post[] = await dataFetcher<Post[]>("posts.json")

	const post = data.find((item: Post) => item.slug === slug)
	if (!post) notFound()

	// More from the same category first, then the latest stories, never the article itself.
	const others = data.filter((item) => item.slug !== slug)
	const related = [
		...others.filter((item) => item.category === post.category),
		...others.filter((item) => item.category !== post.category),
	].slice(0, 3)

	const hasBody = post.content.replace(/<[^>]*>/g, "").trim().length > 0

	return (
		<div className="container pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "/news" },
					{ name: post.title, url: "#" },
				]}
			/>

			<div className="lg:grid lg:grid-cols-[1fr_22rem] lg:gap-16 xl:grid-cols-[1fr_24rem] xl:gap-24">
				<article className="min-w-0">
					<header>
						<p className="flex items-center gap-2 font-semibold text-secondary_dark dark:text-Muharram_secondary">
							<TitleIcon className="w-3" />
							<time dateTime={post.date}>{formatDate(post.date)}</time>
							<span aria-hidden>·</span>
							<span>{post.category}</span>
						</p>
						<h1 className="mt-4 text-2xl font-bold leading-snug text-primary dark:text-Muharram_primary md:text-3xl md:leading-snug lg:text-4xl lg:leading-snug">
							{post.title}
						</h1>
						<div className="mt-6 border-y border-secondary/30 py-4">
							<ShareButtons url={`https://imamzain.org/news/${slug}`} title={post.title} />
						</div>
					</header>

					<div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[40px] bg-primary/5 dark:bg-Muharram_primary/5">
						<Image
							src={post.image}
							alt={post.title}
							fill
							priority
							sizes="(max-width: 1024px) 100vw, 60vw"
							className="object-contain"
						/>
					</div>

					{hasBody && (
						<div
							className="news-body mt-12"
							// safe: post.content comes from trusted static JSON
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					)}

					{post.attachments && post.attachments.length > 0 && (
						<section className="mt-20">
							<SectionTitle title="معرض الصور" className="mb-8" />
							<SwiperGallery images={post.attachments} />
						</section>
					)}
				</article>

				<aside className="mt-20 lg:mt-0">
					<div className="space-y-14 lg:sticky lg:top-32">
						<section>
							<h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-primary dark:text-Muharram_primary">
								<TitleIcon className="w-3" />
								مواضيع ذات صلة
							</h2>
							<div>
								{related.map((item) => (
									<PostRow key={item.id} post={item} compact />
								))}
							</div>
						</section>

						<Newsletter />
					</div>
				</aside>
			</div>
		</div>
	)
}
