"use client"
import Link from "next/link"
import {publications} from "@/lib/data"
import HeaderSections from "@/components/header-sections";
import Image from "next/image";
import landing from "../../../../public/images/albaqi.jpg";

import {motion} from "framer-motion";
export default function Publications() {
    return (
        <>
            <div className="container w-full flex flex-col items-center !my-8">
                <div className=" flex w-full items-center justify-between my-8">
                    <HeaderSections
                        title={'الأصدارات'}
                        moreButton={{
                            label: 'ارشيف الأصدارات',
                            href: '/publications',
                        }}
                    />
                </div>


                <div
                    className="
                            w-full
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5
                            gap-4
                            gap-y-6
                            items-start
                            my-8
                             "
                >
                    {publications.map((book, index) => (
                        <div key={index} className='flex  flex-col   justify-between rounded-2xl h-full'
                        style={{
                            background: 'linear-gradient(0deg, rgba(229,229,229,1) 0%, rgba(229,229,229,1) 0%, rgba(229,229,229,0) 50%)',
                            // background: 'linear-gradient(0deg, rgba(0,94,78,0.927608543417367) 0%, rgba(160,189,184,0) 64%, rgba(229,229,229,0) 100%)'
                        }}
                        >
                            <div
                                className="relative flex justify-center items-center w-44 h-60  mx-auto    ">
                                <motion.div
                                    variants={{
                                        hidden: {
                                            opacity: 0, x: 20
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 1,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{once: true, amount: 0.3}}
                                    className="absolute right-0 -bottom-0 w-32 h-32 ">
                                    <Image
                                        src={'/shapes/book_icon.svg'}
                                        alt="Some image"
                                        fill
                                        className=" absolute object-contain "
                                    />
                                </motion.div>
                                <motion.div
                                    variants={{
                                        hidden: {
                                            opacity: 0, x: -20
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 1,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{once: true, amount: 0.3}}
                                    className="absolute -left-0 top-10 w-[7.5rem] h-[11.5rem]  ">
                                    <Image
                                        src={book.image}
                                        alt="Some image"
                                        fill
                                        className=" absolute object-center   "
                                    />
                                </motion.div>
                                <motion.div
                                    variants={{
                                        hidden: {
                                            opacity: 0, x: -20
                                        },
                                        visible: {
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 1,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{once: true, amount: 0.3}}
                                    className="absolute top-2 left-11 w-[7.5rem] h-[11.5rem] ">
                                    <Image
                                        src={book.image}
                                        alt="Some image"
                                        fill
                                        className=" absolute object-center   "
                                    />
                                </motion.div>
                            </div>
                            <div className="w-full flex flex-col gap-4 justify-between h-[5rem] rounded-2xl py-3 px-3   items-center   ">
                                <h1 className="text-sm text-center w-full font-semibold truncate">
                                    {book.title}
                                </h1>
                                <div className="flex justify-between w-full text-[10px] sm:text-base lg:text-xs font-light tracking-wide text-gray-700">
                                    <span>{book.pages} صفحة</span>
                                    <span>{book.views} مشاهدة</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
