// TopImage.js
"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DropdownLang from "@/layouts/dropdown-lang";
import { motion, useScroll } from "framer-motion";
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


const navbarVariants = {
    visible: {
        y: 0,
        transition: { duration: 0.3 },
    },
    hidden: {
        y: -30,
        transition: { duration: 0.3  },
    },
};

export default function TopImage() {
    const path = usePathname();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTopBarVisible, setIsTopBarVisible] = useState(true);
    const prevScrollY = useRef(0);
    const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
    const { scrollY } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);
            if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                setIsTopBarVisible(false);
            } else {
                setIsTopBarVisible(true);
            }
            prevScrollY.current = currentScrollY;
        };
        const unsubscribe = scrollY.onChange(handleScroll);
        return () => {
            unsubscribe();
        };
    }, [scrollY]);

    useEffect(() => {
        if (isMenuVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuVisible]);

    return (
        <motion.div className="text-white">
            {/* Header */}
            <motion.div
                variants={navbarVariants}
                initial="visible"
                animate={isTopBarVisible ? "visible" : "hidden"}
                className={`fixed top-0 left-0 w-full h-fit flex flex-col justify-between lg:justify-around items-center z-50 text-white transition-all duration-300
                 ${
                    isScrolled || path !== "/"
                        ? "rounded-b-2xl "
                        : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md"
                }`}
            >
                {/* Top Bar */}
                <div
                    className={`w-full transition-all duration-300 ${
                        isScrolled || path !== "/" ? "bg-white" : ""
                    }`}
                >
                    <div className="container">
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
                                            isScrolled ||  path !== "/" ? "text-primary" : "text-white"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={social.icon} size="sm" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navbar */}
                <div
                    style={{borderBottomRightRadius:'1.5rem' , borderBottomLeftRadius : '1.5rem'}}
                    className={`w-full  py-3 ${
                        isScrolled || path !== "/" ? "bg-primary" : " "
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
                                    className="flex items-center gap-2 text-xs xl:text-base hover:bg-[#009d7d] bg-black  "
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
                            aria-label={isMenuVisible ? "Close Menu" : "Open Menu"}
                        >
                            {!isMenuVisible ? (
                                <MenuIcon stroke={isMenuVisible || path !== "/" ? "#ffffff" : "#ffffff"} />
                            ) : (
                                <XIcon stroke={isMenuVisible || path !== "/" ? "#ffffff" : "#ffffff"} />
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
                <ul className="flex flex-col justify-center my-20 h-2/3">
                    {links.map((link) => (
                        <li className="w-full" key={link.label}>
                            <Link
                                href={link.href}
                                onClick={() => setIsMenuVisible(false)}
                                className="flex items-center justify-center gap-4 py-3 px-4 text-xl text-white hover:bg-primary-dark transition-colors"
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
                                    rel="noopener noreferrer"
                                    href={item.href}
                                    className="rounded-full border-[1px] p-2 border-white scale-75 md:scale-90 active:scale-50 hover:scale-105 hover:-translate-y-2 duration-300 hover:border-spacing-16"
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-xl text-slate-400 my-4 p-2">
                        جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy; 1824
                    </p>
                </div>
            </nav>
        </motion.div>
    );
}
