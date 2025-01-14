"use client"
import { useState } from "react"
import { toast } from "sonner"

const SubscriptionForm = () => {
	const [email, setEmail] = useState("")

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		try {
			const response = await fetch(
				"https://api.imamzain.org/newsletter_subscribe",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				},
			)

			if (response.ok) {
				toast("شكراً لاشتراكك في صحيفتنا الاخبارية", {
					description: email,
				})
			} else {
				toast("ادخل بريد الكتروني صحيح", {
					description: "حدثت مشكلة في اضافة البريد الالكتروني",
				})
			}
		} catch (error) {
			console.error(error)
			toast("حدث خطأ عند الاضافة", {
				description: "نرجو المحاولة مرة اخرى",
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col gap-4 mt-8 sm:space-y-5"
		>
			<input
				type="email"
				id="email"
				name="email"
				value={email}
				className="rounded-md w-3/4 min-[420px]:w-2/4 md:w-1/2 lg:w-	/4 mx-auto text-xs md:text-xl px-4 py-2 text-black"
				placeholder="البريد الالكتروني"
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<button
				type="submit"
				className="bg-secondary px-4 py-1 md:px-8 md:py-2 w-fit mx-auto rounded-md text-sm md:text-xl"
			>
				اشترك الان
			</button>
		</form>
	)
}

export default SubscriptionForm
