"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
	ArrowUpLeft,
	BadgeCheck,
	Clock,
	LibraryBig,
} from "lucide-react"

export interface AppItem {
	name: string
	slug: string
	/** The app's own site (its subdomain) — the card links out here. */
	url: string
	tagline: string
	description: string
	category: string
	status: "available" | "soon"
	/** Front (taller) and back screenshot. */
	front: string
	back: string
	/**
	 * When true, the screenshots are raw screen captures and are wrapped in a
	 * slim device bezel. Leave false for assets that already contain a frame.
	 */
	framed?: boolean
	store?: {
		appStore: string
		googlePlay: string
	}
}

export default function AppCard({
	app,
	index,
}: {
	app: AppItem
	index: number
}) {
	const reduce = useReducedMotion()
	const isAvailable = app.status === "available"

	return (
		<motion.article
			role="listitem"
			aria-label={`تطبيق ${app.name}`}
			initial={reduce ? false : { opacity: 0, y: 40 }}
			whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
			whileHover={reduce || !isAvailable ? undefined : { y: -8 }}
			className="group/card relative flex flex-col overflow-hidden rounded-3xl border border-gray-100/60 bg-gradient-to-br from-white to-gray-50/60 shadow-lg backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl dark:border-Muharram_secondary/15 dark:from-Muharram_primary dark:to-Muharram_primary/80"
		>
			{/* hover sheen + soft blob */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 dark:from-Muharram_secondary/10"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl dark:bg-Muharram_secondary/10"
			/>

			{/* status badge */}
			{isAvailable ? (
				<span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-subtitle font-semibold text-white shadow-md dark:bg-Muharram_secondary/90">
					<BadgeCheck className="w-4 h-4" />
					متوفّر الآن
				</span>
			) : (
				<span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-secondary_dark px-3 py-1 text-subtitle font-semibold text-white shadow-md">
					<Clock className="w-4 h-4" />
					قريباً
				</span>
			)}

			{/* media band: two overlapping phones */}
			<div className="relative flex h-56 items-end justify-center gap-3 bg-gradient-to-b from-primary/[0.07] to-transparent px-6 pt-8 sm:h-64 dark:from-Muharram_secondary/10">
				<div className="relative h-48 w-[5.5rem] -rotate-6 translate-y-4 opacity-80 sm:h-56 sm:w-[6.45rem]">
					{app.framed ? (
						<div className="h-full w-full overflow-hidden rounded-[1.4rem] bg-neutral-900 p-[2px] shadow-xl ring-1 ring-black/10">
							<Image
								src={app.back}
								alt=""
								aria-hidden
								fill
								sizes="128px"
								className="rounded-[1.3rem] object-cover"
							/>
						</div>
					) : (
						<Image
							src={app.back}
							alt=""
							aria-hidden
							fill
							sizes="128px"
							className="object-contain drop-shadow-xl"
						/>
					)}
				</div>
				<div className="relative z-10 h-52 w-[6rem] rotate-3 transition-transform duration-500 group-hover/card:-translate-y-2 sm:h-60 sm:w-[6.9rem]">
					{app.framed ? (
						<div className="h-full w-full overflow-hidden rounded-[1.5rem] bg-neutral-900 p-[2px] shadow-2xl ring-1 ring-black/10">
							<Image
								src={app.front}
								alt={`واجهة تطبيق ${app.name}`}
								fill
								sizes="144px"
								className="rounded-[1.4rem] object-cover"
							/>
						</div>
					) : (
						<Image
							src={app.front}
							alt={`واجهة تطبيق ${app.name}`}
							fill
							sizes="144px"
							className="object-contain drop-shadow-2xl"
						/>
					)}
				</div>
			</div>

			{/* body */}
			<div className="flex flex-1 flex-col gap-4 p-6 text-center lg:p-8">
				<span className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-subtitle font-medium text-secondary_dark dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary">
					<LibraryBig className="w-3.5 h-3.5" />
					{app.category}
				</span>
				<h3 className="text-body font-bold leading-[1.25] text-primary dark:text-white">
					{app.name}
				</h3>
				<p className="text-note font-medium leading-relaxed text-gray-700 dark:text-gray-200">
					{app.tagline}
				</p>
				<p className="text-note leading-relaxed text-gray-600 dark:text-gray-300">
					{app.description}
				</p>

				{/* footer / CTA */}
				<div className="mt-auto flex flex-col gap-3 pt-5">
					{isAvailable ? (
						<>
							<Link
								href={app.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`اكتشف تطبيق ${app.name} — الموقع الرسمي`}
								className="group/cta relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-l from-primary to-primary/90 px-6 py-4 text-note font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:from-Muharram_secondary dark:to-Muharram_secondary/90 dark:focus:ring-Muharram_secondary"
							>
								<span>اكتشف التطبيق</span>
								<ArrowUpLeft className="w-5 h-5 transition-transform group-hover/cta:-translate-x-1 group-hover/cta:-translate-y-1" />
							</Link>
							{app.store && (
								<div className="flex items-center justify-center gap-3 pt-1">
									<Link
										href={app.store.appStore}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="تنزيل من App Store"
									>
										<Image
											src="/applications/app-store.svg"
											alt="تنزيل من App Store"
											width={500}
											height={500}
											className="h-11 w-auto"
										/>
									</Link>
									<Link
										href={app.store.googlePlay}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="احصل عليه من Google Play"
									>
										<Image
											src="/applications/google-play.svg"
											alt="احصل عليه من Google Play"
											width={500}
											height={500}
											className="h-11 w-auto"
										/>
									</Link>
								</div>
							)}
						</>
					) : (
						<>
							<Link
								href={app.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`اكتشف تطبيق ${app.name} — الموقع الرسمي`}
								className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-secondary_dark px-6 py-4 text-note font-semibold text-secondary_dark transition-colors hover:bg-secondary_dark/10 focus:outline-none focus:ring-2 focus:ring-secondary_dark focus:ring-offset-2 dark:border-Muharram_secondary/40 dark:text-Muharram_secondary dark:focus:ring-Muharram_secondary"
							>
								<span>اكتشف التطبيق</span>
								<ArrowUpLeft className="w-5 h-5 transition-transform group-hover/cta:-translate-x-1 group-hover/cta:-translate-y-1" />
							</Link>
							<p className="inline-flex items-center justify-center gap-1.5 text-subtitle text-gray-500 dark:text-gray-400">
								<Clock className="w-3.5 h-3.5" />
								ترقّبوا إطلاقه على المتاجر
							</p>
						</>
					)}
				</div>
			</div>
		</motion.article>
	)
}
