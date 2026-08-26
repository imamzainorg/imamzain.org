"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { SearchSection } from "./shared/search-section";
import FilterSidebar from "./shared/FilterSidebar";
import {
  ResearchCard,
  ResearchGrid,
  EmptyState,
  type CardData,
} from "./shared/research-card";
import { SummaryModal } from "./shared/summary-modal";
import { SwiperPagination } from "./shared/swiper-pagination";

import { Research } from "@/types/research";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

const PER_PAGE = 21;

const SORT_OPTIONS = [
  { value: "year-desc", label: "الأحدث" },
  { value: "year-asc", label: "الأقدم" },
  { value: "title-asc", label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
];

type SF = "year" | "title" | "author";
type SO = "asc" | "desc";

// ─── helpers ──────────────────────────────────────────────────────────────────

function text(item: Research) {
  return [
    item.title,
    item.abstract,
    item.section,
    item.topic,
    item.author,
    String(item.publishedYear ?? ""),
    item.conference,
  ]
    .join(" ")
    .toLowerCase();
}

function sort(list: Research[], sf: SF, so: SO) {
  return [...list].sort((a, b) => {
    const cmp =
      sf === "year"
        ? (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0)
        : sf === "title"
          ? (a.title || "").localeCompare(b.title || "", "ar")
          : (a.author || "").localeCompare(b.author || "", "ar");
    return so === "asc" ? cmp : -cmp;
  });
}

function toCard(item: Research): CardData {
  return {
    id: item.id,
    title: item.title,
    author: item.author,
    publishedYear: item.publishedYear,
    badge: item.conference,
    badgeSecondary: item.section,
    abstract: item.abstract,
    pdfUrl: item.pdfUrl,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConferencePapers({ data }: { data: Research[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [all] = useState<Research[]>(() => [...data].reverse());
  const [selected, setSelected] = useState<CardData | null>(null);
  const [sortVal, setSortVal] = useState("year-desc");
  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [filters, setFilters] = useState<Record<string, string>>({
    conference: sp.get("conference") ?? "",
    author: sp.get("author") ?? "",
    publishedYear: sp.get("publishedYear") ?? "",
  });

  // ✅ page مصدره URL فقط، بدون useState
  const page = useMemo(
    () => Math.max(1, Number(sp.get("page") || "1")),
    [sp],
  );

  const uniq = useMemo(
    () => ({
      conferences: [...new Set(all.map((i) => i.conference))].filter(Boolean),
      authors: [...new Set(all.map((i) => i.author).filter(Boolean))].sort(),
      years: [...new Set(all.map((i) => i.publishedYear))]
        .filter(Boolean)
        .sort((a, b) => Number(b) - Number(a)),
    }),
    [all],
  );

  const filterOptions = useMemo(
    () => ({
      conference: uniq.conferences as string[],
      author: uniq.authors as string[],
      publishedYear: uniq.years as string[],
    }),
    [uniq],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const [sf, so] = sortVal.split("-") as [SF, SO];
    return sort(
      all.filter(
        (item) =>
          (!term || text(item).includes(term)) &&
          (!filters.conference ||
            item.conference
              ?.toLowerCase()
              .includes(filters.conference.toLowerCase())) &&
          (!filters.author ||
            item.author
              ?.toLowerCase()
              .includes(filters.author.toLowerCase())) &&
          (!filters.publishedYear ||
            item.publishedYear
              ?.toString()
              .includes(filters.publishedYear)),
      ),
      sf,
      so,
    );
  }, [search, filters, sortVal, all]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ✅ دالة واحدة بدون useCallback لتجنب تعارض React Compiler
  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(sp.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    });
    if (!Object.prototype.hasOwnProperty.call(updates, "page")) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetAll = () => {
    setSearch("");
    setFilters({ conference: "", author: "", publishedYear: "" });
    router.push(pathname, { scroll: false });
  };

  const handleSearch = (v: string) => {
    setSearch(v);
    updateParams({ search: v });
  };

  const handleFilter = (k: string, v: string) => {
    setFilters((p) => ({ ...p, [k]: v }));
    updateParams({ [k]: v || null });
  };

  const handleSort = (v: string) => {
    setSortVal(v);
    updateParams({ sort: v });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-3/12">
          <FilterSidebar
            filters={filterOptions}
            filterValues={filters}
            onFilterChange={handleFilter}
            reset={resetAll}
          />
        </aside>

        <main className="flex-1">
          <SearchSection
            searchValue={search}
            onSearchChange={handleSearch}
            searchPlaceholder="ابحث في العنوان، المؤلف، المؤتمر..."
            resultCount={filtered.length}
            resultUnit="بحث"
            sortOptions={SORT_OPTIONS}
            sortValue={sortVal}
            onSortChange={handleSort}
          />

          {filtered.length === 0 ? (
            <EmptyState onReset={resetAll} />
          ) : (
            <ResearchGrid>
              {current.map((item) => (
                <ResearchCard
                  key={item.id ?? item.title}
                  item={toCard(item)}
                  onSummary={setSelected}
                />
              ))}
            </ResearchGrid>
          )}

          {totalPages > 1 && (
            <SwiperPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                // ✅ بدون setPage، URL هو المصدر
                updateParams({ page: p });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          <SummaryModal item={selected} onClose={() => setSelected(null)} />
        </main>
      </div>
    </>
  );
}