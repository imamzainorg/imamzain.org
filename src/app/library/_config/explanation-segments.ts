import type { Explanation } from "@/types/imamzain-legacy";

/**
 * Characters stripped only for MATCHING purposes — never for display.
 * Same tashkil range already used elsewhere in the app (subject-view's old
 * highlightContent, collection-search's highlightText), plus tatweel
 * (\u0640), which is purely a justification character with no meaning.
 * Deliberately does NOT fold hamza forms or alef/ya variants: that would
 * risk linking an explanation to a *different* word that merely looks
 * similar once stripped.
 */
const DIACRITIC_CHAR_RE = /[\u064B-\u065F\u0670\u0640]/;
const DIACRITICS_GLOBAL_RE = /[\u064B-\u065F\u0670\u0640]/g;

export function normalizeArabic(text: string): string {
  return text.replace(DIACRITICS_GLOBAL_RE, "");
}

/** Maps every index of the normalized string back to the original string. */
function buildIndexMap(original: string): number[] {
  const map: number[] = [];
  let ni = 0;
  for (let i = 0; i < original.length; i++) {
    if (!DIACRITIC_CHAR_RE.test(original[i])) {
      map[ni] = i;
      ni++;
    }
  }
  map[ni] = original.length;
  return map;
}

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

function isNonEmpty(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

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
 * Turns `content` + `explanations` into an ordered list of text and
 * explanation segments, ready for React rendering — no HTML strings, no
 * DOM. `content` itself is never altered; only sliced.
 *
 * Rules (see the accompanying report for the full rationale):
 * - An explanation only becomes inline when it has both a non-empty
 *   `text` and a non-empty `content`.
 * - No `occurrence` → the explanation applies to every occurrence of
 *   `text` in the phrase (never guesses a single "first match").
 * - `occurrence` set → only that 1-based occurrence is used.
 * - Overlapping matches from different explanations: the longer span
 *   wins; a span exactly equal to another is merged (multiple
 *   explanations for the same word).
 * - Anything that can't be safely placed inline (text not found,
 *   occurrence out of range, or lost to a longer overlapping match) is
 *   reported in `warnings` and left out of `inlineExplanationIds`, so the
 *   caller can still show it in a fallback list — no explanation is ever
 *   silently dropped.
 */
export function buildExplanationSegments(
  phraseId: string,
  content: string,
  explanations: Explanation[] | undefined,
): SegmentResult {
  const warnings: ExplanationMatchWarning[] = [];

  const candidates = (explanations ?? []).filter(
    (e) => isNonEmpty(e.content) && isNonEmpty(e.text),
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
