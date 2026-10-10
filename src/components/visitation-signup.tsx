import { ArrowDown } from "lucide-react"
import { SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import ZiaraForm from "@/components/ziara-form"
import { arabicNumber } from "@/lib/format"

const steps = [
	{ title: "اكتب الاسم", text: "اسم من تريد أن تُؤدّى الزيارة عنه" },
	{ title: "أضف رقم هاتفك", text: "مع رمز الدولة، لنرسل لك رسالة عند إتمام الزيارة نيابةً عنك، ولا نستخدمه لغير ذلك" },
	{ title: "اضغط تسجيل", text: "ويُدرج اسمك في قائمة الزائرين" },
]

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

						<ol className="max-w-xl space-y-3">
							{steps.map((step, i) => (
								<li key={step.title} className="flex items-center gap-4">
									<span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-lg font-extrabold text-white dark:bg-Muharram_secondary">
										{arabicNumber(i + 1)}
									</span>
									<span>
										<span className="block text-lg font-bold">{step.title}</span>
										<span className="block text-white/70">{step.text}</span>
									</span>
								</li>
							))}
						</ol>

						<a
							href="#signup"
							className="inline-flex items-center gap-2 rounded-xl border-2 border-secondary bg-secondary px-6 py-3 text-lg font-bold text-white transition hover:brightness-110 dark:border-Muharram_secondary dark:bg-Muharram_secondary lg:hidden"
						>
							سجّل الآن
							<ArrowDown className="size-5 animate-bounce" />
						</a>
					</Reveal>

					<Reveal y={60} className="flex justify-center">
						<div id="signup" className="w-full max-w-xl scroll-mt-28 rounded-[40px] drop-shadow-[0_0_45px_rgba(187,150,97,0.35)] bg-[url('/shapes/ziara-bg.svg')] bg-[length:100%_100%] bg-center bg-no-repeat px-6 pb-24 pt-32 dark:bg-[url('/shapes/ziara-bg_Muharram.svg')] sm:px-14">
							<ZiaraForm />
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	)
}
