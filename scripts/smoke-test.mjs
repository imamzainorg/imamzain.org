/**
 * Smoke test: checks the pages and endpoints the site cannot do without.
 *
 *   node scripts/smoke-test.mjs <base-url> [--live]
 *
 * Used by .github/workflows: on a new version's preview URL before it goes
 * live, on https://imamzain.org right after (a failure there triggers an
 * automatic rollback), and on a schedule as an uptime check. Exits 1 if any
 * hard check fails. Soft checks (third-party dependencies) only warn.
 *
 * --live  also warns if the base URL is still answered by the old Vercel host.
 */
const base = (process.argv[2] ?? "").replace(/\/+$/, "")
const live = process.argv.includes("--live")
if (!/^https?:\/\//.test(base)) {
	console.error("usage: node scripts/smoke-test.mjs <base-url> [--live]")
	process.exit(2)
}

const CHECKS = [
	{ path: "/", status: 200, type: "text/html", contains: "مؤسسة الإمام زين العابدين" },
	{ path: "/links", status: 200, type: "text/html" },
	{ path: "/library", status: 200, type: "text/html" },
	{ path: "/sitemap.xml", status: 200, contains: "<loc>" },
	{ path: "/robots.txt", status: 200 },
	{ path: "/api/gallery-index", status: 200, type: "application/json" },
	{ path: "/application", status: 308, location: "/applications" },
	{ path: "/this-page-does-not-exist", status: 404 },
	// Answered by worker/ itself; never reaches the backend API.
	{
		path: "/api/contact",
		method: "POST",
		body: "{}",
		status: 400,
		contains: "Missing required fields",
	},
	// Scraped from sistani.org: an outage there must not block a deploy.
	{ path: "/api/hijri-date", status: 200, type: "application/json", soft: true },
]

const ATTEMPTS = 4
const RETRY_MS = 5000
const annotate = (level, message) =>
	console.log(process.env.GITHUB_ACTIONS ? `::${level}::${message}` : `${level.toUpperCase()}: ${message}`)

async function run(check) {
	const response = await fetch(base + check.path, {
		method: check.method ?? "GET",
		body: check.body,
		headers: check.body ? { "content-type": "application/json" } : {},
		redirect: "manual",
		signal: AbortSignal.timeout(20000),
	})
	const body = await response.text()
	const problems = []
	if (response.status !== check.status) problems.push(`status ${response.status}, expected ${check.status}`)
	const type = response.headers.get("content-type") ?? ""
	if (check.type && !type.startsWith(check.type)) problems.push(`content-type "${type}", expected ${check.type}`)
	if (check.contains && !body.includes(check.contains)) problems.push(`body lacks "${check.contains}"`)
	const location = response.headers.get("location") ?? ""
	if (check.location && !location.endsWith(check.location)) problems.push(`location "${location}", expected ${check.location}`)
	return { problems, headers: response.headers }
}

let failed = 0
for (const check of CHECKS) {
	const label = `${check.method ?? "GET"} ${check.path}`
	let result
	for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
		try {
			result = await run(check)
		} catch (error) {
			result = { problems: [String(error?.cause?.code ?? error?.message ?? error)] }
		}
		if (!result.problems.length) break
		if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, RETRY_MS))
	}
	if (!result.problems.length) {
		console.log(`ok    ${label}`)
	} else if (check.soft) {
		annotate("warning", `${base}${check.path}: ${result.problems.join("; ")}`)
	} else {
		failed++
		annotate("error", `${base}${check.path}: ${result.problems.join("; ")}`)
	}
	if (live && check.path === "/" && result.headers?.get("x-vercel-id")) {
		annotate("warning", `${base} is still served by Vercel: add the imamzain.org/* route to the imamzain-org Worker (see CONTRIBUTING.md, Hosting).`)
	}
}

console.log(failed ? `\n${failed} check(s) failed on ${base}` : `\nAll checks passed on ${base}`)
process.exit(failed ? 1 : 0)
