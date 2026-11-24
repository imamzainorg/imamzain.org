"use client";

import { useState } from "react";
import VideoCard from "./video-card";

export type VideoTile = {
  slug: string;
  title: string;
  thumbnail: string;
  dateLabel: string;
};

// عرض تدريجي لقائمة كل الفيديوهات، الأحدث أولاً
const PAGE_SIZE = 12;

export default function AllVideos({ videos }: { videos: VideoTile[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
        {videos.slice(0, visible).map((video) => (
          <VideoCard
            key={video.slug}
            title={video.title}
            thumbnail={video.thumbnail}
            href={`/media/videos/${video.slug}`}
            meta={video.dateLabel}
          />
        ))}
      </div>
      {visible < videos.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
          >
            عرض المزيد
          </button>
        </div>
      )}
    </div>
  );
}
