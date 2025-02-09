"use client"

import {motion} from "framer-motion";

import Image from "next/image";

export default function Application() {
    const imageVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    }
    const containerVariants = {
        hidden: {opacity: 0, x: 100}, // Start off-screen to the right
        visible: {
            opacity: 1,
            x: 0, // Settle in place
            transition: {
                duration: 1, // Duration of the animation
                ease: "easeOut", // Smooth easing
            },
        },
    };

    return (
        <>
            <div className={"container flex justify-between py-20"}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.3}}
                    className="  flex justify-start  flex-col
				                w-[60%]  lg:w-1/2
							    h-fit lg:h-full
							    gap-4 lg:gap-8 xl:gap-14
                              max-lg:text-gray-900

							 ">

                    <p className="text-2xl sm:text-2xl xl:text-5xl font-bold text-start text-primary
                            !leading-[30px] lg:!leading-[70px]
                            max-lg:text-center
                            ">
                        تطبيق أنوار سجادية
                    </p>
                    <p className="font-light text-lg sm:text-2xl xl:text-3xl    max-lg:text-center
                            !leading-[30px] lg:!leading-[50px]
                            ">
                        سجل اسمك ليتم اداء زيارة الإمام زين العابدين
                        وأئمة البقيع (عليهم السلام) نيابة عنك في ضريحهم
                        المطهر.
                    </p>
                </motion.div>
                <div className="relative flex justify-center items-center w-[20rem] h-[24rem] mx-auto  ">
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute bottom-0 left-0 w-[8rem] h-[20rem]"
                    >
                        <Image
                            src={'/application/01.png'}
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
                            src={'/application/02.png'}
                            alt={`/application/02.png`}
                            fill
                            className="object-center"
                        />
                    </motion.div>
                </div>
            </div>
        </>
    )
}