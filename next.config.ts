import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.47.12"],
	images: {
		deviceSizes: [640, 1080, 1920],
		imageSizes: [128, 256, 384],
		qualities: [75],
		minimumCacheTTL: 31536000,
		formats: ["image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.imamzain.org",
				pathname: "/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/home",
				destination: "/",
			},
			{
				source: "/api/audio/:path*",
				destination: "https://cdn.imamzain.org/:path*",
			},
		]
	},
	async redirects() {
		return [
			{
				source: "/application",
				destination: "/applications",
				permanent: true,
			},
			// Each app now lives on its own subdomain — send the old dedicated
			// in-site pages to the standalone sites.
			{
				source: "/applications/anwar-sajjadyia",
				destination: "https://anwar.imamzain.org",
				permanent: true,
			},
			{
				source: "/applications/maarif-al-sajjad",
				destination: "https://maarif.imamzain.org",
				permanent: true,
			},
			{
				source: "/library/al-sahifa",
				destination: "/library/al-sahifa/al-sahifa-al-sajjadiya-index",
				permanent: true,
			},
			{
				source: "/library/risalat-al-huqoq",
				destination: "/library/risalat-al-huqoq/introduction",
				permanent: true,
			},
		]
	},
}

export default nextConfig
