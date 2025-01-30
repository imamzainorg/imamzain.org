import { heroui } from "@heroui/react"
import type { Config } from "tailwindcss"
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "1rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		extend: {
			screens: {
				xxs: "280px",
				xs: "500px",
				s: "380px",
				xmd: "900px",
			},
			colors: {
				primary: "#006654",
				secondary: "#bb9661",
				"dark-background": "rgb(37,52,63)",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui()],
} satisfies Config
