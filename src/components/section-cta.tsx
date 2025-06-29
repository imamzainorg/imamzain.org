"use client"
import Link from "next/link"
import { motion } from "framer-motion"

export default function SectionCta({
	links,
}: {
	links: { label: string; href: string }[]
}) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	}

	return (
		<motion.div
			className="flex flex-wrap justify-center gap-4  !m-0"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
		>
			{links.map((link, index) => (
				<motion.div
					key={index}
					variants={itemVariants}
					whileTap={{ scale: 0.95 }}
					whileHover={{ scale: 1.02 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="relative w-full sm:w-auto text-center"
				>
					<Link
						href={link.href}
						className="text-white md:text-lg bg-primary text-center p-4 px-8 sm:px-10 md:px-12 lg:px-16
						inline-flex justify-center items-center gap-4 transition-all duration-300 ease-in-out
						active:scale-95 hover:scale-105 rounded-lg"
						style={{
							WebkitMaskImage: `url('/shapes/button-bg.svg') dark:bg-[url('/shapes/button-bg_Muharram.svg')]`,
							maskImage: `url('/shapes/button-bg.svg') `,
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskSize: "contain",
							maskSize: "contain",
							WebkitMaskPosition: "center",
							maskPosition: "center",
							minWidth: "200px",
						}}
					>
						<span className="w-2 h-2 bg-secondary rounded-full z-10" />
						<span className="z-10">{link.label}</span>
					</Link>
				</motion.div>
			))}
		</motion.div>
	)
}
