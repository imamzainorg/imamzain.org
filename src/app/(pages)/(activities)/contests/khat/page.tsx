import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import Image from "next/image"
import { StepperDemo } from "./components/applicationSteps"
const prizes = [
	{
		type: "الثلث الجلي",
		first: "3,000,000 د.ع",
		second: "2,000,000 د.ع",
		third: "1,000,000 د.ع",
	},
	{
		type: "الثلث العادي",
		first: "3,000,000 د.ع",
		second: "2,000,000 د.ع",
		third: "1,000,000 د.ع",
	},
	{
		type: "النسخ",
		first: "3,000,000 د.ع",
		second: "2,000,000 د.ع",
		third: "1,000,000 د.ع",
	},
	{
		type: "الديواني",
		first: "3,000,000 د.ع",
		second: "2,000,000 د.ع",
		third: "1,000,000 د.ع",
	},
	{
		type: "النستعليق",
		first: "3,000,000 د.ع",
		second: "2,000,000 د.ع",
		third: "1,000,000 د.ع",
	},
]
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

export default function page() {
	return (
		<div className="container">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المسابقات", url: "#" },
					{ name: "مسابقة الخط", url: "#" },
				]}
			/>
			<div className="flex flex-col lg:flex-row justify-between gap-14">
				<div className="space-y-8 lg:w-1/2">
					<h1 className="text-3xl font-semibold">
						مسابقة زين العابدين عليه السلام الدولية الاولى في الخط
						العربي
					</h1>
					<div className="space-y-4 text-justify leading-loose text-lg">
						<p>
							أطلقنا هذه المسابقة لإبراز تراث الإمام زين العابدين
							(عليه السلام) من خلال جماليات الخط العربي، باعتباره
							وعاءً للمعرفة وجزءاً من الهوية الإسلامية.
						</p>
						<p>
							تهدف المسابقة إلى إحياء نصوص الإمام الأخلاقية
							والتربوية بخط جميل، وتحفيز الخطاطين لفهم معانيها
							العميقة.
						</p>
						<p>
							ندعو المبدعين لاستلهام روح هذا التراث النوراني،
							والتعبير عنه بريشة الخط العربي، ليكون هذا الجهد
							امتداداً لرسالة الإمام في نشر القيم والمعرفة.
						</p>
					</div>
				</div>
				<div className="w-1/2 flex justify-end">
					<Image
						className="w-4/5 aspect-square rounded-xl shadow-md"
						src={"/contests/khat/landing.jpg"}
						alt="لوكو مسابقة الخط"
						width={1000}
						height={1000}
					/>
				</div>
			</div>
			<h1 className="w-full text-center text-2xl mt-20 font-semibold">
				خطوات الاشتراك في المسابقة
			</h1>
			<StepperDemo />
			<div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mt-8" />
			{/* اعلان المسابقة */}
			<div className="flex justify-between py-10 my-5 text-xl  p-5">
				<div className="text-lg text-center">
					اعلان المسابقة
					<br />{" "}
					<span className="text-xl font-semibold">
						يوم 11/4/2025م
					</span>
				</div>
				<div className="text-lg text-center">
					آخر موعد لتسليم اللوحات
					<br />{" "}
					<span className="text-xl font-semibold">يوم 5/1/2026م</span>
				</div>
			</div>
			<div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mb-8" />

			<div className="flex flex-col justify-center space-y-15">
				{personal.map((type) => (
					<div key={type.label} className="my-8">
						<Section title={type.label} />
						<div className="flex flex-wrap justify-around gap-y-10 m-auto w-full">
							{type.persons.map((person) => (
								<div
									key={person.name}
									className="flex flex-col text-center justify-center items-center w-1/3"
								>
									<Image
										src={person.image}
										alt={person.name}
										width={300}
										height={300}
										className="w-24 h-24 rounded-full hover:scale-110 duration-150"
									/>
									<p className="text-lg font-semibold">
										{person.name}
									</p>
									{person.subtitle && (
										<p className="font-light text-slate-500">
											{person.subtitle}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent rounded-full my-8" />

			{/* الجوائز والمحفزات */}
			<div className="flex flex-col justify-center space-y-8">
				<Section title="الجوائز والمحفزات" />
				<div className="relative overflow-hidden shadow-md rounded-lg">
					<table className="table-fixed w-full text-left">
						<thead className="bg-[#006654] text-[#e5e7eb] uppercase">
							<tr>
								<td className="py-3 px-4 border border-gray-200 text-center">
									نوع الخط
								</td>
								<td className="py-3 px-4 border border-gray-200 text-center">
									المركز الأول
								</td>
								<td className="py-3 px-4 border border-gray-200 text-center">
									المركز الثاني
								</td>
								<td className="py-3 px-4 border border-gray-200 text-center">
									المركز الثالث
								</td>
							</tr>
						</thead>
						<tbody className="bg-white text-[#6b7280]">
							{prizes.map((row, index) => (
								<tr key={index}>
									<td className="py-4 px-4 border border-gray-200 text-center">
										{row.type}
									</td>
									<td className="py-4 px-4 border border-gray-200 text-center">
										{row.first}
									</td>
									<td className="py-4 px-4 border border-gray-200 text-center">
										{row.second}
									</td>
									<td className="py-4 px-4 border border-gray-200 text-center">
										{row.third}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<p className="text-lg">
					وسيتم منح خمس جوائز تقديرية كل منها بقدر ٢٥٠,٠٠٠ د.ع لكل نوع
					من الأنواع الخمسة لأفضل المتسابقين الذين يلون الفائزين
					الثلاثة الأوائل .
				</p>
				<p className="text-gray-700 w-fit border-b border-slate-300 italic">
					ملاحظة: تصرف الجوائز بالدينار العراقي وتحول قيمة الجائزة
					بالنسبة للفائزين الأجانب إلى العملات المتداولة وحسب سعر
					الصرف في وقته .
				</p>
			</div>

			<div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent rounded-full my-8" />
		</div>
	)
}
