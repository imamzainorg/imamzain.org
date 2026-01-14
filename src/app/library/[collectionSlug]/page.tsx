import Breadcrumbs from "@/components/breadcrumb";
import CollectionHero from "../_components/collection-hero";
import BookSearch from "../_components/book-search";
import Link from "next/link";
import { collections } from "../_config/collections";
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const { collectionSlug } = await params;
  const config = collections[collectionSlug];

  if (!config) notFound();

  const allBooks = await dataFetcher<Book[]>("books.json");
  const collectionBooks = allBooks.filter((b) =>
    b.category?.includes(config.category)
  );

  const uniqueBooks = collectionBooks.reduce((acc, book) => {
    if (book.series && book.totalParts > 1) {
      if (book.partNumber === 1 && !acc.some((b) => b.series === book.series)) {
        acc.push(book);
      }
    } else {
      acc.push(book);
    }
    return acc;
  }, [] as Book[]);

  return (
    <div>
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          { name: config.title, url: `#` },
        ]}
      />

      <CollectionHero config={config} />

      {config.additionalSections &&
        config.additionalSections.map((section) => (
          <div key={section.title} className="my-16">
            <h2 className="text-body font-semibold my-10">{section.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:mx-32">
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex flex-col gap-2 text-center group shadow-md hover:shadow-xl bg-white/60 border rounded-xl p-4 hover:border-secondary/70 duration-150"
                >
                  <h2 className="font-medium text-note">{item.title}</h2>
                </Link>
              ))}
            </div>
          </div>
        ))}

      <h2 className="text-body font-semibold mt-10 mb-5">
        ما كتب عن {config.title}
      </h2>

      <BookSearch
        books={uniqueBooks}
        route={`/library/${collectionSlug}/books`}
      />
    </div>
  );
}
