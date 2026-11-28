import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/format";
import { groupBySection } from "@/lib/videos";
import type { VideoSeries } from "@/types/videos";
import VideoCard from "./video-card";

// السلاسل مقسّمة حسب القسم (برامج، شروح، مجالس، مؤتمرات). `limit` يقصّ كل قسم
// ويظهر رابط "عرض الكل" بدل بقية السلاسل.
export default function SeriesSections({
  series,
  limit,
  headingLevel = 2,
}: {
  series: VideoSeries[];
  limit?: number;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="space-y-12">
      {groupBySection(series).map((group) => {
        const shown = limit ? group.series.slice(0, limit) : group.series;
        return (
          <section key={group.section} id={group.section} className="scroll-mt-24">
            <div className="mb-4 flex items-end justify-between gap-4">
              <Heading className="text-white font-bold text-lg">
                {group.title}
              </Heading>
              {shown.length < group.series.length && (
                <Link
                  href={`/media/videos/series#${group.section}`}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-secondary"
                >
                  عرض الكل ({group.series.length})
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {shown.map((item) => (
                <VideoCard
                  key={item.slug}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  href={`/media/videos/series/${item.slug}`}
                  meta={item.latestDate ? formatDate(item.latestDate) : undefined}
                  badge={`${item.videoCount} حلقة`}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
