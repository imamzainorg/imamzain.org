"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SearchSection } from "./shared/search-section";
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

// ─── Types ─────────────────────────────────────────────────────

type DegreeType = "all" | "bachelor" | "master" | "phd";

// ─── Constants ─────────────────────────────────────────────────

const TABS = [
  { id: "all", label: "الكل" },
  { id: "bachelor", label: "بكالوريوس" },
  { id: "master", label: "ماجستير" },
  { id: "phd", label: "دكتوراه" },
] as const;

const CATEGORY_MAP: Record<string, string> = {
  bachelor: "بكالوريوس",
  master: "رسالة ماجستير",
  phd: "دكتوراه",
};

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

  const [activeTab, setActiveTab] = useState<DegreeType>(
    () => (sp.get("degree") as DegreeType) || "all",
  );

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("year-desc");

  // ─── Tabs ───────────────────────────────────────────────────

  const handleTab = useCallback((id: string) => {
    setActiveTab(id as DegreeType);
    setSearch("");
    setPage(1);
  }, []);

  // ─── Filter + Search + Sort ─────────────────────────────────

  const filtered = useMemo(() => {
    const all = studentData as StudentResearch[];

    // filter by degree
    const byCategory =
      activeTab === "all"
        ? all
        : all.filter((item) =>
            item.translations.some(
              (t) => t.category === CATEGORY_MAP[activeTab],
            ),
          );

    // search
    const term = search.trim().toLowerCase();

    const searched = !term
      ? byCategory
      : byCategory.filter((item) =>
          item.translations.some(
            (t) =>
              t.title?.toLowerCase().includes(term) ||
              t.authors?.join(", ").toLowerCase().includes(term) ||
              t.publicationVenue?.toLowerCase().includes(term),
          ),
        );

    // sort
    return [...searched].sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return (
            parseInt(b.publishedYear) - parseInt(a.publishedYear)
          );

        case "year-asc":
          return (
            parseInt(a.publishedYear) - parseInt(b.publishedYear)
          );

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
          return (
            a.translations[0]?.authors?.[0] ?? ""
          ).localeCompare(
            b.translations[0]?.authors?.[0] ?? "",
            "ar",
          );

        default:
          return 0;
      }
    });
  }, [search, activeTab, sortBy]);

  // ─── Pagination ─────────────────────────────────────────────

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  const tableRows = paginated.flatMap((item) =>
    item.translations.map((t) => toRow(item, t)),
  );

  const paginate = useCallback((p: number) => {
    setPage(p);
    setHighlightId(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // ─── Render ─────────────────────────────────────────────────

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <GraduationCap
            size={48}
            className="text-primary"
            aria-hidden="true"
          />
        </div>

        <h2 className="text-body font-bold text-gray-900 dark:text-white mb-3">
          بحوث الطلاب
        </h2>

        <p className="text-gray-600 text-note leading-8 dark:text-gray-300 max-w-2xl mx-auto">
          بحوث طلاب البكالوريوس والماجستير والدكتوراه ضمن مشاريع علمية متنوعة.
        </p>
      </motion.header>

      <SearchSection
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchPlaceholder={
          activeTab === "all"
            ? "ابحث في جميع البحوث..."
            : `ابحث في ${
                TABS.find((t) => t.id === activeTab)?.label
              }...`
        }
        resultCount={filtered.length}
        resultUnit="بحث"
        sortOptions={SORT_OPTIONS}
        sortValue={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        tabs={[...TABS]}
        activeTab={activeTab}
        onTabChange={handleTab}
      />

      {filtered.length === 0 ? (
        <EmptyState
          onReset={() => {
            setSearch("");
            setActiveTab("all");
          }}
        />
      ) : viewMode === "table" ? (
        <ResearchTable
          rows={tableRows}
          startIndex={(page - 1) * PER_PAGE}
          highlightId={highlightId}
          onRowClick={setHighlightId}
          onRowDoubleClick={(url) =>
            url && window.open(url, "_blank")
          }
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
    </>
  );
}