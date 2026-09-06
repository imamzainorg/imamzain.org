"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import type { YouTubeVideo } from "@/types/youtube-data";
import { thumbnailUrl } from "@/lib/youtube";

export type SearchResult = { video: YouTubeVideo };

export default function FilterBar({
  search,
  onSearchChange,
  results,
  onSelectResult,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  // نتائج جاهزة (تصلنا محسوبة من فوق) نعرضها بقائمة عائمة تحت الصندوق —
  // الاختيار منها يبدل الفيديو مباشرة، بدون لا سكرول ولا نزول تحت
  results: SearchResult[];
  onSelectResult: (video: YouTubeVideo) => void;
}) {
  const showDropdown = search.trim().length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex-1 min-w-[160px] relative">
        <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 z-10" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث عن فيديو..."
          aria-label="ابحث عن فيديو"
          autoComplete="off"
          className="w-full bg-white/5 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-subtitle text-white placeholder:text-slate-500"
        />

        {showDropdown && (
          <div className="absolute z-30 top-full mt-2 left-0 right-0 max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-gray-900 shadow-2xl">
            {results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">
                ماكو فيديو مطابق لـ «{search.trim()}»
              </p>
            ) : (
              results.map(({ video }) => (
                <button
                  key={video.slug}
                  type="button"
                  onClick={() => onSelectResult(video)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-right hover:bg-white/10 transition"
                >
                  <div className="relative w-16 aspect-video flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={thumbnailUrl(video.thumbnail)}
                      alt={video.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {video.date}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
