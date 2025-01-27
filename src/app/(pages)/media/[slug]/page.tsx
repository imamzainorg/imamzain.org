"use client";
import { EyeIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import Breadcrumbs from "@/components/breadcrumb";
export default function media() {
  const images = [
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
  ];

  return (
    <div className="space-y-10 container">
      <Breadcrumbs
        className="text-white"
        dotColor="bg-secondary"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المرئيات", url: "#" }
        ]}
      />

      <div className="flex flex-col justify-center items-center w-full px-4 md:flex-row-reverse md:w-full">
        <div className="order-1 w-full  p-4">
          <Image
            src="/images/about-landing.jpg"
            className="rounded-[25px]"
            width={800}
            height={500}
            alt="logo"
          />
        </div>

        <div className="order-2 w-full md:w-1/2 p-4 md:ml-4 lg:ml-10 2xl:p-10 -tracking-tighter ">
          <p className="text-secondary text-lg xs:text-xl xl:text-3xl  sm:text-2xl md:text-lg xmd:text-2xl my-4 xmd:text-justify text-center font-bold">
         شهادة السيدة فاطمة (عليها السلام) المحاضر الشيخ شبر معلة
          </p>
          <p className="text-white  text-sm xs:text-lg md:text-sm !leading-10 md:!leading-4 xmd:!leading-5 lg:!leading-8 xl:!leading-10 2xl:!leading-10 2xl:2xl text-justify xl:text-xl my-4">
            رسالتنا هي إحياء التراث و نشر الوعي حول إمامنا زين العابدين عليه
            السلام، من خلال البحوث والانشطة الثقافية و الترويج للقيم الشيعية. من
            خلال البحوث والانشطة الثقافية و الترويج للقيم الشيعية.
          </p>
          <div className="flex xs:flex-row  flex-col text-[0.7rem] md:text-[0.6rem] lg:text-[0.7rem] opacity-50 ">
            <div className="flex-row flex  ">
            <EyeIcon stroke="white" width={20} strokeWidth={0.5} />
            <p className="text-white mr-2 mt-1 xs:ml-3 md:mt-2  lg:mt-1">3135 مشاهدة</p>

            </div>
            <div className=" flex-row flex ">
            <ClockIcon stroke="white" width={16} strokeWidth={0.5} />
            <p className="text-white mr-2  mt-1 md:mt-2 lg:mt-1 "> 12 ديسمير 2024</p>
         
            </div>
           </div>
        </div>
      </div>

      <div className=" !-mb-7">
        <h3 className="text-white  flex justify-center items-center xs:items-start xs:justify-start text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  ">
          مواضيع ذات صلة
        </h3>
      </div>
      <div className="!mb-8 flex justify-center items-center xs:mr-4 ">
        <div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
          <div className="flex flex-col xs:flex-row justify-center    p-0">
            {images.map((src, index) => (
              <div
                key={index}
                className={`p-4  ${
                  index >= 3
                    ? "hidden lg:block"
                    : index >= 2
                    ? "hidden md:block "
                    : "md:block"
                }`}
              >
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  width={300}
                  height={300}
                  className="rounded-[15px] xs:w-full w-48 md:rounded-[30px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
