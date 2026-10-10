import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import { MoreLink, SectionTitle, outlineButton } from "@/components/brand";
import DarkBand from "@/components/dark-band";
import PageHeader from "@/components/page-header";
import { LatestPosts, PostRow, PostTile } from "@/components/post-cards";
import { dataFetcher } from "@/lib/dataFetcher";
import { Post } from "@/types/post";
import Newsletter from "./_components/newsletter";

export const metadata: Metadata = {
  title: "الأخبار والأنشطة",
  description:
    "تابعوا آخر أخبار وأنشطة مؤسسة الإمام زين العابدين عليه السلام: المجالس الحسينية والفعاليات والنشاطات الثقافية والإصدارات وأخبار العتبة الحسينية المقدسة.",
  keywords: [
    "أخبار مؤسسة الإمام زين العابدين",
    "أنشطة مؤسسة الإمام زين العابدين",
    "المجالس الحسينية",
    "فعاليات ثقافية إسلامية",
    "أخبار العتبة الحسينية المقدسة",
    "مجالس عزاء محرم الحرام",
    "نشاطات دينية كربلاء",
    "العشرة السجادية الأولى",
    "إصدارات الصحيفة السجادية",
  ],
  alternates: { canonical: "/news" },
  openGraph: {
    title: "الأخبار والأنشطة | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
    description:
      "آخر أخبار وأنشطة المؤسسة: المجالس الحسينية والفعاليات والنشاطات الثقافية والإصدارات وأخبار العتبة الحسينية المقدسة، مع إمكانية الاشتراك في النشرة البريدية.",
    url: "/news",
    type: "website",
    images: [
      "https://cdn.imamzain.org/news/annual-majlis-third-day-imam-zain-alabidin-foundation-photo-coverage-15.jpg",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الأخبار والأنشطة | مؤسسة الإمام زين العابدين عليه السلام",
    description:
      "آخر أخبار وأنشطة المؤسسة: المجالس الحسينية والفعاليات والنشاطات الثقافية والإصدارات وأخبار العتبة الحسينية المقدسة.",
    images: [
      "https://cdn.imamzain.org/news/annual-majlis-third-day-imam-zain-alabidin-foundation-photo-coverage-15.jpg",
    ],
  },
};


const intro =
  "تابعوا آخر أخبار وأنشطة مؤسسة الإمام زين العابدين عليه السلام: المجالس الحسينية والفعاليات والنشاطات الثقافية والإصدارات وأخبار العتبة الحسينية المقدسة.";

const archiveLink = (
  <MoreLink href="/news/archives">عرض الأرشيف</MoreLink>
);

export default async function Page() {
  const data = await dataFetcher<Post[]>("posts.json");

  const activities = data.filter((post) => post.category === "نشاطات");
  const events = data.filter((post) => post.category === "فعاليات");
  const majalis = data.filter((post) => post.category === "مجالس");
  const imamHussainPosts = data.filter(
    (post) => post.category === "العتبة الحسينية",
  );

  // Latest from the foundation's own activities first, then the rest.
  const latest = [...activities, ...events, ...imamHussainPosts, ...majalis]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const latestMeetings = majalis.slice(-3).reverse();
  const shrineNews = [...imamHussainPosts].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <div className={shrineNews.length > 0 ? "-mb-24" : "pb-12"}>
      <div className="container">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الأخبار", url: "#" },
          ]}
        />

        <PageHeader
          title="الأخبار والأنشطة"
          text={intro}
          actions={
            <Link href="/news/archives" className={outlineButton}>
              أرشيف الأخبار
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          }
        />

        <section className="pt-20">
          <LatestPosts posts={latest} priority />
        </section>

        {activities.length > 0 && (
          <section className="pt-28">
            <SectionTitle title="الأنشطة" className="mb-10" action={archiveLink} />
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {activities.slice(0, 6).map((post) => (
                <li key={post.id}>
                  <PostTile post={post} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-28">
          <SectionTitle title="فعاليات" className="mb-10" />
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              {events.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </div>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Newsletter />
            </div>
          </div>
        </section>

        {latestMeetings.length > 0 && (
          <section className="pt-28">
            <SectionTitle title="مجالس" className="mb-10" action={archiveLink} />
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {latestMeetings.map((post) => (
                <li key={post.id}>
                  <PostTile post={post} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {shrineNews.length > 0 && (
        <DarkBand className="mt-28">
          <SectionTitle
            light
            title="اخبار العتبة الحسينية المقدسة"
            text="أخبار مختارة من أنشطة المؤسسة الأم والعتبة المقدسة"
            className="mb-10"
          />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {shrineNews.map((post) => (
              <li key={post.id}>
                <PostTile post={post} tone="light" />
              </li>
            ))}
          </ul>
        </DarkBand>
      )}
    </div>
  );
}
