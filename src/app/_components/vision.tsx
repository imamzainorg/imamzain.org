import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SectionTitle, leadText, outlineButton, photoFrame, solidButton } from "@/components/brand"
import { Reveal } from "@/components/motion"

// The foundation's vision beside a photo of its scientific council.
export default function Vision({ text }: { text: string }) {
	return (
		<section className="container pt-24">
			<div className="grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
				<Reveal x={60} y={0}>
					<SectionTitle title="رؤية المؤسسة" className="mb-6" />
					<p className={leadText}>{text}</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link href="/about/vision-and-goals#vision" className={solidButton}>
							<span className="h-2 w-2 rounded-full bg-secondary dark:bg-Muharram_secondary" />
							رؤية المؤسسة
						</Link>
						<Link href="/about/vision-and-goals#message" className={outlineButton}>
							رسالة المؤسسة
							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
						</Link>
					</div>
				</Reveal>

				<Reveal x={-60} y={0} delay={0.2}>
					<div className={`${photoFrame} mx-2 aspect-[4/3] shadow-xl lg:aspect-[4/5]`}>
						<Image
							src="/images/about-vision.jpg"
							alt="المجلس العلمي لمؤسسة الإمام زين العابدين (عليه السلام)"
							width={1600}
							height={1066}
							sizes="(max-width: 1024px) 100vw, 40vw"
							className="h-full w-full object-cover"
						/>
					</div>
				</Reveal>
			</div>
		</section>
	)
}
