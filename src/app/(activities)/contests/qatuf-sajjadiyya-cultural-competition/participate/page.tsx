"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Breadcrumbs from "@/components/breadcrumb"
import {
	ChevronLeft,
	ChevronRight,
	Send,
	CheckCircle,
	Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import questions from "@/data/contests/qatuf-sajjaddiyya/questions.json"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { STORAGE_KEYS } from "../storage"

type AnswerState = {
	[questionIndex: number]: string
}


function ParticipateContent() {
	const params = useSearchParams()
	const router = useRouter()
	const attemptId = params.get("attempt_id")

	const totalQuestions = questions.length

	// Plain defaults — localStorage is loaded in useEffect to avoid SSR/client hydration mismatch
	const [answers, setAnswers] = useState<AnswerState>({})
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [hydrated, setHydrated] = useState(false)
	const [step, setStep] = useState<"questions" | "submitted">("questions")
	const [submitError, setSubmitError] = useState<string>("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const answeredCount = Object.keys(answers).length
	const selectedAnswer = answers[currentQuestion]

	// Hydrate from localStorage after mount; detect new attempt and clear stale data.
	// This effect intentionally calls setState — bridging external state (localStorage)
	// into React state is the canonical exception to react-hooks/set-state-in-effect.
	useEffect(() => {
		if (!attemptId) {
			router.replace("/contests/qatuf-sajjadiyya-cultural-competition")
			return
		}

		const storedAttemptId = localStorage.getItem(STORAGE_KEYS.ATTEMPT)

		if (storedAttemptId !== attemptId) {
			// New attempt — wipe any leftover data from previous session
			localStorage.setItem(STORAGE_KEYS.ATTEMPT, attemptId)
			localStorage.removeItem(STORAGE_KEYS.ANSWERS)
			localStorage.removeItem(STORAGE_KEYS.QUESTION)
		} else {
			// Same attempt — restore saved progress
			const savedAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS)
			// eslint-disable-next-line react-hooks/set-state-in-effect
			if (savedAnswers) setAnswers(JSON.parse(savedAnswers))

			const savedQuestion = localStorage.getItem(STORAGE_KEYS.QUESTION)
			if (savedQuestion) setCurrentQuestion(Number(savedQuestion))
		}

		setHydrated(true)
	}, [attemptId, router])

	// Persist only after hydration so the empty initial state doesn't overwrite saved data
	useEffect(() => {
		if (!hydrated) return
		localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers))
	}, [answers, hydrated])

	useEffect(() => {
		if (!hydrated) return
		localStorage.setItem(STORAGE_KEYS.QUESTION, String(currentQuestion))
	}, [currentQuestion, hydrated])

	const handleAnswerSelect = useCallback(
		(optionKey: string) => {
			setAnswers((prev) => ({ ...prev, [currentQuestion]: optionKey }))
		},
		[currentQuestion],
	)

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

	const handleSubmit = useCallback(async () => {
		if (answeredCount !== totalQuestions) {
			setSubmitError(
				`يرجى الإجابة على جميع الأسئلة قبل الإرسال. تبقى ${totalQuestions - answeredCount} سؤال.`,
			)
			return
		}

		if (!attemptId) return

		setIsSubmitting(true)
		setSubmitError("")

		try {
			const res = await fetch("/api/contests/qatuf-sajjadiyya/submit", {
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

			if (!res.ok) {
				// If the backend reports this attempt was already submitted —
				// e.g. an earlier submit succeeded but its response was lost —
				// treat it as done rather than a dead-end error: clear the saved
				// progress so the landing page falls back to "ابدأ المسابقة",
				// and show the thank-you screen.
				const alreadySubmitted =
					res.status === 409 &&
					/already been submitted/i.test(data?.error ?? "")

				if (!alreadySubmitted) {
					setSubmitError(
						data.error ||
							"حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً.",
					)
					return
				}
			}

			localStorage.removeItem(STORAGE_KEYS.ATTEMPT)
			localStorage.removeItem(STORAGE_KEYS.ANSWERS)
			localStorage.removeItem(STORAGE_KEYS.QUESTION)

			setStep("submitted")
		} catch {
			setSubmitError("حدث خطأ في الاتصال، يرجى المحاولة مجدداً.")
		} finally {
			setIsSubmitting(false)
		}
	}, [attemptId, answers, answeredCount, totalQuestions])

	if (step === "submitted") {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="text-center space-y-6 max-w-md"
				>
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
						<CheckCircle className="w-12 h-12 text-green-600" />
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
							شكراً لمشاركتك!
						</h2>
						<p className="text-slate-600 text-base lg:text-lg">
							تم استلام إجاباتك بنجاح. نتمنى لك التوفيق.
						</p>
					</div>
					<Link
						href="/"
						className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
					>
						<Home className="w-5 h-5" />
						العودة إلى الرئيسية
					</Link>
				</motion.div>
			</div>
		)
	}

	if (!hydrated) return null

	const currentQ = questions[currentQuestion]

	return (
		<div className="min-h-screen pb-32">
			<div className="px-4 pt-8">
				<Breadcrumbs
					links={[
						{ name: "الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "قطوف سجادية",
							url: "/contests/qatuf-sajjadiyya-cultural-competition",
						},
						{ name: "مشاركة", url: "#" },
					]}
				/>
			</div>

			<div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
				{/* Progress */}
				<div className="flex items-center justify-between text-sm text-slate-500">
					<span>
						السؤال {currentQuestion + 1} من {totalQuestions}
					</span>
					<span>
						{answeredCount} / {totalQuestions} مُجاب
					</span>
				</div>

				{/* Navigation Grid */}
				<div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm">
					<p className="text-xs text-slate-500 mb-3 font-medium">
						تنقل بين الأسئلة
					</p>
					<div className="flex flex-wrap gap-2">
						{questions.map((_, i) => (
							<button
								key={i}
								onClick={() => setCurrentQuestion(i)}
								className={cn(
									"w-9 h-9 rounded-lg text-sm font-semibold transition-all border-2",
									i === currentQuestion
										? "border-primary bg-primary text-white shadow-md scale-110"
										: answers[i]
											? "border-green-400 bg-green-50 text-green-700"
											: "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
								)}
							>
								{i + 1}
							</button>
						))}
					</div>
				</div>

				{/* Question Card */}
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-5"
					>
						<h2 className="text-lg lg:text-xl font-bold text-slate-800 leading-relaxed">
							{currentQuestion + 1}. {currentQ.question}
						</h2>

						<div className="space-y-3">
							{Object.entries(currentQ.options).map(
								([key, value]) => (
									<button
										key={key}
										onClick={() => handleAnswerSelect(key)}
										className={cn(
											"w-full p-4 border-2 rounded-xl text-right transition-all",
											selectedAnswer === key
												? "border-primary bg-primary/10 text-primary font-semibold"
												: "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700",
										)}
									>
										{value}
									</button>
								),
							)}
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Navigation Buttons */}
				<div className="flex items-center justify-between gap-3">
					<button
						onClick={handlePrevious}
						disabled={currentQuestion === 0}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold disabled:opacity-40 hover:border-slate-300 hover:bg-slate-50 transition-all"
					>
						<ChevronRight className="w-4 h-4" />
						السابق
					</button>

					{currentQuestion < totalQuestions - 1 ? (
						<button
							onClick={handleNext}
							className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all"
						>
							التالي
							<ChevronLeft className="w-4 h-4" />
						</button>
					) : (
						<div />
					)}
				</div>

				{/* Submit Section */}
				<div className="space-y-3">
					{submitError && (
						<p className="text-red-500 text-sm font-semibold text-center">
							{submitError}
						</p>
					)}
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className={cn(
							"w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2",
							!isSubmitting
								? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
								: "bg-slate-200 text-slate-400 cursor-not-allowed",
						)}
					>
						<Send className="w-5 h-5" />
						{isSubmitting ? "جارٍ الإرسال..." : "إرسال الإجابات"}
					</button>
				</div>
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
