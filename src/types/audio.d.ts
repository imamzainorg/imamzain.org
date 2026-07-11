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