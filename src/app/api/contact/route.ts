import { NextRequest, NextResponse } from "next/server"

interface ContactFormBody {
	name?: string
	email?: string
	country?: string
	message?: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body: ContactFormBody = await request.json()
		const { name, email, country, message } = body

		// Validate required fields
		if (!name || !email || !message) {
			console.warn("Validation failed: Missing fields", {
				name,
				email,
				message,
			})
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			)
		}

		// Validate email format
		const emailRegex = /\S+@\S+\.\S+/
		if (!emailRegex.test(email)) {
			console.warn("Validation failed: Invalid email format", { email })
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			)
		}

		const apiUrl = `${process.env.API_URL}/api/v1/forms/contact`
		console.log("Sending request to backend API:", apiUrl)

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				country,
				message,
				recipient: "info@imamzain.org",
			}),
		})

		console.log("Backend response status:", response.status)

		const rawText = await response.text()
		let data: { error?: string } | unknown

		try {
			data = JSON.parse(rawText)
		} catch {
			console.error("Failed to parse backend response JSON:", rawText)
			throw new Error("Invalid JSON response from backend")
		}

		if (!response.ok) {
			console.error("Backend responded with error:", data)
			return NextResponse.json(
				{
					error:
						(data as { error?: string })?.error ||
						"Backend API request failed",
				},
				{ status: response.status },
			)
		}

		console.log("Backend success response:", data)
		return NextResponse.json(data, { status: 200 })
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("🔥 Contact API Error:", {
				name: error.name,
				message: error.message,
				stack: error.stack,
			})
		} else {
			console.error("Unknown error:", error)
		}

		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		)
	}
}
