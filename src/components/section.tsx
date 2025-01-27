import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Section({
	title,
	text,
	moreButton,
	dark,
}: {
	title: string
	text?: string
	moreButton?: string
	dark?: boolean
}) {
	return (
		<div className="w-full space-y-6 !my-8">
			<div className="w-full flex items-center sm:items-center gap-2 md:gap-4">
				<Image
					src={"/shapes/title-icon.svg"}
					width={150}
					height={150}
					alt="title icon"
					className="w-3 sm:w-4 xl:w-5"
				/>
				<h1
					className={cn(
						"text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-primary",
						dark && "text-white",
					)}
				>
					{title}
				</h1>
			</div>
			{text && (
				<div className="w-11/12 mx-auto sm:text-lg md:text-xl xl:text-xl">
					<p className="text-lg leading-relaxed !tracking-tight text-justify inline">
						{text}
						{moreButton && (
							<Link href={moreButton} className="text-primary font-semibold mr-2 hover:underline">
								المزيد...
							</Link>
						)}
					</p>
				</div>
			)}
		</div>
	)
}
