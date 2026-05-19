"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SearchSection }   from "./shared/search-section";
import { ResearchCard, ResearchGrid, EmptyState, type CardData } from "./shared/research-card";
import { ResearchTable, type TableRow } from "./shared/research-table";
import { SwiperPagination } from "./shared/swiper-pagination";

import studentData       from "@/data/student.json";
import { StudentResearch } from "@/types/student";

// ─── ثوابت ────────────────────────────────────────────────────────────────────

type DegreeType = "all" | "bachelor" | "master" | "phd";

const TABS = [
  { id: "all",      label: "الكل"      },
  { id: "bachelor", label: "بكالوريوس" },
  { id: "master",   label: "ماجستير"   },
  { id: "phd",      label: "دكتوراه"   },
] as const;

const CATEGORY_MAP: Record<string, string> = {
  bachelor: "بكالوريوس",
  master:   "رسالة ماجستير",
  phd:      "دكتوراه",
};

const PER_PAGE = 21;

// ─── helpers ──────────────────────────────────────────────────────────────────

/** نفس بنية toCard في journals — الكرت موحّد 100% */
function toCard(item: StudentResearch, t: StudentResearch["translations"][0]): CardData {
  return {
    id:              item.id,
    title:           t.title,
    authors:         t.authors,
    publishedYear:   item.publishedYear,
    badge:           t.publicationVenue,   // الناشر — نفس الـ journals
    badgeSecondary:  t.category,           // الدرجة العلمية (amber badge)
    pdfUrl:          item.pdfUrl,
  };
}

function toRow(item: StudentResearch, t: StudentResearch["translations"][0]): TableRow {
  return { id: item.id, title: t.title, authors: t.authors,
           publicationVenue: t.publicationVenue, language: t.language,
           category: t.category, publishedYear: item.publishedYear, pdfUrl: item.pdfUrl };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentResearchPage() {
  const sp = useSearchParams();
  const [activeTab, setActiveTab]     = useState<DegreeType>(() => (sp.get("degree") as DegreeType) || "all");
  const [search, setSearch]           = useState("");
  const [viewMode, setViewMode]       = useState<"cards" | "table">("cards");
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [page, setPage]               = useState(1);

  const handleTab = useCallback((id: string) => {
    setActiveTab(id as DegreeType);
    setSearch("");
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    const base = activeTab === "all"
      ? (studentData as StudentResearch[])
      : (studentData as StudentResearch[]).filter((item) =>
          item.translations.some((t) => t.category === CATEGORY_MAP[activeTab])
        );
    if (!search.trim()) return base;
    const term = search.toLowerCase();
    return base.filter((item) =>
      item.translations.some((t) =>
        t.title.toLowerCase().includes(term) ||
        t.authors.join(", ").toLowerCase().includes(term) ||
        t.publicationVenue.toLowerCase().includes(term)
      )
    );
  }, [search, activeTab]);

  const sorted     = useMemo(() => [...filtered].sort((a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear)), [filtered]);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated  = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const tableRows  = paginated.flatMap((item) => item.translations.map((t) => toRow(item, t)));

  const paginate = useCallback((p: number) => {
    setPage(p);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center mb-8">
        <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-3">
          <GraduationCap size={26} />
        </span>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">بحوث الطلاب</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-sm leading-relaxed">
          بحوث البكالوريوس والماجستير والدكتوراه ضمن مشاريع علمية متنوعة
        </p>
      </motion.div>

      {/* SearchSection — مع tabs */}
      <SearchSection
        searchValue={search}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        searchPlaceholder={
          activeTab === "all"
            ? "ابحث في جميع البحوث..."
            : `ابحث في ${TABS.find((t) => t.id === activeTab)?.label}...`
        }
        resultCount={sorted.length}
        resultUnit="بحث"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        tabs={[...TABS]}
        activeTab={activeTab}
        onTabChange={handleTab}
      />

      {/* المحتوى */}
      {sorted.length === 0 ? (
        <EmptyState onReset={() => { setSearch(""); setActiveTab("all"); }} />
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
              <ResearchCard key={`${item.id}-${t.languageid}`} item={toCard(item, t)} />
            ))
          )}
        </ResearchGrid>
      )}

      {totalPages > 1 && <SwiperPagination currentPage={page} totalPages={totalPages} onPageChange={paginate} />}
    </>
  );
}
