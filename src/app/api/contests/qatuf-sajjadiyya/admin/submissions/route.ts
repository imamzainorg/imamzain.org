import { list } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const { blobs } = await list({
			prefix: "contest-submissions/",
		})

		// Fetch each submission
		const submissions = await Promise.all(
			blobs.map(async (blob) => {
				const response = await fetch(blob.url)
				const data = await response.json()
				return {
					...data,
					url: blob.url,
				}
			}),
		)

		// Sort by submission date (newest first)
		submissions.sort(
			(a, b) =>
				new Date(b.submittedAt).getTime() -
				new Date(a.submittedAt).getTime(),
		)

		return NextResponse.json({
			success: true,
			submissions,
			total: submissions.length,
		})
	} catch (error) {
		console.error("Error fetching submissions:", error)
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		)
	}
}
