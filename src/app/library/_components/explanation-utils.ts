import type { Explanation } from "@/types/imamzain-legacy";

export function sourceLabels(explanations: Explanation[]): string[] {
  const seen = new Map<string, number>();
  return explanations.map((exp) => {
    const raw = exp.author?.trim();
    if (!raw) {
      const idx = (seen.get("__no_author__") ?? 0) + 1;
      seen.set("__no_author__", idx);
      return `مصدر ${idx}`;
    }
    const count = (seen.get(raw) ?? 0) + 1;
    seen.set(raw, count);
    return count > 1 ? `${raw} (${count})` : raw;
  });
}

export function excerpt(value: string, max = 70): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

export function getPortalRoot(): HTMLElement {
  let root = document.getElementById("explanation-portal-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "explanation-portal-root";
    // نلحقه بـ <html> وليس <body> حتى لا يتأثر بأي transform/filter على body
    document.documentElement.appendChild(root);
  }
  return root;
}