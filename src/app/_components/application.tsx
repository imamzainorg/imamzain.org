import Image from "next/image"
import Link from "next/link"
import { SectionTitle, shieldPanel } from "@/components/brand"
import { Reveal } from "@/components/motion"

const APP_SITE = "https://anwar.imamzain.org"

const stores = [
	{
		href: "https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB",
		src: "/applications/app-store.svg",
		alt: "Download on the App Store",
	},
	{
		href: "https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1",
		src: "/applications/google-play.svg",
		alt: "Get it on Google Play",
	},
]

// The Anwar Sajjadiya app: a green shield with the store badges, two phones standing out of its corner.
export default function Application() {
	return (
		<section className="container pt-24">
			<SectionTitle title="التطبيقات" className="mb-10" />

			<Reveal>
				<div className={`${shieldPanel} relative p-8 md:p-12 lg:min-h-[21rem] lg:pl-[26rem]`}>
					<h3 className="text-3xl font-extrabold md:text-4xl">
						<Link href={APP_SITE} target="_blank" rel="noopener noreferrer" className="hover:underline">
							تطبيق أنوار سجادية
						</Link>
					</h3>
					<p className="mt-3 text-xl font-semibold text-secondary dark:text-white/80">
						الموسوعة المتكاملة عن الإمام زين العابدين (عليه السلام)
					</p>
					<p className="mt-4 max-w-xl text-lg leading-loose text-white/80">
						اكتشف عالم الإمام زين العابدين من خلال تطبيق شامل يحتوي على الأدعية، الزيارات، والنصوص المقدسة
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						{stores.map((store) => (
							<Link
								key={store.src}
								href={store.href}
								target="_blank"
								rel="noopener noreferrer"
								className="transition-transform hover:-translate-y-0.5"
							>
								<Image src={store.src} alt={store.alt} width={120} height={40} className="h-12 w-auto" />
							</Link>
						))}
					</div>

					<Link
						href={APP_SITE}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="تطبيق أنوار سجادية"
						className="absolute -top-14 bottom-0 left-10 hidden w-[25rem] lg:block"
					>
						<Image
							src="/applications/anwar-sajjadyia/01.png"
							alt=""
							width={217}
							height={464}
							className="absolute bottom-6 left-0 w-[11.5rem] -rotate-6 drop-shadow-2xl"
						/>
						<Image
							src="/applications/anwar-sajjadyia/02.png"
							alt="شاشة من تطبيق أنوار سجادية"
							width={221}
							height={464}
							className="absolute bottom-0 left-36 w-[13rem] rotate-3 drop-shadow-2xl"
						/>
					</Link>
				</div>
			</Reveal>
		</section>
	)
}
