"use client";

import { useSyncExternalStore } from "react";
import {
  getExplanationMode,
  getOpenExplanation,
  subscribeExplanation,
  subscribeExplanationMode,
  type ExplanationMode,
  type OpenExplanation,
} from "../_lib/explanation-store";

export function useExplanationMode(): ExplanationMode {
  return useSyncExternalStore(
    subscribeExplanationMode,
    getExplanationMode,
    () => "reading",
  );
}

export function useOpenExplanation(): OpenExplanation | null {
  return useSyncExternalStore(
    subscribeExplanation,
    getOpenExplanation,
    () => null,
  );
}
