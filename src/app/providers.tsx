"use client"

import { HeroUIProvider } from "@heroui/react"
import { LanguagesProvider } from "@/context/language-context"
import TransitionProvider from "@/components/transition-provider"
import Lenis from "@studio-freight/lenis"
import { useEffect } from "react"

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.07,
			smoothWheel: true,
		})

		let frame: number

		const raf = (time: number) => {
			lenis.raf(time)
			frame = requestAnimationFrame(raf)
		}

		frame = requestAnimationFrame(raf)

		return () => {
			cancelAnimationFrame(frame)
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
