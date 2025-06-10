"use client"

import { memo } from "react"
import { motion, type Variants } from "framer-motion"
import HeaderSections from "@/components/header-sections"
import SectionCta from "@/components/section-cta"

interface CtaLink {
	label: string
	href: string
}

interface AnimatedTextSectionProps {
	title: string
	text: string
	ctaLinks: CtaLink[]
	className?: string
	textClassName?: string
}

const LINE_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		x: -40,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
} as const

function AnimatedTextSection({
	title,
	text,
	ctaLinks,
	className = "",
	textClassName = "",
}: AnimatedTextSectionProps) {
	const defaultTextClasses =
		"font-light text-lg md:text-2xl text-justify tracking-tighter"
	const finalTextClasses = textClassName
		? `${defaultTextClasses} ${textClassName}`
		: defaultTextClasses

	return (
		<div
			className={`container mx-auto flex flex-col gap-12 pt-20 px-4 max-sm:py-8 ${className}`}
		>
			<HeaderSections title={title} />

			<motion.p
				className={finalTextClasses}
				variants={LINE_VARIANTS}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				{text}
			</motion.p>

			<SectionCta links={ctaLinks} />
		</div>
	)
}

export default memo(AnimatedTextSection)
