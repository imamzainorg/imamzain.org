"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/format";
import { thumbnailUrl } from "@/lib/youtube";
import type { VideoSearchEntry } from "@/types/videos";

// عدد النتائج بالقائمة العائمة تحت صندوق البحث: قليل ومقصود، حتى القائمة
// ما تطول وتغطي المشغل بالكامل
const RESULTS_LIMIT = 8;

// يوحّد الكتابة قبل المقارنة: يشيل التشكيل ويوحّد الألف والياء والتاء المربوطة،
// حتى "الإمام" و"الامام" يتطابقون
const normalize = (text: string) =>
  text
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase();

export default function VideoSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState<VideoSearchEntry[] | null>(null);
  const requested = useRef(false);

  // الفهرس ملف ثابت واحد (/api/video-index)، ما ننزّله إلا لما المستخدم
  // يبدأ يبحث فعلاً، حتى الصفحات ما تدفع ثمنه لمن ما يبحث
  const loadIndex = () => {
    if (requested.current) return;
    requested.current = true;
    fetch("/api/video-index")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: VideoSearchEntry[]) => setEntries(data))
      .catch(() => {
        requested.current = false;
      });
  };

  const term = normalize(search.trim());
  const results =
    term && entries
      ? entries
          .filter((entry) => normalize(`${entry.title} ${entry.series}`).includes(term))
          .slice(0, RESULTS_LIMIT)
      : [];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex-1 min-w-[160px] relative">
        <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 right-3 text-slate-500 z-10" />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            loadIndex();
            setSearch(e.target.value);
          }}
          onFocus={loadIndex}
          placeholder="ابحث عن فيديو..."
          aria-label="ابحث عن فيديو"
          autoComplete="off"
          className="w-full bg-white/5 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-subtitle text-white placeholder:text-slate-500"
        />

        {term && (
          <div className="absolute z-30 top-full mt-2 left-0 right-0 max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-gray-900 shadow-2xl">
            {!entries ? (
              <p className="px-4 py-3 text-sm text-slate-400">جارٍ البحث...</p>
            ) : results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400">
                ماكو فيديو مطابق لـ «{search.trim()}»
              </p>
            ) : (
              results.map((video) => (
                <button
                  key={video.slug}
                  type="button"
                  onClick={() => {
                    setSearch("");
                    router.push(`/media/videos/${video.slug}`);
                  }}
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
                      {formatDate(video.date)}
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
