import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { subscriberEmail } = body

		if (!subscriberEmail || !/\S+@\S+\.\S+/.test(subscriberEmail)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			)
		}

		const response = await fetch(
			`${process.env.API_URL || "https://imamzain-api.onrender.com/api/v1"}/newsletter/subscribe`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subscriberEmail }),
			},
		)

		if (!response.ok) {
			throw new Error("Backend API request failed")
		}

		const data = await response.json()
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.error("Newsletter Subscribe Error:", error)
		return NextResponse.json(
			{ error: "Failed to subscribe" },
			{ status: 500 },
		)
	}
}
