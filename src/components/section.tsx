import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Section({
	title,
	text,
	dark,
}: {
	title: string
	text?: string
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
					className="w-2 sm:w-6 lg:w-5 xl:w-6"
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
				<div className="w-11/12 mx-auto space-y-2">
					<p className="mb-5 text-lg sm:text-lg md:text-xl leading-normal sm:!leading-relaxed tracking-tight text-justify">
						{text}
					</p>
				</div>
			)}
		</div>
	)
}
