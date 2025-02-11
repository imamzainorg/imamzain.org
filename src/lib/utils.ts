import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { google } from "googleapis"
// import { YouTubePlaylist, YouTubeVideo } from "./definitions"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// const youtubeApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
// const channelId = "UCGccH_OeEhhWGUE1xeIsxeA"
// const youtube = google.youtube({
// 	version: "v3",
// 	auth: youtubeApiKey,
// })

// export async function fetchPlaylistsAndVideos(): Promise<YouTubePlaylist[]> {
// 	const result: YouTubePlaylist[] = []

// 	try {
// 		// Fetch playlists
// 		const playlistsResponse = await youtube.playlists.list({
// 			key: youtubeApiKey,
// 			part: ["snippet"],
// 			channelId: channelId,
// 			maxResults: 50,
// 		})

// 		const playlists = playlistsResponse.data.items

// 		if (!playlists || playlists.length === 0) {
// 			console.log("No playlists found.")
// 			return result // Return empty array instead of undefined
// 		}

// 		// Fetch videos for each playlist
// 		for (const playlist of playlists) {
// 			const playlistId = playlist.id
// 			const playlistTitle = playlist.snippet?.title || "Untitled Playlist"

// 			if (!playlistId) continue // Skip invalid playlists

// 			const playlistItemsResponse = await youtube.playlistItems.list({
// 				key: youtubeApiKey,
// 				part: ["snippet"],
// 				playlistId: playlistId,
// 				maxResults: 50,
// 			})

// 			const videos: YouTubeVideo[] = []
// 			const items = playlistItemsResponse.data.items || []

// 			for (const item of items) {
// 				const videoId = item.snippet?.resourceId?.videoId
// 				const videoTitle = item.snippet?.title || "Untitled Video"

// 				if (videoId) {
// 					videos.push({ videoId, title: videoTitle })
// 				}
// 			}

// 			result.push({
// 				playlistId,
// 				title: playlistTitle,
// 				videos,
// 			})
// 		}
// 	} catch (error) {
// 		console.error("Error:", error)
// 	}

// 	return result // Always returns an array (empty if error/no data)
// }
