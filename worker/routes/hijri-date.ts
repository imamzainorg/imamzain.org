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
	// A cached answer from an earlier day is wrong however young its headers
	// say it is, so it is only served while its weekday is still today's.
	if (cached && isToday((await cached.clone().json<{ hijriDate: string }>()).hijriDate)) {
		return cached
	}

	try {
		let hijriDate = await fetchHijriDate(SOURCE, false)
		if (hijriDate !== null && !isToday(hijriDate)) {
			console.warn(`Stale Hijri date from source: ${hijriDate}`)
			// sistani.org answers 404 to any query string, so the retry asks
			// for a fresh copy with headers instead of a cache-busting URL.
			hijriDate = await fetchHijriDate(SOURCE, true)
		}

		if (hijriDate === null) {
			return Response.json({ error: "Date element not found" }, { status: 404 })
		}
		// Better no date (the header falls back to the Gregorian one) than yesterday's.
		if (!isToday(hijriDate)) {
			return Response.json({ error: "Source date is stale" }, { status: 503 })
		}

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

async function fetchHijriDate(url: string, fresh: boolean): Promise<string | null> {
	const response = await fetch(url, {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			...(fresh && { "Cache-Control": "no-cache", Pragma: "no-cache" }),
		},
		cf: { cacheTtl: 0 },
	})

	if (!response.ok) {
		throw new Error(
			`HTTP error! status: ${response.status} (cf-cache-status: ${response.headers.get("cf-cache-status")}, age: ${response.headers.get("age")})`,
		)
	}

	const rawText = elementText(await response.text(), "home-date")
	if (rawText === null) return null

	// The source reads "الثلاثاء ١٠- ربيع الآخر - ١٤٤٨هـ"; move the first dash
	// to after the weekday: "الثلاثاء - ١٠ ربيع الآخر - ١٤٤٨هـ".
	let hijriDate = rawText.trim().split("||")[0].trim()

	let index = hijriDate.indexOf("-")
	hijriDate = hijriDate.substring(0, index) + hijriDate.substring(index + 1)

	index = hijriDate.indexOf(" ")
	return hijriDate.substring(0, index) + " -" + hijriDate.substring(index)
}

const WEEKDAYS: Record<string, string> = {
	Sunday: "الاحد",
	Monday: "الاثنين",
	Tuesday: "الثلاثاء",
	Wednesday: "الاربعاء",
	Thursday: "الخميس",
	Friday: "الجمعه",
	Saturday: "السبت",
}

// The date opens with its weekday, so a copy that is a day or more old is
// caught by comparing it with today's weekday in Najaf.
function isToday(hijriDate: string): boolean {
	const today = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		timeZone: "Asia/Baghdad",
	}).format(new Date())
	return normalizeArabic(hijriDate).startsWith(WEEKDAYS[today])
}

// Fold the spelling variants of the same word (hamza forms, alef maqsura, ta marbuta).
function normalizeArabic(text: string): string {
	return text.replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").trim()
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
	nbsp: " ",
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
