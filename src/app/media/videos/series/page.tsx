import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle } from "@/components/brand";
import { getSeries } from "@/lib/videos";
import SeriesSections from "../_components/series-sections";

const DESCRIPTION =
  "برامج وسلاسل مؤسسة الإمام زين العابدين عليه السلام المرئية: البرامج وشروح الأدعية والرسائل والمجالس والمناسبات والمؤتمرات والفعاليات.";

export const metadata: Metadata = {
  title: "البرامج والسلاسل المرئية",
  description: DESCRIPTION,
  alternates: { canonical: "/media/videos/series" },
  openGraph: {
    title: "البرامج والسلاسل المرئية | مؤسسة الإمام زين العابدين عليه السلام",
    description: DESCRIPTION,
    url: "/media/videos/series",
    type: "website",
  },
};

export default async function VideoSeriesPage() {
  const series = await getSeries();

  return (
    <div className="container pb-32 pt-6">
      <Breadcrumbs
        className="text-white mb-6"
        dotColor="bg-secondary"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المرئيات", url: "/media/videos" },
          { name: "البرامج والسلاسل", url: "#" },
        ]}
      />

      <SectionTitle
        light
        as="h1"
        title="البرامج والسلاسل"
        text="كل سلسلة هي قائمة تشغيل على قناة المؤسسة في يوتيوب، وحلقاتها بترتيب القائمة"
        className="mb-10"
      />

      {series.length === 0 ? (
        <p className="py-20 text-center text-white">لا توجد سلاسل متاحة حاليًا.</p>
      ) : (
        <SeriesSections series={series} />
      )}
    </div>
  );
}
