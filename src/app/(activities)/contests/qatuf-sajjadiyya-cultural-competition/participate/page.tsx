"use client"

import { useState, useCallback, Suspense, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Breadcrumbs from "@/components/breadcrumb"
import {
	ChevronLeft,
	ChevronRight,
	Send,
	CheckCircle,
	Clock,
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import questions from "@/data/contests/qatuf-sajjaddiyya/questions.json"
import { useSearchParams } from "next/navigation"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type AnswerState = {
	[questionIndex: number]: string
}

const STORAGE_KEYS = {
	ATTEMPT: "qutuf_attempt_id",
	ANSWERS: "qutuf_answers",
	QUESTION: "qutuf_current_question",
	START_TIME: "qutuf_start_time",
}

function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60

	if (hours > 0) {
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
	}
	return `${minutes.toString().padStart(2, "0")}:${secs
		.toString()
		.padStart(2, "0")}`
}

function ParticipateContent() {
	const params = useSearchParams()

	const name = params.get("name")
	const contactType = params.get("contactType")
	const contact = params.get("contact")
	const isTestMode = params.get("test") === "true"

	const totalQuestions = questions.length

	// -----------------------------
	// RESTORE STATE FROM STORAGE
	// -----------------------------
	const [attemptId, setAttemptId] = useState<string | null>(() => {
		if (typeof window === "undefined") return null
		return localStorage.getItem(STORAGE_KEYS.ATTEMPT)
	})

	const [answers, setAnswers] = useState<AnswerState>(() => {
		if (typeof window === "undefined") return {}
		const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS)
		return saved ? JSON.parse(saved) : {}
	})

	const [currentQuestion, setCurrentQuestion] = useState(() => {
		if (typeof window === "undefined") return 0
		const saved = localStorage.getItem(STORAGE_KEYS.QUESTION)
		return saved ? Number(saved) : 0
	})

	const [startTime] = useState(() => {
		if (typeof window === "undefined") return Date.now()

		const saved = localStorage.getItem(STORAGE_KEYS.START_TIME)
		if (saved) return Number(saved)

		const now = Date.now()
		localStorage.setItem(STORAGE_KEYS.START_TIME, String(now))
		return now
	})

	const [timeElapsed, setTimeElapsed] = useState(0)
	const [step, setStep] = useState<"questions" | "submitted">("questions")

	const answeredCount = Object.keys(answers).length
	const selectedAnswer = answers[currentQuestion]

	// -----------------------------
	// TIMER
	// -----------------------------
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
		}, 1000)

		return () => clearInterval(interval)
	}, [startTime])

	// -----------------------------
	// PERSIST ANSWERS
	// -----------------------------
	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers))
	}, [answers])

	// -----------------------------
	// PERSIST QUESTION INDEX
	// -----------------------------
	useEffect(() => {
		localStorage.setItem(STORAGE_KEYS.QUESTION, String(currentQuestion))
	}, [currentQuestion])

	// -----------------------------
	// START CONTEST (ONLY ONCE)
	// -----------------------------
	useEffect(() => {
		if (attemptId) return

		async function startContest() {
			try {
				const res = await fetch("/api/contest/start", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name,
						email: contactType === "email" ? contact : undefined,
						phone_number:
							contactType === "phone" ? contact : undefined,
					}),
				})

				const data = await res.json()
				const id = data?.data?.attemptId || null

				if (id) {
					setAttemptId(id)
					localStorage.setItem(STORAGE_KEYS.ATTEMPT, id)
				}
			} catch (err) {
				console.error("start contest error", err)
			}
		}

		startContest()
	}, [attemptId, contact, contactType, name])

	// -----------------------------
	// ANSWER HANDLER
	// -----------------------------
	const handleAnswerSelect = useCallback(
		(optionKey: string) => {
			setAnswers((prev) => ({
				...prev,
				[currentQuestion]: optionKey,
			}))
		},
		[currentQuestion],
	)

	// -----------------------------
	// NAVIGATION
	// -----------------------------
	const handleNext = useCallback(() => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((p) => p + 1)
		}
	}, [currentQuestion, totalQuestions])

	const handlePrevious = useCallback(() => {
		if (currentQuestion > 0) {
			setCurrentQuestion((p) => p - 1)
		}
	}, [currentQuestion])
	// -----------------------------
	// TEST MODE
	// -----------------------------
	const handleTestFill = useCallback(() => {
		const testAnswers: AnswerState = {}
		questions.forEach((_, i) => {
			testAnswers[i] = "أ"
		})
		setAnswers(testAnswers)
	}, [])

	// -----------------------------
	// SUBMIT
	// -----------------------------
	const handleSubmit = useCallback(async () => {
		if (!attemptId) return
		if (answeredCount !== totalQuestions) return

		const finalTime = Math.floor((Date.now() - startTime) / 1000)

		try {
			const res = await fetch("/api/contest/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					attempt_id: attemptId,
					answers: Object.entries(answers).map(([index, answer]) => ({
						question_id: questions[Number(index)].number,
						answer,
					})),
				}),
			})

			const data = await res.json()

			if (!data?.success) {
				alert("حدث خطأ أثناء الإرسال")
				return
			}

			// CLEAR STORAGE
			localStorage.removeItem(STORAGE_KEYS.ATTEMPT)
			localStorage.removeItem(STORAGE_KEYS.ANSWERS)
			localStorage.removeItem(STORAGE_KEYS.QUESTION)
			localStorage.removeItem(STORAGE_KEYS.START_TIME)

			setStep("submitted")
			setTimeElapsed(finalTime)
		} catch (err) {
			console.error(err)
			alert("حدث خطأ أثناء الإرسال")
		}
	}, [attemptId, answers, answeredCount, totalQuestions, startTime])

	// -----------------------------
	// SUBMITTED UI
	// -----------------------------
	if (step === "submitted") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center space-y-4"
				>
					<CheckCircle className="w-16 h-16 mx-auto text-green-600" />
					<h2 className="text-2xl font-bold">تم الإرسال بنجاح</h2>
					<p>الوقت: {formatTime(timeElapsed)}</p>
				</motion.div>
			</div>
		)
	}

	const currentQ = questions[currentQuestion]
	const allAnswered = answeredCount === totalQuestions

	// -----------------------------
	// MAIN UI
	// -----------------------------
	return (
		<div className="min-h-screen pb-24 lg:pb-32">
			<div className="px-4 pt-8">
				<Breadcrumbs
					links={[
						{ name: "الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{ name: "مشاركة", url: "#" },
					]}
				/>
			</div>

			{/* TIMER */}
			<div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
				<div className="flex items-center gap-2">
					<Clock className="w-5 h-5 text-primary" />
					{formatTime(timeElapsed)}
				</div>

				<div className="flex gap-3 items-center">
					{isTestMode && <button onClick={handleTestFill}>🧪</button>}
					{answeredCount} / {totalQuestions}
				</div>
			</div>

			{/* QUESTION */}
			<div className="max-w-5xl mx-auto px-4">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
					>
						<h2 className="text-lg font-bold mb-6">
							{currentQ.question}
						</h2>

						<div className="space-y-3">
							{Object.entries(currentQ.options).map(
								([key, value]) => (
									<button
										key={key}
										onClick={() => handleAnswerSelect(key)}
										className={cn(
											"w-full p-4 border rounded-xl text-right",
											selectedAnswer === key &&
												"border-primary bg-primary/10",
										)}
									>
										{key} - {value}
									</button>
								),
							)}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* NAV */}
			<div className="max-w-5xl mx-auto px-4 py-6 flex gap-3">
				<button onClick={handlePrevious}>
					<ChevronRight />
				</button>

				<button onClick={handleNext}>
					<ChevronLeft />
				</button>

				{allAnswered && (
					<button
						onClick={handleSubmit}
						className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
					>
						<Send className="w-4 h-4" />
						إرسال
					</button>
				)}
			</div>
		</div>
	)
}

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ParticipateContent />
		</Suspense>
	)
}
