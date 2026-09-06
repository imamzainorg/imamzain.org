"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, ListOrdered } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

import type { YouTubeVideo } from "@/types/youtube-data";
import { thumbnailUrl } from "@/lib/youtube";

export default function EpisodesList({
  videos,
  currentSlug,
  onSelect,
}: {
  videos: YouTubeVideo[];
  currentSlug: string;
  onSelect: (slug: string) => void;
}) {
  const swiperRef = useRef<SwiperCore | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [edge, setEdge] = useState({
    start: true,
    end: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ترتيب الفيديوهات
  const sortedVideos = useMemo(() => {
    return [...videos];
  }, [videos]);

  // إيجاد index الحلقة الحالية
  const currentIndex = useMemo(() => {
    return sortedVideos.findIndex((v) => v.slug === currentSlug);
  }, [sortedVideos, currentSlug]);

  // مزامنة حالة الحواف
  const syncEdge = (swiper: SwiperCore) => {
    setEdge({
      start: swiper.isBeginning,
      end: swiper.isEnd,
    });
    setActiveIndex(swiper.activeIndex);
  };

  // التحكم في التحميل
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // اختصارات لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // منع التصفح إذا كان التركيز داخل حقل إدخال
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" && !edge.end) {
        e.preventDefault();
        swiperRef.current?.slideNext();
      } else if (e.key === "ArrowLeft" && !edge.start) {
        e.preventDefault();
        swiperRef.current?.slidePrev();
      } else if (e.key === "Enter" && !edge.end) {
        // تشغيل الحلقة التالية
        const nextIndex = currentIndex + 1;
        if (nextIndex < sortedVideos.length) {
          onSelect(sortedVideos[nextIndex].slug);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [edge, currentIndex, sortedVideos, onSelect]);

  // حفظ آخر حلقة تم مشاهدتها
  useEffect(() => {
    if (currentSlug) {
      try {
        localStorage.setItem("lastWatchedVideo", currentSlug);
      } catch {
        // تجاهل أخطاء localStorage
      }
    }
  }, [currentSlug]);

  // إذا كانت السلسلة تحتوي على حلقة واحدة فقط
  if (videos.length <= 1) return null;

  // عرض Skeleton أثناء التحميل
  if (isLoading) {
    return (
      <section className="mt-10" aria-labelledby="episodes-list-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-800 animate-pulse" />
            <div>
              <div className="h-5 w-48 bg-slate-800 rounded animate-pulse" />
              <div className="mt-1 h-3 w-32 bg-slate-800/50 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-20 bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-slate-800 rounded-t-xl" />
              <div className="h-14 bg-slate-800/50 rounded-b-xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10" aria-labelledby="episodes-list-title">
      {/* ==================== Header ==================== */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary dark:bg-Muharram_secondary/10 dark:text-Muharram_secondary">
              <ListOrdered className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
              <h2
                id="episodes-list-title"
                className="text-base font-bold text-white sm:text-lg"
              >
                الحلقات في هذه السلسلة
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* زر تشغيل التالي */}
          {currentIndex < sortedVideos.length - 1 && (
            <button
              type="button"
              onClick={() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < sortedVideos.length) {
                  onSelect(sortedVideos[nextIndex].slug);
                }
              }}
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-subtitle font-medium text-slate-400 transition-all hover:border-secondary/30 hover:bg-secondary/10 hover:text-secondary sm:flex"
              aria-label="تشغيل الحلقة التالية"
            >
              التالي
            </button>
          )}
        </div>
      </div>

      {/* ==================== Episodes Slider ==================== */}
      <div className="relative" ref={containerRef}>
        {/* زر التالي */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={edge.end}
          aria-label="الحلقات التالية"
          className="
            group absolute right-1 top-1/2 z-20
            flex h-9 w-9 -translate-y-1/2
            items-center justify-center
            rounded-full
            border border-white/10
            bg-slate-950/90
            text-slate-300
            shadow-xl shadow-black/20
            backdrop-blur-md
            transition-all duration-200
            hover:border-white/20
            hover:bg-secondary
            hover:text-white
            disabled:pointer-events-none
            disabled:opacity-0
            sm:right-2
            focus-visible:ring-2
            focus-visible:ring-secondary
            dark:focus-visible:ring-Muharram_secondary
          "
        >
          <ChevronRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>

        <Swiper
          dir="rtl"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncEdge(swiper);
          }}
          onSlideChange={syncEdge}
          onProgress={syncEdge}
          onReachBeginning={syncEdge}
          onReachEnd={syncEdge}
          onFromEdge={syncEdge}
          freeMode={{
            enabled: true,
            sticky: false,
          }}
          grabCursor
          spaceBetween={10}
          watchOverflow
          modules={[FreeMode]}
          className="w-full max-w-full !overflow-hidden !px-1 !py-1"
          breakpoints={{
            0: { slidesPerView: 1.35 },
            480: { slidesPerView: 1.7 },
            640: { slidesPerView: 2.35 },
            768: { slidesPerView: 2.7 },
            1024: { slidesPerView: 3.35 },
            1280: { slidesPerView: 4.35 },
          }}
        >
          {sortedVideos.map((video, index) => {
            const isActive = video.slug === currentSlug;

            return (
              <SwiperSlide key={video.slug}>
                <Link
                  href={`/media/videos/${video.slug}`}
                  onClick={(event) => {
                    if (
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    ) {
                      return;
                    }
                    event.preventDefault();
                    onSelect(video.slug);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  aria-pressed={isActive}
                  aria-label={`الحلقة ${index + 1}: ${video.title}`}
                  className={`
                    group relative block w-full
                    overflow-hidden rounded-xl
                    text-right
                    outline-none
                    transition-all duration-300
                    focus-visible:ring-2
                    focus-visible:ring-secondary
                    dark:focus-visible:ring-Muharram_secondary
                    ${
                      isActive
                        ? "ring-2 ring-secondary dark:ring-Muharram_secondary"
                        : "ring-1 ring-white/[0.07] hover:-translate-y-1 hover:ring-white/15"
                    }
                  `}
                >
                  {/* ==================== Thumbnail ==================== */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <Image
                      src={thumbnailUrl(video.thumbnail)}
                      alt={video.title}
                      fill
                      loading={index < 2 ? "eager" : "lazy"}
                      sizes="
                        (max-width: 480px) 74vw,
                        (max-width: 640px) 55vw,
                        (max-width: 1024px) 38vw,
                        (max-width: 1280px) 29vw,
                        23vw
                      "
                      className={`
                        object-cover
                        transition-transform
                        duration-500
                        ${isActive ? "scale-[1.02]" : "group-hover:scale-105"}
                      `}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTI5M2IiLz48L3N2Zz4="
                    />

                    {/* Overlay */}
                    <div
                      className={`
                        absolute inset-0
                        transition-colors duration-300
                        ${isActive ? "bg-black/25" : "bg-black/5 group-hover:bg-black/25"}
                      `}
                    />

                    {/* رقم الحلقة */}
                    <span
                      className={`
                        absolute right-2 top-2
                        flex h-7 min-w-7
                        items-center justify-center
                        rounded-lg
                        border border-white/10
                        bg-black/65
                        px-2
                        text-[11px]
                        font-bold
                        text-white
                        shadow-lg
                        backdrop-blur-sm
                      `}
                    >
                      {index + 1}
                    </span>

                    {/* حالة الحلقة الحالية */}
                    {isActive && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg dark:bg-Muharram_secondary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        تشاهد الآن
                      </div>
                    )}

                    {/* Play indicator عند hover */}
                    {!isActive && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <Play
                            className="ml-0.5 h-4 w-4 fill-current"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ==================== Title ==================== */}
                  <div
                    className={`
                      min-h-[58px]
                      bg-white/[0.025]
                      px-2.5 py-2.5
                      transition-colors duration-300
                      ${
                        isActive
                          ? "bg-secondary/[0.06] dark:bg-Muharram_secondary/[0.06]"
                          : "group-hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    <p
                      className={`
                        line-clamp-2
                        text-xs
                        font-medium
                        leading-5
                        transition-colors
                        ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}
                      `}
                      title={video.title} // عرض النص كامل عند hover
                    >
                      {video.title}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* زر السابق */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={edge.start}
          aria-label="الحلقات السابقة"
          className="
            group absolute left-1 top-1/2 z-20
            flex h-9 w-9 -translate-y-1/2
            items-center justify-center
            rounded-full
            border border-white/10
            bg-slate-950/90
            text-slate-300
            shadow-xl shadow-black/20
            backdrop-blur-md
            transition-all duration-200
            hover:border-white/20
            hover:bg-secondary
            hover:text-white
            disabled:pointer-events-none
            disabled:opacity-0
            sm:left-2
            focus-visible:ring-2
            focus-visible:ring-secondary
            dark:focus-visible:ring-Muharram_secondary
          "
        >
          <ChevronLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ==================== Pagination Dots ==================== */}
      <div className="mt-4 flex justify-center gap-1.5">
        {sortedVideos.map((video, i) => (
          <button
            key={video.slug}
            onClick={() => {
              // التمرير للحلقة المحددة
              const index = sortedVideos.findIndex(
                (v) => v.slug === video.slug,
              );
              if (index !== -1) {
                swiperRef.current?.slideTo(index);
              }
            }}
            className={`
              h-1.5 rounded-full transition-all duration-300
              ${
                i === activeIndex
                  ? "w-6 bg-secondary dark:bg-Muharram_secondary"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }
            `}
            aria-label={`الذهاب للحلقة ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
