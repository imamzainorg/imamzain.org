const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// Stripped for MATCHING only, never for display. Hamza and alef/ya variants are
// deliberately not folded: that could link an explanation to a different word
// that merely looks similar once stripped.
const DIACRITIC_RE = /[\u064B-\u065F\u0670\u0640]/;
const DIACRITICS_RE = new RegExp(DIACRITIC_RE.source, "g");

export function toArabicDigits(value: number): string {
  return String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);
}

export function normalizeArabic(text: string): string {
  return text.replace(DIACRITICS_RE, "");
}

/**
 * Maps every index of `normalizeArabic(original)` back to `original`.
 * The last entry is `original.length`, so exclusive end offsets map too.
 */
export function buildIndexMap(original: string): number[] {
  const map: number[] = [];
  for (let i = 0; i < original.length; i++) {
    if (!DIACRITIC_RE.test(original[i])) map.push(i);
  }
  map.push(original.length);
  return map;
}
