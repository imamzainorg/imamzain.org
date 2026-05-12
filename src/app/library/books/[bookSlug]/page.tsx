import { notFound } from "next/navigation";
import { Book } from "@/types/book";
import { dataFetcher } from "@/lib/dataFetcher";
import BookDetailClient from "./_components/book-detail-client";

export const revalidate = 300;

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default async function Page({
  params,
}: {
  params: Promise<{ bookSlug: string }>;
}) {
  const { bookSlug } = await params;
  const books = await dataFetcher<Book[]>("books.json");
  const book = books.find((item) => item.slug === bookSlug);

  if (!book) {
    notFound();
  }

  // Related books by author / printHouse / otherNames / language match
  const related = books
    .filter((item) => item.id !== book.id)
    .map((item) => {
      let score = 0;
      if (
        item.printHouse?.trim().toLowerCase() ===
        book.printHouse?.trim().toLowerCase()
      )
        score += 5;
      if (
        item.author?.trim().toLowerCase() === book.author?.trim().toLowerCase()
      )
        score += 4;
      if (
        item.otherNames?.some((name) => book.otherNames?.includes(name))
      )
        score += 3;
      if (item.language === book.language) score += 1;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const excludedIds = [book.id, ...related.map((b) => b.id)];
  const remainingBooks = books.filter((item) => !excludedIds.includes(item.id));
  const random = shuffleArray(remainingBooks).slice(0, 2);
  const showcaseBooks = [...related, ...random];

  return (
    <BookDetailClient
      book={book}
      libraryBooks={books}
      showcaseBooks={showcaseBooks}
    />
  );
}
