export function downloadViaProxy(url: string, filename?: string) {
    const resolvedFilename = filename ?? extractFilenameFromUrl(url)
    const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(resolvedFilename)}`
                                                                                                   
    const a = document.createElement("a")
    a.href = proxyUrl
    a.download = resolvedFilename
    document.body.appendChild(a)
    a.click()
    a.remove()
}

function extractFilenameFromUrl(url: string): string {
    try {
        const { pathname } = new URL(url)
        const raw = pathname.split("/").filter(Boolean).pop() ?? ""
        const decoded = decodeURIComponent(raw)
        const cleaned = decoded.split("?")[0].trim()
        return cleaned || "download"
    } catch {
        return "download"
    }
}