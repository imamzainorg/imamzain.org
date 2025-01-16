import type { Config } from "tailwindcss"

export default {

	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '1rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			wordSpacing: {
				sm: '0.25rem',
				md: '0.5rem',
				lg: '1rem',
			  },
			screens:{
				'xxs': "280px",
				'xs':'500px',
				's':'380px',
				'xmd':'900px',

			},
			colors: {
				primary: "#006654",
				secondary: "#bb9661",
				"dark-background": "#25343f",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(50px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"pop-in": {
					"0%": { opacity: "0", transform: "scale(125%)" },
					"100%": { opacity: "1", transform: "scale(100%)" },
				},
				float: {
					"0%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateY(0px)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up": "fade-in-up forwards",
				"fade-in": "fade-in forwards ease-out",
				"pop-in": "pop-in forwards ease-in-out",
				float: "float 1s forwards infinite ease-in-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/container-queries"),
	],
} satisfies Config



  