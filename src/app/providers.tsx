"use client"

import { LanguagesProvider } from "@/context/language-context"
import TransitionProvider from "@/components/transition-provider"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LanguagesProvider>
			<TransitionProvider>{children}</TransitionProvider>
		</LanguagesProvider>
	)
}
