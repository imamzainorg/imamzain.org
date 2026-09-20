import { normalizeArabic } from "../_config/explanation-segments";

const DIACRITIC_CHAR_RE = /[\u064B-\u065F\u0670\u0640]/;

/**
 * Splits `text` into React nodes, wrapping every diacritic-insensitive
 * match of `term` in <mark>. Pure React output — no `document`, no
 * `dangerouslySetInnerHTML` — so it's safe to call during SSR and never
 * causes a hydration mismatch: it simply renders the plain text until
 * `term` is available (which happens client-side, after ?highlight= is
 * read via useSearchParams), same as before.
 */
export function highlightPlain(
  text: string,
  term: string | undefined,
  keyPrefix: string,
): React.ReactNode {
  const trimmedTerm = term?.trim();
  if (!trimmedTerm) return text;

  const normalizedTerm = normalizeArabic(trimmedTerm.toLowerCase());
  if (!normalizedTerm) return text;

  const lowerText = text.toLowerCase();
  const normalizedText = normalizeArabic(lowerText);

  const indexMap: number[] = [];
  let ni = 0;
  for (let i = 0; i < lowerText.length; i++) {
    if (!DIACRITIC_CHAR_RE.test(lowerText[i])) {
      indexMap[ni] = i;
      ni++;
    }
  }
  indexMap[ni] = lowerText.length;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let searchIndex = 0;

  while (true) {
    const match = normalizedText.indexOf(normalizedTerm, searchIndex);
    if (match === -1) break;

    const start = indexMap[match];
    const end = indexMap[match + normalizedTerm.length];

    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    parts.push(
      <mark
        key={`${keyPrefix}-mark-${start}`}
        className="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded-sm"
      >
        {text.slice(start, end)}
      </mark>,
    );

    lastIndex = end;
    searchIndex = match + normalizedTerm.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : text;
}
