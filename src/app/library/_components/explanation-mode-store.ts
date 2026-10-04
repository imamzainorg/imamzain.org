export type ExplanationMode = "reading" | "explanations";

let mode: ExplanationMode = "reading";
const listeners = new Set<() => void>();

export function getExplanationMode(): ExplanationMode {
  return mode;
}

export function setExplanationMode(next: ExplanationMode): void {
  if (next === mode) return;
  mode = next;
  listeners.forEach((listener) => listener());
}

export function subscribeExplanationMode(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}