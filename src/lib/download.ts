/**
 * Triggers a browser download of a proxied file through /api/download.
 * Used for PDFs and other assets where a direct link isn't available.
 */
export function downloadViaProxy(url: string, filename = "file.pdf") {
	const proxyUrl = `/api/download?url=${encodeURIComponent(url)}`
	const a = document.createElement("a")
	a.href = proxyUrl
	a.download = filename
	document.body.appendChild(a)
	a.click()
	a.remove()
}
