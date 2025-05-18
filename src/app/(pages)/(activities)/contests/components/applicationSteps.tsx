"use client"
import { defineStepper } from "@stepperize/react"
import {
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

const additionalRules = [
	{
		font: "الثلث الجلي:",
		rule: " لا يزيد قياس القلم في هذا الخط عن (١٠) ملم ولا يقل عن (٦) ملم وللمتسابق حرية الابتكار في التكوين",
	},
	{
		font: "الثلث العادي:",
		rule: " لا يزيد قياس القلم في هذا الخط عن (٢,٥) ملم ولا يقل عن (١,٥) ملم للمتسابق حرية الابتكار في التكوين",
	},
	{
		font: "خط النسخ:",
		rule: " لا يزيد قياس القلم في خط النسخ عن (١) ملم ولا يقل عن (٠,٦) ملم للمتسابق حرية الابتكار في التكوين",
	},
	{
		font: "خط النستعليق:",
		rule: " لا يقل قياس القلم في خط النستعليق عن (٢) ملم للمتسابق حرية الابتكار في التكوين",
	},
]

const stepper = defineStepper(
	{ id: "1", title: "1. قراءة الشروط" },
	{ id: "2", title: "2. تحميل الاستمارة", description: "Second step" },
	{
		id: "3",
		title: "3. ارسال على الايميل",
		description: "third step",
	},
	{
		id: "4",
		title: "4. ارسال الى المنظمين",
		description: "fourth step",
	},
)

export const ApplyStepper = () => {
	const methods = stepper.useStepper()

	return (
		<div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col justify-center items-center">
			<div className="w-full mx-auto">
				{/* Horizontal stepper for medium screens and above */}
				<ol className="hidden md:flex items-center w-full justify-center gap-2 lg:gap-4">
					<li
						onClick={() => methods.goTo("1")}
						className={cn(
							"flex bg-white/60 rounded-xl hover:shadow-xl cursor-pointer flex-col gap-2 md:gap-3 lg:gap-5 w-full items-center border border-b-2 border-primary p-4 md:p-6 lg:p-8 duration-300",
							methods.current === methods.get("1")
								? "border-primary"
								: "border-slate-200",
						)}
					>
						<span className="flex flex-col items-center justify-center w-8 h-8 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<NewspaperIcon className="w-4 h-4 lg:w-6 lg:h-6" />
						</span>
						<p className="text-sm md:text-base text-center">
							{methods.get("1").title}
						</p>
					</li>
					<li
						onClick={() => methods.goTo("2")}
						className={cn(
							"flex bg-white/60 rounded-xl hover:shadow-xl cursor-pointer flex-col gap-2 md:gap-3 lg:gap-5 w-full items-center border border-b-2 border-primary p-4 md:p-6 lg:p-8 duration-300",
							methods.current === methods.get("2")
								? "border-primary"
								: "border-slate-200",
						)}
					>
						<span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<DownloadIcon className="w-4 h-4 lg:w-6 lg:h-6" />
						</span>
						<p className="text-sm md:text-base text-center">
							{methods.get("2").title}
						</p>
					</li>
					<li
						onClick={() => methods.goTo("3")}
						className={cn(
							"flex bg-white/60 rounded-xl hover:shadow-xl cursor-pointer flex-col gap-2 md:gap-3 lg:gap-5 w-full items-center border border-b-2 border-primary p-4 md:p-6 lg:p-8 duration-300",
							methods.current === methods.get("3")
								? "border-primary"
								: "border-slate-200",
						)}
					>
						<span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<UploadIcon className="w-4 h-4 lg:w-6 lg:h-6" />
						</span>
						<p className="text-sm md:text-base text-center">
							{methods.get("3").title}
						</p>
					</li>
					<li
						onClick={() => methods.goTo("4")}
						className={cn(
							"flex bg-white/60 rounded-xl hover:shadow-xl cursor-pointer flex-col gap-2 md:gap-3 lg:gap-5 w-full items-center border border-b-2 border-primary p-4 md:p-6 lg:p-8 duration-300",
							methods.current === methods.get("4")
								? "border-primary"
								: "border-slate-200",
						)}
					>
						<span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
							<PackageIcon className="w-4 h-4 lg:w-6 lg:h-6" />
						</span>
						<p className="text-sm md:text-base text-center">
							{methods.get("4").title}
						</p>
					</li>
				</ol>

				{/* Mobile stepper - vertical and compact */}
				<div className="flex md:hidden items-center justify-between w-full px-2 py-4">
					<span className="font-medium text-lg">
						{methods.current.title}
					</span>
					<div className="flex items-center gap-2">
						<span className="text-sm">
							{methods.current.id} / 4
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-4 w-full p-4 sm:p-6 md:p-8 lg:p-10">
				{methods.switch({
					"1": () => (
						<>
							<h1 className="text-base sm:text-xl lg:text-2xl font-bold">
								شروط الإنضمام للمسابقة
							</h1>
							<h2 className="font-bold">القوانين العامة</h2>
							<ol className="animate-fade-in-up list-decimal text-right text-gray-700 space-y-2 sm:space-y-3 pr-2 sm:pr-4 p-2 sm:p-4 md:p-6 lg:p-8">
								{rules.map((rule, index) => (
									<li
										key={index}
										className="leading-relaxed text-sm sm:text-base"
									>
										{rule}
									</li>
								))}
							</ol>
							<div className="w-1/2 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent h-[1px]" />
							<h2 className="font-bold">شروط خاصة بنوع الخط</h2>
							<ol className="delay-100 animate-fade-in-up text-right text-gray-700 space-y-2 sm:space-y-3 pr-2 sm:pr-4 p-2 sm:p-4 md:p-6 lg:p-8">
								{additionalRules.map((rule, index) => (
									<li
										key={index}
										className="leading-relaxed text-sm sm:text-base"
									>
										<span className="font-semibold mx-2">
											{rule.font}
										</span>
										{rule.rule}
									</li>
								))}
							</ol>
						</>
					),
					"2": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-base sm:text-lg md:text-xl text-center">
								يجب تنزيل الاستمارة الخاصة بالتقديم، ملئها،
								واعادة ارسالها للإنضمام يجب تنزيل الاستمارة
								الخاصة بالتقديم، ملئها، واعادة ارسالها للإنضمام
							</p>
							<Link
								download
								href="/contests/khat/form.pdf"
								className="flex gap-2 items-center p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl hover:text-primary hover:border-primary duration-300 text-sm sm:text-base"
							>
								تحميل الاستمارة
								<DownloadIcon size={16} />
							</Link>
						</div>
					),
					"3": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-base sm:text-lg md:text-xl text-center">
								بعد ملىء الاستمارة يجب ارسالها مع صورة من عملك
								على الايميل التالي
							</p>
							<Link
								href="mailto:kh	at@imamzain.org"
								className="text-lg sm:text-xl md:text-2xl font-semibold p-2 sm:p-3 border-b-2 flex items-center gap-4 sm:gap-6 md:gap-8 duration-150 hover:-translate-y-2"
							>
								<EmailIcon className="w-5 h-5 sm:w-6 sm:h-6" />
								khat@imamzain.org
							</Link>
						</div>
					),
					"4": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 p-2 sm:p-4 md:p-6 lg:p-8">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-base sm:text-lg md:text-xl text-center">
								اخر خطوة لإتمام الاشتراك هي ارسال عملك الى
								منظمين المسابقة في العتبة الحسينية المقدسة
							</p>
							<p className="text-sm sm:text-base">
								وحسب ما مذكور في النقطة الاخيرة من الشروط
							</p>

							<p className="font-semibold mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base">
								للتواصل والاستفسار
							</p>
							<p className="text-lg sm:text-xl md:text-2xl font-semibold p-2 sm:p-3 border-b-2 flex items-center gap-4 sm:gap-6 md:gap-8 duration-150 hover:-translate-y-2">
								<PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
								<span dir="ltr">+964 781 970 7817</span>
							</p>
						</div>
					),
				})}
			</div>
		</div>
	)
}
