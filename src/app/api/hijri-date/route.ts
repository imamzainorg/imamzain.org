import { NextResponse } from "next/server"
import { parse } from "node-html-parser"

export async function GET() {
	try {
		// 1. Fetch the HTML content
		const response = await fetch("https://www.sistani.org/", {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
			cache: "no-cache",
			next: { revalidate: 43200 },
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const html = await response.text()

		// 2. Parse HTML and extract the date
		const root = parse(html)
		const dateElement = root.querySelector("#home-date")

		if (!dateElement) {
			return NextResponse.json(
				{ error: "Date element not found" },
				{ status: 404 },
			)
		}

		// 3. Clean and return the date
		const rawDate = dateElement.text.trim()
		let hijriDate = rawDate.split("||")[0].trim()

		let repalcementIndex = hijriDate.search("-")
		hijriDate =
			hijriDate.substring(0, repalcementIndex) +
			hijriDate.substring(repalcementIndex + 1, hijriDate.length)

		repalcementIndex = hijriDate.search(" ")
		hijriDate =
			hijriDate.substring(0, repalcementIndex) +
			" -" +
			hijriDate.substring(repalcementIndex, hijriDate.length)

		return NextResponse.json({ hijriDate })
	} catch (error) {
		console.error("Error fetching Hijri date:", error)
		return NextResponse.json(
			{ error: "Failed to retrieve date" },
			{ status: 500 },
		)
	}
}

// Required for Vercel deployment
export const dynamic = "force-dynamic"
