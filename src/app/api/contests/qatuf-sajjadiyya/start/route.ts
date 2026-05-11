import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { name, email, phone_number } = body

		if (!name || typeof name !== "string" || !name.trim()) {
			return NextResponse.json({ message: "Invalid name" }, { status: 400 })
		}
		if (email !== undefined && typeof email !== "string") {
			return NextResponse.json({ message: "Invalid email" }, { status: 400 })
		}
		if (phone_number !== undefined && typeof phone_number !== "string") {
			return NextResponse.json(
				{ message: "Invalid phone_number" },
				{ status: 400 },
			)
		}

		const response = await fetch(
			`${process.env.API_URL}/api/v1/forms/qutuf-sajjadiya-contest/start`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"user-agent": req.headers.get("user-agent") || "",
					"x-forwarded-for": req.headers.get("x-forwarded-for") || "",
				},
				body: JSON.stringify({ name: name.trim(), email, phone_number }),
			},
		)

		const data = await response.json()

		return NextResponse.json(data, { status: response.status })
	} catch {
		return NextResponse.json(
			{ message: "Failed to start contest" },
			{ status: 500 },
		)
	}
}
