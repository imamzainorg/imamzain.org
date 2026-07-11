"use client";
import { Volume2, Volume1, VolumeX } from "lucide-react";
import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Share2, Loader2 } from "lucide-react";
import type { AudioItem } from "@/types/audio";

// ─── Toast بسيط ───────────────────────────────
function toast(message: string) {
  const el = document.createElement("div");
  el.textContent = message;

  el.style.position = "fixed";
  el.style.bottom = "20px";
  el.style.left = "50%";
  el.style.transform = "translateX(-50%)";
  el.style.background = "rgba(0,0,0,0.8)";
  el.style.color = "white";
  el.style.padding = "10px 14px";
  el.style.borderRadius = "12px";
  el.style.zIndex = "9999";
  el.style.fontSize = "14px";

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 1500);
}

// ─── Component ───────────────────────────────
interface ToolButtonsProps {
  item: AudioItem;
}

export const ToolButtons = memo(function ToolButtons({
  item,
}: ToolButtonsProps) {
  const [downloading, setDownloading] = useState(false);
  const [open, setOpen] = useState(false);

  const url = item.audio;
  const title = item.title;

  // ─── Download ───────────────────────────────
  const handleDownload = useCallback(async () => {
    try {
      setDownloading(true);

      const fileName =
        title.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "").replace(/\s+/g, "-") ||
        "audio";

      const apiUrl = `/api/download?url=${encodeURIComponent(url)}&name=${encodeURIComponent(fileName)}`;

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${fileName}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch {
      toast("فشل التحميل ❌");
    } finally {
      setDownloading(false);
    }
  }, [url, title]);

  // ─── Share helpers ─────────────────────────
  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    toast("تم نسخ الرابط 📋");
  }, [url]);

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + "\n" + url)}`,
      "_blank",
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
    );
  };
  const ShareIcons = {
    copy: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    whatsapp: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
    telegram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#229ED9">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    x: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };
  return (
    <div className="flex items-center gap-2 shrink-0 relative">
      {/* Download */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-11 h-11 rounded-2xl bg-white/5 dark:bg-white hover:bg-white/10 flex items-center justify-center"
      >
        {downloading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
      </button>

      {/* Share Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-2xl bg-white/5 dark:bg-white hover:bg-white/10 flex items-center justify-center"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* ─── SHARE MENU ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            {/* menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-14 right-0 z-50 w-64
              bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
              border border-white/10 rounded-2xl shadow-2xl p-3"
            >
              {/* QR */}
              <div className="flex justify-center mb-3">
                <QRCodeCanvas value={url} size={90} />
              </div>

              {[
                {
                  icon: ShareIcons.copy,
                  label: "نسخ الرابط",
                  bg: "bg-slate-100 dark:bg-slate-800",
                  color: "text-slate-600 dark:text-slate-300",
                  action: () => {
                    copyLink();
                    setOpen(false);
                  },
                },
                {
                  icon: ShareIcons.whatsapp,
                  label: "واتساب",
                  bg: "bg-[#e8faf0] dark:bg-green-900/30",
                  color: "",
                  action: () => {
                    shareWhatsApp();
                    setOpen(false);
                  },
                },
                {
                  icon: ShareIcons.telegram,
                  label: "تيليجرام",
                  bg: "bg-[#e8f4fc] dark:bg-sky-900/30",
                  color: "",
                  action: () => {
                    shareTelegram();
                    setOpen(false);
                  },
                },
                {
                  icon: ShareIcons.facebook,
                  label: "فيسبوك",
                  bg: "bg-[#e8f0fd] dark:bg-blue-900/30",
                  color: "",
                  action: () => {
                    shareFacebook();
                    setOpen(false);
                  },
                },
                {
                  icon: ShareIcons.x,
                  label: "X (تويتر)",
                  bg: "bg-slate-100 dark:bg-slate-800",
                  color: "text-slate-800 dark:text-slate-100",
                  action: () => {
                    shareX();
                    setOpen(false);
                  },
                },
              ].map(({ icon, label, bg, color, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3 px-2 py-2
      rounded-xl text-sm text-right
      text-slate-700 dark:text-slate-200
      hover:bg-slate-100 dark:hover:bg-white/8
      transition-colors duration-100"
                >
                  <span
                    className={`w-7 h-7 rounded-lg ${bg} ${color}
      flex items-center justify-center shrink-0`}
                  >
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});
export const PlayButton = memo(function PlayButton({
  isActive,
  isPlaying,
  onClick,
}: {
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        bg-primary text-white dark:bg-Muharram_secondary dark:text-black
      `}
    >
      {isActive && isPlaying ? "⏸" : "▶"}
    </button>
  );
});
export const StatusBadge = memo(function StatusBadge({
  currentTime,
  duration,
}: {
  currentTime: number;
  duration?: number;
}) {
  const format = (s: number) => {
    if (!s) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-sm text-slate-600 dark:text-white font-mono">
      {format(currentTime)} / {format(duration || 0)}
    </div>
  );
});
export const VolumeControl = memo(function VolumeControl({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (v: number) => void;
}) {
  const v = Math.max(0, Math.min(1, volume));
  const Icon = v === 0 ? VolumeX : v < 0.5 ? Volume1 : Volume2;

  return (
    <div className="flex items-center justify-start gap-2">
      {/* زر الصوت مع عكس الأيقونة */}

      {/* Slider ثابت دائماً */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={v}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24 scale-x-[-1] accent-primary dark:accent-Muharram_secondary/60"
      />

      <button
        className="w-9 h-9 rounded-xl bg-white/5 dark:bg-white hover:bg-white/10 flex items-center justify-center shrink-0"
        title="الصوت"
        onClick={() => onChange(v === 0 ? 1 : 0)}
      >
        <Icon size={18} />
      </button>
    </div>
  );
});
