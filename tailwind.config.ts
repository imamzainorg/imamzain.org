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
			},
			animation: {
				"fade-in-up": "fadeInUp 0.5s ease-in-out",
			},
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				"secondary/10": "rgba(187, 150, 97, 0.1)",
				"secondary/20": "rgba(187, 150, 97, 0.2)",
				"secondary/30": "rgba(187, 150, 97, 0.3)",
				"secondary/40": "rgba(187, 150, 97, 0.4)",
				"secondary/50": "rgba(187, 150, 97, 0.5)",
				"secondary/60": "rgba(187, 150, 97, 0.6)",
				"secondary/70": "rgba(187, 150, 97, 0.7)",
				"secondary/80": "rgba(187, 150, 97, 0.8)",
				"secondary/90": "rgba(187, 150, 97, 0.9)",
				"secondary/100": "rgba(187, 150, 97, 1)",
				
				"primary/10": "rgba(0, 102, 84, 0.1)",
				"primary/20": "rgba(0, 102, 84, 0.2)",
				"primary/30": "rgba(0, 102, 84, 0.3)",
				"primary/40": "rgba(0, 102, 84, 0.4)",
				"primary/50": "rgba(0, 102, 84, 0.5)",
				"primary/60": "rgba(0, 102, 84, 0.6)",
				"primary/70": "rgba(0, 102, 84, 0.7)",
				"primary/80": "rgba(0, 102, 84, 0.8)",
				"primary/90": "rgba(0, 102, 84, 0.9)",
				"primary/100": "rgba(0, 102, 84, 1)",
				"dark-primary": "rgba(208, 60, 60,0.8)",
				
				"dark-background": "rgb(37,52,63)",
			},
			listStyleType: {
				"arabic-indic": "arabic-indic",
			},
		},
	},
	darkMode: "class",
	plugins: [heroui(), require("@tailwindcss/typography")],
} satisfies Config
