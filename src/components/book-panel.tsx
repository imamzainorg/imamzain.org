import Image from "next/image"
import { outlinePanel } from "@/components/brand"
import { Reveal } from "@/components/motion"

// The library's outlined panel with the book shape standing over its corner. A feature block
// for a single work (Risalat al-Huqooq on the home page and /his-life). `children` are its actions.
export default function BookPanel({
	title,
	text,
	spine,
	children,
}: {
	title?: string
	text: string
	// The two short lines printed on the book's cover.
	spine: [string, string]
	children?: React.ReactNode
}) {
	return (
		<Reveal>
			<div className={`${outlinePanel} relative p-8 md:p-12 lg:pl-80`}>
				{title && <h4 className="text-3xl font-bold text-primary dark:text-Muharram_primary">{title}</h4>}
				<p className={`${title ? "mt-4" : ""} max-w-2xl text-lg leading-loose text-gray-700`}>{text}</p>
				{children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
				<div className="absolute -top-10 left-16 hidden w-52 lg:block" aria-hidden>
					<Image src="/shapes/book-bg.svg" width={208} height={240} alt="" className="w-full dark:hidden" />
					<Image
						src="/shapes/book-bg_Muharram.svg"
						width={208}
						height={240}
						alt=""
						className="hidden w-full dark:block"
					/>
					<span className="absolute inset-x-0 top-[14%] text-center text-2xl font-bold text-white">
						{spine[0]}
						<br />
						{spine[1]}
					</span>
				</div>
			</div>
		</Reveal>
	)
}
