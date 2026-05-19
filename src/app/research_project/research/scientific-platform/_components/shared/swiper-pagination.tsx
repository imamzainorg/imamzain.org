"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";

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

  const handlePageChange = (page: number) => {
    onPageChange(page);
    swiperRef.current?.slideToLoop(page - 1);
  };

  const btnBase =
    "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white";

  return (
    <nav
      className="w-11/12 mx-auto flex justify-center my-8"
      aria-label="التنقل بين الصفحات"
    >
      <div className="flex items-center gap-2">
        {/* السابق */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            swiperRef.current?.slidePrev();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          aria-label="الصفحة السابقة"
          className={btnBase}
        >
          <ChevronRight size={20} />
        </Button>

        {/* أرقام الصفحات */}
        <div className="w-64">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={5}
            spaceBetween={10}
            grabCursor
            centeredSlides={false}
            loop
          >
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              return (
                <SwiperSlide key={pageNum} className="flex justify-center">
                  <Button
                    variant={isActive ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                    aria-label={`الصفحة ${pageNum}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? "bg-primary dark:bg-Muharram_primary text-white"
                        : btnBase
                    }`}
                  >
                    {pageNum}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* التالي */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            swiperRef.current?.slideNext();
            if (currentPage < totalPages) handlePageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
          aria-label="الصفحة التالية"
          className={btnBase}
        >
          <ChevronLeft size={20} />
        </Button>
      </div>
    </nav>
  );
}
