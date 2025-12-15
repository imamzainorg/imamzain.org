import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, DownloadIcon } from "lucide-react"
import { CollectionConfig } from "../_config/collections"

export default function CollectionHero({
	config,
}: {
	config: CollectionConfig
}) {
	return (
		<div className="relative mt-4 md:mt-16 mb-8 mx-auto flex justify-start gap-20 p-8 md:p-10 backdrop-blur-[1px] shadow-lg shadow-primary/10 dark:shadow-Muharram_primary/10 dark:border-Muharram_primary rounded-[60px] border border-primary">
			<div className="w-full md:w-3/4 flex flex-col justify-around gap-5 md:pr-10">
				<h1 className="text-title font-semibold">{config.title}</h1>
				<p className="w-3/4 text-body leading-10 pb-5">
					{config.description}
				</p>

				<div className="flex flex-row p-2 gap-2">
					{config.readPath && (
						<Link
							href={config.readPath}
							className="w-full xs:w-fit leading-4 text-note py-2 px-4 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group"
						>
							تصفح {config.title}
							<ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
						</Link>
					)}

					{config.pdfDownload && (
						<Link
							href={config.pdfDownload}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full xs:w-fit text-note py-2 px-4 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group hover:bg-primary hover:text-white transition-all duration-300"
						>
							تحميل كاملة
							<DownloadIcon
								className="transition-all duration-300 group-hover:stroke-white"
								stroke="#006654"
							/>
						</Link>
					)}
				</div>
			</div>

			<div className="w-64 max-lg:hidden left-28 -top-16 absolute">
				<Image
					src="/shapes/book-bg.svg"
					className="w-full dark:hidden"
					width={50}
					height={50}
					alt={config.title}
				/>
				<Image
					src="/shapes/book-bg_Muharram.svg"
					className="w-full hidden dark:block"
					width={50}
					height={50}
					alt={config.title}
				/>
			</div>
		</div>
	)
}
