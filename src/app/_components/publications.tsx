"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";

export default function Publications({
  publications,
}: {
  publications: Book[];
}) {
  const [booksToShow, setBooksToShow] = useState<number>(10);

  useEffect(() => {
    const updateBooksToShow = () => {
      const width = window.innerWidth;

      if (width >= 1280) setBooksToShow(10);
      else if (width >= 1024) setBooksToShow(8);
      else if (width >= 768) setBooksToShow(6);
      else setBooksToShow(4);
    };

    updateBooksToShow();
    window.addEventListener("resize", updateBooksToShow);

    return () => window.removeEventListener("resize", updateBooksToShow);
  }, []);

  return (
    <div>
      {publications.slice(0, booksToShow).map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
