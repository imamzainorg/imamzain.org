"use client";

import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import HeaderSections from "@/components/header-sections";
import SwiperCarousel from "@/components/swiper-carousel";
import ImageView from "@/components/image-view";
import galleryImages from "@/data/gallery.json";

export default function GallerySection() {
  const [showCount, setShowCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateImagesToShow = () => {
    const width = window.innerWidth;

    if (width >= 1280) setShowCount(5);
    else if (width >= 1024) setShowCount(4);
    else if (width >= 768) setShowCount(3);
    else if (width >= 640) setShowCount(2);
    else setShowCount(2);
  };

  useEffect(() => {
    updateImagesToShow();
    window.addEventListener("resize", updateImagesToShow);

    const timer = setTimeout(() => setIsLoading(false), 800);

    return () => {
      window.removeEventListener("resize", updateImagesToShow);
      clearTimeout(timer);
    };
  }, []);

  const filteredGallery = galleryImages.filter((item) => item.title !== "khat");
  const latestImages = filteredGallery
    .slice(-10)
    .reverse()
    .map((image) => ({ id: image.id, path: image.image.path }));
	const gridClass = showCount === 3 ? "grid-cols-3" : showCount === 4 ? "grid-cols-4": showCount === 5 ? "grid-cols-5" : "grid-cols-2";

  return (
    <div className="pt-20">
      <div className="relative">
        {/* خلفية القسم */}
        <div className="absolute h-full w-full bg-dark-background -z-10" />
        <div
          className="absolute w-full h-full -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.93) 20%, rgba(0,0,0,0.74) 38%, rgba(0,0,0,0.5) 58%, rgba(229,229,229,0) 100%)",
          }}
        />

        <div className="container py-10 sm:py-20 space-y-8">
          {/* عنوان القسم */}
          <HeaderSections
            title="معرض الصور"
            moreButton={{
              label: "المزيد",
              href: "/media/images",
            }}
            dark
            
          />

          {/* سلايدر الصور */}
          <SwiperCarousel images={latestImages} />

          {/* شبكة الصور */}
          <div className="mt-8 p-4 rounded-3xl bg-gray-600/35">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <span className="animate-spin rounded-full border-4 border-gray-300 border-t-secondary   dark:border-t-Muharram_secondary w-12 h-12"></span>
              </div>
            ) : (
              <motion.div
			  className={`grid gap-4 ${gridClass}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {showCount &&
                    [...filteredGallery].reverse().slice(0, showCount).map((gallery) => (
                    <motion.div
                      key={gallery.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <button
                        onClick={() => setSelectedImage(gallery.image.path)}
                        className="relative rounded-2xl overflow-hidden h-40 w-full block"
                      >
                        <ImageView
                          src={gallery.image.path}
                          alt={`Image ${gallery.id}`}
                          className="rounded-2xl shadow-lg w-full h-full"
                        />
                        {/* تأثير Hover على الصورة */}
                        <motion.div
                          initial={{ y: 15, opacity: 0 }}
                          whileHover={{
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.3 },
                          }}
                          className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-end h-full"
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(0,0,0,0.87) 0%, rgba(0,0,0,0.41) 45%, rgba(229,229,229,0) 100%)",
                          }}
                        >
                          <div className="font-semibold text-lg p-4 text-white"></div>
                        </motion.div>
                      </button>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Lightbox عرض الصورة المكبرة */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Selected"
                className="max-w-[90vw] max-h-[90vh] rounded-2xl  shadow-2xl"
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
