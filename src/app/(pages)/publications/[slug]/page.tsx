import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";
import { dataFetcher } from "@/lib/dataFetcher";
import BooklibraryCard from "../../library/_components/book-library-card";
import BookCard from "@/components/book-card";


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; 
}) {

  const { slug } = await params;

  const publications = await dataFetcher<Book[]>("publications.json");

  const publication: Book | undefined = publications.find(
    (book) => book.slug === slug
  );

  if (!publication) {
    return redirect("/404");
  }

  return (
    <div className=" md:container space-y-16 my-12 max-w-screen-xl mx-auto px-4">

      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />

  
      <BookCard publication={publication} publications={publications} />

  
      <div className="smart-library">
        <h3 className="smart-title">
          <span className="title-underline"></span>
        </h3>
        <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
          كتب ذات صلة
        </h2>
        <div className="bg-secondary dark:bg-Muharram_primary  bg-opacity-10 dark:bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
          {publications
            .filter((book) => book.slug !== publication.slug)
            .slice(0, 2)
            .map((libraryBook) => (
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
