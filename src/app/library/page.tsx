"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import booksData from "@/data/books.json";
import { Book } from "@/types/book";
import BooklibraryCard from "./_components/book-library-card";
import FilterSidebar from "./_components/FilterSidebar";
import SearchInput from "./_components/search-input";
import Pagination from "./_components/pagination";
import Breadcrumbs from "@/components/breadcrumb";
import SectionTitle from "@/components/section";
import { BookOpen, ArrowUpDown } from "lucide-react";

/* ── Helpers ── */
const toArray = (val?: string | string[]) =>
  !val ? [] : Array.isArray(val) ? val : [val];
const unique = (arr: string[]) => [...new Set(arr)].sort();
const getYear = (date?: string) =>
  date ? new Date(date).getFullYear().toString() : "";
const paginateArr = <T,>(arr: T[], page: number, perPage: number) =>
  arr.slice((page - 1) * perPage, page * perPage);

/* ── Page Component ── */
function BookLibraryPage() {
  const searchParams = useSearchParams();
  const initialConference = searchParams.get("conferences") || "";

  const [search, setSearch] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [sort, setSort] = useState<string>("latest");
  const [page, setPage] = useState<number>(1);
  const [conferences, setConferences] = useState<string>(initialConference);
  const [category, setCategory] = useState<string>("");
  const PER_PAGE = 8;

  const books = useMemo(() => booksData as Book[], []);
  


  /* ── Filter options ── */
  const filters = useMemo(() => {
    const authors: string[] = [];
    const publishers: string[] = [];
    const years: string[] = [];
    const categories: string[] = [];
    const conferencesArr: string[] = [];

    books.forEach((b) => {
      authors.push(...toArray(b.author));
      if (b.printHouse) publishers.push(b.printHouse);
      if (b.printDate) years.push(getYear(b.printDate));
      if (b.category) categories.push(...toArray(b.category));
      if (b.Conferences) conferencesArr.push(...toArray(b.Conferences));
    });

    return {
      authors: unique(authors),
      publishers: unique(publishers),
      years: unique(years).reverse(),
      categories: unique(categories),
      conferences: unique(conferencesArr),
    };
  }, [books]);

  /* ── Filtered & sorted books ── */
  const filteredBooks = useMemo(() => {
    return books
      .filter((b) => {
        if (
          search &&
          ![b.title, ...(b.author || []), b.printHouse]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return false;
        if (author && !b.author.includes(author)) return false;
        if (publisher && b.printHouse !== publisher) return false;
        if (year && getYear(b.printDate) !== year) return false;
        if (category && !b.category?.includes(category)) return false;
        if (conferences && !b.Conferences?.includes(conferences)) return false;
        return true;
      })
      .sort((a, b) =>
        sort === "common"
          ? (b.views || 0) - (a.views || 0)
          : new Date(b.printDate).getTime() - new Date(a.printDate).getTime()
      );
  }, [books, search, author, publisher, year, sort, category, conferences]);

  const totalPages = Math.ceil(filteredBooks.length / PER_PAGE);
  const paginatedBooks = useMemo(
    () => paginateArr(filteredBooks, page, PER_PAGE),
    [filteredBooks, page]
  );

  const resetFilters = () => {
    setSearch("");
    setAuthor("");
    setPublisher("");
    setYear("");
    setCategory("");
    setConferences("");
    setPage(1);
  };

  return (
      <div className="min-h-screen mx-auto px-4 gap-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs
            links={[
              { name: "الصفحة الرئيسية", url: "/" },
              { name: "المكتبة", url: "/library" },
              { name: "قائمة الكتب", url: "#" },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary/10 to-transparent p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <SectionTitle title="قائمة الكتب" />
                <p className="text-gray-600 mt-1">اكتشف مجموعتنا المتنوعة من الكتب</p>
              </div>
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-white border rounded-xl px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all cursor-pointer hover:border-gray-400"
              >
                <option value="latest">الأحدث</option>
                <option value="common">الأكثر مشاهدة</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className=" px-4 flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            author={author}
            setAuthor={setAuthor}
            publisher={publisher}
            setPublisher={setPublisher}
            year={year}
            setYear={setYear}
            category={category}
            setCategory={setCategory}
            conferences={conferences}
            setConferences={setConferences}
            paginate={setPage}
            reset={resetFilters}
          />

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <SearchInput value={search} onChange={setSearch} onClear={resetFilters} />

            {paginatedBooks.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedBooks.map((book) => (
                  <BooklibraryCard key={book.id} publication={book} route="/library/books" />
                ))}
              </div>
            ) : (
              <div className="text-center p-16 bg-white rounded-xl border shadow-sm">لا توجد نتائج</div>
            )}

            {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
          </div>
        </div>
      </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>
      }
    >
      <BookLibraryPage />
    </Suspense>
  );
}