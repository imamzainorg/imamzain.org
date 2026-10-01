import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectionTitle, lightButton, whiteButton } from "@/components/brand"
import { Reveal } from "@/components/motion"

// A short introduction to the Imam over the Baqi photograph, with the way into his life and legacy.
export default function ImamBand({ text }: { text: string }) {
	return (
		<section className="relative mt-24 bg-[url('/images/albaqi.jpg')] bg-cover bg-top">
			<div className="bg-[#101c1a]/85 py-24 dark:bg-[#171314]/85 backdrop-blur-[2px] md:py-32">
				<div className="container">
					<Reveal className="max-w-4xl">
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
				</div>
			</div>
		</section>
	)
}
