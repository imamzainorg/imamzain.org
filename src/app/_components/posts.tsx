import { MoreLink, SectionTitle } from "@/components/brand"
import { LatestPosts } from "@/components/post-cards"
import type { Post } from "@/types/post"

export default function Posts({ newsPosts }: { newsPosts: Post[] }) {
	return (
		<section className="container pt-24">
			<SectionTitle
				title="الأخبار"
				className="mb-10"
				action={<MoreLink href="/news/archives">أرشيف الأخبار</MoreLink>}
			/>
			<LatestPosts posts={newsPosts} />
		</section>
	)
}
