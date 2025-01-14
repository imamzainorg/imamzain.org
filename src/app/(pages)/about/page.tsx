import { SendIcon, PhoneIcon, LocationIcon } from "@/assets/icons/reusable"
import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import Image from "next/image"

export default function About() {
	return (
		<div className="w-11/12 mx-auto mt-28 sm:mt-32 lg:mt-40 xl:mt-48 space-y-10">
			{/* Breadcrumb */}
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "حول المؤسسة", url: "/about" },
				]}
			/>
			<div className="xl:w-11/12 mx-auto">
				<div className="flex justify-center items-center shadow-xl">
					<Image
						src="/images/news-2.jpg"
						className="w-full rounded-xl aspect-[16/6]"
						width={800}
						height={500}
						alt="logo"
					/>
				</div>

				<Section
					title="رؤية المؤسسة"
					text="الريادة  والتميز في إيصال علوم الامام السجاد عليه السلام الى الباحثين والنخب والتعريف به وبأصحابه وبعلماء المدينة المنورة وأدوارهم  في نصرة الحق والحقيقة."
				/>

				<Section
					title="رسالة المؤسسة"
					text="	تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري
					والثقافي المرتبط بالامام السجاد عليه السلام وإشاعة روح
					التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات
					العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.
				"
				/>

				<Section
					title="أهداف عمل المؤسسة"
					text="
						تسليط الضوء على ما لم يظهر من آثار الإمام السجاد (عليه
						السلام).
					بلورة صياغة جديدة ورؤية فكرية شاملة بما يناسب أهداف
						المؤسسة.
					جعل المؤسسة حاضرة في الأوساط العلمية والنخبوية."
				/>

				<div className="bg-white bg-opacity-70 shadow-xl border rounded-xl flex flex-col items-center">
					<h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-primary my-4 p-4 lg:p-10">
						جهات الاتصال
					</h1>

					{/* Contact Items */}
					<div className="mx-auto flex flex-col sm:flex-row items-start gap-4 lg:gap-10 text-sm text-gray-600">
						<div className="flex gap-4 items-center">
							<PhoneIcon
								strokeWidth={2}
								width={13}
								stroke="rgb(0, 102, 84)"
								fill="none"
							/>
							<span dir="ltr">(+964) 778 294 3996</span>
						</div>
						<div className="flex gap-4">
							<SendIcon
								width={13}
								stroke="rgb(0, 102, 84)"
								fill="rgb(0, 102, 84)"
							/>
							info@imamzain.org
						</div>
						<div className="flex gap-4">
							<LocationIcon
								width={13}
								fill="rgb(0, 102, 84)"
								strokeWidth={0.1}
							/>
							النجف الأشرف، ملحق الروان
						</div>
					</div>

					{/* Form and Map */}
					<div className="w-full flex flex-col sm:flex-row gap-10 sm:pt-10">
						{/* Contact Form */}
						<div className="w-full lg:w-1/2 p-10">
							<form className="space-y-6">
								<div>
									<label className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-medium text-gray-700 mb-2">
										الأسم
									</label>
									<input
										type="text"
										placeholder="ادخل اسمك الكامل"
										className="w-full text-xs placeholder-gray-400  border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>

								<div>
									<label className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-medium text-gray-700 mb-2">
										البريد الالكتروني
									</label>
									<input
										type="email"
										placeholder="البريد الالكتروني"
										className="w-full text-xs placeholder-gray-400 border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>

								<div>
									<label className="text-sm sm:text-base lg:text-lg 2xl:text-xl font-medium text-gray-700 mb-2">
										الرسالة
									</label>
									<textarea
										placeholder="اكتب سؤال او اي استفسار"
										className="w-full text-xs placeholder-gray-400 border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<button
										type="submit"
										className="w-1/2 py-1 sm:py-2 bg-primary rounded-md text-white text-sm sm:text-base"
									>
										ارسال
									</button>
								</div>
							</form>
						</div>

						{/* Google Map */}
						<div className="w-full lg:w-1/2">
							<iframe
								className="rounded-xl w-full h-full"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
								loading="eager"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
