"use client"
import { motion } from "framer-motion"
import SectionCta from "@/components/section-cta"

export default function InstitutionMessage() {
	const lineVariants = {
		hidden: { opacity: 0, x: -40 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	}

	return (
		<div className="container pt-20 flex flex-col gap-8">
			<h1 className="text-3xl text-center md:text-right md:text-5xl text-primary font-bold">
				رؤية المؤسسة
			</h1>

			<motion.div
				className="font-light text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 tracking-tighter"
				variants={lineVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
			>
				<p className="mb-2 text-justify">
					انطلاقاً من العمق الديني والعلمي والاجتماعي لأهل بيت النبوة
					وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى
					تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى
					الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين
					وخصوصاً أئمة البقيع (علهم السلام)، وما مورس في حقهم من إجحاف
					وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة جدهم
					النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون
					جزاهم الله خيراً قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة
					البقيع وفقههم والعمل على إلفات الإنظار الى سمو مرتبتهم
					(عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله العاملين كل
					خير.
				</p>
			</motion.div>

			<SectionCta
				links={[
					{
						label: "اهداف المؤسسة",
						href: "/about/vision-and-goals#goals",
					},
					{
						label: "رسالة المؤسسة",
						href: "/about/vision-and-goals#message",
					},
				]}
			/>
		</div>
	)
}
