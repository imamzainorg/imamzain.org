import type { Metadata } from "next"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import { SectionTitle, photoFrame, infoPanel } from "@/components/brand"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"
import { arabicNumber } from "@/lib/format"

export const metadata: Metadata = {
	title: "الرؤية والرسالة والأهداف",
	description:
		"رؤية مؤسسة الإمام زين العابدين عليه السلام ورسالتها وأهدافها ومحاور عملها في إحياء تراث الإمام السجاد والعناية بالصحيفة السجادية ورسالة الحقوق.",
	keywords: [
		"رؤية مؤسسة الإمام زين العابدين",
		"رسالة مؤسسة الإمام السجاد وأهدافها",
		"محاور عمل مؤسسة الإمام السجاد",
		"تراث الإمام السجاد عليه السلام",
		"الصحيفة السجادية ورسالة الحقوق",
		"رسالة الحقوق للإمام السجاد",
		"إحياء تراث أهل البيت عليهم السلام",
		"علماء الشيعة في المدينة المنورة",
	],
	alternates: { canonical: "/about/vision-and-goals" },
	openGraph: {
		title: "الرؤية والرسالة والأهداف | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
		description:
			"تعرّف على رؤية مؤسسة الإمام زين العابدين عليه السلام ورسالتها وأهدافها ومحاور عملها في إحياء تراث الإمام السجاد والعناية بالصحيفة السجادية ورسالة الحقوق.",
		url: "/about/vision-and-goals",
		type: "website",
		images: ["/images/about-vision.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "الرؤية والرسالة والأهداف | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"رؤية مؤسسة الإمام زين العابدين عليه السلام ورسالتها وأهدافها ومحاور عملها في إحياء تراث الإمام السجاد والعناية بالصحيفة السجادية ورسالة الحقوق.",
		images: ["/images/about-vision.jpg"],
	},
}

type Section = {
	id: string
	title: string
	isList?: boolean
	content: string[]
}

const sections: Section[] = [
	{
		id: "vision",
		title: "رؤية المؤسسة",
		content: [
			"انطلاقاً من العمق الديني والعلمي والاجتماعي لأهل بيت النبوة وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين وخصوصا أئمة البقيع (عليهم السلام)، وما مورس في حقهم من إجحاف وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة جدهم النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون-جزاهم الله خيراً-قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة البقيع وفقههم والعمل على الفات الانظار الى سمو مرتبتهم (عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله العاملين كل خير.",
			"ولكن لا شك أن هناك ما لابد من تسليط الضوء عليه استجابة لمتطلبات ما يعيشه المجتمع الإسلامي من فقدان للهوية وارباكٍ فكري وتأزم أخلاقي وتفككٍ إجتماعي مما دعا الى إيجاد خطاب متوازنٍ وإبرازٍ هادفٍ للحقيقةِ التي يحاول الطغاة التعمية عليها وتزييفها وشحن النفوس والعقول بالأباطيل والشبهات والأكاذيب.",
			"ومن خلال تلك الجهود المشكورة للعاملين في الساحة العلمية والفكرية والثقافية، وتجسيداً لتوجيهات ونصائح المرجع الأعلى للطائفة الشيعية سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله الوارف) والتي ركز فيها سماحته على الاستفادة من الصحيفة السجادية بالإضافة الى القرآن الكريم ونهج البلاغة حيث قال سماحته:",
			"وينبغي للمرء أن يأنس بكتب ثلاثة يتزود منها بالتأمّل والتفكير : القرآن الكريم... ونهج البلاغة... والصحيفة السجادية؛ فإنها تتضمّن أدعيةً بليغة تستمد مَضامينَها من القرآنِ الكريمِ وفيها تعليم لما ينبغي أن يكون عليه الإنسان من توجهات وهواجس ورؤى وطموح، وبيان لكيفية محاسبته لنفسه ونقده لها ومكاشفتها بخباياها وأسرارها ، ولا سيما دعاء مكارم الأخلاق منها .",
			"انبثقت فكرة تأسيس مؤسسة تعنى بتراث الامام السجاد (عليه السلام) بحثاً ودراسةً وتحقيقاً وممارسةً ميدانيةً طلباً لترسيخ علمِ وفكرِ وثقافةِ أهلِ البيتِ (عليهم جميعا سلام الله) في مجتمعاتنا المتعطشة لأخذ الحقيقة الناصعة من منابعها الصافية.",
			"ومن أولئك الذين يسعون دائما - باذلين الوسع بحسب الإمكانات المتاحة - لنصرة المذهب الحق وإعلاء الراية الأحق سماحة المتولي الشرعي للعتبة الحسينية المقدسة جناب الشيخ عبد المهدي الكربلائي (دامت بركاته) الذي كانت له فضيلة المبادرة لتأسيس هذه المؤسسة المباركة، حيث التقى طلبه الكريم مع همٍ طالما حملناه في قلوبنا وعقولنا لإحياء تراث الامام السجاد (عليه السلام).",
			"فنسأل الحق تعالى أن يوفق الجميع لخدمة دين رب العالمين وشريعة سيد المرسلين والسادة النجباء من آل طه ويس عليهم صلوات المصلين وتسليم المسلمين، وآخر دعوانا أن الحمد لله رب العالمين.",
			"رؤية المؤسسة: الريادة والتميز في إيصال علوم الامام السجاد (عليه السلام) إلى الباحثين والنخب والتعريف به وبأصحابه وبعلماء المدينة المنورة وأدوارهم في نصرة الحق والحقيقة .",
		],
	},
	{
		id: "message",
		title: "رسالة المؤسسة",
		content: [
			"تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري والثقافي المرتبط بالإمام السجاد (عليه السلام) وإشاعة روح التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.",
		],
	},
	{
		id: "goals",
		title: "الهدف من عمل المؤسسة",
		content: [
			"١- تسليط الضوء على ما لم يظهر من آثار الإمام السجاد(عليه السلام ).",
			"٢- بلورة صياغة جديدة وطرح رؤية فكرية شاملة فيما قد مضى العمل عليه مسبقا تتناسب ورؤية المؤسسة.",
			"٣- جعلُ فكر الإمام السجاد(عليه السلام) حاضراً في الأوساط العلمية والنخبوية .",
		],
	},
	{
		id: "axes",
		title: "محاور عمل المؤسسة",
		isList: true,
		content: [
			"حياة الامام زين العابدين (عليه السلام ) وتراثه الروائي والقرآني والعقائدي تحقيقا وتأليفاً.",
			"الاهتمام البالغ بالصحيفة السجادية ورسالة الحقوق-على وجه الخصوص-وكل إثره(عليه السلام) بحثاً ودراسةً وتفعيلها اجتماعياً وأكاديمياً.",
			"حياة أصحابهم الميامين ودورهم في حفظ الهوية الدينية.",
			"واقع المدينة المنورة كونها منطلقاً للنواة الأولى للتشيع ومهدَ الفكر الإسلامي الأصيل .",
			"حياة علماء الشيعة في المدينة المنورة وما جاورها.",
			"فهرَس مؤلفات الشيعة في تلك الديار.",
			"فهرَس المخطوطات والعمل على تحقيقها وطبعها.",
			"إصدار مجلة تراثية علمية متخصصة تتناول المحاور السابقة.",
			"إنشاء مكتبة تخصصية في الإمام السجاد (عليه السلام ) .",
		],
	},
	{
		id: "targets",
		title: "الجهات المستهدفة",
		content: [
			"طلبة العلوم الدينية.",
			"الباحثون والمتخصصون من الأكاديميين.",
			"الباحثون عن المعرفة.",
		],
	},
]
const intro =
	"رؤية مؤسسة الإمام زين العابدين عليه السلام ورسالتها وأهدافها ومحاور عملها في إحياء تراث الإمام السجاد والعناية بالصحيفة السجادية ورسالة الحقوق."

// Long-form reading text, the same size and measure as the biography chapters.
const reading = "text-xl leading-[2.1] text-gray-800 md:text-[1.35rem] md:leading-[2.2]"

// The vision runs several paragraphs. The passage quoted from the Marja' and the closing
// statement of the vision are set apart; everything else is plain reading text.
function VisionText({ paragraphs }: { paragraphs: string[] }) {
	return (
		<div className="space-y-6">
			{paragraphs.map((text, i) => {
				if (text.startsWith("وينبغي للمرء")) {
					return (
						<figure key={i} className="border-r-4 border-secondary pr-6 dark:border-Muharram_secondary">
							<blockquote className="text-xl font-semibold leading-[2.1] text-gray-900 md:text-2xl md:leading-[2.1]">
								{text}
							</blockquote>
						</figure>
					)
				}
				if (text.startsWith("رؤية المؤسسة:")) {
					return (
						<div key={i} className={`${infoPanel} !mt-10 p-8 md:p-10`}>
							<p className="text-xl font-bold leading-loose text-primary dark:text-white md:text-2xl md:leading-loose">{text}</p>
						</div>
					)
				}
				return (
					<p key={i} className={reading}>
						{text}
					</p>
				)
			})}
		</div>
	)
}

// "١- text" in the data becomes a gold numeral beside the text.
function GoalsList({ items }: { items: string[] }) {
	return (
		<ol className="space-y-2">
			{items.map((item, i) => (
				<li key={i} className="flex items-start gap-5 border-b border-dashed border-secondary/40 py-5">
					<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-secondary text-lg font-bold text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary">
						{arabicNumber(i + 1)}
					</span>
					<span className={`${reading} pt-0.5`}>{item.replace(/^[٠-٩0-9]+\s*[-.]\s*/, "")}</span>
				</li>
			))}
		</ol>
	)
}

function AxesList({ items }: { items: string[] }) {
	return (
		<ul className="grid gap-x-14 md:grid-cols-2">
			{items.map((item, i) => (
				<li key={i} className="flex items-start gap-4 border-b border-dashed border-secondary/40 py-5">
					<span className="w-9 shrink-0 text-2xl font-bold text-secondary dark:text-Muharram_secondary">
						{arabicNumber(i + 1)}
					</span>
					<span className="text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">{item}</span>
				</li>
			))}
		</ul>
	)
}

function Targets({ items }: { items: string[] }) {
	return (
		<ul className="flex flex-wrap gap-3">
			{items.map((item) => (
				<li
					key={item}
					className="rounded-xl border-2 border-primary/25 px-6 py-3 text-lg font-semibold text-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary md:text-xl"
				>
					{item}
				</li>
			))}
		</ul>
	)
}

function SectionBody({ section }: { section: Section }) {
	switch (section.id) {
		case "vision":
			return <VisionText paragraphs={section.content} />
		case "goals":
			return <GoalsList items={section.content} />
		case "axes":
			return <AxesList items={section.content} />
		case "targets":
			return <Targets items={section.content} />
		default:
			return (
				<div className="space-y-6">
					{section.content.map((text, i) => (
						<p key={i} className={reading}>
							{text}
						</p>
					))}
				</div>
			)
	}
}

export default function VisionAndGoals() {
	return (
		<div className="container pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "حول المؤسسة", url: "/about" },
					{ name: "الرؤية والرسالة", url: "#" },
				]}
			/>

			<PageHeader
				title="الرؤية والرسالة والأهداف"
				text={intro}
				aside={
					<div className={`${photoFrame} mx-2 aspect-[4/3] shadow-xl`}>
						<Image
							src="/images/about-vision.jpg"
							alt="المجلس العلمي لمؤسسة الإمام زين العابدين (عليه السلام)"
							width={1600}
							height={1066}
							priority
							sizes="(max-width: 1024px) 100vw, 40vw"
							className="h-full w-full object-cover"
						/>
					</div>
				}
			/>

			<div className="mt-24 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-16 xl:grid-cols-[16rem_1fr] xl:gap-24">
				<aside className="mb-12 lg:mb-0">
					<nav aria-label="أقسام الصفحة" className="lg:sticky lg:top-32">
						<ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-r-2 lg:border-secondary/25">
							{sections.map((section) => (
								<li key={section.id}>
									<a
										href={`#${section.id}`}
										className="block rounded-xl border-2 border-primary/25 px-4 py-2 font-semibold text-primary transition-colors hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary lg:-mr-0.5 lg:rounded-none lg:border-0 lg:border-r-2 lg:border-transparent lg:py-2.5 lg:pr-4 lg:text-gray-600 lg:hover:border-secondary lg:hover:text-primary dark:lg:hover:border-Muharram_secondary"
									>
										{section.title}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				<div className="min-w-0 space-y-24">
					{sections.map((section) => (
						<section key={section.id} id={section.id} className="scroll-mt-32">
							<SectionTitle title={section.title} className="mb-8" />
							<Reveal y={24}>
								<div className="max-w-4xl">
									<SectionBody section={section} />
								</div>
							</Reveal>
						</section>
					))}
				</div>
			</div>
		</div>
	)
}
