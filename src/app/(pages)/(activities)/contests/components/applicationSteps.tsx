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

function toArabicNumerals(input: string | number): string {
	return input
		.toString()
		.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩".charAt(parseInt(d)))
}

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
	"تُرسل الأعمال بعد تغليفها في أسطوانة إلى العنوان التالي:  مؤسسة الإمام زين العابدين (عليه السلام) - النجف الاشرف - حي الزهراء - ملحق الروان.",
]

const stepper = defineStepper(
	{ id: "1", title: "١. قراءة الشروط" },
	{ id: "2", title: "٢. تحميل الاستمارة" },
	{ id: "3", title: "٣. ارسال على الايميل" },
	{ id: "4", title: "٤. ارسال الى المنظمين" },
)

export const ApplyStepper = () => {
	const methods = stepper.useStepper()

	return (
		<div className="w-full min-h-screen px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 flex flex-col justify-center items-center py-4 md:py-8">
			<div className="w-full max-w-7xl mx-auto">
				{/* Desktop Stepper Navigation */}
				<ol className="hidden lg:flex items-center w-full justify-center gap-2 xl:gap-4 mb-6">
					{["1", "2", "3", "4"].map((id, index) => {
						const icons = [
							NewspaperIcon,
							DownloadIcon,
							UploadIcon,
							PackageIcon,
						]
						const Icon = icons[index]
						return (
							<li
								key={id}
								onClick={() =>
									methods.goTo(id as "1" | "2" | "3" | "4")
								}
								className={cn(
									"flex bg-white/60 rounded-xl hover:shadow-xl cursor-pointer flex-col gap-3 xl:gap-5 w-full items-center border border-b-2 p-4 xl:p-6 duration-300 transition-all",
									methods.current.id === id
										? "border-primary shadow-lg"
										: "border-slate-200 hover:border-primary/50",
								)}
							>
								<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full xl:h-12 xl:w-12 shrink-0">
									<Icon className="w-5 h-5 xl:w-6 xl:h-6" />
								</span>
								<p className="text-sm xl:text-base text-center font-medium">
									{
										methods.get(id as "1" | "2" | "3" | "4")
											.title
									}
								</p>
							</li>
						)
					})}
				</ol>

				{/* Tablet Stepper Navigation */}
				<ol className="hidden md:flex lg:hidden items-center w-full justify-center gap-1 mb-6">
					{["1", "2", "3", "4"].map((id, index) => {
						const icons = [
							NewspaperIcon,
							DownloadIcon,
							UploadIcon,
							PackageIcon,
						]
						const Icon = icons[index]
						return (
							<li
								key={id}
								onClick={() =>
									methods.goTo(id as "1" | "2" | "3" | "4")
								}
								className={cn(
									"flex bg-white/60 rounded-lg hover:shadow-lg cursor-pointer flex-col gap-2 w-full items-center border border-b-2 p-3 duration-300 transition-all",
									methods.current.id === id
										? "border-primary shadow-md"
										: "border-slate-200 hover:border-primary/50",
								)}
							>
								<span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full shrink-0">
									<Icon className="w-4 h-4" />
								</span>
								<p className="text-xs text-center font-medium leading-tight">
									{
										methods.get(id as "1" | "2" | "3" | "4")
											.title
									}
								</p>
							</li>
						)
					})}
				</ol>

				{/* Mobile Navigation */}
				<div className="flex md:hidden flex-col gap-3 mb-4">
					{/* Current Step Header */}
					<div className="flex items-center justify-between w-full px-3 py-3 bg-white/60 rounded-lg border border-slate-200">
						<span className="font-semibold text-base sm:text-lg">
							{methods.current.title}
						</span>
						<div className="flex items-center gap-2">
							<span className="text-sm font-medium bg-primary/10 px-2 py-1 rounded">
								{toArabicNumerals(methods.current.id)} /{" "}
								{toArabicNumerals(4)}
							</span>
						</div>
					</div>

					{/* Mobile Step Navigation */}
					<div className="flex gap-2 overflow-x-auto pb-2">
						{["1", "2", "3", "4"].map((id, index) => {
							const icons = [
								NewspaperIcon,
								DownloadIcon,
								UploadIcon,
								PackageIcon,
							]
							const Icon = icons[index]
							return (
								<button
									key={id}
									onClick={() =>
										methods.goTo(
											id as "1" | "2" | "3" | "4",
										)
									}
									className={cn(
										"flex bg-white/60 rounded-lg cursor-pointer flex-col gap-2 min-w-[80px] items-center border border-b-2 p-3 duration-300 transition-all",
										methods.current.id === id
											? "border-primary shadow-md bg-primary/5"
											: "border-slate-200 hover:border-primary/50",
									)}
								>
									<span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full shrink-0">
										<Icon className="w-4 h-4" />
									</span>
									<p className="text-xs text-center font-medium leading-tight">
										{toArabicNumerals(index + 1)}
									</p>
								</button>
							)
						})}
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="flex flex-col gap-4 w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-white/80 rounded-xl border border-slate-200 shadow-sm">
				{methods.switch({
					"1": () => (
						<div className="animate-fade-in-up">
							<h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-center md:text-right">
								شروط الإنضمام للمسابقة
							</h1>
							<ul className="text-right text-gray-700 space-y-3 md:space-y-4 pr-2 md:pr-4">
								{rules.map((rule, index) => (
									<li
										key={index}
										className="leading-relaxed text-sm sm:text-base md:text-lg bg-gray-50 p-3 md:p-4 rounded-lg border-r-4 border-primary/30"
									>
										<span className="font-semibold text-primary">
											{toArabicNumerals(index + 1)}.
										</span>{" "}
										{rule}
									</li>
								))}
							</ul>
						</div>
					),
					"2": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 md:gap-6 p-4 md:p-6">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
								يجب تنزيل الاستمارة الخاصة بالتقديم، ملئها،
								واعادة ارسالها للإنضمام
							</p>
							<Link
								download
								href="/contests/khat/form.pdf"
								className="flex gap-2 md:gap-3 items-center p-3 md:p-4 border-2 rounded-xl hover:text-primary hover:border-primary hover:shadow-lg duration-300 text-sm sm:text-base md:text-lg font-medium bg-white/70 transition-all"
							>
								تحميل الاستمارة
								<DownloadIcon className="w-4 h-4 md:w-5 md:h-5" />
							</Link>
						</div>
					),
					"3": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 md:gap-6 p-4 md:p-6">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
								بعد ملىء الاستمارة يجب ارسالها مع صورة من عملك
								على الايميل التالي
							</p>
							<Link
								href="mailto:khat@imamzain.org"
								className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold p-3 md:p-4 border-b-2 flex items-center gap-3 md:gap-4 hover:-translate-y-2 duration-150 bg-white/70 rounded-lg transition-all hover:shadow-lg"
							>
								<EmailIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
								<span className="break-all">
									khat@imamzain.org
								</span>
							</Link>
						</div>
					),
					"4": () => (
						<div className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 md:gap-6 p-4 md:p-6">
							<p className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-center text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
								اخر خطوة لإتمام الاشتراك هي ارسال عملك الى
								منظمين المسابقة في العتبة الحسينية المقدسة
							</p>
							<p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">
								وحسب ما مذكور في النقطة الاخيرة من الشروط
							</p>
							<div className="mt-4 md:mt-6 text-center">
								<p className="font-semibold text-base sm:text-lg md:text-xl mb-3 md:mb-4">
									للتواصل والاستفسار
								</p>
								<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold p-3 md:p-4 border-b-2 flex items-center justify-center gap-3 md:gap-4 hover:-translate-y-2 duration-150 bg-white/70 rounded-lg transition-all hover:shadow-lg max-w-fit mx-auto">
									<PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
									<span dir="ltr" className="font-mono">
										+964 781 970 7817
									</span>
								</div>
							</div>
						</div>
					),
				})}
			</div>
		</div>
	)
}
