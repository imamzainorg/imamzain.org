"use client"

import { HeroUIProvider } from "@heroui/react"
import { LanguagesProvider } from "@/context/language-context"
import TransitionProvider from "@/components/transition-provider"
import Lenis from "lenis"
import { useEffect } from "react"

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.4,
			smoothWheel: true,
			wheelMultiplier: 1.2,
			touchMultiplier: 1.2,
			easing: (t: number) => 1 - Math.pow(1 - t, 3),
		})

		let rafId: number

		const raf = (time: number) => {
			lenis.raf(time)
			rafId = requestAnimationFrame(raf)
		}

		rafId = requestAnimationFrame(raf)

		return () => {
			cancelAnimationFrame(rafId)
			lenis.destroy()
		}
	}, [])

	return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<LanguagesProvider>
				<SmoothScrollProvider>
					<TransitionProvider>{children}</TransitionProvider>
				</SmoothScrollProvider>
			</LanguagesProvider>
		</HeroUIProvider>
	)
}
