//
// KHAT CONTEST FEATURED SECTION
//
//
// import Link from "next/link"
// import Image from "next/image"
// import { Palette, Award, Calendar } from "lucide-react"

// export function Featured() {
// 	return (
// 		<div className="">
// 			<section className="relative py-16 border-b-2 bg-gradient-to-b from-transparent via-primary/5 to-primary/20 dark:via-Muharram_primary/5 dark:to-Muharram_primary/20  overflow-hidden my-20">
// 				<div className="container mx-auto px-4 relative z-10">
// 					<div className="flex flex-col lg:flex-row items-center gap-10">
// 						<div className="lg:w-1/2 text-right space-y-6">
// 							<div className="inline-flex items-center gap-2 bg-primary/10 text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary px-4 py-2 rounded-full text-sm font-medium">
// 								<Palette className="w-4 h-4" />
// 								مسابقة دولية محكمة
// 							</div>

// 							<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
// 								مسابقة الإمام زين العابدين الدولية الأولى في
// 								الخط العربي
// 							</h2>

// 							<p className="text-lg text-gray-700 leading-relaxed">
// 								انطلق في رحلة فنية تستلهم تراث الإمام زين
// 								العابدين (عليه السلام) عبر جماليات الخط العربي.
// 								سجل الآن لفرصة الفوز بجوائز قيمة وتقديم إبداعك
// 								على منصة عالمية.
// 							</p>

// 							<div className="flex flex-wrap gap-4 mt-6">
// 								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
// 									<Award className="w-5 h-5 text-primary dark:text-Muharram_primary" />
// 									<span className="font-medium">
// 										جوائز تصل إلى ٣,٠٠٠,٠٠٠ د.ع
// 									</span>
// 								</div>
// 								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
// 									<Calendar className="w-5 h-5 text-primary dark:text-Muharram_primary" />
// 									<span className="font-medium">
// 										آخر موعد: ٥ / ١ / ٢٠٢٦
// 									</span>
// 								</div>
// 							</div>

// 							<div className="flex flex-wrap gap-4 mt-8">
// 								<Link
// 									href="/contests/khat#apply"
// 									className="bg-primary dark:bg-Muharram_primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
// 								>
// 									سجل الآن
// 								</Link>
// 								<Link
// 									href="/contests/khat"
// 									className="border-2 border-primary dark:border-Muharram_primary dark:text-Muharram_primary text-primary hover:bg-primary/10 dark:hover:bg-Muharram_primary/10 px-8 py-3 rounded-xl font-medium transition-colors"
// 								>
// 									اكتشف التفاصيل
// 								</Link>
// 							</div>
// 						</div>

// 						{/* Image */}
// 						<div className="xs:w-2/4 sm:w-1/4 mx-auto relative">
// 							<div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
// 								<Image
// 									src="/contests/khat/landing.jpg"
// 									alt="مسابقة الخط العربي"
// 									width={600}
// 									height={400}
// 									className="w-full h-auto object-cover"
// 								/>
// 								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
// 								<div className="absolute bottom-6 right-6 text-white">
// 									<h3 className="text-xl font-bold">
// 										مسابقة دولية
// 									</h3>
// 									<p className="text-sm">
// 										بإشراف نخبة من خطاطي العالم
// 									</p>
// 								</div>
// 							</div>

// 							{/* Floating element */}
// 							<div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float">
// 								<div className="bg-white border border-primary dark:border-Muharram_primary text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
// 									جائزة المركز الأول
// 								</div>
// 								<div className="mt-2 font-bold text-xl">
// 									٣,٠٠٠,٠٠٠ د.ع
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</div>
// 	)
// }

// SAJJADIYAH TENT FEATURED SECTION
import Image from "next/image"
import { PencilRuler, Gift, Sparkles } from "lucide-react"

export function Featured() {
	return (
		<section className="relative py-16 border-b-2 bg-gradient-to-b from-transparent via-Muharram_primary/40 to-Muharram_primary/40 dark:via-transparent dark:to-Muharram_secondary/15 overflow-hidden my-20">
			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col lg:flex-row items-center gap-10">
					<div className="lg:w-1/2 text-right space-y-6 ">
						<div className="inline-flex items-center gap-2 text-primary dark:bg-Muharram_secondary/10 dark:text-Muharram_primary px-4 py-2 rounded-full text-sm font-medium">
							<Sparkles className="w-4 h-4" />
							فعاليات الخيمة السجادية
						</div>

						<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
							الخيمة السجادية في زيارة الأربعين: منارة ثقافية
							وتربوية على طريق يا حسين عليه السلام بين النجف
							وكربلاء
						</h2>

						<p className="text-lg text-gray-700 leading-relaxed">
							برامج ثقافية وتربوية تقام سنوياً على طريق زيارة
							الأربعين بين النجف الأشرف وكربلاء المقدسة، تحتفي
							بفكر أهل البيت (عليهم السلام) وسيرة الإمام زين
							العابدين (عليه السلام).
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							تقدم الخيمة برامج متنوعة تشمل المحاضرات، الفعاليات
							التفاعلية، وورش العمل، وبرامج اخرى موجهة لجميع فئات
							الزائرين (رجالاً، نساءً، صغاراً، وكباراً)، بهدف
							تعميق الوعي الديني وترسيخ القيم الإيمانية والإنسانية
							في رحلة الزيارة.&quot;
						</p>
						<div className="flex flex-wrap gap-4 mt-6">
							<div className="flex items-center gap-2 bg-transparent border border-Muharram_secondary px-4 py-2 rounded-lg shadow-sm">
								<Gift className="w-5 h-5 text-yellow-600 dark:text-Muharram_secondary" />
								<span className="font-medium">
									هدايا وجوائز عبر القرعة
								</span>
							</div>
							<div className="flex items-center gap-2 bg-transparent border border-Muharram_secondary px-4 py-2 rounded-lg shadow-sm">
								<PencilRuler className="w-5 h-5 text-yellow-600 dark:text-Muharram_secondary" />
								<span className="font-medium">
									ورش رسم، مواهب، وركن للفتيات
								</span>
							</div>
						</div>
						{/*  view more button
						<div className="w-1/2 h-[1px] bg-gradient-to-t from-transparent via-slate-500 to-transparent"></div>
						
						<div className="flex flex-wrap gap-4 mt-8">
							<Link
								href="/kids-platform"
								className="border-2 border-primary dark:border-primary dark:text-primary text-yellow-700 hover:scale-105 px-8 py-3 rounded-xl font-medium duration-150"
							>
								تفاصيل البرنامج
							</Link>
						</div> */}
					</div>

					{/* Image */}
					<div className="xs:w-2/4 mx-auto relative">
						<div className="relative rounded-2xl overflow-hidden  transform -rotate-0 hover:rotate-3 transition-transform duration-500">
							<Image
								src="/contests/khayma/logo.svg"
								alt="المنصة السجادية للناشئة"
								width={1200}
								height={800}
								className="w-full h-auto object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
