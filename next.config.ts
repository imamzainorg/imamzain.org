import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/vi/**",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/home",
				destination: "/",
			},
		]
	},
}

export default nextConfig
