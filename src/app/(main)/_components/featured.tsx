import Link from "next/link"
import Image from "next/image"
import { Palette, Award, Calendar } from "lucide-react"

export function FeaturedContest() {
	return (
		<div className="">
			<section className="relative py-16 border-b-2 bg-gradient-to-b from-transparent via-primary/5 to-primary/20 overflow-hidden my-20">
				<div className="container mx-auto px-4 relative z-10">
					<div className="flex flex-col lg:flex-row items-center gap-10">
						<div className="lg:w-1/2 text-right space-y-6">
							<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
								<Palette className="w-4 h-4" />
								مسابقة دولية محكمة
							</div>

							<h2 className="text-3xl md:text-4xl font-bold text-gray-900">
								مسابقة زين العابدين الدولية الأولى في الخط
								العربي
							</h2>

							<p className="text-lg text-gray-700 leading-relaxed">
								انطلق في رحلة فنية تستلهم تراث الإمام زين
								العابدين (عليه السلام) عبر جماليات الخط العربي.
								سجل الآن لفرصة الفوز بجوائز قيمة وتقديم إبداعك
								على منصة عالمية.
							</p>

							<div className="flex flex-wrap gap-4 mt-6">
								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
									<Award className="w-5 h-5 text-yellow-500" />
									<span className="font-medium">
										جوائز تصل إلى 3,000,000 د.ع
									</span>
								</div>
								<div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
									<Calendar className="w-5 h-5 text-primary" />
									<span className="font-medium">
										آخر موعد: ٥ / ١ / ٢٠٢٦
									</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-4 mt-8">
								<Link
									href="/contests/khat#apply"
									className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
								>
									سجل الآن
								</Link>
								<Link
									href="/contests/khat"
									className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-xl font-medium transition-colors"
								>
									اكتشف التفاصيل
								</Link>
							</div>
						</div>

						{/* Image */}
						<div className="xs:w-2/4 sm:w-2/5 mx-auto relative">
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
								<Image
									src="/contests/khat/landing.jpg"
									alt="مسابقة الخط العربي"
									width={600}
									height={400}
									className="w-full h-auto object-cover"
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

							{/* Floating element */}
							<div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-float">
								<div className="bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
									جائزة المركز الأول
								</div>
								<div className="mt-2 font-bold text-xl">
									3,000,000 د.ع
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
