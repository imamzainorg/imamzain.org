"use client";

import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type SubjectAudioPlayerProps = {
  src: string;
  title?: string;
};

const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;
type PlaybackRate = (typeof PLAYBACK_RATES)[number];

const SKIP_SECONDS = 10;

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export default function SubjectAudioPlayer({ src }: SubjectAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRateMenuOpen, setIsRateMenuOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const handleTimeUpdate = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isSeeking]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const handleSeek = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setCurrentTime(value);

      const audio = audioRef.current;
      if (audio) audio.currentTime = value;
    },
    [],
  );

  const handleSeekStart = useCallback(() => setIsSeeking(true), []);
  const handleSeekEnd = useCallback(() => setIsSeeking(false), []);

  const skip = useCallback((amount: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Math.min(
      Math.max(audio.currentTime + amount, 0),
      audio.duration || 0,
    );
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }, []);

  const handleRateSelect = useCallback((rate: PlaybackRate) => {
    setPlaybackRate(rate);
    setIsRateMenuOpen(false);

    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full py-2 border-b border-gray-100 dark:border-zinc-700">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-3">
        {/* Volume + speed (right side) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRateMenuOpen((open) => !open)}
              aria-label="سرعة التشغيل"
              aria-expanded={isRateMenuOpen}
              className="px-2 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors tabular-nums"
            >
              {playbackRate}x
            </button>

            {isRateMenuOpen && (
              <div className="absolute bottom-full mb-2 left-0 z-10 rounded-lg border  border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md overflow-hidden">
                {PLAYBACK_RATES.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleRateSelect(rate)}
                    className={`block w-full px-4 py-1.5 text-xs text-center tabular-nums transition-colors ${
                      rate === playbackRate
                        ? "bg-primary/10 dark:bg-Muharram_primary/20 text-primary dark:text-Muharram_primary font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500 w-10 text-center shrink-0">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 flex items-center h-4">
            <div
              className="absolute inset-x-0 h-1 rounded-full bg-gray-200 dark:bg-zinc-700"
              aria-hidden="true"
            />
            <div
              className="absolute left-0 h-1 rounded-full bg-primary dark:bg-Muharram_primary pointer-events-none"
              style={{ width: `${progressPercent}%` }}
              aria-hidden="true"
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
              disabled={!isLoaded}
              aria-label="شريط التقدم"
              dir="ltr"
              className="relative w-full h-4 appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed
								[&::-webkit-slider-thumb]:appearance-none
								[&::-webkit-slider-thumb]:w-3
								[&::-webkit-slider-thumb]:h-3
								[&::-webkit-slider-thumb]:rounded-full
								[&::-webkit-slider-thumb]:bg-primary
								dark:[&::-webkit-slider-thumb]:bg-Muharram_primary
								[&::-webkit-slider-thumb]:mt-0
								[&::-moz-range-thumb]:w-3
								[&::-moz-range-thumb]:h-3
								[&::-moz-range-thumb]:rounded-full
								[&::-moz-range-thumb]:border-0
								[&::-moz-range-thumb]:bg-primary
								dark:[&::-moz-range-thumb]:bg-Muharram_primary"
            />
          </div>

          <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500 w-10 text-center shrink-0">
            {formatTime(duration)}
          </span>
        </div>

        {/* Playback controls (left side) */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => skip(SKIP_SECONDS)}
            aria-label="تقديم 10 ثوانٍ"
            className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            disabled={!isLoaded}
            aria-label={isPlaying ? "إيقاف" : "تشغيل"}
            className="p-2 xl:p-3 rounded-full bg-primary dark:bg-Muharram_primary text-white dark:text-Muharram_secondary hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 xl:w-6 xl:h-6" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4 xl:w-6 xl:h-6" fill="currentColor" />
            )}
          </button>

          <button
            type="button"
            onClick={() => skip(-SKIP_SECONDS)}
            aria-label="رجوع 10 ثوانٍ"
            className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
