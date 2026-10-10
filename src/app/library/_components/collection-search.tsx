"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { libraryPath } from "../_config/paths";
import { useSearchIndex } from "../_hooks/use-search-index";
import {
  MIN_QUERY_LENGTH,
  searchIndex,
  type SearchResult,
} from "../_lib/library-search";
import { highlightPlain } from "./text-highlight";

type CollectionSearchProps = {
  collectionSlug: string;
};

export default function CollectionSearch({ collectionSlug }: CollectionSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { index, hasError, load } = useSearchIndex(collectionSlug);

  // القيمة المؤجَّلة تمنع البحث في الفهرس من تعطيل الكتابة
  const deferredTerm = useDeferredValue(searchTerm);
  const results = useMemo(
    () => (index ? searchIndex(index, deferredTerm) : []),
    [index, deferredTerm],
  );

  // الفهرس ما زال يُحمَّل، أو البحث ما زال مؤجَّلًا
  const isSearching = searchTerm !== deferredTerm || (!index && !hasError);
  const showResults = isOpen && searchTerm.length >= MIN_QUERY_LENGTH;

  function handleResultClick(result: SearchResult) {
    setIsOpen(false);
    const path = libraryPath(collectionSlug, result.dictionarySlug, result.subjectSlug);
    router.push(`${path}?highlight=${encodeURIComponent(deferredTerm)}`);
  }

  function clearSearch() {
    setSearchTerm("");
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div className="relative group">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary dark:group-focus-within:text-Muharram_primary transition-colors" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            load();
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            load();
            if (searchTerm) setIsOpen(true);
          }}
          placeholder="ابحث في جميع المحتوى..."
          className="w-full pr-12 pl-12 py-3.5 border-2 border-gray-200 dark:border-Muharram_primary/50 rounded-2xl bg-white dark:bg-Muharram_secondary/15 text-gray-900 dark:text-Muharram_primary placeholder:text-gray-400 focus:ring-0 focus:border-primary dark:focus:border-Muharram_primary transition-all shadow-sm hover:shadow-md focus:shadow-lg"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            aria-label="مسح البحث"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showResults && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-3 w-full bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-zinc-700 max-h-[32rem] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {isSearching ? (
              <SearchingState />
            ) : hasError ? (
              <EmptyState title="تعذّر تحميل البحث" hint="تحقق من الاتصال وحاول مرة أخرى" />
            ) : results.length === 0 ? (
              <EmptyState title="لا توجد نتائج" hint="حاول البحث بكلمات أخرى" />
            ) : (
              <ResultsList
                results={results}
                term={deferredTerm}
                onSelect={handleResultClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

function SearchingState() {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary/30 dark:border-Muharram_primary/30 border-t-primary dark:border-t-Muharram_primary rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">جاري البحث...</p>
      </div>
    </div>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-zinc-700 flex items-center justify-center">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{hint}</p>
    </div>
  );
}

type ResultsListProps = {
  results: SearchResult[];
  term: string;
  onSelect: (result: SearchResult) => void;
};

function ResultsList({ results, term, onSelect }: ResultsListProps) {
  return (
    <>
      <div className="px-5 py-3 border-b border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {results.length} نتيجة
        </p>
      </div>
      <div
        className="overflow-y-auto max-h-[28rem] divide-y divide-gray-100 dark:divide-zinc-700 overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {results.map((result) => {
          const key = `${result.dictionarySlug}-${result.subjectSlug}-${result.phraseId}`;

          return (
            <button
              key={key}
              onClick={() => onSelect(result)}
              className="w-full text-right p-5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent dark:hover:from-Muharram_primary/5 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 mt-0.5 rounded-lg bg-primary/10 dark:bg-Muharram_primary/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-Muharram_primary/20 transition-colors">
                  <span className="text-sm font-bold text-primary dark:text-Muharram_primary">
                    {result.subjectId}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400">
                      {result.dictionaryTitle}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary dark:group-hover:text-Muharram_primary transition-colors">
                    {highlightPlain(result.subjectTitle, term, `${key}-title`)}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {highlightPlain(result.matchedText, term, `${key}-text`)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
