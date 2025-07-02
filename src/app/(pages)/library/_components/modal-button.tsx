"use client"

import { useState, useRef } from "react"
import Modal from "@/components/modal"
import { Subject } from "@/types/imamzainLegacy"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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
				className ="group relative w-full h-full overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border cursor-pointer rounded-3xl flex justify-between items-center p-3  border-slate-200 hover:border-secondary/60  dark:hover:border-Muharram_secondary/60 shadow-md hover:shadow-xl transition-all duration-300"
			>
				<div className="absolute -top-10 -right-10 z-0">
					<div className="relative w-36 h-36">
						<div className="absolute w-full h-full rounded-full bg-gradient-to-br from-secondary/30 dark:from-Muharram_secondary/30 dark:to-Muharram_primary/10 to-primary/10 blur-2xl opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
						<div className="absolute w-20 h-20 right-4 top-4 rounded-full bg-secondary/20 dark:bg-Muharram_secondary/20 blur-xl opacity-40 dark:opacity-40 group-hover:opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700 dark:group-hover:opacity-60 dark:group-hover:translate-x-1 dark:group-hover:-translate-y-1 dark:transition-all dark:duration-700 " />
					</div>
				</div>

				<div className="w-5/6 flex flex-col gap-1 z-10">
					<h2 className="font-semibold text-base pr-2 text-gray-800 group-hover:text-primary dark:group-hover:text-Muharram_primary  dark:transition-colors dark:duration-300 transition-colors duration-300">
						{subject.title}
					</h2>
					<p className="text-xs text-gray-500 hidden sm:block pr-2">
						{subject.phrases.length} عبارات
					</p>
				</div>

				<div className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-primary dark:text-Muharram_primary dark:border-Muharram_secondary/30 border border-secondary/30 shadow-sm z-10">
					<span className="text-sm md:text-base font-bold">
						{subject.id}
					</span>
				</div>
			</div>

			<Modal open={open} onClose={() => setOpen(false)}>
				<motion.div
					ref={modalRef}
					initial={{ opacity: 0, scale: 0.97 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.97 }}
					transition={{ duration: 0.25 }}
					className="w-[90vw] md:w-[80vw] xl:w-[60vw] max-h-[85vh] overflow-hidden bg-white rounded-3xl shadow-2xl relative z-50 flex flex-col"
				>
					{/* الرأس */}
					<div className="sticky top-0 z-20 bg-gradient-to-r from-primary/5 dark:from-Muharram_primary/5 dark:to-Muharram_secondary to-secondary/5 backdrop-blur-md p-5 border-b border-gray-200 rounded-t-3xl">
						<div className="flex justify-between items-center">
							<h3 className="text-lg md:text-xl font-bold text-gray-800">
								{subject.title}
							</h3>
							<span className="px-3 py-1 bg-white/80 rounded-full text-sm font-semibold text-primary dark:text-Muharram_primary dark:border-Muharram_primary/20 border border-primary/20">
								{subject.id}
							</span>
						</div>
					</div>

					{/* المحتوى */}
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
										? "bg-secondary/10 border-secondary/30 dark:bg-Muharram_secondary/10 dark:border-Muharram_primary/30 shadow-md"
										: "hover:bg-gray-50 border-transparent hover:border-gray-200",
								)}
							>
								<div
									className="prose max-w-none "
									dangerouslySetInnerHTML={{
										__html: phrase.content,
									}}
								/>
							</div>
						))}
					</div>

					{/* زر الإغلاق */}
					<div className="bg-gray-50 p-5 border-t border-gray-100 rounded-b-3xl flex justify-end">
						<button
							onClick={() => setOpen(false)}
							className="px-5 py-2 bg-primary dark:bg-Muharram_primary text-white font-medium rounded-xl hover:bg-primary/90  dark:hover:bg-Muharram_primary/90 transition-all"
						>
							إغلاق النافذة
						</button>
					</div>
				</motion.div>
			</Modal>
		</>
	)
}
