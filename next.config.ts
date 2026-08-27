import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.47.12"],
	images: {
		// Images are transformed by Cloudflare on cdn.imamzain.org, not by
		// Vercel's optimizer; the loader owns sizing, quality and format.
		loader: "custom",
		loaderFile: "./src/lib/cf-image-loader.ts",
	},
	async rewrites() {
		return [
			{
				source: "/home",
				destination: "/",
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
				source: "/applications/maarif-al-sajjad/privacy-policy",
				destination: "https://maarif.imamzain.org/privacy-policy",
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
