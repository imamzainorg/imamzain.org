"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlayCircle } from "lucide-react"
import { shieldPanel, whiteButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { STORAGE_KEYS, participateHref } from "../storage"
import ParticipationForm from "./participation-form"

type Gate =
	| { status: "loading" }
	| { status: "form" }
	| { status: "resume"; attemptId: string }

/**
 * Decides what the bottom of the landing page shows:
 *
 *  - no in-progress attempt in localStorage  → the registration form ("ابدأ المسابقة")
 *  - an in-progress attempt in localStorage   → a resume prompt ("أكمل المسابقة")
 *
 * localStorage is only readable on the client, so we render a full-height
 * placeholder during SSR/first paint (matching the min-h-screen of both real
 * states) to avoid a layout jump, then resolve after mount.
 */
export default function ParticipationSection() {
	const [gate, setGate] = useState<Gate>({ status: "loading" })

	// Bridge external state (localStorage) into React after mount. Calling
	// setState here is the canonical exception to react-hooks/set-state-in-effect,
	// the same pattern the quiz page uses to rehydrate saved answers.
	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEYS.ATTEMPT)
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setGate(
			stored
				? { status: "resume", attemptId: stored }
				: { status: "form" },
		)
	}, [])

	if (gate.status === "loading") {
		return <div className="min-h-screen" aria-hidden />
	}

	if (gate.status === "resume") {
		return <ResumePrompt attemptId={gate.attemptId} />
	}

	return <ParticipationForm />
}

function ResumePrompt({ attemptId }: { attemptId: string }) {
	return (
		<div className="container py-8 lg:py-16">
			<Reveal y={24}>
				<div className={`${shieldPanel} mx-auto max-w-2xl space-y-8 p-8 text-center md:p-12`}>
					<span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary text-secondary dark:border-white/60 dark:text-white">
						<PlayCircle className="h-8 w-8" strokeWidth={1.5} aria-hidden />
					</span>

					<div className="space-y-3">
						<h2 className="text-2xl font-extrabold md:text-3xl">لديك مشاركة غير مكتملة</h2>
						<p className="text-lg leading-loose text-white/80">
							يمكنك متابعة المسابقة من حيث توقفت دون الحاجة إلى
							إدخال معلوماتك مرة أخرى.
						</p>
					</div>

					<Link href={participateHref(attemptId)} className={`${whiteButton} w-full !py-4 text-xl`}>
						<PlayCircle className="h-6 w-6" />
						أكمل المسابقة
					</Link>
				</div>
			</Reveal>
		</div>
	)
}
