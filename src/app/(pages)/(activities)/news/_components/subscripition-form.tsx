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
			className="w-full flex flex-col gap-4 mt-8 sm:space-y-1"
		>
			<input
				type="email"
				id="email"
				name="email"
				value={email}
				className="rounded-md w-4/6 sm:w-5/6 mx-auto text-xs md:text-sm px-4 py-2 text-black"
				placeholder="البريد الالكتروني"
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<button
				type="submit"
				className="bg-secondary hover:bg-secondary/80 dark:bg-Muharram_secondary dark:hover:bg-Muharram_secondary/80 px-4 py-1 xl:px-8 xl:py-2 w-fit mx-auto rounded-md text-sm"
			>
				اشترك الان
			</button>
		</form>
	)
}

export default SubscriptionForm
