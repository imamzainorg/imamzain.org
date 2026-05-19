"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { SearchSection }  from "./shared/search-section";
import { ResearchCard, ResearchGrid, EmptyState, type CardData } from "./shared/research-card";
import { SummaryModal }   from "./shared/summary-modal";
import { SwiperPagination } from "./shared/swiper-pagination";

import researchData from "@/data/research.json";
import { Research }  from "@/types/research";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

const PER_PAGE = 9;

const SORT_OPTIONS = [
  { value: "year-desc",  label: "الأحدث"        },
  { value: "year-asc",   label: "الأقدم"         },
  { value: "title-asc",  label: "العنوان (أ-ي)"  },
  { value: "title-desc", label: "العنوان (ي-أ)"  },
  { value: "author-asc", label: "المؤلف (أ-ي)"   },
];

type SF = "year" | "title" | "author";
type SO = "asc" | "desc";

// ─── helpers ──────────────────────────────────────────────────────────────────

function text(item: Research) {
  return [item.title, item.abstract, item.section, item.topic,
          item.author, item.publishedYear, item.conference].join(" ").toLowerCase();
}

function sort(list: Research[], sf: SF, so: SO) {
  return [...list].sort((a, b) => {
    const cmp =
      sf === "year"   ? (Number(a.publishedYear) || 0) - (Number(b.publishedYear) || 0)
      : sf === "title"  ? (a.title  || "").localeCompare(b.title  || "", "ar")
      :                   (a.author || "").localeCompare(b.author || "", "ar");
    return so === "asc" ? cmp : -cmp;
  });
}

function toCard(item: Research): CardData {
  return { id: item.id, title: item.title, author: item.author,
           publishedYear: item.publishedYear, badge: item.conference,
           badgeSecondary: item.section, abstract: item.abstract, pdfUrl: item.pdfUrl };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConferencePapers() {
  const sp = useSearchParams();
  const [all]         = useState<Research[]>(() => [...researchData].reverse());
  const [selected, setSelected]     = useState<CardData | null>(null);
  const [page, setPage]             = useState(1);
  const [sortVal, setSortVal]       = useState("year-desc");
  const [search, setSearch]         = useState(sp.get("search") ?? "");
  const [filters, setFilters]       = useState<Record<string, string>>({ conference: "", author: "", publishedYear: "" });

  const uniq = useMemo(() => ({
    conferences: [...new Set(all.map((i) => i.conference))].filter(Boolean),
    authors:     [...new Set(all.map((i) => i.author).filter(Boolean))].sort(),
    years:       [...new Set(all.map((i) => i.publishedYear))].filter(Boolean).sort((a, b) => Number(b) - Number(a)),
  }), [all]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const [sf, so] = sortVal.split("-") as [SF, SO];
    return sort(
      all.filter((item) =>
        (!term || text(item).includes(term)) &&
        (!filters.conference    || item.conference?.toLowerCase().includes(filters.conference.toLowerCase())) &&
        (!filters.author        || item.author?.toLowerCase().includes(filters.author.toLowerCase())) &&
        (!filters.publishedYear || item.publishedYear?.toString().includes(filters.publishedYear))
      ),
      sf, so
    );
  }, [search, filters, sortVal, all]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const current    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch  = (v: string) => { setSearch(v); setPage(1); };
  const handleFilter  = (k: string, v: string) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1); };
  const handleSort    = (v: string) => { setSortVal(v); setPage(1); };

  return (
    <>
      <SearchSection
        searchValue={search}
        onSearchChange={handleSearch}
        searchPlaceholder="ابحث في العنوان، المؤلف، المؤتمر..."
        resultCount={filtered.length}
        resultUnit="بحث"
        sortOptions={SORT_OPTIONS}
        sortValue={sortVal}
        onSortChange={handleSort}
        filters={[
          { key: "conference",    label: "المؤتمر",   options: uniq.conferences, placeholder: "كل المؤتمرات" },
          { key: "author",        label: "المؤلف",    options: uniq.authors,     placeholder: "كل المؤلفين"  },
          { key: "publishedYear", label: "سنة النشر", options: uniq.years,       placeholder: "كل السنوات"   },
        ]}
        filterValues={filters}
        onFilterChange={handleFilter}
      />

      {filtered.length === 0 ? (
        <EmptyState onReset={() => { setSearch(""); setFilters({ conference: "", author: "", publishedYear: "" }); }} />
      ) : (
        <ResearchGrid>
          {current.map((item) => (
            <ResearchCard key={item.id ?? item.title} item={toCard(item)} onSummary={setSelected} />
          ))}
        </ResearchGrid>
      )}

      {totalPages > 1 && (
        <SwiperPagination currentPage={page} totalPages={totalPages}
          onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      )}

      <SummaryModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
