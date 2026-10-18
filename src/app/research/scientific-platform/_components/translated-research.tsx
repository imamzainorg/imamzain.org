"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import type { TranslatedResearch } from "@/types/translated-research";
import FilterSidebar from "./shared/FilterSidebar";
import { PER_PAGE, useUpdateParams } from "./shared/list-utils";
import { EmptyState, ResearchCard, ResearchGrid, type CardData } from "./shared/research-card";
import { ResearchTable, type TableRow } from "./shared/research-table";
import { SearchSection, type ViewMode } from "./shared/search-section";

type Translation = TranslatedResearch["translations"][number];
type SearchLang = "all" | "ar" | "fa";

// The two lists built on this component. Journal articles come in Arabic, Persian and
// English, so their search follows the visitor's language; graduation research has a single
// version of each item.
const VARIANTS = {
  student: {
    filterKeys: ["category", "publicationVenue", "author", "publishedYear"],
    placeholder: "ابحث في جميع البحوث...",
    unit: "بحث",
    localized: false,
  },
  journals: {
    filterKeys: ["publicationVenue", "author", "publishedYear", "language"],
    placeholder: "ابحث بعنوان المقال، المؤلف، الناشر...",
    unit: "مقالة",
    localized: true,
  },
};

const LANGS: Record<number, string> = { 1: "ar", 2: "fa", 3: "en" };
const langOf = (t: Translation) => LANGS[t.languageid];

const matches = (t: Translation, term: string, lang: SearchLang) =>
  (lang === "all" || langOf(t) === lang) &&
  [t.title, t.authors?.join(", "), t.publicationVenue].some((v) => v?.toLowerCase().includes(term.toLowerCase()));

const firstTitle = (item: TranslatedResearch) => item.translations[0]?.title ?? "";
const firstAuthor = (item: TranslatedResearch) => item.translations[0]?.authors?.[0] ?? "";

const SORTERS: Record<string, (a: TranslatedResearch, b: TranslatedResearch) => number> = {
  "year-desc": (a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear),
  "year-asc": (a, b) => parseInt(a.publishedYear) - parseInt(b.publishedYear),
  "title-asc": (a, b) => firstTitle(a).localeCompare(firstTitle(b), "ar"),
  "title-desc": (a, b) => firstTitle(b).localeCompare(firstTitle(a), "ar"),
  "author-asc": (a, b) => firstAuthor(a).localeCompare(firstAuthor(b), "ar"),
};

const same = (a: string | undefined, b: string) => (a ?? "").toLowerCase() === b.toLowerCase();

function passesFilters(item: TranslatedResearch, f: Record<string, string>) {
  const some = (test: (t: Translation) => boolean | undefined) => item.translations.some(test);
  return (
    (!f.category || some((t) => same(t.category, f.category))) &&
    (!f.publicationVenue || some((t) => same(t.publicationVenue, f.publicationVenue))) &&
    (!f.author || some((t) => t.authors?.some((a) => same(a, f.author)))) &&
    (!f.language || some((t) => same(t.language, f.language))) &&
    (!f.publishedYear || same(item.publishedYear, f.publishedYear))
  );
}

const unique = (values: (string | undefined)[]) => [...new Set(values.filter(Boolean) as string[])].sort();

function filterOptionsOf(data: TranslatedResearch[], keys: string[]) {
  const translations = data.flatMap((item) => item.translations);
  const all: Record<string, string[]> = {
    category: unique(translations.map((t) => t.category)),
    publicationVenue: unique(translations.map((t) => t.publicationVenue)),
    author: unique(translations.flatMap((t) => t.authors ?? [])),
    language: unique(translations.map((t) => t.language)),
    publishedYear: unique(data.map((item) => item.publishedYear)).reverse(),
  };
  return Object.fromEntries(keys.map((key) => [key, all[key]]));
}

const toCard = (item: TranslatedResearch, t: Translation): CardData => ({
  id: item.id,
  title: t.title,
  authors: t.authors,
  publishedYear: item.publishedYear,
  badge: t.publicationVenue,
  badgeSecondary: t.category,
  pdfUrl: item.pdfUrl,
});

const toRow = (item: TranslatedResearch, t: Translation): TableRow => ({
  id: item.id,
  title: t.title,
  authors: t.authors ?? [],
  publicationVenue: t.publicationVenue ?? "",
  language: t.language,
  category: t.category,
  publishedYear: item.publishedYear,
  pagenam: t.pagenam,
  pdfUrl: item.pdfUrl,
});

// Arabic is the fallback version of an item when nothing better matches.
const fallback = (item: TranslatedResearch) =>
  item.translations.find((t) => langOf(t) === "ar") ?? item.translations[0];

export default function TranslatedResearchList({
  data,
  variant,
}: {
  data: TranslatedResearch[];
  variant: keyof typeof VARIANTS;
}) {
  const { filterKeys, placeholder, unit, localized } = VARIANTS[variant];
  const sp = useSearchParams();
  const updateParams = useUpdateParams();

  const [search, setSearch] = useState(sp.get("search") ?? "");
  const [searchLang, setSearchLang] = useState<SearchLang>(localized ? "ar" : "all");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sortBy, setSortBy] = useState("year-desc");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage] = useState(() => Math.max(1, Number(sp.get("page") || "1")));
  const [filters, setFilters] = useState<Record<string, string>>(() =>
    Object.fromEntries(filterKeys.map((key) => [key, sp.get(key) ?? ""])),
  );

  useEffect(() => {
    // The browser's language is only known on the client, after mount. Anything but Persian
    // keeps the Arabic default.
    if (localized && navigator.language.slice(0, 2).toLowerCase() === "fa") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no way to know this during render
      setSearchLang("fa");
    }
  }, [localized]);

  const filterOptions = useMemo(() => filterOptionsOf(data, filterKeys), [data, filterKeys]);

  const filtered = useMemo(() => {
    const term = search.trim();
    return data
      .filter(
        (item) =>
          (!term || item.translations.some((t) => matches(t, term, searchLang))) &&
          passesFilters(item, filters),
      )
      .sort(SORTERS[sortBy]);
  }, [data, search, searchLang, filters, sortBy]);

  const term = search.trim();
  const start = (page - 1) * PER_PAGE;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(start, start + PER_PAGE);

  // The versions of an item shown as cards: the visitor's language, narrowed to the ones an
  // active search actually matches.
  const cardTranslations = (item: TranslatedResearch) => {
    let shown =
      searchLang === "all" ? item.translations : item.translations.filter((t) => langOf(t) === searchLang);
    if (!shown.length) shown = [fallback(item)];
    return term ? shown.filter((t) => matches(t, term, "all")) : shown;
  };

  // The single version of an item shown as a table row.
  const rowTranslation = (item: TranslatedResearch) =>
    (searchLang !== "all" && item.translations.find((t) => langOf(t) === searchLang)) ||
    (term && item.translations.find((t) => matches(t, term, "all"))) ||
    fallback(item);

  const paginate = (p: number) => {
    setPage(p);
    setHighlightId(null);
    updateParams({ page: p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SearchSection
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
          updateParams({ search: value });
        }}
        searchPlaceholder={placeholder}
        resultCount={filtered.length}
        resultUnit={unit}
        sortValue={sortBy}
        onSortChange={(value) => {
          setSortBy(value);
          setPage(1);
          updateParams({ sort: value });
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className={`flex flex-col gap-6 ${viewMode === "table" ? "" : "lg:flex-row"}`}>
        <aside className={viewMode === "table" ? "w-full" : "w-3/12"}>
          <FilterSidebar
            horizontal={viewMode === "table"}
            filters={filterOptions}
            filterValues={filters}
            onFilterChange={(key, value) => {
              setFilters((prev) => ({ ...prev, [key]: value }));
              setPage(1);
              updateParams({ [key]: value || null });
            }}
            reset={() => {
              setFilters(Object.fromEntries(filterKeys.map((key) => [key, ""])));
              setSearch("");
              setPage(1);
              updateParams({ ...Object.fromEntries(filterKeys.map((key) => [key, null])), search: null, page: null });
            }}
          />
        </aside>

        <main className="flex-1">
          {filtered.length === 0 ? (
            <EmptyState onReset={() => setSearch("")} />
          ) : viewMode === "table" ? (
            <ResearchTable
              rows={paginated.map((item) => toRow(item, rowTranslation(item)))}
              startIndex={start}
              highlightId={highlightId}
              onRowClick={setHighlightId}
              onRowDoubleClick={(url) => url && window.open(url, "_blank")}
              showCategory={filterKeys.includes("category")}
            />
          ) : (
            <ResearchGrid>
              {paginated.flatMap((item) =>
                cardTranslations(item).map((t) => (
                  <ResearchCard key={`${item.id}-${t.languageid}`} item={toCard(item, t)} />
                )),
              )}
            </ResearchGrid>
          )}

          {totalPages > 1 && (
            <Pagination className="mt-14" page={page} totalPages={totalPages} onPageChange={paginate} />
          )}
        </main>
      </div>
    </>
  );
}
