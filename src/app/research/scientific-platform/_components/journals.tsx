"use client";

import { useMemo, useState } from "react";
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

import { Journals } from "@/types/journals";
import JournalsData from "@/data/journals.json";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

const PER_PAGE = 21;

const SORT_OPTIONS = [
  { value: "year-desc", label: "الأحدث" },
  { value: "year-asc", label: "الأقدم" },
  { value: "title-asc", label: "العنوان (أ-ي)" },
  { value: "title-desc", label: "العنوان (ي-أ)" },
  { value: "author-asc", label: "المؤلف (أ-ي)" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function toCard(item: Journals, t: Journals["translations"][0]): CardData {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors,
    publishedYear: item.publishedYear,
    badge: t.publicationVenue,
    pdfUrl: item.pdfUrl,
  };
}

function toRow(item: Journals, t: Journals["translations"][0]): TableRow {
  return {
    id: item.id,
    title: t.title,
    authors: t.authors ?? [],
    publicationVenue: t.publicationVenue ?? "",
    language: t.language,
    publishedYear: item.publishedYear,
    pagenam: t.pagenam,
    pdfUrl: item.pdfUrl,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JournalsPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("year-desc");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage] = useState(() =>
    Math.max(1, Number(sp.get("page") || "1")),
  );
  const [filters, setFilters] = useState<Record<string, string>>({
    publicationVenue: sp.get("publicationVenue") ?? "",
    author: sp.get("author") ?? "",
    publishedYear: sp.get("publishedYear") ?? "",
      language: sp.get("language") ?? "",
  });

  const all = JournalsData as Journals[];

  const filterOptions = useMemo(() => {
    const publicationVenues = new Set<string>();
    const authors = new Set<string>();
    const years = new Set<string>();
    const languages = new Set<string>();
    all.forEach((item) => {
      item.translations.forEach((t) => {
        if (t.publicationVenue) publicationVenues.add(t.publicationVenue);
        (t.authors || []).forEach((a) => a && authors.add(a));
          if (t.language) languages.add(t.language);
      });
      if (item.publishedYear) years.add(item.publishedYear);
    });
    return {
      publicationVenue: Array.from(publicationVenues).sort(),
      author: Array.from(authors).sort(),
      publishedYear: Array.from(years).sort().reverse(),
        language: Array.from(languages).sort(),
    } as Record<string, string[]>;
  }, [all]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const base = !term
      ? all
      : all.filter((item) =>
          item.translations.some(
            (t) =>
              (t.title?.toLowerCase() ?? "").includes(term) ||
              (t.authors?.join(", ").toLowerCase() ?? "").includes(term) ||
              (t.publicationVenue?.toLowerCase() ?? "").includes(term),
          ),
        );

    // apply sidebar filters
    const withFilters = base.filter((item) => {
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
if (filters.language) {
  const ok = item.translations.some(
    (t) =>
      (t.language ?? "").toLowerCase() ===
      filters.language.toLowerCase(),
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
  }, [search, sortBy, all, filters]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const tableRows = paginated.flatMap((item) =>
    item.translations.map((t) => toRow(item, t)),
  );

  const paginate = (p: number) => {
    setPage(p);
    setHighlightId(null);
    updateParams({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <>
      <div className=" gap-6">
        {" "}
        <SearchSection
          searchValue={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
            updateParams({ search: v });
          }}
          searchPlaceholder="ابحث بعنوان المقال، المؤلف، الناشر..."
          resultCount={filtered.length}
          resultUnit="مقالة"
          sortOptions={SORT_OPTIONS}
          sortValue={sortBy}
          onSortChange={(v) => {
            setSortBy(v);
            setPage(1);
            updateParams({ sort: v });
          }}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div
          className={`flex gap-6 ${
            viewMode === "table" ? "flex-col" : "flex-col lg:flex-row"
          }`}
        >
          <aside className={viewMode === "table" ? "w-full" : "w-3/12"}>
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
                    language: "",
                });
                setSearch("");
                updateParams({
                  language: null,
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
          <main className="flex-1 pb-2">
            {filtered.length === 0 ? (
              <EmptyState onReset={() => setSearch("")} />
            ) : viewMode === "table" ? (
              <ResearchTable
                rows={tableRows}
                startIndex={(page - 1) * PER_PAGE}
                highlightId={highlightId}
                onRowClick={setHighlightId}
                onRowDoubleClick={(url) => url && window.open(url, "_blank")}
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
      </div>
    </>
  );
}
