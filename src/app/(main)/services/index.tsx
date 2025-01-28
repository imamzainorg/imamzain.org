"use client";
import ZiaraForm from "@/components/ziara-form";
import Image from "next/image";
import {motion} from "framer-motion";

export default function Services() {
    // Animation variants for the motion.div
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
            <div className="relative text-white flex flex-col items-center space-y-2">
                <div className="absolute h-full w-full bg-dark-background -z-10 max-lg:hidden"/>

                <div className="container flex flex-col items-center py-12">
                    <div
                        className="relative flex justify-between  items-center
						 flex-col lg:flex-row
						 h-fit lg:h-[450px]
						 gap-12 lg:gap-4

						 "
                    >
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
                            <div className="w-full flex items-center sm:items-center gap-2 md:gap-4
                              pb-8 lg:pb-0
                              max-lg:hidden
                             ">
                                <Image
                                    src={"/shapes/title-icon.svg"}
                                    width={150}
                                    height={150}
                                    alt="title icon"
                                    className="w-3 sm:w-4 xl:w-5"
                                />
                                <h1
                                    className={
                                        "mt-2 text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white text-justify"
                                    }
                                >
                                    الخدمات
                                </h1>
                            </div>
                            <p className="text-2xl sm:text-2xl xl:text-5xl font-bold text-start
                            !leading-[30px] lg:!leading-[70px]
                            max-lg:text-center
                            ">
                                زيارة الامام زين العابدين وأئمة البقيع عليهم السلام
                            </p>
                            <p className="font-light text-lg sm:text-2xl xl:text-3xl    max-lg:text-center
                            !leading-[30px] lg:!leading-[50px]
                            ">
                                سجل اسمك ليتم اداء زيارة الإمام زين العابدين
                                وأئمة البقيع (عليهم السلام) نيابة عنك في ضريحهم
                                المطهر.
                            </p>
                        </motion.div>
                        <motion.div
                            className="  flex md:flex-col items-center justify-center bg-[url('/shapes/ziara-bg.svg')] bg-center bg-no-repeat
                            w-full  lg:w-1/2
                            h-96 lg:h-full
                            "
                            variants={{
                                hidden: {
                                    opacity: 0,
                                },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        duration: 1.5,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.3}}
                        >
                            <ZiaraForm/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
