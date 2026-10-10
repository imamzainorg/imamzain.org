import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Section({
	title,
	text,
	moreButton,
	dark,
	id
}: {
	title: string
	text?: string
	moreButton?: string
	dark?: boolean
	id?: string 
}) {
	return (
		<div id={id} className="w-full space-y-6 !my-8">
			<div className="w-full flex items-center sm:items-center gap-2 md:gap-4">
				<Image
					src={"/shapes/title-icon.svg"}
					width={150}
					height={150}
					alt="title icon"
					className="w-3 sm:w-4 xl:w-5 dark:hidden"
				/>		
				<Image
					src={"/shapes/title-icon_Muharram.svg"}
					width={150}
					height={150}
					alt="title icon"
					className="w-3 sm:w-4 xl:w-5 hidden dark:block"
				/>
				<h2
					className={cn(
						"xs:text-title font-extrabold text-primary dark:text-Muharram_primary",
						dark && "text-white",
					)}
				>
					{title}
				</h2>
			</div>
			{text && (
				<div className="w-11/12 mx-auto text-note">
					<p className=" leading-relaxed !tracking-tight text-justify inline">
						{text}
						{moreButton && (
							<Link href={moreButton} className="text-primary dark:text-Muharram_primary font-semibold mr-2 hover:underline">
								المزيد...
							</Link>
						)}
					</p>
				</div>
			)}
		</div>
	)
}
