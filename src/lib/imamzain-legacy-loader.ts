import alSahifaData from "@/data/imamzain-legacy/al-sahifa.json" with { type: "json" }
import risalatData from "@/data/imamzain-legacy/risalat-al-huqoq.json" with { type: "json" }
import type {
	Dictionary,
	NavDictionary,
	NavSubject,
	SearchIndexEntry,
	Subject,
} from "@/types/imamzain-legacy"

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

export function getFullDictionaries(legacySlug: string): Dictionary[] {
	const legacy = getLegacy(legacySlug)
	if (!legacy) return []
	return legacy.dictionaries
}

/**
 * Dictionary tree with the phrase bodies stripped out: just enough for the
 * sidebar nav to render titles and links.
 *
 * The nav is a client component, so whatever it receives is serialized into
 * every page under the dictionary layout. Only the active dictionary's
 * subjects are included in full; the rest carry a subjectCount for the badge
 * and an empty subjects array. Al-sahifa's 7 dictionaries together run
 * ~520 subjects, so shipping all of them on every page (as this used to)
 * accounted for most of that page's weight. If the reader expands a
 * different dictionary without navigating, DictionaryNav fetches its
 * subjects from /api/library-nav on demand.
 */
export function getNavDictionaries(
	legacySlug: string,
	activeDictionarySlug: string,
): NavDictionary[] {
	const legacy = getLegacy(legacySlug)
	if (!legacy) return []
	return legacy.dictionaries.map((dictionary) => ({
		id: dictionary.id,
		title: dictionary.title,
		slug: dictionary.slug,
		subjectCount: dictionary.subjects?.length || 0,
		subjects:
			dictionary.slug === activeDictionarySlug
				? getNavSubjects(legacySlug, dictionary.slug)
				: [],
	}))
}

/**
 * Titles and slugs for every subject in one dictionary. Used both for the
 * active dictionary above and by the /api/library-nav static route that
 * DictionaryNav fetches when the reader expands a non-active dictionary.
 */
export function getNavSubjects(
	legacySlug: string,
	dictionarySlug: string,
): NavSubject[] {
	const dictionary = getDictionary(legacySlug, dictionarySlug)
	if (!dictionary) return []
	return (dictionary.subjects || []).map((subject) => ({
		id: subject.id,
		title: subject.title,
		slug: subject.slug,
	}))
}

/**
 * Flat, pre-stripped search index for one collection, served as a static file
 * by the search-index route so the client fetches it once on demand instead of
 * receiving it as props on every page.
 *
 * HTML is stripped here rather than on every keystroke in the browser.
 */
export function getSearchIndex(legacySlug: string): SearchIndexEntry[] {
	const legacy = getLegacy(legacySlug)
	if (!legacy) return []

	const entries: SearchIndexEntry[] = []

	for (const dictionary of legacy.dictionaries) {
		for (const subject of dictionary.subjects || []) {
			entries.push({
				dictionaryId: dictionary.id,
				dictionaryTitle: dictionary.title,
				dictionarySlug: dictionary.slug,
				subjectId: subject.id,
				subjectTitle: subject.title,
				subjectSlug: subject.slug,
				phrases: (subject.phrases || []).map((phrase) => ({
					id: phrase.id,
					text: stripHtml(phrase.content),
				})),
			})
		}
	}

	return entries
}

function stripHtml(html: string) {
	return html
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim()
}
