"use client"

import { HeroUIProvider } from "@heroui/react"
import { LanguagesProvider } from "@/context/language-context"
import TransitionProvider from "@/components/transition-provider"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<LanguagesProvider>
				<TransitionProvider>
					{children}
				</TransitionProvider>
			</LanguagesProvider>
		</HeroUIProvider>
	)
}
