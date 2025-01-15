"use client"
import { MenuIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
	FacebookIcon,
	TikTokIcon,
	TwitterIcon,
	InstagramIcon,
	TelegramIcon,
	YoutubeIcon,
	EmailIcon,
	LocationIcon,
	WhatsAppIcon,
} from "@/assets/icons/reusable"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
	{
		label: "سيرة الأمام زين العابدين (ع)",
		href: "/coming-soon",
		elements: [{ label: "حياته الكريمة", href: "/his-legacy" }],
	},
	{ label: "حول المؤسسة", href: "/about" },
	{ label: "الأصدارات", href: "/publications" },
	{ label: "المكتبة التخصصية", href: "/library" },
	{ label: "النشاطات", href: "/news" },
	{ label: "الخدمات", href: "/coming-soon" },
	{ label: "الوسائط", href: "/coming-soon" },
]

export default function Header() {
	const path = usePathname()
	const [isMenuVisible, setIsMenuVisible] = useState(false)

	const toggleMenu = () => setIsMenuVisible(!isMenuVisible)

	return (
		<div className="text-white">
			{/* Header */}
			<header
				className={cn(
					"fixed top-0 left-0 w-full p-4 sm:p-6 lg:p-8 rounded-b-2xl flex justify-between lg:justify-around items-center z-50 text-white",
					path !== "/"
						? "bg-primary"
						: "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[1px]",
				)}
			>
				<Link href="/">
					<Image
						src="/images/logo-horizontal-white.svg"
						width={50}
						height={50}
						className="w-32 sm:w-40 xl:w-52"
						alt="logo"
					/>
				</Link>
				<div className="hidden lg:flex flex-col gap-4">
					<div className="flex justify-end gap-2">
						{bigNavSocials.map((social, index) => (
							<Link
								className="bg-white rounded-full p-1.5 xl:p-2"
								target="_blank"
								href={social.href}
								key={index}
							>
								{social.icon}
							</Link>
						))}
					</div>
					<nav className="flex gap-4 max-lg:hidden">
						{links.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								className="flex items-center gap-2 text-xs xl:text-base"
							>
								<Image
									src="/shapes/nav-menu-icon.svg"
									width={50}
									height={50}
									className="w-2"
									alt="logo"
								/>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
				<button className="lg:hidden" onClick={toggleMenu}>
					{!isMenuVisible ? (
						<MenuIcon stroke="#ffffff" />
					) : (
						<XIcon stroke="#ffffff" />
					)}
				</button>
			</header>

			{/* Sidebar Navigation */}
			<nav
				className={`fixed flex flex-col justify-between top-0 left-0 w-full h-full bg-primary transform transition-transform duration-500 ease-in-out z-30 ${
					isMenuVisible ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{/* Links */}
				<ul className="flex flex-col justify-center my-20 h-2/3">
					{links.map((link) => (
						<li className="w-full" key={link.label}>
							<Link
								href={link.href}
								onClick={() => setIsMenuVisible(false)}
								className={`flex items-center justify-center gap-4 py-3 px-4 text-xl`}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<div className="w-full flex flex-col text-center ">
					تابعوا اخر اخبارنا عبر:
					<div className="w-2/3 mx-auto my-2">
						<div className="flex flex-wrap justify-center items-center gap-2">
							{socials.map((item, index) => (
								<Link
									key={index}
									target="_blank"
									href={item.href}
									className="rounded-full border-[1px] p-2 border-white scale-75 md:scale-90 active:scale-50 hover:scale-105 hover:-translate-y-2 duration-300 hover:border-spacing-16"
								>
									{item.icon}
								</Link>
							))}
						</div>
					</div>
					<p className="text-xs sm:text-sm md:text-base lg:base-xl text-slate-400 my-4 p-2">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy;
						1824
					</p>
				</div>
			</nav>
		</div>
	)
}

const socials: { href: string; icon: React.JSX.Element }[] = [
	{
		href: "https://telegram.me/imamzainorg",
		icon: (
			<TelegramIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.instagram.com/imamzainorg/",
		icon: (
			<InstagramIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://youtube.com/@imamzainorg",
		icon: (
			<YoutubeIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.tiktok.com/@imamzainorg",
		icon: (
			<TikTokIcon
				stroke="#ffffff"
				strokeWidth={20}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "mailto:dev@imamzain.org",
		icon: (
			<EmailIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.2}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.facebook.com/@imamzainorg",
		icon: (
			<FacebookIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6",
		icon: (
			<LocationIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		icon: (
			<WhatsAppIcon
				fill="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://twitter.com/imamzainorg",
		icon: (
			<TwitterIcon
				fill="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
]

const bigNavSocials = [
	{
		href: "https://www.instagram.com/imamzainorg/",
		icon: (
			<InstagramIcon
				fill="#006654"
				stroke="#006654"
				strokeWidth={0.5}
				width={12}
				height={12}
			/>
		),
	},
	{
		href: "https://www.tiktok.com/@imamzainorg",
		icon: (
			<TikTokIcon
				stroke="#006654"
				strokeWidth={20}
				width={12}
				height={12}
			/>
		),
	},
	{
		href: "https://www.facebook.com/@imamzainorg",
		icon: (
			<FacebookIcon
				fill="#006654"
				stroke="#006654"
				strokeWidth={0.5}
				width={12}
				height={12}
			/>
		),
	},
	{
		href: "https://twitter.com/imamzainorg",
		icon: (
			<TwitterIcon
				fill="#006654"
				strokeWidth={0.5}
				width={12}
				height={12}
			/>
		),
	},
]
