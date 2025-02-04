"use client"
import HeaderSections from "@/components/header-sections"
import SectionCta from "@/components/section-cta"
import { motion } from "framer-motion"
export default function RightsMessage() {
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
		<>
			<div className=" container flex flex-col gap-12  py-24 max-sm:py-8">
				<HeaderSections title={"رسالة الحقوق"} />
				<motion.p
					className="  font-light text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 text-justify tracking-tighter"
					variants={lineVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					رسالة الحقوق منظومة حقوقية دونها الامام زين العابدين ع قبل
					اربعة عشر قرنا ... تمتاز عن غيرها : بالشمولية لجميع الحقوق
					التي جاء بها الاسلام ابتداء من نفس الإنسان وجوارحه وعلاقته
					بخالقه ثم تتوسع شاملة لجميع علاقاته مع ارحامه وجيرانه
					واصدقائه لتشمل خارطة العلاقات الاجتماعة جميعاً. ان مادتها
					مستمدة من الوحي اذ الامام هو حجة الله تعالى وترجمان وحيه.
					تمتاز بالثبات وعدم طرو التغير عليها كما في بقية المدونات
					الحقوقية الوضعية منطلقة من ملاك الحق المشرع بمقتضى الحكمة
					الإلهية بعيداً عن الاهواء والرغبات الشخصية او العرقية او
					الطائفية ومحققة للعدالة الإجتماعية وموجدة للتوازن بين جميع
					مكونات المجتمع الانساني بالغة به حد الامن والسلم المجتمعي
					والحياة الكريمة لو تمت مراعاتها وتطبيقها.
				</motion.p>
				<SectionCta
					links={[
						{
							label: "تصفح رسالة الحقوق",
							href: "/library/treatise-of-rights",
						},
					]}
				/>
			</div>
		</>
	)
}
