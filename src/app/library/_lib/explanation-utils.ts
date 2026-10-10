import type { Explanation } from "@/types/imamzain-legacy";

export function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export const hasContent = (explanation: Explanation): boolean =>
  hasText(explanation.content);

/** Display name per explanation; repeated authors get a counter, anonymous ones are numbered. */
export function sourceLabels(explanations: Explanation[]): string[] {
  const counts = new Map<string, number>();
  const nextCount = (key: string) => {
    const count = (counts.get(key) ?? 0) + 1;
    counts.set(key, count);
    return count;
  };

  return explanations.map(({ author }) => {
    const name = author?.trim();
    if (!name) return `مصدر ${nextCount("")}`;
    const count = nextCount(name);
    return count > 1 ? `${name} (${count})` : name;
  });
}

export function excerpt(value: string, max = 70): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

// يُلحق الجذر بـ <html> وليس <body> حتى لا يتأثر بأي transform/filter/backdrop-filter على body
export function getPortalRoot(id = "explanation-portal-root"): HTMLElement {
  let root = document.getElementById(id);
  if (!root) {
    root = document.createElement("div");
    root.id = id;
    document.documentElement.appendChild(root);
  }
  return root;
}
