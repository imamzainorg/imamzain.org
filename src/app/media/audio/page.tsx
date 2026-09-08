import type { AudioItem, AudioItemLight } from "@/types/audio";
import audioData from "@/data/AudioItemAnalyzed.json";
import AudioPageClient from "./components/AudioPageClient";

// The `peaks` waveform-sample arrays make up ~67% of AudioItemAnalyzed.json's
// bytes but are only needed once an item's canvas actually mounts. Strip them
// here so they never enter the RSC flight payload for this "use client" tree;
// AudioPageClient's useWaveform hook fetches a given item's peaks on demand
// from /api/audio-peaks/[id] instead.
function stripPeaks(item: AudioItem): AudioItemLight {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructuring is the omission
  const { peaks: _peaks, ...rest } = item;
  return rest;
}

export default function Page() {
  const items: AudioItemLight[] = (audioData as AudioItem[]).map(stripPeaks);

  return <AudioPageClient items={items} />;
}
