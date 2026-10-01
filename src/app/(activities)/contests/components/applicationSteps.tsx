"use client"

import { defineStepper } from "@stepperize/react"
import { DownloadIcon, NewspaperIcon, PhoneIcon, MailIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { solidButton } from "@/components/brand"
import { Note } from "./contest-ui"

function toArabicNumerals(input: string | number): string {
	return input
		.toString()
		.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩".charAt(parseInt(d)))
}

/* =========================
   شروط المسابقة
========================= */
const rules = [
	"يشترط أن يكون الورق من النوع المقهر وبخلفية فاتحة، ولا يجوز استخدام الورق الأبيض. حجم الورقة يجب أن يكون (٧٠ × ٥٠) سم لجميع الخطوط. يُستبعد من لم يلتزم بذلك.",
	"يمكن للمتسابق الاشتراك بثلاثة أنواع من الخطوط فقط، ولا يحق له الاشتراك بأكثر من عمل في النوع الواحد.",
	"يجوز اعتماد أي رسم قرآني في النصوص القرآنية.",
	"يجب التقيد بالقواعد الإملائية والنحوية في النصوص غير القرآنية.",
	"يجب أن تكون الأعمال خالية من التوقيع أو أي إشارة لكاتبها، وألا تكون مزخرفة أو مذهبة أو ذات حدود أو ملصقة على ورق مقوى أو خشب. تُرسل بطريقة تحافظ على سلامة اللوحة.",
	"تُعدّ جميع الأعمال ملكاً للعتبة الحسينية المقدسة - مؤسسة الإمام زين العابدين (عليه السلام) سواء فازت أو لم تفز.",
	"على كل مشارك الالتزام بالشروط والنصوص الواردة، ويُستبعد كل عمل يخالف ذلك.",
	"يحق للمتسابق اختيار لون الحبر بحرية، ويمكن استخدام لون واحد أو أكثر.",
]

/* =========================
   Stepper (خطوتان فقط)
========================= */
const stepper = defineStepper(
	{ id: "1", title: "١. الشروط والتنزيل" },
	{ id: "2", title: "٢. الاستعلام والتواصل" },
)

export const ApplyStepper = () => {
	const methods = stepper.useStepper()

	return (
		<div className="w-full">
			<div className="flex flex-col gap-8">
				{/* Navigation */}
				<ol className="flex flex-wrap gap-3">
					{["1", "2"].map((id, index) => {
						const icons = [NewspaperIcon, MailIcon]
						const Icon = icons[index]
						const active = methods.current.id === id

						return (
							<li key={id}>
								<button
									type="button"
									onClick={() => methods.goTo(id as "1" | "2")}
									aria-pressed={active}
									className={cn(
										"flex items-center gap-3 rounded-xl border-2 px-5 py-3 font-semibold transition-colors",
										active
											? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
											: "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary",
									)}
								>
									<Icon className="h-5 w-5" />
									{methods.get(id as "1" | "2").title}
								</button>
							</li>
						)
					})}
				</ol>

				{/* Content */}
				<div className="rounded-[28px] border-2 border-primary/15 bg-white/60 p-6 dark:border-Muharram_primary/20 md:p-10">
					{methods.switch({
						/* STEP 1 */
						"1": () => (
							<div className="space-y-8">
								<h3 className="text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl">
									شروط المشاركة
								</h3>

								<ol>
									{rules.map((rule, index) => (
										<li
											key={index}
											className="flex items-start gap-4 border-b border-dashed border-secondary/40 py-4"
										>
											<span className="w-9 shrink-0 text-2xl font-bold text-secondary dark:text-Muharram_secondary">
												{toArabicNumerals(index + 1)}
											</span>
											<span className="text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">
												{rule}
											</span>
										</li>
									))}
								</ol>

								<div className="space-y-4">
									<p className="font-bold text-secondary_dark dark:text-Muharram_secondary">
										ملاحظة مهمة
									</p>
									<Note>
										يُرفق مع العمل: استمارة المسابقة، سيرة ذاتية مختصرة، صورة شخصية، وصورة جواز السفر
									</Note>
									<Link
										download
										href="/contests/khat/form.pdf"
										className="inline-flex items-center gap-3 text-lg font-bold text-primary underline underline-offset-4 hover:text-primary/80 dark:text-Muharram_primary"
									>
										<DownloadIcon className="h-5 w-5" />
										تحميل استمارة المسابقة
									</Link>
									<p className="text-lg leading-loose text-gray-600">
										اخر خطوة لإتمام الاشتراك هي ارسال عملك الى منظمين المسابقة في العتبة الحسينية المقدسة
										{" دار القرآن الكريم مركز والقلم للخط العربي كربلاء المقدسة شارع السدرة عكد الجاجين "}
									</p>
								</div>
							</div>
						),

						/* STEP 2 */
						"2": () => (
							<div className="space-y-8">
								<h3 className="max-w-3xl text-2xl font-bold leading-snug text-primary dark:text-Muharram_primary md:text-3xl md:leading-snug">
									اخر خطوة لإتمام الاشتراك هي ارسال عملك الى منظمين المسابقة في العتبة الحسينية المقدسة
								</h3>
								<p className="text-lg leading-loose text-gray-600">وحسب ما مذكور في النقطة الاخيرة من الشروط</p>
								<p className="text-lg font-semibold leading-loose text-gray-700">
									للاستفسار والتواصل، يرجى استخدام وسائل الاتصال التالية:
								</p>
								<div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
									<Link
										href="mailto:khat@imamzain.org"
										className="flex flex-col items-center gap-3 rounded-3xl border-2 border-primary/25 p-6 transition-colors hover:border-primary"
									>
										<MailIcon className="h-9 w-9 text-primary dark:text-Muharram_primary" strokeWidth={1.4} />
										<span className="text-xl font-bold">khat@imamzain.org</span>
									</Link>

									<div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-primary/25 p-6">
										<PhoneIcon className="h-9 w-9 text-primary dark:text-Muharram_primary" strokeWidth={1.4} />
										<span dir="ltr" className="text-xl font-bold">
											+964 781 970 7817
										</span>
									</div>
								</div>
							</div>
						),
					})}
				</div>

				{/* Buttons */}
				<div className="flex">
					{methods.current.id !== "1" && (
						<button type="button" onClick={() => methods.prev()} className={`${solidButton} ml-auto`}>
							شروط وتنزيل الاستمارة
						</button>
					)}

					{methods.current.id !== "2" && (
						<button type="button" onClick={() => methods.next()} className={`${solidButton} ml-auto`}>
							الاستعلام والتواصل
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
