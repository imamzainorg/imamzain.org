import Breadcrumbs from "@/components/breadcrumb";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";
import { dataFetcher } from "@/lib/dataFetcher";
import BookCarousel from "@/components/book-carousel";
import BookCard from "@/components/book-card";

export const dynamicParams = false;

export async function generateStaticParams() {
  const books = await dataFetcher<Book[]>("books.json");
  return books.map((book) => ({ slug: book.slug }));
}

function getRandomItems<T>(array: T[], count: number) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = (await dataFetcher<Book[]>("books.json")).find((item) => item.slug === slug);
  if (!book) return {};
  const description = book.description || `${book.title}${book.author ? " - " + book.author : ""}`;
  const url = `/publications/${book.slug}`;
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const publications = await dataFetcher<Book[]>("books.json");

  const publication: Book | undefined = publications.find(
    (book) => book.slug === slug,
  );

  if (!publication) {
    return redirect("/404");
  }

  // Related books: same category first, then the rest, in a random order. Other parts of the
  // book's own series are already on the page.
  const others = getRandomItems(
    publications.filter((book) => book.slug !== publication.slug && (!publication.series || book.series !== publication.series)),
    publications.length,
  )
  const shared = (book: Book) => book.category?.some((name) => publication.category?.includes(name)) ?? false
  const relatedBooks = [...others.filter(shared), ...others.filter((book) => !shared(book))].slice(0, 12)

  // Other parts of the same series, including this one — the only thing
  // BookCard needs from the full catalog.
  const seriesParts = publication.series
    ? publications.filter((book) => book.series === publication.series)
    : [];

  return (
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />

      <BookCard publication={publication} seriesParts={seriesParts} />

      <div className="pt-24">
        <BookCarousel title="كتب ذات صلة" books={relatedBooks} route="/publications" />
      </div>
    </div>
  );
}
