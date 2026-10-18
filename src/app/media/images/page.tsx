import ImagesClient from "./_components/images-client"
import { gallery } from "@/lib/gallery"

// Only the first 30 images (the client's INITIAL_COUNT, sorted the same way
// the client sorts by default) are mapped and shipped here so first paint
// has real content immediately with no loading flash. The full 819-item
// corpus that search/sort/filter need is fetched by the client in the
// background from /api/gallery-index instead of being serialized into this
// page's RSC payload.
const INITIAL_COUNT = 30

export default function Page() {
	// Mirrors GalleryClient's default sort (newest first) so the eager
	// initial slice matches the order the client renders once the full
	// array lands, avoiding a visible reorder.
	const sorted = [...gallery].sort((a, b) => {
		const dateA = new Date(a.date).getTime()
		const dateB = new Date(b.date).getTime()

		if (!isNaN(dateA) && !isNaN(dateB)) {
			return dateB - dateA
		}
		return b.date.localeCompare(a.date)
	})

	return <ImagesClient initialImages={sorted.slice(0, INITIAL_COUNT)} />
}
