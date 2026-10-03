"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
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
        className={
          broad
            ? "flex h-11 items-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-4 text-white transition hover:border-white hover:bg-white hover:text-primary"
            : "flex items-center justify-between bg-white rounded-full px-1 border shadow"
        }
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Globe className={broad ? "size-4" : "mx-3 w-3 h-3 text-black"} />

        {/* ⭐ الحل هنا */}
        <span
          className={`text-sm w-fit font-medium ${broad ? "" : "text-black"}`}
          suppressHydrationWarning
        >
          {currentLanguage.name}
        </span>

        <ChevronDown className={broad ? "size-4" : "mx-3 w-3 h-3 text-black"} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 flex flex-col bg-white text-gray-800 shadow-xl animate-dropdown ${
            broad
              ? "bottom-full left-0 mb-2 min-w-full overflow-hidden rounded-xl"
              : "top-5 left-4 w-fit translate-y-2 rounded-lg"
          }`}>
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
