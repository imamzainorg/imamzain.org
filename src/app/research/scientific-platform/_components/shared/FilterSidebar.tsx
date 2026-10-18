"use client";

import { Building2, Calendar, LayoutGrid, Languages, User } from "lucide-react";
import { FilterPanel, FilterSelect } from "@/components/filter-panel";

// The filters a research list can offer, in the order they appear. A list shows the ones it
// passes options for.
const FIELDS = [
  { key: "category", label: "التصنيف العلمي", Icon: LayoutGrid, placeholder: "اختر التصنيف العلمي..." },
  { key: "author", label: "المؤلف", Icon: User, placeholder: "ابحث عن مؤلف..." },
  { key: "publicationVenue", label: "الناشر", Icon: Building2, placeholder: "ابحث عن دار نشر..." },
  { key: "language", label: "اللغة", Icon: Languages, placeholder: "اختر اللغة..." },
  { key: "publishedYear", label: "سنة النشر", Icon: Calendar, placeholder: "كل السنوات" },
  { key: "conference", label: "المؤتمر", Icon: Calendar, placeholder: "ابحث عن مهرجان أو مؤتمر..." },
];

export default function FilterSidebar({
  filters,
  filterValues,
  onFilterChange,
  reset,
  horizontal = false,
}: {
  filters: Record<string, string[]>;
  filterValues: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  reset: () => void;
  horizontal?: boolean;
}) {
  return (
    <FilterPanel
      onReset={reset}
      columns={horizontal ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-1"}
    >
      {FIELDS.filter(({ key }) => filters[key]?.length).map(({ key, label, Icon, placeholder }) => (
        <FilterSelect
          key={key}
          instanceId={`${key}-select`}
          icon={<Icon size={16} />}
          label={label}
          placeholder={placeholder}
          options={filters[key]}
          value={filterValues[key] ?? ""}
          onChange={(value) => onFilterChange(key, value)}
        />
      ))}
    </FilterPanel>
  );
}
