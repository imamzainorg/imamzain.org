// Section anchors are the heading text itself (diacritics and punctuation
// dropped), e.g. /his-life/al-muakf#موقفه-مع-الغزالة, so a link keeps working
// when other sections are added or reordered. Numbered narrations use #n-<number>.
export function anchorId(text: string) {
	return text
		.replace(/[^\p{L}\p{N}\s-]/gu, "")
		.trim()
		.replace(/\s+/g, "-")
}

export function chapterHref(slug: string, anchor?: string | number) {
	if (anchor === undefined) return `/his-life/${slug}`
	const id = typeof anchor === "number" ? `n-${anchor}` : anchorId(anchor)
	return `/his-life/${slug}#${id}`
}

export const arabicNumber = (n: number) => n.toLocaleString("ar-EG")

export function readingTimeLabel(minutes: number) {
	if (minutes <= 1) return "دقيقة قراءة"
	if (minutes === 2) return "دقيقتا قراءة"
	if (minutes <= 10) return `${arabicNumber(minutes)} دقائق قراءة`
	return `${arabicNumber(minutes)} دقيقة قراءة`
}
