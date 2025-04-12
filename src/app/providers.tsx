"use client"

import { HeroUIProvider } from "@heroui/react"
import { LanguagesProvider } from "@/context/language-context"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<LanguagesProvider>{children}</LanguagesProvider>
		</HeroUIProvider>
	)
}
