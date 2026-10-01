"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle, outlineButton } from "@/components/brand";
import { Book } from "@/types/book";
import BooklibraryCard from "@/app/library/_components/book-library-card";
import BookCard from "@/components/book-card";
import { ArrowRight } from "lucide-react";

interface Props {
  book: Book;
  seriesParts: Book[];
  showcaseBooks: Book[];
}

const BOOK_STACK_KEY = "bookNavigationStack";

function getBookPath(slug: string) {
  return `/library/books/${slug}`;
}

export default function BookDetailClient({
  book,
  seriesParts,
  showcaseBooks,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    const currentPath = getBookPath(book.slug);
    const raw = sessionStorage.getItem(BOOK_STACK_KEY);
    const stack: string[] = raw ? JSON.parse(raw) : [];

    if (stack[stack.length - 1] !== currentPath) {
      stack.push(currentPath);
      sessionStorage.setItem(BOOK_STACK_KEY, JSON.stringify(stack));
    }
  }, [book.slug]);

  const handleBackToLibrary = () => {
    const raw = sessionStorage.getItem(BOOK_STACK_KEY);
    const stack: string[] = raw ? JSON.parse(raw) : [];

    stack.pop();
    sessionStorage.setItem(BOOK_STACK_KEY, JSON.stringify(stack));

    const previousBookPath = stack.length > 0 ? stack[stack.length - 1] : null;

    if (previousBookPath) {
      router.push(previousBookPath);
      return;
    }

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

    router.push(fallbackURL);
  };

  return (
    <div className="container pb-12">
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
        className={`${outlineButton} mb-12 !px-4 !py-2`}
      >
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        العودة الى الصفحة السابقة
      </button>

      <BookCard key={book.id} publication={book} seriesParts={seriesParts} />

      <section className="pt-28">
        <SectionTitle title="كتب ذات صلة" className="mb-12" />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {showcaseBooks.map((item) => (
            <li key={item.id}>
              <BooklibraryCard route="/library/books" publication={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
