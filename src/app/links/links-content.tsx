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
	FaChevronLeft,
	FaMobileScreenButton,
} from "react-icons/fa6"

import {
	XIcon,
	TikTokIcon,
	TelegramIcon,
	WhatsAppIcon,
} from "@/components/brand-icons"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

// TODO: replace with the real store/landing URLs once provided
const APP_URL_ANWAR = "#"
const APP_URL_MAARIF = "#"

const title = "مؤسسة الامام زين العابدين للدراسات والبحوث"
const bio =
	"مؤسسة دينية تهدف الى تسليط الضوء على ما لم يظهر من اثار الإمام السجاد عليه السلام، وبلورة صياغة جديدة وطرح رؤية فكرية شاملة"

const apps = [
	{ label: "أنوار سجادية", href: APP_URL_ANWAR },
	{ label: "معارف سجادية", href: APP_URL_MAARIF },
]

const socials: {
	label: string
	aria: string
	href: string
	Icon: IconType
	color: string
}[] = [
	{
		label: "يوتيوب",
		aria: "يوتيوب",
		href: "https://www.youtube.com/@imamzainorg",
		Icon: FaYoutube,
		color: "#FF0000",
	},
	{
		label: "إنستغرام",
		aria: "إنستغرام",
		href: "https://www.instagram.com/imamzainorg",
		Icon: FaInstagram,
		color: "#E4405F",
	},
	{
		label: "تيك توك",
		aria: "تيك توك",
		href: "https://www.tiktok.com/@imamzainorg",
		Icon: TikTokIcon,
		color: "#111111",
	},
	{
		label: "فيسبوك",
		aria: "فيسبوك",
		href: "https://www.facebook.com/imamzainorg",
		Icon: FaFacebookF,
		color: "#1877F2",
	},
	{
		label: "X",
		aria: "تويتر / X",
		href: "https://twitter.com/imamzainorg",
		Icon: XIcon,
		color: "#111111",
	},
	{
		label: "تيليغرام",
		aria: "تيليغرام",
		href: "https://t.me/imamzainorg",
		Icon: TelegramIcon,
		color: "#229ED9",
	},
	{
		label: "واتساب",
		aria: "واتساب (قناة)",
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		Icon: WhatsAppIcon,
		color: "#25D366",
	},
]

const contacts: {
	label: string
	aria: string
	href: string
	Icon: IconType
	external?: boolean
}[] = [
	{
		label: "راسلنا",
		aria: "البريد الإلكتروني",
		href: "mailto:info@imamzain.org",
		Icon: FaEnvelope,
	},
	{
		label: "اتصل بنا",
		aria: "الهاتف",
		href: "tel:+9647782943996",
		Icon: FaPhone,
	},
	{
		label: "الخريطة",
		aria: "الموقع الجغرافي",
		href: "https://maps.app.goo.gl/cCoveq63ZgwJDZyGA",
		Icon: FaLocationDot,
		external: true,
	},
]

function onLinkClick(label: string) {
	track("link_click", { label })
}

function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center gap-3">
			<span className="h-px w-8 bg-gradient-to-l from-secondary/50 to-transparent" />
			<h2 className="text-xs font-bold tracking-wide text-primary/70">
				{children}
			</h2>
			<span className="h-px w-8 bg-gradient-to-r from-secondary/50 to-transparent" />
		</div>
	)
}

export default function LinksContent() {
	const reduce = useReducedMotion()

	const container: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: reduce ? 0 : 0.07,
				delayChildren: reduce ? 0 : 0.08,
			},
		},
	}

	const group: Variants = {
		hidden: {},
		show: { transition: { staggerChildren: reduce ? 0 : 0.05 } },
	}

	const item: Variants = {
		hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
		show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
	}

	const lift = reduce ? {} : { y: -4 }
	const tap = reduce ? {} : { scale: 0.97 }

	return (
		<main className="flex min-h-screen w-full items-start justify-center px-4 py-8 sm:items-center sm:py-12">
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="w-full max-w-[500px] overflow-hidden rounded-[2rem] bg-[#FBFAF6] shadow-2xl ring-1 ring-secondary/30"
			>
				{/* ── Hero ───────────────────────────────────────────── */}
				<motion.div
					variants={group}
					className="relative overflow-hidden bg-gradient-to-b from-[#0a7a63] via-primary to-[#00463a] px-6 pb-9 pt-9 text-center"
				>
					{/* gold geometric texture */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:260px] opacity-50"
					/>
					{/* warm glow */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/25 blur-3xl"
					/>
					{/* brand teardrop echoes */}
					<div
						aria-hidden="true"
						style={{ maskSize: "contain", WebkitMaskSize: "contain" }}
						className="image-mask pointer-events-none absolute -bottom-6 -left-5 h-28 w-28 rotate-[20deg] bg-white/10"
					/>
					<div
						aria-hidden="true"
						style={{ maskSize: "contain", WebkitMaskSize: "contain" }}
						className="image-mask pointer-events-none absolute -right-6 top-6 h-20 w-20 -rotate-12 bg-secondary/25"
					/>

					{/* avatar */}
					<motion.div
						variants={item}
						className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-white shadow-xl ring-4 ring-secondary xxs:h-28 xxs:w-28"
					>
						<Image
							src="/images/logo-vertical.svg"
							alt="شعار مؤسسة الإمام زين العابدين عليه السلام"
							width={80}
							height={72}
							priority
							className="h-16 w-auto xxs:h-20"
						/>
					</motion.div>

					<motion.h1
						variants={item}
						className="relative mt-4 text-lg font-bold leading-snug text-white drop-shadow-sm xxs:text-xl"
					>
						{title}
					</motion.h1>

					<motion.p
						variants={item}
						className="relative mx-auto mt-2.5 max-w-[42ch] text-[13px] leading-relaxed text-white/85 xxs:text-sm"
					>
						{bio}
					</motion.p>

					{/* gold ornament */}
					<motion.div
						variants={item}
						className="relative mt-5 flex items-center justify-center gap-2.5"
					>
						<span className="h-px w-12 bg-gradient-to-l from-secondary to-transparent" />
						<span className="h-2 w-2 rotate-45 bg-secondary shadow-sm" />
						<span className="h-px w-12 bg-gradient-to-r from-secondary to-transparent" />
					</motion.div>
				</motion.div>

				{/* ── Body ───────────────────────────────────────────── */}
				<motion.div variants={group} className="px-5 pb-7 pt-6 xxs:px-6">
					{/* Featured apps */}
					<motion.div variants={item}>
						<SectionTitle>تطبيقاتنا</SectionTitle>
					</motion.div>

					<motion.div variants={group} className="mt-3 flex flex-col gap-3">
						{apps.map((app) => (
							<motion.a
								key={app.label}
								variants={item}
								whileHover={lift}
								whileTap={tap}
								href={app.href}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => onLinkClick(app.label)}
								className="group flex items-center gap-3.5 rounded-2xl bg-gradient-to-l from-[#00564a] to-primary p-3.5 text-white shadow-custom outline-none ring-1 ring-secondary/40 transition focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
							>
								<span
									aria-hidden="true"
									className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-white shadow-inner"
								>
									<FaMobileScreenButton className="h-6 w-6" />
								</span>
								<span className="flex-1 text-right">
									<span className="block text-[15px] font-bold leading-tight xxs:text-base">
										{app.label}
									</span>
									<span className="mt-0.5 block text-[11px] text-white/70">
										حمّل التطبيق الآن
									</span>
								</span>
								<FaChevronLeft
									aria-hidden="true"
									className="h-4 w-4 shrink-0 text-secondary transition-transform duration-300 group-hover:-translate-x-1"
								/>
							</motion.a>
						))}
					</motion.div>

					{/* Website (primary hub) */}
					<motion.a
						variants={item}
						whileHover={lift}
						whileTap={tap}
						href="https://imamzain.org"
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => onLinkClick("الموقع الإلكتروني")}
						className="group mt-3 flex items-center gap-3 rounded-2xl border-2 border-primary/15 bg-white p-3.5 text-primary shadow-custom outline-none transition hover:border-primary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
					>
						<span
							aria-hidden="true"
							className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white"
						>
							<FaGlobe className="h-5 w-5" />
						</span>
						<span className="flex-1 text-right">
							<span className="block text-sm font-bold">الموقع الإلكتروني</span>
							<span
								dir="ltr"
								className="block text-[11px] opacity-60 transition-opacity group-hover:opacity-90"
							>
								imamzain.org
							</span>
						</span>
						<FaChevronLeft
							aria-hidden="true"
							className="h-4 w-4 shrink-0 text-secondary transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-white"
						/>
					</motion.a>

					{/* Socials */}
					<motion.div variants={item} className="mt-7">
						<SectionTitle>تابعونا</SectionTitle>
					</motion.div>

					<motion.div
						variants={group}
						className="mt-3 grid grid-cols-4 gap-2.5"
					>
						{socials.map((s) => (
							<motion.a
								key={s.aria}
								variants={item}
								whileHover={lift}
								whileTap={tap}
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={s.aria}
								onClick={() => onLinkClick(s.aria)}
								className="group flex aspect-square min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-black/[0.06] bg-white shadow-sm outline-none transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
							>
								<s.Icon
									aria-hidden="true"
									className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
									style={{ color: s.color }}
								/>
								<span className="max-w-full truncate px-1 text-[10px] font-medium text-gray-500">
									{s.label}
								</span>
							</motion.a>
						))}
					</motion.div>

					{/* Contact */}
					<motion.div variants={item} className="mt-7">
						<SectionTitle>للتواصل</SectionTitle>
					</motion.div>

					<motion.div
						variants={group}
						className="mt-3 grid grid-cols-3 gap-2.5"
					>
						{contacts.map((c) => (
							<motion.a
								key={c.aria}
								variants={item}
								whileHover={lift}
								whileTap={tap}
								href={c.href}
								aria-label={c.aria}
								onClick={() => onLinkClick(c.aria)}
								{...(c.external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {})}
								className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-primary/15 bg-primary/[0.06] p-3 text-primary shadow-sm outline-none transition hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF6]"
							>
								<c.Icon aria-hidden="true" className="h-5 w-5" />
								<span className="text-[11px] font-medium">{c.label}</span>
							</motion.a>
						))}
					</motion.div>

					{/* Footer */}
					<motion.p
						variants={item}
						className="mt-8 text-center text-[11px] leading-relaxed text-gray-400"
					>
						© 2026 مؤسسة الإمام زين العابدين (عليه السلام)
					</motion.p>
				</motion.div>
			</motion.section>
		</main>
	)
}
