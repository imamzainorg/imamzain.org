"use client";

import { useRef, useState } from "react";
import type { SearchIndexEntry } from "@/types/imamzain-legacy";

/**
 * The index is ~2.5 MB, so it is fetched on first interaction from a static
 * route instead of being passed as a prop. As a prop it was serialized into
 * every page under the dictionary layout.
 */
export function useSearchIndex(collectionSlug: string) {
  const [index, setIndex] = useState<SearchIndexEntry[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const isRequestedRef = useRef(false);

  function load() {
    if (isRequestedRef.current) return;
    isRequestedRef.current = true;
    setHasError(false);

    fetch(`/api/library-search-index/${collectionSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: SearchIndexEntry[]) => setIndex(data))
      .catch(() => {
        // تفاعل لاحق يعيد المحاولة
        isRequestedRef.current = false;
        setHasError(true);
      });
  }

  return { index, hasError, load };
}
