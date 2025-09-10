export type YouTubeVideo = {
	title: string
	url: string
	date: string
	desc: string
	thumbnail: string
	slug: string
}

export type YouTubePlaylist = {
	id: number
	playlistId?: string
	url: string
	title: string
	videos: YouTubeVideo[]
}
