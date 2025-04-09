import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import Image from "next/image"
import Link from "next/link"
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
const founders = [
	{
		image: "/pfp-placeholder.jpg",
		name: "السيد غسان الخرسان (دام عزه)",
		subtitle: "رئيس مؤسسة الامام زين العابدين (عليه السلام)",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط السيد محمد ياسين المشرفاوي",
		subtitle: "خطاط العتبة الحسينية المقدسة",
	},
]
const jury = [
	{
		image: "/pfp-placeholder.jpg",
		name: "الاستاذ الخطاط نبيل الشريفي",
		subtitle: "العراق",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الاستاذ الخطاط صادق الحسيني",
		subtitle: "العراق",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الاستاذ الخطاط فرهاد قورلو",
		subtitle: "تركيا",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الاستاذ الخطاط محسن عبادى",
		subtitle: "ايران",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الاستاذ الخطاط عباس بو مجداد",
		subtitle: "السعودية",
	},
]

const organizers = [
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط عدنان حمد الدلفي",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط موفق خورشيد البياتي",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط حسين الحلو",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط أوس البندر",
	},
	{
		image: "/pfp-placeholder.jpg",
		name: "الخطاط حيدر السياب",
	},
]
const rules = [
	"يشترط أن يكون الورق من النوع المقهر وبخلفية فاتحة، ولا يجوز استخدام الورق الأبيض. حجم الورقة يجب أن يكون (٧٠ × ٥٠) سم لجميع الخطوط. يُستبعد من لم يلتزم بذلك.",
	"يمكن للمتسابق الاشتراك بثلاثة أنواع من الخطوط فقط، ولا يحق له الاشتراك بأكثر من عمل في النوع الواحد.",
	"يجوز اعتماد أي رسم قرآني في النصوص القرآنية.",
	"يجب التقيد بالقواعد الإملائية والنحوية في النصوص غير القرآنية.",
	"يجب أن تكون الأعمال خالية من التوقيع أو أي إشارة لكاتبها، وألا تكون مزخرفة أو مذهبة أو ذات حدود أو ملصقة على ورق مقوى أو خشب. تُرسل بطريقة تحافظ على سلامة اللوحة.",
	"يُرفق مع العمل ورقة مستقلة تتضمن: اسم المشارك، عنوانه الكامل، سيرة ذاتية مختصرة، صورة شخصية، صورة جواز السفر، ونسخة من استمارة المسابقة.",
	"تُعدّ جميع الأعمال ملكاً للعتبة الحسينية المقدسة - مؤسسة الإمام زين العابدين (عليه السلام) سواء فازت أو لم تفز.",
	"على كل مشارك الالتزام بالشروط والنصوص الواردة، ويُستبعد كل عمل يخالف ذلك.",
	"يحق للمتسابق اختيار لون الحبر بحرية، ويمكن استخدام لون واحد أو أكثر.",
	"تُرسل الأعمال بعد تغليفها في أسطوانة إلى العنوان التالي: كربلاء المقدسة - العتبة الحسينية المقدسة.",
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
				<Link
					href="#"
					className="p-5 border-2 rounded-2xl hover:text-primary hover:border-primary duration-300 "
				>
					التقديم الان
				</Link>
				<div className="text-lg text-center">
					آخر موعد لتسليم اللوحات
					<br />{" "}
					<span className="text-xl font-semibold">يوم 5/1/2026م</span>
				</div>
			</div>
			<div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mb-8" />

			<div className="flex flex-col justify-center space-y-10">
				<Section title="الشخصيات" />
				<h1 className="text-xl font-semibold m-auto text-center border-b w-fit mb-2 ">
					لجنة التأسيس والإشراف العام للمسابقة
				</h1>
				<div className="flex flex-wrap justify-around m-auto w-full">
					{founders.map((founder) => (
						<div
							key={founder.name}
							className="flex flex-col text-center justify-center items-center w-1/3"
						>
							<Image
								src={founder.image}
								alt={founder.name}
								width={300}
								height={300}
								className="w-24 rounded-full"
							/>
							<p className="text-lg font-semibold">
								{founder.name}
							</p>
							<p className="text-slate-500 ">
								{founder.subtitle}
							</p>
						</div>
					))}
				</div>
				<h1 className="text-xl font-semibold m-auto text-center border-b w-fit mb-2">
					هيئة التحكيم
				</h1>
				<div className="flex flex-wrap justify-around m-auto w-full">
					{jury.map((founder) => (
						<div
							key={founder.name}
							className="flex flex-col text-center justify-center items-center w-1/3"
						>
							<Image
								src={founder.image}
								alt={founder.name}
								width={300}
								height={300}
								className="w-24 rounded-full"
							/>
							<p className="text-lg font-semibold">
								{founder.name}
							</p>
							<p className="text-slate-500 ">
								{founder.subtitle}
							</p>
						</div>
					))}
				</div>
				<h1 className="text-xl font-semibold m-auto text-center border-b w-fit mb-2">
					لجنة تنظيم المسابقة والسكرتارية
				</h1>
				<div className="flex flex-wrap justify-around  m-auto w-full">
					{organizers.map((founder) => (
						<div
							key={founder.name}
							className="flex flex-col text-center justify-center items-center w-1/3"
						>
							<Image
								src={founder.image}
								alt={founder.name}
								width={300}
								height={300}
								className="w-24 rounded-full"
							/>
							<p className="text-lg font-semibold">
								{founder.name}
							</p>
						</div>
					))}
				</div>
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

			{/* الشروط */}
			<Section title="شروط المسابقة" />

			<div className="bg-white rounded-xl shadow-md p-6">
				<ol className="list-decimal text-right text-gray-700 space-y-3 pr-4">
					{rules.map((rule, index) => (
						<li key={index} className="leading-relaxed">
							{rule}
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}
