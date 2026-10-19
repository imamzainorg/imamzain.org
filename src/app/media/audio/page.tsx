import type { AudioItem, AudioItemLight } from "@/types/audio";
import { Suspense } from "react";
import audioData from "@/data/AudioItemAnalyzed.json";
import AudioLibrary from "./_components/audio-library";

// The `peaks` waveform-sample arrays make up ~67% of AudioItemAnalyzed.json's
// bytes but are only needed for the recording being played. Strip them
// here so they never enter the RSC flight payload for this "use client" tree;
// the recording being played fetches its own from /api/audio-peaks/[id]
// (see _lib/use-peaks.ts).
function stripPeaks(item: AudioItem): AudioItemLight {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructuring is the omission
  const { peaks: _peaks, ...rest } = item;
  return rest;
}

export default function Page() {
  const items: AudioItemLight[] = (audioData as AudioItem[]).map(stripPeaks);

  // The list reads ?id= (a shared recording), which needs a Suspense boundary in a static export.
  return (
    <Suspense>
      <AudioLibrary items={items} />
    </Suspense>
  );
}
