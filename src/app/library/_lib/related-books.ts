import type { Book } from "@/types/book";

const RELATED_COUNT = 2;
const RANDOM_COUNT = 2;

// القيم الفارغة لا تُعدّ تطابقًا بين كتابين
const sameText = (a?: unknown, b?: unknown) =>
  typeof a === "string" &&
  typeof b === "string" &&
  !!a.trim() &&
  a.trim().toLowerCase() === b.trim().toLowerCase();

function relatednessScore(candidate: Book, book: Book): number {
  let score = 0;
  if (sameText(candidate.printHouse, book.printHouse)) score += 5;
  if (sameText(candidate.author, book.author)) score += 4;
  if (candidate.otherNames?.some((name) => book.otherNames?.includes(name)))
    score += 3;
  if (sameText(candidate.language, book.language)) score += 1;
  return score;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** The most related books first, then random ones to fill the showcase. */
export function getShowcaseBooks(book: Book, books: Book[]): Book[] {
  const others = books.filter((item) => item.id !== book.id);

  const related = others
    .map((item) => ({ item, score: relatednessScore(item, book) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, RELATED_COUNT)
    .map(({ item }) => item);

  const relatedIds = new Set(related.map((item) => item.id));
  const random = shuffle(
    others.filter((item) => !relatedIds.has(item.id)),
  ).slice(0, RANDOM_COUNT);

  return [...related, ...random];
}
