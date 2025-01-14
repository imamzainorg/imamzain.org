import Image from "next/image"
import Link from "next/link"

export default function SectionCta({
	links,
}: {
	links: { label: string; href: string }[]
}) {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-center gap-2">
			{links.map((link, index) => (
				<Link
					href={link.href}
					key={index}
					className="text-white md:text-lg relative w-full text-center p-2 md:p-2 flex justify-center gap-4 items-center"
				>
					<Image
						src="/shapes/button-bg.svg"
						width={1}
						height={1}
						className="absolute top-0 object-contain h-full w-full"
						alt="button-img"
					/>
					<span className="w-2 h-2 bg-secondary rounded-full z-10" />
					<span className="z-10">{link.label}</span>
				</Link>
			))}
		</div>
	)
}
