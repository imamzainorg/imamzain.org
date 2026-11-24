// Reads the video feeds the homepage and the shorts rail need straight from the API, at build time
// (the pages are statically exported). Kept apart from scripts/fetch-content.ts, which writes the
// JSON files the other pages read.

const API = (process.env.API_URL ?? "https://api.imamzain.org/api/v1").replace(/\/$/, "")

// One tile of the homepage video block, as GET /homepage returns it: featured videos first, then the
// newest long-form videos, one per series; never shorts or live broadcasts.
export type HomeVideo = {
	title: string
	url: string // the YouTube video id
	desc: string | null
	thumbnail: string
	date: string // ISO timestamp
}

export type Short = {
	slug: string
	videoId: string
	title: string
	thumbnail: string
	date: string // ISO timestamp
}

async function get<T>(route: string): Promise<T> {
	const url = `${API}${route}`
	for (let attempt = 1; ; attempt++) {
		try {
			const res = await fetch(url, { headers: { "Accept-Language": "ar", "User-Agent": "imamzain.org-build" } })
			const body = await res.json().catch(() => null)
			if (res.ok && body?.success) return body.data as T
			if (attempt >= 4 || (res.status !== 429 && res.status < 500)) {
				throw new Error(`${res.status} ${body?.code ?? ""} ${body?.error ?? ""}`.trim())
			}
		} catch (err) {
			if (attempt >= 4) throw new Error(`GET ${url} failed: ${(err as Error).message}`)
		}
		await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt))
	}
}

let homepage: Promise<HomeVideo[]> | undefined

// A failed request fails the build, like the content fetch: the live site then stays on its last good
// version instead of shipping a homepage without its videos.
export function getHomeVideos(): Promise<HomeVideo[]> {
	homepage ??= get<{ videos: HomeVideo[] }>("/homepage").then((data) => data.videos)
	return homepage
}

// The rail is not approved yet, so a failure here must never block a deploy: it just comes back empty.
export async function getShorts(): Promise<Short[]> {
	try {
		const data = await get<{ items: Record<string, string>[] }>("/videos?kind=short&limit=30")
		return data.items.map((item) => ({
			slug: item.slug,
			videoId: item.video_id,
			title: item.title,
			thumbnail: item.thumbnail_url,
			date: item.published_at,
		}))
	} catch (err) {
		console.warn(`shorts rail: ${(err as Error).message}`)
		return []
	}
}
