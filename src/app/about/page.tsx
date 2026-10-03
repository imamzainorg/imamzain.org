import type { Metadata } from "next"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { MoreLink, SectionTitle, TitleIcon, leadText, outlinePanel, photoFrame, infoPanel } from "@/components/brand"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
	title: "حول المؤسسة",
	description:
		"تعرّف على مؤسسة الإمام زين العابدين عليه السلام: رؤيتها في إحياء فكر أئمة البقيع، ورسالتها في إثراء البحث حول الإمام السجاد، مع موقعها ووسائل التواصل.",
	keywords: [
		"مؤسسة الإمام زين العابدين",
		"مؤسسة الإمام السجاد للبحوث والدراسات",
		"رؤية ورسالة المؤسسة",
		"أئمة البقيع",
		"الإمام زين العابدين السجاد",
		"إحياء فكر العترة الطاهرة",
		"مؤسسة بحوث ودراسات النجف الأشرف",
		"التواصل مع مؤسسة الإمام زين العابدين",
	],
	alternates: { canonical: "/about" },
	openGraph: {
		title: "حول مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
		description:
			"تعرّف على رؤية ورسالة مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات في إحياء فكر الإمام السجاد وأئمة البقيع، مع موقعها في النجف الأشرف ووسائل التواصل معها.",
		url: "/about",
		type: "website",
		images: ["/images/about-landing.jpg"],
	},
	twitter: {
		card: "summary_large_image",
		title: "حول مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
		description:
			"تعرّف على رؤية ورسالة مؤسسة الإمام زين العابدين عليه السلام في إحياء فكر الإمام السجاد وأئمة البقيع، مع موقعها في النجف الأشرف ووسائل التواصل معها.",
		images: ["/images/about-landing.jpg"],
	},
}

const intro =
	"تعرّف على مؤسسة الإمام زين العابدين عليه السلام: رؤيتها في إحياء فكر أئمة البقيع، ورسالتها في إثراء البحث حول الإمام السجاد، مع موقعها ووسائل التواصل."

const vision =
	"انطلاقاً من العمق الديني والعلمي والاجتماعي لأهل بيت النبوة وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين وخصوصاً أئمة البقيع (علهم السلام)، وما مورس في حقهم من إجحاف وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة جدهم النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون جزاهم الله خيراً قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة البقيع وفقههم والعمل على إلفات الإنظار الى سمو مرتبتهم (عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله العاملين كل خير."

const mission =
	"تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري والثقافي المرتبط بالإمام السجاد (عليه السلام) وإشاعة روح التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية والهدف من عمل المؤسسة هو تسليط الضوء على ما لم يظهر من آثار الإمام السجاد (عليه السلام)."

const contacts = [
	{ label: "رقم الهاتف", value: "(+964) 782 943 9996", href: "tel:+9647829439996", Icon: Phone },
	{ label: "البريد الإلكتروني", value: "info@imamzain.org", href: "mailto:info@imamzain.org", Icon: Mail },
]

export default function About() {
	return (
		<div className="container pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "حول المؤسسة", url: "/about" },
				]}
			/>

			<PageHeader
				title="حول المؤسسة"
				text={intro}
				aside={
					<div className={`${photoFrame} mx-2 aspect-[4/3] shadow-xl`}>
						<Image
							src="/images/about-landing.jpg"
							alt="جانب من لقاء في مقر مؤسسة الإمام زين العابدين (عليه السلام)"
							width={1500}
							height={1000}
							priority
							sizes="(max-width: 1024px) 100vw, 40vw"
							className="h-full w-full object-cover"
						/>
					</div>
				}
			/>

			<section className="pt-28">
				<SectionTitle title="رؤية المؤسسة" className="mb-8" />
				<Reveal>
					<p className={`max-w-5xl ${leadText}`}>{vision}</p>
					<MoreLink href="/about/vision-and-goals#vision" className="mt-6 text-lg">
						المزيد عن رؤية المؤسسة
					</MoreLink>
				</Reveal>
			</section>

			<section className="pt-28">
				<div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
					<Reveal x={60} y={0}>
						<div className={`${infoPanel} p-8 md:p-12`}>
							<h2 className="flex items-center gap-3 text-3xl font-extrabold text-primary dark:text-white">
								<TitleIcon className="w-4" />
								رسالة المؤسسة
							</h2>
							<p className="mt-6 text-lg leading-loose text-gray-700 dark:text-white/85 md:text-xl md:leading-loose">{mission}</p>
							<MoreLink href="/about/vision-and-goals#message" className="mt-6">
								المزيد عن رسالة المؤسسة
							</MoreLink>
						</div>
					</Reveal>
					<Reveal x={-60} y={0} delay={0.15}>
						<div className={`${photoFrame} mx-2 aspect-[4/3] shadow-xl`}>
							<Image
								src="/images/about-vision.jpg"
								alt="المجلس العلمي لمؤسسة الإمام زين العابدين (عليه السلام)"
								width={1600}
								height={1066}
								sizes="(max-width: 1024px) 100vw, 45vw"
								className="h-full w-full object-cover"
							/>
						</div>
					</Reveal>
				</div>
			</section>

			<section className="pt-28">
				<SectionTitle title="موقع المؤسسة" text="النجف الأشرف-ملحق شارع الروان" className="mb-8" />
				<Reveal>
					<div className={`${outlinePanel} overflow-hidden`}>
						<iframe
							title="موقع مؤسسة الإمام زين العابدين على الخريطة"
							className="block h-72 w-full md:h-96"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
							loading="lazy"
						/>
					</div>
				</Reveal>
			</section>

			<section className="pt-28">
				<SectionTitle title="معلومات الاتصال" className="mb-6" />
				<ul className="grid gap-x-16 md:grid-cols-2">
					{contacts.map(({ label, value, href, Icon }, i) => (
						<li key={label}>
							<Reveal y={20} delay={i * 0.1}>
								<a
									href={href}
									className="group flex items-center gap-5 border-b border-dashed border-secondary/40 py-6"
								>
									<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-secondary text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary">
										<Icon className="h-6 w-6" />
									</span>
									<span>
										<span className="block text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
											{label}
										</span>
										<span
											dir="ltr"
											className="mt-1 block text-xl font-bold text-primary group-hover:underline dark:text-Muharram_primary md:text-2xl"
										>
											{value}
										</span>
									</span>
								</a>
							</Reveal>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}
