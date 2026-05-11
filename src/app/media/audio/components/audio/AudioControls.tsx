"use client";

import { memo, useState, useCallback } from "react";
import {
  Download,
  Check,
  Link2,
  Loader2,
  VolumeX,
  Volume1,
  Volume2,
} from "lucide-react";
import type { AudioItem } from "@/types/audio";

// ─── Helpers ────────────────────────────────────────────────────────────────

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return "0:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ─── PlayButton ─────────────────────────────────────────────────────────────

interface PlayButtonProps {
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export const PlayButton = memo(function PlayButton({
  isActive,
  isPlaying,
  onClick,
}: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden
        w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
        rounded-full flex items-center justify-center
        transition-all duration-300 shrink-0
        hover:scale-105 active:scale-95
        ${
          isActive
            ? "bg-primary text-white shadow-2xl shadow-primary/30"
            : "bg-primary/90 text-white hover:bg-primary"
        }
      `}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300" />
      {isActive && isPlaying ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
          className="relative z-10"
        >
          <rect x="6" y="4" width="4" height="16" rx="1.5" />
          <rect x="14" y="4" width="4" height="16" rx="1.5" />
        </svg>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
          className="relative z-10 ml-0.5"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )}
    </button>
  );
});

// ─── StatusBadge ────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  isActive: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration?: number; // ✅ تغيير من duration إلى durationSeconds
  size?: string;
}

// ✅ إضافة دالة تنسيق الوقت

export const StatusBadge = memo(function StatusBadge({
  isActive,
  isPlaying,
  currentTime,
  duration, // ✅ استخدام durationSeconds
  size,
}: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm min-w-0">
      {/* عرض الوقت */}
      <div className="flex items-center gap-2 font-mono whitespace-nowrap ml-10">
        {/* الوقت الحالي المتحرك */}
        <span className="text-primary min-w-[55px] text-right">
          {formatTime(currentTime)}  <span className="text-slate-950">/{formatTime(duration || 0)}</span> 
        </span>

       

      </div>

      {/* عرض الحجم */}
      {size && <span className="text-slate-400 ml-10 mt-1">{size}</span>}

      {/* حالة التشغيل */}
      <div className="flex items-center gap-1.5 mt-1 text-slate-500">
        <span
          className={`w-2 h-2 rounded-full ${
            isActive && isPlaying
              ? "bg-emerald-400 animate-pulse"
              : isActive
                ? "bg-yellow-400"
                : "bg-slate-300"
          }`}
        />
        <span className="whitespace-nowrap">
          {isActive && isPlaying ? "جاري التشغيل" : isActive ? "متوقف" : "جاهز"}
        </span>
      </div>
    </div>
  );
});

// ─── VolumeControl ──────────────────────────────────────────────────────────

interface VolumeControlProps {
  itemId: number;
  volume: number;
  onVolumeChange: (id: number, v: number) => void;
}

export const VolumeControl = memo(function VolumeControl({
  itemId,
  volume,
  onVolumeChange,
}: VolumeControlProps) {
  const [open, setOpen] = useState(false);
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        title="الصوت"
        className="
          group relative overflow-hidden flex items-center justify-center
          w-11 h-11 rounded-2xl
          border border-white/10 bg-white/[0.03] backdrop-blur-md
          transition-all duration-300
          hover:scale-105 hover:border-primary/40 hover:bg-primary/10 active:scale-95
        "
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 to-transparent transition-opacity duration-300" />
        <VolumeIcon className="w-5 h-5 relative z-10 text-slate-300 group-hover:text-primary transition-colors duration-300" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="
            absolute bottom-14 left-1/2 -translate-x-1/2 z-50
            bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl
            border border-white/10 rounded-2xl shadow-2xl p-4
          "
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">
                {Math.round(volume * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) =>
                  onVolumeChange(itemId, parseFloat(e.target.value))
                }
                className="h-28 accent-primary cursor-pointer"
                style={{ writingMode: "vertical-lr" }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

// ─── ToolButtons ────────────────────────────────────────────────────────────

interface ToolButtonsProps {
  item: AudioItem;
}

export const ToolButtons = memo(function ToolButtons({
  item,
}: ToolButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = useCallback(() => {
    const url = `${window.location.origin}/audio?id=${item.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [item.id]);

  const handleDownload = useCallback(async () => {
    try {
      setDownloading(true);

      const fileName =
        item.title
          .replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "")
          .replace(/\s+/g, "-") || "audio";

      // ← هنا التغيير، بدل fetch(item.audio) مباشرة
      const apiUrl = `/api/download?url=${encodeURIComponent(item.audio)}&name=${encodeURIComponent(fileName)}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("فشل التحميل");

      const blob = await res.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${fileName}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Download failed", err);
      alert("فشل التحميل ❌");
    } finally {
      setDownloading(false);
    }
  }, [item.audio, item.title]);
  const btnBase = `
    group relative overflow-hidden flex items-center justify-center
    w-11 h-11 rounded-2xl
    border border-white/10 bg-white/[0.03] backdrop-blur-md
    transition-all duration-300
    hover:scale-105 hover:border-primary/40 hover:bg-primary/10 active:scale-95
  `;
  const shimmer =
    "absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 to-transparent transition-opacity duration-300";

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        title="تحميل"
        className={btnBase}
      >
        <div className={shimmer} />
        {downloading ? (
          <Loader2 className="w-5 h-5 animate-spin text-primary relative z-10" />
        ) : (
          <Download className="w-5 h-5 text-slate-300 group-hover:text-primary relative z-10 transition-colors" />
        )}
      </button>

      {/* Copy Link */}
      <button onClick={handleCopy} title="نسخ الرابط" className={btnBase}>
        <div className={shimmer} />
        {copied ? (
          <Check className="w-5 h-5 text-green-400 relative z-10" />
        ) : (
          <Link2 className="w-5 h-5 text-slate-300 group-hover:text-primary relative z-10 transition-colors" />
        )}
      </button>
    </div>
  );
});
