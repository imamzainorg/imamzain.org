import { cn } from "@/lib/utils"
import Link from "next/link"
import { memo } from "react"
interface BreadcrumbsProps {
	links: { name: string; url: string }[]
	className?: string
	dotColor?: string
}

const Breadcrumbs = ({
	links,
	className = "text-gray-700",
	dotColor = "bg-primary dark:bg-Muharram_secondary",
}: BreadcrumbsProps) => {
	return (
		<div className="pt-8 sm:pt-8 lg:pt-32 pb-5 sm:pb-6 lg:pb-6">
			<div
				className={cn(
					"flex text-xs sm:text-sm lg:text-lg mt-14",
					className,
				)}
			>
				{links.map((link, index) => {
					const isLast = index === links.length - 1
					return (
						<div key={index} className="flex items-center">
							<span
								className={`w-1 h-1 md:w-1.5 md:h-1.5 lg:h-2 lg:w-2 rounded-full ${
									index === 0 ? "ml-3" : "mx-3"
								} ${dotColor}`}
							/>
							<Link
								href={link.url}
								className={cn(
									"hover:text-primary text-subtitle p-1  dark:hover:text-Muharram_primary duration-150",
									isLast
										? "line-clamp-1 font-bold overflow-hidden text-ellipsis max-w-fit"
										: "whitespace-nowrap ",
								)}
							>
								{link.name}
							</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}

Breadcrumbs.displayName = "Breadcrumbs"
export default memo(Breadcrumbs)
