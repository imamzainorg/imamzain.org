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
import Application from "./_components/application";
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
