"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type { WordItem } from "../_data/biography"

const draw = { duration: 1.4, ease: "easeInOut" } as const

export default function CaptivityRoute({ stops }: { stops: { place: string; items: WordItem[] }[] }) {
	return (
		<div className="relative">
			{/* The path between the stations draws itself in reading direction. */}
			<motion.div
				aria-hidden
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true, amount: 0.5 }}
				transition={draw}
				className="absolute left-[16%] right-[16%] top-7 hidden origin-right border-t-2 border-dashed border-secondary dark:border-Muharram_secondary lg:block"
			/>
			<motion.div
				aria-hidden
				initial={{ scaleY: 0 }}
				whileInView={{ scaleY: 1 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={draw}
				className="absolute bottom-0 right-[27px] top-7 origin-top border-r-2 border-dashed border-secondary dark:border-Muharram_secondary lg:hidden"
			/>

			<ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
				{stops.map((stop, i) => (
					<motion.li
						key={stop.place}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 + i * 0.35 }}
						className="relative pr-20 lg:pr-0"
					>
						<span className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-8 ring-yellow-50 dark:bg-Muharram_primary lg:relative lg:mx-auto">
							<MapPin className="h-6 w-6" />
						</span>
						<h4 className="pt-3 text-2xl font-bold text-primary dark:text-Muharram_primary lg:pt-0 lg:mt-4 lg:text-center">
							{stop.place}
						</h4>
						<ul className="mt-5 space-y-6">
							{stop.items.map((item) => (
								<li key={item.title}>
									<Link
										href={item.href}
										className="text-lg font-bold text-gray-900 underline-offset-4 hover:text-primary hover:underline dark:hover:text-Muharram_primary"
									>
										{item.title}
									</Link>
									<p className="mt-1 leading-loose text-gray-600">{item.text}</p>
								</li>
							))}
						</ul>
					</motion.li>
				))}
			</ol>
		</div>
	)
}
