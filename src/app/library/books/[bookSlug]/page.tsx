import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataFetcher } from "@/lib/dataFetcher";
import type { Book } from "@/types/book";
import { getShowcaseBooks } from "@/app/library/_lib/related-books";
import BookDetailClient from "./_components/book-detail-client";

export const dynamicParams = false;

export async function generateStaticParams() {
  const books = await dataFetcher<Book[]>("books.json");
  return books.map((book) => ({ bookSlug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookSlug: string }>;
}): Promise<Metadata> {
  const { bookSlug } = await params;
  const books = await dataFetcher<Book[]>("books.json");
  const book = books.find((item) => item.slug === bookSlug);
  if (!book) return {};

  const description =
    book.description || `${book.title}${book.author ? " - " + book.author : ""}`;
  const url = `/library/books/${book.slug}`;
  return {
    title: book.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "book", title: book.title, description, url, images: [book.image] },
    twitter: { card: "summary_large_image", title: book.title, description, images: [book.image] },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ bookSlug: string }>;
}) {
  const { bookSlug } = await params;
  const books = await dataFetcher<Book[]>("books.json");
  const book = books.find((item) => item.slug === bookSlug);

  if (!book) notFound();

  // الأجزاء الأخرى من نفس السلسلة (مع هذا الجزء): كل ما يحتاجه BookCard من الفهرس
  const seriesParts = book.series
    ? books.filter((item) => item.series === book.series)
    : [];

  return (
    <BookDetailClient
      book={book}
      seriesParts={seriesParts}
      showcaseBooks={getShowcaseBooks(book, books)}
    />
  );
}
