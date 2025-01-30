import { DownloadIcon } from "@/assets/icons/reusable";
import { Book } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function OneBook({
  publication,
  downloadable = false,
}: {
  publication: Book;
  downloadable?: boolean;
}) {
  return (
    <div className="flex flex-col ">
      <Link
        href={`/publications/${publication.slug}`}
        key={publication.id}
        className="flex items-center gap-4  xl:w-3/5 w-full py-4 lg:py-8 group"
      >
        <div className="relative w-[100px] h-[100px] xs:w-[150px] xs:h-[200px] duration-300 group-hover:drop-shadow-xl group-hover:scale-105 group-hover:-translate-y-1 flex justify-center items-center bg-[url('/shapes/book-bg.svg')] bg-no-repeat bg-center">
          <Image
            src={publication.image}
            width={100}
            height={100}
            className="object-center bg-black w-3/5"
            alt={publication.image}
          />
          {downloadable && (
            <div className=" absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
              <DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
            </div>
          )}
        </div>
        <div className=" w-2/3 flex flex-col h-5/6 justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
          <h2 className="text-primary text-[0.6rem] xs:text-lg sm:text-xl lg:text-base xl:text-xl 2xl:text-2xl font-bold  absolute -top-10 xs:-top-16 ">
            {publication.title}
          </h2>

          <span className="text-[0.5rem] xs:text-sm sm:text-lg md:text-xl lg:text-sm xl:text-lg 2xl:text-xl font-medium absolute top-0 xs:top-0 sm:top-16 lg:top-14 xl:top-16 2xl:top-20">
            {publication.author}
          </span>
          <span className="text-[8px] xs:text-[0.7rem] sm:text-md md:text-lg lg:text-[10px] xl:text-[14px] 2xl:text-base font-light absolute top-4 xs:top-6 sm:top-24 lg:top-[90px] xl:top-[120px]">
            الناشر: {publication.printHouse}{" "}
          </span>
          <div className="flex justify-between w-11/12 mt-2 text-[0.5rem] xs:text-[10px] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-7 xs:top-10 sm:top-36 md:top-48 xmd:top-56 lg:top-[115px] xl:top-36 2xl:top-44">
            <span className="">{publication.pages} صفحة</span>
            <span>{publication.views} مشاهدة</span>
          </div>
        </div>
      </Link>

     <div>
      <h3 className="text-[0.6rem] text-primary font-bold mt-4 xs:text-sm">
        مواضيع ذات صلة
      </h3>
     <div className=" bg-secondary bg-opacity-10 rounded-xl m-2 ">
        
        <div className="flex m-2 ">
          <div className="ml-4 xs:m-2 xs:ml-4">
            <Image
              src={publication.image}
              width={100}
              height={100}
              className="object-center h-16 w-14 xs:w-16 xs:h-20"
              alt={publication.image}
            />
            {downloadable && (
              <div className="bg-yellow-400 absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
                <DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
              </div>
            )}
          </div>
          <div className=" w-full flex flex-col  justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
            <h2 className="text-primary text-[0.5rem] xs:text-[0.8rem] sm:text-md lg:text-base xl:text-xl 2xl:text-2xl font-bold  absolute top-1 xs:top-2   ">
              {publication.title}
            </h2>

            <span className="text-[0.4rem] xs:text-[0.7rem] sm:text-lg md:text-xl lg:text-sm xl:text-lg 2xl:text-xl font-medium absolute top-7 xs:top-11">
              {publication.author}
            </span>
            <span className="text-[8px] xs:text-[0.6rem] sm:text-md md:text-lg lg:text-[10px] xl:text-[14px] 2xl:text-base font-light absolute top-10 xs:top-16">
              الناشر: {publication.printHouse}{" "}
            </span>
            <div className="flex justify-between w-11/12 mt-2 text-[0.3rem] xs:text-[0.4rem] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-12 xs:top-[70px]">
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
              className="object-center h-16 w-14 xs:w-16 xs:h-20"
              alt={publication.image}
            />
            {downloadable && (
              <div className="bg-yellow-400 absolute -bottom-1 sm:bottom-1 lg:bottom-2 xl:-bottom-1 rounded-full p-2 sm:p-3 lg:p-2">
                <DownloadIcon className="h-auto w-4 sm:w-5 lg:w-5 xl:w-6" />
              </div>
            )}
          </div>
          <div className=" w-full flex flex-col  justify-center gap-0 sm:gap-1 md:gap-5 xmd:gap-7  lg:gap-0  relative">
            <h2 className="text-primary text-[0.5rem] xs:text-[0.8rem] sm:text-md lg:text-base xl:text-xl 2xl:text-2xl font-bold  absolute top-1 xs:top-2   ">
              {publication.title}
            </h2>

            <span className="text-[0.4rem] xs:text-[0.7rem] sm:text-lg md:text-xl lg:text-sm xl:text-lg 2xl:text-xl font-medium absolute top-7 xs:top-11">
              {publication.author}
            </span>
            <span className="text-[8px] xs:text-[0.6rem] sm:text-md md:text-lg lg:text-[10px] xl:text-[14px] 2xl:text-base font-light absolute top-10 xs:top-16">
              الناشر: {publication.printHouse}{" "}
            </span>
            <div className="flex justify-between w-11/12 mt-2 text-[0.3rem] xs:text-[0.4rem] sm:text-xs  lg:text-[10px] 2xl:text-[12px]  font-light tracking-wide text-gray-600 absolute top-12 xs:top-[70px]">
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
