"use client"

import { motion } from "framer-motion"
import { Button, Input } from "@heroui/react"
import { PersonIcon, MobileIcon } from "@/assets/icons/reusable"
import CountriesDropdown from "@/components/countries-input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react"

const ZiaraForm = () => {
	const [sended, setSended] = useState<boolean>(false)
	const [errors, setErrors] = useState<string | null>(null) // Single error message
	const [formData, setFormData] = useState({
		username: "",
		phone: "",
		country: "" as string | number | null, // Allow country to be string, number, or null
	})

	console.log(formData)

	// Validation function
	const validate = () => {
		const newErrors: string[] = []

		if (!formData.username) {
			newErrors.push("الرجاء إدخال اسم الزائر")
		}

		if (!formData.phone) {
			newErrors.push("الرجاء إدخال رقم الهاتف")
		}

		if (!formData.country) {
			newErrors.push("الرجاء اختيار الدولة")
		}

		if (newErrors.length > 0) {
			setErrors(newErrors.join(" | ")) // Combine errors into one string
		} else {
			setErrors(null) // No errors
		}

		return newErrors.length === 0 // Returns true if no errors
	}

	const handleSubmit = () => {
		if (validate()) {
			setSended(true)
		}
	}

	return (
		<div className="flex flex-col items-center lg:items-end justify-center w-full">
			{!sended ? (
				<div className="flex flex-col items-center gap-4 pt-20 py-6 ml-0 lg:ml-16 w-[70%] sm:w-[50%] md:w-[35%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
					<Input
						size={"lg"}
						className="border-none w-full"
						labelPlacement="inside"
						name="username"
						placeholder="الزيارة نيابة عن"
						value={formData.username}
						onChange={(e) =>
							setFormData({
								...formData,
								username: e.target.value,
							})
						}
						classNames={{
							base: "",
							input: "border-none focus:ring-0",
						}}
						startContent={
							<PersonIcon
								stroke="#bb9661"
								fill="#bb9661"
								strokeWidth={0.1}
							/>
						}
						type="text"
					/>
					{/* Input for Phone */}
					<Input
						size={"lg"}
						className="border-none w-full"
						labelPlacement="inside"
						name="phone"
						placeholder="رقم الهاتف"
						value={formData.phone}
						onChange={(e) =>
							setFormData({ ...formData, phone: e.target.value })
						}
						classNames={{
							base: "",
							input: "border-none focus:ring-0",
						}}
						startContent={
							<MobileIcon
								stroke="#bb9661"
								fill="none"
								strokeWidth={1.5}
							/>
						}
						type="number"
					/>
					{/* Dropdown for Countries */}
					<CountriesDropdown
						onCountryChange={(e) =>
							setFormData({ ...formData, country: e })
						}
					/>
					{errors && <p className="text-red-500 text-sm">{errors}</p>}{" "}
					{/* Display one error message */}
					{/* Submit Button */}
					<Button
						onClick={handleSubmit}
						className="text-white rounded-md bg-secondary p-4 md:p-6 mt-2 font-bold text-xs md:text-lg"
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

export default function page() {
	const containerVariants = {
		hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
		visible: {
			opacity: 1,
			x: 0, // Settle in place
			transition: {
				duration: 1, // Duration of the animation
				ease: "easeOut", // Smooth easing
			},
		},
	}
	return (
		<>
			<div className="relative bg-dark-background -z-10 pt-32 pb-10 text-white flex flex-col items-center space-y-2  ">
				<div className="container flex flex-col items-center py-12">
					<div
						className="relative flex justify-between  items-center
						 flex-col lg:flex-row
						 h-fit lg:h-[450px]
						 gap-12 lg:gap-4
						 "
					>
						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
							className="flex justify-center flex-col
				                w-[60%] lg:w-1/2
							    h-fit lg:h-full
							    gap-4 lg:gap-8 xl:gap-14
                              max-lg:text-gray-900
							 "
						>
							<p
								className="text-2xl sm:text-2xl xl:text-5xl font-bold text-start
                            !leading-[30px] lg:!leading-[70px]
                            max-lg:text-center
                            "
							>
								زيارة الامام زين العابدين وأئمة البقيع عليهم
								السلام
							</p>
							<p
								className="font-light text-lg sm:text-2xl xl:text-3xl    max-lg:text-center
                            !leading-[30px] lg:!leading-[50px]
                            "
							>
								سجل اسمك ليتم اداء زيارة الإمام زين العابدين
								وأئمة البقيع (عليهم السلام) نيابة عنك في ضريحهم
								المطهر.
							</p>
						</motion.div>
						<motion.div
							className="flex md:flex-col items-center justify-center bg-[url('/shapes/ziara-bg.svg')] bg-center lg:bg-left bg-no-repeat
                            w-full lg:w-1/2
                            h-96 lg:h-full
                            "
							variants={{
								hidden: {
									opacity: 0,
								},
								visible: {
									opacity: 1,
									transition: {
										duration: 1.5,
										ease: "easeOut",
									},
								},
							}}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
						>
							<ZiaraForm />
						</motion.div>
					</div>
				</div>
			</div>

			<div className="container grid gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-10 lg:py-10 justify-items-center">
				<div className="w-full  p-8 bg-white border-1 border-neutral-200 drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center">
					<div className="flex flex-col justify-between items-center gap-4 text-center">
						<h4 className="text-2xl font-bold">
							الطلبات قيد الانتظار
						</h4>
						<p className="text- text-neutral-500 leading-6">3232</p>
					</div>
				</div>

				<div className="w-full  p-8 bg-white border-1 border-neutral-200 drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center">
					<div className="flex flex-col justify-between items-center gap-4 text-center">
						<h4 className="text-2xl font-bold">
							عدد الطلبات المنجزة
						</h4>
						<p className="text- text-neutral-500 leading-6">3232</p>
					</div>
				</div>

				<div className="w-full  p-8 bg-white border-1 border-neutral-200 drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center">
					<div className="flex flex-col justify-between items-center gap-4 text-center">
						<h4 className="text-2xl font-bold">اجمالي الطلبات</h4>
						<p className="text- text-neutral-500 leading-6">3232</p>
					</div>
				</div>
			</div>
		</>
	)
}
