import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
	return (
		<div>
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المسابقات", url: "/contests" },
					{ name: "مسابقة كتاب", url: "#" },
				]}
			/>
			<div className="rounded-xl border-2">
				<div className="m-2 bg-slate-900 text-white py-32 bg-opacity-80 bg-blend-overlay bg-[url('/contests/kitab/hero.jpg')] bg-cover rounded-xl">
					<div className=" mx-auto px-4 text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							مسابقة كتاب
						</h1>
						<p className="text-xl max-w-3xl mx-auto mb-32">
							ساهم في إحياء تراث الإمام زين العابدين عليه السلام
							عبر تأليف كتاب علمي رصين، وادخل منافسة &quot;كتاب
							١٤٤7 هـ&quot; للفوز والنشر والتكريم.
						</p>
						<Link
							href="#"
							className="border-2 hover:border-primary text-white hover:text-primary font-semibold py-3 px-6 rounded-md transition duration-300"
						>
							ارسل عملك
						</Link>
					</div>
				</div>
			</div>

			<section id="about" className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
						حول المسابقة
					</h2>
					<div className="flex flex-col md:flex-row items-center justify-center gap-12 text-lg leading-loose tracking-tight text-justify">
						<div className="md:w-1/2">
							<p className="mb-4 text-gray-700 ">
								تنظّم مؤسسة الإمام زين العابدين للبحوث والدراسات
								هذه المسابقة لإبراز الجوانب الفكرية والعلمية في
								تراث الإمام علي بن الحسين زين العابدين. تأتي هذه
								المبادرة في إطار سعي المؤسسة لتشجيع الكتابة
								البحثية الجادة وتوسيع دائرة الاهتمام بتراث
								الإمام، من خلال أعمال مكتوبة تعكس عمق فكره
								وتأثيره في مختلف الحقول المعرفية.
							</p>
							<p className="mb-4 text-gray-700">
								تهدف المسابقة إلى خلق بيئة علمية محفزة تفتح
								المجال أمام الباحثين والمهتمين من داخل العراق
								وخارجه لتقديم مساهماتهم الأصلية. وهي دعوة
								للقراءة المتأنية، والتأمل، وإعادة إنتاج المعرفة
								بشكل يعزز فهم تراث الإمام ضمن سياقات فكرية جديدة
								ومعاصرة.
							</p>
							<p className="text-gray-700">
								تُعد هذه المسابقة منبرًا سنويًا يتطلع إلى تعزيز
								الحوار المعرفي حول شخصية الإمام زين العابدين،
								وتقديم قراءات بحثية تفتح آفاقًا جديدة لفهم أعمق
								وأكثر اتصالًا بالواقع.
							</p>
						</div>
					</div>
				</div>
			</section>

			<div>
				<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
					محاور الكتابة
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-md mx-auto">
					<div className="p-6 flex items-center justify-right">
						<div className="text-center">
							<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
								<Image
									src={"/shapes/book_icon.svg"}
									width={50}
									height={50}
									alt="pointer"
									className="rotate-90 w-5 h-5 object-contain"
								/>
								محور العلوم الاسلامية
							</h2>
							<p className="text-gray-600">
								Content for the first cell
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
						<div className="text-center">
							<h2 className="text-xl font-semibold mb-2">
								Row 1, Cell 2
							</h2>
							<p className="text-gray-600">
								Content for the second cell
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
						<div className="text-center">
							<h2 className="text-xl font-semibold mb-2">
								Row 2, Cell 1
							</h2>
							<p className="text-gray-600">
								Content for the third cell
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
						<div className="text-center">
							<h2 className="text-xl font-semibold mb-2">
								Row 2, Cell 2
							</h2>
							<p className="text-gray-600">
								Content for the fourth cell
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
						<div className="text-center">
							<h2 className="text-xl font-semibold mb-2">
								Row 3, Cell 1
							</h2>
							<p className="text-gray-600">
								Content for the fifth cell
							</p>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
						<div className="text-center">
							<h2 className="text-xl font-semibold mb-2">
								Row 3, Cell 2
							</h2>
							<p className="text-gray-600">
								Content for the sixth cell
							</p>
						</div>
					</div>
				</div>
			</div>

			<section id="guidelines" className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
						Submission Guidelines
					</h2>

					<div className="grid md:grid-cols-2 gap-8 mb-16">
						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-purple-700 mb-4">
								Eligibility
							</h3>
							<ul className="list-disc pl-5 text-gray-700 space-y-2">
								<li>Original, unpublished book manuscripts</li>
								<li>Minimum 150 pages / 40,000 words</li>
								<li>
									Written in English, Arabic, Persian, or Urdu
								</li>
								<li>
									Must focus on Imam Al-Sajjad&apos;s life,
									teachings, or legacy
								</li>
								<li>
									Open to writers of all nationalities and
									backgrounds
								</li>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-purple-700 mb-4">
								Book Categories
							</h3>
							<ul className="list-disc pl-5 text-gray-700 space-y-2">
								<li>Academic/Scholarly Research</li>
								<li>Biography/Historical Account</li>
								<li>Spiritual Commentary</li>
								<li>Contemporary Application of Teachings</li>
								<li>
									Translation & Commentary of Imam&apos;s
									Works
								</li>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-purple-700 mb-4">
								Format Requirements
							</h3>
							<ul className="list-disc pl-5 text-gray-700 space-y-2">
								<li>Manuscript in PDF format</li>
								<li>Double-spaced, 12pt standard font</li>
								<li>
									Complete with table of contents,
									bibliography
								</li>
								<li>
									Cover letter with author bio (max 500 words)
								</li>
								<li>
									Abstract summarizing the work (max 1000
									words)
								</li>
							</ul>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-md">
							<h3 className="text-xl font-semibold text-purple-700 mb-4">
								Evaluation Criteria
							</h3>
							<ul className="list-disc pl-5 text-gray-700 space-y-2">
								<li>Originality and innovation of approach</li>
								<li>Academic rigor and scholarly integrity</li>
								<li>Quality of research and sources</li>
								<li>Literary excellence and accessibility</li>
								<li>Relevance to contemporary contexts</li>
							</ul>
						</div>
					</div>

					{/* Timeline */}
					<div className="relative">
						{/* Desktop Timeline Line */}
						<div className="hidden md:block absolute h-1 bg-purple-600 top-1/2 left-0 right-0 transform -translate-y-1/2"></div>

						{/* Mobile Timeline Line */}
						<div className="md:hidden absolute w-1 bg-purple-600 top-0 bottom-0 left-1/2 transform -translate-x-1/2"></div>

						<div className="grid md:grid-cols-4 gap-8 relative">
							{[
								{
									phase: "1",
									title: "Submissions Open",
									date: "May 1, 2025",
								},
								{
									phase: "2",
									title: "Deadline",
									date: "November 30, 2025",
								},
								{
									phase: "3",
									title: "Evaluation Period",
									date: "December 2025 - February 2026",
								},
								{
									phase: "4",
									title: "Winners Announced",
									date: "March 15, 2026",
								},
							].map((item, index) => (
								<div
									key={index}
									className="flex flex-col items-center relative"
								>
									<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold z-10">
										{item.phase}
									</div>
									<div className="text-center mt-4">
										<h4 className="font-semibold text-gray-800">
											{item.title}
										</h4>
										<p className="text-gray-600">
											{item.date}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
