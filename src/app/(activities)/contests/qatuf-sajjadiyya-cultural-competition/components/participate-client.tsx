"use client"

import { useState, useCallback, useEffect, Suspense } from "react"
import { ChevronLeft, ChevronRight, Send, CheckCircle2, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, outlineButton, shieldPanel, solidButton, whiteButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { Panel } from "../../components/contest-ui"
import { STORAGE_KEYS } from "../storage"

type AnswerState = {
	[questionIndex: number]: string
}

export type ContestQuestion = {
	number: string
	question: string
	options: Record<string, string>
}

function ParticipateContent({ questions }: { questions: ContestQuestion[] }) {
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
	}, [attemptId, answers, answeredCount, totalQuestions, questions])

	if (step === "submitted") {
		return (
			<div className="container flex min-h-screen items-center justify-center pb-12 pt-32">
				<Reveal y={24} className="w-full">
					<div
						className={`${shieldPanel} mx-auto flex max-w-xl flex-col items-center gap-5 p-10 text-center md:p-14`}
					>
						<CheckCircle2 className="h-16 w-16 text-secondary dark:text-white" strokeWidth={1.4} />
						<h2 className="text-3xl font-extrabold">شكراً لمشاركتك!</h2>
						<p className="text-xl leading-loose text-white/85">
							تم استلام إجاباتك بنجاح. نتمنى لك التوفيق.
						</p>
						<Link href="/" className={`${whiteButton} mt-2`}>
							<Home className="h-5 w-5" />
							العودة إلى الرئيسية
						</Link>
					</div>
				</Reveal>
			</div>
		)
	}

	if (!hydrated) return null

	const currentQ = questions[currentQuestion]

	return (
		<div className="container pb-12">
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

			<SectionTitle as="h1" title="المشاركة في مسابقة قبسات من حياة الإمام السجاد" className="mb-12" />

			<div className="grid gap-10 lg:grid-cols-[1fr_19rem] lg:items-start lg:gap-14">
				<div className="min-w-0 space-y-8">
					{/* Progress */}
					<div>
						<div className="flex items-center justify-between gap-4 text-base font-semibold text-gray-600 md:text-lg">
							<span>
								السؤال {currentQuestion + 1} من {totalQuestions}
							</span>
							<span>
								{answeredCount} / {totalQuestions} مُجاب
							</span>
						</div>
						<div
							role="progressbar"
							aria-label="الأسئلة المُجابة"
							aria-valuemin={0}
							aria-valuemax={totalQuestions}
							aria-valuenow={answeredCount}
							className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10 dark:bg-Muharram_primary/15"
						>
							<div
								className="h-full rounded-full bg-secondary transition-[width] duration-300 dark:bg-Muharram_secondary"
								style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
							/>
						</div>
					</div>

					{/* Question */}
					<Panel className="p-6 md:p-10">
						<h2 className="text-xl font-extrabold leading-loose text-primary dark:text-Muharram_primary md:text-2xl md:leading-loose">
							<span className="text-secondary_dark dark:text-Muharram_secondary">{currentQuestion + 1}.</span>{" "}
							{currentQ.question}
						</h2>

						<div role="radiogroup" aria-label="الخيارات" className="mt-8 space-y-3">
							{Object.entries(currentQ.options).map(([key, value]) => {
								const selected = selectedAnswer === key
								return (
									<button
										key={key}
										type="button"
										role="radio"
										aria-checked={selected}
										onClick={() => handleAnswerSelect(key)}
										className={cn(
											"flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-right text-lg leading-loose transition-colors md:text-xl md:leading-loose",
											selected
												? "border-primary bg-primary/5 font-semibold text-primary dark:border-Muharram_primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary"
												: "border-primary/20 text-gray-800 hover:border-primary/60 dark:border-Muharram_primary/20 dark:hover:border-Muharram_primary/60",
										)}
									>
										<span
											aria-hidden
											className={cn(
												"flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
												selected
													? "border-primary dark:border-Muharram_primary"
													: "border-secondary/60 dark:border-Muharram_secondary/60",
											)}
										>
											{selected && <span className="h-3 w-3 rounded-full bg-primary dark:bg-Muharram_primary" />}
										</span>
										{value}
									</button>
								)
							})}
						</div>
					</Panel>

					{/* Navigation Buttons */}
					<div className="flex items-center justify-between gap-3">
						<button
							type="button"
							onClick={handlePrevious}
							disabled={currentQuestion === 0}
							className={`${outlineButton} !gap-2 !px-5`}
						>
							<ChevronRight className="h-4 w-4" />
							السابق
						</button>

						{currentQuestion < totalQuestions - 1 ? (
							<button type="button" onClick={handleNext} className={`${outlineButton} !gap-2 !px-5`}>
								التالي
								<ChevronLeft className="h-4 w-4" />
							</button>
						) : (
							<div />
						)}
					</div>

					{/* Submit Section */}
					<div className="space-y-4">
						{submitError && (
							<p role="alert" className="text-center text-lg font-semibold text-red-600">
								{submitError}
							</p>
						)}
						<button
							type="button"
							onClick={handleSubmit}
							disabled={isSubmitting}
							className={`${solidButton} w-full !py-4 text-lg`}
						>
							<Send className="h-5 w-5" />
							{isSubmitting ? "جارٍ الإرسال..." : "إرسال الإجابات"}
						</button>
					</div>
				</div>

				{/* Question navigator */}
				<aside className="lg:sticky lg:top-32">
					<Panel className="p-5">
						<p className="mb-4 font-bold text-primary dark:text-Muharram_primary">تنقل بين الأسئلة</p>
						<div className="grid grid-cols-6 gap-2 sm:grid-cols-10 lg:grid-cols-6">
							{questions.map((_, i) => (
								<button
									key={i}
									type="button"
									onClick={() => setCurrentQuestion(i)}
									aria-label={`السؤال ${i + 1}`}
									aria-current={i === currentQuestion ? "step" : undefined}
									className={cn(
										"aspect-square rounded-lg border-2 text-sm font-semibold transition-colors",
										i === currentQuestion
											? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
											: answers[i]
												? "border-secondary bg-secondary/15 text-secondary_dark dark:border-Muharram_secondary dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary"
												: "border-primary/20 text-gray-600 hover:border-primary/60 dark:border-Muharram_primary/20 dark:hover:border-Muharram_primary/60",
									)}
								>
									{i + 1}
								</button>
							))}
						</div>
					</Panel>
				</aside>
			</div>
		</div>
	)
}

export default function ParticipateClient({
	questions,
}: {
	questions: ContestQuestion[]
}) {
	return (
		<Suspense fallback={<div className="min-h-screen" aria-hidden />}>
			<ParticipateContent questions={questions} />
		</Suspense>
	)
}
