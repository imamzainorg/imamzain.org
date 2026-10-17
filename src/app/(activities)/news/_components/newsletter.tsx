"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CheckCircle2 } from "lucide-react"
import { shieldPanel, whiteButton } from "@/components/brand"

// The newsletter sign-up as a green shield. Used on /news and beside every article.
export default function NewsletterSection() {
	const [subscriberEmail, setSubscriberEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [sent, setSent] = useState(false)
	const [errorMsg, setErrorMsg] = useState("")

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		setIsSubmitting(true)
		setErrorMsg("")

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ subscriberEmail }),
			})

			const data = await response.json().catch(() => ({}))

			if (response.ok) {
				toast("شكراً لاشتراكك في صحيفتنا الاخبارية", {
					description: subscriberEmail,
				})

				setSubscriberEmail("")
				setSent(true)
				return
			}

			setErrorMsg(data?.message || "حدثت مشكلة في اضافة البريد الالكتروني")
		} catch {
			setErrorMsg("حدث خطأ عند محاولة الاضافة، حاول مرة أخرى")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className={`${shieldPanel} relative isolate p-8 md:p-10`}>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px] bg-[url('/shapes/bg.svg')] bg-[length:320px] opacity-[0.07]"
			/>

			{sent ? (
				<div className="flex flex-col items-center gap-5 py-6 text-center">
					<CheckCircle2 className="h-16 w-16 text-secondary dark:text-white" />
					<p className="text-xl font-bold leading-loose">تم الاشتراك بنجاح في النشرة البريدية</p>
				</div>
			) : (
				<>
					<h3 className="text-2xl font-extrabold md:text-3xl">اشترك في النشرة البريدية</h3>
					<p className="mt-3 text-lg leading-loose text-white/80">
						النشرة البريدية الخاصة بالإعلانات والنشاطات
					</p>
					<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
						<label htmlFor="newsletter-email" className="sr-only">
							البريد الالكتروني
						</label>
						<input
							id="newsletter-email"
							type="email"
							value={subscriberEmail}
							onChange={(e) => setSubscriberEmail(e.target.value)}
							disabled={isSubmitting}
							required
							placeholder="البريد الالكتروني"
							className="w-full rounded-xl border-2 border-white/30 bg-white/10 px-4 py-3 text-lg text-white placeholder:text-white/60 focus:border-white focus:outline-none disabled:opacity-60"
						/>
						<button type="submit" disabled={isSubmitting} className={`${whiteButton} w-full`}>
							{isSubmitting ? "جاري الاشتراك..." : "اشترك الان"}
						</button>
						{errorMsg && (
							<p role="alert" className="text-center text-sm font-semibold text-red-200">
								{errorMsg}
							</p>
						)}
					</form>
				</>
			)}
		</div>
	)
}
