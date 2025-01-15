"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function DropdownLang() {
    const [lang, setLang] = useState<string>("العربية");
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { name: "العربية", link: "#" },
        { name: "English", link: "#" },
        { name: "فارسى", link: "#" },
        { name: "اردو", link: "#" },
    ];

    const handleLanguageChange = (language: string) => {
        setLang(language);
        setIsOpen(false);
    };


    const closeMenu = () => setIsOpen(false);

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
        <div className="relative cursor-pointer py-1 dropdown-lang max-h-0">
            <button
                className="flex items-center justify-between bg-white rounded-full  px-1  border shadow"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <FontAwesomeIcon icon={faGlobe} className="px-3" color="#000000" size="xs" />
                <span className="text-sm w-fit font-medium text-black">{lang}</span>
                <FontAwesomeIcon icon={faChevronDown} className="px-3" color="#000000" size="xs" />
            </button>
            {isOpen && (
                <div    style={{top: '30px' , right : '5px'}} className="absolute bg-white rounded-lg w-fit z-50 flex flex-col   py-1 px-4 text-gray-800 shadow-xl translate-y-2 animate-dropdown transition-all duration-300">
                    {languages.map((language, index) => (
                        <div
                            key={index}
                            className="bg-black w-full h-full"
                            onClick={() => handleLanguageChange(language.name)}
                        >
                           <p
                           className={' py-0.5  font-semibold text-gray-500 text-sm  w-full h-full rounded px-2  cursor-pointer hover:text-white hover:bg-black  '}
                           >
                               {language.name}
                           </p>
                        </div>
                    ))}
                </div>
            )}
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
        </div>
    );
}
