"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/data";
import Breadcrumbs from "@/components/breadcrumb";
import SwiperCarousel from "./component/swiper-carousel";

export default function Gallery() {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setZoomedIndex(zoomedIndex === index ? null : index);
  };

  return (
    <div className="container space-y-14">
      <Breadcrumbs
        className="text-white"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الوسائط المتعددة", url: "/" },
          { name: "معرض الصور", url: "/gallery" },
        ]}
      />

      <div className="h-15 w-3/4 mx-auto grid-cols-2 md:grid-cols-4 grid flex-row xl:gap-8 gap-0 justify-center items-center">
        {[
          { label: "...", href: "#" },
          { label: "...", href: "#" },
          { label: "...", href: "#" },
          { label: "...", href: "#" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="h-full bg-[url('/shapes/button-bg.svg')] bg-center bg-no-repeat flex justify-center items-center p-2 xs:p-3 sm:p-4 text-white font-bold w-4/3"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <SwiperCarousel images={galleryImages} />

      <div className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-4 gap-5">
        {galleryImages.map((img, index) => (
          <div key={index} className="relative  ">
            <Image
              src={img}
              width={300}
              height={200}
              className={` rounded-xl hover:scale-110 cursor-pointer transition-transform duration-500 ease-in-out ${
                zoomedIndex === index
                  ? "scale-150 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[80vh] h-auto"
                  : "scale-100"
              }`}
              onClick={() => handleImageClick(index)}
              alt={`Image ${index}`}
            />
            {zoomedIndex === index && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-40"
                onClick={() => setZoomedIndex(null)}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
