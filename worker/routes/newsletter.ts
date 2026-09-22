import { log } from "../lib/logger"
import { isValidEmail } from "../lib/validators"

interface NewsletterBody {
	subscriberEmail?: string
}

interface BackendResponse {
	error?: string
	message?: string
}

export async function newsletterSubscribe(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body: NewsletterBody = await request.json()
		const { subscriberEmail } = body

		if (!isValidEmail(subscriberEmail)) {
			log("WARN", "Newsletter subscription: invalid email format")
			return Response.json({ error: "Invalid email format" }, { status: 400 })
		}

		const apiUrl = `${env.API_URL}/api/v1/newsletter/subscribe`
		log("INFO", "Sending newsletter subscription to backend")

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			// Backend SubscribeDto expects `email`, not `subscriberEmail`.
			body: JSON.stringify({ email: subscriberEmail }),
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
			return Response.json(
				{ error: data.error || "Backend API request failed" },
				{ status: response.status },
			)
		}

		log("INFO", "Newsletter subscription succeeded")
		return Response.json(data, { status: 200 })
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

		return Response.json({ error: "Failed to subscribe" }, { status: 500 })
	}
}

export async function newsletterUnsubscribe(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body: NewsletterBody = await request.json()
		const { subscriberEmail } = body

		if (!subscriberEmail || !/\S+@\S+\.\S+/.test(subscriberEmail)) {
			return Response.json({ error: "Invalid email format" }, { status: 400 })
		}

		const response = await fetch(
			`${env.API_URL}/api/v1/newsletter/unsubscribe`,
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
		return Response.json(data, { status: 200 })
	} catch (error) {
		console.error("Newsletter Unsubscribe Error:", error)
		return Response.json({ error: "Failed to unsubscribe" }, { status: 500 })
	}
}
