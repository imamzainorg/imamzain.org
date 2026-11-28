import { NextResponse } from "next/server"
import { getVideos } from "@/lib/videos"
import type { VideoSearchEntry } from "@/types/videos"

// The search box on the video pages looks through every video, but a page only needs the few it shows.
// Shipping the list inside each of the 300 video pages would make every page carry all of it, so it is
// one static file instead (prerendered like /api/gallery-index), fetched when someone starts searching.
export const revalidate = 86400

export async function GET() {
	const entries: VideoSearchEntry[] = (await getVideos()).map((video) => ({
		slug: video.slug,
		title: video.title,
		thumbnail: video.thumbnail,
		date: video.date,
		series: video.series[0]?.title ?? "",
	}))
	return NextResponse.json(entries, {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	})
}
