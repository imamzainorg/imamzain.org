import type { Explanation } from "@/types/imamzain-legacy";
import { buildIndexMap, normalizeArabic } from "../_lib/arabic-text";
import { hasText } from "../_lib/explanation-utils";

export type TextSegment =
  | { type: "text"; key: string; content: string }
  | {
      type: "explanation";
      key: string;
      /** The original-text slice (with its own diacritics) being explained. */
      content: string;
      /** One or more explanations that apply to this exact span (same word, multiple authors). */
      explanations: Explanation[];
      start: number;
      end: number;
    };

export type ExplanationMatchWarning = {
  phraseId: string;
  explanationId: number;
  text: string;
  reason: "not-found" | "occurrence-out-of-range" | "overlapped-by-longer-match";
};

export type SegmentResult = {
  segments: TextSegment[];
  /** ids of explanations that ended up placed inline in `segments`. */
  inlineExplanationIds: Set<number>;
  warnings: ExplanationMatchWarning[];
};

function findOccurrences(
  normalizedContent: string,
  normalizedNeedle: string,
): Array<{ startNorm: number; endNorm: number }> {
  if (!normalizedNeedle) return [];
  const ranges: Array<{ startNorm: number; endNorm: number }> = [];
  let searchFrom = 0;
  while (true) {
    const idx = normalizedContent.indexOf(normalizedNeedle, searchFrom);
    if (idx === -1) break;
    ranges.push({ startNorm: idx, endNorm: idx + normalizedNeedle.length });
    searchFrom = idx + normalizedNeedle.length;
  }
  return ranges;
}

/**
 * Turns `content` + `explanations` into ordered text/explanation segments for
 * React rendering. `content` is only sliced, never altered.
 *
 * - An explanation goes inline only with a non-empty `text` and `content`.
 * - No `occurrence` → applies to every occurrence of `text` (never guesses "the first").
 * - `occurrence` set → only that 1-based occurrence.
 * - Overlaps: the longer span wins; identical spans merge (several authors, one word).
 * - Anything that can't be placed inline (not found, occurrence out of range, or
 *   lost to a longer span) is reported in `warnings` and left out of
 *   `inlineExplanationIds`, so the caller can still list it below the text.
 */
export function buildExplanationSegments(
  phraseId: string,
  content: string,
  explanations: Explanation[] | undefined,
): SegmentResult {
  const warnings: ExplanationMatchWarning[] = [];

  const candidates = (explanations ?? []).filter(
    (e) => hasText(e.content) && hasText(e.text),
  );

  const empty: SegmentResult = {
    segments: [{ type: "text", key: "text-0", content }],
    inlineExplanationIds: new Set(),
    warnings,
  };

  if (candidates.length === 0) return empty;

  const lowerContent = content.toLowerCase();
  const normalizedContent = normalizeArabic(lowerContent);
  const indexMap = buildIndexMap(lowerContent);

  type RawMatch = { start: number; end: number; explanation: Explanation };
  const rawMatches: RawMatch[] = [];

  for (const explanation of candidates) {
    const needle = normalizeArabic(explanation.text!.toLowerCase());
    const occurrences = findOccurrences(normalizedContent, needle);

    if (occurrences.length === 0) {
      warnings.push({
        phraseId,
        explanationId: explanation.id,
        text: explanation.text!,
        reason: "not-found",
      });
      continue;
    }

    let selected = occurrences;
    if (typeof explanation.occurrence === "number") {
      const one = occurrences[explanation.occurrence - 1];
      if (!one) {
        warnings.push({
          phraseId,
          explanationId: explanation.id,
          text: explanation.text!,
          reason: "occurrence-out-of-range",
        });
        continue;
      }
      selected = [one];
    }

    for (const occ of selected) {
      rawMatches.push({
        start: indexMap[occ.startNorm],
        end: indexMap[occ.endNorm],
        explanation,
      });
    }
  }

  if (rawMatches.length === 0) {
    return { ...empty, warnings };
  }

  // Group matches that share the exact same span (same word, multiple authors).
  type SpanGroup = { start: number; end: number; explanations: Explanation[] };
  const spanMap = new Map<string, SpanGroup>();
  for (const m of rawMatches) {
    const key = `${m.start}:${m.end}`;
    const existing = spanMap.get(key);
    if (existing) existing.explanations.push(m.explanation);
    else spanMap.set(key, { start: m.start, end: m.end, explanations: [m.explanation] });
  }
  const groups = Array.from(spanMap.values());

  // Deterministic, longest-span-wins overlap resolution.
  const priority = [...groups].sort(
    (a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start,
  );
  const accepted: SpanGroup[] = [];
  for (const g of priority) {
    const overlaps = accepted.some((a) => g.start < a.end && g.end > a.start);
    if (!overlaps) accepted.push(g);
  }
  accepted.sort((a, b) => a.start - b.start);

  const inlineExplanationIds = new Set<number>();
  for (const g of accepted) for (const e of g.explanations) inlineExplanationIds.add(e.id);

  for (const candidate of candidates) {
    const alreadyWarned = warnings.some((w) => w.explanationId === candidate.id);
    if (!alreadyWarned && !inlineExplanationIds.has(candidate.id)) {
      warnings.push({
        phraseId,
        explanationId: candidate.id,
        text: candidate.text!,
        reason: "overlapped-by-longer-match",
      });
    }
  }

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const g of accepted) {
    if (g.start > cursor) {
      segments.push({ type: "text", key: `text-${cursor}`, content: content.slice(cursor, g.start) });
    }
    segments.push({
      type: "explanation",
      key: `exp-${g.start}-${g.end}`,
      content: content.slice(g.start, g.end),
      explanations: g.explanations,
      start: g.start,
      end: g.end,
    });
    cursor = g.end;
  }
  if (cursor < content.length) {
    segments.push({ type: "text", key: `text-${cursor}`, content: content.slice(cursor) });
  }

  return { segments, inlineExplanationIds, warnings };
}
