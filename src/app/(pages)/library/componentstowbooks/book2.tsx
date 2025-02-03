

"use client"


import { DownloadIcon } from "@/assets/icons/reusable";
import { Book } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function OBook({
  publication,
  downloadable = false,
}: {
  publication: Book;
  downloadable?: boolean;
}) {
  return (
    <div className="flex flex-col ">
     <div>
      <h3 className="text-[0.6rem] text-left text-primary font-bold mt-4 xs:text-sm md:text-xl lg:text-base">
        مواضيع ذات صلة
      </h3>
     <div className=" bg-secondary bg-opacity-10 rounded-xl m-2 ">
        
        <div className="flex m-2 ">
          <div className="ml-4 xs:m-2 xs:ml-4">
            <Image
              src={publication.image}
              width={100}
              height={100}
              className="object-center h-16 w-14 xs:w-16 xs:h-20 sm:w-28 sm:h-32 md:w-40 md:h-44 lg:w-20 lg:h-24 2xl:w-24 2xl:h-28"
              alt={publication.image}
            />
            {downloadable && (
              <div className="bg-yellow-400 absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
                <DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
              </div>
            )}
          </div>
          <div className=" w-full flex flex-col  justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
            <h2 className="text-primary text-[0.5rem] xs:text-[0.8rem] sm:text-lg md:text-xl lg:text-sm xl:text-md 2xl:text-lg font-bold  absolute top-1 xs:top-2  md:top-3  xmd:top-5 xl:top-4 2xl:top-2">
              {publication.title}
            </h2>

            <span className="text-[0.4rem] xs:text-[0.7rem] sm:text-lg md:text-xl lg:text-sm xl:text-md 2xl:text-lg font-medium absolute top-7 xs:top-11 sm:top-16 md:top-20 lg:top-[60px] xl:top-[49px] 2xl:top-[55px]">
              {publication.author}
            </span>
            <span className="text-[8px] xs:text-[0.6rem] sm:text-[14px] md:text-lg lg:text-[10px] xl:text-[12px] 2xl:text-[15px] font-light absolute top-10 xs:top-16 sm:top-24 md:top-28 lg:top-[70px] 2xl:top-[75px] ">
              الناشر: {publication.printHouse}{" "}
            </span>
            <div className="flex justify-between w-11/12 mt-2 text-[0.3rem] xs:text-[0.4rem] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-12 xs:top-[70px] sm:top-28 md:top-36 lg:top-[80px] 2xl:top-[95px]">
              <span className="">{publication.pages} صفحة</span>
              <span>{publication.views} مشاهدة</span>
            </div>
          </div>
        </div>
        <div className="flex m-2 ">
          <div className="ml-4 xs:m-2 xs:ml-4">
            <Image
              src={publication.image}
              width={100}
              height={100}
              className="object-center h-16 w-14 xs:w-16 xs:h-20 sm:w-28 sm:h-32 md:w-40 md:h-44 lg:w-20 lg:h-24 2xl:w-24 2xl:h-28"
              alt={publication.image}
            />
            {downloadable && (
              <div className="bg-yellow-400 absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
                <DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
              </div>
            )}
          </div>
          <div className=" w-full flex flex-col  justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
            <h2 className="text-primary text-[0.5rem] xs:text-[0.8rem] sm:text-lg md:text-xl lg:text-sm xl:text-md 2xl:text-lg font-bold  absolute top-1 xs:top-2  md:top-3  xmd:top-5 xl:top-4 2xl:top-2">
              {publication.title}
            </h2>

            <span className="text-[0.4rem] xs:text-[0.7rem] sm:text-lg md:text-xl lg:text-sm xl:text-md 2xl:text-lg font-medium absolute top-7 xs:top-11 sm:top-16 md:top-20 lg:top-[60px] xl:top-[49px] 2xl:top-[55px]">
              {publication.author}
            </span>
            <span className="text-[8px] xs:text-[0.6rem] sm:text-[14px] md:text-lg lg:text-[10px] xl:text-[12px] 2xl:text-[15px] font-light absolute top-10 xs:top-16 sm:top-24 md:top-28 lg:top-[70px] 2xl:top-[75px] ">
              الناشر: {publication.printHouse}{" "}
            </span>
            <div className="flex justify-between w-11/12 mt-2 text-[0.3rem] xs:text-[0.4rem] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-12 xs:top-[70px] sm:top-28 md:top-36 lg:top-[80px] 2xl:top-[95px]">
              <span className="">{publication.pages} صفحة</span>
              <span>{publication.views} مشاهدة</span>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}
