import type { SearchIndexEntry } from "@/types/imamzain-legacy";
import { buildIndexMap, normalizeArabic } from "./arabic-text";

export type SearchResult = Omit<SearchIndexEntry, "phrases"> & {
  phraseId: string;
  matchedText: string;
};

export const MIN_QUERY_LENGTH = 2;

const PREVIEW_LENGTH = 150;
const SNIPPET_CONTEXT = 60;

const fold = (text: string) => normalizeArabic(text.toLowerCase());

function toResult(
  entry: SearchIndexEntry,
  phraseId: string,
  matchedText: string,
): SearchResult {
  return {
    dictionaryId: entry.dictionaryId,
    dictionaryTitle: entry.dictionaryTitle,
    dictionarySlug: entry.dictionarySlug,
    subjectId: entry.subjectId,
    subjectTitle: entry.subjectTitle,
    subjectSlug: entry.subjectSlug,
    phraseId,
    matchedText,
  };
}

function leadingPreview(text: string): string {
  return text.length > PREVIEW_LENGTH
    ? `${text.substring(0, PREVIEW_LENGTH)}...`
    : text;
}

function snippetAround(text: string, matchStart: number, matchEnd: number) {
  const start = Math.max(0, matchStart - SNIPPET_CONTEXT);
  const end = Math.min(text.length, matchEnd + SNIPPET_CONTEXT);
  return `${start > 0 ? "..." : ""}${text.substring(start, end)}${end < text.length ? "..." : ""}`;
}

/**
 * Subject-title match → first phrase as preview. Otherwise the first phrase
 * containing the query, with a snippet around the match. One result per subject.
 */
export function searchIndex(
  index: SearchIndexEntry[],
  query: string,
): SearchResult[] {
  const term = fold(query.trim());
  if (term.length < MIN_QUERY_LENGTH) return [];

  const results: SearchResult[] = [];

  for (const entry of index) {
    if (fold(entry.subjectTitle).includes(term)) {
      const firstPhrase = entry.phrases[0];
      if (firstPhrase) {
        results.push(
          toResult(entry, firstPhrase.id, leadingPreview(firstPhrase.text)),
        );
      }
      continue;
    }

    for (const phrase of entry.phrases) {
      const lowerText = phrase.text.toLowerCase();
      const matchIndex = normalizeArabic(lowerText).indexOf(term);
      if (matchIndex === -1) continue;

      // مواضع النص المُطبَّع تختلف عن الأصلي عند وجود التشكيل، لذا نعيدها للأصل
      const indexMap = buildIndexMap(lowerText);
      results.push(
        toResult(
          entry,
          phrase.id,
          snippetAround(
            phrase.text,
            indexMap[matchIndex],
            indexMap[matchIndex + term.length],
          ),
        ),
      );
      break;
    }
  }

  return results;
}
