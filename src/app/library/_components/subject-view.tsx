"use client"

import { Explanation, Phrase, Subject } from "@/types/imamzain-legacy"
import { useEffect, useRef } from "react"

type SubjectViewProps = {
	subject: Subject
	highlightTerm?: string
}

const removeDiacritics = (text: string) => {
	return text.replace(/[\u064B-\u065F\u0670]/g, "")
}

export default function SubjectView({
	subject,
	highlightTerm,
}: SubjectViewProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!highlightTerm || !containerRef.current) return

		// sroll to highlighted text
		const timer = setTimeout(() => {
			const firstHighlight = containerRef.current?.querySelector("mark")
			if (firstHighlight) {
				firstHighlight.scrollIntoView({
					behavior: "smooth",
					block: "center",
				})
				firstHighlight.classList.add("animate-pulse")
				setTimeout(
					() => firstHighlight.classList.remove("animate-pulse"),
					2000,
				)
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [highlightTerm])

	const highlightContent = (html: string) => {
		if (!highlightTerm || typeof document === "undefined") return html

		const temp = document.createElement("div")
		temp.innerHTML = html

		const normalizedTerm = removeDiacritics(highlightTerm.toLowerCase())

		const highlightTextNode = (node: Node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent || ""
				const textNormalized = removeDiacritics(text.toLowerCase())

				if (textNormalized.includes(normalizedTerm)) {
					const span = document.createElement("span")

					// map to original indices for correct highlighting
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
					indexMap[normalizedIndex] = text.length

					let result = ""
					let lastIndex = 0
					let searchIndex = 0

					while (true) {
						const matchIndex = textNormalized.indexOf(
							normalizedTerm,
							searchIndex,
						)
						if (matchIndex === -1) break

						const originalStart = indexMap[matchIndex]
						const originalEnd =
							indexMap[matchIndex + normalizedTerm.length]

						result += text.substring(lastIndex, originalStart)
						result += `<mark class="bg-yellow-300 dark:bg-yellow-600 px-1 rounded-sm shadow-sm">${text.substring(originalStart, originalEnd)}</mark>`

						lastIndex = originalEnd
						searchIndex = matchIndex + normalizedTerm.length
					}

					result += text.substring(lastIndex)

					span.innerHTML = result
					node.parentNode?.replaceChild(span, node)
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				if ((node as Element).tagName !== "MARK") {
					Array.from(node.childNodes).forEach(highlightTextNode)
				}
			}
		}

		Array.from(temp.childNodes).forEach(highlightTextNode)
		return temp.innerHTML
	}

	return (
		<div ref={containerRef} className="space-y-6">
			{subject.phrases?.map((phrase: Phrase) => (
				<div key={phrase.id}>
					<div
						className="flex-1 text-subtitle max-w-none leading-relaxed text-gray-800 dark:text-gray-200"
						dangerouslySetInnerHTML={{
							__html: highlightContent(phrase.content),
						}}
					/>

					{/* Explanations */}
					{phrase.explanations?.length > 0 &&
						phrase.explanations.some(
							(e: Explanation) => e.content,
						) && (
							<div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-700 space-y-4">
								{phrase.explanations.map(
									(explanation: Explanation, idx: number) =>
										explanation.content ? (
											<div key={idx} className="pr-14">
												{explanation.author && (
													<div className="text-sm font-medium text-primary dark:text-Muharram_primary mb-2">
														{explanation.author}
													</div>
												)}
												<div
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
													dangerouslySetInnerHTML={{
														__html: highlightContent(
															explanation.content,
														),
													}}
												/>
											</div>
										) : null,
								)}
							</div>
						)}
				</div>
			))}
		</div>
	)
}
