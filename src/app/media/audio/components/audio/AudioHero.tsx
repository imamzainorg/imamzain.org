"use client";

import { Headphones, Award, Sparkles } from "lucide-react";


export default function AudioHero() {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 dark:from-Muharram_primary/25   via-transparent to-emerald-500/5 dark:to-Muharram_secondary/30  rounded-2xl border border-primary/10 dark:border-Muharram_primary/30  p-8 mb-10 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-Muharram_primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-Muharram_primary/25  dark:to-Muharram_secondary/30 flex items-center justify-center">
            <Headphones className="w-8 h-8 text-primary dark:text-Muharram_primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-black">
              المكتبة <span className="text-primary dark:text-Muharram_secondary/90">الصوتية</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-black mt-1 max-w-md">
              استمع إلى  المحاضرات والدروس الصوتية المتنوعة
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 dark:text-primary" />
                <span className="text-xs text-slate-400 dark:text-black">محتوى حصري</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-500 dark:text-primary" />
                <span className="text-xs text-slate-400 dark:text-black">جودة عالية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}