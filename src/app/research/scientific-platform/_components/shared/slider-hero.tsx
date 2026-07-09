"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: "/images/imam-legacy-bg-bricks.jpg",
    title: "في خدمة نهج الإمام زين العابدين عليه السلام",
    subtitle: "نوثق إرث الإمام السجاد ونحفظ علومه للأجيال القادمة",
  },
  {
    image: "/images/hero-4.jpg",
    title: "علم الإمام زين العابدين عليه السلام نور يضيء الدرب",
    subtitle: "ساهم في نشر معارف سيد الساجدين وأدعيته المباركة",
  },
  {
    image: "/images/imam-legacy-bg-symbol.jpg",
    title: "على خطى الصحيفة السجادية الشريفة",
    subtitle: "بحوثكم تخدم تراث الإمام الرابع من أئمة أهل البيت عليهم السلام",
  },
];

export default function ResearchSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [currentIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setPrevIndex(currentIndex);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      className="relative w-full h-[30rem] lg:h-[35rem] mb-32"
      aria-label="عرض شرائح بوابة البحث العلمي"
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 dark:bg-Muharram_primary/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 dark:bg-Muharram_primary/30 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col md:flex-row h-full gap-6 md:gap-8 relative z-10">
        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center md:justify-start px-4 md:px-8 text-center md:text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentIndex].title}
              initial={{
                opacity: 0,
                x: 100,
                filter: "blur(10px)",
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full md:w-11/12 lg:w-4/5"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-title lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-[#BA9560] dark:from-Muharram_secondary dark:via-Muharram_primary dark:to-Muharram_secondary mb-4 leading-snug lg:leading-tight drop-shadow-sm">
                  {slides[currentIndex].title}
                </h2>
                {slides[currentIndex].subtitle && (
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    {slides[currentIndex].subtitle}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left Side: Image with enhanced styling */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full rounded-3xl overflow-hidden mt-4 md:mt-0 shadow-2xl group">
          {/* Border glow effect */}
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-[#BA9560]/20 dark:from-Muharram_secondary/10 dark:to-Muharram_secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Previous image (base layer) */}
          <Image
            src={slides[prevIndex].image}
            alt={`شريحة: ${slides[prevIndex].title}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover absolute inset-0 z-10 rounded-3xl"
            style={{ objectPosition: "center" }}
            priority
            unoptimized
          />

          {/* Current image (animated layer) */}
          <motion.div
            key={slides[currentIndex].image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-20"
          >
            <Image
              src={slides[currentIndex].image}
              alt={`شريحة: ${slides[currentIndex].title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-3xl"
              style={{ objectPosition: "center" }}
              priority
            />
          </motion.div>

          {/* Gradient overlay for better text contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-25 rounded-3xl"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* Enhanced Pagination Dots */}
      <div
        className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-30 flex gap-3"
        role="tablist"
        aria-label="اختيار الشريحة"
      >
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-Muharram_primary focus:ring-offset-2 rounded-full ${
              index === currentIndex ? "w-10 h-3" : "w-3 h-3"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`انتقل إلى الشريحة ${index + 1}: ${slide.title}`}
          >
            <div
              className={`w-full h-full rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-primary via-[#BA9560] to-primary dark:from-Muharram_secondary/30 dark:via-Muharram_primary dark:to-Muharram_primary/50 shadow-lg"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
            {index === currentIndex && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 rounded-full border-2 border-primary/30 dark:border-[#BA9560]/50"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
