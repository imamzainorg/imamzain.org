import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle } from "@/components/brand";
import { formatDate } from "@/lib/format";
import { episodesOf } from "@/lib/videos";
import type { Video, VideoSeries } from "@/types/videos";
import EpisodesList from "./episodes-list";
import VideoDescription from "./video-description";
import VideoPlayer from "./video-player";
import VideoSearch from "./video-search";
import VideosSidebar from "./sidebar";

// The watch layout shared by /media/videos (which opens on the hero video) and /media/videos/{slug}:
// search, player, description, the video's series as an episode list, and a sidebar. What goes below
// differs per page, so it comes in as children.
export default function VideoView({
  video,
  videos,
  series,
  isHub = false,
  children,
}: {
  video: Video;
  videos: Video[];
  series: VideoSeries[];
  isHub?: boolean;
  children?: ReactNode;
}) {
  const inSeries = episodesOf(video, series, videos);

  const crumbs = isHub
    ? [
        { name: "الصفحة الرئيسية", url: "/" },
        { name: "المرئيات", url: "#" },
      ]
    : [
        { name: "الصفحة الرئيسية", url: "/" },
        { name: "المرئيات", url: "/media/videos" },
        ...(inSeries
          ? [{ name: inSeries.series.title, url: `/media/videos/series/${inSeries.series.slug}` }]
          : []),
        { name: video.title, url: "#" },
      ];

  return (
    <div className="container pb-32 pt-6">
      <Breadcrumbs className="text-white mb-6" dotColor="bg-secondary" links={crumbs} />

      <SectionTitle
        light
        title="الفيديوهات"
        text="مكتبة تضم المحاضرات والبرامج والندوات الخاصة بالإمام زين العابدين عليه السلام"
        className="mb-10"
      />

      {/* المحتوى الرئيسي أول شي بالـ DOM (= يمين الصفحة بلغة RTL)،
          والسايدبار بعده (= يسار الصفحة) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 xl:gap-8 items-start">
        <div className="min-w-0 rounded-2xl p-4 lg:p-5">
          <VideoSearch />
          <VideoPlayer
            slug={video.slug}
            videoId={video.videoId}
            title={video.title}
            dateLabel={formatDate(video.date)}
          />
          {(inSeries || video.speaker) && (
            <p className="mt-3 text-sm text-slate-400">
              {video.speaker && <span>{video.speaker}</span>}
              {video.speaker && inSeries && <span aria-hidden> · </span>}
              {inSeries && (
                <>
                  من سلسلة{" "}
                  <Link
                    href={`/media/videos/series/${inSeries.series.slug}`}
                    className="text-secondary hover:underline"
                  >
                    {inSeries.series.title}
                  </Link>
                </>
              )}
            </p>
          )}
          <VideoDescription text={video.description} />
        </div>
        <div className="rounded-2xl p-5 lg:p-6">
          <VideosSidebar series={series} />
        </div>
      </div>

      {inSeries && (
        <div className="mt-12 rounded-2xl p-4 lg:p-6">
          <EpisodesList
            episodes={inSeries.episodes.map(({ slug, title, thumbnail }) => ({ slug, title, thumbnail }))}
            currentSlug={video.slug}
            seriesTitle={inSeries.series.title}
            seriesHref={`/media/videos/series/${inSeries.series.slug}`}
          />
        </div>
      )}

      {children}
    </div>
  );
}
