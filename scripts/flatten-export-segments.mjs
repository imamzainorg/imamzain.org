/**
 * Works around a Next.js static-export bug on Windows.
 *
 * The client prefetches route segments from flat files such as
 * out/about/__next.about.__PAGE__.txt. On Windows the export joins the
 * segment path with "\" before converting "/" to ".", so it writes
 * out/about/__next.about/__PAGE__.txt instead, and every prefetch 404s (each
 * miss also invokes the Worker). This moves such files to the flat names the
 * client asks for. On Linux (CI, Workers Builds) the output is already flat
 * and this does nothing.
 *
 *   node scripts/flatten-export-segments.mjs   (runs after `next build`)
 *
 * Plain Node on purpose: some library routes produce paths longer than
 * Windows' 260-character limit, which Node handles and Bun does not.
 */
import { readdirSync, renameSync, rmdirSync } from "node:fs"
import { join } from "node:path"

const OUT = "out"
let moved = 0

function walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue
		const path = join(dir, entry.name)
		if (entry.name.startsWith("__next.")) flatten(path, dir, entry.name)
		else walk(path)
	}
}

// Move every file under a nested __next.* folder up into `parent`, joining
// the folder names with "." as the client expects, then drop the folder.
function flatten(folder, parent, prefix) {
	for (const entry of readdirSync(folder, { withFileTypes: true })) {
		const path = join(folder, entry.name)
		if (entry.isDirectory()) {
			flatten(path, parent, `${prefix}.${entry.name}`)
		} else {
			renameSync(path, join(parent, `${prefix}.${entry.name}`))
			moved++
		}
	}
	rmdirSync(folder)
}

walk(OUT)
if (moved) console.log(`Flattened ${moved} segment prefetch files in ${OUT}/`)
