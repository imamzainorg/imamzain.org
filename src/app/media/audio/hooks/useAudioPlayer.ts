// hooks/useAudioPlayer.ts
"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { AudioItem } from "@/types/audio";

export interface AudioPlayerState {
  activeId: number | null;
  isPlaying: boolean;
  currentTimes: Record<number, number>;
  volumes: Record<number, number>;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimes , setCurrentTimes] = useState<Record<number, number>>({});
  const [volumes, setVolumes] = useState<Record<number, number>>({});

  // ─── cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // ─── RAF progress loop ────────────────────────────────────────────────────
  const startLoop = useCallback(
    (itemId: number, onProgress: (progress: number, currentTime: number) => void) => {
      cancelAnimationFrame(rafRef.current);
      const tick = () => {
        const audio = audioRef.current;
        if (!audio || audio.paused) return;
        const progress = audio.duration ? audio.currentTime / audio.duration : 0;
        onProgress(progress, audio.currentTime);
        setCurrentTimes((prev) => ({ ...prev, [itemId]: audio.currentTime }));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    []
  );

  const stopLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  // ─── Play / Pause ─────────────────────────────────────────────────────────
  const playPause = useCallback(
    (
      item: AudioItem,
      onProgress: (progress: number, currentTime: number) => void,
      onStop: (itemId: number) => void
    ) => {
      // Same item toggle
      if (activeId === item.id) {
        if (isPlaying) {
          audioRef.current?.pause();
          stopLoop();
          setIsPlaying(false);
        } else {
          audioRef.current?.play();
          setIsPlaying(true);
          startLoop(item.id, onProgress);
        }
        return;
      }

      // Stop previous
      cancelAnimationFrame(rafRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      }

      if (activeId !== null) {
        onStop(activeId);
        setCurrentTimes((prev) => ({ ...prev, [activeId]: 0 }));
      }

      const audio = new Audio(item.audio);
      audio.volume = volumes[item.id] ?? 1;
      audioRef.current = audio;

      audio
        .play()
        .then(() => {
          setActiveId(item.id);
          setIsPlaying(true);
          startLoop(item.id, onProgress);
        })
        .catch(console.error);

      audio.onended = () => {
        cancelAnimationFrame(rafRef.current);
        onStop(item.id);
        setCurrentTimes((prev) => ({ ...prev, [item.id]: 0 }));
        setIsPlaying(false);
        setActiveId(null);
      };

      audio.onerror = () => {
        setIsPlaying(false);
      };
    },
    [activeId, isPlaying, volumes, startLoop, stopLoop]
  );

  // ─── Seek ─────────────────────────────────────────────────────────────────
  const seek = useCallback(
    (
      item: AudioItem,
      pct: number,
      onProgress: (progress: number, currentTime: number) => void
    ) => {
      const audio = audioRef.current;
      if (activeId !== item.id || !audio?.duration || isNaN(audio.duration)) return;
      audio.currentTime = audio.duration * pct;
      onProgress(pct, audio.currentTime);
      setCurrentTimes((prev) => ({ ...prev, [item.id]: audio.currentTime }));
    },
    [activeId]
  );

  // ─── Volume ───────────────────────────────────────────────────────────────
  const setVolume = useCallback(
    (itemId: number, value: number) => {
      setVolumes((prev) => ({ ...prev, [itemId]: value }));
      if (audioRef.current && activeId === itemId) {
        audioRef.current.volume = value;
      }
    },
    [activeId]
  );

  return {
    activeId,
    isPlaying,
    currentTimes,
    volumes,
    playPause,
    seek,
    setVolume,
    isDragging,
  };
}
