import type { YouTubeGroup, YouTubeVideo } from "@/types/youtube-data"

// ⚠️ افتراض: مسارات الثمبنيل بالجيسون نسبية (مثل "general/xxx.png") وتُبنى
// فوق نفس قاعدة الـ CDN المستخدمة بباقي الموقع. عدّل هذا الثابت إذا كانت
// القاعدة الفعلية مختلفة، أو إذا الحقل صار يحتوي روابط كاملة أحيانًا.
const CDN_BASE = "https://cdn.imamzain.org"

export function thumbnailUrl(path: string): string {
	if (path.startsWith("http")) return path
	return `${CDN_BASE}/${path}`
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

// يحسب عدد الفيديوهات بكل تصنيف من الداتا نفسها — ما يعتمد على قائمة
// أسماء ثابتة، فيشتغل تلقائيًا مع أي تصنيف تضيفه لاحقًا. بما إن التصنيف
// صار مصفوفة على مستوى الفيديو (فيديو وحد ممكن يكون بأكثر من تصنيف)،
// كل فيديو يُحسب مرة لكل تصنيف عنده
function normalizeCategories(categories?: string[] | null): string[] {
	if (!Array.isArray(categories)) return []
	return [...new Set(categories.map((category) => category.trim()).filter(Boolean))]
}

export function getCategoryCounts(
	groups: YouTubeGroup[],
): { category: string; count: number }[] {
	const counts = new Map<string, number>()
	for (const group of groups) {
		const seenInGroup = new Set<string>()
		for (const category of normalizeCategories(group.categories)) {
			seenInGroup.add(category)
			counts.set(category, (counts.get(category) ?? 0) + 1)
		}

		for (const video of group.videos) {
			for (const category of normalizeCategories(video.categories)) {
				if (seenInGroup.has(category)) continue
				counts.set(category, (counts.get(category) ?? 0) + 1)
			}
		}
	}
	return Array.from(counts.entries()).map(([category, count]) => ({
		category,
		count,
	}))
}

// فلترة على مستوى المجموعة (تستخدم لقسم "البرامج والسلاسل" وسايدبار
// السلاسل) — المجموعة تنعرض لو أي حلقة بداخلها عندها هذا التصنيف، حتى لو
// باقي حلقاتها بتصنيفات ثانية
export function filterGroupsByCategory(
	groups: YouTubeGroup[],
	category: string | null,
): YouTubeGroup[] {
	if (!category) return groups
	return groups.filter((g) => {
		if (normalizeCategories(g.categories).includes(category)) return true
		return g.videos.some((v) => normalizeCategories(v.categories).includes(category))
	})
}

// فلترة على مستوى الفيديو المنفرد (تستخدم لقسم "أحدث الفيديوهات" حتى لا
// نعرض حلقات من نفس المجموعة ما تطابق التصنيف المختار)
export function videoMatchesCategory(
	video: YouTubeVideo,
	category: string | null,
	groupCategories?: string[] | null,
): boolean {
	if (!category) return true
	return (
		normalizeCategories(video.categories).includes(category) ||
		normalizeCategories(groupCategories).includes(category)
	)
}

export type FlatVideo = {
	video: YouTubeVideo
	groupTitle: string
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
	for (const group of groups) {
		for (const video of group.videos) {
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
	for (const group of groups) {
		if (group.videos.length === 0) continue
		const latest = [...group.videos].sort(
			(a, b) => parseArabicDate(b.date) - parseArabicDate(a.date),
		)[0]
		result.push({ video: latest, groupTitle: group.title })
	}
	return result.sort(
		(a, b) => parseArabicDate(b.video.date) - parseArabicDate(a.video.date),
	)
}
