"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import BookCard from "@/components/book-card";
import type { Book } from "@/types/book";
import BookLibraryCard from "@/app/library/_components/book-library-card";
import { libraryPath } from "@/app/library/_config/paths";
import {
  popToPreviousBook,
  readSavedLibraryPosition,
  recordBookVisit,
} from "@/app/library/_lib/book-navigation";

type BookDetailClientProps = {
  book: Book;
  seriesParts: Book[];
  showcaseBooks: Book[];
};

const SCROLL_RESTORE_DELAY_MS = 150;

export default function BookDetailClient({
  book,
  seriesParts,
  showcaseBooks,
}: BookDetailClientProps) {
  const router = useRouter();

  useEffect(() => {
    recordBookVisit(libraryPath("books", book.slug));
  }, [book.slug]);

  // الرجوع: إلى الكتاب السابق إن جاء القارئ من كتاب آخر، وإلا إلى موضع القائمة المحفوظ
  function handleBackToLibrary() {
    const previousBookPath = popToPreviousBook();
    if (previousBookPath) {
      router.push(previousBookPath);
      return;
    }

    const saved = readSavedLibraryPosition();
    if (!saved) {
      router.push("/library");
      return;
    }

    router.push(saved.path);
    if (saved.scrollY !== null) {
      setTimeout(
        () => window.scrollTo({ top: saved.scrollY ?? 0, behavior: "instant" }),
        SCROLL_RESTORE_DELAY_MS,
      );
    }
  }

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
      <BookCard key={book.id} publication={book} seriesParts={seriesParts} />

      <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
        كتب ذات صلة
      </h2>

      <div className="bg-secondary md:container dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
        {showcaseBooks.map((item) => (
          <BookLibraryCard key={item.id} route="/library/books" publication={item} />
        ))}
      </div>
    </div>
  );
}
