"use client"

import { useState } from "react"
import Modal from "@/components/modal"
import { Subject } from "@/types/imamzainLegacy"
import { cn } from "@/lib/utils"

export default function ModalButton({ subject }: { subject: Subject }) {
	// const [selectedphrase, setSelectedPhrase] = useState(subject.phrases[0])
	const [open, setOpen] = useState(false)
	return (
		<div>
			<div
				onClick={() => setOpen(true)}
				className="group shadow-md hover:shadow-xl shadow-secondary/20 bg-white/60 border cursor-pointer rounded-xl flex justify-between items-center p-4 m-5 border-slate-200 hover:border-secondary/70 duration-150"
			>
				<h2 className="font-bold text-xs lg:text-lg">
					{subject.title}
				</h2>
				<h3 className="text-base p-1 px-2  rounded-md sm:rounded-lg border font-bold border-slate-300 group-hover:border-secondary/70 duration-150">
					{subject.id}
				</h3>
			</div>

			<Modal open={open} onClose={() => setOpen(false)}>
				<div className="text-center w-[80vw] xl:w-[60vw] max-h-[60vh]">
					<div className="my-4 w-3/4 mx-auto">
						<h3 className="text-lg font-black text-gray-800">
							{subject.title}
						</h3>
						{subject.phrases.map((phrase) => (
							<div
								key={phrase.id}
								// onClick={() => setSelectedPhrase(phrase)}
								className={cn(
									"text-right leading-10 mt-8 hover:bg-gray-100 duration-300 p-4 rounded-xl cursor-pointer",
									// selectedphrase === phrase && "bg-gray-100",
								)}
								dangerouslySetInnerHTML={{
									__html: phrase.content,
								}}
							/>
						))}
					</div>
				</div>
			</Modal>
		</div>
	)
}
