import { isValidEmail } from "../../src/lib/form-rules"
import { callApi, readJson, relayForm } from "../lib/api"
import { log } from "../lib/logger"

interface NewsletterBody {
	subscriberEmail?: string
}

export async function newsletterSubscribe(request: Request, env: Env): Promise<Response> {
	let body: NewsletterBody
	try {
		body = await request.json()
	} catch {
		return Response.json({ error: "Invalid request body" }, { status: 400 })
	}
	const subscriberEmail = body?.subscriberEmail

	if (!isValidEmail(subscriberEmail)) {
		log("WARN", "Newsletter subscription: invalid email format")
		return Response.json({ error: "Invalid email format" }, { status: 400 })
	}

	// Backend SubscribeDto expects `email`, not `subscriberEmail`.
	return relayForm(
		env,
		request,
		"/api/v1/newsletter/subscribe",
		{ email: subscriberEmail },
		"Newsletter subscribe",
		"Failed to subscribe",
	)
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
			const response = await callApi(env, request, `/api/v1/newsletter/${action}`, { email, token })
			log("INFO", `Newsletter ${action}: backend responded`, response.status)

			const data = await readJson<unknown>(response, `Newsletter ${action}`)
			// A 2xx that is not JSON is not a confirmation: never let the page read it as one.
			if (data === null) {
				return Response.json(
					{ success: false, message: "Unexpected response" },
					{ status: response.ok ? 502 : response.status, headers },
				)
			}
			return Response.json(data, { status: response.status, headers })
		} catch (error) {
			log("ERROR", `Newsletter ${action}: API binding call threw`, error instanceof Error ? error.message : String(error))
			return Response.json({ success: false, message: "Service unavailable" }, { status: 502, headers })
		}
	}
}

export const newsletterConfirm = relayLink("confirm")
export const newsletterUnsubscribe = relayLink("unsubscribe")
