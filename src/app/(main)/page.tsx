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
import Application from "@/app/(main)/application";

export default function page() {
	return (
		<div>
			<TopImage />
			<InstitutionMessage />
			<Posts />
			<Imamzain />
			<RightsMessage />
			<Services />
			<Publications />
			<Application />
			<GallerySection />
			<Videos />
			<Live />
		</div>
	)








}
