import { log } from "./logger"

// The host only labels the request: a service binding hands it straight to the imamzain-api
// Worker, whatever the URL says.
const API_ORIGIN = "https://api.imamzain.org"

// POSTs JSON to the backend API through the service binding. The API reads the visitor's address
// from cf-connecting-ip for rate limiting and its audit log, and a binding call does not carry
// one, so it is copied from the request Cloudflare's edge delivered to this Worker (a visitor
// cannot set that header themselves).
export function callApi(env: Env, incoming: Request, path: string, body: unknown): Promise<Response> {
	const headers = new Headers({ "Content-Type": "application/json" })
	const ip = incoming.headers.get("cf-connecting-ip")
	if (ip) headers.set("cf-connecting-ip", ip)

	return env.API.fetch(new Request(`${API_ORIGIN}${path}`, { method: "POST", headers, body: JSON.stringify(body) }))
}

// Reads a backend answer as JSON. When it is not JSON (an error page from a proxy, a crash), logs
// the status and the first bytes of the body, which hold no visitor data, and returns null.
export async function readJson<T>(response: Response, what: string): Promise<T | null> {
	const text = await response.text()
	try {
		return JSON.parse(text) as T
	} catch {
		log("ERROR", `${what}: backend sent non-JSON`, response.status, text.slice(0, 200))
		return null
	}
}

// Relays one of the public forms: the backend's status and error pass through (so a 429 stays a
// 429), a success comes back as 200, and a backend that cannot be reached or does not answer in
// JSON becomes `failure` with a 500.
export async function relayForm(
	env: Env,
	incoming: Request,
	path: string,
	body: unknown,
	what: string,
	failure: string,
): Promise<Response> {
	let response: Response
	try {
		response = await callApi(env, incoming, path, body)
	} catch (error) {
		log("ERROR", `${what}: API binding call threw`, error instanceof Error ? error.message : String(error))
		return Response.json({ error: failure }, { status: 500 })
	}

	const data = await readJson<{ error?: string }>(response, what)
	if (data === null) return Response.json({ error: failure }, { status: 500 })

	if (!response.ok) {
		log("ERROR", `${what}: backend answered`, response.status, data.error ?? "")
		return Response.json({ error: data.error || "Backend API request failed" }, { status: response.status })
	}

	log("INFO", `${what}: backend answered`, response.status)
	return Response.json(data, { status: 200 })
}
