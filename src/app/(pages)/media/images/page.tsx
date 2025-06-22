"use client";
import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";
import Breadcrumbs from "@/components/breadcrumb";
import SwiperCarousel from "@/components/swiper-carousel";
import SectionCta from "@/components/section-cta";
import ImageView from "@/components/image-view";

import galleryImages from "@/data/gallery.json";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("جميع الصور");

  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const categories = ["جميع الصور", "صور مسابقات", "صور أخبار", "صور مناسبات"];
  const images = galleryImages
    .filter((item) => item.title !== "khat")
    .map((item) => ({
      id: item.id,
      path: item.image.path,
      title: item.title || `Image ${item.id}`,
    }));

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  }, []);
  // التحكم بالسكرول عند فتح / إغلاق اللايت بوكس
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b  text-white ">
      <div className="xl:container mx-auto px-4 ">
        <Breadcrumbs
          className="text-white"
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الوسائط المتعددة", url: "#" },
            { name: "معرض الصور", url: "/media/images" },
          ]}
        />

        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-black bg-clip-text text-transparent">
            معرض الصور
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
            استعرض لحظاتنا المصورة من الفعاليات والمناسبات والمسابقات
          </p>
        </div>
        <div className=" mb-8">
          <SectionCta
            links={categories.map((category) => ({
              label: category,
              href: "#",
              isActive: activeCategory === category,
              onClick: () => setActiveCategory(category),
            }))}
          />
        </div>

        <div className="mb-8">
          <SwiperCarousel images={images} />
        </div>

        <div
          ref={galleryRef}
          className="mr-3 xmd:pr-32 xmd:pl-32 2xl:pr-64 2xl:pl-64 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="aspect-[14/12] overflow-hidden rounded-xl"
            >
              <ImageView
                images={images}
                src={img.path}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0  bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col">
            <div className="flex-1 flex items-center justify-center"></div>
          </div>
        </div>
      )}
    </div>
  );
}
