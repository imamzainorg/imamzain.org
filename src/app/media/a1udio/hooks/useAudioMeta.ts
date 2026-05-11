"use client";

import { useState, useEffect } from "react";
import { AudioItem } from "@/types/audio";
import { fmtTime, fmtBytes } from "../utils/audio";

export function useAudioMeta(audioData: AudioItem[]) {
  const [durations, setDurations] = useState<Record<number, string>>({});
  const [sizes, setSizes] = useState<Record<number, string>>({});

  // Load durations
  useEffect(() => {
    const dur: Record<number, string> = {};
    let done = 0;
    const total = audioData.length;

    audioData.forEach((item) => {
      if (item.duration) {
        dur[item.id] = item.duration;
        if (++done === total) setDurations({ ...dur });
        return;
      }
      const a = new Audio();
      a.preload = "metadata";
      a.onloadedmetadata = () => {
        const s = a.duration;
        if (isFinite(s) && s > 0) dur[item.id] = fmtTime(s);
        if (++done === total) setDurations({ ...dur });
      };
      a.onerror = () => {
        if (++done === total) setDurations({ ...dur });
      };
      a.src = item.audio;
    });
  }, [audioData]);

  // Load file sizes
  useEffect(() => {
    const sz: Record<number, string> = {};
    let done = 0;
    const total = audioData.length;

    audioData.forEach((item) => {
      fetch(item.audio, { method: "HEAD" })
        .then((res) => {
          const f = fmtBytes(res.headers.get("content-length"));
          if (f) sz[item.id] = f;
        })
        .catch(() => {})
        .finally(() => {
          if (++done === total) setSizes({ ...sz });
        });
    });
  }, [audioData]);

  return { durations, sizes };
}
