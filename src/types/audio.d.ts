export type AudioItem = {
  id: number;
  title: string;
  speaker: string;
  audio: string;
  pdf?: string;
  category?: string[];
  duration?: string;
  durationSeconds?: number; 
  size?: string;
  sizeMB?: number; 
  bitrate?: number;
  createdAt?: string;
  searchText?: string;
  peaks?: number[];
};