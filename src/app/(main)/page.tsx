import Imamzain from "./_components/imamzain"
import InstitutionMessage from "./_components/institution-message"
import Live from "./_components/live"
import Posts from "./_components/posts"
import Publications from "./_components/publications"
import RightsMessage from "./_components/rights-message"
import Services from "./_components/services"
import Videos from "./_components/videos"
import TopImage from "./_components/top-image"
import GallerySection from "./_components/gallery"
import Application from "./_components/application"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import { Post } from "@/types/post"
import { YouTubePlaylist } from "@/types/youtubeData"
import hadiths from "@/data/hadiths.json"

const desktopImages = [
	"/images/albaqi.jpg",
	"/images/albaqi-2.png",
	"/images/hero-3.jpg",
]

const mobileImages = [
	"/images/albaqi.jpg",
	"/images/albaqi-2.jpg",
	"/images/hero-3-vertical.jpg",
]

export default async function page() {
	const publications = await dataFetcher<Book[]>("publications.json")
	const posts = await dataFetcher<Post[]>("posts.json")
	const playlists = await dataFetcher<YouTubePlaylist[]>("youtube.json")

	// Select Proper Hadith Based on Date
	const today = new Date()
	const dayOfMonth = today.getDate()
	const currentHadithIndex = (dayOfMonth - 1) % hadiths.length
	const currentHadith = hadiths[currentHadithIndex]

	return (
		<div>
			<TopImage
				desktopImages={desktopImages}
				mobileImages={mobileImages}
				currentHadith={currentHadith}
			/>
			<InstitutionMessage />
			<Posts newsPosts={posts} />
			<Imamzain />
			<RightsMessage />
			<Services />
			<Publications publications={publications} />
			<Application />
			<GallerySection />
			<Videos playlists={playlists} />
			<Live />
		</div>
	)
}
