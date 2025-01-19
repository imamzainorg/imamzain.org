import Link from "next/link"

import Image from "next/image"
import {
	InstagramIcon,
	FacebookIcon,
	TikTokIcon,
	ChevronLeftArrowIcon,
	TwitterIcon,
} from "@/assets/icons/reusable"

import { Accordion, AccordionItem } from "@heroui/accordion"
import DropdownLang from "@/layouts/dropdown-lang"

export default function Footer() {
	return (
		<>
			{/* old nav  - big screen */}
			<div className="hidden xl:block bg-primary rounded-t-[60px] p-10 text-white/90 -mt-14">
				<div className="flex flex-col gap-16">
					<div className="flex justify-between">
						<DropdownLang />
						<div className="flex justify-end gap-2">
							{bigNavSocials.map((social, index) => (
								<Link
									className="bg-white rounded-full flex items-center px-4"
									target="_blank"
									href={social.href}
									key={index}
								>
									{social.icon}
								</Link>
							))}
						</div>
					</div>
					<div className="flex justify-center">
						<div className="w-1/4">
							<Image
								src={"/images/logo-vertical-white.svg"}
								width={250}
								height={250}
								alt="Logo"
								className="w-52"
							/>
						</div>
						<div className="w-2/4">
							<div className="grid grid-cols-4">
								<div className="w-fit">
									<h3 className="font-bold text-lg mb-4">
										الإمام زين العابدين
									</h3>
									<ul className="space-y-2 w-fit">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												حياته الكريمة
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												الولادة المباركة
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												صور
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												الإمام في الأدب
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												رابطة الإمام (ع)
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												أشبال
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												شباب
											</Link>
										</li>
									</ul>
								</div>

								<div className="w-fit">
									<h3 className="font-bold text-lg mb-4">
										الأنشطة
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												محافل قرآنية
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												مؤتمرات
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												صور
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												لقاءات
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												اجتماعات
											</Link>
										</li>
									</ul>
									<h3 className="font-bold text-lg mt-8 mb-4">
										أنشطة
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												الخيمة السجادية
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												موسوعة إمام زين العابدين
											</Link>
										</li>
									</ul>
								</div>

								<div className="w-fit">
									<h3 className="font-bold text-lg mb-4">
										الإصدارات
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												كتب
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												دوريات
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												className="hover:text-secondary-foreground/90 duration-100"
												href="#"
											>
												المجلة
											</Link>
										</li>
									</ul>
									<h3 className="font-bold text-lg mt-8 mb-4">
										حول المؤسسة
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												رؤية المؤسسة
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												أهداف المؤسسة
											</Link>
										</li>
									</ul>
								</div>

								<div className="w-fit">
									<h3 className="font-bold text-lg mb-4">
										المكتبة
									</h3>
									<ul className="space-y-2">
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												مطبوع عربي
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												مطبوع - لغات أخرى
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												مخطوط - عربي
											</Link>
										</li>
										<li className="flex gap-2 items-center group">
											<ChevronLeftArrowIcon
												stroke="#ffffff"
												fill="#ffffff"
												className="w-4 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300"
											/>
											<Link
												href="#"
												className="hover:text-secondary-foreground/90 duration-100"
											>
												مخطوط لغات أخرى
											</Link>
										</li>
									</ul>
									<h3 className="font-bold text-lg mt-8 mb-4">
										معلومات التواصل
									</h3>
								</div>
							</div>
						</div>
					</div>
					<div className="w-5/6 mx-auto text-left text-white/40 text-sm">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy;
						1824
					</div>
				</div>
			</div>

			{/* new nav */}
			<div className="xl:hidden flex flex-col gap-6 bg-primary rounded-t-xl p-8 text-white mt-10">
				<div className="flex justify-center gap-4">
					{bigNavSocials.map((social, index) => (
						<Link
							className="bg-white rounded-full p-2"
							target="_blank"
							href={social.href}
							key={index}
						>
							{social.icon}
						</Link>
					))}
				</div>
				<div className="flex flex-col gap-2">
					{links.map((link, index) => (
						<Accordion key={index} className="w-full">
							<AccordionItem
								value={link.label}
								className="border-none text-base"
								aria-label={link.label}
								title={link.label}
							>
								<div className="flex flex-col gap-3 mr-4">
									{link.sublinks.map((link, index) => (
										<Link href={link.href} key={index}>
											{link.label}
										</Link>
									))}
								</div>
							</AccordionItem>
						</Accordion>
					))}
				</div>
				<div className="w-2/3 mx-auto">
					<Link href="/">
						<Image
							src="/images/logo-horizontal-white.svg"
							width={50}
							height={50}
							className="w-full"
							alt="logo"
						/>
					</Link>
				</div>
				<p className="text-center text-xs sm:text-sm md:text-base lg:base-xl text-slate-400 my-4 p-2">
					جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع) &copy;
					1824
				</p>
			</div>
		</>
	)
}

const bigNavSocials = [
	{
		href: "https://www.instagram.com/imamzainorg/",
		icon: (
			<InstagramIcon
				fill="#006654"
				stroke="#006654"
				strokeWidth={0.5}
				width={18}
				height={18}
			/>
		),
	},
	{
		href: "https://www.tiktok.com/@imamzainorg",
		icon: (
			<TikTokIcon
				stroke="#006654"
				strokeWidth={20}
				width={18}
				height={18}
			/>
		),
	},
	{
		href: "https://www.facebook.com/@imamzainorg",
		icon: (
			<FacebookIcon
				fill="#006654"
				stroke="#006654"
				strokeWidth={0.5}
				width={18}
				height={18}
			/>
		),
	},
	{
		href: "https://twitter.com/imamzainorg",
		icon: (
			<TwitterIcon
				fill="#006654"
				strokeWidth={0.5}
				width={18}
				height={18}
			/>
		),
	},
]

const links = [
	{
		label: "الإمام زين العابدين",
		sublinks: [
			{ label: "حياته الكريمة", href: "/coming-soon" },
			{ label: "الولادة المباركة", href: "/coming-soon" },
			{ label: "صور", href: "/coming-soon" },
			{ label: "الإمام في الأدب", href: "/coming-soon" },
			{ label: "رابطة الإمام (ع)", href: "/coming-soon" },
			{ label: "أشبال", href: "/coming-soon" },
			{ label: "شباب", href: "/coming-soon" },
		],
	},
	{
		label: "الأنشطة",
		sublinks: [
			{ label: "محافل قرآنية", href: "/news" },
			{ label: "مؤتمرات", href: "/news" },
			{ label: "صور", href: "/news" },
			{ label: "لقاءات", href: "/news#meetings" },
			{ label: "اجتماعات", href: "/news" },
		],
	},
	{
		label: "الأصدارات",
		sublinks: [
			{ label: "كتب", href: "/publications" },
			{ label: "دوريات", href: "/publications" },
			{ label: "المجلة", href: "/coming-soon" },
		],
	},
	{
		label: "حول المؤسسة",
		sublinks: [
			{ label: "رؤية المؤسسة", href: "/about#vision" },
			{ label: "اهداف المؤسسة", href: "/about#goals" },
			{ label: "معلومات التواصل", href: "/about#contact-us" },
		],
	},
	{
		label: "المكتبة",
		sublinks: [
			{ label: "مطبوع عربي", href: "/library" },
			{ label: "مطبوع - لفات اخرى", href: "/library" },
			{ label: "مخطوط - عربي", href: "/library" },
			{ label: "مخطوط لغات اخرى", href: "/library" },
		],
	},
]
