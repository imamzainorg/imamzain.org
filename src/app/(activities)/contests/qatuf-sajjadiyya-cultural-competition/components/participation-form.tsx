"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { User, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"

type UserInfo = {
	fullName: string
	contact: string
	contactType: "phone" | "email"
}

export default function ParticipationForm() {
	const [userInfo, setUserInfo] = useState<UserInfo>({
		fullName: "",
		contact: "",
		contactType: "phone",
	})
	const [errorMessage, setErrorMessage] = useState<string>("")

	const isValidEmail = (value: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
	}

	const isValidIraqiPhone = (value: string): boolean => {
		const normalized = value.replace(/\s|-/g, "")
		return /^07[5-9]\d{8}$/.test(normalized)
	}

	const handleStartQuiz = useCallback(() => {
		const validateContact = (value: string): boolean => {
			const input = value.trim()

			if (
				userInfo.contactType === "email"
					? isValidEmail(input)
					: isValidIraqiPhone(input)
			) {
				return true
			}

			setErrorMessage(
				userInfo.contactType === "phone"
					? "يرجى إدخال رقم هاتف عراقي صالح."
					: "يرجى إدخال بريد إلكتروني صالح.",
			)
			return false
		}

		if (
			userInfo.fullName.trim() &&
			validateContact(userInfo.contact.trim())
		) {
			redirect(
				`/contests/qatuf-sajjadiyya-cultural-competition/participate?name=${encodeURIComponent(
					userInfo.fullName.trim(),
				)}&contact=${encodeURIComponent(userInfo.contact.trim())}&contactType=${encodeURIComponent(
					userInfo.contactType,
				)}`,
			)
		}
	}, [userInfo])

	return (
		<div className="min-h-screen px-4 py-8 lg:py-16">
			<div className="max-w-2xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-slate-200/60 p-6 lg:p-10 space-y-6 lg:space-y-8"
				>
					<div className="text-center space-y-3 lg:space-y-4">
						<div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
							<User className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
						</div>
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800">
							معلومات المشارك
						</h2>
						<p className="text-slate-600 text-base lg:text-lg">
							يرجى إدخال معلوماتك للمشاركة في المسابقة
						</p>
					</div>

					<div className="space-y-5 lg:space-y-6">
						{/* Full Name */}
						<div className="space-y-2 lg:space-y-3">
							<label className="text-sm lg:text-base font-semibold text-slate-700 flex items-center gap-2">
								<User className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
								الاسم الكامل
							</label>
							<input
								type="text"
								value={userInfo.fullName}
								onChange={(e) => {
									setErrorMessage("")
									setUserInfo((prev) => ({
										...prev,
										fullName: e.target.value,
									}))
								}}
								className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg border-2 border-slate-200 rounded-xl lg:rounded-2xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
								placeholder="أدخل اسمك الكامل"
								required
							/>
						</div>

						{/* Contact Type Selector */}
						<div className="space-y-2 lg:space-y-3">
							<label className="text-sm lg:text-base font-semibold text-slate-700">
								طريقة التواصل
							</label>
							<div className="grid grid-cols-2 gap-3 lg:gap-4">
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
										"px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg rounded-xl lg:rounded-2xl border-2 font-semibold transition-all flex items-center justify-center gap-2 lg:gap-3",
										userInfo.contactType === "phone"
											? "border-primary bg-primary/10 text-primary shadow-md scale-105"
											: "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
									)}
								>
									<Phone className="w-4 h-4 lg:w-5 lg:h-5" />
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
										"px-4 lg:px-6 py-3 lg:py-4 text-base lg:text-lg rounded-xl lg:rounded-2xl border-2 font-semibold transition-all flex items-center justify-center gap-2 lg:gap-3",
										userInfo.contactType === "email"
											? "border-primary bg-primary/10 text-primary shadow-md scale-105"
											: "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
									)}
								>
									<Mail className="w-4 h-4 lg:w-5 lg:h-5" />
									البريد الإلكتروني
								</button>
							</div>
						</div>

						{/* Contact Input */}
						<div className="space-y-2 lg:space-y-3">
							<label className="text-sm lg:text-base font-semibold text-slate-700 flex items-center gap-2">
								{userInfo.contactType === "phone" ? (
									<Phone className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
								) : (
									<Mail className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
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
								onChange={(e) => {
									setErrorMessage("")
									setUserInfo((prev) => ({
										...prev,
										contact: e.target.value,
									}))
								}}
								className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg border-2 border-slate-200 rounded-xl lg:rounded-2xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
								placeholder={
									userInfo.contactType === "phone"
										? "07XXXXXXXXX"
										: "example@email.com"
								}
								required
							/>
						</div>
					</div>
					{errorMessage && (
						<p className="text-red-500 text-sm lg:text-base mt-2 ">
							{errorMessage}
						</p>
					)}

					<button
						onClick={handleStartQuiz}
						disabled={
							!userInfo.fullName.trim() ||
							!userInfo.contact.trim()
						}
						className={cn(
							"w-full py-4 lg:py-5 rounded-xl lg:rounded-2xl font-bold text-lg lg:text-xl transition-all shadow-lg",
							userInfo.fullName.trim() && userInfo.contact.trim()
								? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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
