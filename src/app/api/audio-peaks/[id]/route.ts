import { NextResponse } from "next/server"
import audioData from "@/data/AudioItemAnalyzed.json"
import type { AudioItem } from "@/types/audio"

// Prerendered to a static JSON file per item at build time (no dynamic APIs
// are used here), so it is served from the CDN edge like any other static
// asset: no serverless invocation and no origin transfer per request.
// useWaveform fetches this only when a given item's canvas actually mounts
// and needs to draw its waveform, instead of every item's peaks array
// shipping eagerly in the audio list page's RSC payload.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
	return (audioData as AudioItem[]).map((item) => ({ id: String(item.id) }))
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params
	const item = (audioData as AudioItem[]).find((i) => String(i.id) === id)

	return NextResponse.json(
		{ peaks: item?.peaks ?? [] },
		{
			headers: {
				"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
			},
		},
	)
}
