"use client"

import * as React from "react"
import { defineStepper } from "@stepperize/react"
import {
	ArrowLeft,
	ArrowRight,
	DownloadIcon,
	NewspaperIcon,
	PackageIcon,
	UploadIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { EmailIcon, PhoneIcon } from "@/assets/icons/reusable"

const rules = [
	"يشترط أن يكون الورق من النوع المقهر وبخلفية فاتحة، ولا يجوز استخدام الورق الأبيض. حجم الورقة يجب أن يكون (٧٠ × ٥٠) سم لجميع الخطوط. يُستبعد من لم يلتزم بذلك.",
	"يمكن للمتسابق الاشتراك بثلاثة أنواع من الخطوط فقط، ولا يحق له الاشتراك بأكثر من عمل في النوع الواحد.",
	"يجوز اعتماد أي رسم قرآني في النصوص القرآنية.",
	"يجب التقيد بالقواعد الإملائية والنحوية في النصوص غير القرآنية.",
	"يجب أن تكون الأعمال خالية من التوقيع أو أي إشارة لكاتبها، وألا تكون مزخرفة أو مذهبة أو ذات حدود أو ملصقة على ورق مقوى أو خشب. تُرسل بطريقة تحافظ على سلامة اللوحة.",
	"يُرفق مع العمل ورقة مستقلة تتضمن: اسم المشارك، عنوانه الكامل، سيرة ذاتية مختصرة، صورة شخصية، صورة جواز السفر، ونسخة من استمارة المسابقة.",
	"تُعدّ جميع الأعمال ملكاً للعتبة الحسينية المقدسة - مؤسسة الإمام زين العابدين (عليه السلام) سواء فازت أو لم تفز.",
	"على كل مشارك الالتزام بالشروط والنصوص الواردة، ويُستبعد كل عمل يخالف ذلك.",
	"يحق للمتسابق اختيار لون الحبر بحرية، ويمكن استخدام لون واحد أو أكثر.",
	"تُرسل الأعمال بعد تغليفها في أسطوانة إلى العنوان التالي: كربلاء المقدسة - العتبة الحسينية المقدسة.",
]
const stepper = defineStepper(
	{ id: "step-1", title: "1. قراءة الشروط" },
	{ id: "step-2", title: "2. تحميل الاستمارة", description: "Second step" },
	{
		id: "step-3",
		title: "3. ارسال على الايميل",
		description: "third step",
	},
	{
		id: "step-4",
		title: "4. ارسال الى المنظمين",
		description: "fourth step",
	},
)

export const StepperDemo = () => {
	const methods = stepper.useStepper()

	return (
		<div className="w-full px-20 flex flex-col justify-center items-center">
			<div className="w-full mx-auto">
				<ol className="flex items-center w-full justify-center gap-4">
					<li
						className={cn(
							"flex flex-col gap-5 w-full items-center border-b-2 border-primary p-8 duration-300",
							methods.current === methods.get("step-1")
								? "border-opacity-100"
								: "border-opacity-0",
						)}
					>
						<span className="flex flex-col items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<NewspaperIcon />
						</span>
						<p>{methods.get("step-1").title}</p>
					</li>
					<li
						className={cn(
							"flex flex-col gap-5 w-full items-center border-b-2 border-primary p-8 duration-300",
							methods.current === methods.get("step-2")
								? "border-opacity-100"
								: "border-opacity-0",
						)}
					>
						<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<DownloadIcon />
						</span>
						<p>{methods.get("step-2").title}</p>
					</li>
					<li
						className={cn(
							"flex flex-col gap-5 w-full items-center border-b-2 border-primary p-8 duration-300",
							methods.current === methods.get("step-3")
								? "border-opacity-100"
								: "border-opacity-0",
						)}
					>
						<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<UploadIcon />
						</span>
						<p>{methods.get("step-3").title}</p>
					</li>
					<li
						className={cn(
							"flex flex-col gap-5 w-full items-center border-b-2 border-primary p-8 duration-300",
							methods.current === methods.get("step-4")
								? "border-opacity-100"
								: "border-opacity-0",
						)}
					>
						<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<PackageIcon />
						</span>
						<p>{methods.get("step-4").title}</p>
					</li>
				</ol>
			</div>
			<div className="flex flex-col gap-4 w-full p-10 ">
				{methods.switch({
					"step-1": () => (
						<ol className="list-decimal text-right text-gray-700 space-y-3 pr-4 p-8">
							{rules.map((rule, index) => (
								<li key={index} className="leading-relaxed">
									{rule}
								</li>
							))}
						</ol>
					),
					"step-2": () => (
						<div className="w-full flex flex-col justify-center items-center gap-4 p-8">
							<p className="w-1/2 mx-auto text-xl text-center">
								يجب تنزيل الاستمارة الخاصة بالتقديم، ملئها،
								واعادة ارسالها للانضامام يجب تنزيل الاستمارة
								الخاصة بالتقديم، ملئها، واعادة ارسالها للإنضمام
							</p>
							<Link
								download
								href="/contests/khat/form.pdf"
								className="p-3 border-2 animate-appearance-in rounded-2xl hover:text-primary hover:border-primary duration-300 "
							>
								تحميل الاستمارة
							</Link>
						</div>
					),
					"step-3": () => (
						<div className="w-full flex flex-col justify-center items-center gap-4 p-8">
							<p className="w-1/2 mx-auto text-xl text-center">
								بعد ملىء الاستمارة يجب ارسالها مع صورة من عملك
								على الايميل التالي
							</p>
							<Link
								href="mailto:khat@imamzain.org"
								className="text-2xl font-semibold p-3 border-b-2 flex items-center gap-8 duration-150 hover:-translate-y-2"
							>
								<EmailIcon />
								khat@imamzain.org
							</Link>
						</div>
					),
					"step-4": () => (
						<div className="w-full flex flex-col justify-center items-center gap-4 p-8">
							<p className="w-1/2 mx-auto text-xl text-center">
								اخر خطوة لإتمام الاشتراك هي ارسال عملك منظمين
								المسابقة في العتبة الحسينية المقدسة
							</p>
							<p>وحسب ما مذكور في النقطة الاخيرة من الشروط</p>

							<p className="font-semibold mt-8">
								للتواصل والاستفسار
							</p>
							<p className="text-2xl font-semibold p-3 border-b-2 flex items-center gap-8 duration-150 hover:-translate-y-2">
								<PhoneIcon />
								<span dir="ltr">+964 781 970 7817</span>
							</p>
						</div>
					),
				})}
				<div className="flex justify-between ">
					<button
						onClick={() => !methods.isFirst && methods.prev()}
						className={cn(
							"rounded-full p-4 border-2",
							methods.isFirst
								? "border-gray-400"
								: "border-primary/20",
						)}
					>
						<ArrowRight
							className={cn(
								methods.isFirst
									? "text-gray-400"
									: "text-primary",
							)}
						/>
					</button>
					<button
						onClick={() => !methods.isLast && methods.next()}
						className={cn(
							"rounded-full p-4 border-2",
							methods.isLast
								? "border-gray-400"
								: "border-primary/20",
						)}
					>
						<ArrowLeft
							className={cn(
								methods.isLast
									? "text-gray-400"
									: "text-primary",
							)}
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
