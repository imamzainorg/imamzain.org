"use client"
import { useState } from "react"
import { toast } from "sonner"

const Newsletter = () => {
	const [subscriberEmail, setSubscriberEmail] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsSubmitting(true)

		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ subscriberEmail }),
			})

			const data = await response.json().catch(() => ({}))

			if (response.ok) {
				toast("شكراً لاشتراكك في صحيفتنا الاخبارية", {
					description: subscriberEmail,
				})
				setSubscriberEmail("")
			} else {
				const errorMessage =
					data?.message || "حدثت مشكلة في اضافة البريد الالكتروني"
				toast("ادخل بريد الكتروني صحيح", {
					description: errorMessage,
				})
			}
		} catch (error) {
			console.error("Newsletter subscription error:", error)
			toast("حدث خطأ عند الاضافة", {
				description: "نرجو المحاولة مرة اخرى",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col gap-4 mt-8 sm:space-y-1"
		>
			<input
				type="email"
				id="subscriberEmail"
				name="subscriberEmail"
				value={subscriberEmail}
				className="rounded-md w-4/6 sm:w-5/6 mx-auto text-xs md:text-sm px-4 py-2 text-black text-center"
				placeholder="البريد الالكتروني"
				onChange={(e) => setSubscriberEmail(e.target.value)}
				disabled={isSubmitting}
				required
			/>
			<button
				type="submit"
				disabled={isSubmitting}
				className="bg-secondary hover:bg-secondary/80 dark:bg-Muharram_secondary dark:hover:bg-Muharram_secondary/80 px-4 py-1 xl:px-8 xl:py-2 w-fit mx-auto rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? "جاري الاشتراك..." : "اشترك الان"}
			</button>
		</form>
	)
}

export default Newsletter
