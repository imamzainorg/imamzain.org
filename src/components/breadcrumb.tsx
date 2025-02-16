import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Breadcrumbs({
	links,
	className = "text-gray-700",
	dotColor = "bg-primary",
}: {
	links: { name: string; url: string }[]
	className?: string
	dotColor?: string
}) {
	return (
		<div className="pt-[4.3rem] sm:pt-20 lg:pt-40">
			<div
				className={cn(
					"flex text-xs sm:text-sm lg:text-lg my-5 sm:my-3 lg:my-5  ",
					className,
				)}
			>
				{links.map((link, index) => (
					<div key={index} className="flex items-center">
						<span
							className={`w-1 h-1 md:w-1.5 md:h-1.5 lg:h-2 lg:w-2   rounded-full ${index === 0 ? "ml-3" : "mx-3"} ${dotColor}`}
						/>
						<Link
							href={link.url}
							className={cn(
								"hover:text-primary duration-150 line-clamp-1",
								index === links.length - 1 && "font-bold",
							)}
						>
							{link.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
