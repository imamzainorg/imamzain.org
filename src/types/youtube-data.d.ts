export type YouTubeVideo = {
	title: string
	url: string
	date: string
	desc: string
	thumbnail: string
	slug: string
}

export type YouTubePlaylist = {
	playlistId: string
	title: string
	videos: YouTubeVideo[]
}
