import Breadcrumbs from "@/components/breadcrumb";
import { Post } from "@/types/post";
import { dataFetcher } from "@/lib/dataFetcher";
import ArchivesClient from "./_components/archives-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أرشيف الأخبار",
  description:
    "أرشيف أخبار مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات: تصفّح جميع النشاطات والفعاليات والمجالس وأخبار العتبة الحسينية مرتّبة حسب التصنيف.",
  keywords: [
    "أرشيف أخبار مؤسسة الإمام زين العابدين",
    "أرشيف الأخبار",
    "نشاطات مؤسسة الإمام زين العابدين",
    "فعاليات مؤسسة الإمام زين العابدين",
    "مجالس حسينية",
    "أخبار العتبة الحسينية المقدسة",
    "أخبار مؤسسة الإمام زين العابدين",
    "تصنيف أخبار المؤسسة",
  ],
  alternates: { canonical: "/news/archives" },
  openGraph: {
    title: "أرشيف الأخبار | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
    description:
      "تصفّح الأرشيف الكامل لأخبار مؤسسة الإمام زين العابدين عليه السلام: نشاطات وفعاليات ومجالس وأخبار العتبة الحسينية مع إمكانية التصفية حسب التصنيف.",
    url: "/news/archives",
    type: "website",
    images: [
      "https://cdn.imamzain.org/news/annual-majlis-third-day-imam-zain-alabidin-foundation-photo-coverage-15.jpg",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أرشيف الأخبار | مؤسسة الإمام زين العابدين عليه السلام",
    description:
      "تصفّح الأرشيف الكامل لأخبار المؤسسة: نشاطات وفعاليات ومجالس وأخبار العتبة الحسينية مع إمكانية التصفية حسب التصنيف.",
    images: [
      "https://cdn.imamzain.org/news/annual-majlis-third-day-imam-zain-alabidin-foundation-photo-coverage-15.jpg",
    ],
  },
};

export default async function Page() {
  const posts = await dataFetcher<Post[]>("posts.json");

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الأخبار", url: "/news" },
          { name: "ارشيف الأخبار", url: "/news/archives" },
        ]}
      />
      <ArchivesClient posts={posts} />
    </div>
  );
}
