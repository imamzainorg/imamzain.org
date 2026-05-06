import { NextRequest, NextResponse } from "next/server"
import { log } from "@/lib/logger"
import { isValidEmail } from "@/lib/validators"

interface NewsletterBody {
	subscriberEmail?: string
}

interface BackendResponse {
	error?: string
	message?: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body: NewsletterBody = await request.json()
		const { subscriberEmail } = body

		if (!isValidEmail(subscriberEmail)) {
			log("WARN", "Newsletter subscription: invalid email format")
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			)
		}

		const apiUrl = `${process.env.API_URL}/api/v1/newsletter/subscribe`
		log("INFO", "Sending newsletter subscription to backend")

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ subscriberEmail }),
		})

		log("INFO", "Backend response status:", response.status)

		const rawText = await response.text()
		let data: BackendResponse

		try {
			data = JSON.parse(rawText)
		} catch {
			log("ERROR", "Failed to parse backend response JSON:", rawText)
			throw new Error("Invalid JSON response from backend")
		}

		if (!response.ok) {
			log("ERROR", "Backend responded with error:", data)
			return NextResponse.json(
				{ error: data.error || "Backend API request failed" },
				{ status: response.status },
			)
		}

		log("INFO", "Newsletter subscription succeeded")
		return NextResponse.json(data, { status: 200 })
	} catch (error: unknown) {
		if (error instanceof Error) {
			log("ERROR", "Newsletter Subscribe Error:", {
				name: error.name,
				message: error.message,
				stack: error.stack,
			})
		} else {
			log("ERROR", "Unknown error:", error)
		}

		return NextResponse.json(
			{ error: "Failed to subscribe" },
			{ status: 500 },
		)
	}
}
