"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFacebook,
	faInstagram,
	faTiktok,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { faCalendar, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"
import moment from "moment-hijri" // Import moment-hijri
import useWindowEvents from "@/hooks/window-events"
import { useLanguages } from "@/context/language-context"

// Static Hijri-Gregorian calendar data (for day and month)
const hijriCalendar = [
	{ hijriMonth: "Muharram", gregorianStartDate: "2024-06-01" },
	{ hijriMonth: "Safar", gregorianStartDate: "2024-07-01" },
	{ hijriMonth: "Rabi' al-Awwal", gregorianStartDate: "2024-08-01" },
	{ hijriMonth: "Rabi' al-Thani", gregorianStartDate: "2024-09-01" },
	{ hijriMonth: "Jumada al-Awwal", gregorianStartDate: "2024-10-01" },
	{ hijriMonth: "Jumada al-Thani", gregorianStartDate: "2024-11-01" },
	{ hijriMonth: "Rajab", gregorianStartDate: "2024-12-01" },
	{ hijriMonth: "Sha'ban", gregorianStartDate: "2025-01-01" },
	{ hijriMonth: "Ramadan", gregorianStartDate: "2025-03-02" },
	{ hijriMonth: "Shawwal", gregorianStartDate: "2025-04-01" },
	{ hijriMonth: "Dhul-Qi'dah", gregorianStartDate: "2025-06-01" },
	{ hijriMonth: "Dhul-Hijjah", gregorianStartDate: "2026-08-01" },
]

// Arabic month names for display (matching the static order)
const arabicMonths = [
	"محرم",
	"صفر",
	"ربيع الأول",
	"ربيع الآخر",
	"جمادى الأولى",
	"جمادى الآخرة",
	"رجب",
	"شعبان",
	"رمضان",
	"شوال",
	"ذو القعدة",
	"ذو الحجة",
]

// Arabic numerals conversion array
const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

const toArabicNumerals = (number: number | string) => {
	return number
		.toString()
		.split("")
		.map((digit) => arabicNumerals[parseInt(digit, 10)] || digit)
		.join("")
}

// Calculate Hijri day from the static Gregorian start date (assuming 29 days per month)
const getHijriDay = (gregorianStartDate: string, today: Date) => {
	const startDate = new Date(gregorianStartDate)
	const diffInTime = today.getTime() - startDate.getTime()
	return Math.floor(diffInTime / (1000 * 3600 * 24)) + 1
}

// Format the Hijri date in Arabic as "year - day - month"
const formatHijriDateInArabic = (
	hijriDay: number,
	hijriMonth: string,
	hijriYear: string,
) => {
	const arabicYear = toArabicNumerals(hijriYear)
	const arabicDay = toArabicNumerals(hijriDay)
	const arabicMonth =
		arabicMonths[
			hijriCalendar.findIndex((month) => month.hijriMonth === hijriMonth)
		]
	return ` ${arabicDay} - ${arabicMonth} - ${arabicYear} هـ`
}

export default function TopBar() {
	const path = usePathname()
	const { isScrolled } = useWindowEvents()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { setLanguage, languages } = useLanguages()

	const handleLanguageChange = (language: string) => {
		setLanguage(language)
		setIsOpen(false)
	}

	const closeMenu = () => setIsOpen(false)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest(".dropdown-lang")) {
				closeMenu()
			}
		}
		document.addEventListener("click", handleClickOutside)
		return () => {
			document.removeEventListener("click", handleClickOutside)
		}
	}, [])

	const today = new Date()

	// Determine the current Hijri month using the static mapping
	const currentHijriMonth = hijriCalendar.find((month) => {
		const startDate = new Date(month.gregorianStartDate)
		const endDate = new Date(startDate)
		endDate.setDate(startDate.getDate() + 29) // Assuming 29 days per month
		return today >= startDate && today <= endDate
	})

	// Calculate the Hijri day using the static start date
	const hijriDay = currentHijriMonth
		? getHijriDay(currentHijriMonth.gregorianStartDate, today)
		: 0

	// Get the dynamic Hijri year from the moment-hijri library
	const hijriYearFromLibrary = moment().format("iYYYY")

	// Format the complete Hijri date in Arabic as "year - day - month"
	const hijriDateInArabic = currentHijriMonth
		? formatHijriDateInArabic(
				hijriDay,
				currentHijriMonth.hijriMonth,
				hijriYearFromLibrary,
			)
		: "جاري التحميل..."

	return (
		<>
			<div
				className={`w-full transition-all duration-300 max-lg:hidden ${
					isScrolled || path !== "/" ? "bg-white" : ""
				}`}
			>
				<div className="container">
					<div className="flex justify-between items-center py-1">
						<div className="flex items-center gap-2">
							<FontAwesomeIcon
								icon={faCalendar}
								color={`${!isScrolled && path === "/" ? "#ffffff" : "#bb9661"}`}
							/>
							<p
								className={`text-sm p-0 mt-1 ${
									!isScrolled && path === "/"
										? "text-[#ffffff]"
										: "text-[#bb9661]"
								}`}
							>
								{currentHijriMonth && `${hijriDateInArabic}`}
							</p>
						</div>
						<div className="flex justify-between items-center gap-5">
							{[
								{
									href: "https://www.instagram.com/imamzainorg/",
									icon: faInstagram,
								},
								{
									href: "https://www.tiktok.com/@imamzainorg",
									icon: faTiktok,
								},
								{
									href: "https://www.facebook.com/@imamzainorg",
									icon: faFacebook,
								},
								{
									href: "https://twitter.com/imamzainorg",
									icon: faTwitter,
								},
							].map((social, index) => (
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
							<div className="relative cursor-pointer py-1 dropdown-lang">
								<button
									className="flex items-center justify-between rounded-full bg-none"
									onClick={() => setIsOpen((prev) => !prev)}
								>
									<FontAwesomeIcon
										icon={faGlobe}
										className={`${
											isScrolled || path !== "/"
												? "text-primary"
												: "text-white"
										}`}
										size="sm"
									/>
								</button>
								{isOpen && (
									<div className="absolute top-5 -right-8 bg-white rounded-lg w-fit z-50 flex flex-col text-gray-800 shadow-xl translate-y-2 animate-dropdown transition-all duration-300">
										{languages.map((language, index) => (
											<div
												key={index}
												className="w-full h-full"
												onClick={() =>
													handleLanguageChange(
														language.code,
													)
												}
											>
												<p
													className={`font-semibold text-gray-500 text-sm w-full h-full rounded-lg cursor-pointer py- px-4 hover:bg-gray-300`}
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
	)
}
