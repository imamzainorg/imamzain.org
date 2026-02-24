"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronRight size={20} />
        </Button>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-3 md:hidden">
            {/* Current Page */}
            <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-medium">
              {page} / {totalPages}
            </span>
          </div>

          {/* ====== Desktop Pagination ====== */}
          <div className="hidden md:flex gap-2">
            {(() => {
              const maxButtons = 5;

              let start = Math.max(1, page - Math.floor(maxButtons / 2));
              let end = start + maxButtons - 1;

              if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - maxButtons + 1);
              }

              return Array.from({ length: end - start + 1 }).map((_, i) => {
                const p = start + i;

                return (
                  <Button
                    key={p}
                    onClick={() => onPageChange(p)}
                    variant={page === p ? "default" : "outline"}
                    className={`w-10 h-10 ${
                      page === p
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {p}
                  </Button>
                );
              });
            })()}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          <ChevronLeft size={20} />
        </Button>
      </nav>
    </div>
  );
}
