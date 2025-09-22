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
			{
				protocol: "https",
				hostname: "d2pj6hgapx5040.cloudfront.net",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
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
