"use client"
import Link from "next/link"
import Image from "next/image"

import {
	faInstagram,
	faTiktok,
	faTwitter,
	faFacebook,
} from "@fortawesome/free-brands-svg-icons"
import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import DropdownLang from "@/layouts/dropdown-lang"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Accordion, AccordionItem } from "@heroui/react"

interface Sublink {
	label: string
	href: string
}

interface LinkSection {
	label: string
	sublinks: Sublink[]
}

const links: LinkSection[] = [
	{
		label: "الإمام زين العابدين",
		sublinks: [
			{ label: "حياته الكريمة", href: "/his-life" },
			{ label: "الولادة المباركة", href: "/his-life" },
			{ label: "لقبه وكنايته", href: "/his-life" },
			{ label: "معالم شخصية", href: "/his-life" },
		],
	},
	{
		label: "الخدمات",
		sublinks: [
			{ label: "اتصل بنا", href: "/services" },
			{ label: "نقاط البيع", href: "/services/stores" },
			{ label: "تطبيق انوار سجاديه", href: "/application" },
		],
	},
	{
		label: "المكتب التخصصيه",
		sublinks: [
			{ label: "ما كتب عن الامام", href: "/library" },
			{ label: "الصحيفه السجاديه", href: "/library/al-sahifa" },
			{ label: "رساله الحقوق", href: "/library/risalat-al-huqoq" },
		],
	},
	{
		label: "الوسائط",
		sublinks: [
			{ label: "الصوتيات", href: "/coming-soon" },
			{ label: "المرئيات", href: "/media/videos" },
			{ label: "معرض الصور", href: "/media/images" },
		],
	},

]

const SocialLinks = ({
						 className,
						 size,
					 }: {
	className?: string
	size: SizeProp
}) => (
	<div className={`flex h-fit gap-6 items-center ${className}`}>
		{bigNavSocials.map((social, index) => (
			<Link
				key={index}
				href={social.href}
				target="_blank"
				rel="noopener noreferrer"
				className="hover:scale-105 transition-transform h-fit p-0 m-0"
			>
				<FontAwesomeIcon icon={social.icon} size={size} />
			</Link>
		))}
	</div>
)

const bigNavSocials = [
	{ href: "https://www.instagram.com/imamzainorg/", icon: faInstagram },
	{ href: "https://www.tiktok.com/@imamzainorg", icon: faTiktok },
	{ href: "https://www.facebook.com/@imamzainorg", icon: faFacebook },
	{ href: "https://twitter.com/imamzainorg", icon: faTwitter },
]

export default function Footer() {
	return (
		<div className="bg-primary text-white rounded-t-[2rem] ">
			{/* Big screen */}
			<div className="container max-lg:hidden py-10">
				<div className="flex justify-between pb-10">
					<DropdownLang broad />
					<SocialLinks size={"lg"} />
				</div>

				<div className="flex justify-between gap-20 max-md:p-10 py-8  ">
					<div className="w-[200px]">
						<Image
							src="/images/logo-vertical-white.svg"
							alt="Logo"
							width={250}
							height={200}
						/>
					</div>

					<div className="w-3/4 grid grid-cols-4 gap-4">
						{links.map((section: LinkSection, i: number) => (
							<div
								key={i}
								className={`${i === 0 ? "row-span-2" : ""}`}
							>
								<h3 className="font-bold text-lg mb-4">
									{section.label}
								</h3>
								<ul className="flex flex-col gap-3 mr-5">
									{section.sublinks.map(
										(sublink: Sublink, j: number) => (
											<Link
												className="text-sm"
												key={j}
												href={sublink.href}
											>
												{sublink.label}
											</Link>
										),
									)}
								</ul>
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-end  ">
					<p className="text-sm text-white/40 mt-10">
						جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (عليه السلام) &copy;
						2024
					</p>
				</div>
			</div>

			{/* Small screen */}
			<div className="lg:hidden p-8">
				<SocialLinks
					className="justify-center gap-10 pb-4"
					size={"2x"}
				/>

				<Accordion>
					{links.map((section, i) => (
						<AccordionItem
							key={i}
							aria-label={section.label}
							title={section.label}
							classNames={{
								base: "accordion !text-white border-b-[0.1px] border-neutral-300",
								title: "!text-white",
								indicator: "text-white",
							}}
						>
							<div className="flex flex-col gap-5 mr-5 pb-3 ">
								{section.sublinks?.map(
									(sublink: Sublink, j: number) => (
										<Link
											className={"text-sm text-white"}
											key={j}
											href={sublink.href}
										>
											{sublink.label}
										</Link>
									),
								)}
							</div>
						</AccordionItem>
					))}
				</Accordion>

				<div className=" items-center w-full flex justify-center py-10">
					<Image
						className={"w-[200px]"}
						src="/images/logo-horizontal-white.svg"
						alt="Logo"
						width={250}
						height={200}
					/>
				</div>
				<p className="text-center text-sm text-white/40">
					جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (عليه السلام) &copy;
					2025
				</p>
			</div>
		</div>
	)
}
