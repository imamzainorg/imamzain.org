import { heroui } from "@heroui/react"
import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"

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
				md: "1rem",
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
			boxShadow: {
				custom: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
			},
			keyframes: {
				fadeInUp: {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				fadeInDown: {
					"0%": {
						opacity: "0",
						transform: "translateY(-20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				slideInRight: {
					"0%": {
						opacity: "0",
						transform: "translateX(100px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
				slideInLeft: {
					"0%": {
						opacity: "0",
						transform: "translateX(-100px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
				zoomIn: {
					"0%": {
						transform: "scale(1)",
					},
					"100%": {
						transform: "scale(1.1)",
					},
				},
			},
			animation: {
				"fade-in-up": "fadeInUp 0.5s ease-in-out",
				"fade-in-down": "fadeInDown 0.5s ease-in-out",
			},
			colors: {
				primary: "#006654",
				secondary: "#bb9661",
				Muharram_primary: "#231F20",
				Muharram_secondary: "#a43232",
				"dark-background": "rgb(37,52,63)",
			},
			listStyleType: {
				"arabic-indic": "arabic-indic",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), typographyPlugin],
} satisfies Config
