import type { AudioItem } from "@/types/audio";
import audioData from "@/data/AudioItemAnalyzed.json";
import AudioPageClient from "./components/AudioPageClient";

export default function Page() {
  return <AudioPageClient items={audioData as AudioItem[]} />;
}
