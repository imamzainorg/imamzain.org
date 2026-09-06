import { NextResponse } from "next/server"
import { getDictionaries, getNavSubjects } from "@/lib/imamzain-legacy-loader"
import { collections } from "@/app/library/_config/collections"

// Prerendered to a static JSON file at build time (no dynamic APIs are used
// here), so it is served from the CDN edge like any other static asset: no
// serverless invocation and no origin transfer per request. DictionaryNav
// fetches this only when the reader expands a dictionary other than the one
// the current page already shipped in full.
export const dynamicParams = false

export function generateStaticParams() {
	return Object.keys(collections).flatMap((collectionSlug) =>
		getDictionaries(collectionSlug).map((dictionary) => ({
			collectionSlug,
			dictionarySlug: dictionary.slug,
		})),
	)
}

export async function GET(
	_request: Request,
	{
		params,
	}: { params: Promise<{ collectionSlug: string; dictionarySlug: string }> },
) {
	const { collectionSlug, dictionarySlug } = await params

	return NextResponse.json(getNavSubjects(collectionSlug, dictionarySlug), {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	})
}
