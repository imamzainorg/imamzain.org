// app/research/send-research/page.tsx
import type { Metadata } from "next"
import Breadcrumbs from "@/components/breadcrumb"
import { solidButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"
import { arabicNumber } from "@/lib/format"
import { ArrowDownToLine } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "آلية تقديم البحوث وضوابط النشر والتحكيم",
	description:
		"دليل تقديم البحوث والكتب إلى مؤسسة الإمام زين العابدين عليه السلام: الضوابط العامة والمواصفات الفنية وشروط النشر والملكية الفكرية والتحكيم وطرق الإرسال.",
	keywords: [
		"آلية تقديم البحوث",
		"ضوابط نشر البحوث العلمية",
		"شروط النشر والملكية الفكرية",
		"المواصفات الفنية للبحث",
		"تحكيم البحوث العلمية",
		"إقرار الباحث وتعهده",
		"تقديم بحث للمؤسسة",
		"الاستكتاب والبحث العلمي",
		"مواصفات كتابة البحث العلمي",
	],
	alternates: { canonical: "/research/send-research" },
	openGraph: {
		title: "آلية تقديم البحوث وضوابط النشر والتحكيم | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"تعرّف على خطوات تقديم بحثك للمؤسسة: الضوابط العامة، والمواصفات الفنية، وشروط النشر والملكية الفكرية، والتحكيم، وإقرار الباحث، وطرق إرسال البحث.",
		url: "/research/send-research",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "آلية تقديم البحوث وضوابط النشر والتحكيم",
		description:
			"تعرّف على خطوات تقديم بحثك للمؤسسة: الضوابط العامة، والمواصفات الفنية، وشروط النشر والملكية الفكرية، والتحكيم، وطرق إرسال البحث.",
	},
}

const intro =
	"دليل تقديم البحوث والكتب إلى مؤسسة الإمام زين العابدين عليه السلام: الضوابط العامة والمواصفات الفنية وشروط النشر والملكية الفكرية والتحكيم وطرق الإرسال."

interface StepSectionProps {
	step: number
	title: string
	children: ReactNode
	Boarded?: boolean
}

const StepSection = ({ step, title, children, Boarded }: StepSectionProps) => {
	return (
		<li className="relative pr-20 pb-16 last:pb-0">
			{!!Boarded && (
				<span aria-hidden className="absolute bottom-0 right-7 top-16 w-0.5 bg-secondary/40 dark:bg-Muharram_secondary/40" />
			)}
			<span
				aria-hidden
				className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary bg-primary text-2xl font-bold text-white dark:border-Muharram_secondary dark:bg-Muharram_primary"
			>
				{arabicNumber(step)}
			</span>

			<Reveal y={24}>
				<h2 className="pt-1 text-3xl font-bold text-primary dark:text-Muharram_primary md:text-4xl">
					{title}
				</h2>
				<div className="pt-8 text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">
					{children}
				</div>
			</Reveal>
		</li>
	)
}

export default function Page() {
	return (
		<div className="container pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "بوابة البحث العلمي", url: "/research" },
					{ name: "تقديم البحث", url: "/research/send-research" },
				]}
			/>

			<PageHeader title="آلية تقديم البحوث" text={intro} />

			<ol className="mt-20 max-w-5xl">
				<StepSection step={1} title="الضوابط العامة" Boarded>
					<ul className="list-arabic-indic space-y-2 ">
						<li>
							سلامة العبارات عن التعقيدات اللفظية والمعنوية ووضوح
							المعنى قدر الإمكان.
						</li>
						<li>
							الابتعاد عن المصادرات بنحو عام، ولا بد من ذكر الدليل
							العقلي أو الشرعي للمدعَى.
						</li>
						<li>
							عدم الخروج عن موضوع البحث، والالتزام بخطة البحث
							المقدمة من قبل المجلس العلمي.
						</li>
						<li>
							ألا يكون البحث نسخاً أو نقلًا من بحث آخر دون جهد
							الباحث العلمي.
						</li>
						<li>
							الإشارة إلى صاحب أي معلومة أو فكرة مأخوذة من الآخرين
							مع ذكر المصدر بدقة.
						</li>
						<li>
							التعريف بالشخصيات المذكورة في البحث ما لم تكن مشهورة
							شهرة تغني عن التعريف.
						</li>
						<li>كتابة المصطلحات الأجنبية بجانب ترجمتها العربية.</li>
						<li>
							الابتعاد عن كل ما يثير التعصب الطائفي بين المذاهب أو
							الأديان.
						</li>
						<li>
							تجنب التعرض للأشخاص بالسوء أو الانتقاص منهم،
							والتركيز على مناقشة آرائهم.
						</li>
						<li>إرفاق السيرة العلمية للباحث (CV) في صفحة واحدة.</li>
					</ul>
				</StepSection>

				<StepSection step={2} title="المواصفات الفنية للبحث " Boarded>
					<div className="text-right text-gray-800 leading-relaxed  ">
						<div>
							<h3 className="font-bold text-2xl">
								تقسيم الأبحاث:
							</h3>
							<ul className="list-arabic-indic pr-6 space-y-2">
								<li>
									إذا كان حجم الكتاب أقل من 300 صفحة، يقسم إلى
									فصول ومباحث.
								</li>
								<li>
									إذا كان أكثر من 300 صفحة:
									<ul className="list-disc pr-6 mt-2 space-y-1">
										<li>
											لموضوع واحد: يقسم إلى أبواب، كل باب
											فيه فصول ومباحث.
										</li>
										<li>
											لموضوعات متعددة: يقسم إلى أقسام، كل
											قسم فيه أبواب وفصول.
										</li>
									</ul>
								</li>
								<li>
									الحد الأدنى للبحث: 15 صفحة، وللمقالة: 3
									صفحات.
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold text-2xl">
								مواصفات الصفحة:
							</h3>
							<ol className="list-arabic-indic list-inside space-y-3 text-right">
								<li>
									يُكتب البحث أو الكتاب بقطع{" "}
									<strong>وزيري</strong>.
								</li>
								<li>
									ألا يقل عدد الكلمات عن{" "}
									<strong>250 كلمة في الصفحة الواحدة</strong>.
								</li>
								<li>
									يُعتمد في الكتب والبحوث والمقالات ما يلي:
									<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
										<li>
											الخط: <strong>Lotus</strong>
										</li>
										<li>
											حجم الخط في المتن:{" "}
											<strong>14</strong>
										</li>
										<li>
											حجم خط الهوامش: <strong>12</strong>،
											وتوضع أسفل كل صفحة
										</li>
										<li>
											المسافة بين الأسطر:{" "}
											<strong>1.15</strong>
										</li>
										<li>
											أن تكون الهوامش{" "}
											<strong>2 سم</strong> من جميع الجهات
										</li>
									</ul>
								</li>
								<li>
									لا تحتسب الصفحات الفارغة وصفحات العناوين
									والفهارس في العدد الإجمالي.
								</li>
							</ol>
						</div>

						<div>
							<h3 className="font-bold text-2xl">الاقتباس:</h3>
							<ul className="list-arabic-indic pr-6 space-y-2">
								<li>من القرآن: توضع الآية بين قوسين مزهرية.</li>
								<li>من الروايات: يُذكر اسم الراوي والمصدر.</li>
								<li>
									من كتب المفكرين: توضع بين قوسين صغيرين أو
									اعتياديين حسب الحالة.
								</li>
								<li>
									من الإنترنت: يُذكر الرابط الكامل وتاريخ
									النسخ.
								</li>
							</ul>
						</div>
					</div>
				</StepSection>

				<StepSection
					step={3}
					title="شروط النشر والملكية الفكرية"
					Boarded
				>
					<ol className="list-arabic-indic list-inside space-y-3 text-right">
						<li>
							البحوث والكتب المقدمة عبر <strong>الاستكتاب</strong>{" "}
							تخضع للشروط السابقة.
						</li>
						<li>
							البحوث المقدمة مباشرةً للمؤسسة: يحصل المؤلف على{" "}
							<strong>5%</strong> من جميع الطبعات كهدية.
						</li>
						<li>
							يلزم تقديم ملخص للبحث باللغة العربية (150-200 كلمة)
							يشمل:
							<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
								<li>أهداف البحث</li>
								<li>الأدوات المستخدمة</li>
								<li>المفاهيم الأساسية</li>
								<li>أهم النتائج</li>
							</ul>
						</li>
						<li>
							<strong>حقوق النشر</strong>: تصبح ملكًا للمؤسسة بعد
							القبول، ولا يجوز إعادة النشر دون موافقة خطية.
						</li>
						<li>
							<strong>نسبة الاقتباس</strong>: ألا تزيد عن{" "}
							<strong>10%</strong> (باستثناء المقدمة والهوامش).
						</li>
						<li>
							<strong>التحكيم</strong>: تُحكَّم البحوث من قِبَل
							خبيرين متخصصين، ويجب ألا تكون منشورة سابقًا.
						</li>
						<li>
							<strong>إعادة الطباعة</strong>: تحتاج إلى إذن كتابي
							من صاحب حقوق النشر.
						</li>
						<li>
							<strong>الإخطار بالقرار</strong>: تُبلغ المؤسسة
							الباحث بقرارها خلال <strong>شهرين</strong> من تقديم
							البحث.
						</li>
						<li>
							<strong>السرية والأمانة العلمية</strong>: تلتزم
							المؤسسة باحترام خصوصية البحث.
						</li>
						<li>
							<strong>لا تُعاد</strong> البحوث غير المقبولة إلى
							الباحثين.
						</li>
					</ol>
				</StepSection>

				<StepSection step={4} title="إقرار الباحث" Boarded>
					<>
						<div>
							<strong>أقر بأن</strong>:
							<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
								<li>
									البحث لم يُنشر سابقًا، ولم يُقدَّم لأي جهة
									أخرى.
								</li>
								<li>
									التزمت بأخلاقيات النشر وتعليمات المؤسسة.
								</li>
								<li>حقوق النشر تعود للمؤسسة بعد القبول.</li>
							</ul>
						</div>
						<p>
							<strong>
								أتحمل المسؤولية القانونية والأخلاقية
							</strong>{" "}
							عن محتوى البحث.
						</p>
						<div className="flex w-full justify-start items-center pt-10">
							<Link
								download
								href={"/research/تعهد الباحث.pdf"}
								className={solidButton}
							>
								تحميل فورمة الأقرار
								<ArrowDownToLine strokeWidth={1.5} />
							</Link>
						</div>
					</>
				</StepSection>

				<StepSection step={5} title="أرسال البحث مع إقرار الباحث">
					<div>
						<p>
							رفع البحث مع اقرار الباحث على جهات التواصل التالية{" "}
						</p>
						<p>البريد الإلكتروني: info@imamzain.org</p>
						<p>
							رقم الهاتف: <span dir="ltr">+964 780 794 3999</span>
						</p>
					</div>
				</StepSection>
			</ol>
		</div>
	)
}
