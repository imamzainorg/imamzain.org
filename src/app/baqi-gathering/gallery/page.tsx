"use client";
import React, { useEffect, useState } from "react";
import ImageView from "@/components/image-view";
import galleryBapiImages from "@/data/gallery-bapi.json";
import { Attachment } from "@/types/attachments";

export default function Page() {
  const [images, setImages] = useState<Attachment[]>([] );
  useEffect(() => {
    const newArray = galleryBapiImages.map((item) => ({
      id: item.id,
      path: item.image.path,
    }));

    console.log(newArray);
    setImages(newArray);
  }, []);

  return (
    <div className="pt-32 min-h-screen pb-20   bg-white   ">
      <div className="container">
        <div className="   mb-5">
          <h1 className="text-xl font-bold">معرض صور الملتقى</h1>
        </div>

        <div className="    grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-4 gap-4 grid-rows-1 gap-5">
          {galleryBapiImages.map((img, index) => (
            <ImageView
              images={images}
              key={index}
              src={img.image.path}
              alt={`Image ${index}`}
              className="rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 w-full bg-neutral-300  h-36 md:h-40 lg:h-48"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
