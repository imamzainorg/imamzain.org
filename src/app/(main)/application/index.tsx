"use client"

import {motion} from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import ImageView from "@/components/image-view";

export default function Application() {
    const imageVariants = {
        hidden: {opacity: 0, x: -20},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 1, ease: "easeOut"},
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

        <div className={"container py-32"}>
            <div
                className="bg-white rounded-2xl flex justify-between items-center p-10 py-14 h-[500px]
                      shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]
                      "
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.3}}
                    className="  flex justify-between  flex-col
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
                    <p className="  text-lg font-semibold
                    sm:text-2xl xl:text-3xl  max-lg:text-center
                            !leading-[30px] lg:!leading-[50px]
                            ">
                        الموسوعة المتكاملة عن الإمام زين العابدين(عليه السلام)
                    </p>
                    <div className="flex justify-start gap-10">
                        <div>
                            <Link
                                href={'https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB'}
                                className="relative w-full h-full"
                                target="_blank"
                            >
                                <ImageView src={'/application/app-store.svg'} className={'w-52 h-28'}/>
                            </Link>
                        </div>

                        <div>
                            <Link
                                href={'https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1'}
                                className="relative w-full h-full"
                                target="_blank"
                            >
                               <ImageView src={'/application/google-play.svg'} className={'w-52 h-28'}/>
                            </Link>
                        </div>
                    </div>
                </motion.div>
                <div className="relative flex justify-center items-center ml-10 w-[20rem] h-[24rem]">
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
        </div>

    )
}