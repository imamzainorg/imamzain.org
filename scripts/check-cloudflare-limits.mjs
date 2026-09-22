/**
 * Guards the Cloudflare Workers Free plan limits before a deploy.
 *
 *   node scripts/check-cloudflare-limits.mjs   (after `bun run build`)
 *
 * Breaching one makes the deploy itself fail: the live site keeps serving the
 * previous version, but nothing new can ship until the build fits again. This
 * catches it in CI with a clear message, and warns well before the limit.
 * https://developers.cloudflare.com/workers/platform/limits/
 */
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const OUT = "out"
const MAX_FILES = 20000 // static asset files per Worker version
const MAX_FILE_BYTES = 25 * 1024 * 1024 // per asset file
const MAX_REDIRECTS = 2100 // _redirects: 2,000 static + 100 dynamic rules
const MAX_HEADER_RULES = 100 // _headers rules
const WARN_AT = 0.8

const annotate = (level, message) =>
	console.log(process.env.GITHUB_ACTIONS ? `::${level}::${message}` : `${level.toUpperCase()}: ${message}`)

let files = 0
const oversized = []
;(function walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name)
		if (entry.isDirectory()) walk(path)
		else {
			files++
			if (statSync(path).size > MAX_FILE_BYTES) oversized.push(relative(OUT, path))
		}
	}
})(OUT)

const rules = (file, pattern) => {
	try {
		return readFileSync(join(OUT, file), "utf8").split("\n").filter((line) => pattern.test(line)).length
	} catch {
		return 0
	}
}
const redirects = rules("_redirects", /^\s*\/\S*\s+\S+/)
const headerRules = rules("_headers", /^[^#\s]/)

let failed = false
const check = (name, value, max) => {
	const usage = `${name}: ${value.toLocaleString()} of ${max.toLocaleString()}`
	if (value > max) {
		failed = true
		annotate("error", `${usage}, over the Cloudflare Workers Free limit`)
	} else if (value > max * WARN_AT) {
		annotate("warning", `${usage}, above ${WARN_AT * 100}% of the Cloudflare Workers Free limit`)
	} else {
		console.log(`ok    ${usage}`)
	}
}

check("asset files", files, MAX_FILES)
check("_redirects rules", redirects, MAX_REDIRECTS)
check("_headers rules", headerRules, MAX_HEADER_RULES)
if (oversized.length) {
	failed = true
	annotate("error", `files over 25 MiB (move them to the CDN): ${oversized.join(", ")}`)
} else {
	console.log("ok    no file over 25 MiB")
}

process.exit(failed ? 1 : 0)
