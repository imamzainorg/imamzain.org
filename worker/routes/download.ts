// Media keys are opaque UUIDs (`books/pdf/<uuid>.pdf`), so the readable file name
// can't come from the URL path. Each R2 object carries it in its own
// `Content-Disposition: inline; filename*=UTF-8''<name>` metadata; this route
// reads it from the upstream response and re-serves the file under it.
// The `name` query param (the title the page already has) is the fallback.

/** The percent-encoded RFC 5987 file name inside a Content-Disposition header. */
function encodedFilename(disposition: string | null): string | null {
	if (!disposition) return null
	const extended = /filename\*\s*=\s*(?:UTF-8|utf-8)''([^;]+)/.exec(disposition)
	if (extended) return extended[1].trim()
	const plain = /filename\s*=\s*"?([^";]+)"?/.exec(disposition)
	return plain ? encodeURIComponent(plain[1].trim()) : null
}

function fallbackFilename(name: string | null, url: URL): string {
	const fromUrl = url.pathname.split("/").filter(Boolean).pop() ?? "download"
	return encodeURIComponent((name?.trim() || fromUrl).slice(0, 200))
}

export async function download(request: Request, env: Env): Promise<Response> {
	const allowedHostnames = new Set(
		["cdn.imamzain.org", env.ALLOWED_HOSTNAME]
			.filter(Boolean)
			.map((hostname) => hostname!.trim().toLowerCase()),
	)

	const requestUrl = new URL(request.url)
	const url = requestUrl.searchParams.get("url")
	const mode = requestUrl.searchParams.get("mode")
	const name = requestUrl.searchParams.get("name")

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

	const response = await fetch(parsedUrl)
	if (!response.ok || !response.body) {
		return new Response("Unable to load file", {
			status: response.status || 502,
		})
	}

	const filename =
		encodedFilename(response.headers.get("content-disposition")) ??
		fallbackFilename(name, parsedUrl)
	const inline = mode === "inline"

	const headers = new Headers({
		"Content-Type": response.headers.get("content-type") ?? "application/pdf",
		"Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${filename}`,
	})
	const contentLength = response.headers.get("content-length")
	if (contentLength) headers.set("Content-Length", contentLength)

	return new Response(response.body, { status: response.status, headers })
}
