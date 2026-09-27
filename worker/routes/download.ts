// The `name` query param is still accepted for URL compatibility but ignored:
// filenames come from the Content-Disposition metadata stored on the R2 objects.
export async function download(request: Request, env: Env): Promise<Response> {
	const allowedHostnames = new Set(
		["cdn.imamzain.org", env.ALLOWED_HOSTNAME]
			.filter(Boolean)
			.map((hostname) => hostname!.trim().toLowerCase()),
	)

	const requestUrl = new URL(request.url)
	const url = requestUrl.searchParams.get("url")
	const mode = requestUrl.searchParams.get("mode")

	if (!url) {
		return new Response("Missing url", { status: 400 })
	}

	// Treat a path-style input as a same-origin file. A string-prefix check can't
	// safely decide this: the WHATWG URL parser folds backslashes to slashes and
	// strips tabs/newlines for http(s), so "/\evil.com" or "/\t/evil.com" would
	// resolve to a foreign host. Resolve first, then verify the origin actually
	// matches ours before redirecting, so nothing can escape the origin.
	if (url.startsWith("/")) {
		const resolved = new URL(url, requestUrl.origin)
		if (resolved.origin !== requestUrl.origin) {
			return new Response("Forbidden", { status: 403 })
		}
		return Response.redirect(resolved.toString(), 302)
	}

	let parsedUrl: URL
	try {
		parsedUrl = new URL(url)
	} catch {
		return new Response("Invalid url", { status: 400 })
	}

	if (!allowedHostnames.has(parsedUrl.hostname.toLowerCase())) {
		return new Response("Forbidden", { status: 403 })
	}

	if (mode === "inline") {
		const response = await fetch(parsedUrl)
		if (!response.ok || !response.body) {
			return new Response("Unable to load file", {
				status: response.status || 502,
			})
		}

		const headers = new Headers({
			"Content-Type": response.headers.get("content-type") ?? "application/pdf",
			"Content-Disposition": "inline",
		})
		const contentLength = response.headers.get("content-length")
		if (contentLength) headers.set("Content-Length", contentLength)

		return new Response(response.body, { status: response.status, headers })
	}

	return Response.redirect(parsedUrl.toString(), 302)
}
