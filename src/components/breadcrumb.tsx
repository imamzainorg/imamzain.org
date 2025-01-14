import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Breadcrumbs({
	links,
	className,
}: {
	links: { name: string; url: string }[]
	className?: string
}) {
	return (
		<div
			className={cn(
				"flex text-xs sm:text-lg lg:text-2xl text-gray-700 my-6",
				className,
			)}
		>
			{links.map((link, index) => (
				<div key={index} className="flex items-center">
					<span className="w-1 h-1 md:h-2 md:w-2 mx-3 bg-primary rounded-full" />
					<Link
						href={link.url}
						className={cn(
							"hover:text-primary duration-150",
							index === links.length - 1 && "font-bold",
						)}
					>
						{link.name}
					</Link>
				</div>
			))}
		</div>
	)
}
