import Link from "next/link"
import { ArrowLeft, Quote } from "lucide-react"
import { SectionTitle, lightButton, whiteButton } from "@/components/brand"
import { Reveal } from "@/components/motion"

// The opening of the Imam's supplication for noble morals, from al-Sahifa al-Sajjadiyya.
const quote = {
	text: "اللهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَبَلِّغْ بِإِيمَانِي أَكْمَلَ الْإِيمَانِ، وَاجْعَلْ يَقِينِي أَفْضَلَ الْيَقِينِ، وَانْتَهِ بِنِيَّتِي إِلَى أَحْسَنِ النِّيَّاتِ، وَبِعَمَلِي إِلَى أَحْسَنِ الْأَعْمَالِ.",
	title: "دعاؤه (عليه السلام) في مكارم الأخلاق",
	source: "الصحيفة السجادية",
	href: "/library/al-sahifa/al-sahifa-al-sajjadiya-index/his-supplication-for-noble-morals",
}

// A short introduction to the Imam over the Baqi photograph, with a line from his Sahifa on the
// left and the way into his life and legacy.
export default function ImamBand({ text }: { text: string }) {
	return (
		<section className="relative mt-24 bg-[url('/images/albaqi.jpg')] bg-cover bg-top">
			<div className="bg-[#101c1a]/85 py-24 dark:bg-[#171314]/85 backdrop-blur-[2px] md:py-32">
				<div className="container">
					<div className="grid items-center gap-12 lg:grid-cols-[1fr_24rem] lg:gap-16 xl:grid-cols-[1fr_26rem]">
						<Reveal>
							<SectionTitle light title="الإمام زين العابدين (عليه السلام)" className="mb-8" />
							<p className="text-lg leading-loose text-white/85 md:text-xl md:leading-loose">{text}</p>
							<div className="mt-10 flex flex-wrap gap-3">
								<Link href="/his-life" className={whiteButton}>
									حياته الكريمة
								</Link>
								<Link href="/library" className={lightButton}>
									تراث الإمام
									<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
								</Link>
							</div>
						</Reveal>

						<Reveal delay={0.15}>
							<figure className="rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-md md:p-8">
								<Quote className="size-10 -scale-x-100 text-secondary dark:text-white/70" strokeWidth={1.5} />
								<blockquote className="mt-4 text-xl font-bold leading-[2.4] text-white">{quote.text}</blockquote>
								<figcaption className="mt-5 text-secondary dark:text-white/70">
									{quote.title}
									<span className="mt-1 block text-sm text-white/55">{quote.source}</span>
								</figcaption>
								<Link href={quote.href} className="group mt-5 inline-flex items-center gap-2 font-semibold text-white">
									قراءة الدعاء كاملاً
									<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
								</Link>
							</figure>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	)
}
