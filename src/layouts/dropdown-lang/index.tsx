"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useLanguages } from "@/context/language-context";

export default function DropdownLang({ broad }: { broad?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, languages } = useLanguages();

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-lang")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer py-1 dropdown-lang">
      <button
        className={`flex items-center justify-between bg-white rounded-full px-1 border shadow ${
          broad ? "h-7" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          className="px-3"
          color="#000000"
          size="xs"
        />

        {/* ⭐ الحل هنا */}
        <span
          className="text-sm w-fit font-medium text-black"
          suppressHydrationWarning
        >
          {currentLanguage.name}
        </span>

        <FontAwesomeIcon
          icon={faChevronDown}
          className="px-3"
          color="#000000"
          size="xs"
        />
      </button>

      {isOpen && (
        <div className="absolute top-5 left-4 bg-white rounded-lg w-fit z-50 flex flex-col text-gray-800 shadow-xl translate-y-2 animate-dropdown transition-all duration-300">
          {languages.map((language, index) => (
            <button
              key={index}
              onClick={() => handleLanguageChange(language.code)}
              className="font-semibold text-gray-500 text-sm text-left rounded-lg py-2 px-4 hover:bg-gray-300"
            >
              {language.name}
            </button>
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
