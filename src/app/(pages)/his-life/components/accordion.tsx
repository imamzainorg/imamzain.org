"use client"

import { Accordion, AccordionItem } from "@heroui/accordion"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function HisLifeAccordion({
	section,
}: {
	section: { title: string; slug: string; content: string }
}) {
	return (
		<Accordion>
			<AccordionItem
				key={section.title}
				aria-label={section.title}
				title={
					<div className=" relative bg-primary p-4 text-white shadow-lg rounded-2xl font-bold overflow-hidden z-10">
						<span className="mr-8">{section.title}</span>
						<div className="absolute top-0 -right-4 bg-[url('/shapes/newsIndicator.svg')] bg-center bg-no-repeat -rotate-90 w-14 h-14" />
					</div>
				}
				classNames={{
					base: "accordion flex flex-col",
					indicator: "hidden",
				}}
			>
				<div
					className="text-justify px-8 pt-12 bg-yellow-50 rounded-b-3xl -translate-y-10 z-10 relative line-clamp-6 leading-loose"
					dangerouslySetInnerHTML={{ __html: section.content }}
				/>
				<div className="w-full flex justify-end">
					<Link
						href={`/his-life/${section.slug}`}
						className=" text-primary p-4 flex items-center gap-4 group -translate-y-10"
					>
						قراءة المزيد
						<ChevronLeft className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-150" />
					</Link>
				</div>
			</AccordionItem>
		</Accordion>
	)
}
