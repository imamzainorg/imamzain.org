import { NextResponse } from "next/server"
import { getSearchIndex } from "@/lib/imamzain-legacy-loader"
import { collections } from "@/app/library/_config/collections"

// Prerendered to a static JSON file at build time (no dynamic APIs are used
// here), so it is served from the CDN edge like any other static asset: no
// serverless invocation and no origin transfer per request.
export const dynamicParams = false

export function generateStaticParams() {
	return Object.keys(collections).map((collectionSlug) => ({
		collectionSlug,
	}))
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ collectionSlug: string }> },
) {
	const { collectionSlug } = await params

	return NextResponse.json(getSearchIndex(collectionSlug), {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	})
}
