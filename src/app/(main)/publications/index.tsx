import Link from "next/link"

import {publications} from "@/lib/data"
import HeaderSections from "@/components/header-sections";

import Image from "next/image";
import landing from "../../../../public/images/albaqi.jpg";

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
                            gap-y-9
                            items-start
                            my-8
                             "
                >
                    {publications.map((book, index) => (
                        <div key={index} className="relative flex justify-center items-center w-44 h-64  mx-auto  ">
                            <div className="absolute -right-10 bottom-0 w-52 h-40 ">
                                <Image
                                    src={'/shapes/nav-menu-icon.svg'}
                                    alt="Some image"
                                    fill
                                    className=" absolute object-center w-auto h-4/6 "

                                />
                            </div>
                            <div className="absolute -left-0 top-10 w-32 h-48  ">
                                <Image
                                    src={book.image}
                                    alt="Some image"
                                    fill
                                    className=" absolute object-center w-auto h-4/6 "
                                    style={{
                                        objectPosition: "top",
                                    }}
                                />
                            </div>
                            <div className="absolute -top-0 w-32 h-48  ">
                                <Image
                                    src={book.image}
                                    alt="Some image"
                                    fill
                                    className=" absolute object-center w-auto h-4/6 "
                                    style={{
                                        objectPosition: "top",
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
