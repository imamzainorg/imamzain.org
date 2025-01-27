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
		<div className="pt-20 sm:pt-32 lg:pt-38 xl:pt-40 mb:8 lg:mb-20">
			<div
				className={cn(
					"flex text-xs sm:text-sm lg:text-lg my-6",
					className,
				)}
			>
				{links.map((link, index) => (
					<div key={index} className="flex items-center">
						<span className={cn("w-1 h-1 md:w-1.5 md:h-1.5 lg:h-2 lg:w-2 mx-3 rounded-full", dotColor)} />
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
