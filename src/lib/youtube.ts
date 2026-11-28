// A thumbnail is an absolute URL (YouTube's own, for videos from the API) or a path in /public
// for artwork kept in the repo.
export function thumbnailUrl(path: string): string {
	if (path.startsWith("http")) return path
	return `/${path.replace(/^\/+/, "")}`
}
