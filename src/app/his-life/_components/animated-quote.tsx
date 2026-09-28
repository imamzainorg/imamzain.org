"use client"

import { motion } from "framer-motion"

// Reveals a quotation word by word when it scrolls into view.
export default function AnimatedQuote({ text, className }: { text: string; className?: string }) {
	const words = text.split(" ")
	return (
		<motion.blockquote
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.6 }}
			variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
		>
			«
			{words.map((word, i) => (
				<motion.span
					key={i}
					className="inline-block"
					variants={{
						hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
						visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
					}}
				>
					{word}
					{i < words.length - 1 && " "}
				</motion.span>
			))}
			»
		</motion.blockquote>
	)
}
