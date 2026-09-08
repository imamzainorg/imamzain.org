import { NextResponse } from "next/server"
import galleryImages from "@/data/gallery.json"
import type { Gallery } from "@/types/gallery"

// gallery.json (819 items, ~590 KB) is fixed at build time. Shipping it as a
// prop into the images page's client component serialized the full array
// into every RSC payload even though only the first 30 items ever render up
// front. It now lives here instead: a static JSON file with no dynamic APIs,
// so it is prerendered and served from the CDN edge like any other static
// asset (no serverless invocation, no origin transfer per request). The
// client fetches it once in the background to power search/sort/filter,
// which need the full corpus rather than just the visible slice.
export const revalidate = 86400

export async function GET() {
	const images: Gallery[] = galleryImages.map((item) => ({
		id: item.id,
		url: item.url,
		title: item.name,
		description: item.description,
		category: item.category,
		date: item.date,
		location: item.location,
		photographer: item.photographer || "غير محدد",
		tags: item.tags,
	}))

	return NextResponse.json(images, {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	})
}
