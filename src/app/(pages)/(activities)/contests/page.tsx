"use client"

import Breadcrumbs from "@/components/breadcrumb"
import { motion } from "framer-motion"
import Image from "next/image"
import { Carousel } from "./components/carousel"
import Section from "@/components/section"

export default function Page() {
	const slideData = [
		{
			title: "مسابقة الخط العربي",
			button: "تفاصيل المسابقة",
			link: "/contests/khat",
			src: "/contests/khat/landing.jpg",
		},
		{
			title: "مسابقة كتاب 1447هـ",
			button: "تفاصيل المسابقة",
			link: "/contests/kitab",
			src: "/contests/kitab/landing.jpg",
		},
	]

	return (
		<div className="container">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المسابقات", url: "#" },
				]}
			/>
			<div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center">
				<div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
					<div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
				</div>
				<div className="px-4 py-10 md:py-20">
					<h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300 !leading-relaxed">
						{"مسابقات في تراث الإمام زين العابدين (عليه السلام)"
							.split(" ")
							.map((word, index) => (
								<motion.span
									key={index}
									initial={{
										opacity: 0,
										filter: "blur(4px)",
										y: 10,
									}}
									animate={{
										opacity: 1,
										filter: "blur(0px)",
										y: 0,
									}}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
										ease: "easeInOut",
									}}
									className="mr-2 inline-block"
								>
									{word}
								</motion.span>
							))}
					</h1>
					<motion.p
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						transition={{
							duration: 0.3,
							delay: 0.8,
						}}
						className="relative z-10 mx-auto max-w-xl py-10 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
					>
						نفتح أبواب المشاركة لكل من يسعى لنشر المعرفة، إحياء
						التراث، والتعبير عن الولاء عبر مسابقات فكرية، بحثية،
						وفنية متميزة.
					</motion.p>
					<motion.div
						initial={{
							opacity: 0,
							y: 10,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.3,
							delay: 1.2,
						}}
						className="relative z-10 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
					>
						<div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
							<Image
								src="/images/albaqi.jpg"
								alt="Landing page preview"
								className="aspect-[16/9] h-auto w-full object-cover"
								height={1000}
								width={1000}
							/>
						</div>
					</motion.div>
				</div>
			</div>

			{/* المسابقات الجارية */}
			<Section id="active" title="المسابقات الجارية" />
			<div className="relative overflow-hidden w-full h-full py-20">
				<Carousel slides={slideData} />
			</div>

			<div className="w-1/2 mx-auto h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent " />
		</div>
	)
}
