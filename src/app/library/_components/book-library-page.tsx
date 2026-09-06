"use client";

import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BookOpen, ArrowUpDown } from "lucide-react";

import { Book } from "@/types/book";

import BooklibraryCard from "./book-library-card";
import FilterSidebar from "./FilterSidebar";
import SearchInput from "./search-input";
import Pagination from "./pagination";
import Breadcrumbs from "@/components/breadcrumb";
import SectionTitle from "@/components/section";

const PER_PAGE = 8;

const toArray = (val?: string | string[]): string[] =>
  !val ? [] : Array.isArray(val) ? val : [val];

const getYear = (date?: string): string =>
  date ? new Date(date).getFullYear().toString() : "";

export default function BookLibraryPage({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
      query: searchParams.get("q") || "",
      author: searchParams.get("author") || "",
      publisher: searchParams.get("publisher") || "",
      category: searchParams.get("category") || "",
      conferences: searchParams.get("conferences") || "",
      sort: searchParams.get("sort") || "latest",
      page: Math.max(1, Number(searchParams.get("page")) || 1),
    }),
    [searchParams]
  );

  const [localSearch, setLocalSearch] = useState(filters.query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allBooks = books;

  const filterOptions = useMemo(() => {
    const authors = new Set<string>();
    const publishers = new Set<string>();
    const years = new Set<string>();
    const categories = new Set<string>();
    const conferences = new Set<string>();

    allBooks.forEach((book) => {
      toArray(book.author).forEach((a) => authors.add(a));
      if (book.printHouse) publishers.add(book.printHouse);
      if (book.printDate) years.add(getYear(book.printDate));
      toArray(book.category).forEach((c) => categories.add(c));
      toArray(book.Conferences).forEach((c) => conferences.add(c));
    });

    return {
      authors: Array.from(authors).sort(),
      publishers: Array.from(publishers).sort(),
      years: Array.from(years).sort().reverse(),
      categories: Array.from(categories).sort(),
      conferences: Array.from(conferences).sort(),
    };
  }, [allBooks]);

  const filteredBooks = useMemo(() => {
    const result = allBooks.filter((book) => {
      if (filters.query) {
        const searchContent = [book.title, ...toArray(book.author), book.printHouse]
          .join(" ")
          .toLowerCase();
        if (!searchContent.includes(filters.query.toLowerCase())) return false;
      }
      if (
        filters.author &&
        !toArray(book.author).some(
          (a) => a.toLowerCase() === filters.author.toLowerCase()
        )
      )
        return false;
      if (filters.publisher && book.printHouse !== filters.publisher) return false;
      if (
        filters.category &&
        !toArray(book.category).some(
          (c) => c.toLowerCase() === filters.category.toLowerCase()
        )
      )
        return false;
      if (
        filters.conferences &&
        !toArray(book.Conferences).some(
          (c) => c.toLowerCase() === filters.conferences.toLowerCase()
        )
      )
        return false;
      if (!(book.partNumber === 1 || !book.totalParts)) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (filters.sort === "common") return (b.views || 0) - (a.views || 0);
      const timeA = a.printDate ? new Date(a.printDate).getTime() : 0;
      const timeB = b.printDate ? new Date(b.printDate).getTime() : 0;
      return timeB - timeA;
    });
  }, [allBooks, filters]);

  const totalPages = Math.ceil(filteredBooks.length / PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const start = (filters.page - 1) * PER_PAGE;
    return filteredBooks.slice(start, start + PER_PAGE);
  }, [filteredBooks, filters.page]);

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, String(value));
      });
      if (!Object.prototype.hasOwnProperty.call(updates, "page")) {
        params.set("page", "1");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handlePageChange = useCallback(
    (p: number) => updateParams({ page: p }),
    [updateParams]
  );

  const resetFilters = useCallback(() => {
    setLocalSearch("");
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  // Debounced search — faster (250ms instead of 400ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (localSearch !== filters.query) {
        updateParams({ q: localSearch });
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen mx-auto px-4 gap-6" dir="rtl">
      <div className="mb-6">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "المكتبة التخصصية", url: "/library" },
            { name: "قائمة الكتب", url: "#" },
          ]}
        />
      </div>

      <div className="mb-8 rounded-2xl dark:bg-gradient-to-l dark:from-Muharram_secondary/10 dark:to-transparent bg-gradient-to-l from-primary/10 to-transparent p-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 dark:bg-Muharram_primary/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary dark:text-Muharram_primary" />
            </div>
            <div>
              <SectionTitle title="قائمة الكتب" />
              <p className="text-gray-600 mt-1">اكتشف مجموعتنا المتنوعة من الكتب</p>
            </div>
          </div>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="appearance-none bg-white border rounded-xl px-4 py-2.5 pr-10 focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
            >
              <option value="latest">الأحدث</option>
              <option value="common">الأكثر مشاهدة</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside>
          <FilterSidebar
            filters={filterOptions}
            author={filters.author}
            setAuthor={(val) => updateParams({ author: val })}
            publisher={filters.publisher}
            setPublisher={(val) => updateParams({ publisher: val })}
            category={filters.category}
            setCategory={(val) => updateParams({ category: val })}
            conferences={filters.conferences}
            setConferences={(val) => updateParams({ conferences: val })}
            reset={resetFilters}
          />
        </aside>

        <main className="flex-1 space-y-6">
          <SearchInput value={localSearch} onChange={setLocalSearch} onClear={resetFilters} />

          {paginatedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedBooks.map((book, index) => (
                <BooklibraryCard
                  key={book.id}
                  publication={book}
                  route="/library/books"
                  priority={index < 4} // أول 4 كتب تُحمَّل بأولوية
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
              <p className="text-gray-500 text-lg font-medium">لا توجد نتائج تطابق بحثك</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination page={filters.page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </main>
      </div>
    </div>
  );
}