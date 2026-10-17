"use client"

import { useShown } from "@/components/motion"

// Reveals a quotation word by word when it scrolls into view.
export default function AnimatedQuote({ text, className }: { text: string; className?: string }) {
	const [ref, shown] = useShown<HTMLQuoteElement>()
	const words = text.split(" ")
	return (
		<blockquote ref={ref} className={className}>
			«
			{words.map((word, i) => (
				<span
					key={i}
					className="inline-block motion-reduce:!transform-none motion-reduce:!transition-none"
					style={{
						opacity: shown ? 1 : 0,
						transform: shown ? "none" : "translateY(14px)",
						filter: shown ? "none" : "blur(6px)",
						transition: `opacity 0.5s ease-out ${i * 0.09}s, transform 0.5s ease-out ${i * 0.09}s, filter 0.5s ease-out ${i * 0.09}s`,
					}}
				>
					{word}
					{i < words.length - 1 && " "}
				</span>
			))}
			»
		</blockquote>
	)
}
