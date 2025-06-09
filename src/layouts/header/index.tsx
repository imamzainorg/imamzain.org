"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import useWindowEvents from "@/hooks/window-events";
import TopBar from "@/layouts/header/top-bar";
import { LogoRotate } from "@/layouts/header/logo-rotate";

const links = [
  {
    label: "سيرة الإمام زين العابدين (ع)",
    href: "/his-life",
  },
  {
    label: "حول المؤسسة",
    subLinks: [
      { label: "من نحن", href: "/about" },
      { label: "رؤية واهداف المؤسسة", href: "/about/vision-and-goals" },
    ],
  },
  {
    label: "الإصدارات",
    href: "/publications",
  },
  {
    label: "المكتبة التخصصية",
    subLinks: [
      { label: "ما كتب عن الإمام زين العابدين", href: "/library" },
      {
        label: "الصحيفة السجادية",
        href: "/library/al-sahifa",
      },
      {
        label: "رسالة الحقوق",
        href: "/library/risalat-al-huqoq",
      },
      // {
      // 	label: "الصفحة العلمية",
      // 	href: "/research",
      // },
    ],
  },
  {
    label: "النشاطات",
    subLinks: [
      { label: "الاخبار", href: "/news" },
      { label: "ملتقى البقيع", href: "/baqi-gathering" },
      { label: "المسابقات", href: "/contests" },
    ],
  },
  {
    label: "الخدمات",
    subLinks: [
      { label: "اتصل بنا", href: "/services" },
      { label: "الزيارة بالإنابة", href: "/visitation" },
      { label: "نقاط البيع المباشر", href: "/services/stores" },
      { label: "تطبيق أنوار سجادية", href: "/application" },
    ],
  },
  {
    label: "الوسائط",
    subLinks: [
      { label: "الصوتيات", href: "/media/audios" },
      { label: "المرئيات", href: "/media/videos" },
      { label: "معرض الصور", href: "/media/images" },
    ],
  },
];

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
];

const navbarVariants = {
  visible: {
    y: 0,
    transition: { duration: 0.3, delay: 0 },
  },
  hidden: {
    y: -32,
    transition: { duration: 0.3, delay: 0 },
  },
};

export default function Header() {
  const path = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // For mobile submenu toggle:
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  const { isScrolled, isSmallScreen, isScrollDown } = useWindowEvents();

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

  useEffect(() => {
    if (!isSmallScreen) {
      setIsMenuVisible(false);
    }
  }, [isSmallScreen]);

  // Expand/collapse sub-links in mobile
  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

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
          isScrolled || path !== "/"
            ? "rounded-b-2xl "
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Top Bar */}

        <TopBar />

        {/* Navbar */}
        <div
          className={`w-full z-9999 rounded-b-[2rem] ${isScrolled || (path !== "/" && path !== "/media/videos") ? `bg-primary ${isMenuVisible ? "" : "shadow-2xl"}` : ""}`}
        >
          <div className="container flex justify-between items-center gap-4">
            <Link href="/">
              <LogoRotate
                className="w-32 sm:w-40 xl:w-52 h-12 lg:h-20 cursor-pointer"
                paths={[
                  "/images/logo-horizontal-white.svg",
                  "/images/imamhussainorg-logo.svg",
                ]}
              />
            </Link>

            {/* Desktop Navigation */}

            <nav className="max-lg:hidden flex   items-center">
              {links.map((link, index) => {
                const hasSubLinks = link.subLinks && link.subLinks.length > 0;

                return (
                  <div
                    key={index}
                    className="relative group py-2 px-3 cursor-pointer transition"
                  >
            
                    <div
                      className={`absolute rounded-full -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-4/5 bg-white transition-transform duration-300 ease-in-out ${
                        link.href && path.includes(link.href)
                          ? "scale-100"
                          : "scale-0 group-hover:scale-100"
                      }`}
                    />

                    <Link
                      href={link.href || "#"}
                      className="flex items-center gap-2 text-sm xl:text-base text-white hover:text-gray-200 transition"
                    >
                      <Image
                        src="/shapes/nav-menu-icon.svg"
                        width={8}
                        height={8}
                        alt="icon"
                        className="w-1.5"
                      />
                      <p className="">{link.label}</p>
                      {hasSubLinks && (
                        <span className="ml-1 text-xs text-white"></span> // سهم صغير ▼
                      )}
                    </Link>

                    {hasSubLinks && (
                      <div className="absolute top-full right-0 min-w-56 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-50">
                        <div className="bg-white shadow-xl rounded-xl py-4 px-4 space-y-2">
                          {link.subLinks.map((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subLink.href}
                              className="block px-2 py-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 transition"
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Hamburger Icon */}
            <button
              className="lg:hidden"
              onClick={toggleMenu}
              aria-label={isMenuVisible ? "Close Menu" : "Open Menu"}
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
            const hasSubLinks = link.subLinks && link.subLinks.length > 0;
            const isOpen = expandedIndex === index;

            return (
              <div key={index} className="w-full">
                <div className="flex items-center justify-between">
                  {/* If there's an href, make the parent clickable */}
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuVisible(false)}
                      className="text-xl text-white hover:text-gray-200 transition"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-xl text-white">{link.label}</span>
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
                    className={`overflow-hidden transition-all ${
                      isOpen ? "max-h-96 mt-2" : "max-h-0"
                    }`}
                  >
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subLink.href}
                        onClick={() => setIsMenuVisible(false)}
                        className="block pl-6 py-2 text-white/90 hover:text-gray-200"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
                  <FontAwesomeIcon icon={item.icon} size={"2x"} />
                </Link>
              ))}
            </div>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-300 my-4 p-2">
            جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy; 1824
          </p>
        </div>
      </nav>
    </motion.div>
  );
}
