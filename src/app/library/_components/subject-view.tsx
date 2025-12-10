"use client"
import { cn } from "@/lib/utils"
import { Subject } from "@/types/imamzain-legacy"
import { useState } from "react"

export default function SubjectView({ subject }: { subject: Subject }) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	return (
		<div className="my-4 w-full px-6 mx-auto pb-6">
			{subject.phrases.map((phrase, index) => (
				<div
					key={index}
					onClick={() =>
						setSelectedIndex(index === selectedIndex ? null : index)
					}
					className={cn(
						"text-right my-2 px-5 py-2 rounded-xl cursor-pointer border duration-300 focus:bg-red-100",
						selectedIndex === index
							? "bg-gray-50 border-primary/30 dark:bg-Muharram_secondary/10 dark:border-Muharram_primary/30 shadow-md"
							: "hover:bg-gray-50 border-transparent hover:border-gray-200",
					)}
				>
					<div
						className="max-w-none text-xl leading-loose"
						dangerouslySetInnerHTML={{ __html: phrase.content }}
					/>
				</div>
			))}
		</div>
	)
}
