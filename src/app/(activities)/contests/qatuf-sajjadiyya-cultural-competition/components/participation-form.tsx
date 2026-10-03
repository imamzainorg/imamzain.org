"use client"

import { useCallback, useId, useState } from "react"
import { User, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { shieldPanel, whiteButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { participateHref } from "../storage"

// White fields on the green shield, as on the contact form.
const field =
	"w-full rounded-xl bg-white px-4 py-3 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-Muharram_secondary"

const labelClass = "flex items-center gap-2 font-semibold"

const typeButton = (active: boolean) =>
	cn(
		"flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 text-lg font-semibold transition-colors",
		active
			? "border-white bg-white text-primary dark:text-Muharram_primary"
			: "border-white/40 text-white hover:border-white",
	)

type UserInfo = {
	name: string
	contact: string
	contactType: "phone" | "email"
}

export default function ParticipationForm() {
	const router = useRouter()
	const nameId = useId()
	const contactId = useId()
	const [userInfo, setUserInfo] = useState<UserInfo>({
		name: "",
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

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleStartQuiz = useCallback(async () => {
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
			!userInfo.name.trim() ||
			!validateContact(userInfo.contact.trim())
		) {
			return
		}

		setIsSubmitting(true)
		setErrorMessage("")

		try {
			const response = await fetch(
				"/api/contests/qatuf-sajjadiyya/start",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: userInfo.name.trim(),
						contact: userInfo.contact.trim(),
						contactType: userInfo.contactType,
					}),
				},
			)

			const data = await response.json()

			if (!response.ok) {
				setErrorMessage(
					data.error || "حدث خطأ، يرجى المحاولة مجدداً.",
				)
				return
			}

			router.push(participateHref(data.data.attempt_id))
		} catch {
			setErrorMessage("حدث خطأ في الاتصال، يرجى المحاولة مجدداً.")
		} finally {
			setIsSubmitting(false)
		}
	}, [userInfo, router])

	const canStart = Boolean(userInfo.name.trim() && userInfo.contact.trim()) && !isSubmitting

	return (
		<div className="container py-8 lg:py-16">
			<Reveal y={24}>
				<div className={`${shieldPanel} mx-auto max-w-2xl space-y-8 p-8 md:p-12`}>
					<div className="space-y-3 text-center">
						<span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary text-secondary dark:border-white/60 dark:text-white">
							<User className="h-8 w-8" strokeWidth={1.5} aria-hidden />
						</span>
						<h2 className="text-2xl font-extrabold md:text-3xl">معلومات المشارك</h2>
						<p className="text-lg text-white/80">يرجى إدخال معلوماتك للمشاركة في المسابقة</p>
					</div>

					<div className="space-y-6">
						{/* Full Name */}
						<div className="space-y-2">
							<label htmlFor={nameId} className={labelClass}>
								<User className="h-5 w-5 text-secondary dark:text-white" />
								الاسم الكامل
							</label>
							<input
								id={nameId}
								type="text"
								value={userInfo.name}
								onChange={(e) => {
									setErrorMessage("")
									setUserInfo((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}}
								className={field}
								placeholder="أدخل اسمك الكامل"
								required
							/>
						</div>

						{/* Contact Type Selector */}
						<div className="space-y-2">
							<p className="font-semibold">طريقة التواصل</p>
							<div className="grid grid-cols-2 gap-3">
								<button
									type="button"
									aria-pressed={userInfo.contactType === "phone"}
									onClick={() =>
										setUserInfo((prev) => ({
											...prev,
											contactType: "phone",
											contact: "",
										}))
									}
									className={typeButton(userInfo.contactType === "phone")}
								>
									<Phone className="h-5 w-5" />
									رقم الهاتف
								</button>
								<button
									type="button"
									aria-pressed={userInfo.contactType === "email"}
									onClick={() =>
										setUserInfo((prev) => ({
											...prev,
											contactType: "email",
											contact: "",
										}))
									}
									className={typeButton(userInfo.contactType === "email")}
								>
									<Mail className="h-5 w-5" />
									البريد الإلكتروني
								</button>
							</div>
						</div>

						{/* Contact Input */}
						<div className="space-y-2">
							<label htmlFor={contactId} className={labelClass}>
								{userInfo.contactType === "phone" ? (
									<Phone className="h-5 w-5 text-secondary dark:text-white" />
								) : (
									<Mail className="h-5 w-5 text-secondary dark:text-white" />
								)}
								{userInfo.contactType === "phone" ? "رقم الهاتف" : "البريد الإلكتروني"}
							</label>
							<input
								id={contactId}
								type={userInfo.contactType === "phone" ? "tel" : "email"}
								value={userInfo.contact}
								onChange={(e) => {
									setErrorMessage("")
									setUserInfo((prev) => ({
										...prev,
										contact: e.target.value,
									}))
								}}
								className={field}
								placeholder={userInfo.contactType === "phone" ? "07XXXXXXXXX" : "example@email.com"}
								required
							/>
						</div>
					</div>

					{errorMessage && (
						<p role="alert" className="font-semibold text-red-200">
							{errorMessage}
						</p>
					)}

					<button
						type="button"
						onClick={handleStartQuiz}
						disabled={!canStart}
						className={`${whiteButton} w-full !py-4 text-xl`}
					>
						{isSubmitting ? "جارٍ التحقق..." : "ابدأ المسابقة"}
					</button>
				</div>
			</Reveal>
		</div>
	)
}
