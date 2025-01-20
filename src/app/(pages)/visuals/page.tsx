"use client";

import Image from "next/image";


export default function visuals() {
  const images = [
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
    "/images/albaqi.jpg",
  ];

  return (
    <div className="bg-dark-background bg-[url('/shapes/bg.svg')] bg:h-screen ">
      <div className="container  ">
        <div className=" flex flex-row  ">
        <div className="md:flex w-1/2  h-auto p-12  xl:p-14  mt-28 sm:mt-32 lg:mt-40 lg:mb-36 xl:mt-48 space-y-10">
            <Image
              src="/images/about-landing.jpg"
              className="   rounded-[50px] bg-black"
              width={800}
              height={500}
              alt="logo"
            />
            <p>askjfasjkldh;fh</p>
          </div>
        

         
        </div>
        <div className="">
          <p className=" text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-5 xl:mb-6">
            مواضيع ذات صلة
          </p>
          <div className="bg-gray-500 bg-opacity-25 rounded-[25px]  p-2 2xl:p-4  mb-48 mr-4 ml-4 space-y-10 max-w-full">
            <div className="flex flex-row justify-center p-0">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`p-4 flex flex-row justify-center ${
                    index >= 3
                      ? "hidden lg:block"
                      : index >= 2
                      ? "hidden md:block"
                      : "md:block"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={300}
                    className="rounded-[15px] md:rounded-[30px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
