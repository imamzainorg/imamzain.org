// The Hijri date as published on sistani.org (Najaf), which the site follows
// rather than computing its own. The header asks for it on every pageview, so
// the answer is cached at the edge and in the browser for an hour: the source
// is fetched at most hourly per Cloudflare location instead of per visitor.
const SOURCE = "https://www.sistani.org/"
const CACHE_SECONDS = 3600

export async function hijriDate(
	request: Request,
	_env: Env,
	ctx: ExecutionContext,
): Promise<Response> {
	const cacheKey = new Request(new URL("/api/hijri-date", request.url))
	const cached = await caches.default.match(cacheKey)
	if (cached) return cached

	try {
		// 1. Fetch the HTML content
		const response = await fetch(SOURCE, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const html = await response.text()

		// 2. Extract the date
		const rawText = elementText(html, "home-date")

		if (rawText === null) {
			return Response.json({ error: "Date element not found" }, { status: 404 })
		}

		// 3. Clean the date: the source reads "الثلاثاء ١٠- ربيع الآخر - ١٤٤٨هـ";
		// move the first dash to after the weekday: "الثلاثاء - ١٠ ربيع الآخر - ١٤٤٨هـ".
		let hijriDate = rawText.trim().split("||")[0].trim()

		let index = hijriDate.indexOf("-")
		hijriDate = hijriDate.substring(0, index) + hijriDate.substring(index + 1)

		index = hijriDate.indexOf(" ")
		hijriDate = hijriDate.substring(0, index) + " -" + hijriDate.substring(index)

		const result = Response.json(
			{ hijriDate },
			{ headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` } },
		)
		ctx.waitUntil(caches.default.put(cacheKey, result.clone()))
		return result
	} catch (error) {
		console.error("Error fetching Hijri date:", error)
		return Response.json({ error: "Failed to retrieve date" }, { status: 500 })
	}
}

/**
 * Text content of the first element carrying the given id, with nested tags
 * stripped and entities decoded. The source is ~4 KB of server-rendered HTML,
 * so a scan of the markup is enough; no DOM parser is needed.
 */
function elementText(html: string, id: string): string | null {
	const opening = new RegExp(`<([a-zA-Z][\\w-]*)\\b[^>]*\\sid=["']${id}["'][^>]*>`)
	const match = opening.exec(html)
	if (!match) return null

	const tag = match[1].toLowerCase()
	const start = match.index + match[0].length
	const tags = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi")
	tags.lastIndex = start

	let depth = 1
	let end = html.length
	for (let t = tags.exec(html); t; t = tags.exec(html)) {
		depth += t[1] ? -1 : 1
		if (depth === 0) {
			end = t.index
			break
		}
	}

	return decodeEntities(html.slice(start, end).replace(/<[^>]*>/g, ""))
}

const NAMED_ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
	nbsp: " ",
}

function decodeEntities(text: string): string {
	return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, body: string) => {
		if (body[0] === "#") {
			const code =
				body[1] === "x" || body[1] === "X"
					? parseInt(body.slice(2), 16)
					: parseInt(body.slice(1), 10)
			return Number.isNaN(code) ? entity : String.fromCodePoint(code)
		}
		return NAMED_ENTITIES[body.toLowerCase()] ?? entity
	})
}
