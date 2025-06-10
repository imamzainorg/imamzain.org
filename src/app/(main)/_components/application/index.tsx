"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Application() {
	const containerVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
		},
	}

	const phoneVariants = {
		hidden: { opacity: 0, y: 50, rotate: -5 },
		visible: (custom: number) => ({
			opacity: 1,
			y: 0,
			rotate: custom === 0 ? -8 : 5,
			transition: {
				duration: 0.8,
				ease: "easeOut",
				delay: custom * 0.2 + 0.4,
			},
		}),
	}

	const buttonVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (custom: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				delay: custom * 0.1 + 0.6,
			},
		}),
		hover: {
			scale: 1.05,
			y: -2,
			transition: { duration: 0.2 },
		},
		tap: { scale: 0.95 },
	}

	return (
		<div className="container pt-20 px-4">
			<div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-10 p-8 py-24 lg:p-16 lg:py-20 shadow-2xl border border-gray-100/50 backdrop-blur-sm">
				{/* Background Elements */}
				<div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-100/30 to-pink-100/30 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="relative z-10 w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 xl:gap-16 max-lg:text-center"
				>
					<Link href={"/application"} className="group">
						<motion.h1
							className="text-4xl xl:text-6xl font-bold text-center lg:text-start bg-gradient-to-r from-primary/35 via-secondary/50 to-primary/80 bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform duration-300"
							whileHover={{ scale: 1.02 }}
						>
							تطبيق أنوار سجادية
						</motion.h1>
					</Link>

					<motion.p
						className="text-xl sm:text-2xl xl:text-3xl font-semibold max-lg:text-center leading-relaxed text-gray-700"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					>
						الموسوعة المتكاملة عن الإمام زين العابدين(عليه السلام)
					</motion.p>

					<motion.p
						className="text-lg text-gray-600 max-lg:text-center leading-relaxed"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.6 }}
					>
						اكتشف عالم الإمام زين العابدين من خلال تطبيق شامل يحتوي
						على الأدعية، الزيارات، والنصوص المقدسة
					</motion.p>

					<div className="flex justify-center lg:justify-start gap-6 lg:gap-8">
						<motion.div
							custom={0}
							variants={buttonVariants}
							initial="hidden"
							animate="visible"
							whileHover="hover"
							whileTap="tap"
						>
							<Link
								href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
								target="_blank"
								className="block group"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
									<Image
										src={"/application/app-store.svg"}
										alt="Download on App Store"
										width={500}
										height={500}
										className="relative object-center w-36 h-20 lg:w-48 lg:h-28 filter drop-shadow-lg"
									/>
								</div>
							</Link>
						</motion.div>

						<motion.div
							custom={1}
							variants={buttonVariants}
							initial="hidden"
							animate="visible"
							whileHover="hover"
							whileTap="tap"
						>
							<Link
								href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1"
								target="_blank"
								className="block group"
							>
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
									<Image
										src={"/application/google-play.svg"}
										alt="Get it on Google Play"
										width={500}
										height={500}
										className="relative object-center w-36 h-20 lg:w-48 lg:h-28 filter drop-shadow-lg"
									/>
								</div>
							</Link>
						</motion.div>
					</div>
				</motion.div>

				<Link href={"/application"} className="relative group">
					<motion.div
						className="relative flex justify-center items-center w-[24rem] h-[28rem] perspective-1000"
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						{/* Background glow effect */}
						<div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/80 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

						<motion.div
							custom={0}
							variants={phoneVariants}
							initial="hidden"
							animate="visible"
							className="absolute bottom-0 left-4 w-[10rem] h-[22rem] z-10"
							whileHover={{
								rotate: -12,
								y: -10,
								transition: { duration: 0.3 },
							}}
						>
							<div className="relative w-full h-full">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
								<Image
									src={"/application/01.png"}
									alt="App Screenshot 1"
									fill
									className="object-center rounded-3xl shadow-2xl border-4 border-white/50"
								/>
							</div>
						</motion.div>

						<motion.div
							custom={1}
							variants={phoneVariants}
							initial="hidden"
							animate="visible"
							className="absolute bottom-0 right-4 w-[14rem] h-[26rem] z-20"
							whileHover={{
								rotate: 8,
								y: -15,
								transition: { duration: 0.3 },
							}}
						>
							<div className="relative w-full h-full">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
								<Image
									src={"/application/02.png"}
									alt="App Screenshot 2"
									fill
									className="object-center rounded-3xl shadow-2xl border-4 border-white/50"
								/>
							</div>
						</motion.div>

						{/* Floating elements */}
						<motion.div
							className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
							animate={{
								y: [0, -10, 0],
								scale: [1, 1.2, 1],
								opacity: [0.6, 1, 0.6],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute bottom-20 left-6 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-50"
							animate={{
								y: [0, 8, 0],
								scale: [1, 1.3, 1],
								opacity: [0.5, 0.8, 0.5],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1.5,
							}}
						/>
					</motion.div>
				</Link>
			</div>
		</div>
	)
}
