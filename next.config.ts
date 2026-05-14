import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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

			}, {
        source: "/api/audio/:path*",
        destination: "https://cdn.imamzain.org/:path*",
      },
		]
	},
	async redirects() {
		return [
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
