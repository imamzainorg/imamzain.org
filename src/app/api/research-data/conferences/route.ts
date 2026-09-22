import { NextResponse } from "next/server"
import researchData from "@/data/research.json"
import type { Research } from "@/types/research"

// Prerendered to a static JSON file at build time (no dynamic APIs are used
// here, and this route has no dynamic segments), so it is served from the
// CDN edge like any other static asset: no serverless invocation and no
// origin transfer per request. PlatformClient fetches this only once the
// visitor's active tab resolves to "conferences" (landing on
// ?type=conferences, or switching tabs client-side), instead of shipping
// research.json unconditionally alongside the default student-research tab.
export const dynamic = "force-static"

export async function GET() {
	return NextResponse.json(researchData as Research[], {
		headers: {
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	})
}
