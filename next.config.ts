import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
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
