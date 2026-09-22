/**
 * The site's only server-side code.
 *
 * Every page is a static file exported by `next build` into out/ and served
 * by Workers Static Assets without running this script. Only the paths listed
 * under assets.run_worker_first in wrangler.jsonc reach it: the forms relayed
 * to the backend API, the download helper and the Hijri date. Anything else
 * that lands here falls through to the static assets, which is also where the
 * prebuilt JSON under /api (library-search-index, gallery-index, …) lives.
 */
import { contact } from "./routes/contact"
import { contestStart, contestSubmit } from "./routes/contests"
import { download } from "./routes/download"
import { hijriDate } from "./routes/hijri-date"
import { newsletterSubscribe, newsletterUnsubscribe } from "./routes/newsletter"
import { proxyVisit } from "./routes/proxy-visit"

type Handler = (
	request: Request,
	env: Env,
	ctx: ExecutionContext,
) => Promise<Response>

type Method = "GET" | "POST"

// Keep in sync with assets.run_worker_first in wrangler.jsonc.
const ROUTES: Record<string, Partial<Record<Method, Handler>>> = {
	"/api/contact": { POST: contact },
	"/api/contests/qatuf-sajjadiyya/start": { POST: contestStart },
	"/api/contests/qatuf-sajjadiyya/submit": { POST: contestSubmit },
	"/api/download": { GET: download },
	"/api/hijri-date": { GET: hijriDate },
	"/api/newsletter/subscribe": { POST: newsletterSubscribe },
	"/api/newsletter/unsubscribe": { POST: newsletterUnsubscribe },
	"/api/proxy-visit": { POST: proxyVisit },
}

export default {
	async fetch(request, env, ctx) {
		const route = ROUTES[new URL(request.url).pathname]
		if (!route) return env.ASSETS.fetch(request)

		// Same method semantics Next.js route handlers had: HEAD is served by
		// GET, OPTIONS answers with the allowed methods, anything else is 405.
		const methods = Object.keys(route) as Method[]
		const allow = [...methods, ...(route.GET ? ["HEAD"] : []), "OPTIONS"].join(
			", ",
		)
		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: { Allow: allow } })
		}
		const handler =
			route[(request.method === "HEAD" ? "GET" : request.method) as Method]
		if (!handler) {
			return new Response(null, { status: 405, headers: { Allow: allow } })
		}
		return handler(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
