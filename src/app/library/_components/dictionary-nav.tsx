"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronLeft, BookOpen, FileText } from "lucide-react"
import { Dictionary, Subject } from "@/types/imamzain-legacy"

type DictionaryNavProps = {
	dictionaries: Dictionary[]
	collectionSlug: string
	activeDictionarySlug: string
}

export default function DictionaryNav({
	dictionaries,
	collectionSlug,
	activeDictionarySlug,
}: DictionaryNavProps) {
	const pathname = usePathname()
	const [expandedDicts, setExpandedDicts] = useState(
		new Set([activeDictionarySlug]),
	)

	const toggleDict = (slug: string) => {
		const newExpanded = new Set(expandedDicts)
		if (newExpanded.has(slug)) {
			newExpanded.delete(slug)
		} else {
			newExpanded.add(slug)
		}
		setExpandedDicts(newExpanded)
	}

	return (
		<div className="bg-white dark:bg-zinc-800 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-2xl overflow-hidden flex flex-col max-h-full">
			<div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-700 bg-gradient-to-br from-primary/5 to-transparent dark:from-Muharram_primary/5">
				<h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
					<BookOpen className="w-5 h-5 text-primary dark:text-Muharram_primary" />
					الأقسام والموضوعات
				</h2>
			</div>

			<nav
				className="flex-1 overflow-y-auto p-3 space-y-1.5 overscroll-contain"
				onWheel={(e) => {
					e.stopPropagation()
				}}
			>
				{dictionaries.map((dict) => {
					const isExpanded = expandedDicts.has(dict.slug)
					const isActive = dict.slug === activeDictionarySlug

					return (
						<div key={dict.slug}>
							<div className="flex items-stretch gap-1">
								<button
									onClick={() => toggleDict(dict.slug)}
									className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors flex-shrink-0"
									aria-label={
										isExpanded ? "طي القسم" : "توسيع القسم"
									}
								>
									{isExpanded ? (
										<ChevronDown className="w-4 h-4 text-gray-500" />
									) : (
										<ChevronLeft className="w-4 h-4 text-gray-500" />
									)}
								</button>

								<Link
									href={`/library/${collectionSlug}/${dict.slug}`}
									className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
										isActive
											? "bg-gradient-to-r from-primary/15 to-primary/5 dark:from-Muharram_primary/20 dark:to-Muharram_primary/5 text-primary dark:text-Muharram_primary font-semibold shadow-sm"
											: "hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-gray-300"
									}`}
								>
									<div
										className={`flex-shrink-0 w-2 h-2 rounded-full ${
											isActive
												? "bg-primary dark:bg-Muharram_primary"
												: "bg-gray-300 dark:bg-zinc-600"
										}`}
									/>
									<span className="flex-1 text-subtitle leading-tight">
										{dict.title}
									</span>
									<span
										className={`text-xs	 px-2 py-0.5 rounded-full ${
											isActive
												? "bg-primary/20 dark:bg-Muharram_primary/30 text-primary dark:text-Muharram_primary"
												: "bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-400"
										}`}
									>
										{(dict.subjects?.length || 0).toLocaleString("ar-EG")}
									</span>
								</Link>
							</div>

							{/* Subjects List */}
							{isExpanded && dict.subjects && (
								<div className="mr-9 mt-1 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
									{dict.subjects.map((subject: Subject) => {
										const subjectPath = `/library/${collectionSlug}/${dict.slug}/${subject.slug}`
										const isActiveSubject =
											pathname === subjectPath ||
											pathname.startsWith(subjectPath)

										return (
											<Link
												key={subject.slug}
												href={subjectPath}
												className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all text-sm group ${
													isActiveSubject
														? "bg-primary/10 dark:bg-Muharram_primary/15 text-primary dark:text-Muharram_primary font-medium shadow-sm"
														: "hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
												}`}
											>
												<FileText
													className={`w-3.5 h-3.5 flex-shrink-0 ${
														isActiveSubject
															? "text-primary dark:text-Muharram_primary"
															: "text-gray-400"
													}`}
												/>
												<span className="flex-1 text-xs md:text-base leading-tight">
													{subject.title}
												</span>
												<span
													className={`text-xs font-medium ${
														isActiveSubject
															? "text-primary/70 dark:text-Muharram_primary/70"
															: "text-gray-400 dark:text-gray-500"
													}`}
												>
													{subject.id}
												</span>
											</Link>
										)
									})}
								</div>
							)}
						</div>
					)
				})}
			</nav>
		</div>
	)
}
