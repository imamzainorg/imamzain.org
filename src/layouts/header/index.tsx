// TopImage.js
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
import DropdownLang from "@/layouts/dropdown-lang"
import { motion } from "motion/react"
import useWindowEvents from "@/hooks/window-events"

const links = [
	{ label: "سيرة الأمام زين العابدين (ع)", href: "/coming-soon" },
	{ label: "حول المؤسسة", href: "/about" },
	{ label: "الأصدارات", href: "/publications" },
	{ label: "المكتبة التخصصية", href: "/library" },
	{ label: "النشاطات", href: "/news" },
	{ label: "الخدمات", href: "/coming-soon" },
	{ label: "الوسائط", href: "/coming-soon" },
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

const bigNavSocials = [
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
]

const navbarVariants = {
	visible: {
		y: 0,
		transition: { duration: 0.3, delay: 0 },
	},
	hidden: {
		y: -30,
		transition: { duration: 0.3, delay: 0 },
	},
}

export default function Header() {
	const path = usePathname()
	const [isMenuVisible, setIsMenuVisible] = useState(false)

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
							: "bg-gradient-to-b from-black/50 to-transparent  "
					}`}
			>
				{/* Top Bar */}
				<div
					className={`w-full transition-all duration-300 max-lg:hidden ${
						isScrolled || path !== "/" ? "bg-white" : ""
					}`}
				>
					<div className="container ">
						<div className="flex justify-between items-center ">
							<DropdownLang />
							<div className="flex justify-end gap-6 items-center">
								{bigNavSocials.map((social, index) => (
									<Link
										key={index}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className={`text-xl hover:scale-105 transition-transform h-5 p-0 m-0 ${
											isScrolled || path !== "/"
												? "text-primary"
												: "text-white"
										}`}
									>
										<FontAwesomeIcon
											icon={social.icon}
											size="sm"
										/>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Navbar */}
				<div
					className={`
                     w-full  py-3  rounded-b-[2rem]
                     ${
							isScrolled || path !== "/"
								? `bg-primary ${
										isMenuVisible ? "" : "shadow-xl"
								  }  `
								: " "
						}`}
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
						<nav className="flex gap-4 max-lg:hidden">
							{links.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									className="flex items-center gap-2 text-xs xl:text-base   "
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
							))}
						</nav>

						<button
							className="lg:hidden"
							onClick={toggleMenu}
							aria-label={
								isMenuVisible ? "Close Menu" : "Open Menu"
							}
						>
							{!isMenuVisible ? (
								<MenuIcon
									stroke={
										isMenuVisible || path !== "/"
											? "#ffffff"
											: "#ffffff"
									}
								/>
							) : (
								<XIcon
									stroke={
										isMenuVisible || path !== "/"
											? "#ffffff"
											: "#ffffff"
									}
								/>
							)}
						</button>
					</div>
				</div>
			</motion.div>

			{/* Sidebar Navigation */}
			<nav
				className={`fixed flex flex-col justify-between top-0 left-0 w-full h-full bg-primary transform transition-transform duration-500 ease-in-out z-30 ${
					isMenuVisible ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex flex-col justify-center gap-6 items-center mt-10 h-2/3">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							onClick={() => setIsMenuVisible(false)}
							className=" text-xl text-white  "
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="w-full flex flex-col text-center">
					<p className={"py-4"}>تابعوا اخر اخبارنا عبر:</p>
					<div className="w-2/3 mx-auto my-2">
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
