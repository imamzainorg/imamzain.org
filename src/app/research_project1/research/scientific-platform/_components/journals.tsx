"use client";

import { useMemo, useState } from "react";

import { SearchSection } from "./shared/search-section";
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
    pdfUrl: item.pdfUrl,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JournalsPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState("year-desc");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const all = JournalsData as Journals[];

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

    return [...base].sort((a, b) => {
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
  }, [search, sortBy, all]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const tableRows = paginated.flatMap((item) =>
    item.translations.map((t) => toRow(item, t)),
  );

  const paginate = (p: number) => {
    setPage(p);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SearchSection
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder="ابحث بعنوان المقال، المؤلف، الناشر..."
        resultCount={filtered.length}
        resultUnit="مقالة"
        sortOptions={SORT_OPTIONS}
        sortValue={sortBy}
        onSortChange={(v) => {
          setSortBy(v);
          setPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

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
    </>
  );
}
