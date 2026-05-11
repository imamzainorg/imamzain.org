"use client"

import { PersonIcon, MobileIcon } from "@/assets/icons/reusable"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Input, Button } from "@heroui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import CountriesDropdown from "./countries-input"
const ZiaraForm = () => {
	const [sent, setSent] = useState<boolean>(false)
	const [errors, setErrors] = useState<string | null>(null)
	const [formData, setFormData] = useState({
		visitorName: "",
		visitorPhone: "",
		visitorCountry: "" as string | number | null,
	})

	const validate = () => {
		const newErrors: string[] = []

		if (!formData.visitorName) {
			newErrors.push("الرجاء إدخال اسم الزائر")
		}

		if (!formData.visitorPhone) {
			newErrors.push("الرجاء إدخال رقم الهاتف")
		}

		if (!formData.visitorCountry) {
			newErrors.push("الرجاء اختيار الدولة")
		}

		if (newErrors.length > 0) {
			setErrors(newErrors.join(" | "))
		} else {
			setErrors(null)
		}

		return newErrors.length === 0
	}

	const handleSubmit = async () => {
		if (!validate()) return

		try {
			const response = await fetch("/api/proxy-visit", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setSent(true)
			} else {
				setErrors("فشل في إرسال الطلب")
			}
		} catch (error) {
			setErrors(error instanceof Error ? error.message : "خطأ غير معروف")
		}
	}

	return (
		<div className="flex flex-col pt-10   bg-no-repeat  items-center justify-center  md:w-full">
			{!sent ? (
				<div className="flex w-10/12 z-20 flex-col items-center gap-4  ">
					<Input
						size={"lg"}
						className="border-none w-full "
						labelPlacement="inside"
						name="visitorName"
						placeholder="الزيارة نيابة عن"
						value={formData.visitorName}
						onChange={(e) =>
							setFormData({
								...formData,
								visitorName: e.target.value,
							})
						}
						classNames={{
							base: "",
							input: "border-none focus:ring-0",
						}}
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
						type="text"
					/>
					{/* Input for visitorPhone */}
					<Input
						size={"lg"}
						className="border-none w-full"
						labelPlacement="inside"
						name="visitorPhone"
						placeholder="رقم الهاتف"
						value={formData.visitorPhone}
						onChange={(e) =>
							setFormData({
								...formData,
								visitorPhone: e.target.value,
							})
						}
						classNames={{
							base: "",
							input: "border-none focus:ring-0",
						}}
						startContent={
							<>
								<MobileIcon
									stroke="#bb9661"
									fill="none"
									strokeWidth={1.5}
									className="dark:hidden"
								/>
								<MobileIcon
									stroke="#a43232"
									fill="none"
									strokeWidth={1.5}
									className="hidden dark:block"
								/>
							</>
						}
						type="number"
					/>
					{/* Dropdown for Countries */}
					<CountriesDropdown
						onCountryChange={(e) =>
							setFormData({ ...formData, visitorCountry: e })
						}
					/>
					{errors && <p className="text-red-500 text-sm">{errors}</p>}{" "}
					{/* Display one error message */}
					{/* Submit Button */}
					<Button
						onClick={handleSubmit}
						className="text-white rounded-md bg-secondary dark:bg-Muharram_primary p-4 md:p-6 mt-2 font-bold text-xs md:text-lg"
					>
						التسجيل
					</Button>
				</div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="flex flex-col gap-6  pb-20 items-center   pt-20 py-6 ml-0 lg:ml-16 w-[70%] sm:w-[50%] md:w-[35%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]"
				>
					<FontAwesomeIcon
						icon={faCircleCheck}
						className={"text-7xl lg:text-9xl"}
					/>
					<p>تم ادراج اسمك في قائمة الزائرين</p>
				</motion.div>
			)}
		</div>
	)
}

export default ZiaraForm
