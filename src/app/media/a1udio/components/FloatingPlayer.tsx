import { motion } from "framer-motion";
import { AudioItem } from "@/types/audio";
import { CloseIcon, VolumeHighIcon, VolumeOffIcon } from "./Icons";
import { fmtTime } from "../utils/audio";
import { useEffect } from "react";

interface FloatingPlayerProps {
  track: AudioItem;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  rate: number;
  onTogglePlay: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkip: (secs: number) => void;
  onVolumeChange: (vol: number) => void;
  onRateChange: (rate: number) => void;
  onClose: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onTimeUpdate: () => void;
  onLoadedMetadata: () => void;
  onEnded: () => void;
}

export function FloatingPlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  rate,
  onTogglePlay,
  onSeek,
  onSkip,
  onVolumeChange,
  onRateChange,
  onClose,
  audioRef,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
}: FloatingPlayerProps) {
  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        onTogglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onTogglePlay]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 100, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.8 }}
      className="fixed bottom-3 inset-x-0 flex justify-center items-end px-3 z-50  pointer-events-none"
    >
      <div className="pointer-events-auto w-[15rem] md:w-full max-w-lg relative rounded-2xl overflow-hidden">
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-blue-500 opacity-75">
          <div className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative p-2.5 space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            {/* Indicator */}
            {isPlaying ? (
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"
              />
            ) : (
              <div className="w-2.5 h-2.5 rounded-full bg-white/30 shrink-0" />
            )}

            {/* Title */}
            <div className="min-w-0 flex-1">
              <p className="text-white font-bold text-sm truncate leading-tight">
                {track.title}
              </p>
              <p className="text-white/50 text-[11px] font-medium">
                {track.speaker}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-7 h-7 shrink-0 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white/70 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Progress */}
          <div dir="ltr">
            <div className="flex justify-between text-[10px] text-white/50 font-medium mb-1">
              <span>{fmtTime(currentTime)}</span>
              <span>{fmtTime(duration)}</span>
            </div>
            <div className="relative group">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </motion.div>
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={onSeek}
                className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Controls — single responsive row */}
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Skip -10 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSkip(-10)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-amber-400/50 transition-all shrink-0"
            >
              <svg
                className="w-4 h-4 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12.25 7.5L7.5 12l4.75 4.5M17.75 7.5L13 12l4.75 4.5"
                />
              </svg>
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTogglePlay}
              className="shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center">
                {isPlaying ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </motion.button>

            {/* Skip +10 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSkip(10)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-amber-400/50 transition-all shrink-0"
            >
              <svg
                className="w-4 h-4 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.75 7.5L16.5 12l-4.75 4.5M6.25 7.5L11 12l-4.75 4.5"
                />
              </svg>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 shrink-0" />

            {/* Speed */}
            <div className="flex gap-0.5 sm:gap-1 bg-white/5 rounded-full p-0.5 shrink-0">
              {[0.8, 1, 1.2].map((sp) => (
                <button
                  key={sp}
                  onClick={() => onRateChange(sp)}
                  className={`px-1.5 sm:px-2 py-1 rounded-full text-[10px] font-semibold transition-all ${
                    rate === sp
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {sp}x
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 shrink-0" />

            {/* Volume */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 min-w-0"
              dir="ltr"
            >
              <button
                onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
                className="text-white/60 hover:text-white transition-all shrink-0"
              >
                {volume === 0 ? <VolumeOffIcon /> : <VolumeHighIcon />}
              </button>
              {/* Volume slider — hidden on very small screens */}
              <div className="relative w-12 sm:w-20 hidden xs:block">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    style={{ width: `${volume * 100}%` }}
                    animate={{ width: `${volume * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-white/40 text-[10px] shrink-0 hidden sm:inline">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
    </motion.div>
  );
}
