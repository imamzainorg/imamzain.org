"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, Facebook, Instagram, Youtube } from "lucide-react"
import { TelegramIcon, TikTokIcon, XIcon } from "@/components/brand-icons"
import ThemeToggle from "@/layouts/header/theme-toggle"
import DailyHadith from "@/layouts/header/top-bar/daily-hadith"

const socials = [
	{ label: "إنستغرام", href: "https://www.instagram.com/imamzainorg/", Icon: Instagram },
	{ label: "تيك توك", href: "https://www.tiktok.com/@imamzainorg", Icon: TikTokIcon },
	{ label: "فيسبوك", href: "https://www.facebook.com/@imamzainorg", Icon: Facebook },
	{ label: "إكس", href: "https://twitter.com/imamzainorg", Icon: XIcon },
	{ label: "يوتيوب", href: "https://www.youtube.com/@imamzainorg", Icon: Youtube },
	{ label: "تلغرام", href: "https://t.me/imamzainorg", Icon: TelegramIcon },
]

// Today's date in words, used while the Hijri date loads and if it cannot be fetched.
const gregorianToday = () =>
	new Intl.DateTimeFormat("ar", { day: "numeric", month: "long", weekday: "long", year: "numeric" }).format(new Date())

// The strip above the navigation: today's Hijri date at the start, the day's hadith in the middle,
// then the social accounts and the theme switch. It shares the header's green, set a
// shade apart by a hairline, so the two read as one piece. The header slides it away on scroll,
// which is why its height is fixed at the 40px the header hides it by.
export default function TopBar() {
	const [hijriDate, setHijriDate] = useState("")

	useEffect(() => {
		fetch("/api/hijri-date")
			.then((res) => res.json())
			.then((data) => setHijriDate(data.hijriDate ? data.hijriDate.split("||")[0] : gregorianToday()))
			.catch(() => setHijriDate(gregorianToday()))
	}, [])

	return (
		<div className="relative z-20 w-full border-b border-white/10 max-lg:hidden">
			<div className="container flex h-10 items-center justify-between gap-6 text-sm text-white/90">
				<p className="flex items-center gap-2 font-medium">
					<Calendar aria-hidden className="size-4 text-secondary dark:text-white/70" />
					<span suppressHydrationWarning>{hijriDate || " "}</span>
				</p>

				<DailyHadith />

				<div className="flex items-center gap-1.5">
					<ul className="flex items-center gap-0.5">
						{socials.map(({ label, href, Icon }) => (
							<li key={href}>
								<Link
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={label}
									title={label}
									className="grid size-8 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/15 hover:text-white"
								>
									<Icon className="size-4" />
								</Link>
							</li>
						))}
					</ul>

					<span aria-hidden className="mx-2 h-4 w-px bg-white/20" />

					<ThemeToggle className="bg-white/15 text-white hover:bg-secondary dark:hover:bg-Muharram_secondary" />
				</div>
			</div>
		</div>
	)
}
