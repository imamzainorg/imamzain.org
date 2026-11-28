"use client";

import { ClockIcon, Share2 } from "lucide-react";

export default function VideoPlayer({
  slug,
  videoId,
  title,
  dateLabel,
}: {
  slug: string;
  videoId: string;
  title: string;
  dateLabel: string;
}) {
  const handleShare = async () => {
    // نشارك رابط صفحة الفيديو نفسه (/media/videos/{slug}) حتى لو كان المشغل
    // ظاهر بالصفحة الرئيسية للمرئيات، فالمستلم يوصل لهذا الفيديو بالضبط
    const url = `${window.location.origin}/media/videos/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // المستخدم لغى المشاركة — تجاهل
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-white font-bold text-lg md:text-2xl leading-relaxed">
          {title}
        </h1>
        <button
          type="button"
          onClick={handleShare}
          aria-label="مشاركة الفيديو"
          className="flex shrink-0 items-center gap-1.5 pt-1 text-subtitle text-slate-300 hover:text-white transition"
        >
          <Share2 className="w-4 h-4 lg:w-6 lg:h-6" />
          مشاركة
        </button>
      </div>

      <div className="flex items-center gap-2 mt-2 text-slate-400 text-subtitle">
        <ClockIcon className="w-4 h-4" stroke="#bb9661" strokeWidth={1.5} />
        <span>{dateLabel}</span>
      </div>
    </div>
  );
}
