import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { dataFetcher } from "@/lib/dataFetcher"
import type { YouTubeGroup } from "@/types/youtube-data"
import { findGroupBySlug, getGroupSlug, thumbnailUrl } from "@/lib/youtube"
import VideosBrowser from "../_components/videos-browser"

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const groups = await dataFetcher<YouTubeGroup[]>("youtube.json")
	const group = findGroupBySlug(groups, slug)

	// المجموعة بلا فيديوهات (نظريًا ما يصير، بس لو صار بالداتا) ما عندها
	// شي نبني منه العنوان/الوصف — نتعامل معها متل ما مو موجودة أصلاً
	if (!group || group.videos.length === 0) return {}

	// نستخدم بيانات الفيديو المطابق للسلق تحديدًا (مو بالضرورة أول حلقة)
	// حتى العنوان/الوصف بمحركات البحث يطابقن بالضبط الرابط اللي انفهرس
	const video = group.videos.find((v) => v.slug === slug) ?? group.videos[0]
	const canonicalUrl = `/media/videos/${getGroupSlug(group)}`

	return {
		title: `${video.title} | معرض المرئيات`,
		description: video.desc,
		alternates: { canonical: canonicalUrl },
		openGraph: {
			title: video.title,
			description: video.desc,
			url: canonicalUrl,
			type: "video.other",
			images: [thumbnailUrl(video.thumbnail)],
		},
		twitter: {
			card: "summary_large_image",
			title: video.title,
			description: video.desc,
			images: [thumbnailUrl(video.thumbnail)],
		},
	}
}

export default async function VideoGroupPage({ params }: Props) {
	const { slug } = await params
	const groups = await dataFetcher<YouTubeGroup[]>("youtube.json")
	const group = findGroupBySlug(groups, slug)

	if (!group || group.videos.length === 0) notFound()

	// نفس مجموعة "المعرض" اللي تظهر بالصفحة الرئيسية، حتى المستخدم يوصل
	// لكل الفيديوهات وهو واصل من رابط حلقة معينة — مو محبوس بصفحة معزولة
	const galleryGroups = groups.filter(
		(g) =>
			(g.displayLocation === "internal" || g.displayLocation === "both") &&
			g.videos.length > 0,
	)

	// إذا وصل حد لرابط مجموعة معلّمة "home" مباشرة (من الصفحة الرئيسية
	// مثلاً)، نضيفها بالقائمة يدويًا حتى ما يفتح على صفحة فاضية رغم إنها
	// مستثناة من معرض /videos العام
	const groupsForBrowser = galleryGroups.some((g) => g.id === group.id)
		? galleryGroups
		: [group, ...galleryGroups]

	return (
		<VideosBrowser
			key={getGroupSlug(group)}
			groups={groupsForBrowser}
			initialGroupSlug={getGroupSlug(group)}
			initialVideoSlug={slug}
		/>
	)
}
