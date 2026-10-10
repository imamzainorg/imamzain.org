export async function proxyVisit(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body: {
			visitorName?: unknown
			visitorPhone?: unknown
			visitorCountry?: unknown
		} = await request.json()

		// Validate the data
		const { visitorName, visitorPhone, visitorCountry } = body

		if (!visitorName || !visitorPhone || !visitorCountry) {
			return Response.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			)
		}

		// Normalize the phone toward E.164 (backend requires /^\+[1-9]\d{1,14}$/):
		// drop spaces/dashes/parens and turn a leading "00" international prefix
		// into "+".
		const normalizedPhone = String(visitorPhone)
			.replace(/[\s()-]/g, "")
			.replace(/^00/, "+")

		// CreateProxyVisitDto uses snake_case field names and rejects unknown
		// fields (forbidNonWhitelisted).
		const response = await fetch(`${env.API_URL}/api/v1/forms/proxy-visit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				visitor_name: visitorName,
				visitor_phone: normalizedPhone,
				visitor_country: String(visitorCountry).toUpperCase(),
			}),
		})

		if (!response.ok) {
			throw new Error("Backend API request failed")
		}

		const data = await response.json()

		return Response.json(data, { status: 200 })
	} catch (error) {
		console.error("API Error:", error)
		return Response.json(
			{ error: "Failed to submit visit request" },
			{ status: 500 },
		)
	}
}
