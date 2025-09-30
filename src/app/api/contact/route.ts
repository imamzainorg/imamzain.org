import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		const { name, email, country, message } = await request.json()

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			)
		}

		// Email validation
		if (!/\S+@\S+\.\S+/.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			)
		}

		const response = await fetch(
			`${process.env.BACKEND_API_URL}/api/v1/forms/contact`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Add auth if needed
					// 'Authorization': `Bearer ${process.env.API_KEY}`
				},
				body: JSON.stringify({
					name,
					email,
					country,
					message,
					recipient: "info@imamzain.org",
				}),
			},
		)

		if (!response.ok) {
			throw new Error("Backend API request failed")
		}

		const data = await response.json()

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.error("Contact API Error:", error)
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		)
	}
}
