import Gallery from "../(pages)/gallery/page"
import Imamzain from "./imamzain"
import InstitutionMessage from "./institution-message"
import Live from "./live"
import Posts from "./posts"
import Publications from "./publications"
import RightsMessage from "./rights-message"
import Services from "./services"
import Videos from "./videos"
import TopImage from "./top-image"

export default function page() {
	return (
		<div className={`pb-64`}>
			<TopImage />
			<InstitutionMessage />
			<Posts />
			<Imamzain />
			<RightsMessage />
			<Services />
			<Publications />
			<Gallery />
			<Videos />
			<Live />
		</div>
	)
}
