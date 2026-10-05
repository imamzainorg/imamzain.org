"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, BookOpen } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import SectionTitle from "@/components/section";
import type { Book } from "@/types/book";
import {
  getBookFilterOptions,
  getVisibleBooks,
  parseBookFilters,
} from "../_lib/book-filters";
import BookLibraryCard from "./book-library-card";
import FilterSidebar from "./filter-sidebar";
import Pagination from "./pagination";
import SearchInput from "./search-input";

const BOOKS_PER_PAGE = 8;
const SEARCH_DEBOUNCE_MS = 250;
const PRIORITY_CARD_COUNT = 4;

export default function BookLibraryPage({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => parseBookFilters(searchParams), [searchParams]);
  const [localSearch, setLocalSearch] = useState(filters.query);

  const filterOptions = useMemo(() => getBookFilterOptions(books), [books]);
  const visibleBooks = useMemo(
    () => getVisibleBooks(books, filters),
    [books, filters],
  );

  const totalPages = Math.ceil(visibleBooks.length / BOOKS_PER_PAGE);
  const pageStart = (filters.page - 1) * BOOKS_PER_PAGE;
  const pageBooks = visibleBooks.slice(pageStart, pageStart + BOOKS_PER_PAGE);

  // أي تغيير يعيد الصفحة إلى الأولى ما لم يُحدَّد رقم الصفحة صراحةً
  function updateParams(updates: Record<string, string | number | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    }
    if (!("page" in updates)) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function resetFilters() {
    setLocalSearch("");
    router.push(pathname, { scroll: false });
  }

  // يجب أن يعمل عند الكتابة فقط: إضافة filters.query إلى المصفوفة تجعله يُعيد
  // دفع نص قديم إلى الـ URL بعد الرجوع في المتصفح.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.query) updateParams({ q: localSearch });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
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
        <div>
          <FilterSidebar
            options={filterOptions}
            values={filters}
            onChange={(key, value) => updateParams({ [key]: value })}
            reset={resetFilters}
          />
        </div>

        <main className="flex-1 space-y-6">
          <SearchInput
            value={localSearch}
            onChange={setLocalSearch}
            onClear={resetFilters}
          />

          {pageBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pageBooks.map((book, index) => (
                <BookLibraryCard
                  key={book.id}
                  publication={book}
                  route="/library/books"
                  priority={index < PRIORITY_CARD_COUNT}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
              <p className="text-gray-500 text-lg font-medium">
                لا توجد نتائج تطابق بحثك
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onPageChange={(page) => updateParams({ page })}
            />
          )}
        </main>
      </div>
    </div>
  );
}
