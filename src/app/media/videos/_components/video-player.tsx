"use client";

import { ClockIcon, Share2 } from "lucide-react";
import type { YouTubeVideo } from "@/types/youtube-data";

export default function VideoPlayer({ video }: { video: YouTubeVideo }) {
  const handleShare = async () => {
    // نبني الرابط من سلق الفيديو الحالي نفسه، مو من عنوان المتصفح —
    // لأن عنوان المتصفح ما يتغير لما تبدّل حلقة (تبديل الحلقات state
    // بس، بدون navigation)، فلو اعتمدنا window.location.href هنا كان
    // أي حد يشارك حلقة غير الأولى بيوصل المستلم لحلقة غلط
    const url = `${window.location.origin}/media/videos/${video.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: video.title, url });
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
        {/* key={video.url} يجبر إعادة تركيب الـ iframe بالكامل لما تتغير
				    الحلقة، حتى نضمن تحميل الفيديو الجديد بشكل نظيف */}
        <iframe
          key={video.url}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.url}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <h1 className="mt-4 text-white font-bold text-lg md:text-2xl leading-relaxed flex justify-between">
        {video.title}
        <div>
          <button
            type="button"
            onClick={handleShare}
            aria-label="مشاركة الفيديو"
            className="flex items-center gap-1.5 text-subtitle text-slate-300 hover:text-white transition"
          >
            <Share2 className="w-4 h-4 lg:w-6 lg:h-6" />
            مشاركة
          </button>
        </div>
      </h1>

      <div className="flex items-center gap-2 mt-2 text-slate-400 text-subtitle">
        <ClockIcon className="w-4 h-4" stroke="#bb9661" strokeWidth={1.5} />
        <span>{video.date}</span>
      </div>

      <p className="mt-3 text-white/80 leading-8 text-justify">{video.desc}</p>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10"></div>
    </div>
  );
}
