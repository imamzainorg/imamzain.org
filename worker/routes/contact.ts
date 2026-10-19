import { isValidEmail, isValidMessage, isValidName } from "../../src/lib/form-rules"
import { relayForm } from "../lib/api"
import { log } from "../lib/logger"

interface ContactFormBody {
	name?: string
	email?: string
	country?: string
	message?: string
}

export async function contact(request: Request, env: Env): Promise<Response> {
	let body: ContactFormBody
	try {
		body = await request.json()
	} catch {
		return Response.json({ error: "Invalid request body" }, { status: 400 })
	}
	const { name, email, country, message } = body ?? {}

	if (!name || !email || !message) {
		log("WARN", "Contact: missing required fields")
		return Response.json({ error: "Missing required fields" }, { status: 400 })
	}

	// The API rejects what these rules reject, so refuse it here and say which field.
	if (!isValidName(name)) return Response.json({ error: "Invalid name" }, { status: 400 })
	if (!isValidEmail(email)) return Response.json({ error: "Invalid email format" }, { status: 400 })
	if (!isValidMessage(message)) return Response.json({ error: "Invalid message length" }, { status: 400 })

	// Backend CreateContactDto rejects unknown fields (forbidNonWhitelisted), so no `recipient`:
	// the admin recipient is fixed server-side (EMAIL_TO). `country` must be an ISO 3166-1
	// alpha-2 code; omit it entirely when empty, since the optional validator still rejects "".
	return relayForm(
		env,
		request,
		"/api/v1/forms/contact",
		{
			name: name.trim(),
			email,
			message,
			...(country ? { country: String(country).toUpperCase() } : {}),
		},
		"Contact",
		"Failed to send message",
	)
}
