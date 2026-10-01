"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Share2 } from "lucide-react";
import { toast } from "sonner";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle, TitleIcon, outlineButton, solidButton } from "@/components/brand";
import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { SellPoint, StoreLocation } from "@/types/store-locations";

const intro =
  "نقاط البيع المباشر لإصدارات مؤسسة الإمام زين العابدين عليه السلام في النجف الأشرف وكربلاء المقدسة، مع العناوين وأرقام الهواتف ومواقع الخرائط للوصول إليها.";

const smallButton = "!px-4 !py-2 !gap-2 text-base";

export default function StoresClient({
  storeLocations,
}: {
  storeLocations: StoreLocation[];
}) {
  const [selectedPoint, setSelectedPoint] = useState<SellPoint | null>(() => {
    if (typeof window === "undefined") return null;

    const hash = window.location.hash.replace("#point-", "");
    if (!hash) return null;

    const found = storeLocations
      .flatMap((city) => city.sellpoints)
      .find((s) => String(s.id) === hash);

    return found ?? null;
  });

  // ✅ التمرير مع تعويض ارتفاع الـ navbar
  const handlePointClick = (point: SellPoint) => {
    window.history.replaceState(null, "", `#point-${point.id}`);
    setSelectedPoint(point);

    const element = document.getElementById(`point-${point.id}`);
    if (element) {
      const offset = 150; // ✨ عدل الرقم حسب ارتفاع الترويسة (navbar)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container scroll-smooth pb-12">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الخدمات", url: "/services" },
          { name: "نقاط البيع المباشر", url: "#" },
        ]}
      />

      <PageHeader title="نقاط البيع المباشر" text={intro} className="mb-20" />

      <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-14 xl:grid-cols-[19rem_1fr] xl:gap-20">
        {/* الشريط الجانبي */}
        <aside className="hidden lg:block">
          <nav
            aria-label="نقاط البيع"
            className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto pb-6"
          >
            <p className="mb-4 flex items-center gap-2 font-bold text-primary dark:text-Muharram_primary">
              <TitleIcon className="w-3" />
              المدن والنقاط
            </p>
            <div className="border-r-2 border-secondary/25 dark:border-Muharram_secondary/25">
              {storeLocations.map((cityBlock) => (
                <div key={cityBlock.city} className="mb-3">
                  <p className="pr-4 pt-2 text-sm font-bold text-secondary_dark dark:text-Muharram_secondary">
                    {cityBlock.city}
                  </p>
                  {cityBlock.sellpoints.map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => handlePointClick(point)}
                      aria-current={selectedPoint?.id === point.id ? "true" : undefined}
                      className={cn(
                        "-mr-0.5 block w-full border-r-2 py-2 pr-4 text-right leading-7 transition-colors",
                        selectedPoint?.id === point.id
                          ? "border-primary font-bold text-primary dark:border-Muharram_primary dark:text-Muharram_primary"
                          : "border-transparent text-gray-600 hover:border-secondary hover:text-primary dark:hover:border-Muharram_secondary dark:hover:text-Muharram_primary",
                      )}
                    >
                      {point.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* المحتوى الرئيسي */}
        <div className="min-w-0 space-y-24">
          {storeLocations.map((storeLocation) => (
            <section key={storeLocation.city} id={`store-${storeLocation.city}`} className="scroll-mt-32">
              <SectionTitle title={storeLocation.city} className="mb-10" />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {storeLocation.sellpoints.map((sellpoint) => (
                  <div
                    key={sellpoint.id}
                    id={`point-${sellpoint.id}`}
                    className={cn(
                      "flex flex-col gap-6 rounded-[28px] border-2 p-6 transition-colors",
                      selectedPoint?.id === sellpoint.id
                        ? "border-primary bg-primary/5 dark:border-Muharram_primary dark:bg-Muharram_primary/5"
                        : "border-primary/15 hover:border-primary/40 dark:border-Muharram_primary/20",
                    )}
                  >
                    <div>
                      <h3 className="text-xl font-bold leading-8 text-primary dark:text-Muharram_primary">
                        {sellpoint.name}
                      </h3>
                      <p className="mt-3 flex items-start gap-2 text-lg leading-8 text-gray-700">
                        <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-secondary_dark dark:text-Muharram_secondary" />
                        {sellpoint.location}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-lg text-gray-700">
                        <Phone className="h-4 w-4 shrink-0 text-secondary_dark dark:text-Muharram_secondary" />
                        <span dir="ltr">{sellpoint.phone}</span>
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Link href={sellpoint.gpsLink} className={`${solidButton} ${smallButton}`}>
                          الذهاب إلى الموقع
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(sellpoint.gpsLink);
                            toast("تم نسخ الرابط في الحافظة");
                          }}
                          className={`${outlineButton} ${smallButton}`}
                        >
                          <Share2 className="h-4 w-4" />
                          مشاركة
                        </button>
                      </div>
                    </div>

                    {/* الخريطة */}
                    {sellpoint.gps && (
                      <div className="overflow-hidden rounded-2xl">
                        <iframe
                          src={sellpoint.gps}
                          width="100%"
                          height="200"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          title={`خريطة موقع ${sellpoint.name}`}
                        ></iframe>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
