"use client";

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
    <div className="space-y-10">
      <Breadcrumbs
        className="text-white"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الوسائط المتعددة", url: "/" },
          { name: "معرض الصور", url: "/gallery" },
        ]}
      />

      <div className="flex flex-col md:flex-row-reverse md:w-full ">
        <div className="order-1 w-full md:w-1/2 xs:p-4 lg:p-0  items-center justify-center sm:p-10 md:p-2">
          <Image
            src="/images/about-landing.jpg"
            className="rounded-[25px] "
            width={800}
            height={500}
            alt="logo"
          />
        </div>

        <div className="order-2 md:w-1/2 md:p-4 lg:ml-10 2xl:p-10 !tracking-tighter ">
          <p className="   text-secondary text-lg xs:text-xl xl:text-4xl 2xl:text-5xl sm:text-2xl md:text-xl text-center xmd:text-2xl  m-2 sm:mb-2 font-bold ">
            شهادة السيدة فاطمة المحاضر الشيخ شبر معلة
          </p>
          <p className="   text-white text-sm xs:text-lg md:text-lg xmd:text-xl 2xl:text-4xl  xl:text-3xl !tracking-widest text-justify ">
            رسالتنا هي إحياء التراث و نشر الوعي حول إمامنا زين العابدين عليه
            السلام، من خلال البحوث والانشطة الثقافية و الترويج للقيم الشيعية.
          </p>
        </div>
      </div>

      <div className="!mb-8">
        <p className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-5 xl:mb-6">
          مواضيع ذات صلة
        </p>
        <div className="bg-gray-500 bg-opacity-25 rounded-[25px] p-2 2xl:p-4 space-y-10 max-w-full">
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
  );
}
