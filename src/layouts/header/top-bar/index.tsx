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

import useWindowEvents from "../../../hooks/window-events"
import { useLanguages } from "../../../context/language-context"

const bigNavSocials = [
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
]

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

	const [prayerTimes, setPrayerTimes] = useState({ fajir: "", date: "" })

	useEffect(() => {
		async function fetchPrayerTimes() {
			const res = await fetch(
				"https://hq.alkafeel.net/Api/init/init.php?timezone=+3&long=44&lati=32&v=jsonPrayerTimes",
			)
			const data = await res.json()
			setPrayerTimes({ fajir: data.fajir, date: data.date })
		}

		fetchPrayerTimes()
	}, [])
	return (
		<>
			<div
				className={`w-full transition-all duration-300 max-lg:hidden ${
					isScrolled || path !== "/" ? "bg-white" : ""
				}`}
			>
				<div className="container">
					<div className="flex justify-between items-center py-1">
						<div className="flex items-center gap-2 invisible">
							<FontAwesomeIcon
								icon={faCalendar}
								color={`${!isScrolled && path === "/" ? "#ffffff" : "#bb9661"}`}
							/>
							<p
								className={`text-sm  p-0 mt-1 ${!isScrolled && path === "/" ? "text-[#ffffff]" : "text-[#bb9661]"}`}
							>
								{prayerTimes && prayerTimes.date}
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
										<FontAwesomeIcon
											icon={social.icon}
											size="sm"
										/>
									</Link>
								))}

								<div className="relative cursor-pointer py-1 dropdown-lang">
									<button
										className="flex items-center justify-between rounded-full bg-none"
										onClick={() =>
											setIsOpen((prev) => !prev)
										}
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
											{languages.map(
												(language, index) => (
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
												),
											)}
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
	)
}
