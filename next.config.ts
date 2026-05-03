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
}

export default nextConfig
