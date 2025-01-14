"use client"

import { GlobeIcon } from "@/assets/icons/reusable"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { useEffect, useRef, useState } from "react"

interface Props {
	items: { name: string; link: string }[]
	text: string
}
export default function Dropdown({ items, text }: Props) {
	const [isActiveDropdown, setIsActiveDropdown] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function close() {
			setIsActiveDropdown(false)
		}

		document.addEventListener("click", close)
		return () => document.removeEventListener("click", close)
	})

	return (
		<div
			data-state={isActiveDropdown ? "open" : "closed"}
			className="text-text group relative"
		>
			<button
				aria-haspopup="listbox"
				aria-expanded={isActiveDropdown}
				onClick={() => {
					console.log("clicked")
					setIsActiveDropdown(!isActiveDropdown)
				}}
				className="peer flex w-fit cursor-pointer items-center justify-center rounded-sm px-7 py-3"
			>
				<span className="ml-1 flex gap-2">
					<GlobeIcon height={20} stroke="#ffffff" fill="#ffffff" />
					{text}
				</span>
				<ChevronDown
					className={
						"ml-2 h-5 w-5 transition-transform ease-in-out group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180"
					}
				/>
			</button>
			<div
				ref={ref}
				role="listbox"
				className="absolute left-1/2 w-fit -translate-x-1/2 overflow-hidden bg-white text-black rounded-2xl  text-center transition-all group-data-[state=open]:visible group-data-[state=closed]:invisible group-data-[state=closed]:top-[50px] group-data-[state=open]:top-16 group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100 dark:bg-zinc-900"
			>
				{items.map((item, index) => (
					<Link
						key={index}
						href={item.link}
						target="_blank"
						className="flex justify-around items-center gap-4 w-full pr-2 pl-7 py-3 group/link"
					>
						<div className="w-2 h-2 bg-primary rounded-full group-hover/link:opacity-100 opacity-0 duration-150" />
						{item.name}
					</Link>
				))}
			</div>
		</div>
	)
}
