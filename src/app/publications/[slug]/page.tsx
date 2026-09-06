import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";
import { dataFetcher } from "@/lib/dataFetcher";
import BooklibraryCard from "../../library/_components/book-library-card";
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

  // كتب ذات صلة
  const relatedBooks = publications
    .filter((book) => book.slug !== publication.slug)
    .slice(0, 2);

  // كتب عشوائية
  const remainingBooks = publications.filter(
    (book) =>
      book.slug !== publication.slug &&
      !relatedBooks.some((b) => b.slug === book.slug),
  );

  const randomBooks = getRandomItems(remainingBooks, 2); // الآن هذا آمن

  // Other parts of the same series, including this one — the only thing
  // BookCard needs from the full catalog.
  const seriesParts = publication.series
    ? publications.filter((book) => book.series === publication.series)
    : [];

  return (
    <div className="md:container space-y-16 my-12 max-w-screen-xl mx-auto px-4">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />

      <BookCard publication={publication} seriesParts={seriesParts} />

      {/* كتب ذات صلة */}
      <div className="smart-library">
        <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
          كتب ذات صلة
        </h2>
        <div className="bg-secondary dark:bg-Muharram_primary bg-opacity-10 dark:bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
          {[...relatedBooks, ...randomBooks].map((libraryBook) => (
            <BooklibraryCard
              route="/publications"
              key={libraryBook.id}
              publication={libraryBook}
              downloadable
            />
          ))}
        </div>
      </div>
    </div>
  );
}
