import { getShorts } from "@/lib/video-feed"
import ShortsRailClient from "./shorts-rail-client"

// The owner has not approved showing shorts yet, so the whole rail hangs on this one switch.
// true: the rail shows on /media/videos, below the video browser, whenever the API has shorts.
// false: nothing renders.
// To remove it for good, also delete this file, shorts-rail-client.tsx, and the <ShortsRail /> line
// in ../page.tsx.
const SHOW_SHORTS_RAIL = true

export default async function ShortsRail() {
	if (!SHOW_SHORTS_RAIL) return null
	const shorts = await getShorts()
	if (shorts.length === 0) return null
	return <ShortsRailClient shorts={shorts} />
}
