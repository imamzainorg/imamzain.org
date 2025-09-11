"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Button, Input } from "@heroui/react"
import { MailOpen } from "lucide-react"
import MessageIcon, { PersonIcon } from "@/assets/icons/reusable"
import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import CountriesDropdown from "@/components/countries-input"

interface FormData {
	name: string
	email: string
	country: string
	message: string
}

export default function Page() {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		country: "",
		message: "",
	})
	const [error, setError] = useState<string>("")
	const [submitted, setSubmitted] = useState<boolean>(false)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev: FormData) => ({ ...prev, [name]: value }))
	}

	const isValidEmail = (email: string): boolean => {
		return /\S+@\S+\.\S+/.test(email)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setError("")

		if (!isValidEmail(formData.email)) {
			setError("يرجى إدخال بريد إلكتروني صالح")
			return
		}

		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...formData,
				recipient: "info@imamzain.org",
			}),
		})

		if (response.ok) {
			setSubmitted(true)
		} else {
			setError("حدث خطأ أثناء إرسال الرسالة")
		}
	}

	return (
		<div className="  p-6 ">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الخدمات", url: "#" },
					{ name: "اتصل بنا", url: "#" },
				]}
			/>

			<div className="mr-4 lg:mr-8">
				<Section title="تواصل معنا" />
			</div>
			{submitted ? (
				<div className="flex items-center justify-center max-w-screen-md mx-auto animate-fadeIn">
					<div className="bg-white/20 backdrop-blur-md shadow-xl p-10 rounded-3xl w-full flex flex-col items-center gap-4 text-center">
						<h2 className="text-2xl font-bold">
							شكراً لتواصلك معنا
						</h2>
						<p className="text-base">
							سوف نقوم بمراجعة رسالتك والرد عليك قريباً
						</p>
					</div>
				</div>
			) : (
				<div className=" md:container grid md:grid-cols-2 gap-8 max-w-screen-xl mx-auto   bg-primary dark:bg-Muharram_primary bg-pattern p-6 rounded-3xl">
					<div className="flex flex-col gap-5 justify-center text-white">
						<h3 className="text-2xl font-bold">معلومات التواصل</h3>
						<p>النجف الأشرف - ملحق شارع الروان</p>
						<p>
							<strong>ساعات العمل:</strong> من السبت إلى الخميس (8
							صباحاً - 2 ظهراً)
						</p>
						<iframe
							className="rounded-2xl w-full h-60 shadow-lg"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
							loading="lazy"
						/>
					</div>

					<form
						onSubmit={handleSubmit}
						className="bg-white/20 backdrop-blur-md p-8 rounded-3xl flex flex-col gap-5 shadow-xl"
					>
						{error && (
							<p className="text-red-500 text-sm text-center">
								{error}
							</p>
						)}

						<Input
							size="lg"
							labelPlacement="inside"
							name="name"
							placeholder="اسمك الثلاثي"
							value={formData.name}
							onChange={handleChange}
							className="w-full"
							classNames={{ input: "border-none focus:ring-0" }}
							startContent={
								<>
									<PersonIcon
										stroke="#bb9661"
										fill="#bb9661"
										strokeWidth={0.1}
										className="dark:hidden"
									/>
									<PersonIcon
										stroke="#a43232"
										fill="#a43232"
										strokeWidth={0.1}
										className="hidden dark:block"
									/>
								</>
							}
						/>
						<Input
							size="lg"
							labelPlacement="inside"
							name="email"
							placeholder="الايميل"
							value={formData.email}
							onChange={handleChange}
							className="w-full"
							classNames={{ input: "border-none focus:ring-0" }}
							startContent={
								<>
									<MailOpen
										stroke="#bb9661"
										fill="none"
										strokeWidth={1.5}
										className="dark:hidden"
									/>
									<MailOpen
										stroke="#a43232"
										fill="none"
										strokeWidth={1.5}
										className="hidden dark:block"
									/>
								</>
							}
						/>

						<CountriesDropdown className="w-full" />
						<div className="relative w-full">
							<textarea
								className="w-full h-28 rounded-xl p-4 pr-10 focus:ring-2 focus:ring-secondary dark:focus:ring-Muharram_secondary resize-none"
								name="message"
								placeholder="اكتب رسالتك"
								value={formData.message}
								onChange={handleChange}
							></textarea>
							<div className="absolute left top-6 mr-3 transform -translate-y-1/2">
								<>
									<MessageIcon
										width={24}
										height={24}
										stroke="#bb9661"
										fill="none"
										className="dark:hidden"
									/>
									<MessageIcon
										width={24}
										height={24}
										stroke="#a43232"
										fill="none"
										className="hidden dark:block"
									/>
								</>
							</div>
						</div>

						<Button
							type="submit"
							className="text-white rounded-xl bg-secondary dark:bg-Muharram_secondary px-6 py-4 font-bold text-base hover:scale-105 transition"
						>
							ارسال
						</Button>
					</form>
				</div>
			)}

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.6s ease-out forwards;
				}
			`}</style>
		</div>
	)
}
