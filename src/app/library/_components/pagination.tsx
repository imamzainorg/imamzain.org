"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MAX_PAGE_BUTTONS = 5;

/** Up to five consecutive page numbers, centered on the current page where possible. */
function visiblePages(page: number, totalPages: number): number[] {
  let start = Math.max(1, page - Math.floor(MAX_PAGE_BUTTONS / 2));
  let end = start + MAX_PAGE_BUTTONS - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center gap-2 bg-white rounded-2xl p-2 dark:bg-Muharram_secondary/10 shadow-sm border border-gray-100">
        <Button
          variant="outline"
          size="icon"
          aria-label="الصفحة السابقة"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronRight size={20} />
        </Button>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-3 md:hidden">
            <span className="px-3 py-1 rounded-md bg-primary/10 dark:bg-Muharram_primary/20  text-primary font-medium">
              {page} / {totalPages}
            </span>
          </div>

          <div className="hidden md:flex gap-2">
            {visiblePages(page, totalPages).map((pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                variant={page === pageNumber ? "default" : "outline"}
                className={`w-10 h-10 ${
                  page === pageNumber
                    ? "bg-primary text-white"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="الصفحة التالية"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronLeft size={20} />
        </Button>
      </nav>
    </div>
  );
}
