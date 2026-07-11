"use client";

import { memo, useCallback, useRef } from "react";

import type { AudioItem } from "@/types/audio";
import { BREAKPOINTS, type BreakpointKey } from "../../hooks/useWaveform";
import {
  PlayButton,
  StatusBadge,
  VolumeControl,
  ToolButtons,
} from "./AudioControls";

interface AudioCardProps {
  item: AudioItem;
  isActive: boolean;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  duration?: number;
 
  onPlayPause: (item: AudioItem) => void;
  onSeek: (item: AudioItem, pct: number) => void;
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
        rounded-2xl border bg-white dark:bg-Muharram_primary p-4 sm:p-5 transition-all duration-300
        w-full justify-between flex flex-col
        ${
          isActive
            ? "border-primary/50 dark:border-Muharram_secondary/50  shadow-lg dark:shadow-Muharram_secondary/20 shadow-primary/20 ring-1 ring-secondary/30"
            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
        }
      `}
    >
      {/* Title */}
      <div className="mb-3">
        <h3
          className={`text-subtitle font-bold transition-colors ${
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
      <div className="mt-3 pt-3 border-t flex justify-between border-slate-100">
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
