"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play } from "lucide-react";

type SubjectAudioPlayerProps = {
  src: string;
  /** يُستدعى عند تغيّر حالة التشغيل، ليعرف الشريط الخارجي أن الصوت يعمل. */
  onPlayingChange?: (isPlaying: boolean) => void;
};

const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const;
type PlaybackRate = (typeof PLAYBACK_RATES)[number];

const pad = (value: number) => String(value).padStart(2, "0");

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";

  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(secs)}`
    : `${pad(minutes)}:${pad(secs)}`;
}

const focusRingClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 dark:focus-visible:outline-Muharram_primary/70";

export default function SubjectAudioPlayer({
  src,
  onPlayingChange,
}: SubjectAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsLoaded(false);
    setHasError(false);
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
    setDuration(0);

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
      setHasError(false);
    };
    const handleTimeUpdate = () => {
      if (!isSeekingRef.current) setCurrentTime(audio.currentTime);
    };
    const handlePlay = () => setIsPlaying(true);
    const handleStop = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handleReady = () => setIsBuffering(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
      setIsBuffering(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handleStop);
    audio.addEventListener("ended", handleStop);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handleReady);
    audio.addEventListener("canplay", handleReady);
    audio.addEventListener("error", handleError);

    // قد تكتمل الميتاداتا قبل أن تُركَّب المستمعات (قبل الـ hydration)
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) handleLoadedMetadata();
    if (audio.error) handleError();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handleStop);
      audio.removeEventListener("ended", handleStop);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handleReady);
      audio.removeEventListener("canplay", handleReady);
      audio.removeEventListener("error", handleError);
    };
  }, [src]);

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // السرعة تعود للافتراضية عند تحميل مصدر جديد، فنثبّتها هنا
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.defaultPlaybackRate = playbackRate;
    audio.playbackRate = playbackRate;
  }, [playbackRate, src]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setHasError(true);
    }
  }

  function retry() {
    setHasError(false);
    audioRef.current?.load();
  }

  function seekTo(value: number) {
    setCurrentTime(value);
    if (audioRef.current) audioRef.current.currentTime = value;
  }

  function cycleRate() {
    const index = PLAYBACK_RATES.indexOf(playbackRate);
    setPlaybackRate(PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length]);
  }

  const startSeeking = () => {
    isSeekingRef.current = true;
  };
  const endSeeking = () => {
    isSeekingRef.current = false;
  };

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const isBusy = (!isLoaded && !hasError) || (isPlaying && isBuffering);

  return (
    // LTR ليتقدّم الصوت من اليسار إلى اليمين كما يتوقع المستمع
    <div dir="ltr" className="flex w-full items-center gap-2.5">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        onClick={() => void togglePlay()}
        disabled={!isLoaded}
        aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-200 hover:opacity-90 active:scale-90 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100 dark:bg-Muharram_primary dark:text-Muharram_secondary ${focusRingClass}`}
      >
        {isBusy ? (
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : isPlaying ? (
          <Pause className="h-4 w-4" fill="currentColor" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
        )}
      </button>

      {hasError ? (
        <div
          className="flex min-w-0 flex-1 items-center gap-2 text-xs text-red-600 dark:text-red-400"
          dir="rtl"
          role="alert"
        >
          <span className="truncate">تعذّر تحميل الصوت</span>
          <button
            type="button"
            onClick={retry}
            className={`shrink-0 rounded font-semibold underline underline-offset-2 ${focusRingClass}`}
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <>
          <span className="w-9 shrink-0 text-center text-[0.7rem] tabular-nums text-gray-500 dark:text-gray-400">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex h-5 min-w-0 flex-1 items-center">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => seekTo(Number(e.target.value))}
              onPointerDown={startSeeking}
              onPointerUp={endSeeking}
              onPointerCancel={endSeeking}
              onBlur={endSeeking}
              disabled={!isLoaded}
              aria-label="شريط التقدم"
              aria-valuetext={`${formatTime(currentTime)} من ${formatTime(duration)}`}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-not-allowed [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none"
            />
            <div className="pointer-events-none absolute inset-x-2 h-1 rounded-full bg-gray-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-200 ease-linear motion-reduce:transition-none dark:bg-Muharram_primary"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-2 h-0 peer-focus-visible:[&>span]:ring-4 peer-focus-visible:[&>span]:ring-primary/30 dark:peer-focus-visible:[&>span]:ring-Muharram_primary/40 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[left] duration-200 ease-linear motion-reduce:transition-none dark:bg-Muharram_primary"
                style={{ left: `${progress * 100}%` }}
              />
            </div>
          </div>

          <span className="w-9 shrink-0 text-center text-[0.7rem] tabular-nums text-gray-500 dark:text-gray-400">
            {formatTime(duration)}
          </span>
        </>
      )}

      <button
        type="button"
        onClick={cycleRate}
        aria-label={`سرعة التشغيل ${playbackRate}x، اضغط لتغييرها`}
        className={`h-7 w-10 shrink-0 rounded-full text-[0.7rem] font-semibold tabular-nums ring-1 transition-colors motion-reduce:transition-none ${focusRingClass} ${
          playbackRate !== 1
            ? "text-primary ring-primary/30 dark:text-Muharram_primary dark:ring-Muharram_primary/30"
            : "text-gray-500 ring-gray-200 hover:text-primary dark:text-gray-400 dark:ring-zinc-700 dark:hover:text-Muharram_primary"
        }`}
      >
        {playbackRate}x
      </button>
    </div>
  );
}