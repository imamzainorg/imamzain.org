import Breadcrumbs from "@/components/breadcrumb"
import HisLifeAccordion from "./components/accordion"
import { dataFetcher } from "@/lib/dataFetcher"
import { imamzainLife } from "@/types/imamzainLife"

export default async function Page() {
	const imamzainLife = await dataFetcher<imamzainLife[]>("imamzain.json")
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "سيرة الإمام", url: "#" },
				]}
			/>

			<div className="md:w-11/12 mx-auto md:px-6 ">
				<div className="mb-20 space-y-10">
					<h2 className=" text-primary dark:text-Muharram_primary text-2xl md:text-3xl font-bold mb-4">
						سيرة الإمام السجاد عليه السلام
					</h2>
					<p className=" font-light text-lg md:text-xl leading-7 md:leading-9 lg:leading-loose text-justify tracking-tighter">
						الإمام علي بن الحسين (عليه السلام) هو الإمام الرابع من
						سلسلة الأئمة الأطهار (عليهم السلام) من آل بيت النبي (صلى
						الله عليه وآله)، أطل على هذه الدنيا في اليوم الخامس من
						شهر شعبان من سنة ٣٧ أو ٣٨ للهجرة، وعاصر خلال حياته عدداً
						من الخلفاء الأمويين، أولهم &quot;يزيد بن معاوية&quot;
						لعنة الله عليه، وآخرهم &quot;الوليد بن عبد الملك بن
						مروان&quot; ورحل عن هذه الدنيا في سنة ٩٥ للهجرة بعد حياة
						حافلة بالبذل والعطاء في سبيل إعلاء شأن الرسالة وخدمة
						الأمة الإسلامية. وجه نوراني هادئ، يحمل سماتٍ من نور
						الله، وملامح ضاربة في العراقة من أبيه الحسين إلى جده
						إبراهيم «عليهم السلام»، ومن أمه شهزنان بنت يزدجرد إلى
						أعلى أعراق الفرس وقدم الإسلام الأصيل للأمة، مقابل
						الإسلام الأموي المشوه
					</p>
				</div>
				<div className="-space-y-6">
					{imamzainLife.map((section) => (
						<HisLifeAccordion
							key={section.title}
							section={section}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
