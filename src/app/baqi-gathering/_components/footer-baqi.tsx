import Image from "next/image"
import Link from "next/link"
import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFacebook,
	faInstagram,
	faTiktok,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons"
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
				className="hover:scale-105 transition-transform h-fit "
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

const FooterBaqi = () => (
	<footer className="bg-[#0B1F47] text-white py-12">
		<div className="container">
			<div className="flex  flex-col  justify-center items-center gap-6 mb-10">
				<Link href="/" className="w-[200px]">
					<Image
						src="/images/logo-vertical-white.svg"
						alt="Logo"
						width={250}
						height={200}
					/>
				</Link>

				<div className="    mb-6">
					<h3 className="text-2xl text-[#c49e38] mb-4 text-center">
						تواصل معنا
					</h3>
					<SocialLinks size={"2xl"} />
				</div>
			</div>
			<div className="text-center border-t border-[#2a5559] pt-4">
				&copy; {new Date().getFullYear()} جميع الحقوق محفوظة . مؤسسة
				الإمام زين العابدين للبحوث والدراسات
			</div>
		</div>
	</footer>
)

export default FooterBaqi
