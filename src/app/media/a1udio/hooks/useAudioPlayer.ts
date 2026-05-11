"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AudioItem } from "@/types/audio";

export function useAudioPlayer(filtered: AudioItem[]) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [rate, setRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Keep refs in sync so the "load" effect can read latest values
  // without depending on them reactively
  const volumeRef = useRef(volume);
  const rateRef = useRef(rate);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { rateRef.current = rate; }, [rate]);

  const handlePlay = useCallback(
    (item: AudioItem) => {
      if (currentSrc === item.audio) {
        setIsPlaying((p) => !p);
      } else {
        setCurrentSrc(item.audio);
        setCurrentTrack(item);
        setIsPlaying(true);
      }
    },
    [currentSrc]
  );

  // Load new src — reads rate/volume from refs, so no stale-closure risk
  // and no spurious reloads when the user tweaks volume/rate mid-playback
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !currentSrc) return;
    el.src = currentSrc;
    el.load();
    el.playbackRate = rateRef.current;
    el.volume = volumeRef.current;
    el.play().catch(() => {});
  }, [currentSrc]); // ✅ no warning, correct behavior

  // Play / pause
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) el.play().catch(() => {});
    else el.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate]);

  const skip = (secs: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(duration, el.currentTime + secs));
    setCurrentTime(el.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const closePlayer = () => {
    audioRef.current?.pause();
    setCurrentSrc(null);
    setCurrentTrack(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleEnded = useCallback(() => {
    const idx = filtered.findIndex((i) => i.audio === currentSrc);
    const next = filtered[idx + 1];
    if (next) handlePlay(next);
    else setIsPlaying(false);
  }, [filtered, currentSrc, handlePlay]);

  return {
    audioRef,
    currentSrc,
    currentTrack,
    isPlaying,
    volume,
    rate,
    currentTime,
    duration,
    setVolume,
    setRate,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    handlePlay,
    handleSeek,
    skip,
    closePlayer,
    handleEnded,
  };
}