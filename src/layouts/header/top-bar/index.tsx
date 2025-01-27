"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTiktok,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {faCalendar, faGlobe} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

// Local imports
import useWindowEvents from "../../../hooks/window-events";
import { useLanguages } from "../../../context/language-context";

// 1. Define the structure of each social link




// 4. Social links array
const bigNavSocials  = [
    { href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
    { href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
    { href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
    { href: "https://twitter.com/imamzainorg", icon: faTwitter },
];

// 5. TopBar component
export default function TopBar() {
    // We'll type the return of usePathname (string or null).
    const path = usePathname() ?? "";

    // Cast or type your custom hook return to match the interface we created
    const { isScrolled, isSmallScreen, isScrollDown } = useWindowEvents()  ;

    // 6. State for the language dropdown
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // 7. Language context
    //    If your context is typed, it should automatically infer these. If not, you can define an interface.
    const {   setLanguage, languages } = useLanguages()  ;

    // 8. Handler to update the language
    const handleLanguageChange = (language: string) => {
        setLanguage(language);
        setIsOpen(false);
    };

    const closeMenu = () => setIsOpen(false);

    // 9. Close dropdown if clicking outside .dropdown-lang
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".dropdown-lang")) {
                closeMenu();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                className={`w-full transition-all duration-300 max-lg:hidden ${
                    isScrolled || path !== "/" ? "bg-white" : ""
                }`}
            >
                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-8">
                            <FontAwesomeIcon icon={faCalendar} color={`${!isScrolled ?"#ffffff": "#bb9661"}`} />
                            <p>

                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-1">
                            <div className="flex justify-end gap-6 items-center">
                                {bigNavSocials.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                              text-xl hover:scale-105 transition-transform h-5 p-0 m-0
                                              ${isScrolled || path !== "/" ? "text-primary" : "text-white"}
                                            `}
                                    >
                                        <FontAwesomeIcon icon={social.icon} size="sm" />
                                    </Link>
                                ))}

                                <div className="relative cursor-pointer py-1 dropdown-lang">
                                    <button
                                        className="flex items-center justify-between rounded-full bg-none"
                                        onClick={() => setIsOpen((prev) => !prev)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGlobe}
                                            className={`${
                                                isScrolled || path !== "/" ? "text-primary" : "text-white"
                                            }`}
                                            size="lg"
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="absolute top-5 left-5 bg-white rounded-lg w-fit z-50 flex flex-col text-gray-800 shadow-xl translate-y-2 animate-dropdown transition-all duration-300">
                                            {languages.map((language, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full h-full"
                                                    onClick={() => handleLanguageChange(language.code)}
                                                >
                                                    <p
                                                        className={`
                                                            font-semibold text-gray-500 text-sm
                                                            w-full h-full rounded-lg
                                                            cursor-pointer py- px-4
                                                            hover:bg-gray-300
                                                            `}
                                                    >
                                                        {language.name}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Keyframe animation for the dropdown */}
            <style jsx>{`
                @keyframes dropdown {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-dropdown {
                    animation: dropdown 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
