import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { attempt_id, answers } = body

		if (!attempt_id || typeof attempt_id !== "string") {
			return NextResponse.json(
				{ message: "Invalid attempt_id" },
				{ status: 400 },
			)
		}
		if (!Array.isArray(answers)) {
			return NextResponse.json({ message: "Invalid answers" }, { status: 400 })
		}

		const response = await fetch(
			`${process.env.API_URL}/api/v1/forms/qutuf-sajjadiya-contest/submit`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ attempt_id, answers }),
			},
		)

		const data = await response.json()

		return NextResponse.json(data, { status: response.status })
	} catch {
		return NextResponse.json(
			{ message: "Failed to submit answers" },
			{ status: 500 },
		)
	}
}
