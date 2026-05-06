"use client"

import { LanguagesProvider } from "@/context/language-context"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LanguagesProvider>
			{children}
		</LanguagesProvider>
	)
}
