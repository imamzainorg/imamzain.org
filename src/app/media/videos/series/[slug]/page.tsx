import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle } from "@/components/brand";
import { formatDate } from "@/lib/format";
import { getSeries, getVideos, SECTION_TITLES, summarize } from "@/lib/videos";
import VideoCard from "../../_components/video-card";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSeries()).map((series) => ({ slug: series.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = (await getSeries()).find((item) => item.slug === slug);
  if (!series) return {};

  const canonicalUrl = `/media/videos/series/${series.slug}`;
  const description = summarize(
    series.description,
    `${series.title}: ${series.videoCount} حلقة من مرئيات مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات.`,
  );

  return {
    title: `${series.title} | معرض المرئيات`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: series.title,
      description,
      url: canonicalUrl,
      type: "website",
      images: series.thumbnail ? [series.thumbnail] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: series.title,
      description,
      images: series.thumbnail ? [series.thumbnail] : undefined,
    },
  };
}

export default async function VideoSeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const [allSeries, videos] = await Promise.all([getSeries(), getVideos()]);

  const series = allSeries.find((item) => item.slug === slug);
  if (!series) notFound();

  const bySlug = new Map(videos.map((video) => [video.slug, video]));
  const episodes = series.videos.flatMap((videoSlug) => bySlug.get(videoSlug) ?? []);

  return (
    <div className="container pb-32 pt-6">
      <Breadcrumbs
        className="text-white mb-6"
        dotColor="bg-secondary"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المرئيات", url: "/media/videos" },
          { name: "البرامج والسلاسل", url: "/media/videos/series" },
          { name: series.title, url: "#" },
        ]}
      />

      <SectionTitle
        light
        as="h1"
        title={series.title}
        text={`${series.section ? `${SECTION_TITLES[series.section]} · ` : ""}${episodes.length} حلقة${series.speaker ? ` · ${series.speaker}` : ""}`}
        className="mb-6"
      />

      {series.description.trim() && (
        <p className="mb-10 max-w-3xl whitespace-pre-line break-words text-sm leading-7 text-slate-300">
          {series.description.trim()}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {episodes.map((video, index) => (
          <VideoCard
            key={video.slug}
            title={video.title}
            thumbnail={video.thumbnail}
            href={`/media/videos/${video.slug}`}
            meta={formatDate(video.date)}
            badge={`الحلقة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
