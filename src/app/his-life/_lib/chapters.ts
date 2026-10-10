import { dataFetcher } from "@/lib/dataFetcher"
import type { imamzainLife } from "@/types/imamzain-life"
import { chapterOrder } from "../_data/biography"
import { anchorId } from "./anchors"

// A narration: an optional number ("3- قال المفيد: ...") and its paragraphs (trusted HTML).
export type Entry = { id?: string; number?: number; paragraphs: string[] }
export type Section = { id?: string; title?: string; entries: Entry[] }
export type Chapter = {
	slug: string
	title: string
	// The chapter's own opening words, for search results and link previews.
	description: string
	sections: Section[]
	readingMinutes: number
}

const NUMBERED = /^\s*<strong>\s*(\d+)\s*-\s*/

// Chapter HTML is a flat run of <p> (some loosely closed) and <h2> section titles.
function parseSections(html: string): Section[] {
	const sections: Section[] = [{ entries: [] }]
	const used = new Set<string>()
	const unique = (id: string) => {
		let candidate = id
		for (let i = 2; used.has(candidate); i++) candidate = `${id}-${i}`
		used.add(candidate)
		return candidate
	}

	for (const chunk of html.split(/(<h2>[\s\S]*?<\/h2>)|<\/?p>/)) {
		const text = chunk?.trim()
		if (!text) continue

		const heading = text.match(/^<h2>([\s\S]*)<\/h2>$/)
		if (heading) {
			const title = heading[1].replace(/<[^>]+>/g, "").trim()
			sections.push({ id: unique(anchorId(title)), title, entries: [] })
			continue
		}

		const section = sections[sections.length - 1]
		const numbered = text.match(NUMBERED)
		if (numbered) {
			const number = Number(numbered[1])
			section.entries.push({
				id: unique(`n-${number}`),
				number,
				paragraphs: [text.replace(NUMBERED, "<strong>")],
			})
		} else if (section.entries.length) {
			section.entries[section.entries.length - 1].paragraphs.push(text)
		} else {
			section.entries.push({ paragraphs: [text] })
		}
	}

	return sections.filter((s) => s.title || s.entries.length)
}

export async function getChapters(): Promise<Chapter[]> {
	const raw = await dataFetcher<imamzainLife[]>("imamzain.json")
	const order = new Map(chapterOrder.map((slug, i) => [slug, i]))

	return raw
		.map((chapter) => {
			const text = chapter.content
				.replace(/<small>[\s\S]*?<\/small>/g, " ")
				.replace(/<[^>]+>/g, " ")
				.replace(/\s+/g, " ")
				.trim()
			return {
				slug: chapter.slug,
				title: chapter.title,
				description: text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text,
				sections: parseSections(chapter.content),
				readingMinutes: Math.max(1, Math.round(text.split(" ").length / 180)),
			}
		})
		.sort((a, b) => (order.get(a.slug) ?? order.size) - (order.get(b.slug) ?? order.size))
}
