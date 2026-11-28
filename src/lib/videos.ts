import { dataFetcher } from "@/lib/dataFetcher"
import type { Video, VideoSection, VideoSeries } from "@/types/videos"

// videos.json and video-series.json are fixed at build time, and every video page reads them, so each
// is read and parsed once per build process.
let videosFile: Promise<Video[]> | undefined
let seriesFile: Promise<VideoSeries[]> | undefined

/** Every video the API serves, newest first, shorts included. */
function getAllVideos(): Promise<Video[]> {
	return (videosFile ??= dataFetcher<Video[]>("videos.json"))
}

/** The videos that have a page: shorts only appear in their rail. Newest first. */
export async function getVideos(): Promise<Video[]> {
	return (await getAllVideos()).filter((video) => video.kind === "video")
}

/** Series in the CMS's order. */
export function getSeries(): Promise<VideoSeries[]> {
	return (seriesFile ??= dataFetcher<VideoSeries[]>("video-series.json"))
}

export const SECTION_TITLES: Record<VideoSection, string> = {
	programmes: "البرامج",
	commentaries: "شروح الأدعية والرسائل",
	majalis: "المجالس والمناسبات",
	events: "المؤتمرات والفعاليات",
}

// The order the sections are shown in.
const SECTION_ORDER: VideoSection[] = ["programmes", "commentaries", "majalis", "events"]

// A series the CMS has not put in a section yet still shows, last.
export function groupBySection(series: VideoSeries[]): { section: string; title: string; series: VideoSeries[] }[] {
	return [
		...SECTION_ORDER.map((section) => ({
			section: section as string,
			title: SECTION_TITLES[section],
			series: series.filter((s) => s.section === section),
		})),
		{
			section: "other",
			title: "سلاسل أخرى",
			series: series.filter((s) => !s.section || !SECTION_ORDER.includes(s.section)),
		},
	].filter((group) => group.series.length > 0)
}

/** The video's series with its episodes in playlist order, or null for a standalone video. */
export function episodesOf(video: Video, series: VideoSeries[], videos: Video[]) {
	const ref = video.series[0]
	const found = ref && series.find((s) => s.slug === ref.slug)
	if (!found) return null
	const bySlug = new Map(videos.map((v) => [v.slug, v]))
	return { series: found, episodes: found.videos.flatMap((slug) => bySlug.get(slug) ?? []) }
}

/** The hero of /media/videos: the first featured video, else the newest. */
export function pickHero(videos: Video[]): Video | undefined {
	const featured = videos.filter((v) => v.featured).sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
	return featured[0] ?? videos[0]
}

/** A description cut down to a line for a page's meta tags: no links, one space between words. */
export function summarize(text: string, fallback: string, max = 160): string {
	const plain = text
		.replace(/https?:\/\/\S+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
	if (!plain) return fallback
	if (plain.length <= max) return plain
	const cut = plain.slice(0, max)
	return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max / 2))}…`
}
