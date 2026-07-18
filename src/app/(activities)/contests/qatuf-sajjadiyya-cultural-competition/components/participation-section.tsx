"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PlayCircle } from "lucide-react"
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
		<div className="min-h-screen px-4 py-8 lg:py-16">
			<div className="max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-slate-200/60 p-6 lg:p-10 space-y-6 lg:space-y-8 text-center"
				>
					<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
						<PlayCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
					</div>

					<div className="space-y-3 lg:space-y-4">
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800">
							لديك مشاركة غير مكتملة
						</h2>
						<p className="text-slate-600 text-base lg:text-lg">
							يمكنك متابعة المسابقة من حيث توقفت دون الحاجة إلى
							إدخال معلوماتك مرة أخرى.
						</p>
					</div>

					<Link
						href={participateHref(attemptId)}
						className="inline-flex items-center justify-center gap-2 w-full py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
					>
						<PlayCircle className="w-5 h-5 lg:w-6 lg:h-6" />
						أكمل المسابقة
					</Link>
				</motion.div>
			</div>
		</div>
	)
}
