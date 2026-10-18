"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import BookCard from "@/components/book-card";
import type { Book } from "@/types/book";
import BookCarousel from "@/components/book-carousel";
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
    <div className="space-y-10 pb-8">
      <div className="container flex items-end justify-between gap-4">
        <Breadcrumbs
          links={[
            { name: "الرئيسية", url: "/" },
            { name: "المكتبة التخصصية", url: "/library" },
            { name: book.title, url: "#" },
          ]}
        />
        <button
          type="button"
          onClick={handleBackToLibrary}
          className="group mb-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/25 px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/[0.06] dark:border-Muharram_primary/30 dark:text-Muharram_primary lg:mb-6"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          <span className="max-sm:hidden">العودة إلى الصفحة السابقة</span>
          <span className="sm:hidden">رجوع</span>
        </button>
      </div>
      <div className="container">
        <BookCard key={book.id} publication={book} seriesParts={seriesParts} />
      </div>

      <div className="container pt-10">
        <BookCarousel title="كتب ذات صلة" books={showcaseBooks} route="/library/books" />
      </div>
    </div>
  );
}
