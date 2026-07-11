"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Facebook,
  Globe,
  Instagram,
  Sun,
  Moon,
  Youtube,
} from "lucide-react";
import { TelegramIcon, TikTokIcon, XIcon } from "@/components/brand-icons";
import { usePathname } from "next/navigation";
import useWindowEvents from "@/hooks/window-events";
import { useLanguages } from "@/context/language-context";

export default function TopBar() {
  const [hijriDate, setHijriDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const path = usePathname();
  const { isScrolled } = useWindowEvents();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setLanguage, languages } = useLanguages();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Apply theme on change
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    fetch("/api/hijri-date")
      .then((res) => res.json())
      .then((data) => {
        if (data.hijriDate) {
          setHijriDate(data.hijriDate);
        } else {
          setError("تعذر استخراج التاريخ الهجري");
        }
      })
      .catch(() => {
        setError("فشل الاتصال بالخادم");
      });
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
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
    <>
      <div
        className={`w-full transition-all duration-300 max-lg:hidden ${
          isScrolled || path !== "/" ? "bg-white" : ""
        }`}
      >
        <div className="container">
          <div className="flex justify-between items-center py-1">
            {/* التاريخ الهجري */}
            <div className="flex items-center gap-2">
              <Calendar
                className={`w-4 h-4 mt-1 transition-colors duration-300 ${
                  theme === "dark"
                    ? isScrolled || path !== "/"
                      ? "text-[#a53232]"
                      : "text-white"
                    : "text-[#bb9661]"
                }`}
              />
              <p>
                <span
                  className={`text-base p-0 mt-1 transition-colors duration-300 ${
                    theme === "dark"
                      ? isScrolled || path !== "/"
                        ? "text-[#a53232]"
                        : "text-white"
                      : "text-[#bb9661]"
                  }`}
                >
                  {hijriDate
                    ? hijriDate.split("||")[0]
                    : error
                      ? new Intl.DateTimeFormat('ar', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(new Date())
                      : "جاري تحميل التاريخ..."}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-center gap-5">
              {[
                {
                  href: "https://www.instagram.com/imamzainorg/",
                  Icon: Instagram,
                  hoverColor: "dark:hover:text-[#E1306C] hover:text-[#E1306C]",
                },
                {
                  href: "https://www.tiktok.com/@imamzainorg",
                  Icon: TikTokIcon,
                  hoverColor: "dark:hover:text-black hover:text-black",
                },
                {
                  href: "https://www.facebook.com/@imamzainorg",
                  Icon: Facebook,
                  hoverColor: "dark:hover:text-[#1877F2] hover:text-[#1877F2]",
                },
                {
                  href: "https://twitter.com/imamzainorg",
                  Icon: XIcon,
                  hoverColor: "dark:hover:text-black hover:text-black",
                },
                {
                  href: "https://www.youtube.com/@imamzainorg",
                  Icon: Youtube,
                  hoverColor: "dark:hover:text-[#FF0000] hover:text-[#FF0000]",
                },
                {
                  href: "https://t.me/imamzainorg",
                  Icon: TelegramIcon,
                  hoverColor: "dark:hover:text-[#0088cc] hover:text-[#0088cc]",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:scale-105 transition-transform h-5 p-0 m-0
                    ${
                      isScrolled || path !== "/"
                        ? "text-primary dark:text-[#681717]"
                        : "text-white"
                    }
                    ${social.hoverColor}
                  `}
                >
                  <social.Icon className="w-4 h-4" />
                </Link>
              ))}

              {/* زر تغيير الثيم */}
              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-full transition ${
                  isScrolled || path !== "/"
                    ? "bg-secondary dark:bg-Muharram_secondary text-white"
                    : "bg-white text-primary dark:text-Muharram_primary"
                }`}
                title="تبديل الثيم"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* قائمة اختيار اللغة */}
              <div
                className="relative cursor-pointer py-1 dropdown-lang"
                onMouseEnter={() => {
                  clearTimeout(timeoutRef.current!);
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setIsOpen(false);
                  }, 200);
                }}
              >
                <button className="flex items-center justify-between rounded-full bg-none ho">
                  <Globe
                    className={`w-4 h-4 ${
                      isScrolled || path !== "/"
                        ? "text-primary dark:text-Muharram_primary"
                        : "text-white"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="absolute top-5 -right-8 bg-white rounded-lg w-fit z-50 flex flex-col text-gray-800 shadow-xl translate-y-2 animate-dropdown transition-all duration-300">
                    {languages.map((language, index) => (
                      <div
                        key={index}
                        className="w-full h-full"
                        onClick={() => handleLanguageChange(language.code)}
                      >
                        <p className="font-semibold text-gray-500 text-sm w-full h-full rounded-lg cursor-pointer px-4 py-2 hover:bg-gray-300">
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

      {/* أنميشن القائمة المنسدلة */}
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
