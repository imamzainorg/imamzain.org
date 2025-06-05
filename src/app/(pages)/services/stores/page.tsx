"use client";
import Section from "@/components/section";
import Breadcrumbs from "@/components/breadcrumb";
import storeLocations from "@/data/store-locations.json";
import { useState, useEffect } from "react";
import { SellPoint } from "@/types/storeLocations";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import NewsShare from "@/components/news-share";
export default function Page() {
  const [selectedPoint, setSelectedPoint] = useState<SellPoint | null>(null);

  // مزامنة الحالة مع الـ URL عند التحميل الأولي
  useEffect(() => {
    const hash = window.location.hash.replace("#point-", "");
    if (hash) {
      const found = storeLocations
        .flatMap((city) => city.sellpoints)
        .find((s) => String(s.id) === hash);
      if (found) setSelectedPoint(found);
    }
  }, []);

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
    <div className="mx-auto md:container pb-10 scroll-smooth ">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الخدمات", url: "/services" },
          { name: "نقاط البيع المباشر", url: "#" },
        ]}
        className="mr-4 md:mr-0"
      />

      <h1 className="text-4xl font-bold text-gray-900 my-10 text-center">
        نقاط البيع المباشر
      </h1>

      <div className="flex flex-row gap-8 mt-6 ">
        {/* الشريط الجانبي */}
        <aside className="lg:w-1/4 space-y-6 hidden lg:block sticky top-24 self-start">
          <div className="bg-white shadow-md border border-primary/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-md font-bold text-center text-primary">
              نقاط البيع المباشر
            </h2>
            <div className="h-px bg-primary/20"></div>

            <nav className="flex flex-col gap-2 text-sm">
              {storeLocations.map((cityBlock) => (
                <div key={cityBlock.city}>
                  <h3 className="text-xs text-gray-500 font-semibold mb-1 mt-2 px-1">
                    {cityBlock.city}
                  </h3>
                  {cityBlock.sellpoints.map((point) => (
                    <button
                      key={point.id}
                      onClick={() => handlePointClick(point)}
                      className={`w-full text-right p-2 px-3 rounded-lg transition-colors cursor-pointer ${
                        selectedPoint?.id === point.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {point.name}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* المحتوى الرئيسي */}
        <div className="lg:w-3/4   mx-auto space-y-12 px-4">
          {storeLocations.map((storeLocation) => (
            <div
              key={storeLocation.city}
              className=" p-6 w-full   rounded-3xl bg-white 5 shadow-md"
            >
              <Section
                id={`store-${storeLocation.city}`}
                title={storeLocation.city}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-pt-56">
                {storeLocation.sellpoints.map((sellpoint) => (
                  <div
                    key={sellpoint.id}
                    id={`point-${sellpoint.id}`}
                    className={`p-5 border border-primary/30 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-200 group  rounded-3xl flex flex-col gap-4 transition-all duration-300 shadow-md hover:shadow-xl ${
                      selectedPoint?.id === sellpoint.id
                        ? "ring-2 ring-primary/40 bg-primary/5"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col gap-6">
                      {/* النص */}
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                          {sellpoint.name}
                        </h4>
                        <p className="text-sm md:text-md text-gray-700 leading-relaxed">
                          {sellpoint.location}
                          <br />
                          <span className="font-medium text-gray-900 pl-1 ">
                            رقم الهاتف :
                          </span>
                          <span dir="ltr" className="ml-2 text-gray-700">
                            {sellpoint.phone}
                          </span>
                        </p>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4">
                          <Button
                          onClick={() => {
                            navigator.clipboard.writeText(sellpoint.gpsLink);
                            toast("تم نسخ الرابط في الحافظة");
                          }}
                          variant="outline"
                          className="mt-4 inline-flex items-center gap-2 bg-primary border border-primary text-white transition-all font-medium px-2.5 py-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105"
                        >
                          <NewsShare iconSize={20} />
                          مشاركة
                        </Button>

                        <Button
                          asChild
                     
                           className="mt-4 inline-flex items-center gap-2 bg-primary border border-primary text-white transition-all font-medium px-2.5 py-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105"
                        >
                          <Link href={sellpoint.gpsLink}>
                            الذهاب إلى الموقع
                          </Link>
                        </Button>
                      </div>
                      </div>

                      {/* الخريطة */}
                      {sellpoint.gps && (
                        <div className="w-full rounded-xl overflow-hidden">
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
