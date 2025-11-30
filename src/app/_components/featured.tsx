// KHAT CONTEST FEATURED SECTION
"use client"

import Link from "next/link"
import Image from "next/image"
import { Palette, Award, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
export function Featured() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		const targetDate = new Date("2026-03-05T23:59:59").getTime()

		const interval = setInterval(() => {
			const now = new Date().getTime()
			const difference = targetDate - now

			if (difference <= 0) {
				clearInterval(interval)
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
			} else {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60),
				})
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="">
			<section className="relative py-20 border-b bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-Muharram_primary/5 dark:to-Muharram_primary/10 overflow-hidden my-24">
				<div className="container mx-auto px-4 relative z-10">
					<div className="flex flex-col lg:flex-row items-center gap-10">
						<div className="lg:w-1/2 text-right  space-y-6">
							<div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary px-4 py-2 rounded-full text-sm font-medium">
								<Palette className="w-4 h-4" />
								مسابقة دولية محكمة
							</div>

							<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
								مسابقة زين العابدين (عليه السلام) الدولية الأولى
								في الخط العربي
							</h2>

							<p className="text-lg text-gray-700 leading-relaxed">
								انطلق في رحلة فنية تستلهم تراث الإمام زين
								العابدين (عليه السلام) عبر جماليات الخط العربي.
								سجل الآن لفرصة الفوز بجوائز قيمة وتقديم إبداعك
								على منصة عالمية.
							</p>

							<div className="flex flex-wrap gap-4 mt-6">
								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
									<Award className="w-5 h-5 text-primary dark:text-Muharram_primary" />
									<span className="font-medium">
										جوائز تصل إلى ٣,٠٠٠,٠٠٠ د.ع
									</span>
								</div>
								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
									<Calendar className="w-5 h-5 text-primary dark:text-Muharram_primary" />
									<span className="font-medium">
										آخر موعد: ٥ / ٣ / ٢٠٢٦
									</span>
								</div>
							</div>

							<div className=" flex flex-col  md:flex-row   justify-between items-center">
								<div className="flex flex-wrap gap-4 mt-6 mb-10 justify-center lg:justify-start">
									<Link
										href="/contests/khat#apply"
										className="bg-primary dark:bg-Muharram_primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
									>
										سجل الآن
									</Link>
									<Link
										href="/contests/khat"
										className="border-2 border-primary dark:border-Muharram_primary dark:text-Muharram_primary text-primary hover:bg-primary/10 dark:hover:bg-Muharram_primary/10 px-8 py-3 rounded-xl font-medium transition-colors"
									>
										التفاصيل
									</Link>
								</div>

								<div className="relative mb-10 md:top-0 lg:top-10 lg:right-16  text-white flex flex-col items-center justify-cente	animate-fade-in-up  ">
									<h3 className="text-md font-bold text-primary dark:text-Muharram_primary mb-4">
										الوقت المتبقي :
									</h3>
									<div className="flex gap-4 justify-center text-sm lg:justify-end">
										{[
											{
												label: "ثانية",
												value: timeLeft.seconds,
											},
											{
												label: "دقيقة",
												value: timeLeft.minutes,
											},
											{
												label: "ساعة",
												value: timeLeft.hours,
											},
											{
												label: "يوم",
												value: timeLeft.days,
											},
										].map((unit, idx) => (
											<div
												key={idx}
												className="bg-white  rounded-xl shadow-md px-4 py-3 text-center min-w-[30px] lg:min-w-[60px] "
											>
												<div className="text-sm md:text-base font-bold text-primary dark:text-Muharram_primary">
													{unit.value}
												</div>
												<div className="text-sm md:text-base font-bold text-gray-600 dark:text-gray">
													{unit.label}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Image */}
						<div className="xs:w-2/4 sm:w-1/4 mx-auto relative">
							<div className="relative w-60 xs:w-80 xs:left-10 sm:left-32 md:left-24 lg:left-10 xl:right-8 rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
								<Image
									src="/contests/khat/landing.jpg"
									alt="مسابقة الخط العربي"
									width={600}
									height={400}
									className="w-full  h-auto object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
								<div className="absolute bottom-6 right-6 text-white">
									<h3 className="text-xl font-bold">
										مسابقة دولية
									</h3>
									<p className="text-sm">
										بإشراف نخبة من خطاطي العالم
									</p>
								</div>
							</div>

							{/* Prize Awards */}
							<div className="absolute -top-8 -left-4 flex items-end gap-4">
								{/* 3rd Place - Left */}
								<div className="bg-white p-3 rounded-xl shadow-lg border-2 border-primary/40 dark:border-Muharram_secondary/40">
									<div className="bg-primary/10 dark:bg-Muharram_secondary/10 border border-primary/60 dark:border-Muharram_secondary/60 text-primary dark:text-Muharram_secondary font-bold px-2 py-1 rounded-full text-xs">
										المركز الثالث
									</div>
									<div className="mt-1 font-bold text-lg text-center text-primary dark:text-Muharram_secondary">
										١,٠٠٠,٠٠٠
									</div>
									<div className="text-xs text-primary/70 dark:text-Muharram_secondary/70 text-center">
										د.ع
									</div>
								</div>

								{/* 1st Place - Middle (Largest) */}
								<div className="bg-white p-4 rounded-xl shadow-xl border-3 border-primary dark:border-Muharram_primary scale-110 -translate-y-6">
									<div className="bg-primary/10 dark:bg-Muharram_primary/10 border-2 border-primary dark:border-Muharram_primary text-primary dark:text-Muharram_primary font-bold px-3 py-1 rounded-full text-sm">
										🥇 المركز الأول
									</div>
									<div className="mt-2 font-bold text-2xl text-center text-primary dark:text-Muharram_primary">
										٣,٠٠٠,٠٠٠
									</div>
									<div className="text-sm text-primary/80 dark:text-Muharram_primary/80 text-center font-medium">
										د.ع
									</div>
								</div>

								{/* 2nd Place - Right */}
								<div className="bg-white p-3 rounded-xl shadow-lg border-2 border-primary/60 dark:border-Muharram_secondary/60 scale-100">
									<div className="bg-primary/15 dark:bg-Muharram_secondary/15 border border-primary/80 dark:border-Muharram_secondary/80 text-primary dark:text-Muharram_secondary font-bold px-2 py-1 rounded-full text-xs">
										المركز الثاني
									</div>
									<div className="mt-1 font-bold text-lg text-center text-primary dark:text-Muharram_secondary">
										٢,٠٠٠,٠٠٠
									</div>
									<div className="text-xs text-primary/70 dark:text-Muharram_secondary/70 text-center">
										د.ع
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

// SAJJADIYAH TENT FEATURED SECTION
// import Image from "next/image"
// import { PencilRuler, Gift, Sparkles } from "lucide-react"

// export function Featured() {
// 	return (
// 		<section className="relative py-16 border-b-2 bg-gradient-to-b from-transparent via-Muharram_primary/40 to-Muharram_primary/40 dark:via-transparent dark:to-Muharram_secondary/15 overflow-hidden my-20">
// 			<div className="container mx-auto px-4 relative z-10">
// 				<div className="flex flex-col lg:flex-row items-center gap-10">
// 					<div className="lg:w-1/2 text-right space-y-6">
// 						<div className="inline-flex items-center gap-2 text-primary dark:bg-Muharram_secondary/10 dark:text-Muharram_primary px-4 py-2 rounded-full text-sm font-medium">
// 							<Sparkles className="w-4 h-4" />
// 							فعاليات الخيمة السجادية
// 						</div>

// 						<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
// 							الخيمة السجادية في زيارة الأربعين: منارة ثقافية
// 							وتربوية على طريق يا حسين عليه السلام بين النجف
// 							وكربلاء
// 						</h2>

// 						<p className="text-lg text-gray-700 leading-relaxed">
// 							برامج ثقافية وتربوية تقام سنوياً على طريق زيارة
// 							الأربعين بين النجف الأشرف وكربلاء المقدسة، تحتفي
// 							بفكر أهل البيت (عليهم السلام) وسيرة الإمام زين
// 							العابدين (عليه السلام).
// 						</p>
// 						<p className="text-lg text-gray-700 leading-relaxed">
// 							تقدم الخيمة برامج متنوعة تشمل المحاضرات، الفعاليات
// 							التفاعلية، وورش العمل، وبرامج اخرى موجهة لجميع فئات
// 							الزائرين (رجالاً، نساءً، صغاراً، وكباراً)، بهدف
// 							تعميق الوعي الديني وترسيخ القيم الإيمانية والإنسانية
// 							في رحلة الزيارة.&quot;
// 						</p>
// 						<div className="flex flex-wrap gap-4 mt-6">
// 							<div className="flex items-center gap-2 bg-transparent border border-Muharram_secondary px-4 py-2 rounded-lg shadow-sm">
// 								<Gift className="w-5 h-5 text-yellow-600 dark:text-Muharram_secondary" />
// 								<span className="font-medium">
// 									هدايا وجوائز عبر القرعة
// 								</span>
// 							</div>
// 							<div className="flex items-center gap-2 bg-transparent border border-Muharram_secondary px-4 py-2 rounded-lg shadow-sm">
// 								<PencilRuler className="w-5 h-5 text-yellow-600 dark:text-Muharram_secondary" />
// 								<span className="font-medium">
// 									ورش رسم، مواهب، وركن للفتيات
// 								</span>
// 							</div>
// 						</div>
// 						{/*  view more button
// 						<div className="w-1/2 h-[1px] bg-gradient-to-t from-transparent via-slate-500 to-transparent"></div>

// 						<div className="flex flex-wrap gap-4 mt-8">
// 							<Link
// 								href="/kids-platform"
// 								className="border-2 border-primary dark:border-primary dark:text-primary text-yellow-700 hover:scale-105 px-8 py-3 rounded-xl font-medium duration-150"
// 							>
// 								تفاصيل البرنامج
// 							</Link>
// 						</div> */}
// 					</div>

// 					{/* Image */}
// 					<div className="xs:w-2/4 mx-auto relative">
// 						<div className="relative rounded-2xl scale-150 overflow-hidden  transform -rotate-0 hover:rotate-3 transition-transform duration-500">
// 							<Image
// 								src="/contests/khayma/logo.svg"
// 								alt="المنصة السجادية للناشئة"
// 								width={1200}
// 								height={800}
// 								className="w-full  h-auto object-cover"
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }
