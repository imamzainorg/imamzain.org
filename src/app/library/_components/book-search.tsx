"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/button";
import type { Book } from "@/types/book";
import BookLibraryCard from "./book-library-card";
import Pagination from "./pagination";

type BookSearchProps = {
  books: Book[];
  route: string;
};

const BOOKS_PER_PAGE = 8;

export default function BookSearch({ books, route }: BookSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return books;

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author?.toLowerCase().includes(term) ||
        book.printHouse?.toLowerCase().includes(term),
    );
  }, [searchTerm, books]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const pageStart = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = filteredBooks.slice(pageStart, pageStart + BOOKS_PER_PAGE);

  function updateSearch(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  return (
    <div className="space-y-8">
      <div className="w-11/12 mx-auto">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                placeholder="ابحث في الكتب..."
                className="pr-12 w-full text-subtitle md:text-note bg-white rounded-xl border border-primary dark:border-Muharram_primary"
                value={searchTerm}
                onChange={(e) => updateSearch(e.target.value)}
              />
              <SearchIcon className="absolute w-3 md:w-5 right-4 top-1/2 -translate-y-1/2 text-primary" />
            </div>
            <Button variant="outline" onClick={() => updateSearch("")}>
              إعادة الضبط
            </Button>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        {pageBooks.length === 0 ? (
          <div className="bg-secondary/20 rounded-xl flex flex-col items-center justify-center py-16">
            <SearchIcon size={48} strokeWidth={1} className="text-gray-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              لا توجد نتائج
            </h3>
          </div>
        ) : (
          <div className="bg-secondary/20 dark:bg-Muharram_primary/20 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
            {pageBooks.map((book) => (
              <BookLibraryCard key={book.id} route={route} publication={book} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="w-11/12 mx-auto">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
