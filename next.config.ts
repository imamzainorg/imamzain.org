import type { NextConfig } from "next"
import { PHASE_DEVELOPMENT_SERVER } from "next/constants"

// Production builds are a static export (out/) served by Cloudflare Workers
// Static Assets; see wrangler.jsonc. The endpoints that need a server (forms,
// downloads, the Hijri date) live in worker/, and URL redirects live in
// public/_redirects, since a static export can't run next.config redirects.
export default function config(phase: string): NextConfig {
	const isDev = phase === PHASE_DEVELOPMENT_SERVER

	return {
		output: isDev ? undefined : "export",
		allowedDevOrigins: ["192.168.47.12"],
		images: {
			// Images are transformed by Cloudflare on cdn.imamzain.org, not by
			// Next's optimizer; the loader owns sizing, quality and format.
			loader: "custom",
			loaderFile: "./src/lib/cf-image-loader.ts",
		},
		// In `next dev`, API paths with no route handler here are the worker/
		// endpoints: forward them to `wrangler dev` (bun run dev:worker).
		...(isDev && {
			async rewrites() {
				return [
					{
						source: "/api/:path*",
						destination: "http://localhost:8787/api/:path*",
					},
				]
			},
		}),
	}
}
