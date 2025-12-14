"use client"

import Breadcrumbs from "@/components/breadcrumb"
import SliderHero from "./_components/slider-hero"
import Link from "next/link"
import {
	BadgeCheck,
	Crown,
	FileBadge,
	NewspaperIcon,
	GraduationCapIcon,
	BookCopyIcon,
	ArrowLeft,
	Sparkles,
	type LucideIcon,
} from "lucide-react"
import { motion } from "framer-motion"

interface SubLink {
	label: string
	href: string
}

interface Section {
	title: string
	description: string
	href: string
	icon: LucideIcon
	subLinks?: SubLink[]
}

interface Reward {
	title: string
	amount: string
	subtitle: string
	icon: React.ReactNode
}

const sections: Section[] = [
	{
		title: "بحوث المؤتمرات",
		description: "استعرض البحوث المقدمة في المؤتمرات العلمية المختلفة.",
		href: "/research/scientific-platform?type=conferences",
		icon: NewspaperIcon,
		subLinks: [
			{
				label: "المؤتمر العلمي الدولي الأول",
				href: "/research/scientific-platform?type=conferences",
			},
		],
	},
	{
		title: "بحوث التخرج",
		description: "بحوث التخرج لطلبة البكالوريوس والماجستير والدكتوراه.",
		href: "/research/scientific-platform?type=student-research",
		icon: GraduationCapIcon,
		subLinks: [
			{
				label: "بكالوريوس",
				href: "/research/scientific-platform?type=student-research&degree=bachelor",
			},
			{
				label: "ماجستير",
				href: "/research/scientific-platform?type=student-research&degree=master",
			},
			{
				label: "دكتوراه",
				href: "/research/scientific-platform?type=student-research&degree=phd",
			},
		],
	},
	{
		title: "الدوريات العربية",
		description: "اطّلع على مجموعة من الدوريات والمجلات العربية المحكمة.",
		href: "/research/scientific-platform?type=journals",
		icon: BookCopyIcon,
		subLinks: [
			{
				label: "دوريات عامة",
				href: "/research/scientific-platform?type=journals",
			},
		],
	},
]

const rewards: Reward[] = [
	{
		title: "البحوث المقبولة",
		amount: "100,000 د.ع.",
		subtitle: "كل بحث ينال المقبولية على ان لا يقل عن 15 صفحة",
		icon: (
			<BadgeCheck
				size={70}
				strokeWidth={1}
				className="mb-5"
				color="#BA9560"
				aria-hidden="true"
			/>
		),
	},
	{
		title: "البحوث المتميزة",
		amount: "150,000 د.ع.",
		subtitle: "كل كتاب يحصل على تميز",
		icon: (
			<Crown
				size={70}
				strokeWidth={1}
				className="mb-5"
				color="#BA9560"
				aria-hidden="true"
			/>
		),
	},
	{
		title: "المقالة",
		amount: "25,000 د.ع.",
		subtitle: "لكل مقالة متميزة",
		icon: (
			<FileBadge
				size={70}
				strokeWidth={1}
				className="mb-5"
				color="#BA9560"
				aria-hidden="true"
			/>
		),
	},
]

const notes = [
	"سعر صفحة الكتاب (تأليف، تحقيق) 5,000 د.ع.",
	"المكافئات اعلاه تعني في البحوث والكتب التي تأتي من خلال الاستكتاب",
	"البحوث المقدمة للمؤسسة تخصص 5% من مجموع المطبوع هدية للمؤلف",
]

const SectionCard = ({
	section,
	index,
}: {
	section: Section
	index: number
}) => {
	const hasSubLinks = section.subLinks && section.subLinks.length > 0

	return (
		<motion.article
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
			className="relative bg-gradient-to-br from-white to-gray-50/50 dark:from-Muharram_primary dark:to-Muharram_primary/80 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden group/card backdrop-blur-sm border border-gray-100/20 dark:border-Muharram_secondary/10"
			whileHover={{ scale: 1.03, y: -8 }}
		>
			{/* Decorative gradient overlay */}
			<div
				className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
				aria-hidden="true"
			/>

			<Link
				href={section.href}
				className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-3xl relative z-10"
				aria-label={`انتقل إلى ${section.title}`}
			>
				<div className="p-8 flex flex-col items-center text-center">
					<motion.div
						whileHover={{ scale: 1.15, rotate: 5 }}
						className="relative mb-6"
						role="img"
						aria-label={section.title}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<div
							className="absolute inset-0 bg-primary/20 dark:bg-[#BA9560]/30 blur-2xl scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
							aria-hidden="true"
						/>
						<section.icon
							strokeWidth={0.87}
							className="text-primary dark:text-[#BA9560] w-20 lg:w-24 h-auto relative z-10 drop-shadow-md"
							aria-hidden="true"
						/>
					</motion.div>

					<div className="flex items-center justify-center gap-2 mb-3">
						<h2 className="text-body font-bold text-primary dark:text-white">
							{section.title}
						</h2>
					</div>

					<p className="text-gray-600 text-note leading-6 xl:leading-7 2xl:leading-8 dark:text-gray-300 mb-4 transition-colors duration-300 group-hover/card:text-gray-800 dark:group-hover/card:text-gray-100">
						{section.description}
					</p>
				</div>
			</Link>

			{hasSubLinks && (
				<nav
					className="px-6 pb-6 relative z-10"
					aria-label={`الأقسام الفرعية ل${section.title}`}
				>
					<div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
						<h3 className="text-subtitle font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">
							أقسام فرعية
						</h3>
						<ul className="flex flex-col gap-2">
							{section.subLinks!.map((sub, i) => (
								<motion.li
									key={i}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1 }}
									whileHover={{ x: -5 }}
								>
									<Link
										href={sub.href}
										className="flex items-center justify-between w-full py-3 px-4 rounded-xl bg-gradient-to-l from-gray-50 to-white hover:from-primary/5 hover:to-primary/10 dark:from-Muharram_secondary/50 dark:to-Muharram_secondary/30 dark:hover:from-Muharram_secondary/70 dark:hover:to-Muharram_secondary/50 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-300 group/link focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border border-transparent hover:border-primary/20 dark:hover:border-[#BA9560]/30"
										aria-label={`انتقل إلى ${sub.label}`}
									>
										<span className="text-subtitle font-medium">
											{sub.label}
										</span>
										<motion.div
											className="opacity-0 group-hover/link:opacity-100 transition-opacity"
											whileHover={{ x: -3 }}
											aria-hidden="true"
										>
											<ArrowLeft className="w-4 h-4" />
										</motion.div>
									</Link>
								</motion.li>
							))}
						</ul>
					</div>
				</nav>
			)}
		</motion.article>
	)
}

const RewardCard = ({ reward, index }: { reward: Reward; index: number }) => (
	<motion.article
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
		whileHover={{ scale: 1.06, y: -8 }}
		className="relative text-center flex flex-col items-center w-72 p-8 dark:text-Muharram_secondary rounded-3xl bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-Muharram_primary/40 dark:via-Muharram_primary/30 dark:to-Muharram_primary/20 text-black shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 dark:border-Muharram_secondary/20 backdrop-blur-sm group/reward overflow-hidden"
	>
		{/* Decorative shine effect */}
		<div
			className="absolute inset-0 bg-gradient-to-br from-[#BA9560]/10 via-transparent to-transparent opacity-0 group-hover/reward:opacity-100 transition-opacity duration-500"
			aria-hidden="true"
		/>

		{/* Sparkle decoration */}
		<motion.div
			className="absolute top-4 right-4 text-[#BA9560]/30"
			animate={{ rotate: 360 }}
			transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
			aria-hidden="true"
		>
			<Sparkles className="w-6 h-6" />
		</motion.div>

		<motion.div
			role="img"
			aria-label={reward.title}
			whileHover={{ scale: 1.1, rotate: 5 }}
			transition={{ type: "spring", stiffness: 300 }}
			className="relative z-10"
		>
			{reward.icon}
		</motion.div>
		<h3 className="text-note lg:text-base font-bold p-2 relative z-10">
			{reward.title}
		</h3>
		<p
			className="text-xl lg:text-2xl p-2 font-bold text-[#BA9560] dark:text-[#BA9560] relative z-10"
			aria-label={`المبلغ: ${reward.amount}`}
		>
			{reward.amount}
		</p>
		<p className="text-subtitle lg:text-sm p-1 sm:leading-6 xl:leading-7 text-gray-600 dark:text-gray-400 relative z-10">
			{reward.subtitle}
		</p>
	</motion.article>
)

export default function Page() {
	return (
		<div className="container">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "بوابة البحث العلمي", url: "/research" },
				]}
			/>

			<SliderHero />

			<section
				className="py-20 relative"
				aria-labelledby="archiving-title"
			>
				<div
					className="absolute inset-0 pointer-events-none overflow-hidden"
					aria-hidden="true"
				>
					<div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-[#BA9560]/5 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 dark:bg-[#BA9560]/5 rounded-full blur-3xl" />
				</div>

				<motion.h1
					id="archiving-title"
					className="text-title lg:text-5xl font-bold text-center text-primary dark:text-Muharram_primary mb-16 relative z-10"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					ارشيف البحوث العلمية
					<div className="w-3/5 mx-auto mt-8 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
				</motion.h1>
				<div
					className="gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 relative z-10"
					role="list"
				>
					{sections.map((section, index) => (
						<SectionCard
							key={section.title}
							section={section}
							index={index}
						/>
					))}
				</div>
			</section>

			<motion.div
				className="flex justify-between items-center w-full pb-14 relative"
				role="separator"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5 }}
			>
				<hr
					className="border-2 border-[#bb9661]/30 dark:border-Muharram_secondary/30 w-full"
					aria-hidden="true"
				/>
				<Link
					href="/research/send-research"
					className="relative px-16 py-5 text-white mx-10 text-body lg:text-lg font-semibold bg-gradient-to-l from-primary via-primary to-[#BA9560] hover:from-primary/95 hover:via-primary/90 hover:to-[#BA9560]/95 dark:from-Muharram_primary dark:via-Muharram_primary dark:to-[#BA9560] dark:hover:from-Muharram_primary/95 dark:hover:via-Muharram_primary/90 dark:hover:to-[#BA9560]/95 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 shadow-lg hover:shadow-xl overflow-hidden group"
					aria-label="انتقل إلى صفحة تقديم البحث"
				>
					انشر بحثك
					{/* Button shine effect */}
					<div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
						aria-hidden="true"
					/>
				</Link>
				<hr
					className="border-2 border-[#bb9661]/30 dark:border-Muharram_secondary/30 w-full"
					aria-hidden="true"
				/>
			</motion.div>

			<section className="py-14 relative" aria-labelledby="rewards-title">
				{/* Decorative background */}
				<div
					className="absolute inset-0 pointer-events-none overflow-hidden"
					aria-hidden="true"
				>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BA9560]/5 dark:bg-[#BA9560]/10 rounded-full blur-3xl" />
				</div>

				<motion.h2
					id="rewards-title"
					className="text-primary dark:text-Muharram_primary text-title lg:text-5xl font-bold text-center mb-4 relative z-10"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					المكافئات المالية
				</motion.h2>
				<motion.p
					className="text-center text-gray-600 dark:text-gray-400 text-subtitle lg:text-base mb-12 relative z-10"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					نقدّر جهودكم البحثية ونكافئ التميز العلمي
				</motion.p>
				<div
					className="flex flex-wrap justify-center gap-10 mt-12 relative z-10"
					role="list"
				>
					{rewards.map((reward, index) => (
						<RewardCard
							key={reward.title}
							reward={reward}
							index={index}
						/>
					))}
				</div>

				<motion.aside
					className="relative border-r-4 border-[#BA9560]/40 dark:border-[#BA9560]/60 pr-6 italic max-w-2xl mx-auto mt-16 bg-gradient-to-l from-transparent via-gray-50/30 to-transparent dark:via-Muharram_primary/10 py-6 rounded-lg"
					aria-labelledby="notes-title"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.6 }}
				>
					<h3
						id="notes-title"
						className="w-full text-right font-bold mt-2 mb-4 p-2 text-note text-[#BA9560] dark:text-[#BA9560] flex items-center gap-2 justify-end"
					>
						<span>ملاحظات مهمة</span>
						<Sparkles className="w-5 h-5" aria-hidden="true" />
					</h3>
					<ol className="list-arabic-indic text-subtitle lg:text-note text-right text-gray-700 dark:text-gray-300 space-y-3 px-4 sm:px-6 md:px-8 lg:px-10 leading-relaxed">
						{notes.map((note, index) => (
							<motion.li
								key={index}
								className="leading-relaxed"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.7 + index * 0.1 }}
							>
								{note}
							</motion.li>
						))}
					</ol>
				</motion.aside>
			</section>
		</div>
	)
}
