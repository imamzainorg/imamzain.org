import Image from "next/image"
import Link from "next/link"
import { Award, Calendar, ArrowLeft } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import {
	SectionTitle,
	TitleIcon,
	leadText,
	outlineButton,
	photoFrame,
	shieldPanel,
	whiteButton,
} from "@/components/brand"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"

const intro =
	"مسابقات مؤسسة الإمام زين العابدين عليه السلام في تراث الإمام السجاد: مسابقة قبسات الثقافية، ومسابقة الكتاب البحثية، ومسابقة الخط العربي الدولية."

const contestData = [
	{
		id: 3,
		title: "قبسات من حياة الإمام السجاد (عليه السلام)",
		description:
			"خمسون سؤالاً مستخرجة من كتاب 'قبسات من حياة الإمام زين العابدين (عليه السلام)'، تختبر إلمام المشاركين بسيرة الإمام وأدعيته وعلومه",
		category: "ثقافية",
		deadline: "2026/8/29 م",
		prize: "مكافآت تشجيعية للعشرة الأوائل",
		status: "closed",
		link: "/contests/qatuf-sajjadiyya-cultural-competition",
		image: "/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg",
	},
	{
		id: 2,
		title: "مسابقة كتاب 1447هـ",
		description:
			"مسابقة بحثية تركز على دراسة وتحليل التراث الإسلامي في القرن الخامس عشر الهجري",
		category: "بحثية",
		deadline: "2025/4/10 م",
		prize: " 2,000,000 دينار عراقي",
		status: "closed",
		link: "/contests/kitab",
		image: "/contests/kitab/hero.jpg",
	},
	{
		id: 1,
		title: "مسابقة الإمام زين العابدين (عليه السلام) الدولية الاولى في الخط العربي",
		description:
			"مسابقة تهدف إلى إحياء فن الخط العربي وتطوير مهارات الخطاطين في كتابة النصوص التراثية",
		category: "فنية",
		deadline: "2025/4/11 م",
		prize: " 3,000,000 دينار عراقي",
		status: "closed",
		link: "/contests/khat",
		image: "/contests/khat/landing.jpg",
	},
]

export default function Page() {
	const active = contestData.filter((c) => c.status === "active").length
	const closed = contestData.length - active

	return (
		<div className="container pb-12">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المسابقات", url: "#" },
				]}
			/>

			<PageHeader title="مسابقات في تراث الإمام زين العابدين (عليه السلام)" text={intro} />

			<section className="pt-24">
				<SectionTitle
					title="قائمة المسابقات"
					text="الجارية والمنتهية"
					className="mb-16"
					action={
						<p className="flex items-center gap-3 text-sm font-semibold text-gray-600 md:text-base">
							<span>{active} نشطة</span>
							<span aria-hidden className="h-1.5 w-1.5 rounded-full bg-secondary" />
							<span>{closed} منتهية</span>
						</p>
					}
				/>

				<ul className="space-y-24">
					{contestData.map((contest, index) => {
						const isActive = contest.status === "active"
						return (
							<li key={contest.id}>
								<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
									<Reveal
										x={index % 2 === 0 ? -60 : 60}
										y={0}
										className={index % 2 === 0 ? "lg:order-2" : ""}
									>
										<Link
											href={contest.link}
											aria-label={contest.title}
											className={`${photoFrame} group relative mx-2 block aspect-[4/3] shadow-xl`}
										>
											<Image
												src={contest.image}
												alt={contest.title}
												width={800}
												height={600}
												priority={index === 0}
												sizes="(max-width: 1024px) 100vw, 45vw"
												className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
											/>
										</Link>
									</Reveal>

									<Reveal x={index % 2 === 0 ? 60 : -60} y={0} delay={0.1}>
										<p className="flex items-center gap-3 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary md:text-base">
											<TitleIcon className="w-3" />
											{contest.category}
											<span aria-hidden>·</span>
											{isActive ? "جارية" : "منتهية"}
										</p>
										<h3 className="mt-3 text-2xl font-bold leading-snug text-primary dark:text-Muharram_primary md:text-3xl md:leading-snug">
											{contest.title}
										</h3>
										<p className={`mt-4 ${leadText}`}>{contest.description}</p>

										<dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
											<div>
												<dt className="flex items-center gap-2 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
													<Calendar className="h-4 w-4" />
													آخر موعد
												</dt>
												<dd className="mt-1 text-lg text-gray-800">{contest.deadline}</dd>
											</div>
											<div>
												<dt className="flex items-center gap-2 text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
													<Award className="h-4 w-4" />
													الجائزة
												</dt>
												<dd className="mt-1 text-lg text-gray-800">{contest.prize}</dd>
											</div>
										</dl>

										<Link href={contest.link} className={`${outlineButton} mt-8`}>
											{isActive ? "تفاصيل المسابقة" : "عرض المسابقة"}
											<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
										</Link>
									</Reveal>
								</div>
							</li>
						)
					})}
				</ul>
			</section>

			<section className="pt-28">
				<Reveal>
					<div
						className={`${shieldPanel} flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10`}
					>
						<div>
							<h2 className="text-2xl font-extrabold md:text-3xl">لديك سؤال حول إحدى المسابقات؟</h2>
							<p className="mt-2 text-lg text-white/80">تواصل معنا وسنجيب على استفساراتك</p>
						</div>
						<Link href="/services" className={`${whiteButton} shrink-0`}>
							تواصل معنا
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						</Link>
					</div>
				</Reveal>
			</section>
		</div>
	)
}
