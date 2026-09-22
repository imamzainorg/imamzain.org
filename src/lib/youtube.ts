import type { YouTubeGroup, YouTubeVideo } from "@/types/youtube-data"

export function thumbnailUrl(path: string): string {
	if (path.startsWith("http")) return path
	return `/${path.replace(/^\/+/, "")}`
}

// السلق اللي يمثل المجموعة كاملة بالرابط — نستخدم سلق أول فيديو بالمجموعة
// (بدل ما نضيف حقل جديد للداتا)، لأن هذا يحقق مطلبين مرة وحدة:
// 1) كل حلقة أصلاً إلها سلق فريد بالجيسون، فما أكو تعارض بين المجموعات.
// 2) أي رابط قديم يشاور لسلق حلقة معينة (مو بالضرورة الأولى) يظل يشتغل،
//    لأن findGroupBySlug يدور على أي فيديو مطابق جوا المجموعة مو بس الأول.
export function getGroupSlug(group: YouTubeGroup): string {
	return group.videos[0]?.slug ?? String(group.id)
}

export function findGroupBySlug(
	groups: YouTubeGroup[],
	slug: string,
): YouTubeGroup | undefined {
	return groups.find((g) => g.videos.some((v) => v.slug === slug))
}

// يحول التاريخ العربي "15‏/07‏/2026" إلى timestamp قابل للمقارنة،
// متجاهلاً محارف الاتجاه الخفية (RLM/LRM) اللي يضيفها المتصفح أحيانًا
export function parseArabicDate(date: string): number {
	const cleaned = date.replace(/[^\d/]/g, "")
	const [day, month, year] = cleaned.split("/").map(Number)
	if (!day || !month || !year) return 0
	return new Date(year, month - 1, day).getTime()
}

export function sortGroupsByLatest(groups: YouTubeGroup[]): YouTubeGroup[] {
	return [...groups].sort((a, b) => {
		const dateA = Math.max(
			...a.videos.map((video) => parseArabicDate(video.date)),
			0,
		)
		const dateB = Math.max(
			...b.videos.map((video) => parseArabicDate(video.date)),
			0,
		)
		return dateB - dateA
	})
}

type FlatVideo = {
	video: YouTubeVideo
	groupTitle: string
}

function getVideoId(video: YouTubeVideo): string {
	try {
		const url = new URL(video.url)
		return url.searchParams.get("v") ?? url.pathname.split("/").pop() ?? video.url
	} catch {
		return video.url || video.slug
	}
}

// يسطّح كل فيديوهات المجموعات بقائمة وحدة مرتبة بالأحدث — يستخدم لقسم
// "أحدث الفيديوهات". استبعاد المجموعة الحالية يتم عند الاستدعاء اعتمادًا
// على slugs الفيديوهات حتى يبقى هذا المساعد عامًا.
// ملاحظة: ما نقص (slice) هنا — القص يصير بعد فلترة التصنيف/البحث بالمكوّن
// اللي يستدعي هالدالة، حتى ما نخسر فيديوهات مطابقة بسبب القص المبكر
export function flattenLatestVideos(
	groups: YouTubeGroup[],
): FlatVideo[] {
	const flat: FlatVideo[] = []
	const seenVideoIds = new Set<string>()
	for (const group of groups) {
		for (const video of group.videos) {
			const videoId = getVideoId(video)
			if (seenVideoIds.has(videoId)) continue
			seenVideoIds.add(videoId)
			flat.push({ video, groupTitle: group.title })
		}
	}
	return flat.sort(
		(a, b) => parseArabicDate(b.video.date) - parseArabicDate(a.video.date),
	)
}

// يرجّع فيديو واحد بس يمثل كل مجموعة (أحدث حلقة بداخلها) — يستخدم لقسم
// "أحدث الفيديوهات" حتى ما تتكرر عدة حلقات من نفس السلسلة بنفس القائمة.
// يشتغل بنفس المنطق سواء المجموعة فيها فيديو مفرد أو سلسلة كاملة
export function getLatestVideoPerGroup(
	groups: YouTubeGroup[],
): FlatVideo[] {
	const result: FlatVideo[] = []
	const seenGroupIds = new Set<number>()
	const seenVideoIds = new Set<string>()
	for (const group of groups) {
		if (group.videos.length === 0 || seenGroupIds.has(group.id)) continue
		seenGroupIds.add(group.id)
		const latest = [...group.videos].sort(
			(a, b) => parseArabicDate(b.date) - parseArabicDate(a.date),
		)[0]
		const videoId = getVideoId(latest)
		if (seenVideoIds.has(videoId)) continue
		seenVideoIds.add(videoId)
		result.push({ video: latest, groupTitle: group.title })
	}
	return result.sort(
		(a, b) => parseArabicDate(b.video.date) - parseArabicDate(a.video.date),
	)
}
