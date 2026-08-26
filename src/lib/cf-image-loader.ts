import type { ImageLoaderProps } from "next/image"

const CDN_PREFIX = "https://cdn.imamzain.org/"

// Requested widths snap up to one of these buckets so the number of unique
// Cloudflare transformations stays far below the free plan's 5,000/month.
const WIDTH_BUCKETS = [384, 768, 1080, 1920]

/**
 * Custom next/image loader that serves CDN images through Cloudflare Image
 * Transformations instead of Vercel's optimizer (which bills the transfer
 * twice: once into the function, once out to the visitor).
 *
 * onerror=redirect falls back to the original file if a transformation is
 * ever unavailable, so worst case is an unresized original, never a 4xx.
 * Non-CDN sources (local /public assets) are returned untouched.
 */
export default function cloudflareImageLoader({
	src,
	width,
}: ImageLoaderProps): string {
	if (!src.startsWith(CDN_PREFIX)) {
		return src
	}

	const bucket =
		WIDTH_BUCKETS.find((b) => b >= width) ??
		WIDTH_BUCKETS[WIDTH_BUCKETS.length - 1]

	// CDN paths in src/data are stored unencoded (Arabic filenames, spaces),
	// so encodeURI is safe here and required for a valid transformation URL.
	const sourcePath = encodeURI(src.slice(CDN_PREFIX.length))

	return `${CDN_PREFIX}cdn-cgi/image/width=${bucket},quality=75,format=auto,onerror=redirect/${sourcePath}`
}
