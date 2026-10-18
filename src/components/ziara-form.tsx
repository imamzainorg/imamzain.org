"use client"

import { PersonIcon } from "@/assets/icons/reusable"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Input } from "@heroui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { submitErrorMessage } from "@/lib/form-rules"
import { useSingleFlight } from "@/lib/use-single-flight"
import PhoneInput from "./phone-input"
import {
	DEFAULT_COUNTRY,
	exampleNational,
	formatNational,
	latinDigits,
	splitInternational,
	toE164,
	type CountryCode,
} from "@/lib/phone"


type Errors = { name?: string; phone?: string; form?: string }

// White fields, so they read clearly on the green shield.
const inputClassNames = {
	inputWrapper:
		"h-14 rounded-xl bg-white shadow-none data-[hover=true]:bg-white group-data-[focus=true]:bg-white",
	input: "border-none text-lg text-gray-900 placeholder:text-gray-500 focus:ring-0",
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
	return (
		<p className="mb-1.5 text-base font-bold text-white">
			{children}
			{required && (
				<span aria-hidden className="mr-1 text-secondary">
					*
				</span>
			)}
		</p>
	)
}

function FieldError({ children }: { children?: string }) {
	if (!children) return null
	return (
		<p role="alert" className="mt-1.5 text-sm font-semibold text-red-200">
			{children}
		</p>
	)
}

const ZiaraForm = () => {
	const [sent, setSent] = useState<boolean>(false)
	const [sending, runOnce] = useSingleFlight()
	const [errors, setErrors] = useState<Errors>({})
	const [formData, setFormData] = useState({
		visitorName: "",
		visitorPhone: "",
		visitorCountry: DEFAULT_COUNTRY as CountryCode,
	})

	// The number is typed without its code: the country supplies it. A number typed or pasted
	// with +964... or 00964... switches the country and drops the prefix.
	const changePhone = (text: string) => {
		const detected = splitInternational(text, formData.visitorCountry)
		if (detected) {
			setFormData({ ...formData, visitorCountry: detected.country, visitorPhone: detected.national })
		} else {
			setFormData({ ...formData, visitorPhone: latinDigits(text) })
		}
	}

	const validate = () => {
		const next: Errors = {}

		if (!formData.visitorName.trim()) {
			next.name = "الرجاء إدخال اسم الزائر"
		}

		if (!formData.visitorPhone) {
			next.phone = "الرجاء إدخال رقم الهاتف"
		} else if (!toE164(formData.visitorPhone, formData.visitorCountry)) {
			const example = exampleNational(formData.visitorCountry)
			next.phone = `الرقم غير صحيح لهذه الدولة${example ? `، مثال: ${example}` : ""}`
		}

		setErrors(next)
		return Object.keys(next).length === 0
	}

	const handleSubmit = () => {
		if (!validate()) return

		return runOnce(async () => {
			try {
				const response = await fetch("/api/proxy-visit", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						visitorName: formData.visitorName.trim(),
						visitorPhone: toE164(formData.visitorPhone, formData.visitorCountry),
						visitorCountry: formData.visitorCountry,
					}),
				})

				if (response.ok) {
					setSent(true)
				} else {
					setErrors({ form: submitErrorMessage(response.status, "فشل في إرسال الطلب") })
				}
			} catch {
				setErrors({ form: "تعذر الاتصال بالخادم، تحقق من الاتصال وحاول مرة أخرى" })
			}
		})
	}

	if (sent) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
				role="status"
				className="flex flex-col items-center gap-4 py-10 text-center text-white"
			>
				<CheckCircle2 className="h-20 w-20 text-secondary" strokeWidth={1.4} />
				<p className="text-2xl font-extrabold">تم ادراج اسمك في قائمة الزائرين</p>
				<p className="leading-8 text-white/80">سيتم أداء الزيارة نيابةً عنك بإذن الله.</p>
			</motion.div>
		)
	}

	return (
		<div className="z-20 flex w-full flex-col gap-4 text-right">
			<div className="text-center">
				<h2 className="text-2xl font-extrabold text-white md:text-3xl">سجّل اسمك الآن</h2>
				<p className="mt-1 text-sm text-white/75">ثلاث خطوات سريعة، والحقول المعلّمة بنجمة مطلوبة</p>
			</div>

			<div>
				<Label required>الزيارة نيابة عن</Label>
				<Input
					size="lg"
					aria-label="الزيارة نيابة عن"
					name="visitorName"
					placeholder="اكتب الاسم الذي تُؤدّى عنه الزيارة"
					value={formData.visitorName}
					onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
					classNames={inputClassNames}
					isInvalid={Boolean(errors.name)}
					startContent={
						<>
							<PersonIcon stroke="#bb9661" fill="#bb9661" strokeWidth={0.1} className="dark:hidden" />
							<PersonIcon stroke="#a43232" fill="#a43232" strokeWidth={0.1} className="hidden dark:block" />
						</>
					}
					type="text"
				/>
				<FieldError>{errors.name}</FieldError>
			</div>

			<div>
				<Label required>رقم الهاتف</Label>
				<PhoneInput
					country={formData.visitorCountry}
					onCountryChange={(visitorCountry) => setFormData({ ...formData, visitorCountry })}
					value={formData.visitorPhone}
					onValueChange={changePhone}
					onBlur={() => {
						if (formData.visitorPhone && toE164(formData.visitorPhone, formData.visitorCountry)) {
							setFormData({ ...formData, visitorPhone: formatNational(formData.visitorPhone, formData.visitorCountry) })
						}
					}}
					placeholder={exampleNational(formData.visitorCountry)}
					invalid={Boolean(errors.phone)}
				/>
				<FieldError>{errors.phone}</FieldError>
			</div>

			{errors.form && (
				<p role="alert" className="text-center font-semibold text-red-200">
					{errors.form}
				</p>
			)}

			<button
				type="button"
				onClick={handleSubmit}
				disabled={sending}
				className="mt-1 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-secondary text-xl font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.99] disabled:opacity-70 dark:bg-Muharram_secondary"
			>
				{sending ? (
					<>
						<Loader2 className="h-5 w-5 animate-spin" />
						جارٍ التسجيل...
					</>
				) : (
					"سجّل اسمي"
				)}
			</button>
		</div>
	)
}

export default ZiaraForm
