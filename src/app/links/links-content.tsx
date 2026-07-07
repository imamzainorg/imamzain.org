"use client"

import type { ComponentType, SVGProps } from "react"

import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { track } from "@vercel/analytics"
import {
	FaYoutube,
	FaInstagram,
	FaFacebookF,
	FaGlobe,
	FaEnvelope,
	FaPhone,
	FaLocationDot,
	FaMobileScreenButton,
} from "react-icons/fa6"

import {
	XIcon,
	TikTokIcon,
	TelegramIcon,
	WhatsAppIcon,
} from "@/components/brand-icons"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

type LinkItem = {
	label: string
	href: string
	Icon: IconType
	external?: boolean
}

// TODO: replace with the real store/landing URLs once provided
const APP_URL_ANWAR = "#"
const APP_URL_MAARIF = "#"

const featuredApps: LinkItem[] = [
	{ label: "أنوار سجادية", href: APP_URL_ANWAR, Icon: FaMobileScreenButton },
	{ label: "معارف سجادية", href: APP_URL_MAARIF, Icon: FaMobileScreenButton },
]

const links: LinkItem[] = [
	{ label: "الموقع الإلكتروني", href: "https://imamzain.org", Icon: FaGlobe },
	{
		label: "يوتيوب",
		href: "https://www.youtube.com/@imamzainorg",
		Icon: FaYoutube,
		external: true,
	},
	{
		label: "تيك توك",
		href: "https://www.tiktok.com/@imamzainorg",
		Icon: TikTokIcon,
		external: true,
	},
	{
		label: "إنستغرام",
		href: "https://www.instagram.com/imamzainorg",
		Icon: FaInstagram,
		external: true,
	},
	{
		label: "فيسبوك",
		href: "https://www.facebook.com/imamzainorg",
		Icon: FaFacebookF,
		external: true,
	},
	{
		label: "تويتر / X",
		href: "https://twitter.com/imamzainorg",
		Icon: XIcon,
		external: true,
	},
	{
		label: "تيليغرام",
		href: "https://t.me/imamzainorg",
		Icon: TelegramIcon,
		external: true,
	},
	{
		label: "واتساب (قناة)",
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		Icon: WhatsAppIcon,
		external: true,
	},
	{
		label: "البريد الإلكتروني",
		href: "mailto:info@imamzain.org",
		Icon: FaEnvelope,
	},
	{ label: "الهاتف", href: "tel:+9647782943996", Icon: FaPhone },
	{
		label: "الموقع الجغرافي",
		href: "https://maps.app.goo.gl/cCoveq63ZgwJDZyGA",
		Icon: FaLocationDot,
		external: true,
	},
]

const title = "مؤسسة الامام زين العابدين للدراسات والبحوث"
const bio =
	"مؤسسة دينية تهدف الى تسليط الضوء على ما لم يظهر من اثار الإمام السجاد عليه السلام، وبلورة صياغة جديدة وطرح رؤية فكرية شاملة"

function onLinkClick(label: string) {
	track("link_click", { label })
}

function externalProps(item: LinkItem) {
	return item.external
		? { target: "_blank", rel: "noopener noreferrer" }
		: {}
}

export default function LinksContent() {
	const reduceMotion = useReducedMotion()

	const container: Variants = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: reduceMotion ? 0 : 0.06,
				delayChildren: reduceMotion ? 0 : 0.1,
			},
		},
	}

	const item: Variants = {
		hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
		show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
	}

	const hover = reduceMotion ? {} : { scale: 1.02 }
	const tap = reduceMotion ? {} : { scale: 0.98 }

	return (
		<main className="flex min-h-screen w-full items-center justify-center px-4 py-10">
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="w-full max-w-[480px] rounded-3xl border border-secondary/30 bg-white/70 p-5 shadow-custom backdrop-blur-md xxs:p-6 sm:p-8 dark:bg-black/40"
			>
				{/* Logo */}
				<motion.div variants={item} className="flex flex-col items-center">
					<div className="rounded-full border-2 border-secondary/60 bg-white/80 p-3 shadow-custom">
						<Image
							src="/images/logo-vertical.svg"
							alt="شعار مؤسسة الإمام زين العابدين عليه السلام"
							width={96}
							height={86}
							priority
							className="h-20 w-auto xxs:h-24"
						/>
					</div>
				</motion.div>

				{/* Title */}
				<motion.h1
					variants={item}
					className="mt-5 text-center text-lg font-bold leading-snug text-primary xxs:text-xl sm:text-2xl"
				>
					{title}
				</motion.h1>

				{/* Bio */}
				<motion.p
					variants={item}
					className="mx-auto mt-3 max-w-[42ch] text-center text-sm leading-relaxed text-gray-700 xxs:text-base dark:text-gray-200"
				>
					{bio}
				</motion.p>

				{/* Featured app CTAs */}
				<div className="mt-6 flex flex-col gap-3">
					{featuredApps.map((app) => (
						<motion.a
							key={app.label}
							variants={item}
							whileHover={hover}
							whileTap={tap}
							href={app.href}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => onLinkClick(app.label)}
							className="group relative flex min-h-[56px] w-full items-center justify-center rounded-2xl bg-primary px-12 py-3 text-base font-bold text-white shadow-custom outline-none ring-secondary transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-offset-2"
						>
							<span
								aria-hidden="true"
								className="absolute right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"
							>
								<app.Icon className="h-5 w-5 text-white" />
							</span>
							<span>{app.label}</span>
						</motion.a>
					))}
				</div>

				{/* Divider */}
				<motion.div
					variants={item}
					className="my-6 h-px w-full bg-gradient-to-l from-transparent via-secondary/50 to-transparent"
				/>

				{/* Social / contact links */}
				<div className="flex flex-col gap-3">
					{links.map((link) => (
						<motion.a
							key={link.label}
							variants={item}
							whileHover={hover}
							whileTap={tap}
							href={link.href}
							onClick={() => onLinkClick(link.label)}
							{...externalProps(link)}
							className="group relative flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-secondary/30 bg-white/80 px-12 py-3 text-sm font-semibold text-primary shadow-custom outline-none ring-primary transition-colors hover:border-secondary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 xxs:text-base dark:bg-white/10 dark:text-white"
						>
							<span
								aria-hidden="true"
								className="absolute right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white"
							>
								<link.Icon className="h-5 w-5" />
							</span>
							<span>{link.label}</span>
						</motion.a>
					))}
				</div>
			</motion.section>
		</main>
	)
}
