"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import ImageView from "@/components/image-view"
import Image from "next/image"
import mainApp from "../../../../public/application/main-bg.jpg"

const MainSection = () => {
	const imageVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 1, ease: "easeOut" },
		},
	}
	const containerVariants = {
		hidden: { opacity: 0, x: 100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				ease: "easeOut",
			},
		},
	}

	
	return (
		<div className="relative top-0 h-[50rem] lg:h-[40rem] w-full">
			<div className="absolute top-0 right-0  w-full h-full -z-20">
				<Image
					src={mainApp}
					alt="Some image"
					fill
					className="object-cover"
					style={{
						objectPosition: "center",
					}}
				/>
			</div>
			<div className="absolute top-0 right-0 w-full h-full flex justify-center items-center  pt-10 lg:pt-40 z-10">
				<div className="container flex flex-col lg:flex-row justify-between items-center gap-10 ">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="w-full lg:w-1/2 flex flex-col gap-4 lg:justify-between lg:gap-8 xl:gap-14 max-lg:text-center lg:h-[24rem] "
					>
						<p className="text-4xl xl:text-5xl font-bold text-center lg:text-start text-primary leading-tight lg:leading-normal">
							تطبيق أنوار سجادية
						</p>
						<p className="text-lg sm:text-xl xl:text-2xl font-semibold max-lg:text-center leading-tight lg:leading-normal">
							الموسوعة المتكاملة عن الإمام زين العابدين(عليه
							السلام)
						</p>
						<div className="flex justify-center lg:justify-start gap-4 lg:gap-10">
							<div>
								<Link
									href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
									target="_blank"
								>
									<ImageView
										src="/application/app-store.svg"
										className="w-28 h-16 lg:w-40 lg:h-24"
									/>
								</Link>
							</div>
							<div>
								<Link
									href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1"
									target="_blank"
								>
									<ImageView
										src="/application/google-play.svg"
										className="w-28 h-16 lg:w-40 lg:h-24"
									/>
								</Link>
							</div>
						</div>
					</motion.div>
					<div className="relative flex justify-center items-center ml-10 w-[20rem] h-[24rem] ">
						<motion.div
							variants={imageVariants}
							initial="hidden"
							animate="visible"
							className="absolute bottom-0 left-0 w-[8rem] h-[20rem]"
						>
							<Image
								src={"/application/01.png"}
								alt={`/application/02.png`}
								fill
								className="object-center"
							/>
						</motion.div>

						<motion.div
							variants={imageVariants}
							initial="hidden"
							animate="visible"
							className="absolute bottom-0 left-16 w-[12rem] h-[24rem]"
						>
							<Image
								src={"/application/02.png"}
								alt={`/application/02.png`}
								fill
								className="object-center"
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}

const InformationSection = () => {
	return (
		<>
			<div className="container py-20">
				<div className="text-center ">
					<h2 className="text-4xl xl:text-4xl font-bold  lg:leading-normal">
						الصحيفة السجادية
					</h2>
					<p className="text-lg sm:text-xl xl:text-2xl font-semibold pt-6 leading-tight lg:leading-normal">
						الصحيفة السجادية وزبور آل محمد مع ما ألحقه العلماء لها
						من أهم مداخل هذا التطبيق.
					</p>
				</div>
				<div className="flex flex-col lg:flex-row justify-center gap-10 items-center gap-2">
					<div className="relative w-[26rem] h-[22rem]  ">
						<Image
							src={"/application/05.png"}
							alt={`/application/02.png`}
							fill
							className="absolute object-cover"
							style={{
								objectPosition: "left",
							}}
						/>
					</div>
					<div className="lg:w-1/2 flex flex-col gap-4 md:gap-6">
						<h3 className="text-2xl font-semibold  ">
							ستجد هنا نص الصحيفة السجادية بشكل كامل ومع خدمات
							وميزات خاصة .. منها:
						</h3>
						<ul className="text-xl ">
							<li>النص مقابل على عدة نسخ معتبرة.</li>
							<li>النص محرك بتحريك كامل.</li>
							<li>
								بيان معاني الكلمات الغامضة من خلال النقر عليها.
							</li>
							<li>تمييز الآيات الكريمة باللون الأخضر.</li>
							<li>التحكم بحجم الخط وفواصل الأسطر.</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

const ImamzainSection = () => {
	return (
		<>
			<div className="bg-[#D3FBFD]">
				<div className="container flex justify-center gap-5 lg:gap-10 py-10 w-full h-[40rem]">
					<div className="flex flex-col lg:flex-row justify-center items-center gap-10 self-end">
						<p className="text-xl w-[12rem] max-lg:pb-5 lg:w-60 text-center">
							الإمام زين العابدين(ع) وما أخذه من مساحة واسعة في
							الأدب العربي
						</p>
						<div className="relative w-[12rem] h-[24rem]">
							<Image
								src={"/application/01.png"}
								alt="/application/01.png"
								fill
								className="absolute w-[12rem] h-[24rem] object-center"
							/>
						</div>
					</div>

					<div className="flex flex-col lg:flex-row justify-center items-center gap-10 self-start">
						<div className="relative w-[12rem] h-[24rem]">
							<Image
								src={"/application/02.png"}
								alt="/application/02.png"
								fill
								className="absolute w-[12rem] h-[24rem] object-center"
							/>
						</div>
						<p className="text-xl w-[12rem] max-lg:pt-5 lg:w-60 text-center">
							السيرة العطرة للإمام زين العابدين (ع) .. بين يديك
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

const MessageRights = () => {
	return (
		<>
			<div className="container py-8">
				<div className=" w-full h-full flex flex-col lg:flex-row justify-center gap-10 items-center pt-10">
					<div className="lg:w-[617px] z-10 relative flex flex-col h-full gap-10">
						<h2 className="text-2xl font-bold">
							رسالة الحقوق – تراث خالد
						</h2>
						<p className="text-xl">
							من أهم ما ورثناه عن الإمام زين العابدين (رسالة
							الحقوق) تلك الرسالة الخالدة التي ترسم للإنسان طريق
							الكمال والسعادة. تجد (رسالة الحقوق) بعرض مميز وأسلوب
							سهل مع قابلية المشاركة والتفضيل.
						</p>
					</div>

					<div className="relative w-[24rem] h-[24rem] ">
						<Image
							src={"/application/06.png"}
							alt={`/application/06.png`}
							fill
							className="absolute object-cover"
							style={{
								objectPosition: "left",
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

const MasnadSection = () => {
	return (
		<>
			<>
				<div className="container py-8">
					<div className=" w-full h-full flex flex-col lg:flex-row justify-center gap-10 items-center pt-10">
						<div className="relative w-[26rem] h-[22rem] ">
							<Image
								src={"/application/05.png"}
								alt={`/application/05.png`}
								fill
								className="absolute object-cover"
							/>
						</div>
						<div className="lg:w-[617px] z-10 relative flex flex-col h-full gap-10">
							<h2 className="text-2xl font-bold">
								مسند الإمام زين العابدين(ع)
							</h2>
							<p className="text-xl">
								من أهم مميزات مدرسة أهل البيت(ع) المحافظة على
								التراث الحديثي مع حرص شديد واهتمام كبير على طول
								التاريخ، وإنها المحافظة على الثقل الأصغر الذي
								أوصى به النبي الأعظم(ص). ومن هذا الاتجاه ستجد
								(مسند الإمام زين العابدين) كل الأحاديث المروية
								عنه(ع) وضمن موسوعة تخصصية متكاملة.
							</p>
						</div>
					</div>
				</div>
			</>
		</>
	)
}

const ShrinesVisitationSection = () => {
	return <></>
}

const FeaturesSection = () => {
	return (
		<>
			{/*<div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">*/}
			{/*	<div className="features">*/}
			{/*		<div className="main-container py-12 flex flex-col lg:gap-10 md:gap-4 gap-2">*/}
			{/*			<div className="flex flex-col items-center justify-center gap-2">*/}
			{/*				<h2 className="text-h2">ميزات مصممة خصيصًا</h2>*/}
			{/*				<p className="text-description">*/}
			{/*					يقدم تطبيق أنوار سجادية ميزات مخصصة تشمل الوصول*/}
			{/*					السريع، البحث المتقدم، وتجربة استخدام معززة*/}
			{/*					لتفاعلك الروحي*/}
			{/*				</p>*/}
			{/*			</div>*/}
			{/*			<div className="grid gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-10 lg:py-10 justify-items-center">*/}
			{/*				/!* Feature 1 *!/*/}
			{/*				<div className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">*/}
			{/*					<Image*/}
			{/*						src={*/}
			{/*							"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4A…9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"*/}
			{/*						}*/}
			{/*						alt={`/application/06.png`}*/}
			{/*						width="100"*/}
			{/*						height="100"*/}
			{/*						className="absolute object-cover"*/}
			{/*					/>*/}

			{/*					<h4 className="text-h4">*/}
			{/*						التاريخ الهجري&nbsp;*/}
			{/*					</h4>*/}
			{/*					<p className="text-production">*/}
			{/*						انطلاقاً من الحاجة إلى التاريخ الهجري، اضيف*/}
			{/*						التاريخ المتزامن مع الثبوت الشرعي في الصفحة*/}
			{/*						الرئيسية*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*				/!* Feature 2 *!/*/}
			{/*				<div className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">*/}
			{/*					<image*/}
			{/*						href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4A…9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"*/}
			{/*						width="100"*/}
			{/*						height="100"*/}
			{/*					/>*/}
			{/*					<h4 className="text-h4">*/}
			{/*						شهداء الدفاع الكفائي*/}
			{/*					</h4>*/}
			{/*					<p className="text-production">*/}
			{/*						وفاءً لحقهم العظيم .. اشتمل التطبيق على سيرة*/}
			{/*						الشهداء مع التذكير بيوم شهادتهم حسب التقويم*/}
			{/*						الهجري*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*				/!* Feature 3 *!/*/}
			{/*				<div className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">*/}
			{/*					<image*/}
			{/*						href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4A…9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"*/}
			{/*						width="100"*/}
			{/*						height="100"*/}
			{/*					/>*/}
			{/*					<h4 className="text-h4">المناسبات الإسلامية</h4>*/}
			{/*					<p className="text-production">*/}
			{/*						نظراً لأهمية التذكير بالمناسبات الإسلامية*/}
			{/*						طيلة السنة تزين التطبيق بهذه الخدمة*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*				/!* Feature 4 *!/*/}
			{/*				<div className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">*/}
			{/*					<image*/}
			{/*						href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4A…9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"*/}
			{/*						width="100"*/}
			{/*						height="100"*/}
			{/*					/>*/}
			{/*					<h4 className="text-h4">*/}
			{/*						&nbsp;الوضع الليلي والوضع النهاري*/}
			{/*					</h4>*/}
			{/*					<p className="text-production">*/}
			{/*						يقدم تطبيق أنوار سجادية خيارات الوضع الليلي*/}
			{/*						والوضع النهاري لتخصيص تجربة الاستخدام، مما*/}
			{/*						يضمن راحة العينين أثناء القراءة في مختلف*/}
			{/*						الأوقات.*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*				/!* Feature 5 *!/*/}
			{/*				<div className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">*/}
			{/*					<image*/}
			{/*						href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4A…9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"*/}
			{/*						width="100"*/}
			{/*						height="100"*/}
			{/*					/>*/}
			{/*					<h4 className="text-h4">المكتبة التخصصية</h4>*/}
			{/*					<p className="text-production">*/}
			{/*						ستضاف قريباً المكتبة التخصصية بالإمام زين*/}
			{/*						العابدين(ع)*/}
			{/*					</p>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</>
	)
}

export default function page() {
	return (
		<>
			<MainSection />
			<InformationSection />
			<ImamzainSection />
			<MessageRights />
			<MasnadSection />
			<ShrinesVisitationSection />
			 <FeaturesSection />
		</>
	)
}
