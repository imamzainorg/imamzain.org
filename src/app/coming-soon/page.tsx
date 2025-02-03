import {
	FacebookIcon,
	TwitterIcon,
	InstagramIcon,
	TikTokIcon,
	LocationIcon,
	TelegramIcon,
	YoutubeIcon,
	EmailIcon,
	WhatsAppIcon,
} from "@/assets/icons/reusable"
import Image from "next/image"

import Link from "next/link"

export default function ComingSoon() {
	return (
		<div className="overflow-x-hidden">
			<div className="z-10 h-screen w-screen bg-[url(/images/coming-soon.jpg)] bg-cover bg-center bg-transparent">
				<div className="h-screen w-screen absolute top-0 bg-black/10 z-0" />
				<div className="z-10 h-screen justify-between p-4 sm:pb-8 w-screen bg-gradient-to-b from-transparent via-transparent to-primary/80 bg-opacity-30 flex flex-col">
					<div className="w-full flex justify-center sm:justify-center">
						<Image
							className="w-80 p-2 drop-shadow-xl shadow-white"
							src="/images/logo-vertical-white.svg"
							priority
							alt="logo"
							width={300}
							height={300}
						/>
					</div>
					<div className="text-center space-y-0">
						<h1 className="text-3xl sm:text-4xl md:text-5xl text-slate-200 my-5 sm:my-10 md:my-12 lg:my-15 opacity-0 animate-fade-in-up duration-300">
							الصفحة تحت الانشاء
						</h1>
						<p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-200 font-extralight my-8 opacity-0 animate-fade-in-up duration-300 delay-300">
							العمل لا زال جاري على هذه الصفحة
						</p>
						<p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-200 font-extralight my-12 opacity-0 animate-fade-in-up duration-500 delay-300">
							شكرا لإبداء اهتمامكم في خدماتنا وقوموا بزيارتنا
							مجددا قريبا!
						</p>
					</div>
					<div className="text-center text-sm md:text-base lg:text-lg space-y-5 text-slate-200 opacity-0 animate-fade-in delay-700 duration-500">
						<p className="">يمكنكم الاتصال بنا على رقم الهاتف</p>
						<p dir="ltr" className="">
							(+964) 778 294 3996
						</p>
					</div>
					<div className="items-end justify-end text-center opacity-0 animate-pop-in duration-150 delay-1000">
						<div className="flex flex-wrap justify-center items-center gap-2 md:gap-8 lg:gap-10">
							{socials.map((item, index) => (
								<Link
									key={index}
									target="_blank"
									href={item.href}
									className="rounded-full border-[1px] p-2 border-white scale-75 md:scale-90 active:scale-50 hover:scale-105 hover:-translate-y-2 duration-300 hover:border-spacing-16"
								>
									{item.icon}
								</Link>
							))}
						</div>
						<p className="text-xs sm:text-sm md:text-base lg:base-xl text-slate-400 my-4">
							جميع الحقوق محفوظة لمؤسسة الإمام زين العابدين (ع)
							&copy; 1824
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const socials: { href: string; icon: React.JSX.Element }[] = [
	{
		href: "https://telegram.me/imamzainorg",
		icon: (
			<TelegramIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.instagram.com/imamzainorg/",
		icon: (
			<InstagramIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://youtube.com/@imamzainorg",
		icon: (
			<YoutubeIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.tiktok.com/@imamzainorg",
		icon: (
			<TikTokIcon
				stroke="#ffffff"
				strokeWidth={20}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "mailto:zain.alabideen22@gmail.com",
		icon: (
			<EmailIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.2}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://www.facebook.com/@imamzainorg",
		icon: (
			<FacebookIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://maps.app.goo.gl/YKYckk1jPpJ9BVaX6",
		icon: (
			<LocationIcon
				fill="#ffffff"
				stroke="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://whatsapp.com/channel/0029VaKdHsJFCCocmkLhJA3L",
		icon: (
			<WhatsAppIcon
				fill="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
	{
		href: "https://twitter.com/imamzainorg",
		icon: (
			<TwitterIcon
				fill="#ffffff"
				strokeWidth={0.5}
				width={20}
				height={20}
			/>
		),
	},
]
