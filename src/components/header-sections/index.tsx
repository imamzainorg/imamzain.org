
import Image from "next/image"
import Link from "next/link"
import {ChevronRightArrowIcon} from "@/assets/icons/reusable";

interface SectionProps {
    title: string;
    moreButton?: {
        label: string;
        href: string;
    };
}

export default function HeaderSections({title, moreButton,}: SectionProps) {
    return (
        <div className="w-full     flex justify-between items-center">
            <div className="w-full flex items-center sm:items-center gap-2 md:gap-4">
                <Image
                    src={"/shapes/title-icon.svg"}
                    width={150}
                    height={150}
                    alt="title icon"
                    className="w-3 sm:w-4 xl:w-5"
                />
                <h1
                    className={"mt-2 text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-primary"}
                >
                    {title}
                </h1>
            </div>
                <div
                    className="
                text-lg leading-relaxed !tracking-tight text-justify inline
                sm:text-lg md:text-xl xl:text-xl

                ">
                    {moreButton && (
                        <>
                            <Link
                                href={moreButton.href}
                                className="flex font-semibold gap-2 text-white items-center  py-2 px-2 pr-5 max-lg:py-1 rounded-lg bg-primary text-xs sm:text-sm"
                            >
                                <p className="text-nowrap">
                                    {moreButton.label}
                                </p>
                                <ChevronRightArrowIcon
                                    className="rotate-180 p-1.5 sm:p-1"
                                    stroke="#ffffff"
                                    strokeWidth={0.5}
                                    fill="#ffffff"
                                />
                            </Link>
                        </>
                    )}
                </div>

        </div>
    )
}
