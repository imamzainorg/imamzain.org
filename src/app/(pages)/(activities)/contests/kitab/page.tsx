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
			<div className="rounded-xl border-2 mb-16 p-1 w-2/3 mx-auto">
				<Image
					src={"/contests/kitab/hero.jpg"}
					width={1000}
					height={800}
					priority
					alt="kitab cover"
					className="object-cover w-full h-full rounded-xl aspect-[3/2]"
				/>
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
					<ol className="list-arabic-indic text-right text-gray-700 space-y-2 sm:space-y-3 pr-2 sm:pr-4 p-2 sm:p-4 md:p-6 lg:p-8">
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
				className="animate-fade-in-up w-full flex flex-col justify-center items-center gap-4 p-2 sm:p-4 md:p-6 lg:p-8"
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
