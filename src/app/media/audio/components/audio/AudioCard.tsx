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
  duration?: number;
  volume: number;
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

  const handleSeekClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isActive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      onSeek(item, pct);
    },
    [isActive, item, onSeek],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isActive) return;
      isDragging.current = true;
      const canvas = e.currentTarget;

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
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
    [isActive, item, onSeek],
  );

  return (
    <article
      id={`audio-card-${item.id}`}
      className={`
        rounded-2xl border bg-white p-4 sm:p-5 transition-all duration-300
        w-full lg:w-[40rem] xl:w-[55rem] 2xl:w-[70rem]
        ${
          isActive
            ? "border-primary/50 shadow-lg shadow-primary/20 ring-1 ring-secondary/30"
            : "border-slate-200 hover:border-slate-300 hover:shadow-md"
        }
      `}
    >
      {/* Title + Speaker */}
      <div className="mb-3">
        <h3
          className={`text-note font-bold lg:leading-8 leading-6 transition-colors ${isActive ? "text-primary" : "text-slate-800"}`}
        >
          {item.title}
        </h3>
        {item.speaker && (
          <p className="text-subtitle text-slate-500 mt-1 md:mt-4 truncate">
            {item.speaker}
          </p>
        )}
      </div>

      {/* Player Row: Play | Waveform | Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-shrink-0 flex items-center gap-0.5">
          <VolumeControl
            itemId={item.id}
            volume={volume}
            onVolumeChange={onVolumeChange}
          />
          <ToolButtons item={item} />
        </div>
        {/* Waveform */}
        <div className="flex-1 min-w-0">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.key} className={`w-full ${bp.show}`}>
              <canvas
                ref={(el) => setCanvasRef(item.id, bp.key, el)}
                className={`w-full block rounded-lg ${isActive ? "cursor-pointer" : "cursor-default"}`}
                style={{ height: "52px" }}
                onClick={handleSeekClick}
                onMouseDown={handleMouseDown}
              />
            </div>
          ))}
        </div>
        <div className="flex-shrink-0">
          <PlayButton
            isActive={isActive}
            isPlaying={isPlaying}
            onClick={() => onPlayPause(item)}
          />
        </div>
        {/* Volume + Tools */}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <StatusBadge
          isActive={isActive}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          size={item.size}
        />
      </div>
    </article>
  );
});

export default AudioCard;
