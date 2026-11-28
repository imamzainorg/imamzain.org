import type { Metadata } from "next";
import { formatDate } from "@/lib/format";
import { getSeries, getVideos, pickHero } from "@/lib/videos";
import AllVideos from "./_components/all-videos";
import SeriesSections from "./_components/series-sections";
import VideoView from "./_components/video-view";

export const metadata: Metadata = {
  title: "معرض المرئيات والفيديو",
  description:
    "مرئيات مؤسسة الإمام زين العابدين عليه السلام: مجالس العزاء الحسينية وشروح الأدعية السجادية كدعاء مكارم الأخلاق وأبي حمزة الثمالي والملتقيات والبرامج العلمية.",
  keywords: [
    "مرئيات الإمام زين العابدين",
    "مجالس العزاء الحسينية",
    "شرح دعاء مكارم الأخلاق",
    "دعاء أبي حمزة الثمالي",
    "العشرة السجادية بشير الحسناوي",
    "الملتقى التشاوري لخطباء المنبر الحسيني",
    "برنامج ويجازي بالجليل",
    "نفحات من حياة الإمام السجاد",
    "محاضرات مؤسسة الإمام زين العابدين",
  ],
  alternates: { canonical: "/media/videos" },
  openGraph: {
    title: "معرض المرئيات والفيديو | مؤسسة الإمام زين العابدين عليه السلام",
    description:
      "قوائم تشغيل مرئية تضم مجالس العزاء الحسينية وشروح الأدعية السجادية والملتقيات والبرامج العلمية لمؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات.",
    url: "/media/videos",
    type: "website",
    images: ["https://cdn.imamzain.org/media/b4217467-76f6-4a45-85c5-1dd057423640.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "معرض المرئيات والفيديو | مؤسسة الإمام زين العابدين عليه السلام",
    description:
      "قوائم تشغيل مرئية تضم مجالس العزاء الحسينية وشروح الأدعية السجادية والملتقيات والبرامج العلمية لمؤسسة الإمام زين العابدين عليه السلام.",
    images: ["https://cdn.imamzain.org/media/b4217467-76f6-4a45-85c5-1dd057423640.png"],
  },
};

export default async function VideosPage() {
  const [videos, series] = await Promise.all([getVideos(), getSeries()]);
  const hero = pickHero(videos);

  if (!hero) {
    return (
      <div className="container py-20 text-center text-white">
        لا توجد فيديوهات متاحة حاليًا.
      </div>
    );
  }

  return (
    <VideoView video={hero} videos={videos} series={series} isHub>
      <div className="mt-12">
        <h2 className="text-white font-bold text-lg mb-4">كل الفيديوهات</h2>
        <AllVideos
          videos={videos.map(({ slug, title, thumbnail, date }) => ({
            slug,
            title,
            thumbnail,
            dateLabel: formatDate(date),
          }))}
        />
      </div>

      {series.length > 0 && (
        <div className="mt-16">
          <SeriesSections series={series} limit={5} />
        </div>
      )}
    </VideoView>
  );
}
