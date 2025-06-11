import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { ApplyStepper } from "../components/applicationSteps"
import {
	Award,
	Trophy,
	Calendar,
	Crown,
	Star,
	BadgeDollarSign,
	Palette,
	BookOpen,
} from "lucide-react"

const prizes = ["الثلث الجلي", "الثلث العادي", "النسخ", "الديواني", "النستعليق"]

type Personal = {
	label: string
	persons: {
		image: string
		name: string
		subtitle?: string
	}[]
}

const personal: Personal[] = [
	{
		label: "لجنة التأسيس والإشراف العام للمسابقة",
		persons: [
			{
				image: "/images/logo-icon.png",
				name: "السيد غسان الخرسان (دام عزه)",
				subtitle: "رئيس مؤسسة الامام زين العابدين (عليه السلام)",
			},
			{
				image: "/contests/khat/محمد المشرفاوي.jpg",
				name: "الخطاط السيد محمد ياسين المشرفاوي",
				subtitle: "خطاط العتبة الحسينية المقدسة",
			},
		],
	},
	{
		label: "هيئة التحكيم",
		persons: [
			{
				image: "/contests/khat/نبيل الشريفي.jpg",
				name: "الاستاذ الخطاط نبيل الشريفي",
				subtitle: "العراق",
			},
			{
				image: "/contests/khat/صادق الحسيني.jpg",
				name: "الاستاذ الخطاط صادق الحسيني",
				subtitle: "العراق",
			},
			{
				image: "/contests/khat/فرهاد قورلو.jpg",
				name: "الاستاذ الخطاط فرهاد قورلو",
				subtitle: "تركيا",
			},
			{
				image: "/contests/khat/محسن عبادى.jpg",
				name: "الاستاذ الخطاط محسن عبادى",
				subtitle: "ايران",
			},
			{
				image: "/contests/khat/عباس بو مجداد.jpg",
				name: "الاستاذ الخطاط عباس بو مجداد",
				subtitle: "السعودية",
			},
		],
	},
	{
		label: "لجنة تنظيم المسابقة والسكرتارية",
		persons: [
			{
				image: "/contests/khat/عدنان الدلفي.jpg",
				name: "الخطاط عدنان حمد الدلفي",
			},
			{
				image: "/contests/khat/موفق البياتي.jpg",
				name: "الخطاط موفق خورشيد البياتي",
			},
			{
				image: "/contests/khat/حسين الحلو.jpg",
				name: "الخطاط حسين الحلو",
			},
			{
				image: "/contests/khat/اوس البندر.jpg",
				name: "الخطاط أوس البندر",
			},
			{
				image: "/contests/khat/حيدر السياب.jpg",
				name: "الخطاط حيدر السياب",
			},
		],
	},
]

export default function Page() {
	return (
		<div className="min-h-screen backdrop-blur-[0.5px]">
			{/* Breadcrumbs */}
			<div className="px-4 sm:px-6 lg:px-8 pt-6">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{
							name: "مسابقة زين العابدين عليه السلام الدولية الاولى في الخط العربي",
							url: "#",
						},
					]}
				/>
			</div>

			{/* Hero Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-12">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
						<div className="w-full lg:w-1/2 space-y-8 tracking-tight">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium">
								<Palette className="w-4 h-4" />
								مسابقة دولية محكمة
							</div>

							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-right leading-tight">
								مسابقة زين العابدين عليه السلام الدولية الاولى
								في الخط العربي
							</h1>

							<div className="rounded-2xl p-6 sm:p-8">
								<div className="space-y-6 text-justify leading-relaxed text-base sm:text-lg text-gray-700">
									<div className="flex items-start gap-3">
										<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<Star className="w-3 h-3 text-primary" />
										</div>
										<p className="tracking-tight">
											أطلقنا هذه المسابقة لإبراز تراث
											الإمام زين العابدين (عليه السلام) من
											خلال جماليات الخط العربي، باعتباره
											وعاءً للمعرفة وجزءاً من الهوية
											الإسلامية.
										</p>
									</div>

									<div className="flex items-start gap-3">
										<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<BookOpen className="w-3 h-3 text-green-600" />
										</div>
										<p className="tracking-wide">
											تهدف المسابقة إلى إحياء نصوص الإمام
											الأخلاقية والتربوية بخط جميل، وتحفيز
											الخطاطين لفهم معانيها العميقة.
										</p>
									</div>

									<div className="flex items-start gap-3">
										<div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<Palette className="w-3 h-3 text-purple-600" />
										</div>
										<p className="tracking-wide">
											ندعو المبدعين لاستلهام روح هذا
											التراث النوراني، والتعبير عنه بريشة
											الخط العربي، ليكون هذا الجهد
											امتداداً لرسالة الإمام في نشر القيم
											والمعرفة.
										</p>
									</div>
								</div>

								<div className="flex items-center justify-center flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 mt-8">
									<Link
										href="/contests/khat/president-goals/#president-message"
										className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-xl font-medium hover:bg-secondary hover:text-white transition-all duration-300"
									>
										كلمة رئيس المؤسسة
									</Link>
									<Link
										href="/contests/khat/president-goals/#goals"
										className="inline-flex items-center gap-2 border-2 border-secondary text-secondary px-6 py-3 rounded-xl font-medium hover:bg-secondary hover:text-white transition-all duration-300"
									>
										أهداف المسابقة
									</Link>
								</div>
							</div>
						</div>

						<div className="w-full lg:w-1/2 flex justify-center sm:translate-y-16">
							<div className="relative group">
								<div className="absolute -inset-4 bg-slate-300 rounded-3xl blur opacity-25"></div>
								<div className="relative bg-white rounded-2xl p-3 shadow-2xl">
									<Image
										className="w-full rounded-xl"
										src={"/contests/khat/landing.jpg"}
										alt="لوكو مسابقة الخط"
										width={600}
										height={600}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Timeline Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-16 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							التواريخ المهمة
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="group relative bg-white/40 cursor-pointer rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20">
							<div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
								<Calendar className="w-4 h-4 text-primary" />
							</div>
							<div className="flex flex-col items-center text-center space-y-4">
								<div className="p-4 border border-primary rounded-full group-hover:scale-110 transition-transform">
									<Trophy
										className="w-12 h-12 text-primary"
										strokeWidth={1}
									/>
								</div>
								<h3 className="font-bold text-primary text-lg">
									اعلان المسابقة
								</h3>
								<p className="text-2xl font-bold text-gray-800">
									يوم ١١ / ٤ / ٢٠٢٥م
								</p>
							</div>
						</div>

						<div className="group relative bg-white/40 cursor-pointer rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20">
							<div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
								<Calendar className="w-4 h-4 text-primary" />
							</div>
							<div className="flex flex-col items-center text-center space-y-4">
								<div className="p-4 border border-primary rounded-full group-hover:scale-110 transition-transform">
									<Award
										className="w-12 h-12 text-primary"
										strokeWidth={1}
									/>
								</div>
								<h3 className="font-bold text-primary text-lg">
									آخر موعد لتسليم اللوحات
								</h3>
								<p className="text-2xl font-bold text-gray-800">
									يوم ٥ / ١ / ٢٠٢٦م
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Application Steps Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-16" id="apply">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							خطوات الاشتراك في المسابقة
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
					</div>
					<ApplyStepper />
				</div>
			</div>

			{/* Prizes Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-16 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
							الجوائز والمحفزات
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
					</div>

					<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-8">
						<div className="overflow-x-auto">
							<table className="min-w-full text-right">
								<thead className="bg-primary text-white">
									<tr>
										<th className="py-4 px-6 font-semibold text-center whitespace-nowrap">
											نوع الخط
										</th>
										<th className="py-4 px-6 font-semibold text-center whitespace-nowrap">
											المركز الأول
										</th>
										<th className="py-4 px-6 font-semibold text-center whitespace-nowrap">
											المركز الثاني
										</th>
										<th className="py-4 px-6 font-semibold text-center whitespace-nowrap">
											المركز الثالث
										</th>
									</tr>
								</thead>
								<tbody>
									{prizes.map((row, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-white hover:bg-gray-50"
													: "bg-gray-50 hover:bg-gray-100"
											}
										>
											<td className="py-4 px-6 border-b border-gray-200 text-center font-medium text-gray-700 whitespace-nowrap">
												{row}
											</td>
											<td className="py-4 px-6 border-b border-gray-200 text-center">
												<div className="flex items-center justify-center gap-2">
													<Crown className="w-4 h-4 text-yellow-500" />
													<span className="text-gray-800 font-bold">
														3,000,000 د.ع
													</span>
												</div>
											</td>
											<td className="py-4 px-6 border-b border-gray-200 text-center">
												<div className="flex items-center justify-center gap-2">
													<Award className="w-4 h-4 text-gray-400" />
													<span className="text-gray-800 font-bold">
														2,000,000 د.ع
													</span>
												</div>
											</td>
											<td className="py-4 px-6 border-b border-gray-200 text-center">
												<div className="flex items-center justify-center gap-2">
													<Trophy className="w-4 h-4 text-orange-500" />
													<span className="text-gray-800 font-bold">
														1,000,000 د.ع
													</span>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className="bg-white/40 rounded-2xl p-6 border border-primary/20">
						<div className="flex items-start gap-3 mb-4">
							<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
								<BadgeDollarSign className="w-3 h-3 text-green-600" />
							</div>
							<p className="text-gray-700 text-lg leading-relaxed">
								وسيتم منح خمس جوائز تقديرية كل منها بقدر ٢٥٠,٠٠٠
								د.ع لكل نوع من الأنواع الخمسة لأفضل المتسابقين
								الذين يلون الفائزين الثلاثة الأوائل.
							</p>
						</div>

						<div className="bg-gray-50/80 rounded-xl p-4 border-r-4 border-primary">
							<p className="text-gray-700 text-right italic">
								<span className="font-semibold text-primary ml-2">
									ملاحظة:
								</span>
								تصرف الجوائز بالدينار العراقي وتحول قيمة الجائزة
								بالنسبة للفائزين الأجانب إلى العملات المتداولة
								وحسب سعر الصرف في وقته.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Personnel Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-16">
				<div className="max-w-7xl mx-auto">
					<div className="space-y-16">
						{personal.map((type) => (
							<div key={type.label} className="space-y-8">
								<div className="text-center">
									<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
										{type.label}
									</h2>
									<div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
								</div>

								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
									{type.persons.map((person) => (
										<div
											key={person.name}
											className="group flex flex-col text-center justify-center items-center space-y-3 hover:transform hover:scale-105 transition-all duration-300"
										>
											<div className="relative">
												<div className="absolute -inset-2 bg-primary/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
												<Image
													src={person.image}
													alt={person.name}
													width={300}
													height={300}
													className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-lg border-2 border-white"
												/>
											</div>
											<div className="space-y-1">
												<p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">
													{person.name}
												</p>
												{person.subtitle && (
													<p className="font-light text-slate-500 text-xs sm:text-sm">
														{person.subtitle}
													</p>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent rounded-full my-6 sm:my-8" />
			<div className="pt-20 space-y-8">
				<HeaderSections
					title={"ارشيف المسابقة"}
					moreButton={{
						label: "ارشيف المسابقة",
						href: "/contests/khat/gallery",
					}}
				/>
				<SwiperGallery images={images} />
			</div> */}
		</div>
	)
}
