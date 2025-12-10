"use client"
import { cn } from "@/lib/utils"
import { Subject } from "@/types/imamzain-legacy"
import { useState } from "react"

export default function SubjectView({ subject }: { subject: Subject }) {
	const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<
		number | null
	>(null)

	return (
		<div className="my-4 w-full px-6 mx-auto pb-6">
			{subject.phrases.map((phrase, index) => (
				<div
					key={index}
					onClick={() =>
						setSelectedPhraseIndex(
							index === selectedPhraseIndex ? null : index,
						)
					}
					className={cn(
						"text-right leading-8 my-2 p-4 rounded-xl cursor-pointer border transition-all duration-300",
						selectedPhraseIndex === index
							? "bg-gray-50 border-primary/20 dark:bg-Muharram_secondary/10 dark:border-Muharram_primary/30 shadow-md"
							: "hover:bg-gray-50 border-transparent hover:border-gray-200",
					)}
				>
					<div
						className="prose max-w-none text-xl"
						dangerouslySetInnerHTML={{ __html: phrase.content }}
					/>
				</div>
			))}
		</div>
	)
}
