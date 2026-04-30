import { AudioItem } from "@/types/audio";

export function fmtTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function fmtBytes(bytes: string | null): string | null {
  if (!bytes) return null;
  const mb = parseInt(bytes) / 1048576;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(mb * 1024).toFixed(0)} KB`;
}

export function getUniqueLetters(items: AudioItem[]): string[] {
  const letters = new Set<string>();
  items.forEach((i) => {
    const first = i.title.trim()[0];
    if (first) letters.add(first);
  });
  return Array.from(letters).sort((a, b) => a.localeCompare(b, "ar"));
}
