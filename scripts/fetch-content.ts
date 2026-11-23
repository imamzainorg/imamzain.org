// Fetches the site's content from the API (https://api.imamzain.org) and writes it to src/data/ in the
// shapes the pages read. The CMS is the source of truth: these files are generated, gitignored and
// rebuilt before every build (`bun run content`, part of `bun run build`). The API starts a rebuild of
// the site after every content edit, so a change made in the CMS goes live with the next deploy.
//
// A failed request fails the run, and so the build: the deploy then stops and the live site stays on
// its last good version, rather than shipping a site with half its content missing.
//
// Not covered here: youtube.json (the videos still need a curation layer on the API) and
// imamzain-legacy/ (al-Sahifa and Risalat al-Huquq live in this repo by design).

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const API = (process.env.API_URL ?? "https://api.imamzain.org/api/v1").replace(/\/$/, "")
const OUT = path.join(process.cwd(), "src", "data")
const PAGE_SIZE = 100 // the API's maximum
const CONCURRENCY = 6

// The API JSON is read loosely here; the pages type-check the files this script writes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Json = Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<T = any>(route: string): Promise<T> {
	const url = `${API}${route}`
	for (let attempt = 1; ; attempt++) {
		try {
			// Never send the mobile app's User-Agent: the API would then hand out app-only PDF links.
			const res = await fetch(url, { headers: { "Accept-Language": "ar", "User-Agent": "imamzain.org-build" } })
			const body = (await res.json().catch(() => null)) as Json | null
			if (res.ok && body?.success) return body.data as T
			// Rate limits and server errors are worth a retry; anything else is a real error.
			if (attempt >= 4 || (res.status !== 429 && res.status < 500)) {
				throw new Error(`${res.status} ${body?.code ?? ""} ${body?.error ?? ""}`.trim())
			}
		} catch (err) {
			if (attempt >= 4) throw new Error(`GET ${url} failed: ${(err as Error).message}`)
		}
		await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt))
	}
}

async function getAll(route: string): Promise<Json[]> {
	const sep = route.includes("?") ? "&" : "?"
	const first = await get<{ items: Json[]; pagination: { pages: number } }>(`${route}${sep}limit=${PAGE_SIZE}&page=1`)
	const items = [...first.items]
	for (let page = 2; page <= first.pagination.pages; page++) {
		items.push(...(await get<{ items: Json[] }>(`${route}${sep}limit=${PAGE_SIZE}&page=${page}`)).items)
	}
	return items
}

async function mapLimit<T, R>(items: T[], fn: (item: T) => Promise<R>): Promise<R[]> {
	const out = new Array<R>(items.length)
	let next = 0
	await Promise.all(
		Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
			while (next < items.length) {
				const i = next++
				out[i] = await fn(items[i])
			}
		}),
	)
	return out
}

// Dates are stored as UTC midnight of the calendar date, so the UTC date is the right one.
const day = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : "")
const byCreated = (a: Json, b: Json) => String(a.created_at).localeCompare(String(b.created_at)) || String(a.id).localeCompare(String(b.id))
const categoryTitle = (category: Json | null | undefined, key: string) =>
	category?.translation?.title ?? category?.[key]?.[0]?.title ?? ""

async function write(file: string, data: unknown) {
	await writeFile(path.join(OUT, file), JSON.stringify(data, null, "\t") + "\n", "utf-8")
	console.log(`${file}: ${Array.isArray(data) ? data.length : 1} records`)
}

async function posts() {
	const list = await getAll("/posts")
	const details = await mapLimit(list, (p) => get(`/posts/by-slug/${encodeURIComponent(p.slug)}`))
	// `id` orders the posts by publication (higher is newer), as the old hand-numbered ids did.
	const ordered = details.sort(
		(a, b) => String(a.published_at ?? "").localeCompare(String(b.published_at ?? "")) || byCreated(a, b),
	)
	const rows = ordered.map((p, i) => ({
		id: i + 1,
		slug: p.slug,
		image: p.media?.url ?? "",
		title: p.translation?.title ?? "",
		summary: p.translation?.summary ?? "",
		content: p.translation?.body ?? "",
		views: p.views ?? 0,
		date: day(p.published_at),
		last_update: day(p.updated_at),
		category: categoryTitle(p.post_categories, "post_category_translations"),
		attachments: [...(p.post_attachments ?? [])]
			.sort((a: Json, b: Json) => a.display_order - b.display_order)
			.map((a: Json, j: number) => ({ id: j + 1, path: a.media?.url ?? "" }))
			.filter((a: Json) => a.path),
	}))
	await write("posts.json", rows.reverse())
}

const BOOK_LANGUAGE: Record<string, string> = { ar: "العربية", en: "English", fa: "فارسي" }

async function books() {
	const [list, categories] = await Promise.all([getAll("/books"), getAll("/book-categories")])
	const categoryName = new Map(categories.map((c) => [c.id, categoryTitle(c, "book_category_translations")]))
	// A series is one parent in the list; the site shows each volume as its own book, so each
	// volume's full record is fetched (the parent's parts[] carries only a summary of it).
	const parents = await mapLimit(
		list.filter((b) => b.parts_count > 0),
		(b) => get(`/books/by-slug/${encodeURIComponent(b.slug)}`),
	)
	const partSlugs = parents.flatMap((p) => (p.parts ?? []).map((part: Json) => part.slug as string))
	const partDetails = new Map(
		(await mapLimit(partSlugs, (slug) => get(`/books/by-slug/${encodeURIComponent(slug)}`))).map((d) => [d.slug, d]),
	)
	const partsOf = new Map(
		parents.map((p) => [
			p.id,
			[...(p.parts ?? [])].sort((a, b) => a.part_number - b.part_number).map((part: Json) => partDetails.get(part.slug)!),
		]),
	)

	const row = (b: Json, parent?: Json, totalParts?: number) => {
		const t = b.translation ?? {}
		const pt = parent?.translation ?? {}
		const other = t.other_names?.length ? t.other_names : (pt.other_names ?? [])
		const conferences = t.conferences?.length ? t.conferences : (pt.conferences ?? [])
		const owner = parent && !b.category_id ? parent : b
		const title = (t.title ?? pt.title ?? "").trim()
		return {
			slug: b.slug,
			// Volumes share the series title; the site has always told them apart with "ج<n>".
			title: parent && totalParts! > 1 && !/ج\s*\d+$/.test(title) ? `${title} ج${b.part_number}` : title,
			author: t.author ?? pt.author ?? "",
			otherNames: other.filter((n: string) => n.trim()),
			printHouse: t.publisher ?? pt.publisher ?? "",
			printDate: b.publish_year ?? parent?.publish_year ?? "",
			language: BOOK_LANGUAGE[b.document_languages?.[0]] ?? "العربية",
			pages: b.pages ?? 0,
			parts: totalParts ?? b.parts_total ?? 1,
			views: b.views ?? 0,
			image: b.media?.url ?? parent?.media?.url ?? "",
			pdf: b.pdf_url ?? "",
			// "app": the PDF is for the mobile app only, and the API sends the website no link to it.
			pdfAccess: b.pdf_access ?? null,
			// One series name for every volume: the site groups volumes by it.
			series: parent ? (pt.title ?? "").trim() : (t.series ?? ""),
			partNumber: b.part_number ?? 1,
			totalParts: totalParts ?? b.parts_total ?? 1,
			category: [owner.category_id, ...(owner.extra_category_ids ?? [])]
				.map((id: string) => categoryName.get(id))
				.filter(Boolean),
			Conferences: conferences,
		}
	}

	const rows: Json[] = []
	// Kept in the API's order: readable books first, then the CMS's manual order.
	for (const b of list) {
		const parts = partsOf.get(b.id)
		if (parts) rows.push(...parts.map((part) => row(part, b, parts.length)))
		else rows.push(row(b))
	}
	await write("books.json", rows.map((r, i) => ({ id: i + 1, ...r })))
}

async function gallery() {
	const list = (await getAll("/gallery")).sort(byCreated)
	const rows = list.map((g, i) => ({
		id: i + 1,
		name: g.translation?.title ?? "",
		description: g.translation?.description ?? "",
		date: day(g.taken_at),
		tags: g.tags ?? [],
		url: g.media?.url ?? "",
		location: g.locations?.[0] ?? "",
		photographer: g.author ?? "",
		category: categoryTitle(g.gallery_categories, "gallery_category_translations"),
	}))
	await write("gallery.json", rows)
}

async function audios() {
	const list = (await getAll("/audios")).sort(byCreated)
	const details = await mapLimit(list, (a) => get(`/audios/${a.id}`))
	// The old numeric ids are in shared links (/media/audio?id=N), so they are kept. Audios added in
	// the CMS have none and are numbered after the last one, in the order they were added.
	let nextId = Math.max(0, ...details.flatMap((a) => a.legacy_ids ?? [])) + 1
	const rows = details.map((a) => ({
		id: a.legacy_ids?.[0] ?? nextId++,
		// Two old ids that were the same recording: links to either one still open it.
		...(a.legacy_ids?.length > 1 ? { legacyIds: a.legacy_ids } : {}),
		title: a.translation?.title ?? "",
		speaker: a.speaker?.translation?.name ?? "",
		audio: a.audio_url,
		...(a.pdf_url ? { pdf: a.pdf_url } : {}),
		durationSeconds: a.duration_seconds ?? undefined,
		sizeMB: a.size_mb ?? undefined,
		peaks: a.peaks ?? [],
	}))
	await write("AudioItemAnalyzed.json", rows.sort((a, b) => a.id - b.id))
}

const PAPER_LANGUAGE: Record<string, string> = { ar: "عربي", fa: "فارسي", en: "انجليزي" }
const STUDENT_LANGUAGE: Record<string, string> = { ar: "العربية", fa: "فارسي", en: "انجليزي" }
const STUDENT_CATEGORY: Record<string, string> = {
	"rasail-bachelors": "بكالوريوس",
	"rasail-master": "رسالة ماجستير",
	"rasail-phd": "دكتوراه",
}

async function papers() {
	const [list, categories] = await Promise.all([getAll("/academic-papers"), getAll("/academic-paper-categories")])
	const slugOf = new Map(categories.map((c) => [c.id, c.translation?.slug ?? c.academic_paper_category_translations?.[0]?.slug]))
	const ordered = list.sort(byCreated)
	const conference = ordered.filter((p) => slugOf.get(p.category_id) === "buhuth-al-mutamarat")
	const journals = ordered.filter((p) => slugOf.get(p.category_id) === "buhuth-fi-dawriyyat")
	const student = ordered.filter((p) => STUDENT_CATEGORY[slugOf.get(p.category_id)])
	if (conference.length + journals.length + student.length !== list.length) {
		throw new Error("academic papers: a category is not mapped to a section of the scientific platform")
	}

	// Conference papers show their abstract, which only the detail carries.
	const conferenceDetails = await mapLimit(conference, (p) => get(`/academic-papers/${p.id}`))
	await write(
		"research.json",
		conferenceDetails.map((p, i) => {
			const t = p.translation ?? {}
			return {
				id: String(i + 1),
				title: t.title ?? "",
				part: t.volume ?? "",
				abstract: t.abstract ?? "",
				section: t.section ?? "",
				topic: t.topic ?? "",
				author: (t.authors ?? []).join(" - "),
				...(t.author_description ? { authorDescription: t.author_description } : {}),
				...(t.page_count ? { pages: t.page_count } : {}),
				publishedYear: (p.published_year ?? "").trim(),
				pdfUrl: p.pdf_url ?? "",
				conference: t.publication_venue ?? "",
			}
		}),
	)

	// Arabic first (languageid 1), then the Persian title where a paper has one (languageid 2).
	const translated = (p: Json, i: number, language: Record<string, string>, category?: string) => ({
		id: String(i + 1),
		translations: [...(p.academic_paper_translations ?? [])]
			.sort((a: Json, b: Json) => (a.lang === "ar" ? 0 : 1) - (b.lang === "ar" ? 0 : 1))
			.map((t: Json, j: number) => ({
				languageid: j + 1,
				title: t.title ?? "",
				authors: t.authors ?? [],
				publicationVenue: t.publication_venue ?? "",
				...(category ? { category } : {}),
				language: language[p.document_languages?.[0]] ?? "",
				...(t.page_count ? { pagenam: t.page_count } : {}),
			})),
		publishedYear: (p.published_year ?? "").trim(),
		pdfUrl: p.pdf_url ?? "",
	})
	await write("journals.json", journals.map((p, i) => translated(p, i, PAPER_LANGUAGE)))
	await write(
		"student.json",
		student.map((p, i) => translated(p, i, STUDENT_LANGUAGE, STUDENT_CATEGORY[slugOf.get(p.category_id)])),
	)
}

async function staticPages() {
	const list = (await getAll("/static-pages")).sort((a, b) => a.display_order - b.display_order || byCreated(a, b))
	const details = await mapLimit(list, (p) => get(`/static-pages/by-slug/${encodeURIComponent(p.slug)}`))
	await write(
		"imamzain.json",
		details.map((p) => ({ title: p.translation?.title ?? "", slug: p.slug, content: p.translation?.body ?? "" })),
	)
}

async function stores() {
	const list = (await getAll("/stores")).sort((a, b) => a.display_order - b.display_order)
	let id = 0
	await write(
		"store-locations.json",
		list.map((s) => ({
			city: s.translation?.city_name ?? s.store_translations?.[0]?.city_name ?? "",
			sellpoints: [...(s.store_locations ?? [])]
				.sort((a: Json, b: Json) => a.display_order - b.display_order)
				.map((l: Json) => ({
					name: l.translation?.name ?? "",
					location: l.translation?.address ?? "",
					phone: l.phone ?? "",
					id: ++id,
					gps: l.gps_embed_url ?? "",
					gpsLink: l.gps_link ?? "",
				})),
		})),
	)
}

await mkdir(OUT, { recursive: true })
const started = Date.now()
await Promise.all([posts(), books(), gallery(), audios(), papers(), staticPages(), stores()])
console.log(`Content fetched from ${API} in ${((Date.now() - started) / 1000).toFixed(1)}s`)
