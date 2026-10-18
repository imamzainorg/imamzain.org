// app/research/send-research/page.tsx
import type { Metadata } from "next"
import Breadcrumbs from "@/components/breadcrumb"
import { solidButton } from "@/components/brand"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"
import { arabicNumber } from "@/lib/format"
import { ArrowDownToLine } from "lucide-react"
import { Amiri_Quran } from "next/font/google"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "آلية تقديم البحوث وضوابط الكتابة والنشر",
	description:
		"دليل الكتابة وتقديم البحوث والكتب إلى مؤسسة الإمام زين العابدين عليه السلام: العناوين المقترحة، والضوابط العامة والفنية، وقواعد الاقتباس والهوامش وتوثيق المصادر، وشروط النشر والتحكيم، وطرق الإرسال.",
	keywords: [
		"آلية تقديم البحوث",
		"ضوابط الكتابة",
		"عناوين مقترحة للبحوث",
		"ضوابط نشر البحوث العلمية",
		"المواصفات الفنية للبحث",
		"قواعد الاقتباس والهوامش",
		"توثيق المصادر",
		"تحكيم البحوث العلمية",
		"إقرار الباحث وتعهده",
		"تقديم بحث للمؤسسة",
		"الاستكتاب والبحث العلمي",
	],
	alternates: { canonical: "/research/send-research" },
	openGraph: {
		title: "آلية تقديم البحوث وضوابط الكتابة والنشر | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"العناوين المقترحة وضوابط الكتابة العامة والفنية وقواعد الاقتباس والهوامش وتوثيق المصادر وشروط النشر والتحكيم وطرق إرسال البحث إلى المؤسسة.",
		url: "/research/send-research",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "آلية تقديم البحوث وضوابط الكتابة والنشر",
		description:
			"العناوين المقترحة وضوابط الكتابة العامة والفنية وقواعد الاقتباس والهوامش وتوثيق المصادر وشروط النشر والتحكيم وطرق إرسال البحث.",
	},
}

// The ornate brackets that wrap a verse are drawn properly only by a Quranic font.
const quranFont = Amiri_Quran({ subsets: ["arabic"], weight: "400" })

const intro =
	"دليل الكتابة وتقديم البحوث والكتب إلى مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات: العناوين المقترحة، وضوابط الكتابة العامة والفنية، وقواعد الاقتباس والهوامش وتوثيق المصادر، وشروط النشر والتحكيم وطرق الإرسال."

const suggestedTitles = [
	"النظام والتناسق في الكون: مقاربة فلسفية بين الصحيفة السجادية والفكر العلمي.",
	"التوازن الكوني في الصحيفة السجادية: دراسة في القانون الإلهي والنظام الطبيعي.",
	"النشوء والفناء في رؤية الإمام زين العابدين عليه السلام: التقاء الفلسفة بالدين.",
	"العقل والجهل في تراث الإمام السجاد عليه السلام: رؤية تربوية وفلسفية.",
	"علاقة الإنسان بالطبيعة في الصحيفة السجادية: التوازن بين الاستفادة والاستهلاك.",
	"كيف يعالج الإمام زين العابدين عليه السلام القلق والخوف والتردد؟ تحليل علمي ونفسي.",
	"مناجاة الإمام زين العابدين (ع) وأثرها في بناء العبودية الخالصة لله.",
	"الصبر كقيمة محورية في أخلاق الإمام زين العابدين عليه السلام.",
	"التواضع في تراث الإمام زين العابدين عليه السلام: بين النظرية والتطبيق.",
	"الإمام زين العابدين عليه السلام وأثره في تأسيس مدرسة فكرية للأجيال اللاحقة.",
	"مكانة المرأة في فكر الإمام زين العابدين عليه السلام.",
	"الإمام زين العابدين عليه السلام والتصدي للانحراف الفكري بعد كربلاء.",
]

const titleRules = [
	"الالتفات التام إلى الضوابط العامة المرعية في تأليفات المؤسسة.",
	"ألا تقل الكتابة في هذه المواضيع عن مائة صفحة، وكل ثلاثمائة كلمة صحيحة تساوي صفحة.",
	"يُكتفى من الآية والرواية والشعر بمقدار الشاهد وموضع الاستدلال، ويُحذف ما هو أكثر من ذلك.",
	"تُحذف التكرارات في الكتابة بدون مسوّغ وحاجة إلى ذلك.",
	"يُحوَّل الكتاب إلى المؤسسة مدققًا لغويًا.",
	"تُحسب الصفحة بخمسة آلاف دينار عراقي فقط، وتُضاف هدية مناسبة إلى الباحث المتميز والبحث المبتكر.",
	"يُرفق مع الكتاب قائمة بالمصادر والمراجع التي اعتمد عليها الكاتب كاملة المعلومات.",
	"يُرفق الكاتب تعهدًا بالتنازل عن حقوق الطبع والنشر للمؤسسة.",
	"لا يُعطى العنوان لأيٍّ كان إلا بعد التأكد من صلاحية قلمه لمثل هذه المواضيع، وإمضاء ذلك من قِبل من تخوّله المؤسسة للتشخيص وبيان الرأي، ولا بد أن يكون ممن كتب سابقًا فيُنظر في كتاباته المماثلة.",
	"على من يرغب بالكتابة الاطلاع على الضوابط، وأن يُثبت موافقته عليها ويوقّع على نسخة منها، ويُهمل كل مؤلَّف لا يراعي هذه الضوابط.",
]

const generalRules = [
	"سلامة العبارات عن التعقيدات اللفظية والمعنوية، ووضوح المعنى قدر الإمكان.",
	"الابتعاد عن المصادرات بنحو عام، ولا بد من ذكر الدليل العقلي أو الشرعي المعتبر، أو إقامة الشواهد والقرائن العامة والخاصة على كل دعوى تُذكر.",
	"عدم الخروج عن موضوع البحث، والالتزام بخريطة البحث المقرّة من قِبل المجلس العلمي، وعدم الخروج عنها باستطرادات لا يُحتاج إليها.",
	"ألّا يكون البحث نمطيًا أو مما أُشبع بحثًا، مما لا يتمثل فيه جهد الباحث العلمي.",
	"الإشارة إلى صاحب كل معلومة أو فكرة تؤخذ من الآخرين أو تُنسب إليهم، وذكر المصدر الذي أُخذت منه بنحو دقيق وواضح.",
	"التعريف في الهامش بالشخصيات التي يُتعرض إليها في المتن، كلٌّ بحسبه، باستثناء المشهورين شهرةً تغني عن التعريف.",
	"كتابة المصطلح المعرّب إلى جانبه بلغته الأجنبية، مثل: الدوغمائية (DOGMATISM)، وكذلك أسماء العلماء والمفكرين الأجانب، مثل: فرانسيس بيكون (FRANCIS BACON).",
	"الابتعاد عن كل ما يثير النعرات الطائفية بين المذاهب أو الأديان.",
	"عدم التعرض للأشخاص بالسوء أو الانتقاص مهما كانوا وإلى أي جهة انتسبوا، بل تُناقش آراؤهم وأفكارهم فقط بأسلوب علمي وموضوعي. ويُفضّل عدم المبالغة في مدح الأشخاص، بل يُذكر الاسم مع اللقب دون كلمات المدح والثناء.",
	"إرفاق السيرة العلمية للباحث (CV) في صفحة واحدة A4.",
]

const divisionRules = [
	"إذا كان حجم الكتاب أقل من 300 صفحة: يُقسم البحث إلى فصول ومباحث.",
	"إذا كان أكثر من 300 صفحة وموضوعه فكرة واحدة: يُقسم إلى أبواب، وكل باب فيه فصول ومباحث.",
	"إذا كان أكثر من 300 صفحة وموضوعه عدة أفكار مختلفة: يُقسم إلى أقسام، وكل قسم فيه أبواب، وكل باب فيه فصول ومباحث.",
	"الحد الأدنى للبحث 15 صفحة، وللمقالة 3 صفحات.",
]

const publishingTerms = [
	"يلزم تقديم ملخص للبحث باللغة العربية (150-200 كلمة) يشمل: أهداف البحث، والأدوات المستخدمة، والمفاهيم الأساسية، وأهم النتائج.",
	"حقوق النشر: تصبح ملكًا للمؤسسة بعد القبول، ولا يجوز إعادة النشر دون موافقة خطية.",
	"نسبة الاقتباس: ألا تزيد عن 10% (باستثناء المقدمة والهوامش).",
	"التحكيم: تُحكَّم البحوث من قِبَل خبيرين متخصصين، ويجب ألا تكون منشورة سابقًا.",
	"إعادة الطباعة: تحتاج إلى إذن كتابي من صاحب حقوق النشر.",
	"الإخطار بالقرار: تُبلغ المؤسسة الباحث بقرارها خلال شهرين من تقديم البحث.",
	"السرية والأمانة العلمية: تلتزم المؤسسة باحترام خصوصية البحث.",
	"لا تُعاد البحوث غير المقبولة إلى الباحثين.",
]

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
				<h2 className="pt-1 text-3xl font-bold text-primary dark:text-Muharram_primary md:text-4xl">{title}</h2>
				<div className="space-y-8 pt-8 text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">{children}</div>
			</Reveal>
		</li>
	)
}

const SubTitle = ({ children }: { children: ReactNode }) => (
	<h3 className="mb-3 text-2xl font-bold text-gray-900">{children}</h3>
)

const Rules = ({ items }: { items: string[] }) => (
	<ul className="list-arabic-indic space-y-2 pr-6">
		{items.map((item) => (
			<li key={item}>{item}</li>
		))}
	</ul>
)

// A line of a convention with its sample (a quotation mark pair, a footnote format).
const Sample = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
	<span className={`mx-1 inline-block rounded-lg bg-primary/[0.07] px-3 py-0.5 font-semibold text-primary dark:bg-white/10 dark:text-white ${className}`}>
		{children}
	</span>
)

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
				<StepSection step={1} title="العناوين المقترحة وضوابط الاستكتاب" Boarded>
					<div>
						<SubTitle>عناوين يمكن الكتابة فيها (١٤٤٧هـ):</SubTitle>
						<Rules items={suggestedTitles} />
					</div>
					<div>
						<SubTitle>ضوابط الكتابة في هذه العناوين:</SubTitle>
						<Rules items={titleRules} />
					</div>
				</StepSection>

				<StepSection step={2} title="الضوابط العامة" Boarded>
					<Rules items={generalRules} />
				</StepSection>

				<StepSection step={3} title="الضوابط الفنية" Boarded>
					<div>
						<SubTitle>تقسيم الأبحاث في الكتب:</SubTitle>
						<Rules items={divisionRules} />
					</div>

					<div>
						<SubTitle>مواصفات الصفحة:</SubTitle>
						<p>
							الصفحة المعتبرة من القطع <strong>الوزيري</strong>، مكوّنة من <strong>250 كلمة</strong>، بالمواصفات التالية:
						</p>
						<ul className="mt-2 list-disc space-y-2 pr-6">
							<li>
								الخط: <strong>Lotus Linotype</strong>
							</li>
							<li>
								حجم الخط: <strong>15</strong> للمتن و<strong>13</strong> للهامش، وتُوثّق الهوامش أسفل كل صفحة
							</li>
							<li>
								المسافات البينية: <strong>1.15</strong>
							</li>
							<li>
								هوامش الصفحة: <strong>2 سم</strong> من كل جانب
							</li>
						</ul>
					</div>

					<div>
						<SubTitle>التفريع والمقدمة والخاتمة:</SubTitle>
						<ul className="list-arabic-indic space-y-2 pr-6">
							<li>
								يكون تفريع المطالب وفقًا لأصول البحث العلمي: <Sample>أولًا، 1-، أ-...</Sample>
							</li>
							<li>توضع لكل دراسة أو بحث مقدمة تمثل مدخلًا للبحث، وخاتمة تُكتب فيها أهم النتائج والتوصيات.</li>
						</ul>
					</div>
				</StepSection>

				<StepSection step={4} title="الاقتباس والهوامش" Boarded>
					<div>
						<SubTitle>علامات الاقتباس:</SubTitle>
						<ul className="list-arabic-indic space-y-3 pr-6">
							<li>
								القرآن الكريم: توضع الآية بين الأقواس المخصوصة لذلك <Sample className={`${quranFont.className} text-2xl`}>
									{/* Amiri Quran sits low in its line box, so lift the glyphs back into the pill. */}
									<span className="inline-block -translate-y-[0.4em]">﴿...﴾</span>
								</Sample>
							</li>
							<li>
								الروايات الشريفة: يُذكر اسم الراوي الذي ينقل عن المعصوم مباشرة فقط، ويوضع كلام المعصوم بين قوسين صغيرين{" "}
								<Sample>«...»</Sample>. وإذا كان في البحث خصوصية تحتاج إلى ذكر السند، يُذكر منه ما هو مورد الحاجة.
							</li>
							<li>
								اقتباس داخل اقتباس: بين علامتي نقل صغيرتين <Sample>&apos;...&apos;</Sample>
							</li>
							<li>
								كلام العلماء والمفكرين: بين قوسين كبيرين اعتياديين <Sample>((...))</Sample>
							</li>
							<li>
								الأقوال المعروفة التي لا يُحتاج فيها إلى مصدر: بين قوسين كبيرين <Sample>(...)</Sample>
							</li>
							<li>
								إضافة كلام أو تعليق ضمن النص المقتبس: بين قوسين معقوفين <Sample>[...]</Sample>
							</li>
						</ul>
					</div>

					<div>
						<SubTitle>صيغة الهوامش:</SubTitle>
						<ul className="list-arabic-indic space-y-3 pr-6">
							<li>
								الآيات: اسم السورة ورقم الآية، هكذا: <Sample>(سورة البقرة: ٢٠)</Sample>
							</li>
							<li>
								نقل نص عبارة المؤلف: اسم المؤلف مع اللقب، اسم الكتاب: رقم الجزء/ رقم الصفحة. مثل:{" "}
								<Sample>محمد حسين الطباطبائي، الميزان في تفسير القرآن: ١/ ٤٥</Sample>
							</li>
							<li>
								نقل العبارة مع تصرف الباحث فيها: تُسبق بكلمة <strong>انظر</strong>. مثل:{" "}
								<Sample>انظر محمد حسين الطباطبائي، الميزان في تفسير القرآن: ١/ ٤٥</Sample>
							</li>
							<li>
								اقتباس فكرة من الكتاب بصياغة الباحث: تُسبق بكلمة <strong>راجع</strong>. مثل:{" "}
								<Sample>راجع محمد حسين الطباطبائي، الميزان في تفسير القرآن: ١/ ٤٥</Sample>
							</li>
							<li>
								الدوريات والمجلات: اسم الكاتب، عنوان المقال، اسم الدورية أو المجلة، رقم العدد. مثل:{" "}
								<Sample>علي شيخ، الإنسان والعقيدة، مجلة الدليل، العدد: ١</Sample>
							</li>
							<li>
								الإنترنت: الرابط الكامل للصفحة في الموقع، يُنسخ من نفس صفحة النت.
							</li>
							<li>
								عند الاقتباس بتصرف أو نقل الفكرة فقط من الدوريات أو الإنترنت، تُراعى ضوابط الاقتباس من الكتب المذكورة أعلاه.
							</li>
							<li>
								تكرار المرجع: يُوثَّق بعبارة (المصدر السابق) إذا كان من نفس الجزء والصفحة، وإذا تغيّر الجزء أو الصفحة يُذكر المصدر السابق مع إضافة الجزء والصفحة الجديدين.
							</li>
							<li>
								المصادر غير العربية: تُوثَّق في الهامش بشكل مماثل للعربية، وعلى الجهة اليسرى من الصفحة إذا كانت بالإنجليزية أو الفرنسية أو أي لغة تقتضي ذلك.
							</li>
						</ul>
					</div>
				</StepSection>

				<StepSection step={5} title="فهرست المصادر والأرقام واللغة" Boarded>
					<div>
						<SubTitle>فهرست المصادر في آخر البحث:</SubTitle>
						<p>تُوثَّق المصادر مرتبةً على الحروف الأبجدية، وبالشكل التالي:</p>
						<ul className="mt-2 list-disc space-y-2 pr-6">
							<li>
								<strong>الكتب:</strong> اسم المؤلف (الاسم، اللقب)، اسم الكتاب، اسم المترجم أو المحقق أو المعلق إن وُجد، مكان النشر، دار النشر، رقم الطبعة، سنة النشر.
							</li>
							<li>
								<strong>المجلات:</strong> اسم المجلة، الجهة التي تصدر عنها، مكان النشر، عدد المجلة، تاريخ النشر.
							</li>
							<li>
								<strong>الرسائل العلمية:</strong> اسم المؤلف، عنوان الرسالة، اسم الجامعة أو المركز العلمي الذي قُدّمت إليه الرسالة، مكان النشر، رقم الطبعة، سنة النشر.
							</li>
							<li>
								<strong>مواقع الإنترنت:</strong> اسم المؤسسة أو الشخصية صاحبة الموقع، وعنوان الموقع الذي أُخذ منه، بأن يُنسخ من الصفحة مباشرة.
							</li>
						</ul>
					</div>

					<div>
						<SubTitle>الأرقام والطباعة:</SubTitle>
						<ul className="list-arabic-indic space-y-2 pr-6">
							<li>تُكتب جميع الأرقام باللغة الإنجليزية إذا كان البحث فكريًا معاصرًا، وتُستخدم الأرقام العربية إذا كان البحث تراثيًا.</li>
							<li>
								تُستعمل لوحة المفاتيح العربية في طباعة المتن، وعند النسخ من الجوامع المثبتة على الأقراص أو من المواقع الفارسية يجب تحويلها إلى النمط العربي قبل وضعها في متن البحث.
							</li>
						</ul>
					</div>
				</StepSection>

				<StepSection step={6} title="شروط النشر والتحكيم" Boarded>
					<Rules items={publishingTerms} />
				</StepSection>

				<StepSection step={7} title="إقرار الباحث" Boarded>
					<div>
						<strong>أقر بأن</strong>:
						<ul className="mt-2 list-disc space-y-2 pr-6">
							<li>البحث لم يُنشر سابقًا، ولم يُقدَّم لأي جهة أخرى.</li>
							<li>التزمت بأخلاقيات النشر وتعليمات المؤسسة.</li>
							<li>حقوق النشر تعود للمؤسسة بعد القبول.</li>
						</ul>
					</div>
					<p>
						<strong>أتحمل المسؤولية القانونية والأخلاقية</strong> عن محتوى البحث.
					</p>
					<div className="flex w-full items-center justify-start pt-2">
						<Link download href={"/research/تعهد الباحث.pdf"} className={solidButton}>
							تحميل فورمة الإقرار
							<ArrowDownToLine strokeWidth={1.5} />
						</Link>
					</div>
				</StepSection>

				<StepSection step={8} title="إرسال البحث مع إقرار الباحث">
					<div>
						<p>رفع البحث مع إقرار الباحث على جهات التواصل التالية:</p>
						<p>البريد الإلكتروني: info@imamzain.org</p>
						<p>
							رقم الهاتف: <span dir="ltr">+964 780 794 3999</span>
						</p>
					</div>
				</StepSection>
			</ol>
		</div>
	)
}
