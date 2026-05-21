"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ZiaraForm from "@/components/ziara-form"

export default function Services() {
	return (
		<section
			className="
        relative
        pt-20 mt-4 pb-28
        bg-repeat
        overflow-hidden
      "
		>
			{/* الطبقة الداكنة الخلفية */}
			<div className="absolute top-0 inset-x-0 h-[90%] bg-dark-background -z-10" />

			<div className="container mx-auto px-4 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
					{/* ===== النص ===== */}
					<motion.div
						initial={{ opacity: 0, x: 80 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.9, ease: "easeOut" }}
						className="text-center lg:text-right text-white space-y-6"
					>
						<div className="flex items-center  gap-3">
							<Image
								src="/shapes/title-icon.svg"
								width={22}
								height={22}
								alt="icon"
								className="dark:hidden"
							/>
							<Image
								src="/shapes/title-icon_Muharram.svg"
								width={22}
								height={22}
								alt="icon"
								className="hidden dark:block"
							/>
							<h2 className="text-2xl lg:text-title font-extrabold">
								الخدمات
							</h2>
						</div>

						<h2 className="text-xl sm:text-2xl lg:text-body font-bold leading-relaxed">
							زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام
						</h2>

						<p className="text-base sm:text-body leading-relaxed max-w-xl mx-auto lg:mx-0">
							سجل اسمك ليتم أداء زيارة الإمام زين العابدين وأئمة
							البقيع (عليهم السلام) نيابةً عنك عند قبورهم الطاهرة.
						</p>
					</motion.div>

					{/* ===== الفورم مع الموجة ===== */}
					<motion.div
						initial={{ opacity: 0, y: 60 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.9 }}
						className="relative flex justify-center"
					>
						<div
							className="
                relative
                w-full max-w-md
                bg-[url('/shapes/ziara-bg.svg')]
                bg-no-repeat
                bg-contain
                bg-center
                rounded-[40px]
                px-6 py-28 sm:px-10
              "
						>
							<ZiaraForm />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
