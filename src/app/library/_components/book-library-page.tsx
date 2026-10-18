"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle } from "@/components/brand";
import Dropdown from "@/components/dropdown";
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

      <div>
        <SectionTitle
          as="h1"
          title="قائمة الكتب"
          text="اكتشف مجموعتنا المتنوعة من الكتب"
          className="mb-10"
          action={
            <Dropdown
              label="الترتيب"
              value={filters.sort}
              onChange={(sort) => updateParams({ sort })}
              icon={<ArrowUpDown />}
              className="min-w-44"
              options={[
                { value: "latest", label: "الأحدث" },
                { value: "common", label: "الأكثر مشاهدة" },
              ]}
            />
          }
        />
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
