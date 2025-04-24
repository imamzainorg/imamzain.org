"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image: "/research/كتب-.jpg",
    title: " ابدأ رحلتك البحثية معنا افكارك تستحق ان تنشر",
    subtitle: "",
  },
  {
    image: "/images/hero-3.jpg",
    title: "انضم الى مجتمع الباحثين نشر المعرفة مسؤولية",
    subtitle: "",
  },
  {
    image: "/images/imam-legacy-bg-symbol.jpg",
    title: "دع افكارك ترى النور ابدأ معنا اليوم",
    subtitle: "",
  },
];

export default function ResearchSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full h-[30rem] mb-32  "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex h-full">
        {/* Right Side: Text with slide-in */}
        <div className="w-1/2 h-full flex items-center justify-start   pl-10 text-right ">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentIndex].title}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-3/4 "
            >
              <h2 className="text-3xl md:text-6xl font-bold text-gray-800 mb-4">
                {slides[currentIndex].title}
              </h2>
              <p className="text-xl md:text-5xl text-gray-600">
                {slides[currentIndex].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Left Side: Image with fade animation */}
        <div className="relative w-1/2 h-full rounded-3xl overflow-hidden">
          <Image
            src={slides[prevIndex].image}
            alt="Previous Slide"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover absolute inset-0 z-10 rounded-2xl"
            style={{ objectPosition: "center" }}
          />
          <motion.div
            key={slides[currentIndex].image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full z-20"
          >
            <Image
              src={slides[currentIndex].image}
              alt="Current Slide"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover rounded-2xl"
              style={{ objectPosition: "center" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPrevIndex(currentIndex);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full shadow-md border-[0.5px]  ${
              index === currentIndex ? "bg-gray-400" : "bg-white"
            }`}
          />
        ))}
      </div>  
    </div>
  );
}
