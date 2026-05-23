"use client"

import Breadcrumbs from "@/components/breadcrumb"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Trophy, Award, ArrowLeft } from "lucide-react"

export default function Page() {
	const contestData = [
		{
			id: 3,
			title: "قبسات من حياة الإمام السجاد (عليه السلام)",
			description:
				"خمسون سؤالاً مستخرجة من كتاب 'قبسات من حياة الإمام زين العابدين (عليه السلام)'، تختبر إلمام المشاركين بسيرة الإمام وأدعيته وعلومه",
			category: "ثقافية",
			deadline: "مفتوحة",
			prize: "مكافآت تشجيعية للعشرة الأوائل",
			status: "active",
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

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "#" },
					]}
				/>

				{/* Hero Section */}
				<section className="relative py-8 md:py-12">
					<div className="text-center max-w-4xl mx-auto">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 !leading-snug"
						>
							مسابقات في تراث{" "}
							<span className="text-primary">
								الإمام زين العابدين
							</span>{" "}
							<span className="text-slate-600">
								(عليه السلام)
							</span>
						</motion.h1>
					</div>
				</section>

				{/* Contests List */}
				<section className="py-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="flex items-end justify-between gap-4 flex-wrap mb-8"
					>
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-slate-800">
								قائمة المسابقات
							</h2>
							<p className="text-subtitle text-slate-600 mt-1">
								الجارية والمنتهية
							</p>
						</div>
						<div className="flex items-center gap-2 flex-wrap">
							<span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-green-200">
								<span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
								{
									contestData.filter(
										(c) => c.status === "active",
									).length
								}{" "}
								نشطة
							</span>
							<span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm font-medium ring-1 ring-slate-200">
								<span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
								{
									contestData.filter(
										(c) => c.status !== "active",
									).length
								}{" "}
								منتهية
							</span>
						</div>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						{contestData.map((contest, index) => (
							<motion.div
								key={contest.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
								className="group relative"
							>
								<Link
									href={contest.link}
									aria-label={contest.title}
									className="block h-full"
								>
									<div
										className={`h-full flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
											contest.status === "active"
												? "shadow-xl shadow-primary/10 ring-2 ring-primary/30 hover:shadow-2xl hover:shadow-primary/20"
												: "shadow-md border border-slate-200 hover:shadow-lg opacity-95"
										}`}
									>
										{/* Contest Image */}
										<div className="relative h-56 overflow-hidden">
											<Image
												src={contest.image}
												alt={contest.title}
												className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
													contest.status === "active"
														? ""
														: "grayscale"
												}`}
												height={224}
												width={400}
												priority={index === 0}
											/>
											{/* Top + bottom legibility gradients */}
											<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />

											{/* Status pill - top right */}
											<div className="absolute top-4 right-4 z-20">
												<span
													className={`inline-flex items-center gap-1.5 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white ${
														contest.status === "active"
															? "bg-green-600/70 ring-1 ring-green-300/60"
															: "bg-red-600/70 ring-1 ring-red-300/60"
													}`}
												>
													<div
														className={`w-1.5 h-1.5 rounded-full ${
															contest.status ===
															"active"
																? "bg-green-300 animate-pulse"
																: "bg-red-300"
														}`}
													/>
													{contest.status === "active"
														? "نشط"
														: "غير نشط"}
												</span>
											</div>

											{/* Category chip - bottom left */}
											<div className="absolute bottom-4 left-4 z-20">
												<span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white ring-1 ring-white/30">
													<Trophy className="h-3.5 w-3.5" />
													{contest.category}
												</span>
											</div>
										</div>

										{/* Contest Content */}
										<div className="p-7 space-y-5 flex flex-col flex-1">
											<h3 className="text-note leading-snug font-bold text-slate-800 line-clamp-3">
												{contest.title}
											</h3>

											<p className="text-slate-600 text-subtitle leading-relaxed line-clamp-2">
												{contest.description}
											</p>

											{/* Metadata - compact row with subtle divider */}
											<div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 border-t border-slate-100 text-subtitle text-slate-600">
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-primary shrink-0" />
													<span>{contest.deadline}</span>
												</div>
												<div className="flex items-center gap-2">
													<Award className="h-4 w-4 text-primary shrink-0" />
													<span>{contest.prize}</span>
												</div>
											</div>

											{/* Action affordance (whole card is clickable) */}
											<div
												className={`mt-auto w-full text-subtitle rounded-xl py-3 px-6 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
													contest.status === "active"
														? "bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary dark:to-Muharram_secondary text-white group-hover:shadow-lg group-hover:shadow-primary/25"
														: "bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-slate-200"
												}`}
											>
												{contest.status === "active"
													? "تفاصيل المسابقة"
													: "عرض المسابقة"}
												<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</section>

				{/* Contact Banner */}
				<section className="py-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary/80 dark:to-Muharram_secondary rounded-2xl px-6 py-5 md:px-8 md:py-6 text-white flex flex-col md:flex-row items-center justify-between gap-4"
					>
						<div className="text-center md:text-right">
							<h2 className="text-lg md:text-xl font-bold">
								لديك سؤال حول إحدى المسابقات؟
							</h2>
							<p className="text-sm md:text-base opacity-90 mt-1">
								تواصل معنا وسنجيب على استفساراتك
							</p>
						</div>
						<Link
							href="/services"
							className="shrink-0 inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-xl font-semibold transition-colors"
						>
							تواصل معنا
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</motion.div>
				</section>
			</div>
		</div>
	)
}
