// app/audio/page.tsx  (أو components/AudioWavePlayer.tsx)
"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { AudioItem } from "@/types/audio";
import audioData from "@/data/AudioItemAnalyzed.json";
import Breadcrumbs from "@/components/breadcrumb";

import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useWaveform } from "./hooks/useWaveform";
import { Suspense } from "react";
import AudioHero from "./components/audio/AudioHero";
import AudioList from "./components/audio/AudioList";

const ITEMS = audioData as AudioItem[];

function AudioWavePlayerContent() {
  const searchParams = useSearchParams();

  // ─── Waveform drawing ─────────────────────────────────────────────────────
  const { drawItem, setCanvasRef } = useWaveform(ITEMS);

  // ─── Progress callback (called from RAF loop) ─────────────────────────────
  const onProgress = useCallback(
    (itemId: number, progress: number) => {
      const item = ITEMS.find((i) => i.id === itemId);
      if (item) drawItem(item, progress, true);
    },
    [drawItem],
  );

  // ─── Stop callback (reset waveform) ───────────────────────────────────────
  const onStop = useCallback(
    (itemId: number) => {
      const item = ITEMS.find((i) => i.id === itemId);
      if (item) drawItem(item, 0, false);
    },
    [drawItem],
  );

  // ─── Audio player hook ────────────────────────────────────────────────────
const {
  activeId,
  isPlaying,
  currentTimes,
  volumes,
  playPause,
  seek,
  seekAndPlay,
  setVolume,
} = useAudioPlayer();
  // Wrap playPause to include callbacks
  const handlePlayPause = useCallback(
    (item: AudioItem) => {
      playPause(item, (progress) => onProgress(item.id, progress), onStop);
    },
    [playPause, onProgress, onStop],
  );

  // ─── Seek handler ─────────────────────────────────────────────────────────
const handleSeek = useCallback(
  (item: AudioItem, pct: number) => {
    if (activeId === item.id) {
      seek(item, pct, (progress) => {
        drawItem(item, progress, true);
      });
      return;
    }

    const duration = item.durationSeconds ?? 0;

    seekAndPlay(
      item,
      duration * pct,
      (progress) => onProgress(item.id, progress),
      onStop,
    );
  },
  [
    activeId,
    seek,
    seekAndPlay,
    drawItem,
    onProgress,
    onStop,
  ],
);

  // ─── Redraw active item on progress ───────────────────────────────────────
  // (waveform redraws happen inside RAF via onProgress callback above)

  // ─── URL param: auto-play ?id=X ──────────────────────────────────────────
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (!idParam) return;
    const id = parseInt(idParam, 10);
    const item = ITEMS.find((i) => i.id === id);
    if (!item) return;

    const timer = setTimeout(() => {
      handlePlayPause(item);
      const el = document.getElementById(`audio-card-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="pb-16" dir="rtl">
      <div className="container mx-auto  px-4 pt-5">
        {/* Breadcrumbs */}
        <div className="pb-4">
          <Breadcrumbs
            links={[
              { name: "الرئيسية", url: "/" },
              { name: "المكتبة الصوتية", url: "/audio" },
            ]}
          />
        </div>

        {/* Hero */}
     <AudioHero  />

        {/* List with search, filter, pagination */}
        <AudioList
          items={ITEMS}
          activeId={activeId}
          isPlaying={isPlaying}
          currentTimes={currentTimes}
          volumes={volumes}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={setVolume}
          setCanvasRef={setCanvasRef}
        />
      </div>
    </main>
  );
}
export default function AudioWavePlayer() {
  return (
    <Suspense fallback={null}>
      <AudioWavePlayerContent />
    </Suspense>
  );
}
