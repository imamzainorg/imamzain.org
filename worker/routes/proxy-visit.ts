import { relayForm } from "../lib/api"

export async function proxyVisit(request: Request, env: Env): Promise<Response> {
	let body: { visitorName?: unknown; visitorPhone?: unknown; visitorCountry?: unknown }
	try {
		body = await request.json()
	} catch {
		return Response.json({ error: "Invalid request body" }, { status: 400 })
	}
	const { visitorName, visitorPhone, visitorCountry } = body ?? {}

	if (!visitorName || !visitorPhone || !visitorCountry) {
		return Response.json({ error: "Missing required fields" }, { status: 400 })
	}

	// Normalize the phone toward E.164 (backend requires /^\+[1-9]\d{1,14}$/): drop
	// spaces/dashes/parens and turn a leading "00" international prefix into "+".
	const normalizedPhone = String(visitorPhone)
		.replace(/[\s()-]/g, "")
		.replace(/^00/, "+")

	// CreateProxyVisitDto uses snake_case field names and rejects unknown fields
	// (forbidNonWhitelisted).
	return relayForm(
		env,
		request,
		"/api/v1/forms/proxy-visit",
		{
			visitor_name: visitorName,
			visitor_phone: normalizedPhone,
			visitor_country: String(visitorCountry).toUpperCase(),
		},
		"Proxy visit",
		"Failed to submit visit request",
	)
}
