"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import type { Research } from "@/types/research";
import FilterSidebar from "./shared/FilterSidebar";
import { PER_PAGE, useUpdateParams } from "./shared/list-utils";
import { EmptyState, ResearchCard, ResearchGrid, type CardData } from "./shared/research-card";
import { SearchSection } from "./shared/search-section";
import { SummaryModal } from "./shared/summary-modal";

type SortField = "year" | "title" | "author";

const searchableText = (item: Research) =>
  [item.title, item.abstract, item.section, item.topic, item.author, String(item.publishedYear ?? ""), item.conference]
    .join(" ")
    .toLowerCase();

function sortPapers(list: Research[], field: SortField, order: "asc" | "desc") {
  return [...list].sort((a, b) => {
    const cmp =
      field === "year"
        ? (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0)
        : field === "title"
          ? (a.title || "").localeCompare(b.title || "", "ar")
          : (a.author || "").localeCompare(b.author || "", "ar");
    return order === "asc" ? cmp : -cmp;
  });
}

const toCard = (item: Research): CardData => ({
  id: item.id,
  title: item.title,
  author: item.author,
  publishedYear: item.publishedYear,
  badge: item.conference,
  badgeSecondary: item.section,
  abstract: item.abstract,
  pdfUrl: item.pdfUrl,
});

const includesText = (value: string | undefined, query: string) =>
  !query || !!value?.toLowerCase().includes(query.toLowerCase());

export default function ConferencePapers({ data }: { data: Research[] }) {
  const sp = useSearchParams();
  const updateParams = useUpdateParams();

  const all = useMemo(() => [...data].reverse(), [data]);
  const [selected, setSelected] = useState<CardData | null>(null);
  const [sortValue, setSortValue] = useState("year-desc");
  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [filters, setFilters] = useState<Record<string, string>>({
    conference: sp.get("conference") ?? "",
    author: sp.get("author") ?? "",
    publishedYear: sp.get("publishedYear") ?? "",
  });

  // The page lives in the URL only.
  const page = Math.max(1, Number(sp.get("page") || "1"));

  const filterOptions = useMemo(
    () => ({
      conference: [...new Set(all.map((i) => i.conference))].filter(Boolean) as string[],
      author: [...new Set(all.map((i) => i.author).filter(Boolean))].sort() as string[],
      publishedYear: [...new Set(all.map((i) => i.publishedYear))]
        .filter(Boolean)
        .sort((a, b) => Number(b) - Number(a)),
    }),
    [all],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const [field, order] = sortValue.split("-") as [SortField, "asc" | "desc"];
    return sortPapers(
      all.filter(
        (item) =>
          (!term || searchableText(item).includes(term)) &&
          includesText(item.conference, filters.conference) &&
          includesText(item.author, filters.author) &&
          includesText(item.publishedYear?.toString(), filters.publishedYear),
      ),
      field,
      order,
    );
  }, [search, filters, sortValue, all]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetAll = () => {
    setSearch("");
    setFilters({ conference: "", author: "", publishedYear: "" });
    updateParams({ search: null, conference: null, author: null, publishedYear: null, page: null });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-3/12">
        <FilterSidebar
          filters={filterOptions}
          filterValues={filters}
          onFilterChange={(key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
            updateParams({ [key]: value || null });
          }}
          reset={resetAll}
        />
      </aside>

      <main className="flex-1">
        <SearchSection
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            updateParams({ search: value });
          }}
          searchPlaceholder="ابحث في العنوان، المؤلف، المؤتمر..."
          resultCount={filtered.length}
          resultUnit="بحث"
          sortValue={sortValue}
          onSortChange={(value) => {
            setSortValue(value);
            updateParams({ sort: value });
          }}
        />

        {filtered.length === 0 ? (
          <EmptyState onReset={resetAll} />
        ) : (
          <ResearchGrid>
            {current.map((item) => (
              <ResearchCard key={item.id ?? item.title} item={toCard(item)} onSummary={setSelected} />
            ))}
          </ResearchGrid>
        )}

        {totalPages > 1 && (
          <Pagination
            className="mt-14"
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              updateParams({ page: p });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        <SummaryModal item={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}
