"use client";

import BooklibraryCard from "./_components/book-library-card";
import Breadcrumbs from "@/components/breadcrumb";
import SectionTitle from "@/components/section";
import { Book } from "@/types/book";
import { SearchIcon } from "lucide-react";
import { useState, useMemo, Suspense } from "react";
import booksData from "@/data/books.json";
import { useSearchParams } from "next/navigation";

function BookLibraryPage() {
  const searchParams = useSearchParams();
  const queryPublisher = searchParams.get("searchPublisher") || "";

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchPublisher, setSearchPublisher] = useState("");
  const [searchOtherNames, setSearchOtherNames] = useState(queryPublisher);
  const [searchTopic, setSearchTopic] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const libraryBooks = useMemo(() => {
    const books = (booksData as Book[]).filter((book) =>
      book.category?.includes("imamzain"),
    );
    const seenSeries = new Set<string>();

    return books.filter((book) => {
      if (book.series && book.totalParts && book.partNumber) {
        if (book.partNumber !== 1) return false;
        if (seenSeries.has(book.series)) return false;
        seenSeries.add(book.series);
        return true;
      }
      return true;
    });
  }, []);

  const filteredBooks = useMemo(() => {
    let books = [...libraryBooks];

    if (searchTitle) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(searchTitle.toLowerCase()),
      );
    }
    if (searchOtherNames) {
      books = books.filter((book) =>
        book.otherNames?.some((name) =>
          name.toLowerCase().includes(searchOtherNames.toLowerCase()),
        ),
      );
    }
    if (searchAuthor) {
      books = books.filter((book) =>
        book.author?.toLowerCase().includes(searchAuthor.toLowerCase()),
      );
    }
    if (searchPublisher) {
      books = books.filter((book) =>
        book.printHouse?.toLowerCase().includes(searchPublisher.toLowerCase()),
      );
    }
    if (searchTopic) {
      books = books.filter((book) =>
        book.otherNames?.some((name) =>
          name.toLowerCase().includes(searchTopic.toLowerCase()),
        ),
      );
    }

    if (sortOption === "latest") {
      books.sort(
        (a, b) =>
          new Date(b.printDate).getTime() - new Date(a.printDate).getTime(),
      );
    } else if (sortOption === "common") {
      books.sort((a, b) => b.views - a.views);
    }

    return books;
  }, [
    searchTitle,
    searchAuthor,
    searchPublisher,
    searchTopic,
    sortOption,
    searchOtherNames,
    libraryBooks,
  ]);

  return (
    <div>
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المكتبة", url: "/library" },
          { name: "ما كتب عن الامام", url: "#" },
        ]}
      />

      <div className="md:flex md:w-full md:just-between justify-items-center mb-8">
        <div className="w-full">
          <SectionTitle title="قائمة الكتب" />
        </div>
        <div className="flex justify-center items-center text-nowrap">
          <span className="text-sm">الترتيب حسب </span>
          <select
            id="sorting"
            className="border-none bg-transparent focus:border-none active:border-none"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="latest">الأحدث</option>
            <option value="common">الأكثر شيوعا</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== الصف الأول ===== */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* البحث عن عناوين الكتب */}
          <div className="relative">
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full rounded-full px-12 py-2 bg-transparent border border-primary dark:border-Muharram_primary text-right"
              placeholder="البحث عن عناوين الكتب"
            />
            <SearchIcon
              size={20}
              strokeWidth={1.5}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary dark:text-Muharram_primary"
            />
          </div>

          {/* البحث عن أسماء أخرى */}
          <div className="relative">
            <input
              type="text"
              value={searchOtherNames}
              onChange={(e) => setSearchOtherNames(e.target.value)}
              className="w-full rounded-full px-12 py-2 bg-transparent border border-primary dark:border-Muharram_primary text-right"
              placeholder="البحث عن أسماء أخرى"
            />
            <SearchIcon
              size={20}
              strokeWidth={1.5}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary dark:text-Muharram_primary"
            />
          </div>
        </div>

        {/* ===== الصف الثاني ===== */}
        {/* محققين */}
        <div>
          <label className="block mb-2 font-semibold">
            محققين، مدققين، الخ...
          </label>
          <input
            type="text"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            className="w-full rounded-full px-6 py-2 bg-transparent border border-primary dark:border-Muharram_primary text-right"
            placeholder="البحث عن أي اسم"
          />
        </div>

        {/* المؤلف */}
        <div>
          <label className="block mb-2 font-semibold">المؤلف</label>
          <input
            type="text"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            className="w-full rounded-full px-6 py-2 bg-transparent border border-primary dark:border-Muharram_primary text-right"
            placeholder="البحث عن المؤلف"
          />
        </div>

        {/* الناشر */}
        <div>
          <label className="block mb-2 font-semibold">الناشر</label>
          <input
            type="text"
            value={searchPublisher}
            onChange={(e) => setSearchPublisher(e.target.value)}
            className="w-full rounded-full px-6 py-2 bg-transparent border border-primary dark:border-Muharram_primary text-right"
            placeholder="البحث عن دور النشر"
          />
        </div>
      </div>

      <div className="bg-secondary/20 dark:bg-Muharram_primary/20 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10 mt-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BooklibraryCard
              route="/library/books"
              key={book.id}
              publication={book}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">لا توجد نتائج.</p>
        )}
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <Suspense>
      <BookLibraryPage />
    </Suspense>
  );
}
