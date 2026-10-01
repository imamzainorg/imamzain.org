"use client";

import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

import { Book } from "@/types/book";

import BooklibraryCard from "./book-library-card";
import FilterSidebar from "./FilterSidebar";
import Breadcrumbs from "@/components/breadcrumb";
import { outlineButton } from "@/components/brand";
import PageHeader from "@/components/page-header";
import Pagination from "@/components/pagination";
import SearchField from "@/components/search-field";

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
    <div className="container min-h-screen pb-12" dir="rtl">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          { name: "قائمة الكتب", url: "#" },
        ]}
      />

      <PageHeader title="قائمة الكتب" text="اكتشف مجموعتنا المتنوعة من الكتب" />

      <div className="mt-16 lg:grid lg:grid-cols-[18rem_1fr] lg:gap-12 xl:grid-cols-[20rem_1fr] xl:gap-16">
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

        <main className="min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <SearchField
              className="md:flex-1"
              label="البحث في الكتب"
              placeholder="ابحث عن كتاب، مؤلف، دار نشر..."
              value={localSearch}
              onChange={setLocalSearch}
              onClear={resetFilters}
            />
            <div className="relative">
              <label htmlFor="library-sort" className="sr-only">
                ترتيب الكتب
              </label>
              <select
                id="library-sort"
                value={filters.sort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="w-full cursor-pointer appearance-none rounded-xl border-2 border-primary/25 bg-white py-3.5 pl-10 pr-4 text-lg text-gray-900 transition-colors focus:border-primary focus:outline-none dark:border-Muharram_primary/25 dark:focus:border-Muharram_primary md:w-52"
              >
                <option value="latest">الأحدث</option>
                <option value="common">الأكثر مشاهدة</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary dark:text-Muharram_primary" />
            </div>
          </div>

          <p className="mt-6 font-semibold text-gray-600">
            {filteredBooks.length} كتاب
          </p>

          {paginatedBooks.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3">
              {paginatedBooks.map((book, index) => (
                <li key={book.id}>
                  <BooklibraryCard
                    publication={book}
                    route="/library/books"
                    priority={index < 4} // أول 4 كتب تُحمَّل بأولوية
                    as="h2"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="text-2xl font-bold text-gray-800">لا توجد نتائج تطابق بحثك</p>
              <button type="button" onClick={resetFilters} className={`${outlineButton} mt-6`}>
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}

          <Pagination
            className="mt-16"
            page={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
