import type { ComponentType, SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { TitleIcon } from "@/components/brand"
import { TelegramIcon, TikTokIcon, XIcon } from "@/components/brand-icons"
import DropdownLang from "@/layouts/dropdown-lang"
import { navLinks } from "@/layouts/header/nav-data"
import { BackToTop } from "@/layouts/footer/back-to-top"

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
		<footer className="relative overflow-hidden rounded-t-[2.5rem] bg-primary text-white dark:bg-Muharram_primary">
			<div aria-hidden className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04]" />
			{/* A gold hairline along the top edge. */}
			<div aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-l from-transparent via-secondary/70 to-transparent dark:via-Muharram_secondary/70" />

			<div className="container relative pb-8 pt-14 md:pt-16">
				<div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
					{/* Brand */}
					<div>
						<Link href="/" aria-label="الصفحة الرئيسية">
							<Image src="/images/logo-vertical-white.svg" alt="مؤسسة الإمام زين العابدين" width={200} height={160} className="h-auto w-40" />
						</Link>
						<p className="mt-5 max-w-xs leading-8 text-white/65">
							مؤسسة قائمة لإحياء تراث ونشر تعاليم الإمام علي بن الحسين السجاد (عليه السلام).
						</p>
						<ul className="mt-6 flex flex-wrap gap-2.5">
							{socials.map(({ href, label, Icon, hover }) => (
								<li key={href}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className={`grid size-11 place-items-center rounded-xl border-2 border-white/20 text-white transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white ${hover}`}
									>
										<Icon className="size-5" />
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Link columns */}
					<nav aria-label="روابط الموقع" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-6">
						{columns.map((col) => (
							<div key={col.label}>
								<h3 className="flex items-center gap-2 text-lg font-bold">
									<TitleIcon className="w-2.5" />
									{col.label}
								</h3>
								<ul className="mt-4 space-y-1">
									{col.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="group/link inline-flex items-center gap-2 py-1 text-white/70 transition-colors hover:text-white"
											>
												<span aria-hidden className="h-px w-0 bg-secondary transition-all duration-300 group-hover/link:w-3 dark:bg-Muharram_secondary" />
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				{/* Bottom bar */}
				<div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-dashed border-white/20 pt-6 sm:flex-row">
					<p className="text-center text-sm text-white/50">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (عليه السلام) &copy; {new Date().getFullYear()}
					</p>
					<div className="flex items-center gap-4">
						<DropdownLang broad />
						<BackToTop />
					</div>
				</div>
			</div>
		</footer>
	)
}
