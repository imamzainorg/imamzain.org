"use client"

import { useState, useEffect } from "react"
import type { ComponentType, SVGProps } from "react"
import {
	Facebook,
	Instagram,
	Mail,
	MapPin,
	MenuIcon,
	XIcon,
	Youtube,
	ChevronDown,
} from "lucide-react"
import {
	TelegramIcon,
	TikTokIcon,
	WhatsAppIcon,
	XIcon as TwitterX,
} from "@/components/brand-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import useWindowEvents from "@/hooks/window-events"
import TopBar from "@/layouts/header/top-bar"
import ThemeToggle from "@/layouts/header/theme-toggle"
import { LogoRotate } from "@/layouts/header/logo-rotate"
import { DesktopNav } from "@/layouts/header/mega-menu"
import { activeSubHref, navLinks } from "@/layouts/header/nav-data"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const socials: { href: string; Icon: IconComponent }[] = [
	{ href: "https://telegram.me/imamzainorg", Icon: TelegramIcon },
	{ href: "https://www.instagram.com/imamzainorg/", Icon: Instagram },
	{ href: "https://youtube.com/@imamzainorg", Icon: Youtube },
	{ href: "https://www.tiktok.com/@imamzainorg", Icon: TikTokIcon },
	{ href: "mailto:dev@imamzain.org", Icon: Mail },
	{ href: "https://www.facebook.com/@imamzainorg", Icon: Facebook },
	{ href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6", Icon: MapPin },
	{
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		Icon: WhatsAppIcon,
	},
	{ href: "https://twitter.com/imamzainorg", Icon: TwitterX },
]

const navbarVariants = {
	visible: {
		y: 0,
		transition: { duration: 0.3, delay: 0 },
	},
	hidden: {
		y: -40,
		transition: { duration: 0.3, delay: 0 },
	},
}

export default function Header() {
	const path = usePathname()
	const [isMenuVisible, setIsMenuVisible] = useState(false)

	// For mobile submenu toggle:
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

	const toggleMenu = () => setIsMenuVisible(!isMenuVisible)

	const { isScrolled, isSmallScreen, isScrollDown } = useWindowEvents()

	useEffect(() => {
		if (isMenuVisible) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [isMenuVisible])

	// Expand/collapse sub-links in mobile
	const handleExpand = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index))
	}

	return (
		<motion.div className="text-white">
			{/* Header */}
			<motion.div
				variants={navbarVariants}
				initial="visible"
				animate={
					isSmallScreen
						? "visible"
						: isScrollDown && path !== "/media/videos"
							? "visible"
							: "hidden"
				}
				className={`fixed top-0 left-0 w-full h-fit flex flex-col justify-between lg:justify-around items-center z-50 text-white transition-all duration-300 ${
					isScrolled || (path !== "/" && path !== "/media/videos")
							? `rounded-b-[2rem] bg-primary dark:bg-Muharram_primary ${isMenuVisible ? "" : "shadow-2xl"}`
							: path === "/"
								? "bg-gradient-to-b from-black/70 to-transparent"
								: ""
				}`}
			>
				{/* Top Bar */}

				<TopBar />

				{/* Navbar */}
				<div className="relative w-full">
					<div className="lg:container w-full mx-auto pl-4 pr-4 flex justify-between items-center gap-4">
						<Link href="/">
							<LogoRotate
								className="w-32 sm:w-40 xl:w-52 h-12 lg:h-20 cursor-pointer"
								paths={[
									"/images/logo-horizontal-white.svg",
									"/images/imamhussainorg-logo.svg",
								]}
							/>
						</Link>

						{/* Desktop Navigation: the mega menu */}
						<DesktopNav />

						{/* Controls */}
						<div className="flex flex-row-reverse gap-4 items-center">
							{/* Mobile Hamburger Icon */}
							<div className="lg:hidden flex flex-row-reverse items-center gap-2">
								<button
									onClick={toggleMenu}
									aria-label={
										isMenuVisible
											? "Close Menu"
											: "Open Menu"
									}
									className="flex items-center"
								>
									{!isMenuVisible ? (
										<MenuIcon stroke="#ffffff" />
									) : (
										<XIcon stroke="#ffffff" />
									)}
								</button>

									<ThemeToggle
										className={
											isScrolled || path !== "/"
												? "bg-secondary dark:bg-Muharram_secondary text-white"
												: "bg-white text-primary dark:text-Muharram_primary"
										}
									/>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Sidebar Navigation (Mobile) */}
			<nav
				className={`fixed flex flex-col justify-between top-0 left-0 w-full h-full bg-primary dark:bg-Muharram_primary transform transition-transform duration-500 ease-in-out z-30 ${
					isMenuVisible ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<ul className="flex-1 overflow-y-auto px-6 pb-4 pt-24">
					{navLinks.map((link, index) => {
						const subLinks = link.subLinks
						const isOpen = expandedIndex === index
						const rowClass =
							"flex w-full items-center justify-between gap-3 py-3.5 text-xl font-semibold text-white"
						const current = activeSubHref(link, path)

						return (
							<li key={link.label} className="border-b border-dashed border-white/25 last:border-b-0">
								{subLinks ? (
									<button
										type="button"
										aria-expanded={isOpen}
										onClick={() => handleExpand(index)}
										className={rowClass}
									>
										<span className="flex items-center gap-3">
											{link.Icon && <link.Icon aria-hidden className="size-5 text-secondary" />}
											{link.label}
										</span>
										<ChevronDown
											aria-hidden
											className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
										/>
									</button>
								) : (
									<Link href={link.href ?? "#"} onClick={() => setIsMenuVisible(false)} className={rowClass}>
										<span className="flex items-center gap-3">
											{link.Icon && <link.Icon aria-hidden className="size-5 text-secondary" />}
											{link.label}
										</span>
									</Link>
								)}

								{/* Sub links: the row grows from zero height instead of jumping. */}
								{subLinks && (
									<div
										className={`grid transition-[grid-template-rows] duration-300 ease-out ${
											isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
										}`}
									>
										<div className="overflow-hidden">
											<ul className="space-y-1 pb-3">
												{subLinks.map((subLink) => (
													<li key={subLink.href}>
														<Link
															href={subLink.href}
															onClick={() => setIsMenuVisible(false)}
															tabIndex={isOpen ? 0 : -1}
															className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-lg transition hover:bg-white/10 ${
																subLink.href === current ? "bg-white/10 text-white" : "text-white/85"
															}`}
														>
															<subLink.Icon aria-hidden className="size-5 shrink-0 text-secondary" />
															{subLink.label}
														</Link>
													</li>
												))}
											</ul>
										</div>
									</div>
								)}
							</li>
						)
					})}
				</ul>

				{/* Socials and Footer */}
				<div className="w-full flex flex-col text-center">
					<p className="py-4">تابعوا اخر اخبارنا عبر:</p>
					<div className="w-1/2 mx-auto my-4">
						<div className="flex flex-wrap justify-center items-center gap-2">
							{socials.map((item, index) => (
								<Link
									key={index}
									target="_blank"
									rel="noopener noreferrer"
									href={item.href}
									className="p-2"
								>
									<item.Icon className="w-8 h-8" />
								</Link>
							))}
						</div>
					</div>
					<p className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-300 my-4 p-2">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy;{" "}
						{new Date().getFullYear()}
					</p>
				</div>
			</nav>
		</motion.div>
	)
}
