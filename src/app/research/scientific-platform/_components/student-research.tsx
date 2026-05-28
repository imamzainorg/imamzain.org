"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { SearchSection } from "./shared/search-section";
import FilterSidebar from "./shared/FilterSidebar";
import {
  ResearchCard,
  ResearchGrid,
  EmptyState,
  type CardData,
} from "./shared/research-card";
import { ResearchTable, type TableRow } from "./shared/research-table";
import { SwiperPagination } from "./shared/swiper-pagination";

import studentData from "@/data/student.json";
import { StudentResearch } from "@/types/student";

// ─── Constants ─────────────────────────────────────────────────

const PER_PAGE = 21;

const SORT_OPTIONS = [
  { value: "year-desc", label: "الأحدث" },
  { value: "year-asc", label: "الأقدم" },
  { value: "title-asc", label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
];

// ─── Helpers ───────────────────────────────────────────────────

function toCard(
  item: StudentResearch,
  t: StudentResearch["translations"][0],
): CardData {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors,
    publishedYear: item.publishedYear,
    badge: t.publicationVenue,
    badgeSecondary: t.category,

    pdfUrl: item.pdfUrl,
  };
}

function toRow(
  item: StudentResearch,
  t: StudentResearch["translations"][0],
): TableRow {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors,
    publicationVenue: t.publicationVenue,
    language: t.language,
    category: t.category,
    publishedYear: item.publishedYear,
    pagenam: t.pagenam,
    pdfUrl: item.pdfUrl,
  };
}

// ─── Component ─────────────────────────────────────────────────

export default function StudentResearchPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [filters, setFilters] = useState<Record<string, string>>({
    category: sp.get("category") ?? "",
    publicationVenue: sp.get("publicationVenue") ?? "",
    author: sp.get("author") ?? "",
    publishedYear: sp.get("publishedYear") ?? "",
  });
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("year-desc");

  // ─── Filter + Search + Sort ─────────────────────────────────

  const filtered = useMemo(() => {
    const all = studentData as StudentResearch[];

    // search
    const term = search.trim().toLowerCase();

    const searched = !term
      ? all
      : all.filter((item) =>
          item.translations.some(
            (t) =>
              t.title?.toLowerCase().includes(term) ||
              t.authors?.join(", ").toLowerCase().includes(term) ||
              t.publicationVenue?.toLowerCase().includes(term),
          ),
        );

    // apply sidebar filters
    const withFilters = searched.filter((item) => {
      if (filters.category) {
        const ok = item.translations.some(
          (t) =>
            (t.category ?? "").toLowerCase() === filters.category.toLowerCase(),
        );
        if (!ok) return false;
      }
      if (filters.publicationVenue) {
        const ok = item.translations.some(
          (t) =>
            (t.publicationVenue ?? "").toLowerCase() ===
            filters.publicationVenue.toLowerCase(),
        );
        if (!ok) return false;
      }
      if (filters.author) {
        const ok = item.translations.some((t) =>
          (t.authors || []).some(
            (a) => a.toLowerCase() === filters.author.toLowerCase(),
          ),
        );
        if (!ok) return false;
      }
      if (filters.publishedYear) {
        if (
          (item.publishedYear ?? "").toLowerCase() !==
          filters.publishedYear.toLowerCase()
        )
          return false;
      }
      return true;
    });

    // sort
    return [...withFilters].sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return parseInt(b.publishedYear) - parseInt(a.publishedYear);

        case "year-asc":
          return parseInt(a.publishedYear) - parseInt(b.publishedYear);

        case "title-asc":
          return (a.translations[0]?.title ?? "").localeCompare(
            b.translations[0]?.title ?? "",
            "ar",
          );

        case "title-desc":
          return (b.translations[0]?.title ?? "").localeCompare(
            a.translations[0]?.title ?? "",
            "ar",
          );

        case "author-asc":
          return (a.translations[0]?.authors?.[0] ?? "").localeCompare(
            b.translations[0]?.authors?.[0] ?? "",
            "ar",
          );

        default:
          return 0;
      }
    });
  }, [search, sortBy, filters]);

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(sp.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, String(value));
      });
      if (!Object.prototype.hasOwnProperty.call(updates, "page")) {
        params.set("page", "1");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [sp, pathname, router],
  );

  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const publicationVenues = new Set<string>();
    const authors = new Set<string>();
    const years = new Set<string>();

    (studentData as StudentResearch[]).forEach((item) => {
      item.translations.forEach((t) => {
        if (t.category) categories.add(t.category);
        if (t.publicationVenue) publicationVenues.add(t.publicationVenue);
        (t.authors || []).forEach((a) => a && authors.add(a));
      });

      if (item.publishedYear) years.add(item.publishedYear);
    });

    return {
      category: ["الكل", ...Array.from(categories).sort()],
      publicationVenue: ["الكل", ...Array.from(publicationVenues).sort()],
      author: ["الكل", ...Array.from(authors).sort()],
      publishedYear: ["الكل", ...Array.from(years).sort().reverse()],
    } as Record<string, string[]>;
  }, []);

  // ─── Pagination ─────────────────────────────────────────────

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const tableRows = paginated.flatMap((item) =>
    item.translations.map((t) => toRow(item, t)),
  );

  const paginate = useCallback(
    (p: number) => {
      setPage(p);
      setHighlightId(null);
      updateParams({ page: p });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [updateParams],
  );

  // ─── Render ─────────────────────────────────────────────────

  return (
    <>
   

      <SearchSection
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
          updateParams({ search: v });
        }}
        searchPlaceholder="ابحث في جميع البحوث..."
        resultCount={filtered.length}
        resultUnit="بحث"
        sortOptions={SORT_OPTIONS}
        sortValue={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <div
        className={`flex gap-6 ${
          viewMode === "table" ? "flex-col" : "flex-col lg:flex-row"
        }`}
      >
        <aside className={` ${viewMode === "table" ? "w-full" : "w-3/12"}`}>
          <FilterSidebar
            horizontal={viewMode === "table"}
            filters={filterOptions}
            filterValues={filters}
            onFilterChange={(k, v) => {
              const value = v === "الكل" ? "" : v;

              setFilters((p) => ({ ...p, [k]: value }));
              setPage(1);

              updateParams({ [k]: value || null });
            }}
            reset={() => {
              setFilters({
                category: "",
                publicationVenue: "",
                author: "",
                publishedYear: "",
              });
              setSearch("");
              updateParams({
                category: null,
                publicationVenue: null,
                author: null,
                publishedYear: null,
                search: null,
                page: null,
              });
            }}
          />
        </aside>

        <main className="flex-1 ">
          {filtered.length === 0 ? (
            <EmptyState
              onReset={() => {
                setSearch("");
              }}
            />
          ) : viewMode === "table" ? (
            <ResearchTable
              rows={tableRows}
              startIndex={(page - 1) * PER_PAGE}
              highlightId={highlightId}
              onRowClick={setHighlightId}
              onRowDoubleClick={(url) => url && window.open(url, "_blank")}
              showCategory
            />
          ) : (
            <ResearchGrid>
              {paginated.map((item) =>
                item.translations.map((t) => (
                  <ResearchCard
                    key={`${item.id}-${t.languageid}`}
                    item={toCard(item, t)}
                  />
                )),
              )}
            </ResearchGrid>
          )}

          {totalPages > 1 && (
            <SwiperPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          )}
        </main>
      </div>
    </>
  );
}
