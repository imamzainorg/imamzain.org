// One-off migration: rewrite https://cdn.imamzain.org/<old key> URLs to the new
// UUID-based keys, using the url-map.csv produced by the media standardization.
//
// Usage: node scripts/rewrite-media-urls.mjs <url-map.csv> [--write] [--report out.json]
//
// - Matching compares percent-decoded, NFC-normalized keys.
// - Only rows with location=live are used.
// - Files are edited as raw text; only the URL substring changes, so JSON
//   formatting is preserved byte for byte.
// - URLs with no live row are left unchanged and reported.
import fs from "node:fs"
import path from "node:path"

const args = process.argv.slice(2)
const csvPath = args.find((a) => !a.startsWith("--"))
const write = args.includes("--write")
const reportIdx = args.indexOf("--report")
const reportPath = reportIdx >= 0 ? args[reportIdx + 1] : null
if (!csvPath) {
	console.error("usage: node scripts/rewrite-media-urls.mjs <url-map.csv> [--write] [--report out.json]")
	process.exit(1)
}

const PREFIX = "https://cdn.imamzain.org/"

function normKey(raw) {
	// JSON may escape slashes as \/
	let k = raw.split("\\/").join("/").replace(/[?#].*$/, "")
	try {
		if (/%[0-9A-F]{2}/i.test(k)) k = decodeURIComponent(k)
	} catch {
		// leave undecodable keys as they are
	}
	return k.normalize("NFC").trim()
}

function parseCsv(text) {
	text = text.replace(/^\uFEFF/, "")
	const rows = []
	let row = [],
		field = "",
		quoted = false
	for (let i = 0; i < text.length; i++) {
		const c = text[i]
		if (quoted) {
			if (c === '"' && text[i + 1] === '"') {
				field += '"'
				i++
			}
			else if (c === '"') quoted = false
			else field += c
		} else if (c === '"') quoted = true
		else if (c === ",") {
			row.push(field)
			field = ""
		}
		else if (c === "\n" || c === "\r") {
			if (c === "\r" && text[i + 1] === "\n") i++
			row.push(field)
			field = ""
			if (row.length > 1 || row[0] !== "") rows.push(row)
			row = []
		} else field += c
	}
	if (field !== "" || row.length) {
		row.push(field)
		rows.push(row)
	}
	return rows
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8"))
const header = rows.shift()
const iOld = header.indexOf("old_url"),
	iNew = header.indexOf("new_url"),
	iLoc = header.indexOf("location")
const live = new Map() // normalized old key -> new url
const migrated = new Set() // new urls of live rows, so a re-run is a no-op
const orphan = new Map()
let conflicts = 0
for (const r of rows) {
	if (!r[iOld]?.startsWith(PREFIX)) continue
	const key = normKey(r[iOld].slice(PREFIX.length))
	const target = r[iNew]
	if (r[iLoc] === "live") {
		if (live.has(key) && live.get(key) !== target) {
			conflicts++
			console.error("CONFLICT", key, live.get(key), target)
		}
		live.set(key, target)
		migrated.add(target)
	} else if (r[iLoc] === "orphans") orphan.set(key, target)
}
if (conflicts) process.exit(2)

const roots = ["src"]
const exts = /\.(json|tsx?|mjs|js|md|css)$/
const files = []
;(function walk(d) {
	for (const e of fs.readdirSync(d, { withFileTypes: true })) {
		const p = path.join(d, e.name)
		if (e.isDirectory()) walk(p)
		else if (exts.test(e.name)) files.push(p)
	}
})(roots[0])

// Stops at a quote, backslash (JSON escape), angle bracket, backtick or newline.
const URL_RE = new RegExp(
	"https:" + "//cdn\\.imamzain\\.org/" + "[^\"'`\\\\\\n<>]+",
	"g",
)

const report = { files: {}, unmapped: {}, orphanOnly: {}, totals: { rewritten: 0, unmapped: 0, orphanOnly: 0 } }
for (const file of files.sort()) {
	const rel = file.split(path.sep).join("/")
	const text = fs.readFileSync(file, "utf8")
	let rewritten = 0
	const out = text.replace(URL_RE, (url) => {
		const key = url.slice(PREFIX.length)
		// the bare origin / cdn-cgi urls are not media keys
		if (!key || key.startsWith("cdn-cgi/")) return url
		if (migrated.has(url)) return url
		const nk = normKey(key)
		const hit = live.get(nk)
		if (hit) {
			rewritten++
			return hit
		}
		const bucket = orphan.has(nk) ? report.orphanOnly : report.unmapped
		;(bucket[rel] ||= []).push(url)
		report.totals[orphan.has(nk) ? "orphanOnly" : "unmapped"]++
		return url
	})
	if (rewritten) report.files[rel] = rewritten
	report.totals.rewritten += rewritten
	if (write && out !== text) fs.writeFileSync(file, out)
}

console.log(JSON.stringify({ totals: report.totals, rewrittenPerFile: report.files, unmappedPerFile: Object.fromEntries(Object.entries(report.unmapped).map(([k, v]) => [k, v.length])), orphanOnlyPerFile: Object.fromEntries(Object.entries(report.orphanOnly).map(([k, v]) => [k, v.length])) }, null, 2))
if (reportPath) fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
