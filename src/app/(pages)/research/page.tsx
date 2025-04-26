"use client"

import Breadcrumbs from "@/components/breadcrumb"
import SliderHero from "./_components/slider-hero"
import Link from "next/link"
import { BadgeCheck, Crown, FileBadge } from "lucide-react"
import UploadedResearch from "./_components/uploaded-research"
import Faqs from "./_components/faqs"

export default function Page() {
	return (
		<div className="container  ">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الصفحة العلمية", url: "/research" },
				]}
			/>

			{/* SliderHero  */}
			<SliderHero />

			{/* Link send research */}
			<div className="flex justify-between items-center w-full  pb-14">
				<hr className="border border-[#bb9661] w-full" />
				<Link
					href={"/research/send-research"}
					className="px-16 py-4 text-white text-nowrap mx-10 text-xl bg-primary rounded-2xl hover:bg-primary/95"
				>
					تقديم البحث
				</Link>
				<hr className="border border-[#bb9661] h-  w-full" />
			</div>

			{/* Awards */}
			<div className="py-14">
				<h1 className="text-primary text-3xl font-bold text-center	">
					المكافئات المالية
				</h1>
				<div className="flex justify-between gap-1 mt-12">
					{[
						{
							title: "البحوث المقبولة",
							amount: "100,000 د.ع.",
							subtitle:
								"كل بحث ينال المقبولية على ان لا يقل عن 15 صفحة",
							icon: (
								<BadgeCheck
									size={70}
									strokeWidth={1}
									className="mb-5"
									color="#BA9560"
								/>
							),
						},
						{
							title: "البحوث المتميزة",
							amount: "150,000 د.ع.",
							subtitle: "كل كتاب يحصل على تميز",
							icon: (
								<Crown
									size={70}
									strokeWidth={1}
									className="mb-5"
									color="#BA9560"
								/>
							),
						},
						{
							title: "المقالة",
							amount: "25,000 د.ع.",
							subtitle: "لكل مقالة متميزة",
							icon: (
								<FileBadge
									size={70}
									strokeWidth={1}
									className="mb-5"
									color="#BA9560"
								/>
							),
						},
					].map((item, index) => (
						<div
							key={index}
							className="text-center flex flex-col items-center w-3/12"
						>
							{item.icon}
							<h1 className="text-xl font-bold">{item.title}</h1>
							<p className="w-3/4 font-semibold ">
								{item.amount}
							</p>
							<p className="w-3/4"> {item.subtitle} </p>
						</div>
					))}
				</div>
				<div className="border-r-2 border-secondary pr-4 italic">
					<div className="w-full text-right mt-8 text-lg">
						ملاحظات:
					</div>
					<ol className="list-decimal text-right text-gray-700 space-y-2 sm:space-y-3  px-2 sm:px-4 md:px-6 lg:px-8">
						{[
							"سعر صفحة الكتاب (تأليف، تحقيق) 5,000 د.ع.",
							"المكافئات اعلان تعني في البحوث والكتب التي تأتي من خلال الاستكتاب",
							"البحوث المقدمة للمؤسسة تخصص 5% من مجموع المطبوع هدية للمؤلف",
						].map((rule, index) => (
							<li key={index} className="leading-relaxed">
								{rule}
							</li>
						))}
					</ol>
				</div>
			</div>
			{/* Uploaded research */}
			<UploadedResearch />

			{/* Faqs */}
			<Faqs />
		</div>
	)
}
