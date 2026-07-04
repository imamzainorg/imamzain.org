"use client"

import { useState, useMemo, useCallback, useDeferredValue } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dictionary } from "@/types/imamzain-legacy"

type SearchResult = {
	dictionaryId: number
	dictionaryTitle: string
	dictionarySlug: string
	subjectId: string
	subjectTitle: string
	subjectSlug: string
	phraseId: string
	matchedText: string
}

type CollectionSearchProps = {
	collection: Dictionary[]
	collectionSlug: string
}

const stripHtml = (html: string) => {
	return html
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim()
}

const removeDiacritics = (text: string) => {
	return text.replace(/[\u064B-\u065F\u0670]/g, "")
}

export default function CollectionSearch({
	collection,
	collectionSlug,
}: CollectionSearchProps) {
	const [searchTerm, setSearchTerm] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()

	// Use deferred value for search term to prevent blocking UI
	const deferredSearchTerm = useDeferredValue(searchTerm)

	// Optimized search with Web Worker-like approach (but simplified for client-side)
	const searchResults = useMemo(() => {
		const term = removeDiacritics(deferredSearchTerm.trim().toLowerCase())
		if (!term || term.length < 2) return []

		const results: SearchResult[] = []

		for (const dictionary of collection) {
			for (const subject of dictionary.subjects || []) {
				const subjectTitle = removeDiacritics(
					subject.title.toLowerCase(),
				)
				const titleMatches = subjectTitle.includes(term)

				// Check phrases only if title doesn't match (for better preview)
				if (titleMatches) {
					// Use first phrase for preview when title matches
					const firstPhrase = subject.phrases?.[0]
					if (firstPhrase) {
						const content = stripHtml(firstPhrase.content)
						const preview =
							content.length > 150
								? content.substring(0, 150) + "..."
								: content

						results.push({
							dictionaryId: dictionary.id,
							dictionaryTitle: dictionary.title,
							dictionarySlug: dictionary.slug,
							subjectId: subject.id,
							subjectTitle: subject.title,
							subjectSlug: subject.slug,
							phraseId: firstPhrase.id,
							matchedText: preview,
						})
					}
				} else {
					// Check phrases content
					for (const phrase of subject.phrases || []) {
						const content = stripHtml(phrase.content)
						const contentLower = removeDiacritics(
							content.toLowerCase(),
						)

						if (contentLower.includes(term)) {
							const index = contentLower.indexOf(term)
							const start = Math.max(0, index - 60)
							const end = Math.min(
								content.length,
								index + term.length + 60,
							)
							const matchedText =
								(start > 0 ? "..." : "") +
								content.substring(start, end) +
								(end < content.length ? "..." : "")

							results.push({
								dictionaryId: dictionary.id,
								dictionaryTitle: dictionary.title,
								dictionarySlug: dictionary.slug,
								subjectId: subject.id,
								subjectTitle: subject.title,
								subjectSlug: subject.slug,
								phraseId: phrase.id,
								matchedText,
							})

							// Only take first matching phrase per subject to avoid duplicates
							break
						}
					}
				}
			}
		}

		return results
	}, [deferredSearchTerm, collection])

	const highlightText = useCallback(
		(text: string) => {
			const term = deferredSearchTerm.trim()
			if (!term) return text

			const normalizedTerm = removeDiacritics(term.toLowerCase())
			const parts: React.ReactNode[] = []
			let lastIndex = 0

			// Build a map of original indices to normalized indices
			let normalizedIndex = 0
			const indexMap: number[] = []
			for (let i = 0; i < text.length; i++) {
				const char = text[i]
				const isDiacritic = /[\u064B-\u065F\u0670]/.test(char)

				if (!isDiacritic) {
					indexMap[normalizedIndex] = i
					normalizedIndex++
				}
			}
			indexMap[normalizedIndex] = text.length // Add final position

			// Search in normalized text
			const textNormalized = removeDiacritics(text.toLowerCase())
			let searchIndex = 0

			while (true) {
				const match = textNormalized.indexOf(
					normalizedTerm,
					searchIndex,
				)
				if (match === -1) break

				// Map back to original indices
				const originalStart = indexMap[match]
				const originalEnd = indexMap[match + normalizedTerm.length]

				// Add text before match
				if (originalStart > lastIndex) {
					parts.push(
						<span key={`text-${lastIndex}`}>
							{text.substring(lastIndex, originalStart)}
						</span>,
					)
				}

				// Add highlighted match
				parts.push(
					<mark
						key={`mark-${match}`}
						className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded"
					>
						{text.substring(originalStart, originalEnd)}
					</mark>,
				)

				lastIndex = originalEnd
				searchIndex = match + normalizedTerm.length
			}

			// Add remaining text
			if (lastIndex < text.length) {
				parts.push(
					<span key={`text-${lastIndex}`}>
						{text.substring(lastIndex)}
					</span>,
				)
			}

			return parts.length > 0 ? <>{parts}</> : text
		},
		[deferredSearchTerm],
	)

	const handleResultClick = (result: SearchResult) => {
		setIsOpen(false)
		router.push(
			`/library/${collectionSlug}/${result.dictionarySlug}/${result.subjectSlug}?highlight=${encodeURIComponent(deferredSearchTerm)}`,
		)
	}

	// Show loading state when search is deferred
	const isSearching = searchTerm !== deferredSearchTerm

	return (
		<div className="relative">
			<div className="relative group">
				<Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-Muharram_primary transition-colors" />
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
						setIsOpen(true)
					}}
					onFocus={() => searchTerm && setIsOpen(true)}
					placeholder="ابحث في جميع المحتوى..."
					className="w-full pr-12 pl-12 py-3.5 border-2 border-gray-200 dark:border-Muharram_primary/50 rounded-2xl bg-white dark:bg-Muharram_secondary/15 text-gray-900 dark:text-Muharram_primary placeholder:text-gray-400 focus:ring-0 focus:border-primary dark:focus:border-Muharram_primary transition-all shadow-sm hover:shadow-md focus:shadow-lg"
				/>
				{searchTerm && (
					<button
						onClick={() => {
							setSearchTerm("")
							setIsOpen(false)
						}}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				)}
			</div>

			{/* Search Results Dropdown */}
			{isOpen && searchTerm && searchTerm.length >= 2 && (
				<>
					<div
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute top-full mt-3 w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-zinc-700 max-h-[32rem] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
						{isSearching ? (
							<div className="p-8 flex items-center justify-center">
								<div className="flex flex-col items-center gap-3">
									<div className="w-8 h-8 border-4 border-primary/30 dark:border-Muharram_primary/30 border-t-primary dark:border-t-Muharram_primary rounded-full animate-spin"></div>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										جاري البحث...
									</p>
								</div>
							</div>
						) : searchResults.length === 0 ? (
							<div className="p-12 text-center">
								<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center">
									<Search className="w-8 h-8 text-gray-400" />
								</div>
								<p className="text-gray-500 dark:text-gray-400 font-medium">
									لا توجد نتائج
								</p>
								<p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
									حاول البحث بكلمات أخرى
								</p>
							</div>
						) : (
							<>
								<div className="px-5 py-3 border-b border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
									<p className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{searchResults.length}{" "}
										{searchResults.length === 1
											? "نتيجة"
											: "نتيجة"}
									</p>
								</div>
								<div
									className="overflow-y-auto max-h-[28rem] divide-y divide-gray-100 dark:divide-zinc-700 overscroll-contain"
									onWheel={(e) => {
										e.stopPropagation()
									}}
								>
									{searchResults.map((result, idx) => (
										<button
											key={`${result.dictionaryId}-${result.subjectSlug}-${result.phraseId}-${idx}`}
											onClick={() =>
												handleResultClick(result)
											}
											className="w-full text-right p-5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent dark:hover:from-Muharram_primary/5 transition-all group"
										>
											<div className="flex items-start gap-3">
												<div className="flex-shrink-0 w-8 h-8 mt-0.5 rounded-lg bg-primary/10 dark:bg-Muharram_primary/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-Muharram_primary/20 transition-colors">
													<span className="text-sm font-bold text-primary dark:text-Muharram_primary">
														{result.subjectId}
													</span>
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-2">
														<span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400">
															{
																result.dictionaryTitle
															}
														</span>
													</div>
													<h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors">
														{highlightText(
															result.subjectTitle,
														)}
													</h4>
													<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
														{highlightText(
															result.matchedText,
														)}
													</p>
												</div>
											</div>
										</button>
									))}
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}
