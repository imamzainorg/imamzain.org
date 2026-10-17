import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const PER_PAGE = 21;

// Writes a research list's state (search, filters, sort, page) into the URL. Any change other
// than the page itself sends the list back to page 1.
export function useUpdateParams() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(sp.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key);
      else params.set(key, String(value));
    }
    if (!("page" in updates)) params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
}
