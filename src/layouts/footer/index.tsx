import type { ComponentType, SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { TelegramIcon, TikTokIcon, XIcon } from "@/components/brand-icons"
import { navLinks } from "@/layouts/header/nav-data"
import { BackToTop } from "@/layouts/footer/back-to-top"
import { FooterColumn } from "@/layouts/footer/footer-column"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type Column = { label: string; links: { label: string; href: string }[] }

// The chapters of /his-life, then the same groups as the header menu so the two never drift apart.
const columns: Column[] = [
	{
		label: "الإمام زين العابدين",
		links: [
			{ label: "ولادته ووالدته", href: "/his-life/birth-and-mother" },
			{ label: "ألقابه وكناه", href: "/his-life/titles-and-nicknames" },
			{ label: "الأدلة على امامته", href: "/his-life/personality-traits" },
			{ label: "كراماته ومميزاته", href: "/his-life/karamatuh-wa-mumayizatuh" },
		],
	},
	...navLinks
		.filter((l) => l.subLinks)
		.map((l) => ({
			label: l.label,
			links: (l.subLinks ?? []).map(({ label, href }) => ({ label, href })),
		})),
]

const socials: { href: string; label: string; Icon: IconComponent; hover: string }[] = [
	{ href: "https://www.instagram.com/imamzainorg/", label: "Instagram", Icon: Instagram, hover: "hover:text-[#E1306C]" },
	{ href: "https://www.tiktok.com/@imamzainorg", label: "TikTok", Icon: TikTokIcon, hover: "hover:text-black" },
	{ href: "https://www.facebook.com/@imamzainorg", label: "Facebook", Icon: Facebook, hover: "hover:text-[#1877F2]" },
	{ href: "https://twitter.com/imamzainorg", label: "X", Icon: XIcon, hover: "hover:text-black" },
	{ href: "https://www.youtube.com/@imamzainorg", label: "YouTube", Icon: Youtube, hover: "hover:text-[#FF0000]" },
	{ href: "https://t.me/imamzainorg", label: "Telegram", Icon: TelegramIcon, hover: "hover:text-[#0088cc]" },
]

export default function Footer() {
	return (
		<footer className="relative overflow-hidden rounded-t-3xl bg-primary text-white dark:bg-Muharram_primary md:rounded-t-[2.5rem]">
			<div aria-hidden className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:320px] opacity-[0.04] md:bg-[length:500px]" />
			{/* A gold hairline along the top edge. */}
			<div aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-secondary/70 to-transparent dark:via-Muharram_secondary/70 md:inset-x-12" />

			{/* The bottom padding keeps the last row clear of the home indicator on phones. */}
			<div className="container relative pb-[max(2rem,env(safe-area-inset-bottom))] pt-10 sm:pt-12 md:pt-16">
				<div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
					{/* Brand: centred below lg, start-aligned beside the links from lg. */}
					<div className="flex flex-col items-center text-center lg:items-start lg:text-start">
						<Link
							href="/"
							aria-label="الصفحة الرئيسية"
							className="inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						>
							<Image src="/images/logo-vertical-white.svg" alt="مؤسسة الإمام زين العابدين" width={200} height={160} className="h-auto w-32 sm:w-36 md:w-40" />
						</Link>
						<p className="mt-4 max-w-sm text-balance leading-8 text-white/70 md:mt-5 lg:max-w-xs">
							مؤسسة قائمة لإحياء تراث ونشر تعاليم الإمام علي بن الحسين السجاد (عليه السلام).
						</p>
						<ul className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
							{socials.map(({ href, label, Icon, hover }) => (
								<li key={href}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className={`grid size-11 place-items-center rounded-xl border-2 border-white/20 text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${hover}`}
									>
										<Icon className="size-5" />
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Link groups: accordion on phones, 3 columns on tablets, then as many as fit beside the brand. */}
					<nav
						aria-label="روابط الموقع"
						className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-9 sm:border-0 lg:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]"
					>
						{columns.map((col) => (
							<FooterColumn key={col.label} label={col.label} links={col.links} />
						))}
					</nav>
				</div>

				{/* Bottom bar */}
				<div className="mt-8 flex flex-col-reverse items-center justify-between gap-5 border-t border-dashed border-white/20 pt-6 sm:flex-row md:mt-14">
					<p className="text-balance text-center text-xs text-white/60 sm:text-start sm:text-sm">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (عليه السلام) &copy; {new Date().getFullYear()}
					</p>
					<BackToTop />
				</div>
			</div>
		</footer>
	)
}