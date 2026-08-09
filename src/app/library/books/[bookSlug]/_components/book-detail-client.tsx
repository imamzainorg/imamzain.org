"use client";

import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import { Book } from "@/types/book";
import BooklibraryCard from "@/app/library/_components/book-library-card";
import BookCard from "@/components/book-card";
import { ArrowRight } from "lucide-react";

interface Props {
  book: Book;
  libraryBooks: Book[];
  showcaseBooks: Book[];
}

export default function BookDetailClient({
  book,
  libraryBooks,
  showcaseBooks,
}: Props) {
  const router = useRouter();

  const handleBackToLibrary = () => {
    const savedPosition = sessionStorage.getItem("libraryScrollPosition");
    const savedURL = sessionStorage.getItem("lastLibraryURL");
    const fallbackURL = "/library";

    if (savedURL) {
      router.push(savedURL);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedPosition),
            behavior: "instant",
          });
        }, 150);
      }
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackURL);
  };

  return (
    <div className="space-y-10 my-8">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          { name: book.title, url: "#" },
        ]}
      />
      <div className="container mx-auto px-4">
        <button
          onClick={handleBackToLibrary}
          className="flex items-center gap-2 bg-primary p-2 rounded-xl  hover:bg-primary/90 text-white hover:text-primary-dark transition-colors group mb-4"
        >
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium  ">العودة الى الصفحة السابقة</span>
        </button>
      </div>
      <BookCard key={book.id} publication={book} publications={libraryBooks} />

      <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
        كتب ذات صلة
      </h2>

      <div className="bg-secondary md:container dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
        {showcaseBooks.map((item) => (
          <BooklibraryCard
            key={item.id}
            route="/library/books/"
            publication={item}
            downloadable
          />
        ))}
      </div>
    </div>
  );
}
