"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination";
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
          className="bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
        >
          <ChevronRight size={20} />
        </Button>

        {/* ✅ عرض ثابت يتسع لـ 5 أزرار */}
        <div style={{ width: "240px", overflow: "hidden" }}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={5}
            spaceBetween={8}
            grabCursor={true}
            centeredSlides={false}
            loop={true}
            style={{ width: "100%" }}
          >
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <SwiperSlide
                  key={pageNum}
                  // ✅ هذا هو الإصلاح — inline style يجبر السلايد يكون أفقي
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <Button
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => go(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                      currentPage === pageNum
                        ? "bg-primary dark:bg-Muharram_primary text-white"
                        : "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                    }`}
                    aria-label={`الصفحة ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
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
          className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
        >
          <ChevronLeft size={20} />
        </Button>
      </div>
    </nav>
  );
}