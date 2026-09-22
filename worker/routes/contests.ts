// Qutuf al-Sajjadiyya contest: start an attempt, then submit its answers.

export async function contestStart(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body: { name?: unknown; contact?: unknown; contactType?: unknown } =
			await request.json()
		const { name, contact, contactType } = body

		if (!name || typeof name !== "string" || !name.trim()) {
			return Response.json({ message: "Invalid name" }, { status: 400 })
		}
		if (!contact || typeof contact !== "string" || !contact.trim()) {
			return Response.json({ message: "Invalid contact" }, { status: 400 })
		}
		if (contactType !== "phone" && contactType !== "email") {
			return Response.json({ message: "Invalid contactType" }, { status: 400 })
		}

		const response = await fetch(
			`${env.API_URL}/api/v1/forms/qutuf-sajjadiya-contest/start`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"user-agent": request.headers.get("user-agent") || "",
					// Cloudflare may not pass X-Forwarded-For through to a Worker;
					// CF-Connecting-IP always carries the visitor's address.
					"x-forwarded-for":
						request.headers.get("x-forwarded-for") ||
						request.headers.get("cf-connecting-ip") ||
						"",
				},
				body: JSON.stringify({
					name: name.trim(),
					contact: contact.trim(),
					contactType,
				}),
			},
		)

		const data = await response.json()

		return Response.json(data, { status: response.status })
	} catch {
		return Response.json({ message: "Failed to start contest" }, { status: 500 })
	}
}

export async function contestSubmit(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body: { attempt_id?: unknown; answers?: unknown } =
			await request.json()
		const { attempt_id, answers } = body

		if (!attempt_id || typeof attempt_id !== "string") {
			return Response.json({ message: "Invalid attempt_id" }, { status: 400 })
		}
		if (!Array.isArray(answers)) {
			return Response.json({ message: "Invalid answers" }, { status: 400 })
		}

		const response = await fetch(
			`${env.API_URL}/api/v1/forms/qutuf-sajjadiya-contest/submit`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ attempt_id, answers }),
			},
		)

		const data = await response.json()

		return Response.json(data, { status: response.status })
	} catch {
		return Response.json(
			{ message: "Failed to submit answers" },
			{ status: 500 },
		)
	}
}
