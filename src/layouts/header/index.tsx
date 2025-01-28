"use client"

import { MenuIcon, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faTelegram,
	faInstagram,
	faYoutube,
	faTiktok,
	faWhatsapp,
	faTwitter,
	faFacebook,
} from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { motion } from "motion/react"
import useWindowEvents from "@/hooks/window-events"
import TopBar from "@/layouts/header/top-bar"

// 1. Define links and subLinks
const links = [
	{
		label: "سيرة الأمام زين العابدين (ع)",
		href: "/his-life",
	},
	{
		label: "حول المؤسسة",
		subLinks: [
			{ label: "عن المؤسسة عن المؤسسة  ", href: "/about" },
			{ label: "رسالتنا", href: "/coming-soon" },
		],
	},
	{
		label: "الأصدارات",
		subLinks: [
			{ label: "الاصدار الأول", href: "/publications/1" },
			{ label: "الاصدار الثاني", href: "/publications/2" },
		],
	},
	{
		label: "المكتبة التخصصية",
		href: "/library",
	},
	{
		label: "النشاطات",
		href: "/news",
	},
	{
		label: "الخدمات",
		href: "/coming-soon",
	},
	{
		label: "الوسائط",
		href: "/media",
	},
]

const socials = [
	{ href: "https://telegram.me/imamzainorg", icon: faTelegram },
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://youtube.com/@imamzainorg", icon: faYoutube },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "mailto:dev@imamzain.org", icon: faEnvelope },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6", icon: faMapMarkerAlt },
	{
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		icon: faWhatsapp,
	},
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
]

const navbarVariants = {
	visible: {
		y: 0,
		transition: { duration: 0.3, delay: 0 },
	},
	hidden: {
		y: -32,
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

	useEffect(() => {
		if (!isSmallScreen) {
			setIsMenuVisible(false)
		}
	}, [isSmallScreen])

	// Expand/collapse sub-links in mobile
	const handleExpand = (index: number) => {
		setExpandedIndex((prev) => (prev === index ? null : index))
	}

	return (
		<motion.div className="text-white" suppressHydrationWarning>
			{/* Header */}
			<motion.div
				variants={navbarVariants}
				initial="visible"
				animate={
					isSmallScreen
						? "visible"
						: isScrollDown
							? "visible"
							: "hidden"
				}
				className={`fixed top-0 left-0 w-full h-fit flex flex-col justify-between lg:justify-around items-center z-50 text-white transition-all duration-300 
          ${
				isScrolled || path !== "/"
					? "rounded-b-2xl "
					: "bg-gradient-to-b from-black/50 to-transparent"
			}`}
			>
				{/* Top Bar */}
				<TopBar />

				{/* Navbar */}
				<div
					className={` w-full py-3 rounded-b-[2rem] ${isScrolled || path !== "/" ? `bg-primary ${isMenuVisible ? "" : "shadow-xl"}` : ""}`}
				>
					<div className="container flex justify-between gap-4">
						<Link href="/">
							<Image
								src="/images/logo-horizontal-white.svg"
								width={50}
								height={50}
								className="w-32 sm:w-40 xl:w-52"
								alt="logo"
							/>
						</Link>

						{/* Desktop Navigation */}
						<nav className="max-lg:hidden flex  items-center">
							{links.map((link, index) => {
								const hasSubLinks =
									link.subLinks && link.subLinks.length > 0
								return (
									<div
										key={index}
										className="relative group py-1 px-2 z-10 cursor-pointer"
									>
										<div
											className={`
												absolute
												rounded-full
												top-0
												right-0
												px-2 
												${isScrolled ? "bg-[rgba(0,138,117,0.99)]" : "bg-[rgba(0,102,84,0.82)]"}
												h-full
												w-full
												-z-10
												scale-0
												group-hover:scale-105
												origin-center
												transition-transform
												duration-100
												ease-in-out
												`}
										/>

										{link.href ? (
											<Link
												href={link.href}
												className="flex items-center gap-2 text-xs xl:text-base hover:text-gray-200 transition "
											>
												<Image
													src="/shapes/nav-menu-icon.svg"
													width={50}
													height={50}
													className="w-2"
													alt="icon"
												/>
												{link.label}
											</Link>
										) : (
											<>
												<div className="flex items-center gap-2 text-xs xl:text-base hover:text-gray-200 transition ">
													<Image
														src="/shapes/nav-menu-icon.svg"
														width={50}
														height={50}
														className="w-2"
														alt="icon"
													/>
													{link.label}
												</div>

												{hasSubLinks && (
													<div
														className="
													  absolute top-[2rem] -right-2 hidden py-2
													   min-w-52 bg-gray-100 rounded-lg shadow-lg
													  group-hover:block z-20
													"
													>
														{link.subLinks.map(
															(
																subLink,
																subIndex,
															) => (
																<Link
																	key={
																		subIndex
																	}
																	href={
																		subLink.href
																	}
																	className="pr-2 py-2 hover:bg-primary/80 transition group-hover:block text-gray-700"
																>
																	{
																		subLink.label
																	}
																</Link>
															),
														)}
													</div>
												)}
											</>
										)}
									</div>
								)
							})}
						</nav>

						{/* Mobile Hamburger Icon */}
						<button
							className="lg:hidden"
							onClick={toggleMenu}
							aria-label={
								isMenuVisible ? "Close Menu" : "Open Menu"
							}
						>
							{!isMenuVisible ? (
								<MenuIcon stroke={"#ffffff"} />
							) : (
								<XIcon stroke={"#ffffff"} />
							)}
						</button>
					</div>
				</div>
			</motion.div>

			{/* Sidebar Navigation (Mobile) */}
			<nav
				className={`fixed flex flex-col justify-between top-0 left-0 w-full h-full bg-primary transform transition-transform duration-500 ease-in-out z-30 ${
					isMenuVisible ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col justify-center gap-6 items-center mt-10 h-2/3 px-4">
					{links.map((link, index) => {
						const hasSubLinks =
							link.subLinks && link.subLinks.length > 0
						const isOpen = expandedIndex === index

						return (
							<div key={index} className="w-full">
								<div className="flex items-center justify-between">
									{/* If there's an href, make the parent clickable */}
									{link.href ? (
										<Link
											href={link.href}
											onClick={() =>
												setIsMenuVisible(false)
											}
											className="text-xl text-white hover:text-gray-200 transition"
										>
											{link.label}
										</Link>
									) : (
										<span className="text-xl text-white">
											{link.label}
										</span>
									)}

									{/* Show expand toggle if subLinks exist */}
									{hasSubLinks && (
										<button
											onClick={() => handleExpand(index)}
											className="text-xl text-white ml-4"
										>
											{isOpen ? "-" : "+"}
										</button>
									)}
								</div>

								{/* Mobile Submenu */}
								{hasSubLinks && (
									<div
										className={`overflow-hidden transition-all 
                      ${isOpen ? "max-h-96 mt-2" : "max-h-0"}
                    `}
									>
										{link.subLinks.map(
											(subLink, subIndex) => (
												<Link
													key={subIndex}
													href={subLink.href}
													onClick={() => {
														setIsMenuVisible(false)
													}}
													className="block pl-6 py-2 text-white/90 hover:text-gray-200"
												>
													{subLink.label}
												</Link>
											),
										)}
									</div>
								)}
							</div>
						)
					})}
				</div>

				{/* Socials and Footer */}
				<div className="w-full flex flex-col text-center">
					<p className={"py-4"}>تابعوا اخر اخبارنا عبر:</p>
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
									<FontAwesomeIcon
										icon={item.icon}
										size={"2x"}
									/>
								</Link>
							))}
						</div>
					</div>
					<p className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-300 my-4 p-2">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy;
						1824
					</p>
				</div>
			</nav>
		</motion.div>
	)
}
