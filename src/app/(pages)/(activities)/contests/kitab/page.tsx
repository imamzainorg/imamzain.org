import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import Image from "next/image"
import Link from "next/link"
import { researchAxes } from "./data/researchAxes"
import { rules } from "./data/rules"
import { criteria } from "./data/criteria"
import {
	Award,
	BadgeDollarSign,
	BookCheck,
	ScrollText,
	ShieldCheck,
} from "lucide-react"
import { EmailIcon } from "@/assets/icons/reusable"

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
			<div className="rounded-xl border-2 mb-16">
				<div className="m-2 bg-slate-900 text-white py-32 bg-opacity-80 bg-blend-overlay bg-[url('/contests/kitab/hero.jpg')] bg-cover rounded-xl">
					<div className=" mx-auto px-4 text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							مسابقة كتاب
						</h1>
						<p className="text-xl max-w-3xl mx-auto mb-32">
							ساهم في إحياء تراث الإمام زين العابدين عليه السلام
							عبر تأليف كتاب علمي رصين، وادخل منافسة &quot;كتاب
							١٤٤٧ هـ&quot; للفوز والنشر والتكريم.
						</p>
						<Link
							href="#submit"
							className="border-b-2 hover:border-secondary text-white hover:text-secondary font-semibold py-3 px-6 transition duration-300"
						>
							قم بالإنضمام الى المسابقة الآن
						</Link>
					</div>
				</div>
			</div>

			<Section title="جوائز قيمة" />
			<div className="flex flex-col md:flex-row gap-4 w-full mb-16">
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center gap-2 md:gap-8">
					<BadgeDollarSign
						className="w-10 md:w-20 h-10 md:h-20 text-secondary"
						strokeWidth={0.5}
					/>
					<span className="w-2/3 mx-auto text-sm md:text-base">
						يتم اختيار (۳) فائزين ويخصص لكل منهم جائزة بمقدار
						(000,000, 2) دينار عراقي.
					</span>
				</div>
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center gap-2 md:gap-8 ">
					<Award
						className="w-10 md:w-20 h-10 md:h-20 text-secondary"
						strokeWidth={0.5}
					/>
					<span className="w-2/3 mx-auto text-sm md:text-base">
						يضاف للكتاب المتميز هدية قدرها (٥٠٠,٠٠٠) دينار عراقي.
					</span>
				</div>
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center gap-2 md:gap-8 ">
					<BookCheck
						className="w-10 md:w-20 h-10 md:h-20 text-secondary"
						strokeWidth={0.5}
					/>
					<span className="w-2/3 mx-auto text-sm md:text-base">
						يتم طبع ونشر الكتب المقبولة على نفقة المؤسسة وتكون حقوق
						الطبع محفوظة للمؤسسة.
					</span>
				</div>
				<div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center gap-2 md:gap-8 ">
					<ShieldCheck
						className="w-10 md:w-20 h-10 md:h-20 text-secondary"
						strokeWidth={0.5}
					/>
					<span className="w-2/3 mx-auto text-sm md:text-base">
						تزويد المشاركين المقبولين والفائزين بما يؤيد ذلك رسمياً.
					</span>
				</div>
			</div>
			{/* <section id="about" className="py-20">
				<div className="container mx-auto px-4">
					<Section title="المنظمين" />
					<div className="flex flex-col md:flex-row items-center justify-center gap-12 text-lg leading-loose tracking-tight text-justify">
						<div className="md:w-2/3">
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
			</section> */}

			<div className="my-16">
				<Section title="محاور الكتابة" />
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto">
					{researchAxes.map((axes) => (
						<div
							key={axes.title}
							className="p-6 flex items-center justify-right w-full"
						>
							<div className="text-center">
								<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
									<Image
										src={"/shapes/book_icon.svg"}
										width={50}
										height={50}
										alt="pointer"
										className="rotate-90 w-5 h-5 object-contain"
									/>
									{axes.title}
								</h2>
								<div className="text-gray-600 mr-7">
									{axes.keywords.map((keyword) => (
										<span key={keyword}>
											{keyword}
											{keyword !==
											axes.keywords[
												axes.keywords.length - 1
											]
												? "، "
												: ""}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="my-16">
				<Section title="معايير التقييم" />
				{criteria.map((index) => (
					<div
						key={index}
						className="flex items-center gap-4 my-4 md:w-2/3 mx-auto text-xl"
					>
						<ScrollText className="text-primary" />
						{index}
					</div>
				))}
			</div>

			<Section title="شروط الإنضمام للمسابقة" />
			<div className="flex flex-col md:flex-row items-center justify-center gap-12 text-lg leading-loose tracking-tight text-justify">
				<div className="md:w-2/3">
					<ol className="list-decimal text-right text-gray-700 space-y-2 sm:space-y-3 pr-2 sm:pr-4 p-2 sm:p-4 md:p-6 lg:p-8">
						{rules.map((rule, index) => (
							<li
								key={index}
								className="leading-relaxed text-sm sm:text-base md:text-lg"
							>
								{rule}
							</li>
						))}
					</ol>
				</div>
			</div>

			<Section title="آلية التقديم" />
			<div
				id="submit"
				className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 p-2 sm:p-4 md:p-6 lg:p-8 "
			>
				<p className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto text-base sm:text-lg md:text-xl text-center">
					يمكنكم الإنضمام الى المسابقة من خلال تقديم عملكم عبر البريد
					الالكتروني
				</p>
				<Link
					href="mailto:kitab@imamzain.org"
					className="text-lg sm:text-xl md:text-2xl font-semibold p-2 sm:p-3 border-b-2 flex items-center gap-4 sm:gap-6 md:gap-8 duration-150 hover:-translate-y-2"
				>
					<EmailIcon className="w-5 h-5 sm:w-6 sm:h-6" />
					kitab@imamzain.org
				</Link>
			</div>
		</div>
	)
}
