import Imamzain from "./imamzain"
import InstitutionMessage from "./institution-message"
import Live from "./live"
import Posts from "./posts"
import Publications from "./publications"
import RightsMessage from "./rights-message"
import Services from "./services"
import Videos from "./videos"
import TopImage from "./top-image"
import GallerySection from "./gallery"
import Application from "@/app/(main)/application"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import { Post } from "@/types/post"
import { YouTubePlaylist } from "@/types/youtubeData"

export default async function page() {
	const publications = await dataFetcher<Book[]>("publications.json")
	const posts = await dataFetcher<Post[]>("posts.json")
	const playlists = await dataFetcher<YouTubePlaylist[]>("youtube.json")

	return (
		<div>
			<TopImage />
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
