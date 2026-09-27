import type { Explanation } from "@/types/imamzain-legacy";

export type OpenExplanation = {
  segmentKey: string;
  text: string;
  explanations: Explanation[];
  highlightTerm?: string;
};

type Listener = (state: OpenExplanation | null) => void;

let currentOpen: OpenExplanation | null = null;
const listeners = new Set<Listener>();

export function openExplanation(state: OpenExplanation) {
  currentOpen = state;
  listeners.forEach((listener) => listener(currentOpen));
}

export function closeExplanation() {
  if (currentOpen === null) return;
  currentOpen = null;
  listeners.forEach((listener) => listener(currentOpen));
}

export function getOpenExplanation(): OpenExplanation | null {
  return currentOpen;
}

export function subscribeExplanation(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// تذكر آخر مصدر اختاره المستخدم لكل كلمة/جملة مشروحة خلال هذه الجلسة
const lastSourceIndex = new Map<string, number>();

export function getLastSourceIndex(segmentKey: string): number {
  return lastSourceIndex.get(segmentKey) ?? 0;
}

export function setLastSourceIndex(segmentKey: string, index: number) {
  lastSourceIndex.set(segmentKey, index);
}