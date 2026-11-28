import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getSeries, getVideos, summarize } from "@/lib/videos";
import VideoCard from "../_components/video-card";
import VideoView from "../_components/video-view";

// Every slug the API serves has a page, and the 108 slugs of the old youtube.json are among them. A
// slug that is not here (the 14 unlisted Abu Hamza episodes, two duplicate entries) is redirected in
// public/_redirects.
export const dynamicParams = false;

// عدد الفيديوهات بقسم "أحدث الفيديوهات" أسفل الصفحة
const LATEST_COUNT = 12;

export async function generateStaticParams() {
  return (await getVideos()).map((video) => ({ slug: video.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = (await getVideos()).find((item) => item.slug === slug);
  if (!video) return {};

  const canonicalUrl = `/media/videos/${video.slug}`;
  const description = summarize(
    video.description,
    "مرئية من مرئيات مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات.",
  );

  return {
    title: `${video.title} | معرض المرئيات`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: video.title,
      description,
      url: canonicalUrl,
      type: "video.other",
      images: [video.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description,
      images: [video.thumbnail],
    },
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const [videos, series] = await Promise.all([getVideos(), getSeries()]);

  const video = videos.find((item) => item.slug === slug);
  if (!video) notFound();

  const latest = videos.filter((item) => item.slug !== video.slug).slice(0, LATEST_COUNT);

  return (
    <VideoView video={video} videos={videos} series={series}>
      <div className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-white font-bold text-lg">أحدث الفيديوهات</h2>
          <div className="flex gap-4 text-xs font-medium text-slate-400">
            <Link href="/media/videos" className="transition hover:text-secondary">
              كل الفيديوهات
            </Link>
            <Link href="/media/videos/series" className="transition hover:text-secondary">
              كل السلاسل
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {latest.map((item) => (
            <VideoCard
              key={item.slug}
              title={item.title}
              thumbnail={item.thumbnail}
              href={`/media/videos/${item.slug}`}
              meta={formatDate(item.date)}
            />
          ))}
        </div>
      </div>

    </VideoView>
  );
}
