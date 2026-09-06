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

// The upstream date only changes daily and the fetch above already caches
// for 12h, but force-dynamic (previously set here) opted the route itself
// out of caching, so every one of this route's ~8,000 daily calls (one per
// pageview, from the header) invoked the function and counted as an origin
// read. revalidate lets Next cache this route's own response for the same
// window, so only the first call in each 12h period reaches the function;
// the rest are served from cache.
export const revalidate = 43200
