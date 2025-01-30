"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import landing from "../../../../public/images/albaqi.jpg";

export default function TopImage() {
    return (
        <>
            <div
                className="relative w-full h-[96vh] max-lg:h-[91vh] bg-[#006654] overflow-hidden"
                style={{
                    WebkitMaskImage: `url('/images/landing-mask.svg')`,
                    maskImage: `url('/images/landing-mask.svg')`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100%',
                    maskSize: '100%',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'bottom',
                }}
            >
                <div
                    className="relative w-full h-[95vh] max-lg:h-[90vh] bg-[#006654] overflow-hidden"
                    style={{
                        WebkitMaskImage: `url('/images/landing-mask.svg')`,
                        maskImage: `url('/images/landing-mask.svg')`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskSize: '100%',
                        maskSize: '100%',
                        WebkitMaskPosition: 'bottom',
                        maskPosition: 'bottom',
                    }}
                >
                    <div
                        className="absolute top-0 right-0 w-full h-full bg-amber-500 z-20"
                        style={{
                            background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%, rgba(255,255,255,0) 100%)`,
                        }}
                    />
                    <div
                        className="absolute flex flex-col justify-center gap-4 items-center bottom-0 right-0 w-full h-1/2 z-30">
                        <motion.div
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                delay: 0.5,
                            }}
                            className="text-3xl text-white text-center px-12 md:px-0"
                        >
                            <h1 className="font-bold text-xl lg:text-2xl text-white">
                                عن الإمام زين العابدين (ع):
                            </h1>
                            <p  className="text-xl lg:text-2xl 2xl:text-3xl text-white text-center" >
                                اعلم أنك إن تكن ذنبا في الخير خير لك من أن تكون رأسا في الشر.
                            </p>
                        </motion.div>

                    </div>
                    <Image
                        src={landing}
                        alt="Some image"
                        fill
                        className="object-cover"
                        style={{
                            objectPosition: "top",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
