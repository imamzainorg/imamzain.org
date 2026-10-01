"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import type { WordItem } from "../_data/biography"
import { useShown } from "@/components/motion"

const noMotion = "motion-reduce:!transform-none motion-reduce:!transition-none"

export default function CaptivityRoute({ stops }: { stops: { place: string; items: WordItem[] }[] }) {
	const [ref, shown] = useShown<HTMLDivElement>()
	const draw = "transform 1.4s ease-in-out"

	return (
		<div ref={ref} className="relative">
			{/* The path between the stations draws itself in reading direction. */}
			<div
				aria-hidden
				style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transition: draw }}
				className={`absolute left-[16%] right-[16%] top-7 hidden origin-right border-t-2 border-dashed border-secondary dark:border-Muharram_secondary lg:block ${noMotion}`}
			/>
			<div
				aria-hidden
				style={{ transform: shown ? "scaleY(1)" : "scaleY(0)", transition: draw }}
				className={`absolute bottom-0 right-[27px] top-7 origin-top border-r-2 border-dashed border-secondary dark:border-Muharram_secondary lg:hidden ${noMotion}`}
			/>

			<ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
				{stops.map((stop, i) => (
					<li
						key={stop.place}
						className={`relative pr-20 lg:pr-0 ${noMotion}`}
						style={{
							opacity: shown ? 1 : 0,
							transform: shown ? "none" : "translateY(30px)",
							transition: `opacity 0.6s ease-out ${0.2 + i * 0.35}s, transform 0.6s ease-out ${0.2 + i * 0.35}s`,
						}}
					>
						<span className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-8 ring-yellow-50 dark:bg-Muharram_primary lg:relative lg:mx-auto">
							<MapPin className="h-6 w-6" />
						</span>
						<h4 className="pt-3 text-2xl font-bold text-primary dark:text-Muharram_primary lg:mt-4 lg:pt-0 lg:text-center">
							{stop.place}
						</h4>
						<ul className="mt-5 space-y-7">
							{stop.items.map((item) => (
								<li key={item.title}>
									<Link
										href={item.href}
										className="text-lg font-bold text-gray-900 underline-offset-4 hover:text-primary hover:underline dark:hover:text-Muharram_primary"
									>
										{item.title}
									</Link>
									<p className="mt-2 text-lg leading-loose text-gray-700">{item.text}</p>
									{item.source && (
										<p className="mt-1 text-sm text-secondary_dark dark:text-Muharram_secondary">{item.source}</p>
									)}
								</li>
							))}
						</ul>
					</li>
				))}
			</ol>
		</div>
	)
}
