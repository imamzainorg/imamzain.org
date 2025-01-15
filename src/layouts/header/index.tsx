"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTelegram,
	faInstagram,
	faYoutube,
	faTiktok,
	faWhatsapp,
	faTwitter,
	faFacebook,
} from "@fortawesome/free-brands-svg-icons"; // Corrected import for brand icons
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DropdownLang from "@/layouts/dropdown-lang";

const links = [
	{ label: "سيرة الأمام زين العابدين (ع)", href: "/coming-soon" },
	{ label: "حول المؤسسة", href: "/about" },
	{ label: "الأصدارات", href: "/publications" },
	{ label: "المكتبة التخصصية", href: "/library" },
	{ label: "النشاطات", href: "/news" },
	{ label: "الخدمات", href: "/coming-soon" },
	{ label: "الوسائط", href: "/coming-soon" },
];

const socials = [
	{ href: "https://telegram.me/imamzainorg", icon: faTelegram },
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://youtube.com/@imamzainorg", icon: faYoutube },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "mailto:dev@imamzain.org", icon: faEnvelope },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6", icon: faMapMarkerAlt },
	{ href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L", icon: faWhatsapp },
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
];

const bigNavSocials = [
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
];

export default function TopImage() {
	const path = usePathname();
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

	return (
		<div className="text-white">
			{/* Header */}
			<header
				className={`fixed top-0 left-0 w-full rounded-b-2xl flex flex-col justify-between lg:justify-around items-center z-50 text-white ${
					path !== "/"
						? "bg-primary"
						: "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[1px]"
				}`}
			>


					<div className="container flex justify-between w-full gap-2 bg-whie">
						<DropdownLang />
						<div className="flex justify-end gap-3 items-center ">
							{bigNavSocials.map((social, index) => (
								<Link
									key={index}
									href={social.href}
									className="text-lg text-white hover:scale-105 transition-transform h-5 p-0 m-0"
								>
									<FontAwesomeIcon icon={social.icon} size={'sm'} className={''}/>
								</Link>
							))}
						</div>
					</div>

					<div className="container w-full flex justify-between gap-4">
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
						<button className="lg:hidden" onClick={toggleMenu}>
							{!isMenuVisible ? <MenuIcon stroke="#ffffff" /> : <XIcon stroke="#ffffff" />}
						</button>

				</div>
			</header>

			{/* Sidebar Navigation */}
			<nav
				className={`fixed flex flex-col justify-between top-0 left-0 w-full h-full bg-primary transform transition-transform duration-500 ease-in-out z-30 ${
					isMenuVisible ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<ul className="flex flex-col justify-center my-20 h-2/3">
					{links.map((link) => (
						<li className="w-full" key={link.label}>
							<Link
								href={link.href}
								onClick={() => setIsMenuVisible(false)}
								className="flex items-center justify-center gap-4 py-3 px-4 text-xl"
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
				<div className="w-full flex flex-col text-center">
					تابعوا اخر اخبارنا عبر:
					<div className="w-2/3 mx-auto my-2">
						<div className="flex flex-wrap justify-center items-center gap-2">
							{socials.map((item, index) => (
								<a
									key={index}
									target="_blank"
									href={item.href}
									className="rounded-full border-[1px] p-2 border-white scale-75 md:scale-90 active:scale-50 hover:scale-105 hover:-translate-y-2 duration-300 hover:border-spacing-16"
								>
									<FontAwesomeIcon icon={item.icon} />
								</a>
							))}
						</div>
					</div>
					<p className="text-xs sm:text-sm md:text-base lg:base-xl text-slate-400 my-4 p-2">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy; 1824
					</p>
				</div>
			</nav>
		</div>
	);
}
