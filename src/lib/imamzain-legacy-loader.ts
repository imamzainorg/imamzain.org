import alSahifaData from "@/data/imamzain-legacy/al-sahifa.json" assert { type: "json" }
import risalatData from "@/data/imamzain-legacy/risalat-al-huqoq.json" assert { type: "json" }
import type { Dictionary, Subject } from "@/types/imamzain-legacy"

const alSahifa = alSahifaData as Dictionary[]
const risalatAlHuqoq = risalatData as Dictionary[]

const legacies = [
	{ slug: "al-sahifa", title: "الصحيفة السجادية", dictionaries: alSahifa },
	{
		slug: "risalat-al-huqoq",
		title: "رسالة الحقوق",
		dictionaries: risalatAlHuqoq,
	},
] as const

function getLegacy(slug: string) {
	return legacies.find((b) => b.slug === slug) || null
}

export function getDictionaries(legacySlug: string) {
	const legacy = getLegacy(legacySlug)
	if (!legacy) return []
	return legacy.dictionaries.map((d) => ({ slug: d.slug, title: d.title }))
}

export function getDictionary(legacySlug: string, dictionarySlug: string) {
	const legacy = getLegacy(legacySlug)
	if (!legacy) return null
	return legacy.dictionaries.find((d) => d.slug === dictionarySlug) || null
}

export function getSubject(
	legacySlug: string,
	dictionarySlug: string,
	subjectSlug: string,
): Subject | null {
	const dict = getDictionary(legacySlug, dictionarySlug)
	if (!dict) return null
	return dict.subjects.find((s) => s.slug === subjectSlug) || null
}
