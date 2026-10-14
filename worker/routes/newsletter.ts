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

const TOKEN = /^[0-9a-f]{64}$/i

// Relays the pair from an e-mailed newsletter link (confirm or unsubscribe) to the API and hands
// back its status and JSON (200 done or already done, 401 bad link, 400 validation, 429 rate
// limit), so the page can tell them apart. The email and token are never logged: they are the
// whole credential. Responses are never cached.
function relayLink(action: "confirm" | "unsubscribe") {
	return async (request: Request, env: Env): Promise<Response> => {
		const headers = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" }
		const invalid = () =>
			Response.json({ success: false, message: "Validation failed" }, { status: 400, headers })

		let email: unknown
		let token: unknown
		try {
			;({ email, token } = (await request.json()) as { email?: unknown; token?: unknown })
		} catch {
			return invalid()
		}
		if (!isValidEmail(email) || typeof token !== "string" || !TOKEN.test(token)) return invalid()

		try {
			// The API rejects unknown keys, so only these two are sent.
			const response = await fetch(`${env.API_URL}/api/v1/newsletter/${action}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, token }),
			})
			log("INFO", `Newsletter ${action}: backend responded`, response.status)

			const data = await response.json().catch(() => null)
			return Response.json(data ?? { success: false, message: "Unexpected response" }, {
				status: response.status,
				headers,
			})
		} catch {
			log("ERROR", `Newsletter ${action}: backend unreachable`)
			return Response.json({ success: false, message: "Service unavailable" }, { status: 502, headers })
		}
	}
}

export const newsletterConfirm = relayLink("confirm")
export const newsletterUnsubscribe = relayLink("unsubscribe")
