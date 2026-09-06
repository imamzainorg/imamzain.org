"use client";
import { Suspense } from "react";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import ImageView from "@/components/image-view";
import Image from "next/image";
import { Gallery } from "@/types/gallery";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiSearch,
  FiCalendar,
  FiTag,
  FiMapPin,
  FiCamera,
  FiInfo,
} from "react-icons/fi";

type ScreenSize = "sm" | "md" | "lg" | "xl";

// ✅ تصحيح 1: ROW_PATTERNS كـ object بمفاتيح صحيحة وليس array
const ROW_PATTERNS: Record<ScreenSize, number[][]> = {
  sm: [
    [1, 1],
    [1, 1],
  ],
  md: [
    [1, 1, 1],
    [2, 1, 1],
  ],
  lg: [
    [2, 1, 1, 1],
    [1, 1, 2, 2],
    [1, 2, 1, 2],
    [2, 1, 2, 2],
    [1, 2, 2, 1],
    [1, 1, 1, 1, 2],
  ],
  // ✅ تصحيح 3: إضافة مفتاح xl
  xl: [
    [2, 1, 1, 1],
    [1, 2, 2, 1],
    [1, 1, 2, 2],
    [2, 2, 1, 1],
    [1, 1, 1, 2, 1],
  ],
};

const ROW_HEIGHT = 280;

function GalleryClient({ images }: { images: Gallery[] }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const INITIAL_COUNT = 30;
  const [visibleImagesCount, setVisibleImagesCount] = useState(INITIAL_COUNT);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "جميع الصور",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(!!categoryFromUrl);
  // ✅ تصحيح: النوع الصحيح ScreenSize
  const [screen, setScreen] = useState<ScreenSize>("lg");

  const categories = [
    "جميع الصور",
    "نشاطات",
    "ندوات",
    "مناسبات",
    "مسابقات",
    "اخبار",
  ];

  const [limit, setLimit] = useState(10);

  // ✅ تصحيح: استخدام screen لاختيار الأنماط الصحيحة
  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth;
      if (w < 640) setScreen("sm");
      else if (w < 1024) setScreen("md");
      else if (w < 1440) setScreen("lg");
      else setScreen("xl");
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width >= 1600) setLimit(8);
      else if (width >= 1400) setLimit(6);
      else if (width >= 1200) setLimit(4);
      else setLimit(2);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const allImages = images;

  // Filter and sort images
  const filteredImages = useMemo(() => {
    let result = allImages;

    if (activeCategory !== "جميع الصور") {
      result = result.filter((img) => img.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((img) => {
        return (
          img.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          img.title.toLowerCase().includes(query) ||
          img.description.toLowerCase().includes(query) ||
          img.location?.toLowerCase().includes(query)
        );
      });
    }

    const sorted = [...result];
    sorted.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (!isNaN(dateA) && !isNaN(dateB)) {
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      }
      return sortBy === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    });

    return sorted;
  }, [allImages, activeCategory, searchQuery, sortBy]);

  const attachmentImages = useMemo(
    () =>
      filteredImages.map((img) => ({
        id: img.id,
        path: img.url,
        name: img.title,
      })),
    [filteredImages],
  );

  const relatedImages = useMemo(() => {
    if (!selectedImage) return [];

    return filteredImages
      .filter(
        (img) =>
          img.id !== selectedImage.id &&
          img.tags?.some((tag) => selectedImage.tags?.includes(tag)),
      )
      .slice(0, limit);
  }, [filteredImages, selectedImage, limit]);

  const openLightbox = useCallback((image: Gallery) => {
    setSelectedImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return;

      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage.id,
      );
      const newIndex =
        direction === "prev"
          ? currentIndex === 0
            ? filteredImages.length - 1
            : currentIndex - 1
          : currentIndex === filteredImages.length - 1
            ? 0
            : currentIndex + 1;

      setSelectedImage(filteredImages[newIndex]);
    },
    [selectedImage, filteredImages],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") navigateImage("next");
      else if (e.key === "ArrowRight") navigateImage("prev");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, navigateImage]);

  const loaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleImagesCount < filteredImages.length
        ) {
          setVisibleImagesCount((prev) =>
            Math.min(prev + 15, filteredImages.length),
          );
        }
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [filteredImages.length, visibleImagesCount]);

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 py-8">
        <Breadcrumbs
          className="text-white mr-8"
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الوسائط المتعددة", url: "#" },
            { name: "معرض الصور", url: "/media/images" },
          ]}
        />

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-title 2xl:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/50 to-primary bg-clip-text text-transparent">
            معرض الصور
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-body leading-relaxed">
            استكشف عالمنا البصري حيث لكل صورة قصتها وحجمها الفريد
          </p>
        </div>

        {/* Control bar */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 mb-10 border w-4/5 mx-auto border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search */}
            <div className="relative w-full md:w-auto flex-1 max-w-lg">
              <FiSearch
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ابحث في الصور..."
                className="w-full bg-gray-900/70 border border-gray-700 rounded-xl py-3 pr-12 pl-5 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                  isFilterOpen ? "bg-gray-900/70" : "bg-primary"
                }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FiFilter />
                <span>الفلاتر</span>
                {isFilterOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              <select
                className="bg-gray-900/70 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
              </select>
            </div>
          </div>

          {/* Filters panel */}
          {isFilterOpen && (
            <div className="mt-6 pt-6 border-t border-gray-700/50 animate-slide-down">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                التصنيفات
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      activeCategory === category
                        ? "bg-primary"
                        : "bg-gray-900/70 hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-4/5 mx-auto">
          {/* Gallery */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
                  {activeCategory}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  مناسبات • مسابقات • أخبار
                </p>
              </div>
              <div className="text-gray-400">
                عرض{" "}
                <span className="text-primary font-bold">
                  {visibleImagesCount} من {filteredImages.length}
                </span>{" "}
                صورة
              </div>
            </div>

            {filteredImages.length === 0 ? (
              <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-700/50">
                <div className="text-6xl mb-4">📷</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">
                  لا توجد صور
                </h3>
                <p className="text-gray-500">
                  لم يتم العثور على صور تطابق معايير البحث
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {(() => {
                    const visible = filteredImages.slice(
                      0,
                      Math.min(visibleImagesCount, filteredImages.length),
                    );
                    const rows: React.ReactNode[] = [];
                    let imgIndex = 0;
                    let patternIndex = 0;

                    // ✅ تصحيح 2: اختيار الأنماط بناءً على حجم الشاشة
                    const currentPatterns =
                      ROW_PATTERNS[screen] ?? ROW_PATTERNS["lg"];

                    while (imgIndex < visible.length) {
                      const pattern =
                        currentPatterns[patternIndex % currentPatterns.length];
                      const totalWeight = pattern.reduce((a, b) => a + b, 0);
                      const rowImgs = visible.slice(
                        imgIndex,
                        imgIndex + pattern.length,
                      );

                      if (rowImgs.length === 0) break;

                      const finalPattern =
                        rowImgs.length < pattern.length
                          ? rowImgs.map(() =>
                              Math.floor(totalWeight / rowImgs.length),
                            )
                          : pattern;

                      rows.push(
                        <div
                          key={imgIndex}
                          className="flex gap-3"
                          style={{ height: `${ROW_HEIGHT}px` }}
                        >
                          {rowImgs.map((img, i) => {
                            return (
                              <div
                                key={img.id}
                                onClick={() => openLightbox(img)}
                                className="group relative overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-950 cursor-pointer transition-all duration-500 hover:border-primary hover:shadow-2xl hover:-translate-y-1"
                                style={{ flex: finalPattern[i] }}
                              >
                                <ImageView
                                  images={attachmentImages}
                                  src={img.url}
                                  alt={img.title}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-lg font-bold mb-1 line-clamp-2">
                                      {img.title}
                                    </h3>
                                    <div className="flex justify-between items-center text-xs text-gray-300">
                                      <span className="line-clamp-1">
                                        {img.description}
                                      </span>
                                      <span className="text-primary font-semibold">
                                        {img.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>,
                      );

                      imgIndex += rowImgs.length;
                      patternIndex++;
                    }

                    return rows;
                  })()}
                </div>

                {visibleImagesCount < filteredImages.length && (
                  <div ref={loaderRef} className="h-10 mt-8" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && selectedImage && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            {/* ✅ تصحيح 4: felx → flex */}
            <div className="w-full lg:w-4/5 flex items-center justify-center h-[64vh]  gap-6">
              {/* Image section */}
              <div>
                <div className="relative flex-1 flex items-center justify-center bg-gray-900/30 rounded-2xl overflow-hidden p-4">
                  {/* Close button */}
                  <button
                    className="absolute top-4 left-4 w-12 h-12 bg-gray-900/80 rounded-full flex items-center justify-center z-50 hover:bg-red-600 transition-all hover:scale-110"
                    onClick={closeLightbox}
                  >
                    <FiX color="#006654" size={24} />
                  </button>

                  {/* Prev button */}
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 rounded-full hidden md:flex items-center justify-center z-50 hover:bg-primary transition-all hover:scale-110"
                    onClick={() => navigateImage("prev")}
                  >
                    <span className="text-2xl">←</span>
                  </button>

                  {/* Next button */}
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 rounded-full hidden md:flex items-center justify-center z-50 hover:bg-primary transition-all hover:scale-110"
                    onClick={() => navigateImage("next")}
                  >
                    <span className="text-2xl">→</span>
                  </button>

                  {/* Main image */}
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    unoptimized
                    className="max-w-full lg:max-h-[50vh] xl:max-h-[55vh] 2xl:max-h-[60vh] object-contain rounded-lg"
                    priority
                  />
                </div>

                <div className="md:flex gap-2 mt-4 lg:mt-0 hidden justify-center">
                  {relatedImages.map((img) => (
                    <div
                      key={img.id}
                      className={`h-40 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImage?.id === img.id
                          ? "border-primary scale-110"
                          : "border-gray-700 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img.url}
                        alt={img.title}
                        width={80}
                        height={80}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details section */}
              <div className="lg:w-4/12 bg-gray-900/80 backdrop-blur-lg hidden lg:block rounded-2xl p-6 overflow-y-auto max-h-[64vh]">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h2>
                <span className="inline-block px-3 py-1 bg-primary rounded-full text-sm mb-6">
                  {selectedImage.category}
                </span>

                <div className="space-y-4">
                  {/* Description */}
                  <div>
                    <h3 className="text-base font-semibold mb-1.5 flex items-center gap-2">
                      <FiInfo size={16} color="#006654" />
                      الوصف
                    </h3>
                    <p className="text-gray-400 bg-gray-900/40 rounded-md p-3 text-sm leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-900/40 rounded-md p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiCalendar size={14} color="#006654" />
                        <span className="text-xs text-gray-400">التاريخ</span>
                      </div>
                      <p className="text-sm font-medium">{selectedImage.date}</p>
                    </div>

                    <div className="bg-gray-900/40 rounded-md p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiMapPin size={14} color="#006654" />
                        <span className="text-xs text-gray-400">المكان</span>
                      </div>
                      <p className="text-sm font-medium">
                        {selectedImage.location}
                      </p>
                    </div>

                    <div className="bg-gray-900/40 rounded-md p-3 col-span-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <FiCamera size={14} color="#006654" />
                        <span className="text-xs text-gray-400">المصور</span>
                      </div>
                      <p className="text-sm font-medium">
                        {selectedImage.photographer}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
                      <FiTag size={16} />
                      الوسوم
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedImage.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gradient-to-r from-primary/40 to-primary rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImagesClient({ images }: { images: Gallery[] }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-white">
          جاري تحميل معرض الصور...
        </div>
      }
    >
      <GalleryClient images={images} />
    </Suspense>
  );
}