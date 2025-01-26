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

export default function page() {
	return (
		<div className={`mb-16`}>
			<TopImage />
			<InstitutionMessage />
			<Posts />
			<Imamzain />
			<RightsMessage />
			<Services />
			<Publications />
			<GallerySection />
			<Videos />
			<Live />
		</div>
	)
}
