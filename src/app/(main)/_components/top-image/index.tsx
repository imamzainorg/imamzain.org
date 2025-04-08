"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
    "/images/albaqi.jpg",
    "/images/albaqi_2.jpg"
]; // You can add more images if needed.

import hadiths from "@/data/hadiths.json"; // Hadiths are stored in a JSON file

export default function TopImage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);

  // Change image every 10 seconds.
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [currentImageIndex]);

  // Get the current day of the month (1-31)
  const today = new Date();
  const dayOfMonth = today.getDate(); // e.g., 1 for the 1st, 15 for the 15th, etc.
  // Calculate the hadith index based on the day.
  const currentHadithIndex = (dayOfMonth - 1) % hadiths.length;

  return (
    <div
      className="relative w-full h-[96vh] max-lg:h-[91vh] bg-[#006654] overflow-hidden"
      style={{
        WebkitMaskImage: `url('/images/landing-mask.svg')`,
        maskImage: `url('/images/landing-mask.svg')`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100%",
        maskSize: "100%",
        WebkitMaskPosition: "bottom",
        maskPosition: "bottom",
      }}
    >
      <div
        className="relative w-full h-[95vh] max-lg:h-[90vh] bg-[#006654] overflow-hidden"
        style={{
          WebkitMaskImage: `url('/images/landing-mask.svg')`,
          maskImage: `url('/images/landing-mask.svg')`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100%",
          maskSize: "100%",
          WebkitMaskPosition: "bottom",
          maskPosition: "bottom",
        }}
      >
        <div
          className="absolute top-0 right-0 w-full h-full bg-amber-500 z-20"
          style={{
            background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 55%, rgba(255,255,255,0) 100%)`,
          }}
        />
        <div className="absolute flex flex-col justify-center gap-4 items-center bottom-0 right-0 w-full h-1/2 z-30">
          <motion.div
            key={hadiths[currentHadithIndex].content} // Trigger animation when hadith changes.
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="text-3xl  md:w-1/2  text-white text-center py-10 pt-32 px-12 md:px-0"
          >
            <h1 className="font-bold text-xl lg:text-2xl text-white pb-5">
              {hadiths[currentHadithIndex].author}
            </h1>
            <p className="text-xl lg:text-2xl 2xl:text-3xl text-white text-center   ">
              {hadiths[currentHadithIndex].content}
            </p>
          </motion.div>
        </div>

        {/* Image Transition with Overlapping Fade */}
        <div className="absolute inset-0 w-full h-full">
          {/* Previous Image */}
          <Image
            src={images[prevImageIndex]}
            alt="Previous landing image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover absolute inset-0"
            style={{ objectPosition: "top" }}
          />

          {/* Fading in New Image */}
          <motion.div
            key={images[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images[currentImageIndex]}
              alt="Landing image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
              style={{ objectPosition: "top" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
