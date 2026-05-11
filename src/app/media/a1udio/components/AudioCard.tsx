import { motion } from "framer-motion";
import { AudioItem } from "@/types/audio";
import { WaveformBars } from "./WaveformBars";
import {
  PlayIcon,
  PauseIcon,
  DownloadIcon,
  PdfIcon,
  SpeakerIcon,
  ClockIcon,
} from "./Icons";

interface AudioCardProps {
  item: AudioItem;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  duration: string | undefined;
  size: string | undefined;
  onPlay: (item: AudioItem) => void;
  onDownload: (item: AudioItem, e: React.MouseEvent) => void;
}

export function AudioCard({
  item,
  index,
  isActive,
  isPlaying,
  duration,
  size,
  onPlay,
  onDownload,
}: AudioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.5), duration: 0.3 }}
      className={`group relative bg-white border rounded-2xl transition-all duration-300 cursor-pointer ${
        isActive
          ? "ring-2 ring-primary ring-offset-2 shadow-lg"
          : "hover:shadow-xl border-secondary/1 hover:scale-[1.02]"
      }`}
      onClick={() => onPlay(item)}
    >
      <div className="p-5">
        {isActive && isPlaying && (
          <div className="absolute top-3 left-3">
            <div className="flex gap-0.5 items-end h-4">
              <div className="w-0.5 bg-primary animate-pulse-wave" style={{ animationDelay: "0s" }} />
              <div className="w-0.5 bg-primary animate-pulse-wave" style={{ animationDelay: "0.2s" }} />
              <div className="w-0.5 bg-primary animate-pulse-wave" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        <h3
          className={`font-bold flex justify-between text-lg line-clamp-2 mb-4 pr-4 ${
            isActive ? "text-primary" : "text-gray-800 group-hover:text-primary"
          } transition-colors duration-200`}
        >
          <span>{item.title}</span>
          <span className="ml-2 text-xs text-gray-400">
            {isActive && isPlaying ? <WaveformBars playing={isPlaying} /> : ""}
          </span>
        </h3>

        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <SpeakerIcon />
            <span className="truncate max-w-[150px]">{item.speaker}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="font-mono text-xs">{duration ?? "—:—"}</span>
          </div>
          {size && <div className="text-xs text-gray-400">📦 {size}</div>}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive && isPlaying
                ? "bg-primary text-white shadow-md ring-2 ring-primary/30"
                : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
          >
            {isActive && isPlaying ? (
              <>
                <PauseIcon />
                <span>إيقاف</span>
              </>
            ) : (
              <>
                <PlayIcon />
                <span>استماع</span>
              </>
            )}
          </button>

          <button
            className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200 active:scale-95"
            onClick={(e) => onDownload(item, e)}
            aria-label="تحميل"
          >
            <DownloadIcon />
          </button>

          {item.pdf && (
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-white text-xs font-semibold shadow-sm hover:bg-secondary/90 hover:shadow-md active:scale-95 transition-all duration-200"
              title="فتح PDF"
            >
              <PdfIcon />
              <span>PDF</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}