"use client";

import { memo, useCallback, useRef } from "react";

import type { AudioItemLight } from "@/types/audio";
import { BREAKPOINTS, type BreakpointKey } from "../../hooks/useWaveform";
import {
  PlayButton,
  StatusBadge,
  VolumeControl,
  ToolButtons,
} from "./AudioControls";

interface AudioCardProps {
  item: AudioItemLight;
  isActive: boolean;
  isShared?: boolean;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  duration?: number;
 
  onPlayPause: (item: AudioItemLight) => void;
  onSeek: (item: AudioItemLight, pct: number) => void;
  onVolumeChange: (itemId: number, value: number) => void;
  setCanvasRef: (
    itemId: number,
    bpKey: BreakpointKey,
    el: HTMLCanvasElement | null,
  ) => void;
}

const AudioCard = memo(function AudioCard({
  item,
  isActive,
  isShared,
  isPlaying,
  currentTime,
  duration,
  volume,            
  onPlayPause,
  onSeek,
  onVolumeChange,      
  setCanvasRef,
}: AudioCardProps) {
  const isDragging = useRef(false);
  const didDrag = useRef(false);

  const handleSeekClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDragging.current) return;
      if (didDrag.current) {
        didDrag.current = false;
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      onSeek(item, pct);
    },
    [item, onSeek],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      isDragging.current = true;
      didDrag.current = false;

      const canvas = e.currentTarget;

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;

        didDrag.current = true;

        const rect = canvas.getBoundingClientRect();
        const pct = Math.max(
          0,
          Math.min(1, (ev.clientX - rect.left) / rect.width),
        );
        onSeek(item, pct);
      };

      const onUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [item, onSeek],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = e.currentTarget;

      const seek = (clientX: number) => {
        const rect = canvas.getBoundingClientRect();
        const pct = Math.max(
          0,
          Math.min(1, (clientX - rect.left) / rect.width),
        );
        onSeek(item, pct);
      };

      seek(e.touches[0].clientX);

      const onMove = (ev: TouchEvent) => seek(ev.touches[0].clientX);

      const onEnd = () => {
        window.removeEventListener("touchmove", onMove);
        window.removeEventListener("touchend", onEnd);
      };

      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("touchend", onEnd);
    },
    [item, onSeek],
  );

  return (
    <article
      id={`audio-card-${item.id}`}
      className={`
        relative scroll-mt-40 rounded-3xl border-2 bg-white dark:bg-Muharram_primary p-5 sm:p-6 transition-all duration-500
        w-full justify-between flex flex-col
        ${isShared ? "!border-secondary dark:!border-Muharram_secondary" : ""}
        ${
          isActive
            ? "border-primary dark:border-Muharram_secondary shadow-lg shadow-primary/10 dark:shadow-Muharram_secondary/20"
            : "border-primary/15 hover:border-primary/40 dark:border-white/10"
        }
      `}
    >
      {/* Title */}
      <div className="mb-3">
        <h3
          className={`text-lg font-bold leading-8 transition-colors ${
            isActive ? "text-primary dark:text-Muharram_secondary" : "text-slate-800 dark:text-white"
          }`}
        >
          {item.title}
        </h3>

        {item.speaker && (
          <p className="text-subtitle text-slate-500 dark:text-slate-300 mt-1 truncate">
            {item.speaker}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <ToolButtons item={item} />

        <div className="flex-1 min-w-0">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.key} className={`w-full ${bp.show}`}>
              <canvas
                ref={(el) => setCanvasRef(item.id, bp.key, el)}
                className="w-full block rounded-lg cursor-pointer"
                style={{ height: "52px" }}
                onClick={handleSeekClick}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              />
            </div>
          ))}
        </div>

        <PlayButton
          isActive={isActive}
          isPlaying={isPlaying}
          onClick={() => onPlayPause(item)}
        />
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between border-t border-secondary/30 pt-4">
        <StatusBadge currentTime={currentTime} duration={duration} />

        <VolumeControl
          volume={volume}
          onChange={(v) => onVolumeChange(item.id, v)}
        />
      </div>
    </article>
  );
});

export default AudioCard;
