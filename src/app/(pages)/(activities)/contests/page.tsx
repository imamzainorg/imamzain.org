"use client"

import Breadcrumbs from "@/components/breadcrumb"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, Trophy, Clock, Award, ArrowLeft } from "lucide-react"

export default function Page() {
	const contestData = [
		{
			id: 1,
			title: "مسابقة الخط العربي",
			subtitle: "فن الخط العربي الأصيل",
			description:
				"مسابقة تهدف إلى إحياء فن الخط العربي وتطوير مهارات الخطاطين في كتابة النصوص التراثية",
			category: "فنية",
			deadline: " ٥ / ١ / ٢٠٢٦م",
			participants: "غير محدد",
			prize: " 3,000,000 دينار عراقي",
			status: "active",
			duration: "8 أشهر",
			link: "/contests/khat",
			image: "/contests/khat/landing.jpg",
		},
		{
			id: 2,
			title: "مسابقة كتاب 1447هـ",
			subtitle: "البحث في التراث الإسلامي",
			description:
				"مسابقة بحثية تركز على دراسة وتحليل التراث الإسلامي في القرن الخامس عشر الهجري",
			category: "بحثية",
			deadline: "15 رمضان 1447هـ",
			participants: "غير محدد",
			prize: " 2,000,000 دينار عراقي",
			status: "active",
			duration: "مفتوحة",
			link: "/contests/kitab",
			image: "/contests/kitab/hero.jpg",
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
				<section className="relative py-16 md:py-24">
					<div className="text-center">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 !leading-snug"
						>
							مسابقات في تراث
							<span className="block text-primary">
								الإمام زين العابدين
							</span>
							<span className="text-3xl md:text-4xl lg:text-5xl block mt-2 text-slate-600">
								(عليه السلام)
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
						>
							نفتح أبواب المشاركة لكل من يسعى لنشر المعرفة، إحياء
							التراث، والتعبير عن الولاء عبر مسابقات فكرية، بحثية،
							وفنية متميزة.
						</motion.p>
					</div>
				</section>

				{/* Active Contests Section */}
				<section className="py-8">
					<div className="text-center mb-12">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
						>
							المسابقات الجارية
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-lg text-slate-600 max-w-2xl mx-auto"
						>
							اكتشف المسابقات المتاحة حالياً وشارك في إثراء التراث
							الإسلامي
						</motion.p>
					</div>

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
								<div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
									{/* Contest Image */}
									<div className="relative h-48 overflow-hidden">
										<div
											className={`absolute inset-0 bg-gradient-to-br ${
												contest.status === "active"
													? "from-emerald-500 to-teal-600 dark:from-Muharram_primary dark:to-Muharram_secondary"
													: "from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"
											} opacity-90 z-10`}
										/>
										<Image
											src={contest.image}
											alt={contest.title}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											height={200}
											width={400}
										/>
										<div className="absolute top-4 left-4 z-20">
											<span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white">
												<Trophy className="h-4 w-4" />
												{contest.category}
											</span>
										</div>
										<div className="absolute top-4 right-4 z-20">
											<span className="inline-flex items-center gap-1 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-white">
												<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
												{contest.status === "active"
													? "نشط"
													: "غير نشط"}
											</span>
										</div>
									</div>

									{/* Contest Content */}
									<div className="p-6">
										<h3 className="text-xl font-bold text-slate-800 mb-2">
											{contest.title}
										</h3>
										<p className="text-sm text-primary font-medium mb-3">
											{contest.subtitle}
										</p>
										<p className="text-slate-600 mb-6 line-clamp-3">
											{contest.description}
										</p>

										{/* Contest Details */}
										<div className="grid grid-cols-2 gap-4 mb-6">
											<div className="flex items-center gap-2 text-sm text-slate-600">
												<Calendar className="h-4 w-4 text-primary" />
												<span>{contest.deadline}</span>
											</div>
											<div className="flex items-center gap-2 text-sm text-slate-600">
												<Users className="h-4 w-4 text-primary" />
												<span>
													{contest.participants} من
													المشاركين
												</span>
											</div>
											<div className="flex items-center gap-2 text-sm text-slate-600">
												<Award className="h-4 w-4 text-primary" />
												<span>{contest.prize}</span>
											</div>
											<div className="flex items-center gap-2 text-sm text-slate-600">
												<Clock className="h-4 w-4 text-primary" />
												<span>{contest.duration}</span>
											</div>
										</div>

										{/* Action Button */}
										<Link href={contest.link}>
											<button className="w-full bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary dark:to-Muharram_secondary text-white rounded-xl py-3 px-6 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group">
												تفاصيل المسابقة
												<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
											</button>
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<section className="py-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary/80 dark:to-Muharram_secondary rounded-3xl p-8 md:p-12 text-center text-white"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							هل تريد المشاركة؟
						</h2>
						<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
							انضم إلى مجتمع الباحثين والمبدعين في التراث الإسلامي
							وشارك في إثراء المعرفة
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/services"
								className="border-2 border-white dark:border-black text-white px-8 py-3 rounded-xl font-medium hover:bg-white hover:text-primary transition-colors"
							>
								تواصل معنا
							</Link>
						</div>
					</motion.div>
				</section>
			</div>
		</div>
	)
}
