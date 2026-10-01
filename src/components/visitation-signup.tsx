import { SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import ZiaraForm from "@/components/ziara-form"

const intro =
	"سجل اسمك ليتم أداء زيارة الإمام زين العابدين وأئمة البقيع (عليهم السلام) نيابةً عنك عند قبورهم الطاهرة."

// The sign-up for visiting the Imams' graves on someone's behalf, on a dark band. The shield holding
// the form hangs below the band's edge. On the home page it is one section among many ("الخدمات");
// on /visitation it opens the page, so the title becomes the page's h1.
export default function VisitationSignup({ asPage }: { asPage?: boolean }) {
	return (
		<section
			className={`relative isolate overflow-hidden pb-28 pt-20 md:pt-24 ${asPage ? "mt-4" : "mt-24"}`}
		>
			<div className="absolute inset-x-0 top-0 -z-10 h-[90%] bg-[#101c1a] dark:bg-[#171314]">
				<div aria-hidden className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04]" />
			</div>

			<div className="container relative">
				<div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
					<Reveal x={80} y={0} className="space-y-6 text-white">
						{asPage ? (
							<SectionTitle
								light
								as="h1"
								title="زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام"
								className="mb-0"
							/>
						) : (
							<>
								<SectionTitle light title="الخدمات" className="mb-0" />
								<h3 className="text-2xl font-bold leading-relaxed lg:text-3xl">
									زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام
								</h3>
							</>
						)}
						<p className="max-w-xl text-lg leading-loose text-white/75 md:text-xl md:leading-loose">{intro}</p>
					</Reveal>

					<Reveal y={60} className="flex justify-center">
						<div className="w-full max-w-md rounded-[40px] bg-[url('/shapes/ziara-bg.svg')] bg-contain bg-center bg-no-repeat px-6 py-28 dark:bg-[url('/shapes/ziara-bg_Muharram.svg')] sm:px-10">
							<ZiaraForm />
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
