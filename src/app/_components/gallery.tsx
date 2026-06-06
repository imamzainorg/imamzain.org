"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HeaderSections from "@/components/header-sections";
import SwiperCarousel from "@/components/swiper-carousel";
import ImageView from "@/components/image-view";
import galleryImages from "@/data/gallery.json";

const getShowCount = () => {
  if (typeof window === "undefined") return 5;
  const width = window.innerWidth;
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

const categoryMeta: Record<
  string,
  { color: string; hoverColor: string; glow: string; gradient: string; body: string }
> = {
  نشاطات: {
    color: "from-primary/90",
    hoverColor: "from-secondary/20",
    glow: "shadow-primary/30",
    gradient: "from-primary/40 via-primary/20",
    body: "استكشف نشاطاتنا المتنوعة",
  },
  ندوات: {
    color: "from-primary/80",
    hoverColor: "from-secondary/20",
    glow: "shadow-primary/25",
    gradient: "from-primary/35 via-primary/15",
    body: "تابع أحدث الندوات",
  },
  مناسبات: {
    color: "from-primary/85",
    hoverColor: "from-secondary/20",
    glow: "shadow-primary/35",
    gradient: "from-primary/45 via-primary/25",
    body: "شاهد مناسباتنا الخاصة",
  },
  مسابقات: {
    color: "from-primary/95",
    hoverColor: "from-secondary/20",
    glow: "shadow-primary/40",
    gradient: "from-primary/50 via-primary/30",
    body: "انضم إلى مسابقاتنا",
  },
  اخبار: {
    color: "from-primary/75",
    hoverColor: "from-secondary/20",
    glow: "shadow-primary/20",
    gradient: "from-primary/30 via-primary/10",
    body: "آخر الأخبار والتحديثات",
  },
};

export default function GallerySection() {
  const router = useRouter();
  const [showCount, setShowCount] = useState(getShowCount);
  const [isLoading, setIsLoading] = useState(true);

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const sliderImageIds = [373,295,335, 354, 58, 209, 247, 46, 76, 205, 331];

  const categoryImages = [
    { id: 218, category: "نشاطات" },
    { id: 236, category: "ندوات" },
    { id: 195, category: "مناسبات" },
    { id: 309, category: "مسابقات" },
    { id: 265, category: "اخبار" },
  ];

  useEffect(() => {
    const handleResize = () => setShowCount(getShowCount());
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const filteredGallery = galleryImages.filter((item) => item.name !== "khat");

  const sliderImages = filteredGallery
    .filter((image) => sliderImageIds.includes(image.id))
    .map((image) => ({ id: image.id, path: image.url }));

  const displayedImages = categoryImages
    .map((cat) => {
      const image = filteredGallery.find((img) => img.id === cat.id);
      return image ? { ...image, linkedCategory: cat.category } : null;
    })
    .filter((img): img is NonNullable<typeof img> => img !== null)
    .slice(0, showCount);

  const navigateToCategory = (category: string) => {
    router.push(`/media/images?category=${encodeURIComponent(category)}`);
  };



  return (
    <div className="pt-20 relative overflow-hidden ">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute h-full w-full bg-dark-background" />
        <div
          className="absolute w-full h-full "
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(var(--primary-rgb), 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(var(--secondary-rgb), 0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.5) 58%, rgba(229,229,229,0) 100%)",
          }}
        />
      </div>

      <div className="py-10 sm:py-20  space-y-12  container">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderSections
            title="معرض الصور"
            moreButton={{
              label: "المزيد",
              href: "/media/images",
            }}
            dark
          />
        </motion.div>

        {/* السلايدر */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SwiperCarousel images={sliderImages} />
        </motion.div>

        {/* شبكة الصور */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-gray-900/40 via-gray-800/20 to-transparent backdrop-blur-xl border border-gray-700/30 shadow-2xl"
        >
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-60">
              <div className="relative">
                <span className="animate-spin rounded-full border-4 border-gray-600 border-t-primary w-16 h-16 mb-6"></span>
                <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30 w-16 h-16"></span>
              </div>
              <p className="text-gray-300 font-semibold text-lg">
                جاري تحميل الصور...
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {displayedImages.map((gallery) => {
                const meta = categoryMeta[gallery.linkedCategory];
                const isHovered = hoveredId === gallery.id;

                return (
                  <motion.div
                    key={gallery.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { type: "spring", stiffness: 100 }
                      },
                    }}
                    onHoverStart={() => setHoveredId(gallery.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="group relative"
                  >
                    <motion.div
                      className="relative h-32  md:h-72 w-full overflow-hidden rounded-3xl"
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* زر عرض الصورة */}
               

                      {/* البطاقة الرئيسية */}
                      <button
                        onClick={() => navigateToCategory(gallery.linkedCategory)}
                        className={`relative h-full w-full overflow-hidden rounded-3xl
                                   bg-gradient-to-br from-gray-900/50 to-gray-800/30
                                   transition-all duration-700 ease-out
                                   hover:shadow-2xl hover:shadow-primary/20 ${meta.glow}`}
                      >
                        {/* الصورة */}
                        <ImageView
                          src={gallery.url}
                          alt={gallery.name}
                          className="h-full w-full object-cover rounded-3xl
                                   transition-all duration-700 ease-out
                                   group-hover:scale-125 group-hover:rotate-2"
                        />

                        {/* طبقة تغطية متدرجة */}
                        <div
                          className={`absolute inset-0 hidden  bg-gradient-to-t ${meta.color}
                                   via-black/60 to-transparent opacity-50
                                   group-hover:opacity-90 transition-opacity duration-700`}
                        />

                        {/* تأثير الإضاءة */}
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          animate={isHovered ? {
                            background: [
                              `radial-gradient(circle at 30% 30%, ${meta.hoverColor} 0%, transparent 60%)`,
                              `radial-gradient(circle at 70% 70%, ${meta.hoverColor} 0%, transparent 60%)`,
                              `radial-gradient(circle at 30% 70%, ${meta.hoverColor} 0%, transparent 60%)`,
                            ]
                          } : {}}
                          transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* حدود متوهجة */}
                        <div
                          className="absolute inset-0 rounded-3xl border-2 border-transparent 
                                   group-hover:border-primary/50 transition-all duration-700
                                   group-hover:shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.3)]"
                        />

                        {/* محتوى النص */}
                        <motion.div
                          className="absolute inset-x-0 bottom-0 p-6"
                          initial={{ y: 100 }}
                          animate={isHovered ? { y: 0 } : { y: 100 }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                          <div className={`md:bg-gradient-to-t ${meta.gradient} md:to-transparent md:rounded-2xl md:p-5 md:backdrop-blur-sm`}>
                            {/* خط زخرفي */}
                            <motion.span
                              className="block h-1 w-12 mb-3 rounded-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={isHovered ? { width: 48 } : { width: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                            
                            {/* العنوان */}
                            <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
                              {gallery.linkedCategory}
                            </h3>
                            
                            {/* الوصف */}
                            <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                              {meta.body}
                            </p>

                            {/* أيقونة السهم */}
                            <motion.div
                              className="mt-3 flex items-center gap-2 text-secondary-100 text-sm font-semibold"
                              initial={{ x: -10, opacity: 0 }}
                              animate={isHovered ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <span>استكشف المزيد</span>
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* أيقونة التكبير */}
                     
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}