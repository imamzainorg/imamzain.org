// A thumbnail is an absolute URL (YouTube's own, for videos from the API) or a path in /public
// (the old youtube.json, which only the home page still reads).
export function thumbnailUrl(path: string): string {
	if (path.startsWith("http")) return path
	return `/${path.replace(/^\/+/, "")}`
}
