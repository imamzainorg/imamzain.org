"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  ChevronDown,
  Clock,
  Search as SearchIcon,
  Mic2,
  ArrowDownUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { AudioItem } from "@/types/audio";
import type { BreakpointKey } from "../../hooks/useWaveform";
import { Button } from "@/components/button";
import AudioCard from "./AudioCard";
import AudioPagination from "./AudioPagination";
import { AudioSearch, AudioFilter } from "./AudioFilters";
import { DurationFilter } from "./DurationFilter";

const ITEMS_PER_PAGE = 10;

interface AudioListProps {
  items: AudioItem[];
  activeId: number | null;
  isPlaying: boolean;
  currentTimes: Record<number, number>;
  volumes: Record<number, number>;
  onPlayPause: (item: AudioItem) => void;
  onSeek: (item: AudioItem, pct: number) => void;
  onVolumeChange: (itemId: number, value: number) => void;
  setCanvasRef: (
    itemId: number,
    bpKey: BreakpointKey,
    el: HTMLCanvasElement | null,
  ) => void;
}

export default function AudioList({
  items,
  activeId,
  isPlaying,
  currentTimes,
  volumes,
  onPlayPause,
  onSeek,
  onVolumeChange,
  setCanvasRef,
}: AudioListProps) {
  const [search, setSearch] = useState("");
  const [speakerSearch, setSpeakerSearch] = useState("");
  const [speakerFilter, setSpeakerFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [durationRange, setDurationRange] = useState<[number, number]>([
    0, 120,
  ]);
  const [sortFilter, setSortFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSpeakerDropdownOpen, setIsSpeakerDropdownOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false); // ← جديد

  const filtersContainerRef = useRef<HTMLDivElement>(null);
  const speakerInputRef = useRef<HTMLInputElement>(null);
  const speakerDropdownRef = useRef<HTMLDivElement>(null);

  // ─── Derived data ──────────────────────────────────────────────────────────
  const allSpeakers = useMemo(
    () =>
      [...new Set(items.map((i) => i.speaker).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ) as string[],
    [items],
  );

  const filteredSpeakers = useMemo(() => {
    if (!speakerSearch.trim()) return allSpeakers;
    return allSpeakers.filter((s) =>
      s.toLowerCase().includes(speakerSearch.toLowerCase()),
    );
  }, [allSpeakers, speakerSearch]);

  {
    /*   const categories = useMemo(() => {
    const valid = items
      .map((i) => i.category)
      .filter((c): c is string[] => Array.isArray(c) && c.length > 0);
    return [...new Set(valid.flat())].sort((a, b) => a.localeCompare(b));
  }, [items]);*/
  }

  const maxAvailableDuration = useMemo(() => {
    const maxSeconds = Math.max(...items.map((i) => i.durationSeconds ?? 0));
    return Math.ceil(maxSeconds / 60);
  }, [items]);

  // ─── Filtering & sorting ───────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = items.filter((item) => {
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.speaker ?? "").toLowerCase().includes(q);
      const matchSpeaker = !speakerFilter || item.speaker === speakerFilter;

      const minutes = (item.durationSeconds ?? 0) / 60;
      const matchDuration =
        minutes >= durationRange[0] && minutes <= durationRange[1];
      return matchSearch && matchSpeaker && matchDuration;
    });

    const sortMap: Record<string, (a: AudioItem, b: AudioItem) => number> = {
      الأحدث: (a, b) => b.id - a.id,
      الأقدم: (a, b) => a.id - b.id,
      الأطول: (a, b) => (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0),
      الأقصر: (a, b) => (a.durationSeconds ?? 0) - (b.durationSeconds ?? 0),
    };
    if (sortFilter && sortMap[sortFilter])
      result = [...result].sort(sortMap[sortFilter]);
    return result;
  }, [items, search, speakerFilter, durationRange, sortFilter]);

  // ─── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
// ✅ بعد
const resetPage = useCallback(() => setCurrentPage(1), []);
    /*   const handleCategoryFilter = useCallback((v: string) => {
    setCategoryFilter(v);
    resetPage();
  }, []);*/
const handleSearch = useCallback((v: string) => {
  setSearch(v);
  resetPage();
}, [resetPage]);

const handleDurationRange = useCallback((range: [number, number]) => {
  setDurationRange(range);
  resetPage();
}, [resetPage]);

const handleSortFilter = useCallback((v: string) => {
  setSortFilter(v);
  resetPage();
}, [resetPage]);

const handleSpeakerSelect = useCallback((speaker: string) => {
  setSpeakerFilter(speaker);
  setSpeakerSearch("");
  setIsSpeakerDropdownOpen(false);
  resetPage();
}, [resetPage]);
  const handleSpeakerSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSpeakerSearch(e.target.value);
      setIsSpeakerDropdownOpen(true);
    },
    [],
  );
  const handleClearFilters = useCallback(() => {
    setSearch("");
    setSpeakerFilter("");
    setSpeakerSearch("");
    setCategoryFilter("");
    setDurationRange([0, maxAvailableDuration]);
    setSortFilter("");
    setCurrentPage(1);
    setIsSpeakerDropdownOpen(false);
  }, [maxAvailableDuration]);
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasFilters = !!(
    search ||
    speakerFilter ||
    categoryFilter ||
    sortFilter
  );

  // ─── Side effects ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        speakerDropdownRef.current &&
        !speakerDropdownRef.current.contains(e.target as Node) &&
        speakerInputRef.current &&
        !speakerInputRef.current.contains(e.target as Node)
      )
        setIsSpeakerDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const container = filtersContainerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0 && container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // إغلاق الـ sheet لما تكبر الشاشة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileFiltersOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Filters Content (مشترك بين sidebar و bottom sheet) ───────────────────
  const FiltersContent = (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium  text-slate-700 dark:text-black mb-1.5">
          <SearchIcon className="w-4 h-4 text-primary dark:text-Muharram_secondary " /> البحث
        </label>
        <AudioSearch value={search} onChange={handleSearch} />
      </div>

      {/* Speaker */}
      <div className="w-full relative" ref={speakerDropdownRef}>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-black mb-1.5">
          <Mic2 className="w-4 h-4 text-primary dark:text-Muharram_secondary" /> المحاضر
        </label>
        <div className="relative">
          <input
            ref={speakerInputRef}
            type="text"
            value={speakerSearch || speakerFilter}
            onChange={handleSpeakerSearchChange}
            onFocus={() => setIsSpeakerDropdownOpen(true)}
            placeholder="ابحث عن محاضر..."
            className="w-full p-4 text-center dark:text-black bg-white dark:bg-Muharram_secondary/15 border border-slate-300 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-Muharram_primary/50"
          />
          <div className="absolute left-8 top-1/2 -translate-y-1/2 h-4 border-l border-slate-300 dark:border-slate-600" />
          <ChevronDown className="absolute left-3 top-1/2 dark:text-Muharram_secondary  -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        {isSpeakerDropdownOpen && (
          <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-white   border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
            {speakerFilter && (
              <button
                onClick={() => handleSpeakerSelect("")}
                className="w-full text-right px-4 py-2 text-sm  dark:text-Muharram_secondary text-primary border-b border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                ✕ إلغاء اختيار المحاضر
              </button>
            )}
            {filteredSpeakers.length > 0 ? (
              filteredSpeakers.map((speaker) => (
                <button
                  key={speaker}
                  onClick={() => handleSpeakerSelect(speaker)}
                  className={`w-full text-right px-4 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${speakerFilter === speaker ? "bg-primary/10 text-primary font-medium" : ""}`}
                >
                  {speaker}
                  {speakerFilter === speaker && " ✓"}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center">
                لا توجد نتائج
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category */}
      {/* 
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          <FolderOpen className="w-4 h-4 text-primary" /> الموضوع
        </label>
        <AudioFilter
          options={categories}
          value={categoryFilter}
          onChange={handleCategoryFilter}
        />
      </div>
*/}

      {/* Sort */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-black mb-1.5">
          <ArrowDownUp className="w-4 h-4 text-primary dark:text-Muharram_secondary" /> الترتيب حسب
        </label>
        <AudioFilter
          options={["الأحدث", "الأقدم", "الأطول", "الأقصر"]}
          value={sortFilter}
          onChange={handleSortFilter}
        />
      </div>

      {/* Duration */}
      <div>
        <label className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-black">
            <Clock className="w-4 h-4 text-primary dark:text-Muharram_secondary" /> المدة (دقائق)
          </span>
          <span className="text-xs text-primary bg-primary/10 dark:text-black dark:bg-Muharram_secondary/30  px-2 py-0.5 rounded-full font-medium">
            {durationRange[0]} – {durationRange[1]} د
          </span>
        </label>
        <DurationFilter
          minDuration={0}
          maxDuration={maxAvailableDuration}
          value={durationRange}
          onChange={handleDurationRange}
        />
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          {[5, 15, 30, 60].map((minutes) => (
            <button
              key={minutes}
              onClick={() => handleDurationRange([0, minutes])}
              className={`py-1.5 text-xs rounded-lg border transition-colors whitespace-nowrap ${
                durationRange[0] === 0 && durationRange[1] === minutes
                   ? "bg-primary/10 border-primary text-primary dark:bg-Muharram_primary/10 dark:border-Muharram_secondary dark:text-Muharram_secondary font-medium"
                : "bg-white/50 dark:bg-Muharram_secondary/5 border-slate-200 dark:border-slate-700 hover:border-primary text-slate-600 dark:text-black"
            }`}
            >
              أقل من {minutes} د
            </button>
          ))}
          <button
            onClick={() => handleDurationRange([30, maxAvailableDuration])}
            className={`py-1.5 text-xs rounded-lg border transition-colors col-span-2 ${
              durationRange[0] === 30 &&
              durationRange[1] === maxAvailableDuration
                ? "bg-primary/10 border-primary text-primary dark:bg-Muharram_primary/10 dark:border-Muharram_secondary dark:text-Muharram_secondary font-medium"
                : "bg-white/50 dark:bg-Muharram_secondary/5 border-slate-200 dark:border-slate-700 hover:border-primary text-slate-600 dark:text-black"
            }`}
          >
            أكثر من 30 د
          </button>
        </div>
      </div>

      {/* Clear */}
      <div className="pt-2 border-t border-slate-200/70 dark:border-white/10">
        <Button
          variant="outline"
          className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-500"
          onClick={handleClearFilters}
        >
          إعادة تعيين الفلاتر
        </Button>
      </div>
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar (desktop only) ── */}
        <aside className="hidden lg:block bg-secondary/10 dark:bg-Muharram_secondary/10 sticky top-28 self-start rounded-2xl p-4 lg:p-5 border border-slate-200/70 dark:border-white/10 shadow-sm w-72 xl:w-80 2xl:w-96 h-fit">
          <div
            ref={filtersContainerRef}
            className="overflow-y-auto max-h-[calc(100vh-220px)] pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600"
            style={{ scrollbarWidth: "thin" }}
          >
            {FiltersContent}
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 space-y-6">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">لا توجد نتائج</p>
              <p className="text-slate-400 text-sm mt-1">
                جرّب تغيير كلمة البحث أو الفلاتر
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary text-sm hover:underline"
              >
                مسح الفلاتر
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {paginated.map((item) => (
                <AudioCard
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  isPlaying={activeId === item.id && isPlaying}
                  currentTime={currentTimes[item.id] ?? 0}
                  duration={item.durationSeconds ?? 0}
                  volume={volumes[item.id] ?? 1}
                  onPlayPause={onPlayPause}
                  onSeek={onSeek}
                  onVolumeChange={onVolumeChange}
                  setCanvasRef={setCanvasRef}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Pagination */}
      <AudioPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {totalPages > 1 && (
        <p className="text-center text-xs text-slate-400 mt-4">
          الصفحة {currentPage} من {totalPages}
        </p>
      )}

      {/* ── Mobile FAB زر الفلترة ── */}
      {!isMobileFiltersOpen && (
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="
            lg:hidden fixed bottom-6   left-1/2 -translate-x-1/2 z-40
            flex items-center gap-2
            bg-primary text-white
            px-5 py-3 rounded-full shadow-lg shadow-primary/30
            text-sm font-medium
            transition-all duration-300 hover:scale-105 active:scale-95
          "
        >
          <SlidersHorizontal className="w-4 h-4" />
          فلترة
          {hasFilters && <span className="w-2 h-2 rounded-full bg-white/80" />}
        </button>
      )}

      {/* ── Mobile Bottom Sheet ── */}
      {isMobileFiltersOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0  z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Sheet */}
          <div
            className="
            lg:hidden fixed bottom-0 inset-x-0 z-50
            bg-white 

            rounded-t-3xl
            shadow-2xl
            max-h-[60vh]
            flex flex-col
            animate-in slide-in-from-bottom duration-300
          "
          >
            {/* Handle + Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-200 dark:border-Muharram_primary shrink-0">
              <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <h2 className="text-sm font-semibold text-slate-700 dark:text-black">
                الفلاتر
              </h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div
              className="overflow-y-auto flex-1 px-5 py-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {FiltersContent}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
