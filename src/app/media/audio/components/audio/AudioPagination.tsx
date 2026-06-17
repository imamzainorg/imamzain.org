"use client";

import { memo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AudioPagination = memo(function AudioPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  const go = (page: number) => {
    if (page < 1 || page > totalPages) return;

    onPageChange(page);
    swiperRef.current?.slideTo(page - 1);
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="w-11/12 mx-auto flex justify-center my-8"
      aria-label="التنقل بين الصفحات"
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => go(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="الصفحة السابقة"
          className="bg-white text-primary hover:bg-primary hover:text-white"
        >
          <ChevronRight size={20} />
        </Button>

        <div className="w-[240px] overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              swiper.slideTo(Math.max(0, currentPage - 1));
            }}
            slidesPerView={5}
            spaceBetween={8}
            grabCursor
          >
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;

              return (
                <SwiperSlide key={pageNum}>
                  <Button
                    variant={
                      currentPage === pageNum ? "default" : "outline"
                    }
                    onClick={() => go(pageNum)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === pageNum
                        ? "bg-primary text-white"
                        : "bg-white text-primary hover:bg-primary hover:text-white"
                    }`}
                    aria-label={`الصفحة ${pageNum}`}
                    aria-current={
                      currentPage === pageNum ? "page" : undefined
                    }
                  >
                    {pageNum}
                  </Button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => go(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="الصفحة التالية"
          className="bg-white text-primary hover:bg-primary hover:text-white"
        >
          <ChevronLeft size={20} />
        </Button>
      </div>
    </nav>
  );
});

export default AudioPagination;