"use client"

import { useState, useRef } from "react"
import Modal from "@/components/modal"
import { Subject } from "@/types/imamzainLegacy"
import { cn } from "@/lib/utils"

export default function ModalButton({ subject }: { subject: Subject }) {
	const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<
		number | null
	>(null)
	const [open, setOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	return (
		<>
			<div
				id={subject?.slug}
				onClick={() => setOpen(true)}
				className="w-full h-full group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border cursor-pointer rounded-xl flex justify-between items-center p-5 border-slate-200 hover:border-secondary/70 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
			>
				{/* Decorative element */}
				<div className="absolute -right-6 -top-6 w-16 h-16 bg-secondary/10 rounded-full transform group-hover:scale-150 group-hover:bg-secondary/20 transition-all duration-500"></div>

				<div className="w-5/6 flex flex-col space-y-1 z-10">
					<h2 className="font-semibold text-xs lg:text-lg text-gray-800 group-hover:text-primary transition-colors duration-300">
						{subject.title}
					</h2>
					<p className="text-xs text-gray-500 hidden sm:block">
						{subject.phrases.length} عبارات
					</p>
				</div>

				<h3 className="text-base p-1.5 px-3 rounded-lg border font-bold bg-white/80 border-slate-300 text-gray-700 group-hover:text-primary group-hover:border-secondary/70 group-hover:bg-white transition-all duration-300 z-10">
					{subject.id}
				</h3>
			</div>

			<Modal open={open} onClose={() => setOpen(false)}>
				<div
					ref={modalRef}
					className="w-[90vw] md:w-[80vw] xl:w-[60vw] max-h-[80vh] overflow-hidden bg-white rounded-2xl shadow-2xl relative z-50"
				>
					<div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-gray-100">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-bold text-gray-800">
								{subject.title}
							</h3>
							<span className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-primary border border-primary/20">
								{subject.id}
							</span>
						</div>
					</div>

					<div className="my-4 w-full px-6 mx-auto overflow-y-auto max-h-[60vh] pb-6">
						{subject.phrases.map((phrase, index) => (
							<div
								key={index}
								onClick={() =>
									setSelectedPhraseIndex(
										index === selectedPhraseIndex
											? null
											: index,
									)
								}
								className={cn(
									"text-right leading-8 my-6 p-5 rounded-xl cursor-pointer border transition-all duration-300",
									selectedPhraseIndex === index
										? "bg-secondary/10 border-secondary/30 shadow-md"
										: "hover:bg-gray-50 border-transparent hover:border-gray-200",
								)}
							>
								<div
									className="prose max-w-none"
									dangerouslySetInnerHTML={{
										__html: phrase.content,
									}}
								/>
							</div>
						))}
					</div>

					<div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
						<button
							onClick={() => setOpen(false)}
							className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 hover:shadow-md"
						>
							اغلق النافذة
						</button>
					</div>
				</div>
			</Modal>
		</>
	)
}
