"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, ArrowLeft } from "lucide-react";
import { TelegramIcon } from "@/components/brand-icons";
import type { YouTubeGroup } from "@/types/youtube-data";
import { getGroupSlug, thumbnailUrl } from "@/lib/youtube";

const socialLinks = [
  {
    label: "يوتيوب",
    href: "https://www.youtube.com/@imamzainorg",
    Icon: Youtube,
  },
  {
    label: "تيليجرام",
    href: "https://t.me/imamzainorg",
    Icon: TelegramIcon,
  },
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/@imamzainorg",
    Icon: Facebook,
  },
  {
    label: "انستغرام",
    href: "https://www.instagram.com/imamzainorg/",
    Icon: Instagram,
  },
];

export default function VideosSidebar({
  seriesGroups,
}: {
  seriesGroups: YouTubeGroup[];
}) {
  return (
    <aside className="w-full hidden lg:block  lg:w-[300px] xl:w-[320px] shrink-0">
      <div className="space-y-6 lg:sticky lg:top-24">
        {/* Series */}
        {seriesGroups.length > 0 && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  سلاسل ومحاضرات
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  استكشف المزيد من المحتوى
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {seriesGroups.slice(0, 6).map((group) => (
                <Link
                  key={group.id}
                  href={`/media/videos/${getGroupSlug(group)}`}
                  className="group flex gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-white/[0.055]"
                >
                  <div className="relative w-[92px] aspect-video shrink-0 overflow-hidden rounded-lg bg-black/30">
                    <Image
                      src={thumbnailUrl(group.videos[0].thumbnail)}
                      alt={group.title}
                      fill
                      sizes="92px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="min-w-0 flex-1 py-0.5">
                    <p className="text-sm leading-5 font-medium text-slate-200 line-clamp-2 transition-colors group-hover:text-white">
                      {group.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {group.videos.length} حلقة
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/media/videos#series"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] py-2.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              عرض جميع السلاسل
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </section>
        )}

        {/* Social */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
          <h2 className="text-sm font-semibold text-white">تابعنا</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            تابع أحدث الإصدارات والمحتوى
          </p>
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="group flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-slate-400 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
              >
                <Icon
                  className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
