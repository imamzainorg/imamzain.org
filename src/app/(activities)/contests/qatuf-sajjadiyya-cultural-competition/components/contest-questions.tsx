"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	ChevronLeft,
	ChevronRight,
	Send,
	User,
	Phone,
	Mail,
	CheckCircle,
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import confetti from "canvas-confetti"
import { questions } from "../data/questions"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type AnswerState = {
	[questionIndex: number]: string
}

type UserInfo = {
	fullName: string
	contact: string
	contactType: "phone" | "email"
}

export default function ContestQuestions() {
	const [step, setStep] = useState<"info" | "questions" | "submitted">("info")
	const [userInfo, setUserInfo] = useState<UserInfo>({
		fullName: "",
		contact: "",
		contactType: "phone",
	})
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState<AnswerState>({})

	const totalQuestions = questions.length
	const progress = ((currentQuestion + 1) / totalQuestions) * 100
	const answeredCount = Object.keys(answers).length

	const handleStartQuiz = useCallback(() => {
		if (userInfo.fullName.trim() && userInfo.contact.trim()) {
			setStep("questions")
		}
	}, [userInfo])

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

	const handleSubmit = useCallback(() => {
		if (answeredCount === totalQuestions) {
			// Here you would send the data to your backend
			console.log({
				userInfo,
				answers,
			})
			setStep("submitted")
			confetti({
				particleCount: 150,
				spread: 70,
				origin: { y: 0.6 },
				colors: ["#059669", "#10b981", "#34d399"],
			})
		}
	}, [answeredCount, totalQuestions, userInfo, answers])

	// User Info Form
	if (step === "info") {
		return (
			<div className="min-h-screen to-white px-4 py-8">
				<div className="max-w-md mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6"
					>
						<div className="text-center space-y-2">
							<h2 className="text-2xl font-bold text-slate-800">
								معلومات المشارك
							</h2>
							<p className="text-slate-600 text-sm">
								يرجى إدخال معلوماتك للمشاركة في المسابقة
							</p>
						</div>

						<div className="space-y-4">
							{/* Full Name */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700 flex items-center gap-2">
									<User className="w-4 h-4" />
									الاسم الكامل
								</label>
								<input
									type="text"
									value={userInfo.fullName}
									onChange={(e) =>
										setUserInfo((prev) => ({
											...prev,
											fullName: e.target.value,
										}))
									}
									className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
									placeholder="أدخل اسمك الكامل"
									required
								/>
							</div>

							{/* Contact Type Selector */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700">
									طريقة التواصل
								</label>
								<div className="grid grid-cols-2 gap-2">
									<button
										type="button"
										onClick={() =>
											setUserInfo((prev) => ({
												...prev,
												contactType: "phone",
												contact: "",
											}))
										}
										className={cn(
											"px-4 py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
											userInfo.contactType === "phone"
												? "border-primary bg-primary/5 text-primary"
												: "border-slate-200 text-slate-600 hover:border-slate-300",
										)}
									>
										<Phone className="w-4 h-4" />
										رقم الهاتف
									</button>
									<button
										type="button"
										onClick={() =>
											setUserInfo((prev) => ({
												...prev,
												contactType: "email",
												contact: "",
											}))
										}
										className={cn(
											"px-4 py-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
											userInfo.contactType === "email"
												? "border-primary bg-primary/5 text-primary"
												: "border-slate-200 text-slate-600 hover:border-slate-300",
										)}
									>
										<Mail className="w-4 h-4" />
										البريد الإلكتروني
									</button>
								</div>
							</div>

							{/* Contact Input */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-slate-700 flex items-center gap-2">
									{userInfo.contactType === "phone" ? (
										<Phone className="w-4 h-4" />
									) : (
										<Mail className="w-4 h-4" />
									)}
									{userInfo.contactType === "phone"
										? "رقم الهاتف"
										: "البريد الإلكتروني"}
								</label>
								<input
									type={
										userInfo.contactType === "phone"
											? "tel"
											: "email"
									}
									value={userInfo.contact}
									onChange={(e) =>
										setUserInfo((prev) => ({
											...prev,
											contact: e.target.value,
										}))
									}
									className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
									placeholder={
										userInfo.contactType === "phone"
											? "07XXXXXXXXX"
											: "example@email.com"
									}
									required
								/>
							</div>
						</div>

						<button
							onClick={handleStartQuiz}
							disabled={
								!userInfo.fullName.trim() ||
								!userInfo.contact.trim()
							}
							className={cn(
								"w-full py-4 rounded-xl font-bold text-lg transition-all",
								userInfo.fullName.trim() &&
									userInfo.contact.trim()
									? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
									: "bg-slate-200 text-slate-400 cursor-not-allowed",
							)}
						>
							ابدأ المسابقة
						</button>
					</motion.div>
				</div>
			</div>
		)
	}

	// Success Submission
	if (step === "submitted") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white px-4 py-8 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center space-y-6"
				>
					<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
						<CheckCircle className="w-12 h-12 text-emerald-600" />
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-slate-800">
							تم إرسال إجاباتك بنجاح!
						</h2>
						<p className="text-slate-600">
							شكراً لمشاركتك في المسابقة. سيتم الإعلان عن النتائج
							قريباً عبر المنصات الرسمية للمؤسسة.
						</p>
					</div>
					<div className="bg-slate-50 rounded-xl p-4 space-y-1">
						<p className="text-sm text-slate-600">
							عدد الأسئلة المجاب عليها
						</p>
						<p className="text-3xl font-bold text-primary">
							{answeredCount} / {totalQuestions}
						</p>
					</div>
				</motion.div>
			</div>
		)
	}

	// Questions Section
	const currentQ = questions[currentQuestion]
	const selectedAnswer = answers[currentQuestion]
	const allAnswered = answeredCount === totalQuestions

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			{/* Mobile-First Header */}
			<div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
				<div className="px-4 py-4">
					<div className="space-y-3">
						{/* Progress Bar */}
						<div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
							<motion.div
								className="absolute inset-y-0 right-0 bg-gradient-to-l from-primary to-secondary rounded-full"
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{
									duration: 0.3,
									ease: "easeOut",
								}}
							/>
						</div>
						{/* Question Counter */}
						<div className="flex items-center justify-between text-sm">
							<span className="text-slate-600">
								السؤال {currentQuestion + 1} من {totalQuestions}
							</span>
							<span className="text-primary font-medium">
								{answeredCount} إجابة
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Question Content */}
			<div className="px-4 py-6 pb-24">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className="space-y-6"
					>
						{/* Question */}
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
							<div className="flex items-start gap-3">
								<span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold">
									{currentQ.number}
								</span>
								<h2 className="text-lg font-semibold text-slate-800 pt-1 flex-1">
									{currentQ.question}
								</h2>
							</div>
						</div>

						{/* Options */}
						<div className="space-y-3">
							{Object.entries(currentQ.options).map(
								([key, value]) => {
									const isSelected = selectedAnswer === key

									return (
										<button
											key={key}
											onClick={() =>
												handleAnswerSelect(key)
											}
											className={cn(
												"w-full text-right p-4 rounded-xl border-2 transition-all flex items-start gap-3 bg-white",
												isSelected
													? "border-primary bg-primary/5 shadow-md"
													: "border-slate-200 active:scale-[0.98]",
											)}
										>
											<span
												className={cn(
													"flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors",
													isSelected
														? "bg-primary text-white"
														: "bg-slate-100 text-slate-600",
												)}
											>
												{key}
											</span>
											<span className="text-slate-700 pt-0.5 flex-1">
												{value}
											</span>
										</button>
									)
								},
							)}
						</div>

						{/* Question Navigator Grid */}
						<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
							<p className="text-xs text-slate-500 mb-3 text-center font-medium">
								الانتقال السريع للأسئلة
							</p>
							<div className="grid grid-cols-10 gap-2">
								{questions.map((q, index) => {
									const isAnswered =
										answers[index] !== undefined
									const isCurrent = index === currentQuestion

									return (
										<button
											key={index}
											onClick={() =>
												handleQuestionJump(index)
											}
											className={cn(
												"aspect-square rounded-lg text-xs font-semibold transition-all",
												isCurrent &&
													"bg-primary text-white ring-2 ring-primary/30 scale-110",
												!isCurrent &&
													isAnswered &&
													"bg-primary/10 text-primary",
												!isCurrent &&
													!isAnswered &&
													"bg-slate-100 text-slate-400",
											)}
										>
											{q.number}
										</button>
									)
								})}
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Fixed Bottom Navigation */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
				<div className="px-4 py-3">
					{allAnswered ? (
						<button
							onClick={handleSubmit}
							className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
						>
							<Send className="w-5 h-5" />
							إرسال الإجابات
						</button>
					) : (
						<div className="flex items-center gap-2">
							<button
								onClick={handlePrevious}
								disabled={currentQuestion === 0}
								className={cn(
									"px-4 py-4 rounded-xl font-medium transition-all flex-shrink-0",
									currentQuestion === 0
										? "bg-slate-100 text-slate-400"
										: "bg-slate-100 text-slate-700 active:scale-95",
								)}
							>
								<ChevronRight className="w-5 h-5" />
							</button>
							<button
								onClick={handleNext}
								disabled={
									currentQuestion === totalQuestions - 1
								}
								className={cn(
									"flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
									currentQuestion === totalQuestions - 1
										? "bg-slate-100 text-slate-400"
										: "bg-gradient-to-r from-primary to-secondary text-white active:scale-[0.98]",
								)}
							>
								السؤال التالي
								<ChevronLeft className="w-5 h-5" />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
