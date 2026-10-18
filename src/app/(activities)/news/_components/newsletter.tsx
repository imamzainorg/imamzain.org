"use client"

import { useState } from "react"
import { MailCheck } from "lucide-react"
import { shieldPanel, whiteButton } from "@/components/brand"
import { isValidEmail, submitErrorMessage } from "@/lib/form-rules"
import { useSingleFlight } from "@/lib/use-single-flight"

// The newsletter sign-up as a green shield. Used on /news and beside every article.
//
// Signing up is double opt-in: the API only e-mails a confirmation link, and it answers the same
// way for a new address, an address already on the list and one that asked a minute ago, so the
// site cannot tell them apart and must not claim "subscribed". After sending, the panel says what
// happens next and offers a way back to the form instead of replacing it for good.
export default function NewsletterSection() {
	const [subscriberEmail, setSubscriberEmail] = useState("")
	const [isSubmitting, runOnce] = useSingleFlight()
	const [sentTo, setSentTo] = useState<string | null>(null)
	const [errorMsg, setErrorMsg] = useState("")

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()

		const address = subscriberEmail.trim()
		if (!isValidEmail(address)) {
			setErrorMsg("يرجى إدخال بريد إلكتروني صالح")
			return
		}
		setErrorMsg("")

		return runOnce(async () => {
			try {
				const response = await fetch("/api/newsletter/subscribe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ subscriberEmail: address }),
				})

				if (response.ok) {
					setSubscriberEmail("")
					setSentTo(address)
					return
				}

				setErrorMsg(submitErrorMessage(response.status, "حدثت مشكلة في اضافة البريد الالكتروني"))
			} catch {
				setErrorMsg("حدث خطأ عند محاولة الاضافة، حاول مرة أخرى")
			}
		})
	}

	return (
		<div className={`${shieldPanel} relative isolate p-8 md:p-10`}>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[40px] bg-[url('/shapes/bg.svg')] bg-[length:320px] opacity-[0.07]"
			/>

			{sentTo ? (
				<div role="status" className="flex flex-col items-center gap-4 py-2 text-center">
					<span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary text-secondary dark:border-white dark:text-white">
						<MailCheck className="h-8 w-8" strokeWidth={1.6} aria-hidden />
					</span>
					<h3 className="text-2xl font-extrabold">تفقّد بريدك الآن</h3>
					<p className="text-lg leading-loose text-white/85">
						أرسلنا رسالة تأكيد إلى
						<span dir="ltr" className="mx-auto mt-2 block w-fit max-w-full break-all rounded-xl bg-white/10 px-4 py-1.5 font-semibold text-white">
							{sentTo}
						</span>
					</p>
					<p className="text-base leading-loose text-white/75">
						افتح الرسالة واضغط على زر التأكيد لإكمال الاشتراك. إن كنت مشتركاً بالفعل فلا حاجة لأي خطوة أخرى. وإن لم تصلك
						الرسالة فتفقّد البريد غير المرغوب، أو حاول مجدداً بعد ١٥ دقيقة.
					</p>
					<button
						type="button"
						onClick={() => setSentTo(null)}
						className="mt-1 rounded-full px-4 py-2 text-base font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
					>
						استخدام بريد آخر
					</button>
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
