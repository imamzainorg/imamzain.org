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
		<div className="w-full my-8">
			<div className="w-full flex items-center sm:items-start gap-2 md:gap-4 p-2 sm:p-4">
				<Image
					src={"/shapes/title-icon.svg"}
					width={150}
					height={150}
					alt="title icon"
					className="w-3 sm:w-6 lg:w-8 xl:w-10"
				/>
				<h1
					className={cn(
						"text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary",
						dark && "text-white",
					)}
				>
					{title}
				</h1>
			</div>
			{text && (
				<div className="w-11/12 mx-auto space-y-2  ">
					<p className="w-11/12 mx-auto mb-5 text-lg sm:text-lg md:text-xl lg:text-2xl leading-loose sm:!leading-loose text-justify  ">
						{text}
					</p>
				</div>
			)}
		</div>
	)
}
