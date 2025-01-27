// TopImage.js
"use client"

import {MenuIcon, XIcon} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {useState, useEffect} from "react"
import {usePathname} from "next/navigation"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faTelegram,
    faInstagram,
    faYoutube,
    faTiktok,
    faWhatsapp,
    faTwitter,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons"
import {faEnvelope, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons"
import {motion} from "motion/react"
import useWindowEvents from "@/hooks/window-events"
import HeaderLinks from "./header-links"
import TopBar from "@/layouts/header/top-bar";
import {Accordion, AccordionItem} from "@heroui/accordion";

const links = [
    {
        label: "سيرة الأمام زين العابدين (ع)",
        subLinks: [
            {label: "مرئيات", href: "/media/videos"},
            {label: "صور", href: "/media/photos"},
        ],
    },
    {
        label: "حول المؤسسة",
        subLinks: [
            {label: "مرئيات", href: "/media/videos"},
            {label: "صور", href: "/media/photos"},
        ],
    },
    {
        label: "الأصدارات",
        href: "/publications",
    },
    {
        label: "المكتبة التخصصية",
        href: "/library",
    },
    {
        label: "النشاطات",
        subLinks: [
            {label: "مؤتمرات", href: "/news/conferences"},
            {label: "ندوات", href: "/news/seminars"},
            {label: "معارض", href: "/news/exhibitions"},
        ],
    },
    {
        label: "الخدمات",
        subLinks: [
            {label: "خدمة 1", href: "/services/service1"},
            {label: "خدمة 2", href: "/services/service2"},
            {label: "خدمة 3", href: "/services/service3"},
        ],
    },
    {
        label: "الوسائط",
        subLinks: [
            {label: "مرئيات", href: "/media/videos"},
            {label: "صور", href: "/media/photos"},
        ],
    },
];


const socials = [
    {href: "https://telegram.me/imamzainorg", icon: faTelegram},
    {href: "https://www.instagram.com/imamzainorg/", icon: faInstagram},
    {href: "https://youtube.com/@imamzainorg", icon: faYoutube},
    {href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok},
    {href: "mailto:dev@imamzain.org", icon: faEnvelope},
    {href: "https://www.facebook.com/@imamzainorg", icon: faFacebook},
    {href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6", icon: faMapMarkerAlt},
    {
        href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
        icon: faWhatsapp,
    },
    {href: "https://twitter.com/imamzainorg", icon: faTwitter},
]



const navbarVariants = {
    visible: {
        y: 0,
        transition: {duration: 0.3, delay: 0},
    },
    hidden: {
        y: -30,
        transition: {duration: 0.3, delay: 0},
    },
}

export default function Header() {
    const path = usePathname()
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const toggleMenu = () => setIsMenuVisible(!isMenuVisible)

    const {isScrolled, isSmallScreen, isScrollDown} = useWindowEvents()

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
                <TopBar />

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
                    <div className="container flex justify-between items-center gap-4">
                        <Link href="/">
                            <Image
                                src="/images/logo-horizontal-white.svg"
                                width={50}
                                height={50}
                                className="w-32 sm:w-40 xl:w-52"
                                alt="logo"
                            />
                        </Link>

                        <HeaderLinks links={links}/>

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
                className={`fixed flex flex-col pt-20 justify-between top-0 left-0 w-full h-full bg-primary transform transition-transform duration-500 ease-in-out z-30 ${
                    isMenuVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <HeaderLinks links={links}/>
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
