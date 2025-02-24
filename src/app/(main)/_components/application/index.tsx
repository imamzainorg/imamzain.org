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
    };

    const containerVariants = {
        hidden: {opacity: 0, x: 100},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 1, ease: "easeOut"},
        },
    };

    return (
        <div className="container py-10 lg:py-20">
            <div
                className="bg-white rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-10 p-6 py-20 lg:p-10 lg:py-14
               shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]
                ">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-8 xl:gap-14 max-lg:text-center"
                >
                    <Link href={"/application"}>
                        <p className="text-4xl xl:text-5xl font-bold text-center lg:text-start text-primary leading-tight lg:leading-normal">
                            تطبيق أنوار سجادية
                        </p>
                    </Link>

                    <p className="text-lg sm:text-xl xl:text-2xl font-semibold max-lg:text-center leading-tight lg:leading-normal">
                        الموسوعة المتكاملة عن الإمام زين العابدين(عليه السلام)
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
                <Link href={"/application"} className="relative flex justify-center items-center ml-10 w-[20rem] h-[24rem]">
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
                </Link>
            </div>
        </div>
    );
}
