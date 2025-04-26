// app/research/send-research/page.tsx
import Breadcrumbs from "@/components/breadcrumb"
import { ArrowDownToLine } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
interface StepSectionProps {
	step: number
	title: string
	children: ReactNode
	Boarded?: boolean
}

const StepSection = ({ step, title, children, Boarded }: StepSectionProps) => {
	return (
		<div
			className={`relative pr-16 pb-16 ${!!Boarded && "border-r-secondary border-r-4"}`}
		>
			<div className="absolute -top-8 -right-12 w-24 h-24 border-secondary border-4 rounded-full bg-white flex justify-center items-center">
				<div className="w-20 h-20 rounded-full bg-primary flex justify-center items-center">
					<div className="text-3xl text-white pt-3">{step}</div>
				</div>
			</div>

			<div>
				<h2 className="text-primary text-4xl font-bold">{title}</h2>
				<div className="pr-10 pt-10 text-xl text-gray-800 leading-relaxed pl-5">
					{children}
				</div>
			</div>
		</div>
	)
}
export default function Page() {
	return (
		<div className="container">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الصفحة العلمية", url: "/research" },
					{ name: "تقديم البحث", url: "/research/send-research" },
				]}
			/>

			<h1 className="text-primary text-4xl font-bold text-center mt-10">
				آلية تقديم البحوث
			</h1>

			<div className="pt-20 pr-20  ">
				<StepSection step={1} title="الضوابط العامة" Boarded>
					<ul className="list-decimal space-y-2 ">
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
							<h2 className="font-bold text-2xl">
								تقسيم الأبحاث:
							</h2>
							<ul className="list-decimal pr-6 space-y-2">
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
							<h2 className="font-bold text-2xl">
								مواصفات الصفحة:
							</h2>
							<ol className="list-decimal list-inside space-y-3 text-right">
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
							<h2 className="font-bold text-2xl">الاقتباس:</h2>
							<ul className="list-decimal pr-6 space-y-2">
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
					<ol className="list-decimal list-inside space-y-3 text-right">
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
						<div className="flex w-full justify-start items-center pt-14">
							<Link
								download
								href={"/research/تعهد الباحث.pdf"}
								className="px-6 py-4 text-white text-nowrap flex gap-5 mx-10 text-xl bg-primary rounded-2xl hover:bg-primary/95"
							>
								<p>تحميل فورمة الأقرار</p>
								<ArrowDownToLine strokeWidth={1} />
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
			</div>
		</div>
	)
}
