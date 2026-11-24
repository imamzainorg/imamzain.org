import { dataFetcher } from "@/lib/dataFetcher"

// The homepage's video block and the shorts rail read these two files, which scripts/fetch-content.ts
// writes from the API (GET /homepage and GET /videos?kind=short) before every build.

// One tile of the homepage video block: featured videos first, then the newest long-form videos, one
// per series; never shorts or live broadcasts.
export type HomeVideo = {
	title: string
	url: string // the YouTube video id
	desc: string | null
	thumbnail: string
	date: string // ISO timestamp
}

export type Short = {
	videoId: string
	title: string
	thumbnail: string
	date: string // ISO timestamp
}

export const getHomeVideos = () => dataFetcher<HomeVideo[]>("home-videos.json")

export const getShorts = () => dataFetcher<Short[]>("shorts.json")
