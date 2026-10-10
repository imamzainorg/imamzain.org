const STACK_KEY = "bookNavigationStack";
const LAST_LIBRARY_URL_KEY = "lastLibraryURL";
const LIBRARY_SCROLL_KEY = "libraryScrollPosition";

function readStack(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      sessionStorage.getItem(STACK_KEY) ?? "[]",
    );
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeStack(stack: string[]): void {
  try {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));
  } catch {
    // التخزين غير متاح: يعمل التنقل بدون سجل
  }
}

export function recordBookVisit(path: string): void {
  const stack = readStack();
  if (stack[stack.length - 1] !== path) writeStack([...stack, path]);
}

/** Drops the current book and returns the previous one, if the reader came from another book. */
export function popToPreviousBook(): string | null {
  const stack = readStack();
  stack.pop();
  writeStack(stack);
  return stack[stack.length - 1] ?? null;
}

/** Called when leaving the library list for a book, so "back" returns to the same spot. */
export function rememberLibraryPosition(): void {
  try {
    sessionStorage.setItem(LAST_LIBRARY_URL_KEY, window.location.href);
    sessionStorage.setItem(LIBRARY_SCROLL_KEY, String(window.scrollY));
    sessionStorage.setItem(STACK_KEY, "[]");
  } catch {
    // التخزين غير متاح
  }
}

export function readSavedLibraryPosition(): {
  path: string;
  scrollY: number | null;
} | null {
  try {
    const savedUrl = sessionStorage.getItem(LAST_LIBRARY_URL_KEY);
    if (!savedUrl) return null;

    const url = new URL(savedUrl, window.location.origin);
    if (url.origin !== window.location.origin) return null;

    const scrollY = Number.parseInt(
      sessionStorage.getItem(LIBRARY_SCROLL_KEY) ?? "",
      10,
    );
    return {
      path: `${url.pathname}${url.search}${url.hash}`,
      scrollY: Number.isNaN(scrollY) ? null : scrollY,
    };
  } catch {
    return null;
  }
}
