export type AudioItem = {
  id: number;
  title: string;
  speaker: string;
  audio: string;
  pdf?: string;
  durationSeconds?: number;
  sizeMB?: number;
  peaks?: number[];
};

// What actually crosses the server -> client prop boundary for the audio
// list page. It carries everything AudioItem has except the waveform
// `peaks` samples, which are the bulk of the dataset's bytes (~67%) but are
// only needed for the recording being played. Those are fetched on demand
// from /api/audio-peaks/[id] instead of shipping eagerly in the RSC payload
// for all items. See src/app/media/audio/_lib/use-peaks.ts.
export type AudioItemLight = Omit<AudioItem, "peaks">;