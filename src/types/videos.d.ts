// Shapes of src/data/videos.json and src/data/video-series.json, written by scripts/fetch-content.ts
// from the API's /videos and /videos/series routes.

export type VideoKind = "video" | "short"

export type VideoSection = "programmes" | "commentaries" | "majalis" | "events"

export type VideoSeriesRef = {
	slug: string
	title: string
}

export type Video = {
	/** The page's URL segment: /media/videos/{slug}. The 108 old slugs are kept. */
	slug: string
	/** YouTube's id, used by the embed. */
	videoId: string
	/** "short" videos are for the shorts rail only and have no page of their own. */
	kind: VideoKind
	title: string
	/** YouTube's own description, plain text, as is. May be empty. */
	description: string
	/** YouTube's own thumbnail. */
	thumbnail: string
	/** Publish date, "YYYY-MM-DD" (UTC). */
	date: string
	/** Publish time, ISO 8601. */
	publishedAt: string
	/** ISO 8601 duration, e.g. "PT12M30S". */
	duration: string
	views: number | null
	featured: boolean
	/** Position among the featured videos (0 is first), set in the CMS; null when not featured. */
	featuredOrder: number | null
	speaker: string | null
	/** The series (YouTube playlists) it is in; usually none or one. */
	series: VideoSeriesRef[]
}

/** One row of /api/video-index, which the search box reads. */
export type VideoSearchEntry = Pick<Video, "slug" | "title" | "thumbnail" | "date"> & {
	/** Title of its series, or "". */
	series: string
}

export type VideoSeries = {
	slug: string
	title: string
	description: string
	thumbnail: string
	section: VideoSection | null
	speaker: string | null
	videoCount: number
	/** Date of its newest video, "YYYY-MM-DD". */
	latestDate: string
	/** Slugs of its videos, in YouTube playlist order. */
	videos: string[]
}
