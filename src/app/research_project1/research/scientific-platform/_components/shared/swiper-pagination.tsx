"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwiperPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SwiperPagination({
  currentPage,
  totalPages,
  onPageChange,
}: SwiperPaginationProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const go = (page: number) => {
    onPageChange(page);
    swiperRef.current?.slideToLoop(page - 1);
  };

  const btnBase =
    "flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 transition-colors duration-150 ";

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-10"
      aria-label="التنقل بين الصفحات"
    >
      {/* السابق */}
      <button
        onClick={() => currentPage > 1 && go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="السابق"
        className={`${btnBase} bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={16} />
      </button>

      {/* الأرقام */}
      <div className="w-64">
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView={5}
          spaceBetween={6}
          grabCursor
          loop
          centeredSlides={false}
        >
          {Array.from({ length: totalPages }, (_, i) => {
            const p = i + 1;
            const isActive = currentPage === p;
            return (
              <SwiperSlide key={p} className="flex justify-center">
                <button
                  onClick={() => go(p)}
                  aria-label={`الصفحة ${p}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`${btnBase} ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  }`}
                >
                  {p}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* التالي */}
      <button
        onClick={() => currentPage < totalPages && go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="التالي"
        className={`${btnBase} bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={16} />
      </button>
    </nav>
  );
}
