"use client";
import type { ReactNode } from "react";
import { FilterPanel, FilterSelect } from "@/components/filter-panel";
import { User, Building2, Calendar, LayoutGrid, Languages } from "lucide-react";

type Filters = Record<string, string[]>;

type FilterSidebarProps = {
  filters: Filters;
  filterValues: Record<string, string>;
  onFilterChange: (key: string, val: string) => void;
  reset: () => void;
  horizontal?: boolean;
};

export default function FilterSidebar({
  filters,
  filterValues,
  onFilterChange,
  reset,
  horizontal = false,
}: FilterSidebarProps) {
  return (
    <FilterPanel
      onReset={reset}
      columns={
        horizontal
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "sm:grid-cols-2 lg:grid-cols-1"
      }
    >
      {getOrderedFilterKeys(filters).map((key) => {
        const meta = keyMeta(key);
        return (
          <FilterSelect
            key={key}
            instanceId={`${key}-select`}
            icon={meta.icon}
            label={meta.label}
            placeholder={meta.placeholder}
            options={filters[key] || []}
            value={filterValues?.[key] ?? ""}
            onChange={(v: string) => onFilterChange(key, v)}
          />
        );
      })}
    </FilterPanel>
  );
}

function keyMeta(key: string): {
  label: string;
  icon: ReactNode;
  placeholder: string;
} {
  const k = key.toLowerCase();
  if (k.includes("author")) {
    return {
      label: "المؤلف",
      icon: <User size={16} />,
      placeholder: "ابحث عن مؤلف...",
    };
  }
  if (k.includes("language")) {
  return {
    label: "اللغة",
    icon: <Languages size={16} />,
    placeholder: "اختر اللغة...",
  };
}
  if (k.includes("conf")) {
    return {
      label: "المؤتمر",
      icon: <Calendar size={16} />,
      placeholder: "ابحث عن مهرجان أو مؤتمر...",
    };
  }
  if (k.includes("year") || k.includes("years") || k.includes("published")) {
    return {
      label: "سنة النشر",
      icon: <Calendar size={16} />,
      placeholder: "كل السنوات",
    };
  }
  if (
    k.includes("pub") ||
    k.includes("publisher") ||
    k.includes("publication")
  ) {
    return {
      label: "الناشر",
      icon: <Building2 size={16} />,
      placeholder: "ابحث عن دار نشر...",
    };
  }
  if (k.includes("cat") || k.includes("topic") || k.includes("category")) {
    return {
      label: "التصنيف العلمي",
      icon: <LayoutGrid size={16} />,
      placeholder: "اختر التصنيف العلمي...",
    };
  }

  return {
    label: key,
    icon: <LayoutGrid size={16} />,
    placeholder: "اختر...",
  };
}

function getOrderedFilterKeys(filters: Filters) {
  const keys = Object.keys(filters).filter(
    (k) => (filters[k] || []).length > 0,
  );
  const order = [
    "category",
    "categories",
    "topic",
    "author",
    "authors",
    "publicationvenue",
    "publication",
      "language",
    "publisher",
    "publishers",
    "publishedyear",
    "year",
    "years",
    "conference",
    "conferences",
  ];
  return keys.sort((a, b) => {
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    const ia = order.findIndex((o) => la.includes(o));
    const ib = order.findIndex((o) => lb.includes(o));
    const va = ia === -1 ? 999 : ia;
    const vb = ib === -1 ? 999 : ib;
    return va - vb;
  });
}
