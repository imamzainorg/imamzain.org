"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import data from "@/data/AudioItem.json";
import { AudioItem } from "@/types/audio";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useAudioMeta } from "./hooks/useAudioMeta";
import Breadcrumbs from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { HeroSection } from "./components/HeroSection";
import { SearchBar } from "./components/SearchBar";
import { FiltersPanel } from "./components/FiltersPanel";
import { AudioCard } from "./components/AudioCard";
import { FloatingPlayer } from "./components/FloatingPlayer";

const ITEMS_PER_PAGE = 15;
type Filters = { speaker: string | null };

export default function AudioLibrary() {
  const audioData = useMemo(() => data as AudioItem[], []);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({ speaker: null });
  const [currentPage, setCurrentPage] = useState(1);

  const { durations, sizes } = useAudioMeta(audioData);

  // Speakers list
  const speakers = useMemo(() => {
    const unique = Array.from(new Set(audioData.map((i) => i.speaker))).sort(
      (a, b) => a.localeCompare(b, "ar"),
    );
    return ["الكل", ...unique];
  }, [audioData]);

  // Filtering

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return audioData.filter((item) => {
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(q) ||
        item.speaker.toLowerCase().includes(q);

      const matchSpeaker = !filters.speaker || item.speaker === filters.speaker;

      return matchSearch && matchSpeaker;
    });
  }, [audioData, search, filters]);
  // Sorting & Pagination
  const sortedData = useMemo(
    () => [...filtered].sort((a, b) => a.id - b.id),
    [filtered],
  );

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedData]);

  const paginate = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages],
  );

  const clearFilters = () => {
    setSearch("");
    setFilters({ speaker: null });
    setCurrentPage(1);
  };

  // Audio Player
  const {
    audioRef,
    currentSrc,
    currentTrack,
    isPlaying,
    volume,
    rate,
    currentTime,
    duration,
    setVolume,
    setRate,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    handlePlay,
    handleSeek,
    skip,
    closePlayer,
    handleEnded,
  } = useAudioPlayer(filtered);

  const downloadAudio = async (item: AudioItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const proxyUrl = item.audio.replace(
      "https://cdn.imamzain.org",
      "/api/audio",
    );
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen font-sans" dir="rtl">
      <div className="px-4 pt-5 pb-1 container mx-auto">
        <Breadcrumbs
          links={[
            { name: "الرئيسية", url: "/" },
            { name: "المكتبة الصوتية", url: "/audio" },
          ]}
        />
      </div>

      <div className="px-4 pb-6 bg-white/50 p-10 container rounded-2xl mx-auto">
        <HeroSection filteredCount={filtered.length} />
        <SearchBar value={search} onChange={setSearch} />
        <FiltersPanel
          speakers={speakers}
          filters={filters}
          setFilters={setFilters}
          onClearFilters={clearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedData.map((item, idx) => (
            <AudioCard
              key={item.id}
              item={item}
              index={idx}
              isActive={currentSrc === item.audio}
              isPlaying={isPlaying}
              duration={durations[item.id]}
              size={sizes[item.id]}
              onPlay={handlePlay}
              onDownload={downloadAudio}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500">لا توجد نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="w-11/12 mx-auto my-8" aria-label="التنقل بين الصفحات">
          {/* نافذة العرض حسب الشاشة */}
          {(() => {
            const isMobile =
              typeof window !== "undefined" && window.innerWidth < 640;
            const isTablet =
              typeof window !== "undefined" && window.innerWidth < 1024;

            const maxVisible = isMobile ? 3 : isTablet ? 5 : 7;

            let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            let end = start + maxVisible - 1;

            if (end > totalPages) {
              end = totalPages;
              start = Math.max(1, end - maxVisible + 1);
            }

            const visiblePages = Array.from(
              { length: end - start + 1 },
              (_, i) => start + i,
            );

            return (
              <div className="flex flex-row items-center justify-center gap-2">
                {/* السابق */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="الصفحة السابقة"
                  className="flex-shrink-0 w-10 h-10 bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                >
                  <ChevronRight size={18} />
                </Button>

                {/* أول صفحة + ... */}
                {start > 1 && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => paginate(1)}
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                    >
                      1
                    </Button>

                    {start > 2 && (
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 select-none">
                        ...
                      </span>
                    )}
                  </>
                )}

                {/* الصفحات الديناميكية (المهم هنا) */}
                {visiblePages.map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => paginate(pageNum)}
                    aria-label={`الصفحة ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg transition-colors duration-300 ${
                      currentPage === pageNum
                        ? "bg-primary dark:bg-Muharram_primary text-white"
                        : "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </Button>
                ))}

                {/* ... + آخر صفحة */}
                {end < totalPages && (
                  <>
                    {end < totalPages - 1 && (
                      <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 select-none">
                        ...
                      </span>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => paginate(totalPages)}
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                {/* التالي */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="الصفحة التالية"
                  className="flex-shrink-0 w-10 h-10 bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                >
                  <ChevronLeft size={18} />
                </Button>
              </div>
            );
          })()}

          <p className="text-center text-sm text-gray-400 mt-3">
            صفحة {currentPage} من {totalPages}
          </p>
        </nav>
      )}

      <AnimatePresence>
        {currentSrc && currentTrack && (
          <FloatingPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            rate={rate}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onSeek={handleSeek}
            onSkip={skip}
            onVolumeChange={setVolume}
            onRateChange={setRate}
            onClose={closePlayer}
            audioRef={audioRef as React.RefObject<HTMLAudioElement>}
            onTimeUpdate={() =>
              setCurrentTime(audioRef.current?.currentTime ?? 0)
            }
            onLoadedMetadata={() =>
              setDuration(audioRef.current?.duration ?? 0)
            }
            onEnded={handleEnded}
          />
        )}
      </AnimatePresence>

      {currentSrc && <div className="h-32" />}
    </div>
  );
}
