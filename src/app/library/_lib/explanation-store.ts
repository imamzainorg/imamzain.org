import type { Explanation } from "@/types/imamzain-legacy";

export type ExplanationMode = "reading" | "explanations";

export type OpenExplanation = {
  segmentKey: string;
  text: string;
  explanations: Explanation[];
  highlightTerm?: string;
};

function createStore<T>(initialValue: T) {
  let value = initialValue;
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

const modeStore = createStore<ExplanationMode>("reading");
const openStore = createStore<OpenExplanation | null>(null);

export const getExplanationMode = modeStore.get;
export const setExplanationMode = modeStore.set;
export const subscribeExplanationMode = modeStore.subscribe;

export const getOpenExplanation = openStore.get;
export const subscribeExplanation = openStore.subscribe;
export const closeExplanation = () => openStore.set(null);
export function openExplanation(state: OpenExplanation): void {
  openStore.set(state);
}

// آخر مصدر اختاره المستخدم لكل كلمة/جملة مشروحة خلال هذه الجلسة
const lastSourceIndex = new Map<string, number>();

export const getLastSourceIndex = (segmentKey: string): number =>
  lastSourceIndex.get(segmentKey) ?? 0;

export const setLastSourceIndex = (segmentKey: string, index: number): void => {
  lastSourceIndex.set(segmentKey, index);
};
