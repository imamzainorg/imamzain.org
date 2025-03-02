import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";

import BookDetails from "@/app/(pages)/library/_components/Inside-page-of-books";
import { dataFetcher } from "@/lib/dataFetcher";

import BooklibraryCard from "../../_components/book-library-card";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  let LibraryBooks: Book[] = [];

  try {
    LibraryBooks = await dataFetcher<Book[]>("library.json");
  } catch (error) {
    console.error("فشل في جلب الكتب:", error);
    return <div>حدث خطأ أثناء تحميل الكتب</div>;
  }

  const book = LibraryBooks.find((book) => book.slug === slug);

  if (!book) {
    return redirect("/404");
  }

  return (
    <div className="space-y-10 my-8">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المكتبة التخصصصية", url: "/library" },
          { name: "رسالة الحقوق", url: "/risalat-al-huqoq" },
          { name: book.title, url: "#" },
        ]}
      />
      <div className="space-y-10 my-8">
        {/* الكتاب المقصود */}
        <BookDetails book={book} />
        <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
          كتب ذات صلة
        </h2>
        <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
          {LibraryBooks.slice(0, 2).map((libraryBook) => (
            <BooklibraryCard
              route="/risalat-al-huqoq"
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
