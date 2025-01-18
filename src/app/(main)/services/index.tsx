import ZiaraForm from "@/components/ziara-form"
import SectionTitle from "@/components/section"
export default function Services() {
	return (
		<>
			<div className="relative text-white flex flex-col items-center p-5 space-y-2">
				<div className="absolute h-full w-full bg-[url('/shapes/bg.svg')] bg-dark-background -z-10" />
				<SectionTitle title="الخدمات" dark />

				<div className="flex justify-center flex-col lg:flex-row items-center gap-4">
					<div className="w-5/6 lg:w-2/6 mx-auto space-y-2 text-center">
						<h2 className="text-xl sm:text-4xl xl:text-5xl font-bold">
							زيارة الامام زين العابدين وأئمة البقيع عليهم السلام
						</h2>
						<p className="font-light text-sm sm:text-2xl xl:text-3xl">
							سجل اسمك ليتم اداء زيارة الإمام زين العابدين وأئمة
							البقيع (عليهم السلام) نيابة عنك في ضريحهم المطهر.
						</p>
					</div>
					<div className="w-[300px] h-[300px] md:w-[520px] md:h-[500px] xl:w-[800px] xl:h-[600px] flex md:flex-col items-center justify-center bg-[url('/shapes/ziara-bg.svg')] bg-center bg-no-repeat">
						<ZiaraForm />
					</div>
				</div>
			</div>
		</>
	)
}
