"use client";
import { Suspense } from "react";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle } from "@/components/brand";
import ImageView from "@/components/image-view";
import Image from "next/image";
import { Gallery } from "@/types/gallery";
import { Loader2 } from "lucide-react";
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const lightboxControl =
  "grid size-12 shrink-0 place-items-center rounded-full border-2 border-white/25 bg-white/10 text-white transition hover:border-secondary hover:bg-secondary";

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

function GalleryClient({ initialImages }: { initialImages: Gallery[] }) {
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

  // The page ships only the first 30 images (sorted newest-first) as
  // initialImages so first paint has content instantly. Search/sort/filter
  // need the full 819-item corpus, which is fetched here in the background
  // from the static /api/gallery-index route and swapped in once it lands.
  const [allImages, setAllImages] = useState<Gallery[]>(initialImages);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/gallery-index")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: Gallery[]) => {
        if (cancelled) return;
        setAllImages(data);
        setIsFullyLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Until the full corpus has loaded, allImages only holds the initial 30
  // images, so search/category filtering against it would silently miss
  // the other ~789. Block those interactions (rather than the sort control,
  // which is harmless to apply early and simply re-applies once the full
  // array swaps in) while the background fetch is in flight.
  const corpusReady = isFullyLoaded || loadError;

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
    <div className="min-h-screen overflow-hidden text-white">
      <div className="container pb-8">
        <Breadcrumbs
          className="text-white"
          dotColor="bg-secondary"
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الوسائط المتعددة", url: "#" },
            { name: "معرض الصور", url: "/media/images" },
          ]}
        />

        {/* Header */}
        <header className="mb-12">
          <SectionTitle
            light
            as="h1"
            title="معرض الصور"
            text="استكشف عالمنا البصري حيث لكل صورة قصتها وحجمها الفريد"
            className="mb-0"
          />
        </header>

        {/* Control bar */}
        <div className="mb-12 rounded-[28px] border border-white/15 bg-white/[0.04] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative w-full flex-1">
              {corpusReady ? (
                <FiSearch
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary"
                  size={20}
                />
              ) : (
                <Loader2
                  className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-secondary"
                />
              )}
              <input
                type="text"
                placeholder={
                  corpusReady
                    ? "ابحث في الصور..."
                    : "جاري تحميل جميع الصور للبحث..."
                }
                disabled={!corpusReady}
                className="w-full rounded-xl border-2 border-white/20 bg-white/5 py-3 pl-5 pr-12 text-lg text-white transition-colors placeholder:text-white/50 focus:border-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-expanded={isFilterOpen}
                className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 font-semibold transition-colors ${
                  isFilterOpen
                    ? "border-secondary bg-secondary/15 text-white"
                    : "border-white/20 text-white hover:border-white/60"
                }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FiFilter />
                <span>الفلاتر</span>
                {isFilterOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              <select
                aria-label="ترتيب الصور"
                className="rounded-xl border-2 border-white/20 bg-[#101c1a] px-4 py-3 dark:bg-[#171314] text-lg text-white transition-colors focus:border-secondary focus:outline-none"
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
            <div className="mt-6 border-t border-white/10 pt-6 animate-slide-down">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-secondary">
                التصنيفات
                {!corpusReady && (
                  <Loader2 className="h-4 w-4 animate-spin text-white/60" />
                )}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  // Category filtering needs the full corpus to be correct
                  // (a category may have no matches among the first 30
                  // images). "All" needs no filtering, so it stays enabled.
                  const disabled =
                    !corpusReady && category !== "جميع الصور";

                  return (
                    <button
                      key={category}
                      type="button"
                      disabled={disabled}
                      aria-pressed={activeCategory === category}
                      className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${
                        activeCategory === category
                          ? "border-secondary bg-secondary/15 text-white"
                          : "border-white/20 text-white/80 hover:border-white/60 hover:text-white"
                      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          {/* Gallery */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {activeCategory}
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  مناسبات • مسابقات • أخبار
                </p>
              </div>
              <div className="text-white/60">
                عرض{" "}
                <span className="font-bold text-secondary">
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
                                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black/30 transition-all duration-500 hover:-translate-y-1 hover:border-secondary hover:shadow-2xl"
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
                                      <span className="font-semibold text-secondary">
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 pb-6 pt-28 backdrop-blur-md animate-fade-in"
            onClick={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            <div className="flex h-full max-h-[52rem] w-full max-w-7xl flex-col gap-4">
              {/* Top bar */}
              <div className="flex items-center justify-end text-white">
                <button
                  type="button"
                  aria-label="إغلاق"
                  className={lightboxControl}
                  onClick={closeLightbox}
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[1fr_24rem]">
                {/* Photo, with the arrows beside it and the carousel beneath */}
                <div className="flex min-h-0 min-w-0 flex-col gap-4">
                  <div className="flex min-h-0 flex-1 items-center gap-3 md:gap-4">
                    <button
                      type="button"
                      aria-label="الصورة السابقة"
                      className={`${lightboxControl} max-md:hidden`}
                      onClick={() => navigateImage("prev")}
                    >
                      <FiChevronRight size={24} />
                    </button>
                    <div className="flex h-full min-w-0 flex-1 items-center justify-center rounded-3xl bg-black/30 p-3">
                      <Image
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        width={1600}
                        height={1067}
                        unoptimized
                        className="max-h-full max-w-full rounded-2xl object-contain"
                        priority
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="الصورة التالية"
                      className={`${lightboxControl} max-md:hidden`}
                      onClick={() => navigateImage("next")}
                    >
                      <FiChevronLeft size={24} />
                    </button>
                  </div>

                  <div className="hidden h-20 shrink-0 justify-center gap-3 md:flex">
                    {relatedImages.map((img) => (
                      <button
                        type="button"
                        key={img.id}
                        aria-label={img.title}
                        className={`h-full aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                          selectedImage.id === img.id
                            ? "border-secondary"
                            : "border-transparent opacity-50 hover:opacity-90"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <Image
                          src={img.url}
                          alt=""
                          width={120}
                          height={90}
                          unoptimized
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details: the same height as the photo and the carousel */}
                <aside className="hidden min-h-0 flex-col overflow-y-auto rounded-3xl bg-white/[0.07] p-7 text-white lg:flex">
                  <span className="w-fit rounded-full bg-secondary px-4 py-1 text-sm font-bold text-white">
                    {selectedImage.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold leading-snug">{selectedImage.title}</h2>
                  {selectedImage.description && (
                    <p className="mt-4 text-base leading-8 text-white/80">{selectedImage.description}</p>
                  )}

                  <dl className="mt-6 space-y-4 border-t border-white/15 pt-6">
                    {[
                      { label: "التاريخ", value: selectedImage.date, Icon: FiCalendar },
                      { label: "المكان", value: selectedImage.location, Icon: FiMapPin },
                      { label: "المصور", value: selectedImage.photographer, Icon: FiCamera },
                    ]
                      .filter((row) => row.value)
                      .map(({ label, value, Icon }) => (
                        <div key={label} className="flex items-center gap-4">
                          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-secondary">
                            <Icon size={20} />
                          </span>
                          <div className="min-w-0">
                            <dt className="text-sm text-white/60">{label}</dt>
                            <dd className="text-base font-semibold">{value}</dd>
                          </div>
                        </div>
                      ))}
                  </dl>

                  {selectedImage.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/15 pt-6">
                      {selectedImage.tags.map((tag, idx) => (
                        <span key={idx} className="rounded-full bg-white/10 px-3 py-1 text-sm text-secondary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImagesClient({
  initialImages,
}: {
  initialImages: Gallery[];
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-white">
          جاري تحميل معرض الصور...
        </div>
      }
    >
      <GalleryClient initialImages={initialImages} />
    </Suspense>
  );
}