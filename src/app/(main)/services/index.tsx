import ZiaraForm from "@/components/ziara-form"
import SectionTitle from "@/components/section"
export default function Services() {
	return (
		<>
			<div className="relative text-white flex flex-col items-center space-y-2">
				<div className="absolute h-full w-full bg-dark-background -z-10" />

				<div className="container flex flex-col items-center py-12">
					<SectionTitle title="الخدمات" dark />
					<div className="flex justify-between flex-col lg:flex-row items-center gap-4">
						<div className="w-1/2 ">
							<h2 className="text-xl sm:text-4xl xl:text-6xl font-bold text-start pb-10 leading-10">
								زيارة الامام زين العابدين وأئمة البقيع عليهم
								السلام
							</h2>
							<p className="font-light text-sm sm:text-2xl xl:text-3xl leading-loose">
								سجل اسمك ليتم اداء زيارة الإمام زين العابدين
								وأئمة البقيع (عليهم السلام) نيابة عنك في ضريحهم
								المطهر.
							</p>
						</div>
						<div className="w-[300px] h-[300px] md:w-[520px] md:h-[500px] xl:w-[800px] xl:h-[600px] flex md:flex-col items-center justify-center bg-[url('/shapes/ziara-bg.svg')] bg-center bg-no-repeat">
							<ZiaraForm />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
