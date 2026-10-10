import type { Book } from "@/types/book";

export type BookFilterKey = "category" | "author" | "publisher" | "conferences";
export type BookFilterValues = Record<BookFilterKey, string>;
export type BookFilterOptions = Record<BookFilterKey, string[]>;

export type BookFilters = BookFilterValues & {
  query: string;
  sort: string;
  page: number;
};

const toArray = (value?: string | string[]): string[] =>
  !value ? [] : Array.isArray(value) ? value : [value];

export function parseBookFilters(
  params: Pick<URLSearchParams, "get">,
): BookFilters {
  return {
    query: params.get("q") || "",
    author: params.get("author") || "",
    publisher: params.get("publisher") || "",
    category: params.get("category") || "",
    conferences: params.get("conferences") || "",
    sort: params.get("sort") || "latest",
    page: Math.max(1, Number(params.get("page")) || 1),
  };
}

export function getBookFilterOptions(books: Book[]): BookFilterOptions {
  const uniqueSorted = (pick: (book: Book) => string | string[] | undefined) =>
    Array.from(new Set(books.flatMap((book) => toArray(pick(book))))).sort();

  return {
    category: uniqueSorted((book) => book.category),
    author: uniqueSorted((book) => book.author),
    publisher: uniqueSorted((book) => book.printHouse),
    conferences: uniqueSorted((book) => book.Conferences),
  };
}

const includesIgnoreCase = (values: string[], wanted: string) =>
  values.some((value) => value.toLowerCase() === wanted.toLowerCase());

function matchesFilters(book: Book, filters: BookFilters): boolean {
  if (filters.query) {
    const searchable = [book.title, ...toArray(book.author), book.printHouse]
      .join(" ")
      .toLowerCase();
    if (!searchable.includes(filters.query.toLowerCase())) return false;
  }
  if (filters.author && !includesIgnoreCase(toArray(book.author), filters.author))
    return false;
  if (filters.publisher && book.printHouse !== filters.publisher) return false;
  if (
    filters.category &&
    !includesIgnoreCase(toArray(book.category), filters.category)
  )
    return false;
  if (
    filters.conferences &&
    !includesIgnoreCase(toArray(book.Conferences), filters.conferences)
  )
    return false;

  // الكتب متعددة الأجزاء تظهر بجزئها الأول فقط
  return book.partNumber === 1 || !book.totalParts;
}

const printTime = (book: Book) =>
  book.printDate ? new Date(book.printDate).getTime() : 0;

export function getVisibleBooks(books: Book[], filters: BookFilters): Book[] {
  const visible = books.filter((book) => matchesFilters(book, filters));

  return visible.sort((a, b) =>
    filters.sort === "common"
      ? (b.views || 0) - (a.views || 0)
      : printTime(b) - printTime(a),
  );
}
