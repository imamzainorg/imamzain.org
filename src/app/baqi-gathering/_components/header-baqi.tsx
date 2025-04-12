import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { X as LucideX } from "lucide-react"

const HeaderBaqi = () => {
	const [isOpen, setIsOpen] = useState(false)

	const navItems = [
		{ href: "#about", label: "عن الملتقى" },
		{ href: "#objectives", label: "الأهداف" },
		{ href: "#speakers", label: "المتحدثون" },
		{ href: "#schedule", label: "جدول الأعمال" },
		{ href: "/baqi-gathering/gallery", label: "معرض الصور" },
		{ href: "/", label: "مؤسسة الإمام زين العابدين (عليه السلام)" },
	]

	return (
		<header className="fixed top-0 inset-x-0 z-40 bg-[#0B1F47] shadow-lg">
			<div className="container mx-auto flex items-center justify-between md:px-4 md:py-4">
				<Link href="/baqi-gathering" className="flex items-center z-50">
					<Image
						src="/baqi-gathering/ملتقى-البقيع-شعار-الابيض.png"
						alt="Logo"
						width={56}
						height={56}
					/>
				</Link>
				{/* Hamburger icon visible on mobile  */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden text-white focus:outline-none z-50"
				>
					<>
						{isOpen ? (
							<LucideX size={24} />
						) : (
							<FontAwesomeIcon icon={faBars} size="lg" />
						)}
					</>
				</button>
				{/* Desktop Navigation */}
				<nav className="hidden md:flex  gap-5">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-white hover:text-[#c49e38] transition-colors duration-300"
						>
							{item.label}
						</Link>
					))}
				</nav>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-[#0B1F47] transform transition-transform duration-300 md:hidden ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<nav className="container mx-auto px-4 py-6 ">
					<ul className="flex flex-col space-y-6 mt-40">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="text-2xl text-white hover:text-[#c49e38] transition-colors duration-300"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default HeaderBaqi
