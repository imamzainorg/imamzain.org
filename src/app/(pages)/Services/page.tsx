"use client"
import { Button, Input } from "@heroui/react"
import { PersonIcon, MobileIcon } from "@/assets/icons/reusable"

import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"

export default function ContactUs() {
	return (
		<div className="container ">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة", url: "#" },
					{ name: "ما كتب عن الامام", url: "#" },
				]}
			/>
			<Section title="موقع المؤسسة" />
			<div className="flex items-center justify-center ">
				<div className=" bg-primary bg-pattern p-4 rounded-3xl w-full flex flex-col  items-center justify-center">
					<Input
						size={"lg"}
						className="border-none m-4  w-11/12"
						labelPlacement="inside"
						name="username"
						placeholder="الزيارة نيابة عن"
						classNames={{
							base: "",
							input: " border-none focus:ring-0",
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
						className="border-none    w-11/12"
						labelPlacement="inside"
						name="phone"
						placeholder="رقم الهاتف"
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
						type="text"
					/>
					<Input
						size={"lg"}
						className="border-none  m-4 w-11/12"
						labelPlacement="inside"
						name="phone"
						placeholder="رقم الهاتف"
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
						type="text"
					/>
					<textarea
						className=" w-11/12 p-12 rounded-2xl  "
						placeholder="نص الرسائل"
					/>

					{/* Submit Button */}
					<Button className="text-white rounded-md  bg-secondary p-6 pr-10 pl-10 m-10 ">
						التسجيل
					</Button>
				</div>
			</div>
			<div className="w-full  pt-40  ">
				<div className=" pb-6  rounded-2xl bg-opacity-25 bg-slate-400   ">
					<div className="w-11/12 p-2 ">
						<Section title="موقع المؤسسة" />
						<iframe
							className="rounded-[30px] w-full h-1/3 md:h-60 xl:h-96 shadow-xl p-1 m-4"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
							loading="eager"
						/>
						<div className="flex flex-col lg:flex-row w-full">
							<p className=" lg:w-1/2 text-sm pb-2 sm:text-base md:text-lg lg:text-lg xl:text-xl text-center">
								النجف الأشرف-ملحق شارع الروان
							</p>
							<p className="lg:text-left lg:w-1/2  text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl  text-center">
								<span className="font-bold">ساعات العمل </span>
								من السبت الى الخميس(8صباحا-2 ظهرا)
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
