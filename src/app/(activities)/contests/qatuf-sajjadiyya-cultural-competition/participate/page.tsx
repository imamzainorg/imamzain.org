"use client"

import { useState, useCallback, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Breadcrumbs from "@/components/breadcrumb"
import { ChevronLeft, ChevronRight, Send, CheckCircle } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { questions } from "../data/questions"
import { useSearchParams } from "next/navigation"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type AnswerState = {
	[questionIndex: number]: string
}

function ParticipateContent() {
	const [step, setStep] = useState<"questions" | "submitted">("questions")

	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState<AnswerState>({})

	const params = useSearchParams()
	const name = params.get("name")
	const contactType = params.get("contactType")
	const contact =
		contactType === "phone" ? params.get("phone") : params.get("email")

	const totalQuestions = questions.length
	const answeredCount = Object.keys(answers).length

	const handleAnswerSelect = useCallback(
		(optionKey: string) => {
			setAnswers((prev) => ({ ...prev, [currentQuestion]: optionKey }))
		},
		[currentQuestion],
	)

	const handleNext = useCallback(() => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1)
		}
	}, [currentQuestion, totalQuestions])

	const handlePrevious = useCallback(() => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1)
		}
	}, [currentQuestion])

	const handleQuestionJump = useCallback((index: number) => {
		setCurrentQuestion(index)
	}, [])

	const handleSubmit = useCallback(async () => {
		if (answeredCount === totalQuestions) {
			await fetch("/api/contests/qatuf-sajjadiyya/submit", {
				method: "POST",
				body: JSON.stringify({
					name: name,
					email: contactType === "email" ? contact : null,
					phone: contactType === "phone" ? contact : null,
					startedAt: new Date().toISOString(),
					answers: answers,
				}),
			})

			setStep("submitted")
		}
	}, [answeredCount, totalQuestions, answers, contact, contactType, name])

	// Success Submission
	if (step === "submitted") {
		return (
			<div className="min-h-screen px-4 py-8 lg:py-16 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-slate-200/60 p-8 lg:p-12 text-center space-y-6 lg:space-y-8"
				>
					<div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
						<CheckCircle className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
					</div>
					<div className="space-y-3 lg:space-y-4">
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800">
							تم إرسال إجاباتك بنجاح!
						</h2>
						<p className="text-slate-600 text-base lg:text-lg leading-relaxed max-w-xl mx-auto">
							شكراً لمشاركتك في المسابقة. سيتم الإعلان عن النتائج
							قريباً عبر المنصات الرسمية للمؤسسة.
						</p>
					</div>
				</motion.div>
			</div>
		)
	}

	const currentQ = questions[currentQuestion]
	const selectedAnswer = answers[currentQuestion]
	const allAnswered = answeredCount === totalQuestions

	return (
		<div className="min-h-screen pb-24 lg:pb-32">
			<div className="px-4 sm:px-6 lg:px-8 pt-8">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "مسابقة قبسات من حياة الإمام السجاد (عليه السلام)",
							url: "/contests/qatuf-sajjadiyya-cultural-competition",
						},
						{
							name: "مشاركة",
							url: "#",
						},
					]}
				/>
			</div>
			{/* Question Content */}
			<div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className="space-y-6 lg:space-y-8"
					>
						{/* Question Card */}
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200/60 p-5 lg:p-8">
							<div className="flex items-start gap-3 lg:gap-5">
								<span className="flex-shrink-0 w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-xl lg:rounded-2xl flex items-center justify-center font-bold text-lg lg:text-2xl shadow-md">
									{currentQ.number}
								</span>
								<h2 className="text-lg lg:text-2xl xl:text-3xl font-bold text-slate-800 pt-1 lg:pt-2 flex-1 leading-relaxed">
									{currentQ.question}
								</h2>
							</div>
						</div>
						<div className="w-full flex flex-col lg:flex-row gap-4">
							{/* Options */}
							<div className="lg:w-3/4 space-y-3 lg:space-y-4">
								{Object.entries(currentQ.options).map(
									([key, value]) => {
										const isSelected =
											selectedAnswer === key

										return (
											<button
												key={key}
												onClick={() =>
													handleAnswerSelect(key)
												}
												className={cn(
													"w-full text-right p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 transition-all flex items-start gap-3 lg:gap-4 bg-white/80 backdrop-blur-sm hover:shadow-lg",
													isSelected
														? "border-primary bg-primary/10 shadow-xl scale-[1.02]"
														: "border-slate-200 hover:border-slate-300 active:scale-[0.98]",
												)}
											>
												<span
													className={cn(
														"flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center font-bold text-base lg:text-lg transition-all shadow-sm",
														isSelected
															? "bg-primary text-white scale-110"
															: "bg-slate-100 text-slate-600",
													)}
												>
													{key}
												</span>
												<span className="text-slate-700 text-base lg:text-xl pt-0.5 lg:pt-1 flex-1 leading-relaxed">
													{value}
												</span>
											</button>
										)
									},
								)}
							</div>
							{/* Question Navigator Grid */}
							<div className="lg:w-1/4 bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200/60 p-5 lg:p-8">
								<p className="text-xs lg:text-sm text-slate-500 mb-4 lg:mb-5 text-center font-semibold">
									الانتقال السريع للأسئلة
								</p>
								<div className="grid grid-cols-10 lg:grid-cols-5 gap-2 lg:gap-3">
									{questions.map((q, index) => {
										const isAnswered =
											answers[index] !== undefined
										const isCurrent =
											index === currentQuestion

										return (
											<button
												key={index}
												onClick={() =>
													handleQuestionJump(index)
												}
												className={cn(
													"aspect-square rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold transition-all shadow-sm",
													isCurrent &&
														"bg-primary text-white ring-2 lg:ring-4 ring-primary/30 scale-110 shadow-lg",
													!isCurrent &&
														isAnswered &&
														"bg-primary/80 text-white hover:bg-primary/20",
													!isCurrent &&
														!isAnswered &&
														"bg-slate-100 text-slate-400 hover:bg-slate-200",
												)}
											>
												{q.number}
											</button>
										)
									})}
								</div>
							</div>
						</div>
						{/* Bottom Navigation */}
						<div className="max-w-5xl mx-auto px-4 lg:px-8 py-3 lg:py-5">
							{allAnswered ? (
								<button
									onClick={handleSubmit}
									className="w-full py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 lg:gap-3"
								>
									<Send className="w-5 h-5 lg:w-6 lg:h-6" />
									إرسال الإجابات
								</button>
							) : (
								<div className="flex items-center gap-3 lg:gap-4">
									<button
										onClick={handlePrevious}
										disabled={currentQuestion === 0}
										className={cn(
											"px-4 lg:px-6 py-4 lg:py-5 rounded-xl lg:rounded-2xl font-semibold transition-all flex-shrink-0 shadow-md",
											currentQuestion === 0
												? "bg-slate-100 text-slate-400 cursor-not-allowed"
												: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95",
										)}
									>
										<ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
									</button>
									<button
										onClick={handleNext}
										disabled={
											currentQuestion ===
											totalQuestions - 1
										}
										className={cn(
											"flex-1 py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl transition-all flex items-center justify-center gap-2 lg:gap-3 shadow-lg",
											currentQuestion ===
												totalQuestions - 1
												? "bg-slate-100 text-slate-400 cursor-not-allowed"
												: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl active:scale-[0.98]",
										)}
									>
										السؤال التالي
										<ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
									</button>
								</div>
							)}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

export default function Page() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					جاري التحميل...
				</div>
			}
		>
			<ParticipateContent />
		</Suspense>
	)
}
